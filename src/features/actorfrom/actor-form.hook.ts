"use client";

import { useEffect, useState } from "react";
import type { ActorCastingForm } from "./actor-form.type";
import { ActorCastingFormService } from "./actor-form.service";

type UseActorFormVMParams = {
  open: boolean;
  onClose: () => void;
};

export function useActorFormVM({ open, onClose }: UseActorFormVMParams) {
  const [form, setForm] = useState<ActorCastingForm>(
    ActorCastingFormService.createInitialForm()
  );

  useEffect(() => {
    if (!open) {
      setForm(ActorCastingFormService.createInitialForm());
    }
  }, [open]);

  const updateForm = <K extends keyof ActorCastingForm>(
    field: K,
    value: ActorCastingForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = () => {
    ActorCastingFormService.sumitValues(form);
    onClose();
  };

  return {
    form,
    updateForm,
    submitForm,
  };
}