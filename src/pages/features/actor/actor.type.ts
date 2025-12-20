export type ActorInput = {
  id: string;
  fullName?: string;
  dob?: string;
  gender?: "male" | "female" | "other";
  cmnd?: string;
  phone?: string;
  email?: string;
  address?: string;
  height?: string;
  job?: string;
  applyRole?: string;
  note?: string;
  images?: File[];
};

// Response type for actor details
export type ActorResponse = {
  id: string;
};