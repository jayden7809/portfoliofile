import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./light.css";
import Intro from "./intro";

/* 아이콘 이미지 */
import html from "./assets/images/html-5.png";
import css from "./assets/images/css-3-2.png";
import Java from "./assets/images/js-2.png";
import git from "./assets/images/github.png";
import php from "./assets/images/php-programming-language.png";
import vue from "./assets/images/document.png";
import jq from "./assets/images/social.png";
import react from "./assets/images/science-2.png";
import illust from "./assets/images/illustrator.png";
import photoshop from "./assets/images/photoshop.png";
import boot from "./assets/images/bootstrap.png";
import figma from "./assets/images/figma.png";
import node from "./assets/images/nodejs.png";
import next from "./assets/images/letter-n.png";
import arrow from "./assets/images/arrow-down-sign-to-navigate.png";
import lightarrow from "./assets/images/light-arrow-down-sign-to-navigate.png";
import ts from "./assets/images/ts.png"


/* 증명사진 */
import profile from "./assets/images/231A0913.jpg";

/* 프로젝트 이미지 */
import genesis from "./assets/images/genesis.png";
import anyang from "./assets/images/anyang.png";
import serieslog from "./assets/images/serieslog.png";
import seriesup from "./assets/images/serisup.png";
import sourvenir from "./assets/images/sourvenir.png";
import little from "./assets/images/littel.png";
import phase from "./assets/images/phaseimg.png"

function TypingText({ texts, speed = 50, startIndex = 0 }) {
  const [typed, setTyped] = useState(
    texts.map((_, idx) => (idx < startIndex ? texts[idx] : ""))
  );
  const [currentLine, setCurrentLine] = useState(startIndex);
  const [currentChar, setCurrentChar] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    if (currentLine >= texts.length) {
      setFinished(true);
      return;
    }

    if (currentChar < texts[currentLine].length) {
      const timeout = setTimeout(() => {
        setTyped((prev) => {
          const newTyped = [...prev];
          newTyped[currentLine] += texts[currentLine][currentChar];
          return newTyped;
        });
        setCurrentChar((c) => c + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setCurrentLine((line) => line + 1);
      setCurrentChar(0);
    }
  }, [currentChar, currentLine, texts, speed, finished]);

  return (
    <>
      {texts.map((line, idx) => (
        <p key={idx} style={{ minHeight: "1.5em" }}>
          {typed[idx]}
          {((idx === currentLine && !finished) ||
            (finished && idx === texts.length - 1)) && (
              <span className="cursor">|</span>
            )}
        </p>
      ))}
    </>
  );
}

// function ModalPreview({ open, url, w, h, onClose, isLightMode }) {
//   const overlayRef = useRef(null);
//   const wrapRef = useRef(null);
//   const [scale, setScale] = useState(1);

//   // 🔄 로딩/차단 감지용 상태
//   const [loading, setLoading] = useState(true);
//   const [blocked, setBlocked] = useState(false);
//   const [iframeKey, setIframeKey] = useState(0); // 강제 리렌더(새로고침용)

//   // 배경 스크롤/제스처 잠금
//   useEffect(() => {
//     if (!open) return;
//     const prevOverflow = document.body.style.overflow;
//     const prevTouch = document.body.style.touchAction;
//     const prevOverscroll = document.body.style.overscrollBehavior;
//     document.body.style.overflow = "hidden";
//     document.body.style.touchAction = "none";
//     document.body.style.overscrollBehavior = "contain";
//     return () => {
//       document.body.style.overflow = prevOverflow;
//       document.body.style.touchAction = prevTouch;
//       document.body.style.overscrollBehavior = prevOverscroll;
//     };
//   }, [open]);

//   // ESC 닫기
//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e) => e.key === "Escape" && onClose?.();
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [open, onClose]);

//   const handleOverlayClick = (e) => {
//     if (e.target === overlayRef.current) onClose?.();
//   };

//   // 모달 박스 크기/스케일 계산 (그대로 유지)
//   const PADDING_X = 24;
//   const PADDING_Y = 16;
//   const TOOLBAR_H = 48;
//   const GAP_FROM_EDGE = 24;
//   const [boxSize, setBoxSize] = useState({ boxW: w + PADDING_X * 2, boxH: h + TOOLBAR_H + PADDING_Y * 2 });

//   useEffect(() => {
//     if (!open) return;
//     const calc = () => {
//       const vw = window.innerWidth;
//       const vh = window.innerHeight;
//       const idealBoxW = w + PADDING_X * 2;
//       const idealBoxH = h + TOOLBAR_H + PADDING_Y * 2;
//       const maxBoxW = Math.max(320, vw - GAP_FROM_EDGE * 2);
//       const maxBoxH = Math.max(240, vh - GAP_FROM_EDGE * 2);
//       const sW = maxBoxW / idealBoxW;
//       const sH = maxBoxH / idealBoxH;
//       const s = Math.min(sW, sH, 1);
//       const realBoxW = Math.min(idealBoxW, maxBoxW);
//       const realBoxH = Math.min(idealBoxH, maxBoxH);
//       setBoxSize({ boxW: realBoxW, boxH: realBoxH });
//       setScale(s);
//     };
//     calc();
//     window.addEventListener("resize", calc);
//     return () => window.removeEventListener("resize", calc);
//   }, [open, w, h]);

//   // 🎨 색상 (그대로 유지)
//   const colors = isLightMode
//     ? { bg: "#6e5546", text: "#fdf8f3", border: "#cbd5e1", toolbarBg: "#6e5546", accent: "#fdf8f3", btnText: "#fdf8f3" }
//     : { bg: "#111", text: "#2bddd7", border: "#2a3242", toolbarBg: "#0f172a", accent: "#2bddd7", btnText: "#2bddd7" };

//   // ⏱️ 차단 자동 감지: open/URL/iframeKey 바뀔 때마다 타이머로 감지
//   useEffect(() => {
//     if (!open) return;
//     setLoading(true);
//     setBlocked(false);

//     // 1500ms 안에 onLoad가 안 오면 차단으로 추정
//     const t = setTimeout(() => {
//       setBlocked(true);
//       setLoading(false);
//     }, 3000);

//     return () => clearTimeout(t);
//   }, [open, url, iframeKey]);

//   // 🔁 캐시 무시 새로고침 (쿼리스트링 버스터 붙이기)
//   const handleReload = () => {
//     setLoading(true);
//     setBlocked(false);
//     setIframeKey(k => k + 1);
//   };

//   if (!open) return null;

//   return (
//     <div
//       ref={overlayRef}
//       onClick={handleOverlayClick}
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,.55)",
//         zIndex: 9999,
//         display: "grid",
//         placeItems: "center",
//         padding: "24px",
//       }}
//     >
//       <div
//         ref={wrapRef}
//         role="dialog"
//         aria-modal="true"
//         style={{
//           background: colors.bg,
//           color: colors.text,
//           width: boxSize.boxW,
//           height: boxSize.boxH,
//           borderRadius: 12,
//           boxShadow: "0 20px 60px rgba(0,0,0,.35)",
//           display: "flex",
//           flexDirection: "column",
//           overflow: "hidden",
//           border: `1px solid ${colors.border}`,
//         }}
//       >
//         {/* Toolbar */}
//         <div
//           style={{
//             height: TOOLBAR_H,
//             minHeight: TOOLBAR_H,
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             padding: "0 12px",
//             background: colors.toolbarBg,
//             borderBottom: `1px solid ${colors.border}`,
//           }}
//         >
//           <strong style={{ marginRight: "auto" }}>Preview</strong>

//           {/* 🔁 새로고침 */}
//           <button
//             onClick={handleReload}
//             style={{ ...btnStyle, color: colors.btnText, border: `1px solid ${colors.accent}` }}
//             title="미리보기 새로고침"
//           >
//             새로고침
//           </button>

//           {/* ↗ 새 창 열기 (차단 시 유용) */}
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{ ...btnStyle, color: colors.btnText, border: `1px solid ${colors.accent}`, textDecoration: "none" }}
//             title="새 탭에서 열기"
//           >
//             새 창으로
//           </a>

//           {/* ✕ 닫기 */}
//           <button
//             onClick={onClose}
//             style={{ ...btnStyle, color: colors.btnText, border: `1px solid ${colors.accent}` }}
//             title="닫기"
//           >
//             ✕ 닫기
//           </button>
//         </div>

//         {/* Canvas */}
//         <div
//           style={{
//             position: "relative",
//             flex: 1,
//             padding: "16px 24px",
//             background:
//               "repeating-conic-gradient(#222 0% 25%, #252525 0% 50%) 50% / 24px 24px",
//             display: "grid",
//             placeItems: "center",
//             overflow: "auto",
//           }}
//         >
//           {/* 로딩 스피너(간단 버전) */}
//           {loading && !blocked && (
//             <div style={{ position: "absolute", top: 12, right: 12, fontSize: 12, opacity: 0.8 }}>
//               로딩 중…
//             </div>
//           )}

//           {/* 차단 시 대체 UI */}
//           {blocked ? (
//             <div
//               style={{
//                 display: "grid",
//                 placeItems: "center",
//                 gap: 12,
//                 textAlign: "center",
//               }}
//             >
//               <div style={{ opacity: 0.9 }}>
//                 이 사이트는 보안 정책으로 인해 iframe에 표시되지 않아요.<br />
//                 아래 버튼으로 새 창에서 열어주세요.
//               </div>
//               <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
//                 <a
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ ...btnStyle, color: colors.btnText, border: `1px solid ${colors.accent}`, textDecoration: "none" }}
//                 >
//                   새 창으로 열기
//                 </a>
//                 <button
//                   onClick={handleReload}
//                   style={{ ...btnStyle, color: colors.btnText, border: `1px solid ${colors.accent}` }}
//                 >
//                   재시도
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // 정상 시도: 정확한 viewport 크기의 프레임
//             <div
//               style={{
//                 width: w,
//                 height: h,
//                 background: "#fff",
//                 boxShadow: "0 10px 30px rgba(0,0,0,.4)",
//                 transform: `scale(${scale})`,
//                 transformOrigin: "top left",
//                 borderRadius: 6,
//                 overflow: "hidden",
//               }}
//             >
//               <iframe
//                 key={iframeKey}
//                 title="site-preview"
//                 // 캐시버스터 쿼리 (새로고침 시 갱신)
//                 src={`${url}${url.includes("?") ? "&" : "?"}_pv=${iframeKey}`}
//                 onLoad={() => {
//                   setLoading(false);
//                   setBlocked(false);
//                 }}
//                 style={{ width: "100%", height: "100%", border: 0, display: "block" }}
//               // sandbox를 쓰면 더 막힐 수 있어 기본은 비사용. 필요 시 아래 참고:
//               // sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const btnStyle = {
//   background: "transparent",
//   fontSize: "12px",
//   fontWeight: "bold",
//   borderRadius: 8,
//   padding: "6px 10px",
//   cursor: "pointer",
// };


function App() {

  const [preview, setPreview] = useState({
    open: false,
    url: "",
    w: 1440,
    h: 844,
  });

  const openModalPreview = (url, w, h) => {
    setPreview({ open: true, url, w, h });
  };

  const closeModalPreview = () => setPreview((p) => ({ ...p, open: false }));

  const [showIntro, setShowIntro] = useState(true);
  // const cursor = useRef({ x: 0, y: 0 });
  const circleRefs = useRef([]);
  const [openBox, setOpenBox] = useState(null);
  const [activeSection, setActiveSection] = useState("about");
  const [theme, setTheme] = useState("dark");

  const rightPanelRef = useRef(null);
  const aboutRef = useRef(null);
  const skillRef = useRef(null);
  const projectRef = useRef(null);

  const [isLightMode, setIsLightMode] = useState(false);

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.backgroundColor = isLightMode ? "#fdf8f3" : "#0f172a";
    document.body.style.transition = "background-color 0.5s ease";
  }, [isLightMode]);

  // 저장된 테마 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // 테마 변경 시 저장
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  //테마변경 감지
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-body");
    } else {
      document.body.classList.remove("light-body");
    }
  }, [isLightMode]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // 오른쪽 스크롤 제어
  useEffect(() => {
    // 인트로나 모달 오픈 중이면 전역 wheel 리스너 설치 안 함
    if (showIntro || preview.open) return;

    const rightPanel = rightPanelRef.current;
    if (!rightPanel) return;

    const handleWheel = (e) => {
      e.preventDefault();
      rightPanel.scrollTop += e.deltaY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [showIntro, preview.open]); // ← preview.open 추가


  /* 내비게이션 active */
  useEffect(() => {
    if (showIntro) return;
    const rightPanel = rightPanelRef.current;
    if (!rightPanel) return;

    const handleScroll = () => {
      if (!aboutRef.current || !skillRef.current || !projectRef.current) return;

      const scrollY = rightPanel.scrollTop;
      const aboutTop = aboutRef.current.offsetTop;
      const skillTop = skillRef.current.offsetTop;
      const projectTop = projectRef.current.offsetTop;

      if (scrollY >= projectTop - 200) setActiveSection("project");
      else if (scrollY >= skillTop - 200) setActiveSection("skill");
      else setActiveSection("about");
    };

    rightPanel.addEventListener("scroll", handleScroll);
    return () => rightPanel.removeEventListener("scroll", handleScroll);
  }, [showIntro]);

  const smoothScrollTo = (element, target, duration = 800) => {
    const start = element.scrollTop;
    const change = target - start;
    const startTime = performance.now();
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      element.scrollTop = start + change * eased;

      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollToSection = (refName) => {
    const rightPanel = rightPanelRef.current;
    if (!rightPanel) return;
    const targetRef =
      refName === "about"
        ? aboutRef
        : refName === "skill"
          ? skillRef
          : projectRef;
    const offset = targetRef.current.offsetTop - 100;
    smoothScrollTo(rightPanel, offset);
  };

  /* 플립 효과 */
  const [autoFlip, setAutoFlip] = useState(false);
  useEffect(() => {
    if (showIntro) return;
    const flipTimer = setTimeout(() => setAutoFlip(true), 500);
    const resetTimer = setTimeout(() => setAutoFlip(false), 2000);
    return () => {
      clearTimeout(flipTimer);
      clearTimeout(resetTimer);
    };
  }, [showIntro]);

  /* 스킬 데이터 */
  const skills = [
    {
      id: 1,
      name: "HTML",
      img: html,
      detail1:
        "HTML5의 시맨틱 태그를 활용해 웹페이지의 구조를 설계하고 구성할 수 있습니다.",
      detail2:
        "프로젝트에서 유지보수가 용이한 구조 설계를 통해 효율적인 작업 경험을 쌓았습니다.",
      detail3:
        "웹 표준과 접근성을 고려한 마크업을 작성하여 일관된 사용자 경험을 제공합니다.",
    },
    {
      id: 2,
      name: "CSS",
      img: css,
      detail1:
        "Flex와 Grid를 활용해 레이아웃을 구성하고 완성도 높은 디자인을 구현할 수 있습니다.",
      detail2:
        "애니메이션과 트랜지션을 활용해 인터랙티브한 UI를 구현한 경험이 있습니다.",
      detail3:
        "미디어쿼리와 유연한 레이아웃 설계로 다양한 디바이스 환경에서도 최적화된 반응형 UI를 구현합니다.",
    },
    {
      id: 3,
      name: "JavaScript",
      img: Java,
      detail1:
        "사용자 입력 처리, 애니메이션 구현, API 통신 및 데이터 조작을 수행한 경험이 있습니다.",
      detail2:
        "프로젝트에서 API 연동과 상태관리 로직을 직접 설계·구현해 동적인 웹 환경을 구축합니다.",
      detail3:
        "ES6 문법과 Async/Await, Promise 를 활용해 유지보수성 높은 코드를 작성할 수 있습니다.",
    },
    {
      id: 4,
      name: "TypeScript",
      img: ts,
      detail1:
        "TypeScript를 활용하여 JavaScript 코드에 타입을 부여하고 코드 안정성을 높였습니다.",
      detail2:
        "인터페이스와 타입 정의를 통해 프로젝트의 구조와 데이터 흐름을 명확히 설계했습니다.",
      detail3:
        "프로젝트에서 유지보수성과 협업 효율성을 향상시키며 안전한 코드 작성 경험이 있습니다.",
    },
    {
      id: 5,
      name: "GitHub",
      img: git,
      detail1:
        "GitHub를 활용해 팀 프로젝트에서 효율적인 협업과 코드 관리를 경험했습니다.",
      detail2:
        "브랜치를 활용해 작업 단위를 분리하고, 버전 관리를 통해 안정적으로 프로젝트를 운영할 수 있습니다.",
      detail3:
        "Pull Request와 Merge 과정을 통해 코드 리뷰를 진행하며 협업 품질을 향상시켰습니다.",
    },
    {
      id: 6,
      name: "PHP",
      img: php,
      detail1: "기초적인 CRUD 구현 및 서버사이드 렌더링 경험이 있습니다.",
      detail2: "MySQL 연동과 간단한 백엔드 API 구축 경험이 있습니다.",
      detail3: "폼 데이터 처리, 세션 관리 등 웹 서버 로직의 흐름을 이해하고 직접 구현할 수 있습니다.",
    },
    {
      id: 7,
      name: "Vue",
      img: vue,
      detail1: "Vue 컴포넌트 기반 구조에 익숙하며, Vue Router 및 Pinia 상태관리 경험이 있습니다.",
      detail2: "프로젝트에서 컴포넌트를 재사용하고, 많은 파일을 한번에 다룬 경험이 있습니다.",
      detail3: "반응형 데이터 바인딩과 라이프사이클 훅을 활용해 동적인 UI를 구현할 수 있습니다.",
    },
    {
      id: 8,
      name: "J-Query",
      img: jq,
      detail1: "jQuery는 DOM 조작과 이벤트 처리를 간결한 문법으로 구현할 수 있습니다.",
      detail2: "AJAX 통신, 슬라이드/모달 등 UI 효과를 빠르게 구성한 경험이 있습니다.",
      detail3: "레거시 코드 유지보수 시 jQuery 플러그인을 적절히 활용하여 생산성을 높였습니다.",
    },
    {
      id: 9,
      name: "React",
      img: react,
      detail1: "React의 컴포넌트를 활용해 재사용성과 유지보수성이 높은 UI를 구현할 수 있습니다.",
      detail2: "상태 관리와 Props를 통해 설계하며 효율적인 컴포넌트 구조를 구성한 경험이 있습니다.",
      detail3: "본 포트폴리오는 React를 기반으로 개발되었으며, 실제 프로젝트 수준의 구조 설계와 기능 구현을 진행했습니다.",
    },
    {
      id: 10,
      name: "Illustrator",
      img: illust,
      detail1:
        "벡터 기반의 디자인 작업에 능숙하며, 로고·아이콘 등 그래픽 요소를 제작할 수 있습니다.",
      detail2:
        "레이어와 패스 도구를 활용해 도형 편집 및 일러스트 작업을 수행한 경험이 있습니다.",
      detail3:
        "브랜드 콘셉트에 맞춘 색상과 형태 설계를 통해 일관된 비주얼 아이덴티티를 구현합니다.",
    },
    {
      id: 11,
      name: "Photoshop",
      img: photoshop,
      detail1:
        "이미지 보정, 합성, 그래픽 디자인 등 다양한 시각적 편집 경험이 있습니다.",
      detail2:
        "마스크 기능과 레이어 효과를 활용하여 세밀한 이미지 조합 및 색상 보정을 진행했습니다.",
      detail3:
        "웹 디자인과 UI 시안 제작 과정에서 Photoshop을 활용해 시각 요소를 기획·편집한 경험이 있습니다.",
    },
    {
      id: 12,
      name: "Bootstrap",
      img: boot,
      detail1: "Bootstrap의 시스템을 활용해 반응형 레이아웃을 효율적으로 구현한 경험이 있습니다.",
      detail2: "다양한 컴포넌트와 유틸리티 클래스를 활용하여 일관된 디자인과 UI 개발을 수행했습니다.",
      detail3: "프로젝트 전반에 걸쳐 Bootstrap을 커스터마이징하여 스타일에 맞는 디자인을 적용했습니다.",
    },
    {
      id: 13,
      name: "Figma",
      img: figma,
      detail1: "UI/UX 설계를 기반으로 팀원들과 협업하며 프로토타입을 제작한 경험이 있습니다.",
      detail2: "컴포넌트와 오토 레이아웃을 활용해 일관된 디자인 시스템을 구성했습니다.",
      detail3: "디자인 시안을 기반으로 실제 화면 구현까지 연결하며 원활한 협업을 진행했습니다.",
    },
    {
      id: 14,
      name: "Node.js",
      img: node,
      detail1: "Express 기반의 서버 환경에서 클라이언트 요청을 비동기적으로 처리한 경험이 있습니다.",
      detail2: "로그인, 회원 관리, 데이터 CRUD 등 기본적인 백엔드 기능을 직접 구현했습니다.",
      detail3: "MongoDB와 연동하여 RESTful API를 구축하고, 서버 구조를 효율적으로 관리했습니다.",
    },
    {
      id: 15,
      name: "Next.js",
      img: next,
      detail1: "React 기반의 프레임워크로, 서버 사이드 렌더링과 정적 페이지 생성에 익숙합니다.",
      detail2: "회원가입, 로그인, 게시판 등 주요 기능을 구현하며 풀스택 구조를 이해했습니다.",
      detail3: "API 라우트와 NextAuth를 활용해 인증 및 데이터 관리 기능을 직접 구성했습니다.",
    },

  ];

  const handleToggle = (id) => setOpenBox((prev) => (prev === id ? null : id));

  return (
    <>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <>
          {/* {[5, 4, 3, 2, 1].map((i, idx) => (
            <div
              key={i}
              className={`cursor-circle circle-${i}`}
              ref={(el) => (circleRefs.current[idx] = el)}
            ></div>
          ))} */}
          <div className={`Wrap ${isLightMode ? "light" : ""}`}>
            <aside className="left-panel">
              {/* 프로필 + 라이트모드 버튼 */}
              <div
                className="profile-area"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // marginRight: "20px",
                }}
              >
                <div className="title-img">
                  <div className={`title-inner ${autoFlip ? "flip" : ""}`}>
                    <div className="front">
                      <h1>Lim Jae Hyung</h1>
                      <h2>Frontend Developer</h2>
                      <p>"Not One Day,</p>
                      <p>Today Is Day One"</p>
                    </div>
                    <div className="back">
                      <img src={profile} alt="profile" />
                    </div>
                  </div>
                </div>

                {/* 프로필 옆 라이트모드 토글 버튼 */}
                <button
                  className="light-toggle"
                  onClick={toggleLightMode}
                  style={{
                    position: "absolute",
                    top: "74px",
                    right: "80px",
                    background: "none",
                    border: isLightMode
                      ? "2px solid #2a2a2a"
                      : "2px solid #8b9dbb",
                    borderRadius: "8px",
                    color: isLightMode ? "#2a2a2a" : "#8b9dbb",
                    padding: "8px 12px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isLightMode ? "🌞 Light" : "🌙 Dark"}
                </button>
              </div>

              {/* 네비게이션 */}
              <nav>
                <ul>
                  <li
                    className={activeSection === "about" ? "active" : ""}
                    onClick={() => scrollToSection("about")}
                  >
                    <span>About</span>
                  </li>
                  <li
                    className={activeSection === "skill" ? "active" : ""}
                    onClick={() => scrollToSection("skill")}
                  >
                    <span>Skill</span>
                  </li>
                  <li
                    className={activeSection === "project" ? "active" : ""}
                    onClick={() => scrollToSection("project")}
                  >
                    <span>Projects</span>
                  </li>
                </ul>
              </nav>

              <ul className="info">
                <li>임재형</li>
                <li>Lim Jae Hyung</li>
                <li>Date Of Birth</li>
                <li>1997.12.01</li>
                <li>Phone</li>
                <li>010.6403.6529</li>
                <li>E-mail</li>
                <li>soi_jaehyung@naver.com</li>
                <li>Address</li>
                <li>경기도 시흥시</li>
              </ul>
            </aside>

            {/* 오른쪽 영역 */}
            <main className="right-panel" ref={rightPanelRef}>
              <section ref={aboutRef} className="title">
                <TypingText
                  texts={[
                    '"Code With Purpose, Design With Passion"',
                    '"의미있는 코드를, 열정을 담아 디자인한다."',
                    "React, TypeScript, Node.js 기반의 프로젝트",
                    "경험을 통해 안정적이고 유지보수성 높은 코드를 구현합니다.",
                    "UI/UX를 고려한 세밀한 설계와 개발로",
                    "사용자에게 직관적인 경험을 제공합니다.",
                    "끊임없이 배우고, 도전하기 위해 노력하며",
                    "사용자 중심의 경험과 성능 최적화를 항상 고민합니다.",
                  ]}
                  speed={50}
                  startIndex={2} // 3번째 줄부터 타이핑 효과
                />
              </section>

              <section className="education">
                <div className="edu-bar1"></div>
                <p className="edu-title">Education</p>
                <p>2013 - 인천지방 검정고시 졸업</p>
                <p>2022 - 백석대학교 실용음악과 졸업</p>
                <div className="edu-bar2"></div>
                <p className="edu-title">Military Service</p>
                <p>2019 - 육군 만기전역</p>
                <div className="edu-bar3"></div>
                <p className="edu-title">Training</p>
                <p>2025.04 ~ 2025.10 - 이젠아카데미 안산</p>
                <p>생성형 AI기반 UX/UI 디자인 프론트엔드 개발과정</p>
              </section>

              {/* Skill Section */}
              {/* Skill Section */}
              <section ref={skillRef} className="skill">
                {skills.map((skill) => {
                  // 라이트모드 전용 아이콘 매핑
                  const lightModeIcons = {
                    HTML: require("./assets/images/light-html.png"),
                    CSS: require("./assets/images/light-css.png"),
                    JavaScript: require("./assets/images/light-js.png"),
                    TypeScript: require("./assets/images/light-ts.png"),
                    GitHub: require("./assets/images/light-github.png"),
                    PHP: require("./assets/images/light-php.png"),
                    Vue: require("./assets/images/light-vue.png"),
                    "J-Query": require("./assets/images/light-jquery.png"),
                    React: require("./assets/images/light-react.png"),
                    Illustrator: require("./assets/images/light-illustrator.png"),
                    Photoshop: require("./assets/images/light-photoshop.png"),
                    Bootstrap: require("./assets/images/light-bootstrap.png"),
                    Figma: require("./assets/images/light-figma.png"),
                    "Node.js": require("./assets/images/light-node.png"),
                    "Next.js": require("./assets/images/light-next.png"),
                  };

                  // 실제 보여줄 이미지 선택
                  const currentImg =
                    isLightMode && lightModeIcons[skill.name]
                      ? lightModeIcons[skill.name]
                      : skill.img;

                  return (
                    <div
                      key={skill.id}
                      className={`toggle-box ${openBox === skill.id ? "open" : ""
                        }`}
                      onClick={() => handleToggle(skill.id)}
                    >
                      <div className="image-area">
                        <img src={currentImg} alt={skill.name} />
                      </div>
                      <div className="text-area">
                        <div className="title-bar">
                          <h3 className="skill-title">{skill.name}</h3>
                          <button
                            className="arrow-btn"
                            onClick={() => handleToggle(skill.id)}
                          >
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src={isLightMode ? lightarrow : arrow}
                              alt="arrow"
                            />
                          </button>
                        </div>
                        <div className="skill-detail">
                          <p>{skill.detail1}</p>
                          <p>{skill.detail2}</p>
                          <p>{skill.detail3}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>

              {/* Project Section */}
              <section ref={projectRef} className="Project">
                {/* 올페이즈 */}
                <div className="pro-phase">
                  <div className="project-imgbox">
                    <a
                      /* href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="클릭하시면 사이트로 이동합니다." */
                    >
                      <img src={phase} alt="phase" />
                    </a>
                  </div>
                  <div className="project-textbox">
                    <h2>
                      데이터 시각화 대시보드 페이지 <p>PC버전</p>
                    </h2>
                    <div className="project-skill">
                      <div>React</div>
                      <div>Node.js</div>
                      <div>TypeScript</div>
                    </div>
                    <p>API를 사용하여 데이터를 가져와 시각화하여</p>
                    <p>정보를 확인하는 대시보드 페이지를 작업했습니다.</p>
                    <p>&nbsp;</p>
                    <p>메인 대시보드 화면에서 종합 정보와 그래프를 통해</p>
                    <p>거래 금액과 거래 상태 등 을 시각화 하였고, 최근</p>
                    <p>거래내역을 통해 결제 정보를 확인할 수 있도록 하였</p>
                    <p>습니다.</p>
                    <p>가맹점 목록 탭에서 가맹점정보를 추가할 수 있도록</p>
                    <p>작업하였고 목록페이지에 필터를 통한 정렬 기능을</p>
                    <p>구현 했습니다.</p>
                    <p>&nbsp;</p>
                    <div className="link">
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>메인 페이지</p>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 리틀파머 */}
                <div className="pro-little">
                  <div className="project-imgbox">
                    <a
                      href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="클릭하시면 사이트로 이동합니다."
                    >
                      <img src={little} alt="little" />
                    </a>
                  </div>
                  <div className="project-textbox">
                    <h2>
                      농업 교육용 강의 페이지 작업 <p>반응형</p>
                    </h2>
                    <div className="project-skill">
                      <div>Node.js</div>
                      <div>Next.js</div>
                      <div>Mongo DB</div>
                    </div>
                    <p>세번째 팀 프로젝트로 농업 교육용 강의 페이지를</p>
                    <p>작업해 봤습니다.</p>
                    <p>&nbsp;</p>
                    <p>Figma 를 사용해 디자인을 구상하고 이후 </p>
                    <p>반응형 사이트로 작업하기 위하여 모바일버전 과</p>
                    <p>태블릿버전으로 각각 디자인을 수정하였습니다.</p>
                    <p>Next.js로 작업하면서 AWS를 이용하여 배포 후</p>
                    <p>MongoDB를 이용하여 데이터 베이스를 저장 및</p>
                    <p>관리하였습니다.</p>
                    <p>&nbsp;</p>
                    <a
                      href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="클릭하시면 PC 화면으로 열립니다."
                    >
                      <p>PC</p>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          "http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/",
                          "_blank",
                          "width=768,height=844,noopener,noreferrer"
                        );
                      }}
                      title="클릭하시면 Tablet 화면으로 열립니다."
                    >
                      <p>Tablet</p>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          "http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/",
                          "_blank",
                          "width=375,height=844,noopener,noreferrer"
                        );
                      }}
                      title="클릭하시면 Mobile 화면으로 열립니다."
                    >
                      <p>Mobile</p>
                    </a>
                    <div className="link">
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>메인 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/edu?tab=house"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>영상목록 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/edudetail?tab=house"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>영상재생 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/shop"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>지원사업 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/shop/goods-01"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>상품 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/cook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>요리교실 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/farm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>농장예약 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/myFarm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>마이 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/board"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>FAQ 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/cart"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>장바구니 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>로그인 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/member"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>회원가입 페이지</p>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 수브니르 */}
                <div className="pro-sourve">
                  <div className="project-imgbox">
                    <a
                      href="https://jayden7809.github.io/sourvenir/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="클릭하시면 사이트로 이동합니다."
                    >
                      <img src={sourvenir} alt="sourvenir" />
                    </a>
                  </div>
                  <div className="project-textbox">
                    <h2>
                      인테리어 소품샵 페이지 작업<p>PC버전</p>
                    </h2>
                    <div className="project-skill">
                      <div>REACT</div>
                      <div>Node.js</div>
                      <div>FIGMA</div>
                    </div>
                    <p>두번째 팀 프로젝트로 인테리어, 소품샵 페이지를</p>
                    <p>작업해 봤습니다.</p>
                    <p>&nbsp;</p>
                    <p>Figma 를 사용해 디자인을 구상하고 React를</p>
                    <p>기반으로 한번에 많은 파일을 다루면서 작업했고, </p>
                    <p>로컬스토리지를 사용하여 로그인정보 이외에 </p>
                    <p>장바구니 기능과 게시판 기능도 구현하였습니다.</p>
                    <p>&nbsp;</p>
                    <p>새롭게 배운 검색 및 챗봇기능까지 구현하였고, </p>
                    <p>REACT의 장점과 사용성을 많이 느끼게 되었던 </p>
                    <p>작업이었습니다.</p>
                    <div className="link">
                      <a
                        href="https://jayden7809.github.io/sourvenir/"
                        target="_blank"
                      >
                        <p>메인 페이지</p>
                      </a>
                      <a
                        href="https://jayden7809.github.io/sourvenir/lifestyle"
                        target="_blank"
                      >
                        <p>카테고리 페이지</p>
                      </a>
                      <a
                        href="https://jayden7809.github.io/sourvenir/detail/nillo-mug-001"
                        target="_blank"
                      >
                        <p>상세 페이지</p>
                      </a>
                      <a
                        href="https://jayden7809.github.io/sourvenir/cart"
                        target="_blank"
                      >
                        <p>장바구니 페이지</p>
                      </a>
                      <a
                        href="https://jayden7809.github.io/sourvenir/payment"
                        target="_blank"
                      >
                        <p>결제 페이지</p>
                      </a>
                      <a
                        href="https://jayden7809.github.io/sourvenir/Event"
                        target="_blank"
                      >
                        <p>이벤트 페이지</p>
                      </a>
                      <a
                        href="https://jayden7809.github.io/sourvenir/mypage"
                        target="_blank"
                      >
                        <p>마이 페이지</p>
                      </a>
                      <a
                        href="https://jayden7809.github.io/sourvenir/Community"
                        target="_blank"
                      >
                        <p>커뮤니티 페이지</p>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 시리즈업 */}
                <div className="pro-series">
                  <div className="project-imgbox">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          "http://nuno6844.dothome.co.kr/",
                          "_blank",
                          "width=390,height=844,noopener,noreferrer"
                        );
                      }}
                      title="클릭하시면 모바일 화면으로 사이트가 열립니다."
                    >
                      <img
                        className="project-series-log"
                        src={serieslog}
                        alt="serieslog"
                      />
                    </a>
                  </div>

                  <div className="project-imgbox">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          "http://nuno6844.dothome.co.kr/#/HomeView",
                          "_blank",
                          "width=390,height=844,noopener,noreferrer"
                        );
                      }}
                      title="클릭하시면 모바일 화면으로 사이트가 열립니다."
                    >
                      <img
                        className="project-series-full"
                        src={seriesup}
                        alt="seriesup"
                      />
                    </a>
                  </div>

                  <div className="project-textbox">
                    <h2>
                      모바일 OTT 플랫폼 작업<p>모바일버전</p>
                    </h2>
                    <div className="project-skill">
                      <div>VUE</div>
                      <div>JavaScript</div>
                      <div>FIGMA</div>
                    </div>
                    <p>
                      첫번째 팀 프로젝트로 영상 스트리밍OTT 플랫폼을 만들어
                      보았습니다.
                    </p>
                    <p>&nbsp;</p>
                    <p>Figma 를 사용해 디자인을 구상하고 이후 VUE로 </p>
                    <p>한번에 여러가지 파일을 다루면서 작업하였으며 </p>
                    <p>소셜로그인 기능을 구현하여 로그인 정보를 저장</p>
                    <p>
                      하였고, 더 다양한 CSS기능을 배우며 추가하고 JavaScript의
                      기능에 감탄하며 작업하였습니다.
                    </p>
                    <p>&nbsp;</p>
                    <p>첫 팀 프로젝트로 팀원들간의 협업과 주의할 점에 </p>
                    <p>대해서 배울수 있었던 작업이었습니다.</p>
                    <div className="link">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            "http://nuno6844.dothome.co.kr/#/login",
                            "_blank",
                            "width=390,height=844,noopener,noreferrer"
                          );
                        }}
                        title="클릭하시면 모바일 화면으로 사이트가 열립니다."
                      >
                        <p>로그인 페이지</p>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            "http://nuno6844.dothome.co.kr/#/HomeView",
                            "_blank",
                            "width=390,height=844,noopener,noreferrer"
                          );
                        }}
                        title="클릭하시면 모바일 화면으로 사이트가 열립니다."
                      >
                        <p>메인 페이지</p>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            "http://nuno6844.dothome.co.kr/#/SERIES_UP_drama_detail",
                            "_blank",
                            "width=390,height=844,noopener,noreferrer"
                          );
                        }}
                        title="클릭하시면 모바일 화면으로 사이트가 열립니다."
                      >
                        <p>상세 페이지</p>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            "http://nuno6844.dothome.co.kr/#/SearchPage",
                            "_blank",
                            "width=390,height=844,noopener,noreferrer"
                          );
                        }}
                        title="클릭하시면 모바일 화면으로 사이트가 열립니다."
                      >
                        <p>검색 페이지</p>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            "http://nuno6844.dothome.co.kr/#/ProfilePage",
                            "_blank",
                            "width=390,height=844,noopener,noreferrer"
                          );
                        }}
                        title="클릭하시면 모바일 화면으로 사이트가 열립니다."
                      >
                        <p>프로필 페이지</p>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            "http://nuno6844.dothome.co.kr/#/add",
                            "_blank",
                            "width=390,height=844,noopener,noreferrer"
                          );
                        }}
                        title="클릭하시면 모바일 화면으로 사이트가 열립니다."
                      >
                        <p>더보기 페이지</p>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 안양시청 */}
                <div className="pro-anyang">
                  <div className="project-imgbox">
                    <a
                      href="http://solidbass.dothome.co.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="클릭하시면 사이트로 이동합니다."
                    >
                      <img src={anyang} alt="anyang" />
                    </a>
                  </div>
                  <div className="project-textbox">
                    <h2>
                      안양시청 홈페이지 리뉴얼<p>PC버전</p>
                    </h2>
                    <div className="project-skill">
                      <div>JavaScript</div>
                      <div>PHP</div>
                    </div>
                    <p>두번째 작업으로 안양시청 홈페이지를 리뉴얼</p>
                    <p>해봤습니다.</p>
                    <p>&nbsp;</p>
                    <p>JavaScript를 사용해 슬라이드 배너와 드롭다운</p>
                    <p>메뉴를 구현하였고, 날씨API를 가져와 날씨정보를 </p>
                    <p>볼 수 있도록 작업하였 습니다.</p>
                    <p>&nbsp;</p>
                    <p>그리고 PHP 를 이용하여 회원가입 정보를 저장해</p>
                    <p>로그인 기능을 추가하고 게시판 기능을 적용하여</p>
                    <p>작성 및 수정, 삭제가 가능하도록 구현 하였습니다.</p>
                    <div className="link">
                      <a href="http://solidbass.dothome.co.kr" target="_blank">
                        <p>메인 페이지</p>
                      </a>
                      <a
                        href="http://solidbass.dothome.co.kr/login.php"
                        target="_blank"
                      >
                        <p>로그인 페이지</p>
                      </a>
                      <a
                        href="http://solidbass.dothome.co.kr/register_form.php"
                        target="_blank"
                      >
                        <p>회원가입 페이지</p>
                      </a>
                      <a
                        href="http://solidbass.dothome.co.kr/list.php"
                        target="_blank"
                      >
                        <p>게시판 페이지</p>
                      </a>
                      <a
                        href="http://solidbass.dothome.co.kr/map_info.php"
                        target="_blank"
                      >
                        <p>지도 페이지</p>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 제네시스 */}
                <div className="pro-genesis">
                  <div className="project-imgbox">
                    <a
                      href="https://jayden7809.github.io/genesis/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="클릭하시면 사이트로 이동합니다."
                    >
                      <img src={genesis} alt="genesis" />
                    </a>
                  </div>
                  <div className="project-textbox">
                    <h2>
                      제네시스 홈페이지 리뉴얼<p>PC버전</p>
                    </h2>
                    <div className="project-skill">
                      <div>HTML</div>
                      <div>CSS</div>
                    </div>
                    <p>가장 첫번째 작업으로 제네시스 홈페이지를 </p>
                    <p> 리뉴얼 해봤습니다.</p>
                    <p>&nbsp;</p>
                    <p>HTML을 이용해 브라우저에 렌더링 하였고</p>
                    <p>CSS를 사용해 위치와 크기 등 을 조정하였습니다.</p>
                    <p>&nbsp;</p>
                    <p>기능구현은 없었지만 처음으로 한 작업이라</p>
                    <p>가장 기억에 남습니다.</p>
                  </div>
                </div>
              </section>
              {/* Top Button */}
              <button
                className={`top-btn ${isLightMode ? "light" : ""}`}
                onClick={() => {
                  const rightPanel = rightPanelRef.current;
                  if (!rightPanel) return;
                  rightPanel.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                ⬆ Top
              </button>
              {/* Footer */}
              <footer>
                <p>Kakao Talk - ljg6844</p>
                <p>Instagram - ISTJaehyung</p>
                <p>E-mail - soi_jaehyung@naver.com</p>
              </footer>

              {/* <ModalPreview
                open={preview.open}
                url={preview.url}
                w={preview.w}
                h={preview.h}
                onClose={closeModalPreview}
                isLightMode={isLightMode}
              /> */}


            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
