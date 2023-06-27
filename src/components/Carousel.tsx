"use client";

import { useState } from "react";
import { AnimatePresence, Variants } from "framer-motion";
import { Button } from "@nextui-org/button";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import useMeasure from "react-use-measure";
import {
  Buttons,
  CarouselBox,
  CarouselContainer,
  CarouselImg,
  Description,
  NavBtnContainer,
  Title,
} from "@/styles/Carousel";
import Image from "next/image";

function usePrevious(state: number) {
  const [tuple, setTuple] = useState([null, state]);
  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }
  return tuple[0];
}

const variants: Variants = {
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({ x: direction * -width }),
};

const Carousel: React.FC = () => {
  let [count, setCount] = useState(0);
  let [ref, { width }] = useMeasure();
  let prev = usePrevious(count) || 0;
  let direction: number = count > prev ? 1 : -1;
  const carouselItems = [
    {
      src: "/images/ariana.png",
      title: "0 Ariana Grande",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    },
    {
      src: "/images/ariana.png",
      title: "1 Ariana Grande",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    },
    {
      src: "/images/ariana.png",
      title: "2 Ariana Grande",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    },
    {
      src: "/images/ariana.png",
      title: "3 Ariana Grande",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    },
  ];

  return (
    <CarouselContainer ref={ref}>
      <AnimatePresence custom={{ direction, width }}>
        <CarouselBox
          key={count}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={{ direction, width }}
          transition={{ type: "linear" }}
        >
          <Image
            src={carouselItems[count]?.src}
            alt="carousel image"
            style={{ objectFit: "contain" }}
            className="absolute right-24 mt-10 drop-shadow-md"
            width={300}
            height={300}
          />

          <Title>{carouselItems[count]?.title}</Title>
          <Description>{carouselItems[count]?.desc}</Description>
          <Buttons>
            <Button
              isIconOnly
              radius="full"
              variant="ghost"
              startContent={<Plus />}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              variant="ghost"
              startContent={<Heart />}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              variant="ghost"
              startContent={<MoreHorizontal />}
            ></Button>
          </Buttons>
        </CarouselBox>
      </AnimatePresence>
      <NavBtnContainer>
        <Button
          isIconOnly
          variant="light"
          startContent={<ChevronLeft />}
          size="lg"
          onPress={() =>
            setCount((count - 1 + carouselItems.length) % carouselItems.length)
          }
          radius="full"
        />
        <Button
          isIconOnly
          variant="light"
          startContent={<ChevronRight />}
          size="lg"
          onPress={() => setCount((count + 1) % carouselItems.length)}
          radius="full"
        />
      </NavBtnContainer>
    </CarouselContainer>
  );
};

export default Carousel;
