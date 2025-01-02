"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxFeedbackCount = exports.excludedKeywords = exports.supportedFiles = exports.languageMap = exports.modelInfo = exports.signOff = void 0;
exports.signOff = "#### RN-Code-GPT Review";
exports.modelInfo = [
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
exports.languageMap = {
    ".js": "JavaScript",
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".jsx": "JavaScript",
};
exports.supportedFiles = new Set(Object.keys(exports.languageMap));
exports.excludedKeywords = new Set(["types"]);
exports.maxFeedbackCount = 3;
