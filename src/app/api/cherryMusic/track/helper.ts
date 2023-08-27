export const getSpotifyPlaylistId = (query: string) => {
  switch (query) {
    case "koreatop":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_KOREA_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_KOREA_TOP",
      };
    case "ustop":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_US_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_US_TOP",
      };
    case "africatop":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_AFRICA_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_AFRICA_TOP",
      };
    case "top":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_TODAY_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_TODAY_TOP",
      };
    default:
      throw new Error("Invalid query provided");
  }
};
