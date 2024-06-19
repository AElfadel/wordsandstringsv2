import React from "react";
import RegisterToPerform from "./RegisterToPerform";

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
        <div className="bg-slate-800 text-white rounded-md p-2 ">
          Application to perform sent{" "}
        </div>
      ) : (
        <RegisterToPerform id={id} />
      )}
    </>
  );
}

export default PerformerCheck;
