"use client";

import { Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Tag = { name: string; url: string };

function Hashtags({ tags }: { tags: Tag[] }) {
  const router = useRouter();

  const goToHashtagPage = (tag: string) => {
    router.push(`/hashtag/${tag}`);
  };
  return (
    <div className="flex gap-2 mb-3">
      {tags.map((tag, index) => (
        <Chip
          onClick={() => goToHashtagPage(tag.name)}
          key={index}
          classNames={{
            base: "bg-cherry/50 hover:bg-cherry/60 hover:cursor-pointer",
            content: "drop-shadow shadow-black text-white",
          }}
        >
          # {tag.name}
        </Chip>
      ))}
    </div>
  );
}
export default Hashtags;
