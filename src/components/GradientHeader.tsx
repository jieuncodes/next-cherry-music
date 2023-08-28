"use client";

import { HeaderImg, BlurredGradient } from "@/styles/Artist/Artist";
import Image from "next/image";

interface GradientHeaderProps {
  imageUrl: string;
  name: string;
}

function GradientHeader({ imageUrl, name }: GradientHeaderProps) {
  return (
    <HeaderImg>
      <Image
        src={imageUrl || "/images/default_band.png"}
        alt={name}
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center 40%",
          opacity: 0.8,
        }}
        priority
      />
      <BlurredGradient />
    </HeaderImg>
  );
}

export default GradientHeader;
