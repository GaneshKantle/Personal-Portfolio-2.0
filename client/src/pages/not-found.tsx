import React, { useEffect } from "react";
import { Link } from "wouter";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-wc": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        autoplay?: boolean | string;
        loop?: boolean | string;
      };
    }
  }
}

const LOTTIE_SRC =
  "https://lottie.host/34609a80-7df0-4862-b68d-58201701ed04/fNMWlPDZtn.lottie";
const DOTLOTTIE_SCRIPT =
  "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js";

export default function NotFound() {
  useEffect(() => {
    if (document.querySelector('script[data-dotlottie="true"]')) return;

    const script = document.createElement("script");
    script.src = DOTLOTTIE_SCRIPT;
    script.type = "module";
    script.dataset.dotlottie = "true";
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <dotlottie-wc
          src={LOTTIE_SRC}
          style={{ width: "300px", height: "300px" }}
          autoplay
          loop
        />

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 mt-2 mb-2">
          404 — Page Not Found
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          This page doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md rounded-full px-6 py-2.5 text-sm sm:text-base"
        >
          <i className="fas fa-home"></i>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
