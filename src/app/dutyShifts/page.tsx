import { getServerSession } from "next-auth";
import CardList from "./components/CardList";
import Menu from "./components/Menu";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { apiUrl } from "@/helpers";
import { DutyShift } from "./types/types";

const getDutyShifts = async (token: string) => {
  const response = await fetch(`${apiUrl}/duty-shifts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch duty shifts");
  }
  const data: Array<DutyShift> = await response.json();

  return data;
};

const addNurseOnDutyShifts = async (token: string, nursesIds: number[]) => {
  const response = await fetch(`${apiUrl}/duty-shifts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nursesIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to add nurse on duty shift");
  }
  const data = await response.json();

  return data;
};

export default async function DutyShifts() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/");
  }

  let dutyShifts: DutyShift[];
  try {
    dutyShifts = await getDutyShifts(session.user.accessToken);
  } catch (error) {
    console.error("Failed to load duty shifts:", error);
    dutyShifts = [];
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Menu />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Turnos</h1>
        <CardList
          dutyShifts={dutyShifts}
          nurseId={session.user.id}
          accessToken={session.user.accessToken}
        />
      </div>
    </div>
  );
}
