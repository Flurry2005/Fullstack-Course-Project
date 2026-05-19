import { useEffect, useState } from "react";

type QueueItem = {
  accont_name: string;
  title: string;
  imageString: string;
  description: string;
  category: string;
};

function QueueCard() {
  const [items, setItems] = useState<QueueItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      // här simulerar vi API
      const fakeData: QueueItem[] = [
        {
          accont_name: "Dreiv",
          title: "Custom design for animal",
          imageString:
            "https://res.cloudinary.com/dnpnpkqig/image/upload/v1779150334/gigPreviewImages/6a06268218421dc56df078c4-1.webp",
          description: "GOONER GOOBER GABBLA",
          category: "Design",
        },
        {
          accont_name: "YungErk",
          title: "Wallpaper for everyone",
          imageString:
            "https://res.cloudinary.com/dnpnpkqig/image/upload/v1779150334/gigPreviewImages/6a06268218421dc56df078c4-1.webp",
          description: "GOONER GOOBER GABBLA",
          category: "Computer Design",
        },
        {
          accont_name: "FlurryDick",
          title: "Ballsack By flurry",
          imageString:
            "https://res.cloudinary.com/dnpnpkqig/image/upload/v1779150334/gigPreviewImages/6a06268218421dc56df078c4-1.webp",
          description: "GOONER GOOBER GABBLA",
          category: "Ballsack",
        },
      ];

      setItems(fakeData);
    }

    // kör direkt första gången
    fetchData();

    // sen varje 10:e sekund
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    // cleanup (VIKTIG)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {items.map((item) => (
        <div
          key={item.accont_name}
          className="flex bg-[#F3EEFF] shadow-xl mb-3 p-4 rounded-xl w-full"
        >
          <img
            className="p-3 rounded-2xl w-25 h-25"
            src={item.imageString}
            alt="Häst"
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <p className="mt-2 font-medium text-xl">{item.title}</p>
              <span className="bg-[#DCC9FF] px-2 py-1 rounded-md text-gray-600 text-sm">
                {item.category}
              </span>
            </div>
            <p className="mt-2 text-sm">
              Created by:{" "}
              <span className="text-blue-400 cursor-pointer">
                {item.accont_name}
              </span>
            </p>
            <p className="mt-2 text-sm">{item.description}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 ml-5">
            <button className="bg-blue-400 px-4 py-2 rounded-lg w-full font-medium text-white text-sm cursor-pointer">
              Approve
            </button>
            <button className="bg-blue-400 px-4 py-2 rounded-lg w-full font-medium text-white text-sm cursor-pointer">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QueueCard;
