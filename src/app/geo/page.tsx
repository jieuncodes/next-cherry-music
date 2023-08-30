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
      console.warn(countryTopError);
    }
    return countryTop;
  };

  const [koreaTop, usTop, colombiaTop] = await Promise.all([
    getCountryTopFromSupabase({ tableName: "koreaTop" }),
    getCountryTopFromSupabase({ tableName: "usTop" }),
    getCountryTopFromSupabase({ tableName: "colombiaTop" }),
  ]);
  const countryTops = {
    korea: koreaTop ?? [],
    us: usTop ?? [],
    colombia: colombiaTop ?? [],
  };

  return (
    <>
      <Geo countryTops={countryTops} />
    </>
  );
}
export default geo;
