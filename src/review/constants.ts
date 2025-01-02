export const signOff = "#### RN-Code-GPT Review";

export const modelInfo = [
  {
    model: "gpt-4o-mini",
    maxPromptLength: 300000, //128k tokens
  },
  {
    model: "gpt-4o",
    maxPromptLength: 300000, //128k tokens
  },
  {
    model: "gpt-4-turbo",
    maxPromptLength: 300000, //128k tokens
  },
  {
    model: "gpt-4-turbo-preview",
    maxPromptLength: 300000, //128k tokens
  },
  {
    model: "gpt-4",
    maxPromptLength: 21000, //8k tokens
  },
  {
    model: "gpt-4-32k",
    maxPromptLength: 90000, //32k tokens
  },
  {
    model: "gpt-3.5-turbo",
    maxPromptLength: 9000, //4k tokens
  },
  {
    model: "gpt-3.5-turbo-16k",
    maxPromptLength: 45000, //16k tokens
  },
]; // Response needs about 1k tokens ~= 3k characters

export const languageMap: { [key: string]: string } = {
  ".js": "JavaScript",
  ".ts": "TypeScript",
  ".tsx": "TypeScript",
  ".jsx": "JavaScript",
};

export const supportedFiles = new Set(Object.keys(languageMap));

export const excludedKeywords = new Set(["types"]);
export const maxFeedbackCount = 3;
