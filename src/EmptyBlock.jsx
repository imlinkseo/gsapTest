import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { RoughEase } from "gsap/EasePack";

gsap.registerPlugin(Flip, RoughEase);

export default function EmptyBlock() {
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);

  useEffect(() => {
    gsap.to(boxRef1.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      repeatDelay: 1,
      ease: "bounce.out",
    });
    gsap.to(boxRef2.current, {
      x: 40,
      background: "#fffce1",
      duration: 2,
      onComplete: () => {
        gsap.to(boxRef2.current, { x: 0, duration: 1, background: "#abff84" });
      },
    });
    gsap.to(boxRef3.current, {
      skewY: 10,
      duration: 1,
      ease: "bounce.out",
      delay: 1,
      onComplete: () => {
        gsap.to(boxRef3.current, {
          skewY: -10,
          duration: 1,
          ease: "bounce.out",
        });
      },
    });
  }, []);

  return (
    <div className="block_ctn">
      <div className="empty_block" ref={boxRef1}></div>
      <div className="empty_block" ref={boxRef3}></div>
      <div className="empty_block" ref={boxRef2}></div>
    </div>
  );
}
