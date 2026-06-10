"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Activity, 
  Route, 
  Building2, 
  Landmark, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  Lock, 
  ChevronRight,
  ListChecks,
  ShieldAlert
} from "lucide-react";

const ACCENT_GRAD = "linear-gradient(135deg, #6366F1, #8B5CF6)";

const VIEWS = [
  { id: "landing", code: "00", label: "데모 메인" },
  { id: "input", code: "01", label: "아이디어 입력" },
  { id: "diagnosis", code: "02", label: "진단" },
  { id: "roadmap", code: "03", label: "로드맵" },
  { id: "step", code: "04", label: "단계 상세" },
  { id: "docs", code: "05", label: "산출물" },
];

const SAMPLE_INPUT = "경도인지장애 부모를 둔 보호자를 위해, 보호자 목소리로 AI가 매일 안부 전화를 걸어 복약·식사·컨디션을 확인하고 보호자 앱에 기록·알림해 주는 서비스";

const DIAG_AXES = [
  { label: "문제 정의·수요", score: 82 },
  { label: "솔루션 차별성", score: 68 },
  { label: "기술 실현성", score: 74 },
  { label: "규제·인허가", score: 58 },
  { label: "수익모델·단위경제", score: 70 },
  { label: "팀·실행력", score: 76 },
];

const DIAG_STRENGTHS = [
  { t: "명확하고 우상향하는 수요", d: "초고령사회·MCI 증가 + 비동거 돌봄 공백. 통증이 보편적이고 시간이 갈수록 커집니다." },
  { t: "임상 신뢰 자산", d: "세브란스 교수 자문 — 설계 타당성·기관 채널·투자 신뢰까지, 초기 팀이 갖기 어려운 출발점." },
  { t: "정서적 차별화 — 익숙한 목소리", d: "낯선 기계음이 아닌 보호자 본인 목소리. 응답률·지속률을 끌어올리는 정서적 훅." },
  { t: "다층 수익 경로", d: "B2C 구독 + 기관 B2B + 통신사 제휴 — 단일 채널 실패 시 대안 보유." },
];

const DIAG_RISKS = [
  { t: "의료기기·의료행위 경계", sev: "高", d: "‘확인·알림’이 의료 모니터링으로 해석될 위험 → 비의료 건강관리로 포지셔닝 + 식약처 분류·법무 검토." },
  { t: "건강 민감정보 처리", sev: "高", d: "당사자(MCI) 동의능력 이슈 → 보호자·대리 동의 구조 명시, 최소수집·암호화·파기 정책." },
  { t: "음성 합성 윤리·악용", sev: "중~高", d: "음성권·딥보이스 악용·인지 윤리 → 본인 인증 등록, AI 고지, 무단합성 방지." },
  { t: "AI 환각·오탐/미탐", sev: "高", d: "응급 자동판단 배제 + 사람(보호자) 확인 루프 강제, 119/보호자 연계." },
];

const ROADMAP = [
  { code: "P0", title: "아이디어 검증", goal: "돈 낼 보호자가 있는지 확인", todo: "보호자 10~15명 인터뷰 · 경쟁 5종 매핑 · 린 캔버스 · 미니 파일럿 협조자 모집" },
  { code: "P1", title: "사업형태·행정 셋업", goal: "법적 실체 + 규제 포지셔닝", todo: "개인 vs 법인 결정 · 설립등기 · 의료기기 경계 자가진단 · 개인정보·음성 동의 설계" },
  { code: "P2", title: "MVP / 프로토타입", goal: "핵심 케어콜 루프", todo: "‘1일 1회 통화→3항목 확인→요약→앱 기록→이상 알림’ 범위 고정 · 통화당 원가 계측" },
  { code: "P3", title: "초기 고객·검증", goal: "유료 보호자 20명", todo: "KPI(응답률·지속률·거짓경보율) 정의 · 유료 전환 테스트 · 임상 라벨링" },
];

const ADMIN_COMPARE = [
  { k: "대외 신뢰도", a: "낮음", b: "높음", note: "병원·기관·통신사 계약엔 법인 유리" },
  { k: "투자 유치", a: "어려움", b: "가능", note: "정부 R&D·지분 투자 고려 시 법인" },
  { k: "책임 범위", a: "무한책임", b: "유한책임", note: "건강데이터·케어 사고 리스크 분리" },
  { k: "설립 속도", a: "빠름", b: "상대적 느림", note: "초기 속도는 개인 유리" },
];

const ADMIN_REG = [
  "의료기기(SaMD) 해당 여부 — 비의료 건강관리로 한정, 식약처 분류 확인",
  "비의료 건강관리 가이드라인 — 허용·금지 행위에 맞춰 기능·문구 점검",
  "개인정보·민감정보 — 보호자·대리 동의 구조, 최소수집·암호화·파기",
  "음성 합성 — 본인 인증 등록·합성 동의, AI 고지 설계",
];

const ARTIFACTS = [
  { t: "진단 리포트", d: "구조화 요약 + 6축 점수 + 강점·리스크·검증 가정" },
  { t: "린 캔버스", d: "9블록 — 문제·고객·UVP·솔루션·채널·수익·비용·지표·강점" },
  { t: "개인 vs 법인 비교표", d: "신뢰도·투자·책임·세제 기준 의사결정 표" },
  { t: "보호자 인터뷰 가이드", d: "통증·대안·지불의사·음성 수용도 질문 세트" },
  { t: "IR 한 장", d: "문제→솔루션→시장→BM→트랙션→팀→Ask" },
  { t: "예창패 사업계획서 골격", d: "PSST 구조 초안 (서식·일정 확인 필요)" },
];

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-wider uppercase ${className}`}>{children}</span>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-indigo-600 font-semibold mb-3">{children}</div>;
}

function PrimaryButton({ children, onClick, full = false }: { children: React.ReactNode; onClick?: () => void; full?: boolean }) {
  return (
    <button onClick={onClick} className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 ${full ? "w-full" : ""}`}>
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function GhostButton({ children, onClick, full = false }: { children: React.ReactNode; onClick?: () => void; full?: boolean }) {
  return <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-900 ${full ? "w-full" : ""}`}>{children}</button>;
}

function Locked({ locked, title, children, pinTop = false, onUnlock }: { locked: boolean; title: string; children: React.ReactNode; pinTop?: boolean; onUnlock: () => void }) {
  if (!locked) return <>{children}</>;
  return (
    <div className="relative w-full h-full">
      <div className="pointer-events-none select-none opacity-40 blur-[5px] overflow-hidden" aria-hidden="true">
        {children}
      </div>
      <div className={`absolute inset-0 flex justify-center p-4 z-10 ${pinTop ? "items-start pt-8" : "items-center"}`}>
        <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white/95 p-5 text-center shadow-lg backdrop-blur-sm">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-3">
            <Lock size={18} />
          </div>
          <div className="text-sm font-bold text-neutral-900">{title}</div>
          <button onClick={onUnlock} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5" style={{ background: ACCENT_GRAD }}>
            결제하고 전체 보기
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DemoNav({ view, setView, paid, setPaid }: { view: string; setView: (v: string) => void; paid: boolean; setPaid: (v: boolean) => void }) {
  return (
<header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 sm:px-8 h-14">
        <Link 
          href="/" 
          className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
          aria-label="B Essential 공식 홈페이지로 이동"
        >
          <Image src="/logo.svg" alt="B Essential" width={120} height={20} priority />
        </Link>
        <div className="ml-2 hidden items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-0.5 sm:flex">
          <button onClick={() => setPaid(false)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${!paid ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"}`}>무료 미리보기</button>
          <button onClick={() => setPaid(true)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${paid ? "text-white" : "text-neutral-500 hover:text-neutral-900"}`} style={paid ? { background: ACCENT_GRAD } : {}}>결제 후 뷰</button>
        </div>
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {VIEWS.map((v) => {
            const active = view === v.id;
            return (
              <button key={v.id} onClick={() => setView(v.id)} className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 transition-colors ${active ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"}`}>
                <Mono className={`text-[10px] ${active ? "text-indigo-200" : "text-neutral-400"}`}>{v.code}</Mono>
                <span className="text-xs font-bold">{v.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function DemoMainDashboard({ onStart, onDemo }: { onStart: () => void; onDemo: () => void }) {
  return (
    <div className="h-[calc(100vh-56px)] w-full flex flex-col justify-center items-center px-5 sm:px-8 select-none bg-neutral-50 overflow-y-auto">
      <div className="max-w-xl w-full text-center bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-sm">
        <Eyebrow>B ESSENTIAL DEMO SANDBOX</Eyebrow>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 mt-2">
          사업화 시뮬레이터 데모 환경
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-500">
          마케팅 영역을 제외한 순수 프로토타입 검증 공간입니다. 새 아이디어를 직접 타이핑해 진단하거나 준비된 가상 빌드를 즉시 열어볼 수 있습니다.
        </p>

        <div className="mt-8 flex flex-col gap-3 w-full">
          <button onClick={onStart} className="w-full flex items-center justify-between gap-2 rounded-xl bg-neutral-900 px-5 py-4 text-sm font-bold text-white shadow-md hover:bg-neutral-800 transition-all group">
            <span>🚀 내 아이디어 직접 진단해보기</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <button onClick={onDemo} className="w-full flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-bold text-neutral-800 hover:bg-neutral-100 transition-all group">
            <span>📊 미리 빌드된 의료 AI 콜 서비스 진단 보기</span>
            <ChevronRight size={16} className="text-neutral-400 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
          <span>상태: 샌드박스 인프라 정상 작동 중</span>
          <Mono>© 2026 B ESSENTIAL</Mono>
        </div>
      </div>
    </div>
  );
}

function IdeaInput({ onSubmit }: { onSubmit: () => void }) {
  const followups = [
    { q: "누구의 어떤 문제를 푸나요?", ph: "예) 경도인지장애 부모를 둔 보호자가 부모 상태를 매일 확인하기 어렵다" },
    { q: "지금은 그 문제를 어떻게 해결하고 있나요?", ph: "예) 직접 전화/방문, 단순 안부전화 — 기록·추세 파악이 안 됨" },
    { q: "어떻게 돈을 벌 계획인가요?", ph: "예) 보호자 월 구독, 기관 B2B, 통신사 제휴" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 h-[calc(100vh-56px)] overflow-y-auto">
      <Eyebrow>STEP 01 · 아이디어 입력</Eyebrow>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900">어떤 아이디어인가요?</h1>

      <div className="mt-6">
        <label className="mb-2 block text-xs font-bold text-neutral-600">아이디어 한 문장 요약</label>
        <textarea rows={3} defaultValue={SAMPLE_INPUT} className="w-full resize-none rounded-xl border border-neutral-300 p-4 text-sm leading-relaxed text-neutral-900 focus:border-neutral-900 focus:outline-none" />
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="mb-4 text-xs font-bold text-indigo-600 tracking-wide">AI 심층 후속 질문 (정밀 진단용)</div>
        <div className="space-y-4">
          {followups.map((f, i) => (
            <div key={i}>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700">Q{i + 1}. {f.q}</label>
              <input placeholder={f.ph} className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={onSubmit} full>진단 및 비즈니스 매핑 시작</PrimaryButton>
      </div>
    </div>
  );
}

function Diagnosis({ onRoadmap, paid, onUnlock }: { onRoadmap: () => void; paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 h-[calc(100vh-56px)] overflow-y-auto">
      <Eyebrow>STEP 02 · AI 종합 비즈니스 진단</Eyebrow>
      <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-200 text-xs text-neutral-700 mb-6 font-medium">
        <span className="font-bold text-indigo-600">[대상 아이디어] </span>{SAMPLE_INPUT}
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-center border border-neutral-200 rounded-2xl bg-white p-6 shadow-sm mb-6">
        <div className="text-center md:border-r border-neutral-200 py-2">
          <div className="text-5xl font-black text-indigo-600">72<span className="text-sm font-normal text-neutral-400"> / 100</span></div>
          <div className="text-[11px] text-neutral-400 font-bold mt-2">창업초기 종합 지수</div>
        </div>
        <div className="md:col-span-2 space-y-2">
          {DIAG_AXES.map((a) => (
            <div key={a.label} className="grid grid-cols-4 items-center gap-2 text-xs">
              <span className="text-neutral-600 font-medium">{a.label}</span>
              <div className="col-span-2 h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${a.score}%` }} />
              </div>
              <span className="text-right font-mono font-bold text-neutral-900">{a.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="text-xs font-bold text-emerald-600 mb-3 flex items-center gap-1">✨ 무료 공개 강점지표</div>
          <ul className="space-y-3 text-xs">
            {DIAG_STRENGTHS.map((s) => (
              <li key={s.t}>
                <div className="font-bold text-neutral-900">{s.t}</div>
                <p className="text-neutral-500 mt-1 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="text-xs font-bold text-indigo-600 mb-3 flex items-center gap-1">🔒 크리티컬 리스크 & 완화 장치</div>
          <Locked locked={!paid} title="핵심 위험 요소 및 법무 조치사항 잠김" onUnlock={onUnlock}>
            <ul className="space-y-3 text-xs">
              {DIAG_RISKS.map((r) => (
                <li key={r.t} className="border-b border-neutral-50 pb-2 last:border-none">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    {r.t} <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-200">{r.sev}</span>
                  </div>
                  <p className="text-neutral-500 mt-1 leading-relaxed">{r.d}</p>
                </li>
              ))}
            </ul>
          </Locked>
        </div>
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={onRoadmap} full>이 진단을 기반으로 맞춤 로드맵 생성</PrimaryButton>
      </div>
    </div>
  );
}

function Roadmap({ onStep, paid, onUnlock }: { onStep: () => void; paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 h-[calc(100vh-56px)] overflow-y-auto">
      <Eyebrow>STEP 03 · 6단계 맞춤 마일스톤</Eyebrow>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">MCI 케어콜 비즈니스 액션 플랜</h1>

      <div className="space-y-3">
        {ROADMAP.map((r) => (
          <div key={r.code} className="border border-neutral-200 rounded-xl bg-white p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md shrink-0">{r.code}</span>
              <div>
                <div className="text-sm font-bold text-neutral-900">{r.title}</div>
                <div className="text-xs text-neutral-500 mt-1"><span className="font-semibold text-neutral-700">목표:</span> {r.goal}</div>
              </div>
            </div>
            <div className="w-full md:w-auto shrink-0">
              <Locked locked={!paid} title="세부 할일 락" onUnlock={onUnlock}>
                <button onClick={onStep} className="text-xs font-bold text-indigo-600 flex items-center gap-1 border border-indigo-200 bg-indigo-50/50 px-3 py-2 rounded-lg hover:bg-indigo-50">
                  <ListChecks size={14} /> 상세 태스크 및 가이드 보기
                </button>
              </Locked>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepDetail({ onBack, paid, onUnlock }: { onBack: () => void; paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 h-[calc(100vh-56px)] overflow-y-auto">
      <button onClick={onBack} className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-3 block">← 로드맵 리스트로 돌아가기</button>
      <Eyebrow>STEP 04 · 최적 사업형태 설계 및 인허가 가이드</Eyebrow>
      
      <div className="border border-neutral-200 rounded-2xl bg-white overflow-hidden shadow-sm mb-6">
        <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 font-mono text-xs font-bold text-neutral-600">개인사업자 vs 법인 실체 비교 인프라</div>
        <div className="divide-y divide-neutral-100 text-xs">
          {ADMIN_COMPARE.map((c) => (
            <div key={c.k} className="p-4 grid grid-cols-4 gap-2">
              <span className="font-bold text-neutral-900">{c.k}</span>
              <span className="text-neutral-600">개인: {c.a}</span>
              <span className="text-indigo-600 font-medium">법인: {c.b}</span>
              <span className="text-neutral-400 text-right text-[11px]">{c.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-neutral-200 rounded-2xl bg-white p-5">
        <div className="text-xs font-bold text-neutral-900 flex items-center gap-1 mb-3">
          <ShieldAlert size={15} className="text-indigo-500" /> 도메인 특화 규제 필터링 시스템
        </div>
        <Locked locked={!paid} title="행정 법률 가이드라인 잠김" onUnlock={onUnlock} pinTop>
          <ul className="space-y-2.5 text-xs">
            {ADMIN_REG.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-neutral-600">
                <Check size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Locked>
      </div>
    </div>
  );
}

function Docs({ paid, onUnlock }: { paid: boolean; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 h-[calc(100vh-56px)] overflow-y-auto">
      <Eyebrow>STEP 05 · 연계 산출물 엔진</Eyebrow>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">자동 생성 매핑 파일 인프라</h1>

      <Locked locked={!paid} title="문서 팩 내보내기 프레임워크 잠김" onUnlock={onUnlock} pinTop>
        <div className="grid sm:grid-cols-2 gap-4">
          {ARTIFACTS.map((a) => (
            <div key={a.t} className="border border-neutral-200 rounded-xl bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
              <FileText size={18} className="text-indigo-600 mb-2" />
              <div className="text-xs font-bold text-neutral-900">{a.t}</div>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
      </Locked>
    </div>
  );
}

function FontStyles() {
  return (
    <style>{`
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
      body { overflow: hidden; font-family: 'Pretendard', sans-serif; }
    `}</style>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  const [paid, setPaid] = useState(false);
  const unlock = () => setPaid(true);

  return (
    <div className="h-screen w-screen bg-neutral-50 text-neutral-900 antialiased overflow-hidden flex flex-col">
      <FontStyles />
      <DemoNav view={view} setView={setView} paid={paid} setPaid={setPaid} />
      
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="h-full w-full">
            {view === "landing" && (
              <DemoMainDashboard 
                onStart={() => setView("input")} 
                onDemo={() => setView("diagnosis")} 
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