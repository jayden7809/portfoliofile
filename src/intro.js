// src/Intro.js
import { useEffect, useState } from "react";
import "./intro.css";

/* 프로필사진 */
import profile from "./assets/images/231A0913-편집.jpg"

function Intro({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 2초 뒤 페이드아웃 시작
    const timer = setTimeout(() => setFadeOut(true), 2000);
    // 3초 뒤 인트로 종료
    const removeTimer = setTimeout(onFinish, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  // 클릭 시 즉시 스킵
  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(onFinish, 300);
  };

  // 마우스 좌표 추적
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`intro-container ${fadeOut ? "fade-out" : ""}`}
      onClick={handleSkip} // 화면 어디든 클릭 가능
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#d9e2ef",
      }}
    >
      <img src={profile} alt={profile} />
      <h1 className="intro-title">Lim Jae Hyung</h1>
      <p className="intro-sub">Frontend Developer Portfolio</p>
    {/* 마우스를 따라다니는 텍스트 */}
      <div
        className="skip-hint"
        style={{
          position: "fixed",
          top: mousePos.y + 15 + "px",
          left: mousePos.x + 15 + "px",
          pointerEvents: "none",
          color: "rgba(255,255,255,0.8)",
          fontSize: "14px",
          transition: "transform 0.1s ease",
        }}
      >
        Click to Skip
      </div>
    </div>
  );
}

export default Intro;
