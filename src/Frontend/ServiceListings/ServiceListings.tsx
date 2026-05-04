import { useEffect, useMemo, useState } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import fishImage from "../assets/fish.jpg";
import meImage from "../assets/me.jpeg";
import ListingsHeader from "./components/ListingsHeader";
import Sidebar from "./components/Sidebar";

type Listing = {
  id: string;
  seller: string;
  level: string;
  title: string;
  price: string;
  category: string;
  deliveryTime: string;
  rating: string;
  reviews: string;
  tag: string;
  image: string;
  avatar: string;
};

const listings: Listing[] = [
  {
    id: "logo-brand-identity",
    seller: "Elena Vance",
    level: "Level 2 Seller",
    title: "I will design a professional logo and full brand identity system for your startup",
    price: "$450",
    category: "Design & Creative",
    deliveryTime: "Up to 3 days",
    rating: "4.9",
    reviews: "1.2k",
    tag: "Digital Craft",
    image: fishImage,
    avatar: meImage,
  },
  {
    id: "react-web-app",
    seller: "Julian Chen",
    level: "Top Rated Seller",
    title: "I will develop a high-performance React web application with custom animations",
    price: "$1,200",
    category: "Development & IT",
    deliveryTime: "Up to 7 days",
    rating: "5.0",
    reviews: "842",
    tag: "Featured Pro",
    image: fishImage,
    avatar: meImage,
  },
  {
    id: "digital-illustrations",
    seller: "Mia Sol",
    level: "Level 2 Seller",
    title: "I will create a unique set of custom digital illustrations for your mobile app",
    price: "$180",
    category: "Design & Creative",
    deliveryTime: "Express (24h)",
    rating: "4.8",
    reviews: "319",
    tag: "Artistic",
    image: fishImage,
    avatar: meImage,
  },
  {
    id: "social-growth",
    seller: "Marcus Thorne",
    level: "New Seller",
    title: "I will manage your entire social media presence and drive organic growth",
    price: "$850",
    category: "Digital Marketing",
    deliveryTime: "Up to 7 days",
    rating: "5.0",
    reviews: "12",
    tag: "Strategy",
    image: fishImage,
    avatar: meImage,
  },
  {
    id: "seo-blog-posts",
    seller: "Sarah Bloom",
    level: "Level 2 Seller",
    title: "I will write SEO-optimized blog posts that rank on the first page of search",
    price: "$95",
    category: "Writing & Translation",
    deliveryTime: "Up to 3 days",
    rating: "4.9",
    reviews: "452",
    tag: "Writing",
    image: fishImage,
    avatar: meImage,
  },
  {
    id: "commercial-video-edit",
    seller: "David Ross",
    level: "Top Rated Seller",
    title: "I will professionally edit your cinematic commercial videos and color grade",
    price: "$320",
    category: "Digital Marketing",
    deliveryTime: "Express (24h)",
    rating: "5.0",
    reviews: "1.8k",
    tag: "Media",
    image: fishImage,
    avatar: meImage,
  },
    {
    id: "seo-blog-posts-extra-one",
    seller: "Sarah Bloom",
    level: "Level 2 Seller",
    title: "I will write SEO-optimized blog posts that rank on the first page of search",
    price: "$95",
    category: "Writing & Translation",
    deliveryTime: "Up to 3 days",
    rating: "4.9",
    reviews: "452",
    tag: "Writing",
    image: fishImage,
    avatar: meImage,
  },
  {
    id: "commercial-video-edit-extra-one",
    seller: "David Ross",
    level: "Top Rated Seller",
    title: "I will professionally edit your cinematic commercial videos and color grade",
    price: "$320",
    category: "Digital Marketing",
    deliveryTime: "Express (24h)",
    rating: "5.0",
    reviews: "1.8k",
    tag: "Media",
    image: fishImage,
    avatar: meImage,
  },
    {
    id: "seo-blog-posts-extra-two",
    seller: "Sarah Bloom",
    level: "Level 2 Seller",
    title: "I will write SEO-optimized blog posts that rank on the first page of search",
    price: "$95",
    category: "Writing & Translation",
    deliveryTime: "Up to 3 days",
    rating: "4.9",
    reviews: "452",
    tag: "Writing",
    image: fishImage,
    avatar: meImage,
  },
  {
    id: "commercial-video-edit-extra-two",
    seller: "David Ross",
    level: "Top Rated Seller",
    title: "I will professionally edit your cinematic commercial videos and color grade",
    price: "$320",
    category: "Digital Marketing",
    deliveryTime: "Express (24h)",
    rating: "5.0",
    reviews: "1.8k",
    tag: "Media",
    image: fishImage,
    avatar: meImage,
  },
];

const itemsPerPage = 6;

function getListingPrice(listing: Listing) {
  return Number(listing.price.replace(/[$,]/g, ""));
}

function ServiceListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition hover:-translate-y-1 cursor-pointer">
      <div className="relative overflow-hidden rounded-lg h-56">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <span className="top-4 left-4 absolute bg-white px-4 py-1.5 rounded-full font-bold text-[#4f46e5] text-xs tracking-wide uppercase">
          {listing.tag}
        </span>
      </div>

      <div className="px-1 pt-5">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={listing.avatar}
            alt={listing.seller}
            className="border-2 border-[#1857f7] rounded-full w-9 h-9 object-cover"
          />
          <div>
            <h2 className="font-bold text-[#2c2a51] text-sm">{listing.seller}</h2>
            <p className="text-[#6f6f9a] text-xs">{listing.level}</p>
          </div>
        </div>

        <p className="min-h-18 text-[#2c2a51] text-lg leading-6">{listing.title}</p>

        <div className="flex items-end justify-between border-[#f0eef8] border-t mt-5 pt-4">
          <div className="flex items-center gap-1 text-sm">
            <i className="fa-solid fa-star text-[#f7b500] text-xs"></i>
            <span className="font-semibold text-[#2c2a51]">{listing.rating}</span>
            <span className="text-[#6f6f9a]">({listing.reviews})</span>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#5a5781] text-[10px] uppercase leading-3">
              Starting at
            </p>
            <p className="font-bold text-[#1857f7] text-xl leading-6">
              {listing.price}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ServiceListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("");

  const toggleCategory = (category: string) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((currentCategory) => currentCategory !== category)
        : [...currentCategories, category],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating(0);
    setSelectedDeliveryTime("");
  };

  const toggleRating = (rating: number) => {
    setSelectedRating((currentRating) =>
      currentRating === rating ? 0 : rating,
    );
  };

  const toggleDeliveryTime = (time: string) => {
    setSelectedDeliveryTime((currentTime) => (currentTime === time ? "" : time));
  };

  const filteredListings = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const minPriceNumber = minPrice === "" ? 0 : Number(minPrice);
    const maxPriceNumber = maxPrice === "" ? Infinity : Number(maxPrice);

    const matchingListings = listings.filter((listing) => {
      const listingPrice = getListingPrice(listing);
      const matchesSearch =
        !normalizedQuery ||
        [
          listing.seller,
          listing.title,
          listing.level,
          listing.tag,
          listing.category,
          listing.deliveryTime,
          listing.rating,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(listing.category);
      const matchesPrice =
        listingPrice >= minPriceNumber && listingPrice <= maxPriceNumber;
      const matchesRating =
        selectedRating === 0 || Number(listing.rating) >= selectedRating;
      const matchesDeliveryTime =
        !selectedDeliveryTime || listing.deliveryTime === selectedDeliveryTime;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesDeliveryTime
      );
    });

    return [...matchingListings].sort((a, b) => {
      if (sortBy === "Price Low to High") {
        return getListingPrice(a) - getListingPrice(b);
      }

      if (sortBy === "Price High to Low") {
        return getListingPrice(b) - getListingPrice(a);
      }

      return 0;
    });
  }, [
    maxPrice,
    minPrice,
    searchQuery,
    selectedCategories,
    selectedDeliveryTime,
    selectedRating,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    maxPrice,
    minPrice,
    searchQuery,
    selectedCategories,
    selectedDeliveryTime,
    selectedRating,
    sortBy,
  ]);

  return (
    <main className="bg-[#f9f5ff] min-h-screen">
      <NavBar />
      <section className="flex flex-col lg:flex-row gap-8 px-6 md:px-10 py-8">
        <Sidebar
          selectedCategories={selectedCategories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          selectedRating={selectedRating}
          selectedDeliveryTime={selectedDeliveryTime}
          onCategoryChange={toggleCategory}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onRatingChange={toggleRating}
          onDeliveryTimeChange={toggleDeliveryTime}
          onClearFilters={clearFilters}
        />

        <div className="flex-1">
          <ListingsHeader
            searchQuery={searchQuery}
            sortBy={sortBy}
            resultsCount={filteredListings.length}
            onSearchChange={setSearchQuery}
            onSortChange={setSortBy}
          />

          {filteredListings.length > 0 ? (
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8">
              {paginatedListings.map((listing) => (
                <ServiceListingCard key={listing.id} listing={listing} />
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
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-full w-12 h-12 cursor-pointer ${
                      currentPage === page
                        ? "bg-[#efe9ff] text-[#1857f7]"
                        : "hover:bg-[#efe9ff]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-full w-12 h-12 hover:bg-[#efe9ff] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-chevron-right"></i>
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
