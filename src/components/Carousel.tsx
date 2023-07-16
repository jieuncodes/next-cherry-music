"use client";

import { Button } from "@nextui-org/button";
import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { carouselItems } from "@/database/carouselItems";
import {
  CarouselBox,
  CarouselContainer,
  NavBtnContainer,
} from "@/styles/Carousel";
import { Icons } from "./Icons";
import CarouselItem from "./CarouselItem";
import ChevronBtn from "./icons/ChevronBtn";

function Carousel() {
  let [carouselIdx, setCarouselIdx] = useState(0);

  const variants: Variants = {
    enter: { opacity: 0, backgroundColor: carouselItems[carouselIdx]?.bgColor },
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
          key={carouselIdx}
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit"
        >
          <CarouselItem carouselIdx={carouselIdx} />
        </CarouselBox>
      </AnimatePresence>

      <NavBtnContainer>
        <ChevronBtn
          startContent={<Icons.chevronLeft />}
          onPress={() =>
            setCarouselIdx(
              (carouselIdx - 1 + carouselItems.length) % carouselItems.length
            )
          }
        />
        <ChevronBtn
          startContent={<Icons.chevronRight />}
          onPress={() =>
            setCarouselIdx((carouselIdx + 1) % carouselItems.length)
          }
        />
      </NavBtnContainer>
    </CarouselContainer>
  );
}

export default Carousel;
