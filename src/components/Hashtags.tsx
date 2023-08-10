import { Chip } from "@nextui-org/react";

type Tag = { name: string; url: string };

function Hashtags({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex gap-2 mb-3">
      {tags.map((tag, index) => (
        <Chip
          key={index}
          classNames={{
            base: "bg-cherry/40 hover:bg-cherry/60 hover:cursor-pointer",
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
