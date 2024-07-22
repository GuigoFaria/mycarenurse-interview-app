import { apiUrl } from "@/helpers";

export type DutyShift = {
  id: number;

  name: string;

  healthUnit: HealthUnit;

  timeInit: Date;

  timeEnd: Date;

  description: string;

  nurses: Nurse[];
};

export type Nurse = {
  id: number;
  name: string;
  email: string;
  registrationCouncilNursing: string;
  stateCouncilNursing: string;
};

export type HealthUnit = {
  id: number;
  name: string;
  address: Record<string, any>;
};
