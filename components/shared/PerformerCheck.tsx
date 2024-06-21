import React from "react";
import RegisterToPerform from "./RegisterToPerform";
import { Check } from "lucide-react";

function PerformerCheck({
  perfomerAlreadyApplied,
  id,
}: {
  perfomerAlreadyApplied: boolean;
  id: string;
}) {
  return (
    <>
      {perfomerAlreadyApplied ? (
        <div className=" text-white p-2 flex gap-2 ">
          <Check className="w-6 h-6" />
          <p> Application to perform sent</p>
        </div>
      ) : (
        <RegisterToPerform id={id} />
      )}
    </>
  );
}

export default PerformerCheck;
