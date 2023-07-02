"use client";

import { useState } from "react";
import { AnimatePresence, Variants } from "framer-motion";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";

import {
  Buttons,
  CarouselBox,
  CarouselContainer,
  Description,
  NavBtnContainer,
  Title,
} from "@/styles/Carousel";
import Image from "next/image";
import { Icons } from "./Icons";
import { carouselItems } from "@/database/carouselItems";

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
const textVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: { y: 100, opacity: 0, transition: { delay: 1 } },
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

const Carousel: React.FC = () => {
  let [count, setCount] = useState(0);



  const variants: Variants = {
    enter: { opacity: 0, backgroundColor: carouselItems[count]?.bgColor },
    active: (custom) => ({
      opacity: 1,
      backgroundColor: custom,
      transition: { delay: 0.5, duration: 0.2 },
    }),
    exit: { opacity: 0 },
  };

  return (
    <CarouselContainer>
      <AnimatePresence>
        <CarouselBox
          key={count}
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit"
        >
          <motion.div
            key={count}
            variants={imageVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="absolute right-10 drop-shadow-md"

          >
            <Image
              src={carouselItems[count]?.src}
              alt="carousel image"
              style={{ objectFit: "contain" , marginTop: carouselItems[count]?.marginTop, marginLeft: carouselItems[count]?.marginLeft}}

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
            <motion.div variants={textVariants}>
              <Title>{carouselItems[count]?.title}</Title>
            </motion.div>

            <motion.div variants={textVariants}>
              <Description>{carouselItems[count]?.desc}</Description>
            </motion.div>
            <motion.div variants={textVariants}>
              <Buttons>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  startContent={<Icons.plus />}
                ></Button>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  startContent={<Icons.heart />}
                ></Button>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  startContent={<Icons.moreHorizontal />}
                ></Button>
              </Buttons>
            </motion.div>
          </motion.div>
        </CarouselBox>
      </AnimatePresence>
      <NavBtnContainer>
        <Button
          isIconOnly
          variant="light"
          startContent={<Icons.chevronLeft />}
          size="xl"
          onPress={() =>
            setCount((count - 1 + carouselItems.length) % carouselItems.length)
          }
          radius="full"
        />
        <Button
          isIconOnly
          variant="light"
          startContent={<Icons.chevronRight />}
          size="xl"
          onPress={() => setCount((count + 1) % carouselItems.length)}
          radius="full"
        />
      </NavBtnContainer>
    </CarouselContainer>
  );
};

export default Carousel;
