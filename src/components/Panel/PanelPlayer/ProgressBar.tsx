import { Progress } from "@nextui-org/react";

function ProgressBar() {
  return (
    <div className="flex flex-col mt-3 gap-1">
      <Progress
        aria-label="Music progress"
        classNames={{
          indicator: "bg-default-800 dark:bg-white",
          track: "bg-default-500/30",
        }}
        color="default"
        size="sm"
        value={33}
      />
      <div className="flex justify-between">
        <p className="text-small">1:23</p>
        <p className="text-small text-foreground/50">4:32</p>
      </div>
    </div>
  );
}
export default ProgressBar;
