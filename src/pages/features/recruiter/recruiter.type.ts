export type Recruiter = {
  id: string;
  companyName?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  industry?: string;
  size?: string;
  note?: string;
};

// Response type for recruiter details
export type RecruiterResponse = {
  id: string;
};