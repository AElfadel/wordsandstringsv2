import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react/hooks";

import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/Button";
import { error } from "console";

type FileUploaderProps = {
  onFieldChange: (value: string) => void;
  imageUrl: string;
  //State for files type
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function FileUploader({
  onFieldChange,
  imageUrl,
  setFiles,
}: FileUploaderProps) {
  //Drop back
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    const fileUrl = convertFileToUrl(acceptedFiles[0]);
    onFieldChange(fileUrl);
  }, []);

  //useDropZone hook from uploadthing
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
    maxSize: 4 * 1024 * 1024, // 2MB in bytes
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="uploaded image preview"
            width={250}
            height={250}
            className="w-full object-cover object-center z-0"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload"
          />
          <h3 className="mb-2 mt-2">Drag event cover here</h3>
          <p className="p-medium-12 mb-4">1 Image</p>
          <p className="p-medium-12 mb-4">PNG, JPG, SVG Format </p>
          <p className="p-medium-12 mb-4">Maximum size 4MB</p>

          <Button type="button" className="rounded-full">
            Select from device
          </Button>
        </div>
      )}
    </div>
  );
}
