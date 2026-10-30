import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Know your next move. The Publitas 2.0 launch plan, from Motion The Agency.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dir = join(process.cwd(), "src/app/_og");
const asset = (file: string) => readFile(join(dir, file));
const dataUri = async (path: string, type: string) =>
  `data:${type};base64,${(await readFile(join(process.cwd(), path))).toString("base64")}`;

const [clash, montserrat, montserratBold, scene, logo, mark] = await Promise.all([
  asset("ClashGrotesk-Semibold.woff"),
  asset("Montserrat-Regular.ttf"),
  asset("Montserrat-Bold.ttf"),
  dataUri("src/app/_og/scene.jpg", "image/jpeg"),
  dataUri("public/brand/publitas-logo-blue.svg", "image/svg+xml"),
  dataUri("public/brand/motion-mark.png", "image/png"),
]);

// Split card: the deck's pale sky on the left carries the type, the launch scene on the right
// keeps the rocket, the sun and the trail as the focal point.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#e4f5fd",
          fontFamily: "Montserrat",
        }}
      >
        <img
          src={scene}
          alt=""
          width={640}
          height={630}
          style={{ position: "absolute", right: 0, top: 0, width: 640, height: 630, objectFit: "cover" }}
        />
        {/* Soft hand-over from the sky panel into the scene. */}
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 0,
            width: 280,
            height: 630,
            background:
              "linear-gradient(90deg, #e4f5fd 0%, rgba(228,245,253,0.85) 25%, rgba(228,245,253,0.4) 60%, rgba(228,245,253,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -160,
            bottom: -260,
            width: 760,
            height: 560,
            borderRadius: 760,
            background: "radial-gradient(circle, rgba(127,214,247,0.55), rgba(127,214,247,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -120,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
            height: "100%",
            padding: "56px 0 52px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={logo} alt="" width={150} height={49} />
            <span style={{ fontSize: 28, color: "rgba(4,52,96,0.35)", fontWeight: 700 }}>×</span>
            <img src={mark} alt="" width={44} height={44} style={{ borderRadius: 10 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                alignItems: "center",
                gap: 10,
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.8)",
                color: "#086bc6",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: 10, background: "#19b0ed" }} />
              Launch proposal for Publitas 2.0
            </div>
            <div
              style={{
                marginTop: 22,
                fontFamily: "Clash",
                fontSize: 92,
                lineHeight: 0.98,
                letterSpacing: -2,
                color: "#043460",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Know your</span>
              <span>next move.</span>
            </div>
            <div style={{ marginTop: 24, fontSize: 26, lineHeight: 1.4, color: "#15345d", maxWidth: 470 }}>
              One campaign for the whole launch, from the November teaser to Q1 2027.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", height: 8, width: 150, borderRadius: 8, overflow: "hidden" }}>
              <span style={{ flex: 1, background: "#19b0ed" }} />
              <span style={{ flex: 1, background: "#f2bf1f" }} />
              <span style={{ flex: 1, background: "#3f9d72" }} />
            </div>
            <span style={{ fontSize: 19, color: "#43607f", fontWeight: 700 }}>Prepared by Motion The Agency</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash", data: clash, weight: 600, style: "normal" },
        { name: "Montserrat", data: montserrat, weight: 400, style: "normal" },
        { name: "Montserrat", data: montserratBold, weight: 700, style: "normal" },
      ],
    },
  );
}
