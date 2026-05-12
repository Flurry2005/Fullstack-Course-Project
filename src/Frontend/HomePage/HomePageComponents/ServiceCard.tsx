interface Props {
  image: string;
  rating: string;
  name: string;
  description: string;
  price: string;
}

function ServiceCard({ image, rating, name, description, price }: Props) {
  return (
    <article className="bg-white shadow-sm hover:shadow-md rounded-2xl overflow-hidden transition hover:-translate-y-1 cursor-pointer">
      <div className="relative">
        {/*Service Image*/}
        <img src={image} alt={name} className="w-full h-45 object-cover" />
        {/*Rating Badge*/}
        <div className="top-3 right-3 absolute flex items-center gap-1 bg-white shadow px-2 py-1 rounded-lg text-sm">
          ⭐ {rating}
        </div>
        {/*The Content of the Card*/}
        <div className="p-5">
          {/*The User*/}
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gray-300 rounded-full w-7 h-7" />
            <span className="font-medium text-[#23235b] text-sm">{name}</span>
          </div>

          {/*Description*/}
          <p className="mb-6 text-[#6f6f9a] text-sm line-clamp-2">
            {description}
          </p>

          {/*The price*/}
          <div className="flex justify-between">
            <span className="text-[#6f6f9a]">STARTING AT</span>
            <span className="font-semibold text-[#1857f7]">{price}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;
