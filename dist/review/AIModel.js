"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("langchain/llms/openai");
const ts_retry_1 = require("ts-retry");
const logger_1 = require("../common/logger");
const parseAttributes_1 = require("../common/parseAttributes");
const defaultRetryCount = 3;
class AIModel {
    constructor(options) {
        this.model = new openai_1.OpenAIChat({
            openAIApiKey: options.apiKey,
            modelName: options.modelName,
            temperature: options.temperature,
        });
        this.retryCount = options.retryCount || defaultRetryCount;
    }
    async callModel(prompt) {
        return this.model.call(prompt);
    }
    async callModelJSON(prompt) {
        return (0, ts_retry_1.retryAsync)(async () => {
            const modelResponse = await this.callModel(prompt);
            logger_1.logger.debug(`Model response: ${modelResponse}`);
            try {
                const parsedObject = (0, parseAttributes_1.parseAttributes)(modelResponse);
                return parsedObject;
            }
            catch (error) {
                logger_1.logger.error(`Error parsing JSON response from the model: ${modelResponse}`, error);
                throw error;
            }
        }, {
            maxTry: this.retryCount,
            onError: (error) => {
                logger_1.logger.error(`Error in callModelJSON`, error);
            },
            onMaxRetryFunc: () => {
                throw new Error(`Couldn't call model after ${this.retryCount} tries with prompt: ${prompt}`);
            },
        });
    }
}
exports.default = AIModel;
