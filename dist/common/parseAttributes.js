"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAttributes = void 0;
const encodeDetails = (jsonString) => {
    const regex = new RegExp(`"details"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g");
    return jsonString.replace(regex, (_, value) => `"details": "${encodeURIComponent(value)}"`);
};
const decodeAndReplaceNewlines = (value) => decodeURIComponent(value).replace(/\\n/g, "\n");
const processDetails = (object) => (object["details"] = decodeAndReplaceNewlines(object["details"]));
const isIFeedback = (input) => typeof input === "object" &&
    input !== null &&
    "fileName" in input &&
    typeof input.fileName === "string" &&
    "riskScore" in input &&
    typeof input.riskScore === "number" &&
    "details" in input &&
    typeof input.details === "string";
const isIFeedbackArray = (input) => Array.isArray(input) && input.every((entry) => isIFeedback(entry));
const parseAttributes = (jsonString) => {
    let encodedJsonString = jsonString.trim().startsWith("```json")
        ? jsonString.trim().slice(8, -4)
        : jsonString.trim();
    encodedJsonString = encodeDetails(encodedJsonString);
    const parsedObject = JSON.parse(encodedJsonString);
    if (isIFeedbackArray(parsedObject)) {
        parsedObject.forEach((item) => {
            processDetails(item);
        });
        return parsedObject;
    }
    else {
        throw new Error(`The shape of the object returned from the model was incorrect. Object returned was ${String(parsedObject)}. Object should include fileName, riskScore and details fields.`);
    }
};
exports.parseAttributes = parseAttributes;
