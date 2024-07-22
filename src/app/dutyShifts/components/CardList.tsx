import { DutyShift } from "../types/types";
import Card from "./Card";

export default function CardList({
  dutyShifts,
  nurseId,
  accessToken,
}: {
  dutyShifts: DutyShift[];
  nurseId: number;
  accessToken?: string;
}) {
  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {dutyShifts.map((dutyShift) => (
        <Card
          key={dutyShift.id}
          title={dutyShift.healthUnit.name}
          description={dutyShift.description}
          address={dutyShift.healthUnit.address}
          dateInit={new Date(dutyShift.timeInit).toLocaleString("pt-BR")}
          dateEnd={new Date(dutyShift.timeEnd).toLocaleString("pt-BR")}
          nurses={dutyShift.nurses}
          currentNurseId={nurseId}
          accessToken={accessToken}
          dutyShiftId={dutyShift.id}
        />
      ))}
    </div>
  );
}
