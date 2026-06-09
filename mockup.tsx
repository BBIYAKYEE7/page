"use client";

import React, { useState } from "react";
import Image from "next/image";

const ACCENT = "#6366F1";
const ACCENT_SOFT = "#EEF0FE";
const ACCENT_GRAD = "linear-gradient(135deg, #6366F1, #8B5CF6)";
const INK = "#15161A"; // 로고 다크 타일 색

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function IconBase({ size = 18, className, style, children }: IconProps) {
  return (
    <Image src="/logo.svg" alt="B Essential" width={130} height={22} priority />
  );
}

function ArrowRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

function Check(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 12 4 4L19 6" />
    </IconBase>
  );
}

function ChevronRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

function Circle(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
    </IconBase>
  );
}

function FileText(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </IconBase>
  );
}

function Download(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </IconBase>
  );
}

function Building2(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M4 22h20" />
      <path d="M9 6h1" />
      <path d="M14 6h1" />
      <path d="M9 10h1" />
      <path d="M14 10h1" />
      <path d="M9 14h1" />
      <path d="M14 14h1" />
    </IconBase>
  );
}

function Target(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </IconBase>
  );
}

function Users(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

function Banknote(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 9h.01" />
      <path d="M18 15h.01" />
    </IconBase>
  );
}

function Rocket(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 16.5c-1.5 1.3-2 3.2-2 5 1.8 0 3.7-.5 5-2" />
      <path d="M9 15 5 11l2-4 4 4" />
      <path d="M15 9 9 3l4-2c3.5 1 6 3.5 7 7l-2 4Z" />
      <path d="M14 4.5 19.5 10" />
    </IconBase>
  );
}

function FlaskConical(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M10 2v6L4.5 18.5A2 2 0 0 0 6.3 22h11.4a2 2 0 0 0 1.8-3.5L14 8V2" />
      <path d="M8 2h8" />
      <path d="M7 16h10" />
    </IconBase>
  );
}

function ClipboardList(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 2h6a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v15H4V7a2 2 0 0 1 2-2h1V4a2 2 0 0 1 2-2Z" />
      <path d="M9 5h6" />
      <path d="M8 12h.01" />
      <path d="M11 12h5" />
      <path d="M8 16h.01" />
      <path d="M11 16h5" />
    </IconBase>
  );
}

function Lock(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </IconBase>
  );
}

function Plus(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

const VIEWS = [
  { id: "landing", code: "00", label: "랜딩" },
  { id: "input", code: "01", label: "아이디어 입력" },
  { id: "diagnosis", code: "02", label: "진단" },
  { id: "roadmap", code: "03", label: "로드맵" },
  { id: "step", code: "04", label: "단계 상세" },
  { id: "docs", code: "05", label: "산출물" },
];

/* ------------------------------------------------------------------ */
/* 공통 프리미티브                                                      */
/* ------------------------------------------------------------------ */

/* 로고 마크 — 업로드된 앱 아이콘(노드 그래프, 인디고→바이올렛 그라데이션) 재현 */
function BrandMark({ size = 28, tile = true }: { size?: number; tile?: boolean }) {
  return (
      <Image src="/logo.svg" alt="B Essential" width={130} height={22} priority />
  );
}

/* 잠금(페이월) 래퍼 — 무료 상태에서 콘텐츠를 흐리게 가리고 결제 CTA를 띄움 */
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
          <button
            onClick={onUnlock}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: ACCENT_GRAD }}
          >
            결제하고 전체 보기
            <ArrowRight size={15} />
          </button>
          <div className="mt-2">
            <Mono className="text-neutral-400" style={{ fontSize: "10px" }}>
              아이디어 1건 · ₩— (가격 미정)
            </Mono>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mono({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`font-mono-data ${className}`} style={style}>
      {children}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono-data uppercase text-neutral-400"
      style={{ fontSize: "11px", letterSpacing: "0.18em" }}
    >
      {children}
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-neutral-600">{label}</span>
        <Mono className="text-neutral-500" style={{ fontSize: "12px" }}>
          {value}
        </Mono>
      </div>
      <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: ACCENT }}
        />
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
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={ACCENT}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="57" textAnchor="middle" fontSize="30" fontWeight="700" fill="#0A0A0A">
        {value}
      </text>
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fontSize="9"
        letterSpacing="2"
        fill="#9A9AA0"
        className="font-mono-data"
      >
        SCORE
      </text>
    </svg>
  );
}

function Flag({ children = "확인 필요" }: { children?: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-0.5 font-mono-data"
      style={{ fontSize: "10px", letterSpacing: "0.05em", borderColor: "#E2C9A0", color: "#8A6A2F", background: "#FBF5EA" }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, full = false }: { children: React.ReactNode; onClick?: () => void; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-colors ${
        full ? "w-full" : ""
      }`}
      style={{ background: "#0A0A0A" }}
    >
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function GhostButton({ children, onClick, full = false }: { children: React.ReactNode; onClick?: () => void; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}

function DemoNav({ view, setView, paid, setPaid }: { view: string; setView: (v: string) => void; paid: boolean; setPaid: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 sm:px-8">
        <button
          onClick={() => setView("landing")}
          className="flex items-center gap-2"
          aria-label="홈으로"
        >
          <BrandMark size={20} tile={false} />
        </button>

        {/* 데모용 무료/결제 상태 토글 */}
        <div className="ml-1 hidden items-center gap-1 rounded-full border border-neutral-200 bg-white p-0.5 sm:flex">
          <button
            onClick={() => setPaid(false)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${!paid ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"}`}
          >
            무료
          </button>
          <button
            onClick={() => setPaid(true)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${paid ? "text-white" : "text-neutral-500 hover:text-neutral-900"}`}
            style={paid ? { background: ACCENT_GRAD } : {}}
          >
            결제 후
          </button>
        </div>

        <nav className="ml-auto flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {VIEWS.map((v) => {
            const active = view === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                  active ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
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

function Landing({ onStart, onDemo }: { onStart: () => void; onDemo: () => void }) {
  return (
    <div>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pt-24">
        <Eyebrow>IDEA → COMPANY · 사업화 로드맵</Eyebrow>
        <h1
          className="mt-5 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          아이디어 한 줄을 넣으면,
          <br />
          진단부터 법인 설립까지
          <br />
          <span style={{ color: ACCENT }}>할 일을 순서대로</span> 정리해 드립니다.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          사업성 진단, 단계별 실행 로드맵, 법인·사업자 등록 가이드, 정부지원사업 매칭까지 — 흩어진 정보를
          ‘내 아이디어에 맞는 순서’로 다시 정리합니다.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PrimaryButton onClick={onStart}>내 아이디어 진단하기</PrimaryButton>
          <GhostButton onClick={onDemo}>데모 둘러보기</GhostButton>
        </div>
        <p className="mt-4 text-sm text-neutral-400">무료로 요약·강점까지 미리보기 · 전체 결과는 아이디어 1건 결제 · 구독 아님</p>

        {/* 시그니처: 로드맵 레일 */}
        <div className="mt-12 rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <Mono className="text-neutral-400" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
              ROADMAP PREVIEW
            </Mono>
            <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>
              P0 — P5
            </Mono>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {PHASES.map((p, i) => (
              <div
                key={p.code}
                className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-lg border border-neutral-200 px-4 py-3"
                style={i === 0 ? { borderColor: ACCENT, background: ACCENT_SOFT } : {}}
              >
                <Mono
                  style={{ fontSize: "12px", color: i === 0 ? ACCENT : "#9A9AA0" }}
                >
                  {p.code}
                </Mono>
                <div className="text-sm font-semibold leading-snug text-neutral-900">{p.title}</div>
                <Mono className="text-neutral-400" style={{ fontSize: "10px" }}>
                  {p.steps} STEPS
                </Mono>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
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

      {/* MODULES */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <Eyebrow>WHAT YOU GET</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-neutral-900">
            아이디어를 ‘실행 가능한 계획’으로 바꾸는 6가지
          </h2>
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

      {/* PRICING — 아이디어 1건당 결제 */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <Eyebrow>PRICING · 아이디어 1건당 결제 (가격 미정)</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">구독이 아니라, 아이디어 하나에 결제</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
            무료로는 아이디어 요약과 강점, 사업성 점수까지 미리 볼 수 있습니다. 리스크·검증 가정·단계별 실행 로드맵·법인/행정
            가이드·산출물은 <strong className="font-semibold text-neutral-900">해당 아이디어 1건을 결제</strong>하면 전부 열립니다.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <PlanCard
              name="무료 미리보기"
              price="₩0"
              note="이 아이디어, 시작할 가치가 있는지부터"
              features={[
                "아이디어 구조화 요약 (문제·고객·솔루션·수익)",
                "강점 미리보기",
                "사업성 점수 공개",
                "리스크·로드맵·산출물은 잠김",
              ]}
            />
            <PlanCard
              name="아이디어 1건"
              price="₩—"
              note="이 아이디어를 끝까지 — 단건 결제"
              highlight
              features={[
                "전체 진단 (리스크 · 검증할 핵심 가정 포함)",
                "단계별 실행 로드맵 P0–P5 전체",
                "법인 · 행정 셋업 가이드 + 산출물 생성",
                "진척 관리 · 리마인더",
              ]}
            />
            <PlanCard
              name="묶음 크레딧"
              price="₩—"
              note="여러 아이디어를 견줘볼 때"
              features={[
                "여러 건 분석 시 건당 단가 절감",
                "아이디어 간 비교",
                "팀 공유",
                "크레딧 소진형 (구독 아님)",
              ]}
            />
          </div>

          {/* 기관/팀 — 슬림 바 */}
          <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:flex-row sm:items-center">
            <div>
              <div className="text-base font-semibold text-neutral-900">기관 · 팀 (화이트라벨)</div>
              <p className="mt-1 text-sm text-neutral-600">대학 창업지원단 · 액셀러레이터 · 지자체 — 다수 팀 일괄, 운영 대시보드, 전문가 연결.</p>
            </div>
            <GhostButton onClick={onStart}>도입 문의</GhostButton>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-neutral-400">
            가격은 시장 검증 전이라 미정입니다(₩— 로 표기). 단가·크레딧 구성은 사용자 결제 의향 확인 후 확정 예정입니다.
          </p>
        </div>
      </section>

      {/* DISCLAIMER / FOOTER */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="rounded-lg border border-neutral-200 bg-neutral-100/60 p-5">
            <Mono className="text-neutral-500" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
              DISCLAIMER
            </Mono>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
              본 서비스는 일반적인 정보와 실행 가이드를 제공하며, 법률·세무·노무 자문이 아닙니다. 법인 설립 절차·비용·세금,
              정부지원사업의 요건·금액·일정은 시점에 따라 달라질 수 있어, 진행 전 공식 공고와 전문가(법무사·세무사 등) 확인이
              필요합니다.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BrandMark size={20} />
            </span>
            <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>
              © 2026 · DESIGN PROTOTYPE
            </Mono>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PlanCard({ name, price, note, features, highlight }: { name: string; price: string; note: string; features: string[]; highlight?: boolean }) {
  return (
    <div
      className="flex flex-col rounded-xl border bg-white p-6"
      style={highlight ? { borderColor: "#0A0A0A", boxShadow: "0 1px 0 #0A0A0A" } : { borderColor: "#E5E5E5" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-neutral-900">{name}</span>
        {highlight && (
          <Mono
            className="rounded-full px-2 py-0.5 text-white"
            style={{ fontSize: "10px", background: ACCENT, letterSpacing: "0.05em" }}
          >
            추천
          </Mono>
        )}
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
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <Eyebrow>STEP 01 · 아이디어 입력</Eyebrow>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900">어떤 아이디어인가요?</h1>
      <p className="mt-3 text-base text-neutral-600">한 문장이면 충분합니다. 아래 질문에 답할수록 진단이 정확해집니다.</p>

      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-neutral-700">아이디어 한 문장</label>
        <textarea
          rows={3}
          defaultValue="경도인지장애 부모를 둔 보호자를 위해, 보호자 목소리로 AI가 매일 안부 전화를 걸어 복약·식사·컨디션을 확인하고 보호자 앱에 기록·알림해 주는 서비스"
          className="w-full resize-none rounded-lg border border-neutral-300 bg-white p-4 text-base leading-relaxed text-neutral-900 focus:border-neutral-900"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {["동네 기반 중고거래", "1인 식당 예약·웨이팅", "반려동물 건강 기록"].map((c) => (
            <button
              key={c}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
            >
              + {c}
            </button>
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
                <Mono className="text-neutral-300" style={{ fontSize: "11px" }}>
                  Q{i + 1}
                </Mono>
                {f.q}
              </label>
              <input
                placeholder={f.ph}
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={onSubmit} full>
          진단 시작
        </PrimaryButton>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
          <Lock size={12} /> 입력 내용은 로드맵 생성에만 사용됩니다.
        </p>
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
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <Eyebrow>STEP 02 · 진단 결과</Eyebrow>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">
        보호자 목소리 기반 AI 안부 전화 서비스
      </h1>

      {/* 구조화 */}
      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
        {STRUCT.map((s) => (
          <div key={s.k} className="bg-white p-5">
            <Mono style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.08em" }}>{s.k.toUpperCase()}</Mono>
            <div className="mt-1 text-sm font-semibold text-neutral-900">{s.k}</div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.v}</p>
          </div>
        ))}
      </div>

      {/* 점수 */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-neutral-900">사업성 진단</div>
          <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>
            추정 · 참고용
          </Mono>
        </div>
        <div className="mt-5 flex flex-col items-center gap-8 sm:flex-row">
          <ScoreRing value={72} />
          <div className="grid w-full flex-1 gap-4 sm:grid-cols-2">
            {SCORES.map((s) => (
              <Bar key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        </div>
      </div>

      {/* 강점(무료 공개) / 리스크·가정(잠금) */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <InsightCol
          title="강점"
          tone="pos"
          items={[
            "고령자가 ‘앱 학습’ 없이 전화만 받으면 되는 낮은 사용 장벽",
            "보호자 목소리 사용으로 수용성·정서적 안정 차별화",
            "응답 구조화·추세 데이터가 단순 안부전화 대비 분명한 자산",
          ]}
        />
        <div className="lg:col-span-2">
          <Locked
            locked={!paid}
            title="리스크와 검증할 핵심 가정은 결제 후 공개"
            sub="강점은 무료로 보여드립니다. 정작 중요한 ‘무엇을 조심하고 무엇부터 검증할지’는 전체 진단에 포함됩니다."
            onUnlock={onUnlock}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <InsightCol
                title="주의 · 리스크"
                tone="warn"
                items={[
                  "의료기기·진단으로 오인되지 않도록 포지셔닝/표현 관리 필요",
                  "개인정보·민감정보(건강) 처리에 대한 법적 요건",
                  "전화 응답률·지속 사용(리텐션)이 핵심 불확실성",
                ]}
              />
              <InsightCol
                title="검증할 핵심 가정"
                tone="neutral"
                items={[
                  "보호자가 ‘월 구독료’를 지불할 의향이 있는가",
                  "부모가 AI 전화에 꾸준히 응답하는가 (2–4주 관찰)",
                  "구조화 리포트가 보호자의 행동(병원·돌봄)을 바꾸는가",
                ]}
              />
            </div>
          </Locked>
        </div>
      </div>

      {paid ? (
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <PrimaryButton onClick={onRoadmap}>이 진단으로 로드맵 만들기</PrimaryButton>
          <p className="text-xs leading-relaxed text-neutral-400">
            점수·평가는 입력 기반 추정으로 참고용입니다. 시장 규모·재무 수치는 별도 검증이 필요합니다.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between" style={{ background: ACCENT_SOFT }}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                <Lock size={18} style={{ color: ACCENT }} />
              </div>
              <div>
                <div className="text-base font-semibold text-neutral-900">전체 진단 + 단계별 로드맵 열기</div>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">
                  리스크·검증할 가정, P0–P5 실행 로드맵, 법인·행정 가이드, 산출물 생성까지 — 이 아이디어 1건을 결제하면
                  전부 열립니다.
                </p>
              </div>
            </div>
            <button
              onClick={onUnlock}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: ACCENT_GRAD }}
            >
              결제하고 전체 보기
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="flex items-center justify-between px-6 py-3">
            <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>
              아이디어 1건 · ₩— (가격 미정) · 구독 아님
            </Mono>
            <span className="text-xs text-neutral-400">점수·강점은 무료 공개</span>
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
  { code: "P4", title: "자금 · 지원사업", steps: 5, status: "later", progress: 0, icon: Banknote },
  { code: "P5", title: "팀 · 스케일", steps: 4, status: "later", progress: 0, icon: Users },
];

const NEXT_ACTIONS = [
  { phase: "P0", t: "잠재 고객(보호자) 5명 인터뷰", meta: "구독 의향·현재 해결 방식 확인" },
  { phase: "P0", t: "린 캔버스 작성·검토", meta: "핵심 가정 3개 명시" },
  { phase: "P1", t: "개인사업자 vs 법인 결정", meta: "투자·B2B 계획에 따라 분기" },
];

function statusLabel(s: string) {
  return s === "active" ? "진행 중" : s === "next" ? "다음" : "예정";
}

function Roadmap({ onStep, paid, onUnlock }: { onStep: () => void; paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <Eyebrow>STEP 03 · 사업화 로드맵</Eyebrow>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          보호자 목소리 기반 AI 안부 전화 서비스
        </h1>
        <div className="text-right">
          <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>
            전체 진행률
          </Mono>
          <div className="text-2xl font-bold" style={{ color: ACCENT }}>
            18%
          </div>
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: "18%", background: ACCENT }} />
      </div>

      {/* 지금 할 일 (무료: 잠금) */}
      <div className="mt-8">
      <Locked
        locked={!paid}
        title="‘지금 할 일’은 결제 후 공개"
        sub="아이디어마다 다음에 해야 할 구체적인 액션을 우선순위로 제시합니다. 전체 로드맵은 1건 결제로 열립니다."
        onUnlock={onUnlock}
      >
      <div className="rounded-xl border bg-white p-5" style={{ borderColor: ACCENT }}>
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
          <span className="text-sm font-semibold text-neutral-900">지금 할 일</span>
        </div>
        <div className="space-y-2.5">
          {NEXT_ACTIONS.map((a, i) => (
            <button
              key={i}
              onClick={onStep}
              className="flex w-full items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-left transition-colors hover:border-neutral-900"
            >
              <Circle size={16} className="shrink-0 text-neutral-300" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-neutral-900">{a.t}</div>
                <div className="text-xs text-neutral-500">{a.meta}</div>
              </div>
              <Mono className="text-neutral-300" style={{ fontSize: "10px" }}>
                {a.phase}
              </Mono>
              <ChevronRight size={16} className="shrink-0 text-neutral-300" />
            </button>
          ))}
        </div>
      </div>
      </Locked>
      </div>

      {/* 단계 목록 */}
      <div className="mt-8">
        <Mono className="text-neutral-400" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
          PHASES
        </Mono>
        <div className="mt-3 space-y-2.5">
          {ROADMAP.map((p) => {
            const Icon = p.icon;
            const active = p.status === "active";
            return (
              <button
                key={p.code}
                onClick={() => (paid ? onStep() : onUnlock())}
                className="group flex w-full items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-neutral-900"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={active ? { background: ACCENT_SOFT } : { background: "#F4F4F5" }}
                >
                  <Icon size={18} style={{ color: active ? ACCENT : "#525252" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>
                      {p.code}
                    </Mono>
                    <span className="text-base font-semibold text-neutral-900">{p.title}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1 w-28 rounded-full bg-neutral-200 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: ACCENT }} />
                    </div>
                    <Mono className="text-neutral-400" style={{ fontSize: "10px" }}>
                      {p.steps} STEPS
                    </Mono>
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
                  style={
                    active
                      ? { background: ACCENT, color: "#fff" }
                      : p.status === "next"
                      ? { background: "#111", color: "#fff" }
                      : { background: "#F4F4F5", color: "#737373" }
                  }
                >
                  {statusLabel(p.status)}
                </span>
                {paid ? (
                  <ChevronRight size={18} className="shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5" />
                ) : (
                  <Lock size={15} className="shrink-0 text-neutral-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · 단계 상세 (법인 설립)                                           */
/* ------------------------------------------------------------------ */

const CHECKLIST = [
  {
    t: "상호 · 사업목적 · 본점 소재지 결정",
    d: "같은 관할에 동일 상호는 불가(인터넷등기소에서 사전 검색). 사업목적은 향후 확장을 고려해 여유 있게 기재.",
    done: true,
  },
  {
    t: "본점 소재지 영향 확인",
    d: "과밀억제권역(서울 등 일부)이면 등록면허세가 중과될 수 있음.",
    done: false,
    flag: true,
  },
  {
    t: "자본금 · 액면가 결정",
    d: "법정 최저자본금은 없어 소액도 가능. 단 업종별 요건과 대외 신뢰를 함께 고려.",
    done: false,
    flag: true,
  },
  {
    t: "정관 작성",
    d: "상호·목적·자본금·발행주식·임원 등을 기재하고 발기인이 서명·날인.",
    done: false,
  },
  {
    t: "(해당 시) 조사보고자 / 공증",
    d: "지분 없는 임원을 조사보고자로 두면 공증 비용을 아낄 수 있는 경우가 있음(사안별 상이).",
    done: false,
    flag: true,
  },
  {
    t: "자본금 납입 · 잔고증명",
    d: "발기인 개인계좌에 자본금을 납입하고 잔고증명서를 발급.",
    done: false,
  },
  {
    t: "설립등기 신청",
    d: "관할 등기소 또는 인터넷등기소(전자등기)로 신청. 처리에 영업일 며칠 소요.",
    done: false,
  },
  {
    t: "법인 사업자등록",
    d: "설립등기 후 홈택스 또는 세무서에서 법인 사업자등록(개시일 기준 기한 내).",
    done: false,
    flag: true,
  },
  {
    t: "법인 통장 · 4대보험 · 기장",
    d: "법인계좌 개설, 4대보험 가입, 세무 기장(대행 포함) 정리.",
    done: false,
  },
];

const SUPPORT = [
  { t: "예비창업패키지", d: "사업자등록·법인 대표권이 아직 없는 ‘예비창업자’ 대상. 즉, 설립 전에 신청하는 트랙." },
  { t: "초기창업패키지", d: "업력 3년 이내 초기 기업 대상(사업화 자금·프로그램)." },
  { t: "창업도약패키지", d: "그 이후 성장 단계(예: 일반 3~7년, 딥테크 별도). K-Startup·기업마당 공고 확인." },
];

function StepDetail({ onBack, paid, onUnlock }: { onBack: () => void; paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={onBack} className="text-neutral-500 hover:text-neutral-900">
          로드맵
        </button>
        <ChevronRight size={14} className="text-neutral-300" />
        <span className="text-neutral-500">P1 사업 형태 · 행정 셋업</span>
        <ChevronRight size={14} className="text-neutral-300" />
        <span className="font-medium text-neutral-900">법인 설립하기</span>
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-neutral-900">법인 설립하기</h1>

      {/* meta chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <MetaChip label="예상 소요" value="준비 포함 1–2주" />
        <MetaChip label="난이도" value="중" />
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600">
          예상 비용 <Flag />
        </span>
      </div>

      {/* 본문 (무료: 잠금) */}
      <Locked
        locked={!paid}
        pinTop
        title="이 단계 가이드는 결제 후 공개"
        sub="개인 vs 법인 비교, 단계별 체크리스트, 산출물 생성, 관련 지원사업까지 — 아이디어 1건 결제로 열립니다."
        onUnlock={onUnlock}
      >
      {/* 왜 지금 */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
        <Mono style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.08em" }}>WHY NOW</Mono>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          투자 유치, B2B 거래, 일정 규모 이상의 매출이 예상된다면 법인이 유리할 수 있습니다. 다만 초기 비용·행정 부담이 있어,
          <strong className="font-semibold text-neutral-900"> 개인사업자로 먼저 시작</strong>하는 선택지도 함께 검토하세요.
        </p>
      </div>

      {/* 의사결정 미니표 */}
      <div className="mt-6">
        <div className="mb-3 text-sm font-semibold text-neutral-900">개인사업자 vs 법인 — 빠른 비교</div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-100 text-left">
                <th className="px-4 py-3 font-medium text-neutral-500" style={{ width: "34%" }}>
                  기준
                </th>
                <th className="px-4 py-3 font-medium text-neutral-900">개인사업자</th>
                <th className="px-4 py-3 font-medium text-neutral-900">법인</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["설립 난이도·비용", "낮음 (등록만)", "상대적으로 높음 (등기 등)"],
                ["투자 유치", "어려움", "유리 (지분 구조)"],
                ["대외 신뢰·B2B 거래", "보통", "유리"],
                ["세금 구조", "종합소득세", "법인세 + 대표 급여/배당"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 text-neutral-600">{r[0]}</td>
                  <td className="px-4 py-3 text-neutral-800">{r[1]}</td>
                  <td className="px-4 py-3 text-neutral-800">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-neutral-400">세부 세금·요건은 세무사 확인이 필요합니다.</p>
      </div>

      {/* 체크리스트 */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-neutral-900">체크리스트 (주식회사 기준)</div>
          <Mono className="text-neutral-400" style={{ fontSize: "11px" }}>
            1 / {CHECKLIST.length} 완료
          </Mono>
        </div>
        <div className="space-y-2">
          {CHECKLIST.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4"
            >
              <div
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border"
                style={
                  c.done
                    ? { background: ACCENT, borderColor: ACCENT }
                    : { borderColor: "#D4D4D8", background: "#fff" }
                }
              >
                {c.done && <Check size={13} className="text-white" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-sm font-medium ${c.done ? "text-neutral-400 line-through" : "text-neutral-900"}`}
                  >
                    {i + 1}. {c.t}
                  </span>
                  {c.flag && <Flag />}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 산출물 */}
      <div className="mt-8">
        <div className="mb-3 text-sm font-semibold text-neutral-900">이 단계에서 만들 수 있는 산출물</div>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {["정관 초안 생성", "설립 준비물 체크리스트 PDF", "개인 vs 법인 비교표 저장"].map((d) => (
            <button
              key={d}
              className="flex items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900"
            >
              {d}
              <Plus size={15} className="text-neutral-400" />
            </button>
          ))}
        </div>
      </div>

      {/* 관련 지원사업 */}
      <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-100/50 p-5">
        <div className="flex items-center gap-2">
          <Banknote size={16} className="text-neutral-700" />
          <span className="text-sm font-semibold text-neutral-900">관련 정부지원사업</span>
        </div>
        <p className="mt-2 text-sm text-neutral-600">
          설립 <strong className="font-semibold text-neutral-900">시점</strong>이 자격에 영향을 줍니다. 예) 예비창업패키지는
          ‘아직 창업하지 않은’ 사람이 대상이므로, 설립 전에 확인하는 것이 좋습니다.
        </p>
        <div className="mt-4 space-y-2.5">
          {SUPPORT.map((s) => (
            <div key={s.t} className="flex items-start gap-2.5 text-sm">
              <ChevronRight size={15} className="mt-0.5 shrink-0 text-neutral-300" />
              <span>
                <span className="font-medium text-neutral-900">{s.t}</span>
                <span className="text-neutral-600"> — {s.d}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
          <Flag>매년 변동</Flag> 공고·요건·금액·일정은 K-Startup(k-startup.go.kr)·기업마당에서 확인하세요.
        </p>
      </div>
      </Locked>

      {/* disclaimer */}
      <div className="mt-6 rounded-lg border-l-2 bg-neutral-50 p-4" style={{ borderColor: "#C2410C" }}>
        <p className="text-sm leading-relaxed text-neutral-600">
          <strong className="font-semibold text-neutral-800">참고용 일반 정보입니다 — 법률·세무 자문이 아닙니다.</strong>{" "}
          절차·비용·세금·요건은 사안과 시점에 따라 달라질 수 있습니다. 진행 전 법무사·세무사 등 전문가와 최신 공고를 확인하세요.
        </p>
      </div>

      <div className="mt-8">
        <GhostButton onClick={onBack}>
          <ChevronRight size={16} className="rotate-180" />
          로드맵으로 돌아가기
        </GhostButton>
      </div>
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600">
      <span className="text-neutral-400">{label}</span>
      <span className="font-medium text-neutral-900">{value}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · 산출물                                                          */
/* ------------------------------------------------------------------ */

const DOCS = [
  { t: "진단 리포트", icon: Target, status: "done", meta: "방금 전" },
  { t: "린 캔버스", icon: ClipboardList, status: "done", meta: "어제" },
  { t: "고객 인터뷰 가이드", icon: Users, status: "done", meta: "3일 전" },
  { t: "정관 초안", icon: FileText, status: "todo" },
  { t: "설립 준비 체크리스트", icon: Building2, status: "todo" },
  { t: "IR 한 장", icon: Rocket, status: "todo" },
];

function Docs({ paid, onUnlock }: { paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <Eyebrow>STEP 05 · 산출물</Eyebrow>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">생성한 문서</h1>
      <p className="mt-2 text-sm text-neutral-600">로드맵 진행 중 만든 문서가 여기 모입니다. 결제 후 언제든 다시 생성·다운로드할 수 있습니다.</p>

      <Locked
        locked={!paid}
        pinTop
        title="산출물 생성·다운로드는 결제 후"
        sub="린 캔버스 · 정관 초안 · 준비물 체크리스트 · IR 한 장 등 실제 문서는 아이디어 1건 결제로 열립니다."
        onUnlock={onUnlock}
      >
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOCS.map((d) => {
          const Icon = d.icon;
          const done = d.status === "done";
          return (
            <div key={d.t} className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100">
                  <Icon size={18} className="text-neutral-700" />
                </div>
                <Mono
                  className="rounded-full px-2 py-0.5"
                  style={
                    done
                      ? { fontSize: "10px", color: ACCENT, background: ACCENT_SOFT }
                      : { fontSize: "10px", color: "#A1A1AA", background: "#F4F4F5" }
                  }
                >
                  {done ? "생성됨" : "미생성"}
                </Mono>
              </div>
              <div className="mt-4 text-base font-semibold text-neutral-900">{d.t}</div>
              <div className="mt-1 text-xs text-neutral-400">{done ? `마지막 수정 · ${d.meta}` : "아직 만들지 않았습니다"}</div>

              <div className="mt-5 flex gap-2">
                {done ? (
                  <>
                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-neutral-300 bg-white py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900">
                      보기
                    </button>
                    <button className="flex items-center justify-center rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-600 transition-colors hover:border-neutral-900">
                      <Download size={15} />
                    </button>
                  </>
                ) : (
                  <button
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-semibold text-white"
                    style={{ background: "#0A0A0A" }}
                  >
                    <Plus size={15} /> 생성하기
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </Locked>
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
      *:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; border-radius: 4px; }
      ::selection { background: ${ACCENT}; color: #fff; }
      @media (prefers-reduced-motion: reduce) {
        * { transition: none !important; animation: none !important; }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/* 루트                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [view, setView] = useState("landing");
  const [paid, setPaid] = useState(false);
  const unlock = () => setPaid(true);

  return (
    <div
      className="min-h-screen bg-neutral-50 text-neutral-900 antialiased"
      style={{ fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif" }}
    >
      <FontStyles />
      <DemoNav view={view} setView={setView} paid={paid} setPaid={setPaid} />
      <main>
        {view === "landing" && <Landing onStart={() => setView("input")} onDemo={() => setView("diagnosis")} />}
        {view === "input" && <IdeaInput onSubmit={() => setView("diagnosis")} />}
        {view === "diagnosis" && <Diagnosis onRoadmap={() => setView("roadmap")} paid={paid} onUnlock={unlock} />}
        {view === "roadmap" && <Roadmap onStep={() => setView("step")} paid={paid} onUnlock={unlock} />}
        {view === "step" && <StepDetail onBack={() => setView("roadmap")} paid={paid} onUnlock={unlock} />}
        {view === "docs" && <Docs paid={paid} onUnlock={unlock} />}
      </main>
    </div>
  );
}
