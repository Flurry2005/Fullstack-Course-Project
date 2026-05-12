import Card from "./Section2Card";

function Section2Grid() {
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mt-12">
      <Card title="Design" icon={<i className="fa-solid fa-palette"></i>} />
      <Card title="Development" icon={<i className="fa-solid fa-code"></i>} />
      <Card title="Video" icon={<i className="fa-solid fa-video"></i>} />
      <Card title="Writing" icon={<i className="fa-solid fa-pen"></i>} />
      <Card title="SEO" icon={<i className="fa-solid fa-chart-line"></i>} />
      <Card title="Audio" icon={<i className="fa-solid fa-microphone"></i>} />
    </div>
  );
}

export default Section2Grid;
