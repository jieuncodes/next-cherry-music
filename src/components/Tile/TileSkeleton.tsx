import { Skeleton } from "@nextui-org/react";

function TileSkeleton({ isCircle }: { isCircle?: boolean }) {
  return (
    <div className="flex flex-col align-middle  items-center hover:cursor-pointer h-42 justify-start">
      <Skeleton
        className={`${
          isCircle ? "rounded-full" : "rounded-md"
        } h-40 w-40 bg-cover aspect-square`}
      />
      <Skeleton
        className={`${isCircle ? "w-3/5" : "w-40"} h-4  rounded-lg mt-3`}
      />
    </div>
  );
}
export default TileSkeleton;
