import me from "../../assets/react.svg";
import profileRatingsIcon from "../../assets/profile-ratings-icon.svg";
import type { Gig } from "../../types/Gig";

type ClientReflectionsProps = {
  gig: Gig;
};

const reflectionsDemo = [
  {
    author: "Sarah Jenkins",
    profession: "Founder of Lumina Studio",
    avatar: me,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis labore, officia quibusdam aspernatur dolor vel molestiae quidem dolores sit tempora.",
    rating: 3,
  },
  {
    author: "Marcus Chen",
    profession: "Lead Developer at Nexus",
    avatar: me,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis officiis hic quia accusantium ea maiores sunt quam eos, minus laudantium ad delectus perferendis magni tempora repellendus accusamus, exercitationem nihil eveniet.",
    rating: 5,
  },
  {
    author: "Marcus Chen",
    profession: "Lead Developer at Nexus",
    avatar: me,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis officiis hic quia accusantium ea maiores sunt quam eos, minus laudantium ad delectus perferendis magni tempora repellendus accusamus, exercitationem nihil eveniet.",
    rating: 5,
  },
];

function ClientReflections({ gig }: ClientReflectionsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h5 className="text-[#2C2A51] text-2xl">Client Reflections</h5>
        <span className="flex flex-wrap gap-1 ml-auto">
          <span className="flex font-bold text-[#2C2A51] max-sm:text-sm">
            <img src={profileRatingsIcon} className="w-6 h-6" />
            4.9
          </span>
          <span className="text-[#5A5781] max-sm:text-sm">(1.240 Reviews)</span>
        </span>
      </div>

      {gig.reviews?.slice(0, 10).map((e) => (
        <div
          key={e.reviewer}
          className="flex flex-col gap-3 p-6 border border-[#ACA8D7]/10 rounded-2xl"
        >
          <div className="flex items-center gap-3 w-full">
            <img src={me} className="rounded-full w-12 h-12" />
            <div className="flex flex-col flex-wrap">
              <span className="font-bold text-[#2C2A51] text-sm">
                {e.reviewer}
              </span>
              <span className="text-[#5A5781] max-sm:text-xs text-sm">
                {"Job title"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 ml-auto">
              {Array.from({ length: e.rating || 0 }, (_, i) => (
                <img key={i} src={profileRatingsIcon} className="w-3 h-3" />
              ))}
            </div>
          </div>
          <p className="text-[#5A5781] text-sm">{e.comment}</p>
        </div>
      ))}
      {reflectionsDemo.length > 2 && (
        <span className="place-self-center font-bold text-[#0050D4]">
          Read all {reflectionsDemo.length} reviews
        </span>
      )}
    </div>
  );
}

export default ClientReflections;
