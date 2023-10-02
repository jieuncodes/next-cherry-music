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
        loading="lazy"
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center 40%",
          opacity: 0.8,
        }}
        placeholder="blur"
        priority
      />
      <BlurredGradient />
    </HeaderImg>
  );
}

export default GradientHeader;
