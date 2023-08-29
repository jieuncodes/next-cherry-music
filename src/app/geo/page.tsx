import Geo from "@/components/Geo";
import { supabase } from "@/lib/server/client";

async function geo() {
  const getCountryTopFromSupabase = async ({
    tableName,
  }: {
    tableName: string;
  }) => {
    const { data: countryTop, error: countryTopError } = await supabase
      .from(tableName)
      .select("*");

    if (countryTopError) {
      console.log(countryTopError);
    }
    return countryTop;
  };

  const countryTops = await Promise.all([
    getCountryTopFromSupabase({ tableName: "koreaTop" }),
    getCountryTopFromSupabase({ tableName: "usTop" }),
    getCountryTopFromSupabase({ tableName: "colombiaTop" }),
  ]);
  return (
    <>
      <Geo countryTops={countryTops} />
    </>
  );
}
export default geo;
