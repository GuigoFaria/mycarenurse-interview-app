"use server";

import { redirect } from "next/navigation";

export const navigateToLogin = () => {
  redirect(`/`);
};

export const navigateToHome = () => {
  redirect(`/dutyShifts`);
};
