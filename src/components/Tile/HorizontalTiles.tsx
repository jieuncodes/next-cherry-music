import { ArtistTiles } from "@/styles/Artist/Artist";
import { SectionContainer, SectionTitle } from "@/styles/Section";
import { useRouter } from "next/navigation";
import Tile from "./Tile";

interface HorizontalTilesProps {
  sectionTitle?: string;
  arr: any[];
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
  const router = useRouter();
  if (arr.length === 0) return <></>;
  console.log(arr);
  const handleTileClick = (name: string) => {
    router.push(`/${arr}/${name}`);
    return;
  };

  return (
    <SectionContainer>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <ArtistTiles>
        {arr.slice(0, arr.length - 1).map((item: itemProps, index) => (
          <Tile
            key={index}
            item={item.name}
            handleTileClick={() => handleTileClick(item.name)}
            isCircle={isCircle}
          />
        ))}
      </ArtistTiles>
    </SectionContainer>
  );
}
export default HorizontalTiles;
