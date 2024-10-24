import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingText({ text }) {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      x: "-100%",
      color: "#fffce1",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      className="scrolling-text"
      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
    >
      <p ref={textRef} className="text">
        {text}
      </p>
    </div>
  );
}
