"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.info &&
      typeof result.info === "object" &&
      "secure_url" in result.info
    ) {
      onChange(result.info.secure_url);
    } else if (typeof result.info === "string") {
      onChange(result.info);
    }
  };

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!uploadPreset) {
    console.error(
      "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET 환경 변수가 설정되지 않았습니다."
    );
  }

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-300 rounded-xl hover:border-indigo-500 hover:text-indigo-500"
          >
            <TbPhotoPlus size={50} />
            <p className="text-sm text-neutral-600">이미지를 업로드하세요</p>
            {value && (
              <div className="absolute inset-0 size-full rounded-xl overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  src={value}
                  alt="업로드된 이미지"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
