import { carouselItems } from "@/database/carouselItems";
import { Buttons, Description, Title } from "@/styles/Carousel";
import { Button } from "@nextui-org/button";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { Icons } from "./Icons";
import FlatIconButton from "./icons/FlatIconBtn";

function CarouselItem({ carouselIdx }: { carouselIdx: number }) {
  return (
    <>
      <motion.div
        key={carouselIdx}
        variants={imageVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="absolute right-10 drop-shadow-md"
      >
        <Image
          src={carouselItems[carouselIdx]?.src}
          alt="carousel image"
          style={{
            objectFit: "contain",
            marginTop: carouselItems[carouselIdx]?.marginTop,
            marginLeft: carouselItems[carouselIdx]?.marginLeft,
          }}
          width={300}
          height={300}
        />
      </motion.div>

      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Title variants={textVariants}>
          {carouselItems[carouselIdx]?.title}
        </Title>

        <Description variants={textVariants}>
          {carouselItems[carouselIdx]?.desc}
        </Description>
        {/* todo: add onClick to buttons  */}
        <Buttons variants={textVariants}>
          <FlatIconButton startContent={<Icons.plus />} onClick={() => {}} />
          <FlatIconButton startContent={<Icons.heart />} onClick={() => {}} />
          <FlatIconButton
            startContent={<Icons.moreHorizontal />}
            onClick={() => {}}
          />
        </Buttons>
      </motion.div>
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
