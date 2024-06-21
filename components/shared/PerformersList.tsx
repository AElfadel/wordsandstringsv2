import { getPerformers } from "@/lib/actions/performer.actions";
import {
  IPerfomer,
  IPerformerOne,
} from "@/lib/mongodb/database/models/performer.model";
import Image from "next/image";

export default async function PerformersList({ eventId }: { eventId: string }) {
  const performers = await getPerformers(eventId);

  return (
    <div className=" text-white md:wrapper">
      <h1 className="h2-bold p-2"> Performers List</h1>
      {/* Mobile Cards */}
      <div className=" py-4">
        {performers && performers.length === 0 ? (
          <div className="py-4 text-center text-black rounded-lg bg-white ">
            No Performers registered.
          </div>
        ) : (
          performers &&
          performers.map((performer: IPerformerOne, index: number) => (
            <div
              key={performer._id}
              className="flex flex-row gap-2 border rounded-lg p-4 mb-4 bg-white text-black  "
              style={{ boxSizing: "border-box" }}
            >
              <p className="rounded-full bg-black text-white px-2 h-fit">
                {index + 1}
                {/* Add counter here */}
              </p>
              <div className=" flex flex-1 flex-col text-sm">
                <div className="mx-2 capitalize font-bold text-wassecondary">
                  {performer.performanceType}
                </div>
                <div className=" text-lg flex font-semibold gap-2">
                  <p>
                    {" "}
                    {performer.fullName}
                    <br />
                    <span className="bg-black text-white rounded-md px-2">
                      {performer.soloOrGroup}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col">
                  <p className="text-xs text-wassecondary"> Fun Fact:</p>
                  <p className=" text-sm ">{performer.funFact}</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-xs text-wassecondary">Details:</p>
                  <p>{performer.performanceDetails}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-wassecondary">Language: </p>

                  <p>{performer.performanceLanguage}</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-xs text-wassecondary">Email: </p>
                  <p>{performer.email}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-wassecondary">Phone: </p>

                  <p>{performer.phoneNumber}</p>
                </div>
              </div>

              <div>
                <a href={performer.imgUrl} target="_blank">
                  <Image
                    src={performer.imgUrl}
                    width={200}
                    height={200}
                    alt="perfomer image"
                    className=" object-cover rounded-md max-w-[400px] max-h-[220px] md:content-center md:items-center h-full "
                  />
                </a>
                <p className="text-xs text-neutral-400 text-center p-0.5">
                  click on image for full size
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
