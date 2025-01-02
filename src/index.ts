import dotenv from "dotenv";
import { getFilesWithChanges } from "./common/getFilesWithChanges";
import { logger } from "./common/logger";
import { getOpenAIApiKey } from "./config";
import { review } from "./review";

dotenv.config();

const main = async () => {
  const openAIApiKey = getOpenAIApiKey();
  const files = await getFilesWithChanges();
  await review(files, openAIApiKey);
};

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "An unknown error occurred";
  const stack =
    error instanceof Error ? error.stack : "No stack trace available";

  logger.error(`Error: ${message}`);
  if (stack) {
    logger.debug(`Stack trace: ${stack}`);
  }
  process.exit(1);
});
