import {
  cdrToPercentage,
  convertCDRToDamageIncreateRate,
} from "@/features/cooldown/utils";

export const TableSection = () => {
  return (
    <div className="mt-12">
      <h2 className="font-semibold text-xl">쿨감 효율표</h2>
      <table className="border mt-3 w-full md:w-fit">
        <thead className="bg-gray-50 border-b">
          <tr className="text-sm">
            <th className="px-12 h-12">쿨타임 감소율</th>
            <th className="px-12 h-12">최종 데미지 증가율</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {cdrRows.map((cdr) => (
            <tr key={cdr} className="divide-x h-12 text-center font-medium">
              <td>{cdrToPercentage(cdr).toFixed(0)}%</td>
              <td>
                {cdrToPercentage(convertCDRToDamageIncreateRate(cdr)).toFixed(
                  2
                )}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cdrRows = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] as const;
