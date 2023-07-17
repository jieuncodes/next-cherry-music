import { carouselItems } from "@/database/carouselItems";
import {
  Buttons,
  CarouselContainer,
  CarouselImg,
  CarouselText,
  Description,
  Title,
} from "@/styles/Carousel";
import { Variants } from "framer-motion";
import Image from "next/image";
import FlatIconButton from "../icons/FlatIconBtn";
import { Icons } from "../Icons";
import { Database } from "@/lib/server/database.types";
function CarouselItem({
  carouselItem,
}: {
  carouselItem: Database["public"]["Tables"]["carousel"]["Row"];
}) {
  return (
    <>
      <CarouselImg
        key={carouselItem?.id}
        variants={imageVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Image
          src={carouselItem?.src || "/images/ariana.png"}
          alt="carousel image"
          style={{
            objectFit: "contain",
            marginTop: carouselItem?.marginTop || "-2.5rem",
            marginLeft: carouselItem?.marginLeft || "0",
          }}
          width={300}
          height={300}
          priority={true}
        />
      </CarouselImg>
      <CarouselText
        variants={parentVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Title variants={textVariants}>{carouselItem?.title}</Title>

        <Description variants={textVariants}>{carouselItem?.desc}</Description>
        {/* todo: add onClick to buttons  */}
        <Buttons variants={textVariants}>
          <FlatIconButton startContent={<Icons.plus />} onClick={() => {}} />
          <FlatIconButton startContent={<Icons.heart />} onClick={() => {}} />
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
