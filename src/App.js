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
import lightarrow from "./assets/images/light arrow-down-sign-to-navigate.png";

/* 증명사진 */
import profile from "./assets/images/231A0913.jpg";

/* 프로젝트 이미지 */
import genesis from "./assets/images/genesis.png";
import anyang from "./assets/images/anyang.png";
import serieslog from "./assets/images/serieslog.png";
import seriesup from "./assets/images/serisup.png";
import sourvenir from "./assets/images/sourvenir.png";
import little from "./assets/images/littel.png";

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

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const cursor = useRef({ x: 0, y: 0 });
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

  /* 오른쪽 스크롤 제어 */
  useEffect(() => {
    if (showIntro) return;
    const rightPanel = rightPanelRef.current;
    if (!rightPanel) return;

    const handleWheel = (e) => {
      e.preventDefault();
      rightPanel.scrollTop += e.deltaY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [showIntro]);

  /* 마우스 커서 */
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      let target = { ...cursor.current };
      circleRefs.current.forEach((circle) => {
        const rect = circle.getBoundingClientRect();
        const current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        const lerp = (start, end, amt) => start + (end - start) * amt;
        const amt = 0.25;
        const x = lerp(current.x, target.x, amt);
        const y = lerp(current.y, target.y, amt);
        circle.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        "HTML을 활용하여 기본적인 웹페이지의 구조를 설계하고 배치할 수 있습니다.",
      detail2: "프로젝트에서는 효율적인 구조 설계를 통한 작업경험이 있습니다.",
    },
    {
      id: 2,
      name: "CSS",
      img: css,
      detail1:
        "Flex와 Grid를 활용하여 배치하고 시각적인 다자인을 완성한 경험이 있습니다.",
      detail2:
        "애니메이션과 트랜지션을 사용해 인터랙티브한 UI를 구현 할 수 있습니다.",
    },
    {
      id: 3,
      name: "JavaScript",
      img: Java,
      detail1:
        "사용자의 입력을 처리하고, 애니메이션을 구현하며 API연동 및 데이터를 처리한 경험이 있습니다.",
      detail2: "프로젝트에서 API 연동, 상태관리 로직 등을 직접 구현했습니다.",
    },
    {
      id: 4,
      name: "GitHub",
      img: git,
      detail1:
        "Git Hub를 통해 프로젝트간 팀원들과의 협업을해본 경험이 있습니다.",
      detail2:
        "브랜치를 사용하여 프로젝트 작업간 버전관리를 통한 백업을 할 수 있습니다.",
    },
    {
      id: 5,
      name: "PHP",
      img: php,
      detail1: "기초적인 CRUD 구현 및 서버사이드 렌더링 경험이 있습니다.",
      detail2: "MySQL 연동과 간단한 백엔드 API 구축 경험이 있습니다.",
    },
    {
      id: 6,
      name: "Vue",
      img: vue,
      detail1:
        "Vue 컴포넌트 기반 구조에 익숙하며, Vue Router 및 Pinia 상태관리 경험이 있습니다.",
      detail2:
        "프로젝트에서 컴포넌트를 재사용하고, 많은 파일을 한번에 다룬 경험이 있습니다.",
    },
    {
      id: 7,
      name: "J-Query",
      img: jq,
      detail1:
        "Java Script의 라이브러리로 문서를 더 간결하게 작성할 수 있습니다.",
      detail2: "AJAX 통신 및 슬라이드, 모달 등 UI효과 구현 경험이 있습니다.",
    },
    {
      id: 8,
      name: "React",
      img: react,
      detail1:
        "React를 통해 작업하면서 편리함과 실용성을 느끼며 작업한 경험이 있습니다.",
      detail2: "본 포트폴리오는 React로 작업되었습니다.",
    },
    {
      id: 9,
      name: "Illustrator",
      img: illust,
      detail1: "벡터 디자인 작업 및 로고, 아이콘 제작 경험이 있습니다.",
      detail2: "다양한 디자인요소를 제작하고 편집한 경험이 있습니다.",
    },
    {
      id: 10,
      name: "Photoshop",
      img: photoshop,
      detail1:
        "이미지 보정, 합성, 그래픽 디자인 등 전반적인 편집 경험이 있습니다.",
      detail2: "마스크기능을 활용하여 작업한 경험이 있습니다.",
    },
    {
      id: 11,
      name: "Bootstrap",
      img: boot,
      detail1: "Bootstrap을 이용한 반응형 UI 제작 경험이 있습니다.",
      detail2:
        "디자인 일관성을 유지하고, 다양한 해상도에서 적용 가능한 레이아웃을 구현할 수 있습니다.",
    },
    {
      id: 12,
      name: "Figma",
      img: figma,
      detail1:
        "UI/UX 설계 및 디자인을 통해 팀원들과 협업을 해본 경험이 있습니다.",
      detail2:
        "디자인 후 프로토타입을 통해 시각적인 요소를 디테일 하게 작업할 수 있습니다.",
    },
    {
      id: 13,
      name: "Node.js",
      img: node,
      detail1: "클라이언트와의 비동기 통신을 효율적으로 처리했습니다.",
      detail2: "로그인, 데이터 관리 등 기본적인 기능을 구현한 경험이 있습니다.",
    },
    {
      id: 14,
      name: "Next.js",
      img: next,
      detail1: "React기반 프레임 워크로",
      detail2: "회원가입, 로그인 및 게시판작성을 구현한 경험이 있습니다.",
    },
  ];

  const handleToggle = (id) => setOpenBox((prev) => (prev === id ? null : id));

  return (
    <>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <>
          {[5, 4, 3, 2, 1].map((i, idx) => (
            <div
              key={i}
              className={`cursor-circle circle-${i}`}
              ref={(el) => (circleRefs.current[idx] = el)}
            ></div>
          ))}
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
                    "저는 약 9년간 음악 연주와 레코딩 프리랜서로",
                    "활동하며 미래에 대해 고민하던중,",
                    '선배의 "너는 무엇을 하더라도 잘 해낼 것 같다"',
                    "라는 한마디에 자신감을 얻었고.",
                    "이후 호기심이 생긴 개발 분야에 도전하며",
                    "새로운 길을 걷기 시작했습니다.",
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
                      className={`toggle-box ${
                        openBox === skill.id ? "open" : ""
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
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>

              {/* Project Section */}
              <section ref={projectRef} className="Project">
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
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          "http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/",
                          "_blank",
                          "width=1440,height=844,noopener,noreferrer"
                        );
                      }}
                      title="클릭하시면 PC 화면으로 사이트가 열립니다."
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
                      title="클릭하시면 Tablet 화면으로 사이트가 열립니다."
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
                      title="클릭하시면 Mobile 화면으로 사이트가 열립니다."
                    >
                      <p>Mobile</p>
                    </a>

                    <div className="link">
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/"
                        target="_blank"
                      >
                        <p>메인 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/edu?tab=house"
                        target="_blank"
                      >
                        <p>영상목록 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/edudetail?tab=house"
                        target="_blank"
                      >
                        <p>영상재생 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/shop"
                        target="_blank"
                      >
                        <p>지원사업 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/shop/goods-01"
                        target="_blank"
                      >
                        <p>상품 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/cook"
                        target="_blank"
                      >
                        <p>요리교실 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/farm"
                        target="_blank"
                      >
                        <p>농장예약 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/myFarm"
                        target="_blank"
                      >
                        <p>마이 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/board"
                        target="_blank"
                      >
                        <p>FAQ 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/cart"
                        target="_blank"
                      >
                        <p>장바구니 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/login"
                        target="_blank"
                      >
                        <p>로그인 페이지</p>
                      </a>
                      <a
                        href="http://littlefarmer1.ap-northeast-2.elasticbeanstalk.com/member"
                        target="_blank"
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
                          "http://nuno6844.dothome.co.kr",
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
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
