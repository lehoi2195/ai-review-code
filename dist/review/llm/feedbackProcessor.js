"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFeedbacks = exports.createSummary = void 0;
const logger_1 = require("../../common/logger");
const constants_1 = require("../constants");
const prompts_1 = require("../prompt/prompts");
const PriorityQueue_1 = __importDefault(require("./PriorityQueue"));
const generateMarkdownReport_1 = require("./generateMarkdownReport");
const collectAndLogFeedback = async (feedbackPromise) => {
    try {
        const feedbacks = await feedbackPromise;
        return feedbacks;
    }
    catch (error) {
        logger_1.logger.error(`Error in processing prompt`, error);
        throw error;
    }
};
const createSummary = async (model, feedbacks) => {
    const finalPrompt = prompts_1.completionPrompt.replace("{feedback}", JSON.stringify(feedbacks));
    const summary = await model.callModel(finalPrompt);
    logger_1.logger.info(summary);
    return summary;
};
exports.createSummary = createSummary;
const pickWorstFeedbacks = (feedbacks, limit) => {
    const pickingPriorityQueue = new PriorityQueue_1.default();
    //remove feedbacks with risk score of 1 from consideration.
    const filteredFeedbacks = feedbacks.filter((feedback) => feedback.riskScore > 1);
    filteredFeedbacks.forEach((feedback) => {
        pickingPriorityQueue.enqueue(feedback, feedback.riskScore + Math.random() // We add a random number to the weight to avoid picking the same feedbacks every time. The weight is the risk score itself, so that feedbacks with higher risk scores are more likely to be picked.
        );
        if (pickingPriorityQueue.size() > limit) {
            pickingPriorityQueue.dequeue();
        }
    });
    return pickingPriorityQueue.getItems();
};
const extractFulfilledFeedbacks = (feedbackResults) => {
    return feedbackResults.reduce((accumulatedFeedbacks, feedbackResult) => {
        if (feedbackResult.status === "fulfilled") {
            accumulatedFeedbacks.push(...feedbackResult.value);
        }
        return accumulatedFeedbacks;
    }, []);
};
const processFeedbacks = async (model, prompts) => {
    const feedbackPromises = prompts.map((prompt) => model.callModelJSON(prompt));
    const feedbackResults = await Promise.allSettled(feedbackPromises.map(collectAndLogFeedback));
    const feedbacks = extractFulfilledFeedbacks(feedbackResults);
    const worstFeedbacks = pickWorstFeedbacks(feedbacks, constants_1.maxFeedbackCount);
    logger_1.logger.info((0, generateMarkdownReport_1.formatFeedbacks)(worstFeedbacks));
    return worstFeedbacks;
};
exports.processFeedbacks = processFeedbacks;
