/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { gsap } from "gsap";

const CircularSlider = () => {
  const totalItems = 8; // 슬라이더 항목의 총 개수
  const [currentIdx, setCurrentIdx] = useState(0); // 현재 슬라이드의 인덱스
  const containerRef = useRef(null); // 슬라이더 컨테이너 참조

  useEffect(() => {
    // 자동 재생 기능: 3초마다 다음 슬라이드로 이동
    const intervalId = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  useEffect(() => {
    // currentIdx가 변경될 때마다 슬라이더를 회전시켜 currentIdx가 오른쪽 가운데에 오도록 함
    const anglePerSlide = 360 / totalItems;
    const rotateAngle = -anglePerSlide * currentIdx;

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotation: rotateAngle,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [currentIdx]);

  // 이전 슬라이드로 이동
  const goToPrev = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? totalItems - 1 : prevIdx - 1));
  };

  // 다음 슬라이드로 이동
  const goToNext = () => {
    setCurrentIdx((prevIdx) => (prevIdx === totalItems - 1 ? 0 : prevIdx + 1));
  };

  return (
    <div css={containerWrapperStyle}>
      <div css={containerStyle}>
        <div css={sliderStyle} ref={containerRef}>
          {[...Array(totalItems)].map((_, i) => (
            <div
              key={i}
              css={getItemStyle(i, totalItems, currentIdx === i, currentIdx)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div css={buttonContainerStyle}>
        <button css={buttonStyle} onClick={goToPrev}>
          Prev
        </button>
        <button css={buttonStyle} onClick={goToNext}>
          Next
        </button>
      </div>
    </div>
  );
};

// Emotion 스타일링
const containerWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const containerStyle = css`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
`;

const sliderStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const buttonStyle = css`
  padding: 0;
  width: 60px;
  height: 60px;
  background-color: transparent;
  color: #fffce1;
  border: 2px solid #fffce1;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

// 아이템 스타일
const getItemStyle = (index, total, isActive, currentIdx) => {
  const angle = (360 / total) * index;
  const ctnAngle = (360 / total) * currentIdx;
  const radius = 120; // 아이템이 배치될 원의 반지름

  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);

  return css`
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: ${isActive ? "#0ae448" : "#abff84"};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0e100f;
    top: calc(50% + ${y}px);
    left: calc(50% + ${x}px);
    transform: translate(-50%, -50%) rotate(${ctnAngle}deg); /* 슬라이드의 배치 각도를 기준으로 회전 */
    font-weight: ${isActive ? "bold" : "normal"};
    font-size: ${isActive ? "1.2em" : "1em"};
    box-shadow: ${isActive ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none"};
  `;
};

export default CircularSlider;
