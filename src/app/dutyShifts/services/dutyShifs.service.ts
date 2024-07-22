import { apiUrl } from "@/helpers";

export default class DutyShiftsService {
  async addNurseOnDutyShifts({
    nurseIds,
    accessToken,
    dutyShiftId,
  }: {
    nurseIds: number[];
    accessToken?: string;
    dutyShiftId: number;
  }) {
    if (!accessToken) {
      throw new Error("No access token provided");
    }

    const response = await fetch(`${apiUrl}/duty-shifts/${dutyShiftId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ nurseIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to add nurse on duty shift");
    }

    const data = await response.json();
    return data;
  }
}
