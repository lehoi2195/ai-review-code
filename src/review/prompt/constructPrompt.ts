import { ReviewFile } from "../../common/types";
import { changedLinesIntoBatches } from "./changedLines";
import { instructionPrompt } from "./prompts";

export const constructPromptsArray = (
  files: ReviewFile[],
  maxPromptLength: number
) => {
  const maxPromptPayloadLength = maxPromptLength - instructionPrompt.length;
  const promptPayloads = changedLinesIntoBatches(files, maxPromptPayloadLength);

  const prompts = promptPayloads.map((payload) => {
    return instructionPrompt + JSON.stringify(payload);
  });

  return prompts;
};
