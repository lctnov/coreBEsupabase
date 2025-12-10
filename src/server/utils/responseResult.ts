export type Responsive<T> = {
  iPayload: T | null;
  iMessage: string;
  iStatus: "success" | "error";
};

export const success = <T>(payload: T, message = "Success"): Responsive<T> => ({
  iPayload: payload,
  iMessage: message,
  iStatus: "success",
});

export const error = (message = "Error"): Responsive<null> => ({
  iPayload: null,
  iMessage: message,
  iStatus: "error",
});
