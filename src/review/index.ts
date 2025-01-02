import { commentOnPR as commentOnPRAzdev } from "../common/commentOnPR";
import { ReviewFile } from "../common/types";
import { filterFiles } from "../common/filterFiles";
import { logger } from "../common/logger";
import { modelInfo, signOff } from "./constants";
import { askAI } from "./llm/askAI";
import { constructPromptsArray } from "./prompt/constructPrompt";

export const review = async (
  files: ReviewFile[],
  openAIApiKey: string
): Promise<string | undefined> => {
  logger.debug(`Review started.`);
  const modelName = "gpt-3.5-turbo";
  const provider = "openai";

  const filteredFiles = filterFiles(files);

  if (filteredFiles.length === 0) {
    logger.info("No file to review, finishing review now.");

    return undefined;
  }

  logger.debug(
    `Files to review after filtering: ${filteredFiles
      .map((file) => file.fileName)
      .toString()}`
  );

  const maxPromptLength = modelInfo.find(
    (info) => info.model === modelName
  )?.maxPromptLength;

  if (!maxPromptLength) {
    throw new Error(
      `Model ${modelName} not found. Please choose one of ${modelInfo
        .map((info) => info.model)
        .toString()} or make a PR to add a new model.`
    );
  }

  const prompts = constructPromptsArray(filteredFiles, maxPromptLength);

  logger.debug(`Prompts used:\n ${prompts.toString()}`);

  const { markdownReport: response } = await askAI(
    prompts,
    modelName,
    openAIApiKey,
    provider
  );

  logger.debug(`Markdown report:\n ${response}`);

  await commentOnPRAzdev(response, signOff);

  return response;
};
