"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.review = void 0;
const commentOnPR_1 = require("../common/commentOnPR");
const filterFiles_1 = require("../common/filterFiles");
const logger_1 = require("../common/logger");
const constants_1 = require("./constants");
const askAI_1 = require("./llm/askAI");
const constructPrompt_1 = require("./prompt/constructPrompt");
const review = async (files, openAIApiKey) => {
    var _a;
    logger_1.logger.debug(`Review started.`);
    const modelName = "gpt-3.5-turbo";
    const provider = "openai";
    const filteredFiles = (0, filterFiles_1.filterFiles)(files);
    if (filteredFiles.length === 0) {
        logger_1.logger.info("No file to review, finishing review now.");
        return undefined;
    }
    logger_1.logger.debug(`Files to review after filtering: ${filteredFiles
        .map((file) => file.fileName)
        .toString()}`);
    const maxPromptLength = (_a = constants_1.modelInfo.find((info) => info.model === modelName)) === null || _a === void 0 ? void 0 : _a.maxPromptLength;
    if (!maxPromptLength) {
        throw new Error(`Model ${modelName} not found. Please choose one of ${constants_1.modelInfo
            .map((info) => info.model)
            .toString()} or make a PR to add a new model.`);
    }
    const prompts = (0, constructPrompt_1.constructPromptsArray)(filteredFiles, maxPromptLength);
    logger_1.logger.debug(`Prompts used:\n ${prompts.toString()}`);
    const { markdownReport: response } = await (0, askAI_1.askAI)(prompts, modelName, openAIApiKey, provider);
    logger_1.logger.debug(`Markdown report:\n ${response}`);
    await (0, commentOnPR_1.commentOnPR)(response, constants_1.signOff);
    return response;
};
exports.review = review;
