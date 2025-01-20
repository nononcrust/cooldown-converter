import { clamp } from "es-toolkit";
import z from "zod";

/**
 * 쿨타임 감소율 (Cooldown Reduction Rate)
 */
export const CDR = z.number().min(0).max(1);
export type CDR = z.infer<typeof CDR>;

export const MAX_CDR = 0.7;

/**
 * 쿨타임 감소율을 데미지 증가율을 변환합니다.
 */
export const convertCDRToDamageIncreateRate = (cdr: CDR): number => {
  return 1 / (1 - clamp(cdr, MAX_CDR)) - 1;
};

/**
 * 초과된 쿨타임 감소율을 계산합니다.
 */
export const getExcessCDR = (cdr: CDR): CDR => {
  return cdr - MAX_CDR;
};

/**
 * 두 쿨타임 감소율을 곱연산하여 계산합니다.
 */
export const combineCDR = (cdr1: CDR, cdr2: CDR): CDR => {
  return 1 - (1 - cdr1) * (1 - cdr2);
};

/**
 * 총 쿨타임 감소율을 계산합니다.
 */
export const getTotalCDR = (cdrs: CDR[]): CDR => {
  return cdrs.reduce(combineCDR, 0);
};

/**
 * 0.7 -> 70
 */
export const cdrToPercentage = (cdr: CDR): number => {
  return cdr * 100;
};

/**
 * 70 -> 0.7
 */
export const percentageToCDR = (percentage: number): CDR => {
  return percentage / 100;
};
