import { SectionContainerMain, SectionGridMain } from "@/styles/Section";
import { StyledCard } from "@/styles/TrackCard";
import { Skeleton } from "@nextui-org/react";
import SectionNavigator from "../SectionNavigator";
import { useRef } from "react";

function TrackCardsSkeleton() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <SectionContainerMain>
      <SectionNavigator refContainer={ref} scrollAmount={300} />
      <SectionGridMain className="mt-12" ref={ref}>
        {Array(50)
          .fill(null)
          .map((_, index) => (
            <StyledCard className="flex flex-row p-3">
              <Skeleton className="relative flex rounded-md w-12 h-10" />
              <div className="w-full flex flex-col gap-2 pt-1 ml-3">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </StyledCard>
          ))}
      </SectionGridMain>
    </SectionContainerMain>
  );
}
export default TrackCardsSkeleton;
