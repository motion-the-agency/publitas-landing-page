import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.svg, rendered to PNG for iOS home screens.
const svg = await readFile(join(process.cwd(), "src/app/icon.svg"));
const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(<img src={src} alt="" width={180} height={180} />, size);
}
