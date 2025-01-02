import { IFeedback } from "./types";

const encodeDetails = (jsonString: string): string => {
  const regex = new RegExp(`"details"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g");

  return jsonString.replace(
    regex,
    (_, value) => `"details": "${encodeURIComponent(value)}"`
  );
};

const decodeAndReplaceNewlines = (value: string): string =>
  decodeURIComponent(value).replace(/\\n/g, "\n");

const processDetails = (object: IFeedback) =>
  (object["details"] = decodeAndReplaceNewlines(object["details"]));

const isIFeedback = (input: unknown): input is IFeedback =>
  typeof input === "object" &&
  input !== null &&
  "fileName" in input &&
  typeof input.fileName === "string" &&
  "riskScore" in input &&
  typeof input.riskScore === "number" &&
  "details" in input &&
  typeof input.details === "string";

const isIFeedbackArray = (input: unknown): input is IFeedback[] =>
  Array.isArray(input) && input.every((entry) => isIFeedback(entry));

export const parseAttributes = (jsonString: string): IFeedback[] => {
  let encodedJsonString = jsonString.trim().startsWith("```json")
    ? jsonString.trim().slice(8, -4)
    : jsonString.trim();
  encodedJsonString = encodeDetails(encodedJsonString);

  const parsedObject: unknown = JSON.parse(encodedJsonString);

  if (isIFeedbackArray(parsedObject)) {
    parsedObject.forEach((item: IFeedback) => {
      processDetails(item);
    });

    return parsedObject;
  } else {
    throw new Error(
      `The shape of the object returned from the model was incorrect. Object returned was ${String(
        parsedObject
      )}. Object should include fileName, riskScore and details fields.`
    );
  }
};
