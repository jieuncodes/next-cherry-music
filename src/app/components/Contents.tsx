import { ContentsContainer } from "../styles/Contents";
import MainSlider from "./MainSlider";
import Search from "./Search";
import TopChart from "./TopChart";

export default function Contents() {
  TopChart();
  return (
    <ContentsContainer>
      <Search />
      <MainSlider />
      {/* <TopChart /> */}
    </ContentsContainer>
  );
}
