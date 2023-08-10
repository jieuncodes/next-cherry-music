import { Skeleton } from "@nextui-org/react";

function ArtistBadgeSkeleton() {
  return (
    <div className="flex flex-col justify-center align-middle  items-center hover:cursor-pointer">
      <Skeleton className="rounded-full h-28 w-28 bg-cover" />
      <Skeleton className=" h-4 w-3/5 rounded-lg mt-3" />
    </div>
  );
}
export default ArtistBadgeSkeleton;
