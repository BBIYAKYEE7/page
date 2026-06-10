"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ACCENT = "#6366F1";
const ACCENT_SOFT = "#EEF0FE";
const ACCENT_GRAD = "linear-gradient(135deg, #6366F1, #8B5CF6)";
const INK = "#15161A"; // 로고 다크 타일 색

// 💡 page.tsx와 동일한 스크롤 환경 구성을 위한 상수 정의
const SECTION_COUNT = 5; // 랜딩 뷰의 총 섹션 수 (0히어로, 1HOW, 2MODULES, 3PRICING, 4FOOTER)
const COOLDOWN = 950;    // 휠 연타 방지 락 타임

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function IconBase({ size = 18, className, style, children }: IconProps) {
  return (
    <Image src="/logo.svg" alt="B Essential" width={130} height={22} priority />
  );
}

function ArrowRight(props: IconProps) { return <IconBase {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></IconBase>; }
function Check(props: IconProps) { return <IconBase {...props}><path d="m5 12 4 4L19 6" /></IconBase>; }
function ChevronRight(props: IconProps) { return <IconBase {...props}><path d="m9 18 6-6-6-6" /></IconBase>; }
function Circle(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="8" /></IconBase>; }
function FileText(props: IconProps) { return <IconBase {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h6" /></IconBase>; }
function Download(props: IconProps) { return <IconBase {...props}><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></IconBase>; }
function Building2(props: IconProps) { return <IconBase {...props}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" /><path d="M4 22h20" /><path d="M9 6h1" /><path d="M14 6h1" /><path d="M9 10h1" /><path d="M14 10h1" /><path d="M9 14h1" /><path d="M14 14h1" /></IconBase>; }
function Target(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></IconBase>; }
function Users(props: IconProps) { return <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></IconBase>; }
function Banknote(props: IconProps) { return <IconBase {...props}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 9h.01" /><path d="M18 15h.01" /></IconBase>; }
function Rocket(props: IconProps) { return <IconBase {...props}><path d="M4.5 16.5c-1.5 1.3-2 3.2-2 5 1.8 0 3.7-.5 5-2" /><path d="M9 15 5 11l2-4 4 4" /><path d="M15 9 9 3l4-2c3.5 1 6 3.5 7 7l-2 4Z" /><path d="M14 4.5 19.5 10" /></IconBase>; }
function FlaskConical(props: IconProps) { return <IconBase {...props}><path d="M10 2v6L4.5 18.5A2 2 0 0 0 6.3 22h11.4a2 2 0 0 0 1.8-3.5L14 8V2" /><path d="M8 2h8" /><path d="M7 16h10" /></IconBase>; }
function ClipboardList(props: IconProps) { return <IconBase {...props}><path d="M9 2h6a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v15H4V7a2 2 0 0 1 2-2h1V4a2 2 0 0 1 2-2Z" /><path d="M9 5h6" /><path d="M8 12h.01" /><path d="M11 12h5" /><path d="M8 16h.01" /><path d="M11 16h5" /></IconBase>; }
function Lock(props: IconProps) { return <IconBase {...props}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></IconBase>; }
function Plus(props: IconProps) { return <IconBase {...props}><path d="M12 5v14" /><path d="M5 12h14" /></IconBase>; }

const VIEWS = [
  { id: "landing", code: "00", label: "랜딩" },
  { id: "input", code: "01", label: "아이디어 입력" },
  { id: "diagnosis", code: "02", label: "진단" },
  { id: "roadmap", code: "03", label: "로드맵" },
  { id: "step", code: "04", label: "단계 상세" },
  { id: "docs", code: "05", label: "산출물" },
];

function BrandMark({ size = 28, tile = true }: { size?: number; tile?: boolean }) {
  return <Image src="/logo.svg" alt="B Essential" width={130} height={22} priority />;
}

function Locked({ locked, title, sub, onUnlock, children, pinTop = false }: { locked: boolean; title: string; sub?: string; onUnlock: () => void; children: React.ReactNode; pinTop?: boolean }) {
  if (!locked) return <>{children}</>;
  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-60 blur-sm" aria-hidden="true">
        {children}
      </div>
      <div className={`absolute inset-0 flex justify-center p-4 ${pinTop ? "items-start pt-10" : "items-center"}`}>
        <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white/95 p-5 text-center shadow-sm backdrop-blur">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full" style={{ background: ACCENT_SOFT }}>
            <Lock size={18} style={{ color: ACCENT }} />
          </div>
          <div className="mt-3 text-sm font-semibold text-neutral-900">{title}</div>
          {sub && <p className="mt-1 text-xs leading-relaxed text-neutral-500">{sub}</p>}
          <button onClick={onUnlock} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ background: ACCENT_GRAD }}>
            결제하고 전체 보기
            <ArrowRight size={15} />
          </button>
          <div className="mt-2">
            <Mono className="text-neutral-400" style={{ fontSize: "10px" }}>아이디어 1건 · ₩— (가격 미정)</Mono>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mono({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <span className={`font-mono-data ${className}`} style={style}>{children}</span>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="font-mono-data uppercase text-neutral-400" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>{children}</div>;
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-neutral-600">{label}</span>
        <Mono className="text-neutral-500" style={{ fontSize: "12px" }}>{value}</Mono>
      </div>
      <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: ACCENT }} />
      </div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 shrink-0">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#E7E7E9" strokeWidth="9" />
      <circle cx="60" cy="60" r={r} fill="none" stroke={ACCENT} strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 60 60)" />
      <text x="60" y="57" textAnchor="middle" fontSize="30" fontWeight="700" fill="#0A0A0A">{value}</text>
      <text x="60" y="76" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#9A9AA0" className="font-mono-data">SCORE</text>
    </svg>
  );
}

function Flag({ children = "확인 필요" }: { children?: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border px-2 py-0.5 font-mono-data" style={{ fontSize: "10px", letterSpacing: "0.05em", borderColor: "#E2C9A0", color: "#8A6A2F", background: "#FBF5EA" }}>{children}</span>;
}

function PrimaryButton({ children, onClick, full = false }: { children: React.ReactNode; onClick?: () => void; full?: boolean }) {
  return (
    <button onClick={onClick} className={`group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-colors ${full ? "w-full" : ""}`} style={{ background: "#0A0A0A" }}>
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function GhostButton({ children, onClick, full = false }: { children: React.ReactNode; onClick?: () => void; full?: boolean }) {
  return <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 ${full ? "w-full" : ""}`}>{children}</button>;
}

function DemoNav({ view, setView, paid, setPaid }: { view: string; setView: (v: string) => void; paid: boolean; setPaid: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 sm:px-8">
        <button onClick={() => setView("landing")} className="flex items-center gap-2" aria-label="홈으로">
          <BrandMark size={20} tile={false} />
        </button>

        <div className="ml-1 hidden items-center gap-1 rounded-full border border-neutral-200 bg-white p-0.5 sm:flex">
          <button onClick={() => setPaid(false)} className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${!paid ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"}`}>무료</button>
          <button onClick={() => setPaid(true)} className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${paid ? "text-white" : "text-neutral-500 hover:text-neutral-900"}`} style={paid ? { background: ACCENT_GRAD } : {}}>결제 후</button>
        </div>

        <nav className="ml-auto flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {VIEWS.map((v) => {
            const active = view === v.id;
            return (
              <button key={v.id} onClick={() => setView(v.id)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${active ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"}`}>
                <Mono style={{ fontSize: "10px", opacity: active ? 0.7 : 0.5 }}>{v.code}</Mono>
                <span className="text-sm font-medium">{v.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* 00 · 랜딩                                                            */
/* ------------------------------------------------------------------ */

const PHASES = [
  { code: "P0", title: "아이디어 검증", steps: 6 },
  { code: "P1", title: "사업 형태 · 행정 셋업", steps: 7 },
  { code: "P2", title: "MVP / 프로토타입", steps: 5 },
  { code: "P3", title: "초기 고객 · 검증", steps: 6 },
  { code: "P4", title: "자금 · 지원사업", steps: 5 },
  { code: "P5", title: "팀 · 스케일", steps: 4 },
];

const MODULES = [
  { icon: Target, title: "사업성 진단", desc: "강점, 주의할 리스크, 먼저 검증해야 할 핵심 가정을 정리합니다." },
  { icon: ClipboardList, title: "실행 로드맵", desc: "검증 → 행정 → MVP → 고객 → 자금 순서로, 지금 할 일을 우선순위로 보여줍니다." },
  { icon: Building2, title: "법인 · 행정 가이드", desc: "개인사업자/법인 선택, 사업자등록, 업종 인허가까지 단계별로 안내합니다." },
  { icon: Banknote, title: "지원사업 매칭", desc: "예비·초기·도약 패키지 등 단계별 후보를 짚어 줍니다. (공고 확인 필요)" },
  { icon: FileText, title: "산출물 자동 생성", desc: "린 캔버스, 정관 초안, 준비물 체크리스트, IR 한 장을 만들어 줍니다." },
  { icon: Check, title: "진척 관리", desc: "무엇을 했고 무엇이 남았는지 한 화면에서 추적합니다." },
];

const HOW = [
  { n: "01", t: "아이디어 입력", d: "한 문장과 짧은 후속 질문 몇 개로 시작합니다." },
  { n: "02", t: "진단", d: "문제·고객·수익모델로 구조화하고 사업성과 리스크를 점검합니다." },
  { n: "03", t: "로드맵", d: "단계별로 해야 할 일과 그 이유를 정리합니다." },
  { n: "04", t: "실행", d: "체크리스트를 따라가며 필요한 문서를 바로 생성합니다." },
];

// 💡 page.tsx의 메커니즘 수용을 위한 단일 섹션 높이 제어 스타일 고정
const landingSectionClass = "h-[calc(100vh-53px)] w-full flex flex-col justify-center px-5 sm:px-8 overflow-y-auto select-none shrink-0";

function Landing({ onStart, onDemo, currentSection, goToSection }: { onStart: () => void; onDemo: () => void; currentSection: number; goToSection: (i: number) => void }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── 우측 인디케이터 도트 (page.tsx 스타일 테마 매칭) ── */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSection(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer border-none p-0 ${
              currentSection === i ? "bg-indigo-600 scale-125" : "bg-neutral-300 hover:bg-indigo-300"
            }`}
            aria-label={`섹션 ${i + 1}`}
          />
        ))}
      </nav>

      {/* ── 가로채기 슬라이드 애니메이션 트랙 ── */}
      <div
        className="will-change-transform flex flex-col h-full w-full"
        style={{
          transform: `translateY(-${currentSection * 100}%)`,
          transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* 섹션 0 · HERO */}
        <section className={landingSectionClass}>
          <div className="mx-auto max-w-6xl w-full">
            <Eyebrow>IDEA → COMPANY · 사업화 로드맵</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
              아이디어 한 줄을 넣으면,<br />진단부터 법인 설립까지<br /><span style={{ color: ACCENT }}>할 일을 순서대로</span> 정리해 드립니다.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              사업성 진단, 단계별 실행 로드맵, 법인·사업자 등록 가이드, 정부지원사업 매칭까지 — 흩어진 정보를 ‘내 아이디어에 맞는 순서’로 다시 정리합니다.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton onClick={onStart}>내 아이디어 진단하기</PrimaryButton>
              <GhostButton onClick={onDemo}>데모 둘러보기</GhostButton>
            </div>
            <p className="mt-4 text-sm text-neutral-400">무료로 요약·강점까지 미리보기 · 전체 결과는 아이디어 1건 결제 · 구독 아님</p>

            <div className="mt-12 rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <Mono className="text-neutral-400" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>ROADMAP PREVIEW</Mono>
                <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>P0 — P5</Mono>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {PHASES.map((p, i) => (
                  <div key={p.code} className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-lg border border-neutral-200 px-4 py-3" style={i === 0 ? { borderColor: ACCENT, background: ACCENT_SOFT } : {}}>
                    <Mono style={{ fontSize: "12px", color: i === 0 ? ACCENT : "#9A9AA0" }}>{p.code}</Mono>
                    <div className="text-sm font-semibold leading-snug text-neutral-900">{p.title}</div>
                    <Mono className="text-neutral-400" style={{ fontSize: "10px" }}>{p.steps} STEPS</Mono>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 1 · HOW IT WORKS */}
        <section className={`${landingSectionClass} bg-white border-t border-neutral-200`}>
          <div className="mx-auto max-w-6xl w-full">
            <Eyebrow>HOW IT WORKS</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">입력에서 실행까지, 네 단계</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
              {HOW.map((s) => (
                <div key={s.n} className="bg-white p-6">
                  <Mono style={{ fontSize: "13px", color: ACCENT, letterSpacing: "0.1em" }}>{s.n}</Mono>
                  <div className="mt-3 text-base font-semibold text-neutral-900">{s.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 섹션 2 · MODULES */}
        <section className={`${landingSectionClass} border-t border-neutral-200`}>
          <div className="mx-auto max-w-6xl w-full">
            <Eyebrow>WHAT YOU GET</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-neutral-900">아이디어를 ‘실행 가능한 계획’으로 바꾸는 6가지</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.title} className="rounded-xl border border-neutral-200 bg-white p-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100">
                      <Icon size={18} className="text-neutral-900" />
                    </div>
                    <div className="mt-4 text-base font-semibold text-neutral-900">{m.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 섹션 3 · PRICING */}
        <section className={`${landingSectionClass} bg-white border-t border-neutral-200`}>
          <div className="mx-auto max-w-6xl w-full">
            <Eyebrow>PRICING · 아이디어 1건당 결제 (가격 미정)</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">구독이 아니라, 아이디어 하나에 결제</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              무료로는 아이디어 요약과 강점, 사업성 점수까지 미리 볼 수 있습니다. 리스크·로드맵·산출물은 전체 결제 시 열립니다.
            </p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <PlanCard name="무료 미리보기" price="₩0" note="시작할 가치가 있는지부터" features={["아이디어 구조화 요약", "강점 미리보기", "사업성 점수 공개", "리스크·로드맵 잠김"]} />
              <PlanCard name="아이디어 1건" price="₩—" note="이 아이디어를 끝까지" highlight features={["전체 진단 (리스크 포함)", "단계별 실행 로드맵 전체", "법인 행정 가이드 및 산출물", "진척 관리 및 리마인더"]} />
              <PlanCard name="묶음 크레딧" price="₩—" note="여러 아이디어를 견줘볼 때" features={["건당 단가 절감 구성", "아이디어 간 상호 비교", "팀 공유 지원 기능", "크레딧 소진형 시스템"]} />
            </div>
            <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-base font-semibold text-neutral-900">기관 · 팀 (화이트라벨)</div>
                <p className="mt-1 text-sm text-neutral-600">대학 창업지원단 · 액셀러레이터 · 지자체 — 다수 팀 일괄, 운영 대시보드, 전문가 연결.</p>
              </div>
              <GhostButton onClick={onStart}>도입 문의</GhostButton>
            </div>
          </div>
        </section>

        {/* 섹션 4 · FOOTER */}
        <section className={`${landingSectionClass} border-t border-neutral-200 bg-neutral-50`}>
          <div className="mx-auto max-w-6xl w-full flex flex-col justify-between h-full py-8">
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm mt-auto">
              <Mono className="text-neutral-500" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>DISCLAIMER</Mono>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                본 서비스는 일반적인 정보와 실행 가이드를 제공하며, 법률·세무·노무 자문이 아닙니다. 법인 설립 절차·비용·세금, 정부지원사업의 요건·금액·일정은 시점에 따라 달라질 수 있어, 진행 전 공식 공고와 전문가(법무사·세무사 등) 확인이 필요합니다.
              </p>
            </div>
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-neutral-200 w-full">
              <span className="flex items-center gap-2"><BrandMark size={20} /></span>
              <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>© 2026 · DESIGN PROTOTYPE</Mono>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PlanCard({ name, price, note, features, highlight }: { name: string; price: string; note: string; features: string[]; highlight?: boolean }) {
  return (
    <div className="flex flex-col rounded-xl border bg-white p-6" style={highlight ? { borderColor: "#0A0A0A", boxShadow: "0 1px 0 #0A0A0A" } : { borderColor: "#E5E5E5" }}>
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-neutral-900">{name}</span>
        {highlight && <Mono className="rounded-full px-2 py-0.5 text-white" style={{ fontSize: "10px", background: ACCENT, letterSpacing: "0.05em" }}>추천</Mono>}
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">{price}</div>
      <p className="mt-1 text-sm text-neutral-500">{note}</p>
      <ul className="mt-5 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
            <Check size={15} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · 아이디어 입력                                                   */
/* ------------------------------------------------------------------ */

const FOLLOWUPS = [
  { q: "누구의 어떤 문제를 푸나요?", ph: "예) 경도인지장애 부모를 둔 보호자가 부모 상태를 매일 확인하기 어렵다" },
  { q: "지금은 그 문제를 어떻게 해결하고 있나요?", ph: "예) 직접 전화/방문, 단순 안부전화 — 기록·추세 파악이 안 됨" },
  { q: "어떻게 돈을 벌 계획인가요?", ph: "예) 보호자 월 구독, 기관 B2B, 통신사 제휴" },
  { q: "지금 가진 자원은?", ph: "예) 개발 1명, 세브란스 교수 자문 중, 초기 자금 일부" },
  { q: "목표 시점은?", ph: "예) 3개월 내 MVP, 6개월 내 유료 사용자 20명" },
];

function IdeaInput({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 h-[calc(100vh-53px)] overflow-y-auto">
      <Eyebrow>STEP 01 · 아이디어 입력</Eyebrow>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900">어떤 아이디어인가요?</h1>
      <p className="mt-3 text-base text-neutral-600">한 문장이면 충분합니다. 아래 질문에 답할수록 진단이 정확해집니다.</p>

      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-neutral-700">아이디어 한 문장</label>
        <textarea rows={3} defaultValue="경도인지장애 부모를 둔 보호자를 위해, 보호자 목소리로 AI가 매일 안부 전화를 걸어 복약·식사·컨디션을 확인하고 보호자 앱에 기록·알림해 주는 서비스" className="w-full resize-none rounded-lg border border-neutral-300 bg-white p-4 text-base leading-relaxed text-neutral-900 focus:border-neutral-900" />
        <div className="mt-3 flex flex-wrap gap-2">
          {["동네 기반 중고거래", "1인 식당 예약·웨이팅", "반려동물 건강 기록"].map((c) => (
            <button key={c} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900">+ {c}</button>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <Mono style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.1em" }}>AI 후속 질문</Mono>
          <span className="text-xs text-neutral-400">선택 — 답할수록 정확해집니다</span>
        </div>
        <div className="space-y-5">
          {FOLLOWUPS.map((f, i) => (
            <div key={i}>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-800">
                <Mono className="text-neutral-300" style={{ fontSize: "11px" }}>Q{i + 1}</Mono>
                {f.q}
              </label>
              <input placeholder={f.ph} className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={onSubmit} full>진단 시작</PrimaryButton>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-400"><Lock size={12} /> 입력 내용은 로드맵 생성에만 사용됩니다.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · 진단                                                            */
/* ------------------------------------------------------------------ */

const STRUCT = [
  { k: "문제", v: "보호자가 떨어져 사는 부모의 일상(복약·식사·컨디션) 변화를 지속적으로 파악하기 어렵다." },
  { k: "고객", v: "경도인지장애·초기 인지저하 부모를 둔 30–50대 보호자. 1차 구매자=보호자, 사용자=부모." },
  { k: "솔루션", v: "보호자 목소리 기반 AI 전화로 짧게 확인하고 응답을 구조화해 보호자에게 요약·알림." },
  { k: "수익모델", v: "보호자 월 구독 + 향후 기관/통신사 B2B 제휴. 초기엔 구독 검증에 집중." },
];

const SCORES = [
  { label: "문제 명확성", value: 80 },
  { label: "시장성", value: 65 },
  { label: "실현 가능성", value: 70 },
  { label: "차별성", value: 74 },
];

function Diagnosis({ onRoadmap, paid, onUnlock }: { onRoadmap: () => void; paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 h-[calc(100vh-53px)] overflow-y-auto">
      <Eyebrow>STEP 02 · 진단 결과</Eyebrow>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">보호자 목소리 기반 AI 안부 전화 서비스</h1>

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
        {STRUCT.map((s) => (
          <div key={s.k} className="bg-white p-5">
            <Mono style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.08em" }}>{s.k.toUpperCase()}</Mono>
            <div className="mt-1 text-sm font-semibold text-neutral-900">{s.k}</div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-neutral-900">사업성 진단</div>
          <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>추정 · 참고용</Mono>
        </div>
        <div className="mt-5 flex flex-col items-center gap-8 sm:flex-row">
          <ScoreRing value={72} />
          <div className="grid w-full flex-1 gap-4 sm:grid-cols-2">
            {SCORES.map((s) => <Bar key={s.label} label={s.label} value={s.value} />)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <InsightCol title="강점" tone="pos" items={["고령자가 ‘앱 학습’ 없이 전화만 받으면 되는 낮은 사용 장벽", "보호자 목소리 사용으로 수용성·정서적 안정 차별화", "응답 구조화·추세 데이터가 단순 안부전화 대비 분명한 자산"]} />
        <div className="lg:col-span-2">
          <Locked locked={!paid} title="리스크와 검증할 핵심 가정은 결제 후 공개" sub="강점은 무료로 보여드립니다. 정작 중요한 ‘무엇을 조심하고 무엇부터 검증할지’는 전체 진단에 포함됩니다." onUnlock={onUnlock}>
            <div className="grid gap-5 sm:grid-cols-2">
              <InsightCol title="주의 · 리스크" tone="warn" items={["의료기기·진단으로 오인되지 않도록 포지셔닝/표현 관리 필요", "개인정보·민감정보(건강) 처리에 대한 법적 요건", "전화 응답률·지속 사용(리텐션)이 핵심 불확실성"]} />
              <InsightCol title="검증할 핵심 가정" tone="neutral" items={["보호자가 ‘월 구독료’를 지불할 의향이 있는가", "부모가 AI 전화에 꾸준히 응답하는가 (2–4주 관찰)", "구조화 리포트가 보호자의 행동(병원·돌봄)을 바꾸는가"]} />
            </div>
          </Locked>
        </div>
      </div>

      {paid ? (
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <PrimaryButton onClick={onRoadmap}>이 진단으로 로드맵 만들기</PrimaryButton>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between" style={{ background: ACCENT_SOFT }}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white"><Lock size={18} style={{ color: ACCENT }} /></div>
              <div>
                <div className="text-base font-semibold text-neutral-900">전체 진단 + 단계별 로드맵 열기</div>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">리스크·검증할 가정, P0–P5 실행 로드맵, 법인·행정 가이드, 산출물 생성까지 포함됩니다.</p>
              </div>
            </div>
            <button onClick={onUnlock} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ background: ACCENT_GRAD }}>
              결제하고 전체 보기 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InsightCol({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  const dot = tone === "pos" ? ACCENT : tone === "warn" ? "#C2410C" : "#737373";
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <div className="text-sm font-semibold text-neutral-900">{title}</div>
      <ul className="mt-4 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: dot }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · 로드맵                                                          */
/* ------------------------------------------------------------------ */

const ROADMAP = [
  { code: "P0", title: "아이디어 검증", steps: 6, status: "active", progress: 40, icon: FlaskConical },
  { code: "P1", title: "사업 형태 · 행정 셋업", steps: 7, status: "next", progress: 0, icon: Building2 },
  { code: "P2", title: "MVP / 프로토타입", steps: 5, status: "later", progress: 0, icon: Rocket },
  { code: "P3", title: "초기 고객 · 검증", steps: 6, status: "later", progress: 0, icon: Target },
];

function Roadmap({ onStep, paid, onUnlock }: { onStep: () => void; paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 h-[calc(100vh-53px)] overflow-y-auto">
      <Eyebrow>STEP 03 · 사업화 로드맵</Eyebrow>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mt-2">보호자 목소리 기반 AI 안부 전화 서비스</h1>

      <div className="mt-8 space-y-2.5">
        {ROADMAP.map((p) => {
          const Icon = p.icon;
          const active = p.status === "active";
          return (
            <button key={p.code} onClick={() => (paid ? onStep() : onUnlock())} className="group flex w-full items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-neutral-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={active ? { background: ACCENT_SOFT } : { background: "#F4F4F5" }}>
                <Icon size={18} style={{ color: active ? ACCENT : "#525252" }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>{p.code}</Mono>
                  <span className="text-base font-semibold text-neutral-900">{p.title}</span>
                </div>
              </div>
              {paid ? <ChevronRight size={18} /> : <Lock size={15} className="text-neutral-300" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · 단계 상세 (법인 설립)                                           */
/* ------------------------------------------------------------------ */

const CHECKLIST = [
  { t: "상호 · 사업목적 · 본점 소재지 결정", d: "같은 관할에 동일 상호는 불가. 사전 등기소 검색 필요.", done: true },
  { t: "자본금 · 액면가 결정", d: "최저자본금 법정 제한 없음. 대외 신뢰성 고려 책정.", done: false },
];

function StepDetail({ onBack, paid, onUnlock }: { onBack: () => void; paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 h-[calc(100vh-53px)] overflow-y-auto">
      <button onClick={onBack} className="text-sm text-neutral-500 hover:text-neutral-900 mb-2 block">← 로드맵으로 돌아가기</button>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">법인 설립하기</h1>

      <div className="mt-6">
        <Locked locked={!paid} pinTop title="이 단계 가이드는 결제 후 공개" onUnlock={onUnlock}>
          <div className="space-y-2">
            {CHECKLIST.map((c, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4">
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-neutral-900">{i + 1}. {c.t}</span>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Locked>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · 산출물                                                          */
/* ------------------------------------------------------------------ */

function Docs({ paid, onUnlock }: { paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 h-[calc(100vh-53px)] overflow-y-auto">
      <Eyebrow>STEP 05 · 산출물</Eyebrow>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">생성한 문서</h1>
      <div className="mt-6">
        <Locked locked={!paid} pinTop title="산출물 생성·다운로드는 결제 후" onUnlock={onUnlock}>
          <p className="text-sm text-neutral-600">결제 완료 시 문서 인프라가 활성화됩니다.</p>
        </Locked>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 폰트 / 전역 스타일                                                   */
/* ------------------------------------------------------------------ */

function FontStyles() {
  return (
    <style>{`
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      .font-mono-data { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace; }
      body { overflow: hidden; } /* 💡 page.tsx처럼 전역 튕김 바운스 스크롤을 막기 위한 강제 제어 */
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/* 루트                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [view, setView]               = useState("landing");
  const [paid, setPaid]               = useState(false);
  const [currentSection, setCurrentSection] = useState(0); // 💡 랜딩 서브 섹션 추적용 인덱스 상태 추가

  const blocking    = useRef(false);
  const touchStartY = useRef(0);
  const unlock      = () => setPaid(true);

  // 💡 page.tsx의 부드러운 섹션 핸들링 로직을 결합한 스위처 정의
  const goToSection = useCallback((index: number) => {
    const next = Math.min(Math.max(index, 0), SECTION_COUNT - 1);
    setCurrentSection(next);
    blocking.current = true;
    setTimeout(() => { blocking.current = false; }, COOLDOWN);
  }, []);

  /* 💡 page.tsx 내 구현된 순수 자바스크립트 스크롤 인터셉트 로직 완벽 커스텀 이식 */
  useEffect(() => {
    if (view !== "landing") return; // 랜딩 뷰 상태일 때만 이 가로채기 엔진 가동

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (blocking.current) return;
      setCurrentSection((c) => {
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
        setCurrentSection((c) => { const n = Math.min(c + 1, SECTION_COUNT - 1); blocking.current = true; setTimeout(() => { blocking.current = false; }, COOLDOWN); return n; });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setCurrentSection((c) => { const n = Math.max(c - 1, 0); blocking.current = true; setTimeout(() => { blocking.current = false; }, COOLDOWN); return n; });
      }
    };

    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (blocking.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;
      setCurrentSection((c) => {
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
  }, [view]);

  return (
    <div className="h-screen w-screen bg-neutral-50 text-neutral-900 antialiased overflow-hidden flex flex-col" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      <FontStyles />
      <DemoNav view={view} setView={setView} paid={paid} setPaid={setPaid} />
      
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="h-full w-full">
            {view === "landing" && (
              <Landing 
                onStart={() => setView("input")} 
                onDemo={() => setView("diagnosis")} 
                currentSection={currentSection}
                goToSection={goToSection}
              />
            )}
            {view === "input" && <IdeaInput onSubmit={() => setView("diagnosis")} />}
            {view === "diagnosis" && <Diagnosis onRoadmap={() => setView("roadmap")} paid={paid} onUnlock={unlock} />}
            {view === "roadmap" && <Roadmap onStep={() => setView("step")} paid={paid} onUnlock={unlock} />}
            {view === "step" && <StepDetail onBack={() => setView("roadmap")} paid={paid} onUnlock={unlock} />}
            {view === "docs" && <Docs paid={paid} onUnlock={unlock} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}