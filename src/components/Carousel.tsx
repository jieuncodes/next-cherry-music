"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, Variants } from "framer-motion";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";

import {
  ChevronRight,
  ChevronLeft,
  Heart,
  MoreHorizontal,
  Plus,
} from "lucide-react";
//todo: make all the buttons to come from the server component for the best UX.
import {
  Buttons,
  CarouselBox,
  CarouselContainer,
  Description,
  NavBtnContainer,
  Title,
} from "@/styles/Carousel";
import Image from "next/image";


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

  const carouselItems = [
    {
      bgColor: "pink",
      src: "/images/ariana.png",
      title: "0 Ariana Grande",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    },
    {
      bgColor: "grey",
      src: "/images/tailor.png",
      title: "Taylor Swift",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    },
    {
      bgColor: "purple",

      src: "/images/ariana.png",
      title: "2 Ariana Grande",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    },
    {
      bgColor: "lightblue",

      src: "/images/ariana.png",
      title: "3 Ariana Grande",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    },
  ];
  
  const variants: Variants = {
    enter: { opacity: 0, backgroundColor: carouselItems[count]?.bgColor },
    active: (custom) => ({
      opacity: 1,
      backgroundColor: custom,
      transition: { delay: 0.5, duration: 0.2 }
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
            className="absolute right-10 -mt-10 drop-shadow-md"
          >
            <Image
              src={carouselItems[count]?.src}
              alt="carousel image"
              style={{ objectFit: "contain" }}
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
                  startContent={<Plus />}
                ></Button>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  startContent={<Heart />}
                ></Button>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  startContent={<MoreHorizontal />}
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
          startContent={<ChevronLeft />}
          size="xl"
          onPress={() =>
            setCount((count - 1 + carouselItems.length) % carouselItems.length)
          }
          radius="full"
        />
        <Button
          isIconOnly
          variant="light"
          startContent={<ChevronRight />}
          size="xl"
          onPress={() => setCount((count + 1) % carouselItems.length)}
          radius="full"
        />
      </NavBtnContainer>
    </CarouselContainer>
  );
};

export default Carousel;
