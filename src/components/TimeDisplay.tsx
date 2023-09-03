import { floatToTime } from "@/lib/utils/utils";
import { TimeFlow } from "@/styles/PlayBar";

function TimeDisplay({
  currentTime,
  duration,
}: {
  currentTime: number;
  duration: number;
}) {
  return (
    <TimeFlow>
      <span>{floatToTime(currentTime / 60)}</span>
      <span>/</span>
      <span> {floatToTime(duration / 60)}</span>
    </TimeFlow>
  );
}
export default TimeDisplay;
