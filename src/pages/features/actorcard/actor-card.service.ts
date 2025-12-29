import { CastingType } from "./actor-card.type";

export const ActorCastingCardService = {
  detectCastingType(title: string): CastingType {
    if (title.toUpperCase().includes("DIỄN VIÊN")) {
      return "ACTOR";
    }
    return "RECRUITER";
  },
};
