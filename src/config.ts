/* Env variables:
 * OPENAI_API_KEY
In CI:
 * BASE_SHA
 * API_TOKEN
 */

import { logger } from "./common/logger";

export const getOpenAIApiKey = (): string => {
  if (!process.env.OPENAI_API_KEY) {
    logger.error("OPENAI_API_KEY is not set");
  }

  return process.env.OPENAI_API_KEY ?? "";
};

export const gitAzdevEnvVariables = (): Record<string, string> => {
  const envVars = [
    "SYSTEM_PULLREQUEST_SOURCECOMMITID",
    "BASE_SHA",
    "API_TOKEN",
  ];
  const missingVars: string[] = [];
  envVars.forEach((envVar) => process.env[envVar] ?? missingVars.push(envVar));

  if (missingVars.length > 0) {
    logger.error(`Missing environment variables: ${missingVars.join(", ")}`);
    throw new Error(
      "One or more Azure DevOps environment variables are not set"
    );
  }

  return {
    azdevSha: process.env.SYSTEM_PULLREQUEST_SOURCECOMMITID ?? "",
    baseSha: process.env.BASE_SHA ?? "",
    azdevToken: process.env.API_TOKEN ?? "",
  };
};
