import { HeaderImg, BlurredGradient } from "@/styles/Artist/Artist";
import Image from "next/image";

interface ArtistHeaderProps {
  imageUrl: string;
  name: string;
}

function ArtistHeader({ imageUrl, name }: ArtistHeaderProps) {
  return (
    <HeaderImg>
      <Image
        src={imageUrl || "/images/default_band.png"}
        alt={name}
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
        priority
      />
      <BlurredGradient />
    </HeaderImg>
  );
}

export default ArtistHeader;
