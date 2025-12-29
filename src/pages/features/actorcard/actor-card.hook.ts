"use client";

import { useState } from "react";
import { ActorCastingCardService } from "./actor-card.service";

export function useActorCardVM() {
	const [openActor, setOpenActor] = useState(false);
	  const [openRecruiter, setOpenRecruiter] = useState(false);
	  
	  const handleClick = (type: string) => {
		const typeCasting = ActorCastingCardService.detectCastingType(type);
		if (typeCasting === "ACTOR") {
		  setOpenActor(true);
		} else {
		  setOpenRecruiter(true);
		}
	  };
	  
	return {openActor, openRecruiter, handleClick, setOpenActor, setOpenRecruiter};
}