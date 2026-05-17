import { useNavigate } from "react-router-dom";

interface Props {
  image: string;
  rating: string;
  name: string;
  description: string;
  price: string;
  to: string;
}

function ServiceCard({ image, rating, name, description, price, to }: Props) {
  const navigate = useNavigate();

  return (
    <article className="bg-white shadow-sm hover:shadow-md rounded-2xl w-full overflow-hidden transition hover:-translate-y-1 cursor-pointer">
      <div
        className="relative"
        onClick={() => {
          navigate(`${"/" + to}`);
        }}
      >
        {/* Service Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover"
        />

        {/* Rating Badge */}
        <div className="top-2 sm:top-3 right-2 sm:right-3 absolute flex items-center gap-1 bg-white shadow px-2 py-1 rounded-lg text-xs sm:text-sm">
          ⭐ {rating}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* User */}
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gray-300 rounded-full w-6 sm:w-7 h-6 sm:h-7" />
            <span className="font-medium text-[#23235b] text-sm sm:text-base">
              {name}
            </span>
          </div>

          {/* Description */}
          <p className="mb-5 text-[#6f6f9a] text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Price */}
          <div className="flex justify-between items-center">
            <span className="text-[#6f6f9a] text-xs sm:text-sm">
              STARTING AT
            </span>
            <span className="font-semibold text-[#1857f7] text-sm sm:text-base">
              {price}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;
