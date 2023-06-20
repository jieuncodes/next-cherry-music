import { getAndSaveLastFmTopTracks } from "../api/lastFm";

export default async function TopChart() {
  const lastFmTopTracks = await getAndSaveLastFmTopTracks();
  // console.log("a", lastFmTopTracks);
  return;
}
