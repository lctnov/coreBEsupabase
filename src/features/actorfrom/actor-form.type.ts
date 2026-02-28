export type Gender = "male" | "female" | "other";

export interface ActorCastingForm {
  fullName?: string;
  dob?: string;
  gender: Gender;
  cmnd?: string;
  phone?: string;
  email?: string;
  address?: string;
  height?: string;
  job?: string;
  applyRole?: string;
  note?: string;
  images?: File[];
}

export interface ActorCastingInforProps {
  open: boolean;
  onClose: () => void;
  remainSlots: number;
}

export interface ActorCastingResponse {
  id: string;
}