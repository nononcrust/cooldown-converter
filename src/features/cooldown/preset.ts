import { CDR } from "./utils";

export type CDRPreset = {
  name: string;
  cdrs: CDR[];
};

const 대류: CDRPreset = {
  name: "대류 5셋",
  cdrs: [0.04, 0.04, 0.04, 0.04, 0.04] as const,
};

const 월드아이돌링: CDRPreset = {
  name: "월드 아이돌 링",
  cdrs: [0.1] as const,
};

const 칠흑정화: CDRPreset = {
  name: "칠흑의 정화 [정화]",
  cdrs: [0.3] as const,
};

const 칠흑타락: CDRPreset = {
  name: "칠흑의 정화 [타락]",
  cdrs: [0.55] as const,
};

const 쿨감레거시: CDRPreset = {
  name: "쿨감 레거시 (+20%)",
  cdrs: [0.2] as const,
};

const 뒤집힌기억: CDRPreset = {
  name: "뒤집힌 기억",
  cdrs: [0.15] as const,
};

const 레드래빗: CDRPreset = {
  name: "레드 래빗",
  cdrs: [0.07] as const,
};

const 세계의경계: CDRPreset = {
  name: "세계의 경계",
  cdrs: [0.18] as const,
};

export const CDR_PRESETS = [
  대류,
  월드아이돌링,
  칠흑정화,
  칠흑타락,
  쿨감레거시,
  뒤집힌기억,
  레드래빗,
  세계의경계,
] as const;
