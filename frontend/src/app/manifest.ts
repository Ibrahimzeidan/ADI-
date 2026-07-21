import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ADI Lebanon",
    short_name: "ADI Lebanon",
    description: "ADI Lebanon — Three Generations of Quality Since 1949",
    start_url: "/en",
    display: "standalone",
    background_color: "#FFFDF9",
    theme_color: "#E8542A",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/images/adi-logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/adi-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["shopping", "food"],
  };
}
