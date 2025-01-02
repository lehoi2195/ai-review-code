import { PromptFile, ReviewFile } from "../../common/types";
import { createPromptFiles } from "./createPromptFiles";
import { promptsIntoBatches } from "./promptsIntoBatches";

export const changedLinesIntoBatches = (
  files: ReviewFile[],
  maxPromptPayloadLength: number
): PromptFile[][] => {
  const promptFiles = createPromptFiles(files, maxPromptPayloadLength);

  return promptsIntoBatches(promptFiles, maxPromptPayloadLength);
};
