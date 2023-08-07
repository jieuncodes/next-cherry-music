import puppeteer from "puppeteer";

interface FetchYouTubeVideoIdProps {
  artist: string;
  trackTitle: string;
}

async function fetchYouTubeVideoId({
  artist,
  trackTitle,
}: FetchYouTubeVideoIdProps): Promise<string | null> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    artist + "-" + trackTitle
  )}`;
  await page.goto(searchUrl);

  const videoId = await page.evaluate((): string | null => {
    const anchors = Array.from(
      document.querySelectorAll("a.yt-simple-endpoint")
    );
    for (let a of anchors) {
      const anchor = a as HTMLAnchorElement;
      if (anchor.href && anchor.href.includes("/watch?v=")) {
        return new URL(anchor.href).searchParams.get("v");
      }
    }
    return null;
  });

  await browser.close();
  console.log("videoId", videoId);
  return videoId;
}
export default fetchYouTubeVideoId;
