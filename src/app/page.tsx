"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const PRODUCT_URL = "/mockup";

const stats = [
  { target: 1200, suffix: "+", label: "창업팀이 함께" },
  { target: 98,   suffix: "%", label: "사용자 만족도" },
  { target: 3,    suffix: "분", label: "첫 진단까지" },
];

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "사업성 진단",
    desc: "아이디어를 문제·고객·솔루션·수익모델로 구조화하고, 강점과 리스크, 검증해야 할 핵심 가정을 정리합니다.",
    note: undefined,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "실행 로드맵",
    desc: "검증 → 행정 → MVP → 고객 → 자금 순서로, 지금 당장 해야 할 일을 우선순위로 보여줍니다.",
    note: undefined,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "법인 · 행정 가이드",
    desc: "개인사업자와 법인 중 무엇이 맞는지, 사업자등록과 업종 인허가까지 단계별로 안내합니다.",
    note: "일반 정보 · 전문가 확인 권장",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    title: "지원사업 매칭",
    desc: "예비·초기·도약 패키지 등 단계에 맞는 정부지원사업 후보를 짚어 드립니다.",
    note: "공고·요건 변동 · 확인 필요",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "산출물 자동 생성",
    desc: "린 캔버스, 정관 초안, 준비물 체크리스트, IR 한 장까지 — 필요한 서류를 한 곳에서 만들고 관리합니다.",
    note: undefined,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "진척 관리",
    desc: "무엇을 했고 무엇이 남았는지 한 화면에서 추적하며 끝까지 끌고 갑니다.",
    note: undefined,
  },
];

const steps = [
  { num: "01", title: "아이디어 입력",  desc: "한 문장과 짧은 후속 질문 몇 개로 시작합니다." },
  { num: "02", title: "진단",           desc: "문제·고객·수익모델로 구조화하고 사업성과 리스크를 점검합니다." },
  { num: "03", title: "로드맵",         desc: "단계별로 해야 할 일과 그 이유를 순서대로 정리합니다." },
  { num: "04", title: "실행",           desc: "체크리스트를 따라가며 필요한 문서를 바로 생성합니다." },
];

const prices = [
  {
    name: "무료 미리보기",
    price: "₩0",
    note: "이 아이디어, 시작할 가치가 있는지부터",
    highlight: false,
    tag: undefined,
    features: ["아이디어 구조화 요약", "강점 미리보기", "사업성 점수 공개", "리스크·로드맵·산출물은 잠김"],
    cta: "무료로 진단하기",
  },
  {
    name: "아이디어 1건",
    price: "₩—",
    note: "이 아이디어를 끝까지 — 단건 결제",
    highlight: true,
    tag: "추천",
    features: ["전체 진단 (리스크·검증 가정 포함)", "단계별 실행 로드맵 P0–P5", "법인·행정 가이드 + 산출물 생성", "진척 관리 · 리마인더"],
    cta: "1건 시작하기",
  },
  {
    name: "묶음 크레딧",
    price: "₩—",
    note: "여러 아이디어를 견줘볼 때",
    highlight: false,
    tag: undefined,
    features: ["여러 건 분석 시 건당 단가 절감", "아이디어 간 비교", "팀 공유", "크레딧 소진형 (구독 아님)"],
    cta: "크레딧 문의",
  },
];

const SECTION_COUNT = 6;
const COOLDOWN = 950;
const INTRO_STORAGE_KEY = "bessential:hero-intro-seen";
const COUNT_UP_DURATION = 2000;
const COUNT_UP_DELAY = 120;

const sectionBg = [
  "#ffffff",
  "#f6f7fb",
  "#ffffff",
  "#f6f7fb",
  "#ffffff",
  "#0e0f13",
];

const formatStatValue = (value: number, suffix: string) =>
  `${Math.floor(value).toLocaleString("en-US")}${suffix}`;

const easeOutQuint = (p: number) => 1 - Math.pow(1 - p, 5);


function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Home() {
  const [current, setCurrent]       = useState(0);
  const [playIntro, setPlayIntro]   = useState(false);
  const [countValues, setCountValues] = useState(() => stats.map((s) => s.target));
  const blocking    = useRef(false);
  const touchStartY = useRef(0);

  const goTo = useCallback((index: number) => {
    const next = Math.min(Math.max(index, 0), SECTION_COUNT - 1);
    setCurrent(next);
    blocking.current = true;
    setTimeout(() => { blocking.current = false; }, COOLDOWN);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hasSeenIntro = window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
      if (reduceMotion || hasSeenIntro) return;
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      setPlayIntro(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (current !== 0) return;
    let frame = 0;
    let timeout = 0;
    const resetFrame = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      setCountValues(stats.map(() => 0));
      timeout = window.setTimeout(() => {
        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / COUNT_UP_DURATION, 1);
          const eased = easeOutQuint(progress);
          setCountValues(stats.map((s) => s.target * eased));
          if (progress < 1) {
            frame = window.requestAnimationFrame(tick);
          } else {
            setCountValues(stats.map((s) => s.target));
          }
        };
        frame = window.requestAnimationFrame(tick);
      }, COUNT_UP_DELAY);
    });
    return () => {
      window.cancelAnimationFrame(resetFrame);
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [current]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (blocking.current) return;
      setCurrent((c) => {
        const next = e.deltaY > 0 ? Math.min(c + 1, SECTION_COUNT - 1) : Math.max(c - 1, 0);
        blocking.current = true;
        setTimeout(() => { blocking.current = false; }, COOLDOWN);
        return next;
      });
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (blocking.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        setCurrent((c) => { const n = Math.min(c + 1, SECTION_COUNT - 1); blocking.current = true; setTimeout(() => { blocking.current = false; }, COOLDOWN); return n; });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setCurrent((c) => { const n = Math.max(c - 1, 0); blocking.current = true; setTimeout(() => { blocking.current = false; }, COOLDOWN); return n; });
      }
    };
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (blocking.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;
      setCurrent((c) => {
        const next = delta > 0 ? Math.min(c + 1, SECTION_COUNT - 1) : Math.max(c - 1, 0);
        blocking.current = true;
        setTimeout(() => { blocking.current = false; }, COOLDOWN);
        return next;
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      className="h-screen overflow-hidden text-gray-900"
      style={{ backgroundColor: sectionBg[current], transition: "background-color 900ms cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {/* ── 헤더 ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src="/logo.svg" alt="B Essential" width={130} height={22} priority />
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            {[
              { label: "기능",      idx: 2 },
              { label: "이용 방법", idx: 3 },
              { label: "가격",      idx: 4 },
            ].map(({ label, idx }) => (
              <button
                key={label}
                onClick={() => goTo(idx)}
                className="hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                {label}
              </button>
            ))}
          </nav>
          <Link
            href={PRODUCT_URL}
            className="text-sm font-medium px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            무료로 진단하기
          </Link>
        </div>
      </header>
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer border-none p-0 ${
              current === i
                ? "bg-indigo-400 scale-125"
                : current === SECTION_COUNT - 1
                ? "bg-white/40 hover:bg-white/70"
                : "bg-gray-300 hover:bg-indigo-300"
            }`}
            aria-label={`섹션 ${i + 1}`}
          />
        ))}
      </nav>
      <div
        className="will-change-transform"
        style={{
          transform: `translateY(-${current * 100}vh)`,
          transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <section className="h-screen flex flex-col items-center justify-center px-6 pt-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.08),transparent)]" />
          <div className="max-w-3xl mx-auto">
            <span
              className={`inline-block text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-6 px-3 py-1 bg-indigo-50 rounded-full ${playIntro ? "hero-rise-in" : ""}`}
              style={{ animationDelay: "80ms" }}
            >
              IDEA → COMPANY · 사업화 OS
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
              <span className={`inline-block ${playIntro ? "hero-rise-in" : ""}`} style={{ animationDelay: "180ms" }}>
                막막한 아이디어를,
              </span>
              <br />
              <span
                className={`inline-block bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent gradient-flow ${playIntro ? "hero-rise-in" : ""}`}
                style={{ animationDelay: "300ms" }}
              >
                실행 가능한 회사로.
              </span>
            </h1>
            <p
              className={`text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto ${playIntro ? "hero-rise-in" : ""}`}
              style={{ animationDelay: "440ms" }}
            >
              사업성 진단 · 단계별 로드맵 · 법인/행정 셋업 · 정부지원사업 매칭까지.
              아이디어 한 줄을 넣으면, 무엇을 어떤 순서로 해야 하는지 정리해 드립니다.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${playIntro ? "hero-rise-in" : ""}`}
              style={{ animationDelay: "560ms" }}
            >
              <Link
                href={PRODUCT_URL}
                className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 cursor-pointer border-none"
              >
                아이디어 무료로 진단하기
              </Link>
              <button
                onClick={() => goTo(3)}
                className="px-8 py-4 rounded-full border border-gray-200 text-gray-700 font-semibold text-base hover:bg-gray-50 transition-colors cursor-pointer bg-transparent"
              >
                작동 방식 보기 →
              </button>
            </div>
            <p
              className={`text-sm text-gray-400 mt-4 ${playIntro ? "hero-rise-in" : ""}`}
              style={{ animationDelay: "620ms" }}
            >
              요약·강점·점수는 무료 · 전체 결과는 아이디어 1건 결제 · 구독 아님
            </p>
          </div>

          {/* 통계 */}
          <div className="mt-12 max-w-2xl w-full grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${playIntro ? "hero-rise-in" : ""}`}
                style={{ animationDelay: `${680 + i * 90}ms` }}
              >
                <div className="text-3xl font-bold text-gray-900 tabular-nums">
                  {formatStatValue(countValues[i], s.suffix)}
                </div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => goTo(1)}
            className="absolute bottom-8 flex flex-col items-center gap-1 text-gray-400 animate-bounce bg-transparent border-none cursor-pointer"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </section>

        {/* ── 섹션 1 · Why B Essential ── */}
        <section className="h-screen flex items-center px-6">
          <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">WHY B ESSENTIAL</span>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-gray-900 mt-5">
                '그래서 뭐부터 하지?'에서
                <br />
                멈추지 않도록.
              </h2>
            </div>
            <div className="space-y-5 text-gray-500 text-lg leading-relaxed">
              <p>
                대부분의 창업 도구는{" "}
                <strong className="text-gray-900 font-semibold">이미 시작한 사람</strong>을 위한 것입니다.
                정작 아이디어만 있는 사람은 첫 발에서 막힙니다.
              </p>
              <p>
                B Essential은 그 0→1 구간을 메웁니다. 흩어진 정보를 검색으로 짜맞추는 대신,
                내 아이디어에 맞는 순서로 진단하고, 해야 할 일을 단계로 정리하고,
                필요한 서류까지 만들어 줍니다.
              </p>
            </div>
          </div>
        </section>

        {/* ── 섹션 2 · 기능 6개 ── */}
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <div className="max-w-6xl w-full mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">WHAT YOU GET</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
                아이디어를 '실행 가능한 계획'으로
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  {f.note && (
                    <span className="inline-block mt-3 text-xs font-mono text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
                      {f.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 섹션 3 · 이용 방법 ── */}
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <div className="max-w-5xl w-full mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">HOW IT WORKS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-3">
                입력에서 실행까지, 네 단계
              </h2>
              <p className="text-gray-500 text-lg">복잡한 과정 없이 누구나 쉽게 시작할 수 있어요.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {steps.map((s, i) => (
                <div key={s.num} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-indigo-200 to-transparent -translate-x-4 z-0" />
                  )}
                  <div className="relative z-10">
                    <span className="text-5xl font-black text-indigo-100 select-none">{s.num}</span>
                    <h3 className="font-semibold text-gray-900 text-lg mt-1 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 섹션 4 · 가격 ── */}
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <div className="max-w-5xl w-full mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">PRICING · 아이디어 1건당 결제</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-2">
                구독이 아니라, 아이디어 하나에 결제
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto">
                무료로 요약·강점·점수를 미리 보고, 전체 결과가 필요하면 그 아이디어 1건만 결제하세요.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {prices.map((p) => (
                <div
                  key={p.name}
                  className={`relative flex flex-col rounded-2xl p-6 bg-white border transition-all duration-200 ${
                    p.highlight
                      ? "border-indigo-500 shadow-lg shadow-indigo-100"
                      : "border-gray-100 hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  {p.tag && (
                    <span className="absolute -top-3 left-6 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {p.tag}
                    </span>
                  )}
                  <div className="font-bold text-gray-900 text-base">{p.name}</div>
                  <div className="text-3xl font-extrabold tracking-tight text-gray-900 mt-2">{p.price}</div>
                  <div className="text-sm text-gray-500 mt-1 mb-4">{p.note}</div>
                  <ul className="space-y-2 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckIcon />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={PRODUCT_URL}
                    className={`mt-5 block text-center py-2.5 rounded-full text-sm font-semibold transition-colors ${
                      p.highlight
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "border border-gray-200 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {p.cta}
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
              <div>
                <div className="font-semibold text-gray-900 text-sm">기관 · 팀 (화이트라벨)</div>
                <p className="text-xs text-gray-500 mt-0.5">대학 창업지원단 · 액셀러레이터 · 지자체 — 다수 팀 일괄, 운영 대시보드, 전문가 연결.</p>
              </div>
              <Link
                href={PRODUCT_URL}
                className="shrink-0 text-sm font-semibold border border-gray-300 rounded-full px-4 py-2 hover:border-gray-500 transition-colors"
              >
                도입 문의
              </Link>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              가격은 시장 검증 전이라 미정입니다(₩— 로 표기). 단가·크레딧 구성은 사용자 결제 의향 확인 후 확정 예정입니다.
            </p>
          </div>
        </section>
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="max-w-3xl w-full text-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 sm:p-16 shadow-xl shadow-indigo-900/30">
              <span className="text-xs font-semibold tracking-widest text-indigo-200 uppercase">START NOW</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                막막함은 여기서 끝내세요.
              </h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-md mx-auto">
                아이디어 한 줄이면 충분합니다. 요약·강점·점수까지는 무료로 바로 확인하세요.
              </p>
              <Link
                href={PRODUCT_URL}
                className="inline-block px-10 py-4 rounded-full bg-white text-indigo-600 font-bold text-base hover:bg-indigo-50 transition-colors shadow-lg"
              >
                아이디어 무료로 진단하기
              </Link>
            </div>
          </div>
          <footer className="w-full border-t border-white/10 py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <Image src="/logo.svg" alt="B Essential" width={100} height={17} className="brightness-0 invert" />
              <p className="text-sm text-white/40">© 2026 B Essential. All rights reserved.</p>
              <div className="flex gap-6 text-sm text-white/40">
                <a href="#" className="hover:text-white/70 transition-colors">이용약관</a>
                <a href="#" className="hover:text-white/70 transition-colors">개인정보처리방침</a>
              </div>
            </div>
          </footer>
        </section>

      </div>
      <style>{`
        @keyframes heroRiseIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-rise-in {
          opacity: 0;
          animation: heroRiseIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        .gradient-flow {
          background-size: 200% 200%;
          animation: gradientFlow 4s ease infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise-in  { animation: none; opacity: 1; }
          .gradient-flow { animation: none; }
        }
      `}</style>
    </div>
  );
}
