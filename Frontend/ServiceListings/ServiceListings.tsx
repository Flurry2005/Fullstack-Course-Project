import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../Footer";
import type { Gig } from "../types/Gig";
import ListingsHeader from "./Components/ListingsHeader";
import Sidebar from "./Components/Sidebar";
import { fetchProfile } from "../utils/GetProfile";
import NavBar from "../NavBar/NavBar";
import ServiceListingCard from "./Components/ServiceListingCard";
import { deliveryTimes, serviceCategories } from "./serviceListingFilters";

export type Listing = {
  id: string;
  seller: string;
  level: string;
  title: string;
  primaryImagePreview?: string;
  secondaryImagePreview?: string;
  ternaryImagePreview?: string;
  price: string;
  category: string;
  subCategory: string;
  main_slug: string;
  sub_slug: string;
  deliveryTime: string;
  deliveryTimes: string[];
  rating: string;
  reviews: string;
  tag: string;
};

const itemsPerPage = 6;
const apiUrl =
  import.meta.env.VITE_DEV === "true"
    ? "http://localhost:3000"
    : "https://fullstackapi.liamjorgensen.dev";

type GigSearchResponse = {
  gigs: Gig[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function getPackagePrices(gig: Gig) {
  return [gig.basic?.price, gig.standard?.price, gig.premium?.price].filter(
    (price): price is string | number => Boolean(price) && Number(price) > 0,
  );
}

function getStartingPrice(gig: Gig) {
  const packagePrices = getPackagePrices(gig);
  const startingPrice =
    packagePrices.length > 0
      ? Math.min(...packagePrices.map((price) => Number(price)))
      : 0;

  return `$${startingPrice}`;
}

function getStartingDelivery(gig: Gig) {
  return (
    gig.basic?.delivery || gig.standard?.delivery || gig.premium?.delivery || ""
  );
}

function getDeliveryTimes(gig: Gig) {
  return Array.from(
    new Set(
      [
        gig.basic?.delivery,
        gig.standard?.delivery,
        gig.premium?.delivery,
      ].filter((delivery): delivery is string => Boolean(delivery)),
    ),
  );
}

function mapGigToListing(gig: Gig): Listing {
  return {
    id: gig._id || "",
    seller: gig.sellerUsername || "Unknown seller",
    level: gig.category?.sub || "New Seller",
    title: gig.title || "Untitled service",
    primaryImagePreview: gig.primaryImagePreview,
    secondaryImagePreview: gig.secondaryImagePreview,
    ternaryImagePreview: gig.ternaryImagePreview,
    price: getStartingPrice(gig),
    category: gig.category?.main || "Other",
    subCategory: gig.category?.sub || "Other",
    main_slug: gig.category!.main_slug || "Other",
    sub_slug: gig.category!.sub_slug || "Other",
    deliveryTime: getStartingDelivery(gig),
    deliveryTimes: getDeliveryTimes(gig),
    rating: gig.rating?.toFixed(1).toString() || "0.0",
    reviews: gig.reviews ? gig.reviews.length.toString() : "0",
    tag: gig.tags?.[0] || gig.category?.sub || "Service",
  };
}

function ServiceListings() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const searchParamsString = searchParams.toString();

  const searchQuery = searchParams.get("search") ?? "";
  const sortBy =
    searchParams.get("sortBy") === "Most Relevant"
      ? "Most Recent"
      : (searchParams.get("sortBy") ?? "Most Recent");
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const selectedCategories =
    searchParams
      .get("categories")
      ?.split(",")
      .map((category) => category.trim())
      .filter(Boolean) ?? [];
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const selectedRating = Number(searchParams.get("rating")) || 0;
  const selectedDeliveryTime = searchParams.get("deliveryTime") ?? "";

  const updateSearchParams = (
    updates: Record<string, string | number | null>,
    resetPage = true,
  ) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          nextParams.delete(key);
          return;
        }

        nextParams.set(key, String(value));
      });

      if (resetPage) {
        nextParams.delete("page");
      }

      return nextParams;
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchGigs = async () => {
      try {
        setIsLoading(true);
        setFetchError("");

        const requestParams = new URLSearchParams(searchParamsString);
        requestParams.set("page", String(currentPage));
        requestParams.set("limit", String(itemsPerPage));

        const response = await fetch(
          `${apiUrl}/api/gig/search?${requestParams.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Could not fetch gigs");
        }

        const data = (await response.json()) as GigSearchResponse;

        if (data.totalPages > 0 && data.page > data.totalPages) {
          updateSearchParams({ page: data.totalPages }, false);
          return;
        }

        setListings(data.gigs.map(mapGigToListing));
        setTotalResults(data.total);
        setTotalPages(data.totalPages);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error(error);
        setFetchError("Could not load services right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGigs();

    return () => controller.abort();
  }, [currentPage, searchParamsString]);

  const [profilePictures, setProfilePictures] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const loadPictures = async () => {
      if (!listings) return;

      const uniqueUsers = [...new Set(listings.map((l) => l.seller))];

      const entries = await Promise.all(
        uniqueUsers.map(async (username) => {
          const profile = await fetchProfile(username);

          return [username, profile?.profilePictureUrl];
        }),
      );

      setProfilePictures(Object.fromEntries(entries));
    };

    loadPictures();
  }, [listings]);

  const toggleCategory = (category: string) => {
    const nextCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(
          (currentCategory) => currentCategory !== category,
        )
      : [...selectedCategories, category];

    updateSearchParams({
      categories: nextCategories.length > 0 ? nextCategories.join(",") : null,
    });
  };

  const clearFilters = () => {
    updateSearchParams({
      categories: null,
      minPrice: null,
      maxPrice: null,
      rating: null,
      deliveryTime: null,
    });
  };

  const toggleRating = (rating: number) => {
    updateSearchParams({
      rating: selectedRating === rating ? null : rating,
    });
  };

  const toggleDeliveryTime = (time: string) => {
    updateSearchParams({
      deliveryTime: selectedDeliveryTime === time ? null : time,
    });
  };

  const goToPage = (page: number) => {
    updateSearchParams({ page }, false);
  };

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter(
      (page) =>
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 2,
    );

  return (
    <main className="bg-[#f9f5ff] min-h-screen">
      <NavBar />
      <section className="flex lg:flex-row flex-col gap-8 px-6 md:px-10 py-8">
        <Sidebar
          categories={serviceCategories}
          deliveryTimes={deliveryTimes}
          selectedCategories={selectedCategories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          selectedRating={selectedRating}
          selectedDeliveryTime={selectedDeliveryTime}
          onCategoryChange={toggleCategory}
          onMinPriceChange={(value) => updateSearchParams({ minPrice: value })}
          onMaxPriceChange={(value) => updateSearchParams({ maxPrice: value })}
          onRatingChange={toggleRating}
          onDeliveryTimeChange={toggleDeliveryTime}
          onClearFilters={clearFilters}
        />

        <div className="flex-1">
          <ListingsHeader
            searchQuery={searchQuery}
            sortBy={sortBy}
            resultsCount={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onSearchChange={(value) => updateSearchParams({ search: value })}
            onSortChange={(value) => updateSearchParams({ sortBy: value })}
          />

          {isLoading ? (
            <div className="flex justify-center items-center bg-white mt-8 p-12 rounded-2xl text-[#6f6f9a]">
              Loading services...
            </div>
          ) : fetchError ? (
            <div className="flex flex-col justify-center items-center bg-white mt-8 p-12 rounded-2xl text-center">
              <i className="mb-4 text-[#c4bdf4] text-4xl fa-solid fa-triangle-exclamation"></i>
              <h2 className="font-bold text-[#2c2a51] text-xl">
                Services could not load
              </h2>
              <p className="mt-2 max-w-md text-[#6f6f9a]">{fetchError}</p>
            </div>
          ) : listings.length > 0 ? (
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8">
              {listings.map((listing) => (
                <ServiceListingCard
                  key={listing.id}
                  listing={listing}
                  profilePictures={profilePictures}
                  onClick={() =>
                    navigate(
                      `/services/${listing.main_slug}/${listing.sub_slug}/${listing.id}`,
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center bg-white mt-8 p-12 rounded-2xl text-center">
              <i className="mb-4 text-[#c4bdf4] text-4xl fa-solid fa-magnifying-glass"></i>
              <h2 className="font-bold text-[#2c2a51] text-xl">
                No services found
              </h2>
              <p className="mt-2 max-w-md text-[#6f6f9a]">
                Try another search or clear the filters to browse all available
                services.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <nav className="flex justify-center items-center gap-4 py-14 font-bold text-[#5a5781]">
              {visiblePages.map((page, index) => (
                <div key={page} className="flex items-center gap-4">
                  {index > 0 && page - visiblePages[index - 1] > 1 && (
                    <span className="px-1">...</span>
                  )}
                  <button
                    onClick={() => goToPage(page)}
                    className={`rounded-full w-12 h-12 cursor-pointer ${
                      currentPage === page
                        ? "bg-[#efe9ff] text-[#1857f7]"
                        : "hover:bg-[#efe9ff]"
                    }`}
                  >
                    {page}
                  </button>
                </div>
              ))}

              <button
                onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="hover:bg-[#efe9ff] disabled:opacity-40 rounded-full w-12 h-12 cursor-pointer disabled:cursor-not-allowed"
              >
                <i className="fa-chevron-right fa-solid"></i>
              </button>
            </nav>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default ServiceListings;
