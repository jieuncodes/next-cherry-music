import { Tiles } from "@/styles/Artist/Artist";
import { SectionContainer, SectionTitle } from "@/styles/Section";
import { useRouter } from "next/navigation";
import Tile from "./Tile";
import SectionNavigator from "../SectionNavigator";
import { useRef } from "react";

interface HorizontalTilesProps {
  sectionTitle?: string;
  arr: { type: string; items: any[] };
  isCircle?: boolean;
}
interface itemProps {
  name: string;
}

function HorizontalTiles({
  sectionTitle,
  arr,
  isCircle,
}: HorizontalTilesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  if (arr.items.length === 0) return <></>;

  const handleTileClick = (name: string) => {
    router.push(`/${arr.type}/${name}`);
    return;
  };
  return (
    <SectionContainer>
      {!isCircle && <SectionNavigator refContainer={ref} scrollAmount={650} />}
      <SectionTitle>{sectionTitle}</SectionTitle>
      <Tiles
        ref={ref}
        className={`snap-x ${!isCircle ? "top-12 gap-3" : "w-fit gap-10"}`}
      >
        {arr.items
          .slice(0, arr.items.length - 1)
          .map((item: itemProps, index) => (
            <Tile
              key={index}
              item={item.name}
              handleTileClick={() => handleTileClick(item.name)}
              isCircle={isCircle}
            />
          ))}
      </Tiles>
    </SectionContainer>
  );
}
export default HorizontalTiles;
