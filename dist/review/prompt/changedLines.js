"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changedLinesIntoBatches = void 0;
const createPromptFiles_1 = require("./createPromptFiles");
const promptsIntoBatches_1 = require("./promptsIntoBatches");
const changedLinesIntoBatches = (files, maxPromptPayloadLength) => {
    const promptFiles = (0, createPromptFiles_1.createPromptFiles)(files, maxPromptPayloadLength);
    return (0, promptsIntoBatches_1.promptsIntoBatches)(promptFiles, maxPromptPayloadLength);
};
exports.changedLinesIntoBatches = changedLinesIntoBatches;
