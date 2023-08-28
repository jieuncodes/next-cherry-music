import { StyledCard } from "@/styles/TrackCard";
import { Skeleton } from "@nextui-org/react";
import { useRef } from "react";

function TrackCardSkeleton() {
  return (
    <StyledCard className="flex flex-row p-3">
      <Skeleton className="relative flex rounded-md w-12 h-10" />
      <div className="w-full flex flex-col gap-2 pt-1 ml-3">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </StyledCard>
  );
}
export default TrackCardSkeleton;
