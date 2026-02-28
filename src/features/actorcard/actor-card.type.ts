export interface ActionCardProps {
  icon: string;
  title: string;
  items: string[];
  btnText: string;
  onAction: (type: string) => void;
}

// Response type for actor details
export interface ActorCastingCardProps {
  data?: Omit<ActionCardProps, "onAction">[];
}

export type CastingType = "ACTOR" | "RECRUITER";