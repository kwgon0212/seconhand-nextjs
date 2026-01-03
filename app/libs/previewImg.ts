import { Dispatch, SetStateAction } from "react";

export const previewImg = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImgPreview: Dispatch<SetStateAction<string | null>>,
  setImg: Dispatch<SetStateAction<File | null>>
) => {
  if (!e.target.files) return;

  const file = e.target.files[0];
  setImg(file);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    if (typeof reader.result === "string") {
      setImgPreview(reader.result);
    }
  };
};
