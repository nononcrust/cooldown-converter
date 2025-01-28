"use client";

import { Button } from "@/components/ui/button";
import { ChipButton } from "@/components/ui/chip-button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { CDR_PRESETS } from "@/features/cooldown/preset";
import {
  convertCDRToDamageIncreateRate,
  getExcessCDR,
  getTotalCDR,
  percentageToCDR,
  cdrToPercentage,
  MAX_CDR,
} from "@/features/cooldown/utils";
import { CDRPreset } from "@/features/cooldown/preset";
import { useFieldArray } from "@/hooks/use-field-array";
import { clamp, flow } from "es-toolkit";
import { PlusIcon, RotateCcwIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { TableSection } from "./_components/table-section";

const MAX_FIELD_COUNT = 20;

export default function Home() {
  const fieldArray = useFieldArray({
    initialValues: ["0"],
  });

  const [selectedPresets, setSelectedPresets] = useState<CDRPreset[]>([]);

  const isPresetSelected = (preset: CDRPreset) => {
    return selectedPresets.some(
      (selectedPreset) => preset.name === selectedPreset.name
    );
  };

  const togglePreset = (preset: CDRPreset) => {
    setSelectedPresets((selectedPresets) =>
      selectedPresets.some(
        (selectedPreset) => selectedPreset.name === preset.name
      )
        ? selectedPresets.filter((p) => p.name !== preset.name)
        : [...selectedPresets, preset]
    );
  };

  const reset = () => {
    fieldArray.reset();
    setSelectedPresets([]);
  };

  const cdrsFromInputs = fieldArray.fields.map((field) =>
    percentageToCDR(Number(field.value))
  );

  const cdrsFromPresets = selectedPresets.flatMap((preset) => preset.cdrs);

  const cdrs = [...cdrsFromInputs, ...cdrsFromPresets];

  const totalCDR = getTotalCDR(cdrs);
  const clampedTotalCDR = clamp(totalCDR, MAX_CDR);
  const totalCDRPercentage = cdrToPercentage(clampedTotalCDR).toFixed(2);
  const excessCDR = getExcessCDR(totalCDR);
  const excessCDRPercentage = cdrToPercentage(excessCDR).toFixed(2);
  const totalDamageIncreaseRatePercentage = flow(
    convertCDRToDamageIncreateRate,
    cdrToPercentage,
    (percentage) => percentage.toFixed(2)
  )(clampedTotalCDR);

  return (
    <main className="max-w-xl mx-auto p-4 my-16">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">
          쿨감 계산기
          <span className="ml-2 text-base text-primary">BETA</span>
        </h1>
      </div>
      <div>
        <div className="mt-3 flex justify-end gap-2">
          <Button size="small" variant="outlined" onClick={reset}>
            <RotateCcwIcon size={12} />
            초기화하기
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => fieldArray.insert("0")}
            disabled={fieldArray.fields.length >= MAX_FIELD_COUNT}
          >
            <PlusIcon size={12} />
            추가하기
          </Button>
        </div>
        <div className="flex flex-col gap-3 mt-2">
          {fieldArray.fields.map((field) => (
            <div className="flex items-center gap-2" key={field.id}>
              <div className="relative w-full">
                <Input
                  min={0}
                  max={100}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="pr-8"
                  {...field.register}
                />
                <span className="text-subtle absolute right-3 text-sm font-medium top-1/2 -translate-y-1/2">
                  %
                </span>
              </div>
              <IconButton
                size="xsmall"
                variant="outlined"
                aria-label="삭제"
                onClick={field.remove}
              >
                <XIcon size={14} />
              </IconButton>
            </div>
          ))}
        </div>
        <ul className="flex flex-wrap gap-2 mt-2">
          {CDR_PRESETS.map((preset) => (
            <li key={preset.name}>
              <ChipButton
                size="xsmall"
                variant={isPresetSelected(preset) ? "primaryLow" : "secondary"}
                onClick={() => togglePreset(preset)}
              >
                {preset.name}
              </ChipButton>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="flex flex-col">
          <span className="font-medium text-subtle">총 쿨타임 감소율</span>
          <span className="text-3xl font-semibold">
            {totalCDRPercentage}%
            <span className="text-sm ml-2 font-medium">
              {excessCDR > 0 && (
                <span className="text-error ml-1">
                  {excessCDRPercentage}% 초과
                </span>
              )}
            </span>
          </span>
        </div>
        <div className="flex flex-col mt-3">
          <span className="text-subtle font-medium">최종 데미지 증가율</span>
          <span className="text-4xl font-semibold text-primary">
            {totalDamageIncreaseRatePercentage}%
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-6">
        <p className="text-sm text-subtle font-medium">
          · 직업에 따라 최종 데미지 증가율이 표시된 수치보다 낮게 적용될 수
          있습니다.
        </p>
        <p className="text-sm text-subtle font-medium">
          · 패턴이 많은 던전일수록 쿨감 효율이 감소할 수 있습니다.
        </p>
        <p className="text-sm text-subtle font-medium">
          · 최종 데미지 증가율은 아래 공식에 따라 계산됩니다.
        </p>
        <p className="text-sm text-subtle font-medium pl-8">
          최종 데미지 증가율 = 100% / (100% - 쿨타임 감소율) - 100%
        </p>
      </div>
      <TableSection />
      {/* <FeedbackDialog /> */}
    </main>
  );
}
