import { SectionNav } from "@/styles/Section";
import GhostRoundBtn from "./Btns/ghostRoundBtn";
import { Icons } from "@/app/Icons";

interface SectionNavigatorProps {
  refContainer: React.RefObject<HTMLDivElement>;
  scrollAmount: number;
}

function SectionNavigator({
  refContainer,
  scrollAmount,
}: SectionNavigatorProps) {
  const scrollLeft = () => {
    if (refContainer.current) {
      refContainer.current.scrollTo({
        left: refContainer.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (refContainer.current) {
      refContainer.current.scrollTo({
        left: refContainer.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <SectionNav>
      <GhostRoundBtn
        size={"sm"}
        startContent={<Icons.chevronLeft size={20} />}
        onPress={scrollLeft}
      />
      <GhostRoundBtn
        size={"sm"}
        startContent={<Icons.chevronRight size={20} />}
        onPress={scrollRight}
      />
    </SectionNav>
  );
}
export default SectionNavigator;
