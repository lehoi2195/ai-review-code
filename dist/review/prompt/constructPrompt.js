"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPromptsArray = void 0;
const changedLines_1 = require("./changedLines");
const prompts_1 = require("./prompts");
const constructPromptsArray = (files, maxPromptLength) => {
    const maxPromptPayloadLength = maxPromptLength - prompts_1.instructionPrompt.length;
    const promptPayloads = (0, changedLines_1.changedLinesIntoBatches)(files, maxPromptPayloadLength);
    const prompts = promptPayloads.map((payload) => {
        return prompts_1.instructionPrompt + JSON.stringify(payload);
    });
    return prompts;
};
exports.constructPromptsArray = constructPromptsArray;
