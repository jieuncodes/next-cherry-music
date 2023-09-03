import {
  Buttons,
  CarouselImg,
  CarouselText,
  Description,
  Title,
} from "@/styles/Carousel";
import { Variants } from "framer-motion";
import Image from "next/image";
import FlatIconButton from "../Btns/FlatIconBtn";
import { Icons } from "../../app/Icons";
import { Database } from "@/lib/server/database.types";
import LikeArtistBtn from "../Btns/LikeArtistBtn";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";

function CarouselItem({
  carouselItem,
}: {
  carouselItem: Database["public"]["Tables"]["carousel"]["Row"];
}) {
  const [item, setItem] = useState<
    Database["public"]["Tables"]["carousel"]["Row"] | null
  >(null);
  const user = useUser();

  useEffect(() => {
    setItem(carouselItem);
  }, [carouselItem]);

  return (
    <>
      <CarouselImg
        key={item?.id}
        variants={imageVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Image
          src={item?.src || "/images/ariana.png"}
          alt="carousel image"
          style={{
            objectFit: "contain",
            marginTop: item?.marginTop || "-2.5rem",
            marginLeft: item?.marginLeft || "0",
          }}
          width={item?.width || 300}
          height={item?.height || 300}
          placeholder="blur"
          blurDataURL="/images/taylor.png"
        />
      </CarouselImg>
      <CarouselText
        variants={parentVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Title variants={textVariants}>{item?.title}</Title>

        <Description variants={textVariants}>{item?.desc}</Description>
        {/* todo: add onClick to buttons  */}
        <Buttons variants={textVariants}>
          <FlatIconButton startContent={<Icons.plus />} onClick={() => {}} />
          <LikeArtistBtn
            isBlack
            isFlat
            user={user}
            artistName={item?.onClickPushRouter?.split("/")[2]}
            isDisabled={!item}
          />
          <FlatIconButton
            startContent={<Icons.moreHorizontal />}
            onClick={() => {}}
          />
        </Buttons>
      </CarouselText>
    </>
  );
}

export default CarouselItem;

const imageVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 3,
    },
  },
};
const parentVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0 },
};
const textVariants: Variants = {
  hidden: { y: 100 },
  show: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: { y: 100, transition: { delay: 1 } },
};
