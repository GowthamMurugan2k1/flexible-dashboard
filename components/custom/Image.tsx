import { ImageType } from "@/types/custom";
import Image from "next/image";

const CustomImage = ({
  alt = "default image",
  height = 100,
  src,
  width = 100,
  isFill,
}: ImageType) => {
  return (
    <Image src={src} alt={alt} height={height} width={width} fill={isFill} />
  );
};
export default CustomImage;
