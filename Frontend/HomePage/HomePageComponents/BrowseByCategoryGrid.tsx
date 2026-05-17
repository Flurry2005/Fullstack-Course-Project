import Card from "./BrowseByCategoryCard";

function Section2Grid() {
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10 sm:mt-12">
      <Card
        to="services"
        title="Design"
        icon={<i className="fa-solid fa-palette"></i>}
      />
      <Card
        to="services"
        title="Development"
        icon={<i className="fa-solid fa-code"></i>}
      />
      <Card
        to="services"
        title="Video"
        icon={<i className="fa-solid fa-video"></i>}
      />
      <Card
        to="services"
        title="Writing"
        icon={<i className="fa-solid fa-pen"></i>}
      />
      <Card
        to="services"
        title="SEO"
        icon={<i className="fa-solid fa-chart-line"></i>}
      />
      <Card
        to="services"
        title="Audio"
        icon={<i className="fa-solid fa-microphone"></i>}
      />
    </div>
  );
}

export default Section2Grid;
