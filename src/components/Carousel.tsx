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
  enter: ({ direction }) => ({ x: direction, opacity: 0 }),
  active: { x: 0, opacity: 1, transition: { delay: 0.5 } },
  exit: ({ direction }) => ({ x: direction, opacity: 0 }),
};

const Carousel: React.FC = () => {
  let [count, setCount] = useState(0);
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
    <CarouselContainer>
      <AnimatePresence custom={{ direction }}>
        <CarouselBox
          key={count}
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit"
          custom={{ direction }}
          style={{
            flex: "none",
          }}
        >
          <Image
            src={carouselItems[count]?.src}
            alt="carousel image"
            style={{ objectFit: "contain" }}
            className="absolute right-10 -mt-10 drop-shadow-md"
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
