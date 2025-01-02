#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const getFilesWithChanges_1 = require("./common/getFilesWithChanges");
const logger_1 = require("./common/logger");
const config_1 = require("./config");
const review_1 = require("./review");
dotenv_1.default.config();
const main = async () => {
    const openAIApiKey = (0, config_1.getOpenAIApiKey)();
    const files = await (0, getFilesWithChanges_1.getFilesWithChanges)();
    await (0, review_1.review)(files, openAIApiKey);
};
main().catch((error) => {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    const stack = error instanceof Error ? error.stack : "No stack trace available";
    logger_1.logger.error(`Error: ${message}`);
    if (stack) {
        logger_1.logger.debug(`Stack trace: ${stack}`);
    }
    process.exit(1);
});
