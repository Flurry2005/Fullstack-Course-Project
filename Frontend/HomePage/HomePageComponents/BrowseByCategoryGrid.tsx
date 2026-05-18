import Card from "./BrowseByCategoryCard";
import { getServicesCategoryLink } from "./serviceLinks";

function Section2Grid() {
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10 sm:mt-12">
      <Card
        to={getServicesCategoryLink("Online & Digital Services")}
        title="Online & Digital"
        icon={<i className="fa-solid fa-palette"></i>}
      />
      <Card
        to={getServicesCategoryLink("IT & Tech Support")}
        title="IT & Tech"
        icon={<i className="fa-solid fa-code"></i>}
      />
      <Card
        to={getServicesCategoryLink("Creative & Media Production")}
        title="Creative Media"
        icon={<i className="fa-solid fa-video"></i>}
      />
      <Card
        to={getServicesCategoryLink("Professional Services")}
        title="Professional"
        icon={<i className="fa-solid fa-pen"></i>}
      />
      <Card
        to={getServicesCategoryLink("Education & Tutoring")}
        title="Education"
        icon={<i className="fa-solid fa-chart-line"></i>}
      />
      <Card
        to={getServicesCategoryLink("Health & Wellness")}
        title="Wellness"
        icon={<i className="fa-solid fa-microphone"></i>}
      />
    </div>
  );
}

export default Section2Grid;
