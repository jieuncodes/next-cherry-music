import { Skeleton } from "@nextui-org/react";

function TileSkeleton({ isCircle }: { isCircle?: boolean }) {
  return (
    <div
      className={`flex flex-col justify-start align-middle  items-center hover:cursor-pointer snap-start ${
        isCircle ? "h-52 gap-1" : ""
      }`}
    >
      <Skeleton
        className={`${
          isCircle ? "rounded-full w-28 h-28" : "rounded-md h-40 w-40"
        }  bg-cover aspect-square`}
      />
      <Skeleton
        className={`${isCircle ? "w-28" : "w-40"} h-4 rounded-lg mt-3`}
      />
    </div>
  );
}
export default TileSkeleton;
