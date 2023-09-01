"use client";

import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import {
  CarouselBox,
  CarouselContainer,
  NavBtnContainer,
} from "@/styles/Carousel";
import { Icons } from "../../app/Icons";
import CarouselItem from "./CarouselItem";
import ChevronBtn from "../Btns/ChevronBtn";
import { useCarouselItems } from "@/hooks/useCarouselItems";
import { useRouter } from "next/navigation";

function Carousel() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const { carouselItems, isLoading } = useCarouselItems();
  const router = useRouter();

  const variants: Variants = {
    enter: {
      opacity: 0,
    },
    active: () => ({
      opacity: 1,
      transition: { delay: 0.5, duration: 0.2 },
    }),
    exit: { opacity: 0 },
  };
  return (
    <CarouselContainer
      className="cursor-pointer z-20"
      onClick={() => {
        router.push(carouselItems[carouselIdx].onClickPushRouter as string);
      }}
    >
      <AnimatePresence>
        <CarouselBox
          key={carouselIdx}
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit"
          className={`bg-gradient-to-r from-pink-300 from-10% to-violet-300 to-90% `}
        >
          <CarouselItem carouselItem={carouselItems[carouselIdx]} />
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
