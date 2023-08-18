import { handleError, validateEnvVariable } from "@/lib/helpers";

const API_BASE_URL = process.env.LAST_FM_BASE_URL!;
const API_KEY = process.env.LAST_FM_API_KEY!;

validateEnvVariable(API_BASE_URL, "LAST_FM_BASE_URL");
validateEnvVariable(API_KEY, "LAST_FM_API_KEY");

export interface FetchFromLastFMParamsProps {
  method: string;
  api_key: string;
  format: string;
  artist?: string;
  album?: string;
  autocorrect?: string;
  tag?: string;
  track?: string;
}

async function fetchFromLastFM(params: FetchFromLastFMParamsProps) {
  try {
    const url = new URL(process.env.LAST_FM_BASE_URL!);
    const searchParams = new URLSearchParams(params as any);
    url.search = searchParams.toString();

    const response = await fetch(url);
    return response.json();
  } catch (error) {
    handleError({
      context: `LastFm error on method - ${params.method}`,
      error,
    });
  }
}
export default fetchFromLastFM;
