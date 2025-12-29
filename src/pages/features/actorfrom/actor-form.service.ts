import { ActorCastingForm } from "./actor-form.type";

export const ActorCastingFormService = {
  createInitialForm(): ActorCastingForm {
	return {
		fullName: "",
		dob: "",
		gender: "male",
		cmnd: "",
		phone: "",
		email: "",
		address: "",
		height: "",
		job: "",
		applyRole: "",
		note: "",
		images: [],
	};
  },

  sumitValues(form: ActorCastingForm) {
	// sau này gọi API ở đây
    console.log("SUBMIT:", form);
  }

};