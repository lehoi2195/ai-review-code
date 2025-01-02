"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = void 0;
const logger_1 = require("../../common/logger");
const feedbackProcessor_1 = require("./feedbackProcessor");
const generateMarkdownReport_1 = require("./generateMarkdownReport");
const AIModel_1 = __importDefault(require("../AIModel"));
const askAI = async (prompts, modelName, openAIApiKey, provider) => {
    logger_1.logger.info("Asking the experts...");
    const model = new AIModel_1.default({
        modelName: modelName,
        temperature: 0.0,
        apiKey: openAIApiKey,
        provider,
    });
    const feedbacks = await (0, feedbackProcessor_1.processFeedbacks)(model, prompts);
    logger_1.logger.debug(`Feedback received:\n ${feedbacks
        .map((feedback) => `Filename: ${feedback.fileName}, RiskScore: ${feedback.riskScore}, Details: ${feedback.details}\n`)
        .toString()}`);
    const summary = await (0, feedbackProcessor_1.createSummary)(model, feedbacks);
    logger_1.logger.debug(`Summary of feedbacks: ${summary}`);
    return {
        markdownReport: (0, generateMarkdownReport_1.generateMarkdownReport)(feedbacks, summary),
        feedbacks: feedbacks,
    };
};
exports.askAI = askAI;
