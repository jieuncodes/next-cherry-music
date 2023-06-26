"use client";

import { useEffect, useState } from "react";
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
import { Buttons, CarouselBox, CarouselContainer, CarouselImg, Description, NavBtnContainer, Title } from "@/styles/Carousel";

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

  useEffect(() => {
    if (direction === -1 && prev === 0) {
      setCount(carouselItems.length - 1);
    }
    if (direction === 1 && prev === carouselItems.length - 1) {
      setCount(0);
    }
  }, [count]);
  return (
    <CarouselContainer ref={ref}>
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
      <AnimatePresence custom={{ direction, width }}>
        <CarouselImg />
        <CarouselBox
          key={count}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={{ direction, width }}
          transition={{ type: "linear" }}
        >
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
    </CarouselContainer>
  );
};

export default Carousel;
