import NavBar from "../NavBar";
import Footer from "../Footer";
import ServiceHeader from "./ServiceHeader";
import PurchaseOptions from "./PurchaseOptions";
import AboutService from "./AboutService";
import AboutSeller from "./AboutSeller";
import ClientReflections from "./ClientReflections";

type MainProps = {
  mainCategory: string | null;
  subCategoryOne: string | null;
  subCategoryTwo: string | null;
};

function Main({ mainCategory, subCategoryOne, subCategoryTwo }: MainProps) {
  /*Temporary variables for demo */
  mainCategory = "Graphics & Design";
  subCategoryOne = "Logo Design";
  subCategoryTwo = "Modern Branding";

  return (
    <>
      <NavBar />
      {/* Service category section */}
      <main className="flex flex-col gap-6 bg-[#f9f5ff] p-6">
        <div className="flex text-[#5A5781] gap-1">
          <span>{mainCategory}</span>
          <span>{">"}</span>
          <span>{subCategoryOne}</span>
          <span>{">"}</span>
          <span className="text-[#2C2A51] font-bold">{subCategoryTwo}</span>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-3 md:items-start">
          {/* Service header and images */}
          <section className="w-full md:col-span-2">
            <ServiceHeader
              title="I will teach you how to fish and master bait"
              seller="Elena Vance"
              rating={4.9}
              reviewsAmount={494}
              about="Welcome to a space where design meets intentionality. I specialize in crafting digital brand
identities that don't just look beautiful—they communicate authority and professional excellence.
In the digital age, your brand is your atelier. My process involves deep research into your market
positioning, followed by iterative design sprints that culminate in a cohesive visual language."
            />
          </section>

          {/* Purchase options */}
          <section className="w-full md:col-span-1">
            <PurchaseOptions
              options={{
                Basic: {
                  title: "The foundation",
                  about:
                    "Perfect for independent creators needing a high-impact core identity.",
                  price: 12,
                },
                Standard: {
                  title: "Professional presence",
                  about:
                    "Ideal for brands that want a stronger visual system and more polish.",
                  price: 64,
                },
                Premium: {
                  title: "Full brand experience",
                  about:
                    "Best for businesses that need complete branding depth and premium presentation.",
                  price: 55,
                },
              }}
            />
          </section>

          <section className="w-full md:col-span-2">
            <AboutService about={"placeholder"} />
          </section>

          <section className="w-full md:col-span-2">
            <AboutSeller about={"placeholder"} />
          </section>

          <section className="w-full md:col-span-2">
            <ClientReflections/>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
