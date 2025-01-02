"use strict";
/* Env variables:
 * OPENAI_API_KEY
In CI:
 * BASE_SHA
 * API_TOKEN
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitAzdevEnvVariables = exports.getOpenAIApiKey = void 0;
const logger_1 = require("./common/logger");
const getOpenAIApiKey = () => {
    var _a;
    if (!process.env.OPENAI_API_KEY) {
        logger_1.logger.error("OPENAI_API_KEY is not set");
    }
    return (_a = process.env.OPENAI_API_KEY) !== null && _a !== void 0 ? _a : "";
};
exports.getOpenAIApiKey = getOpenAIApiKey;
const gitAzdevEnvVariables = () => {
    var _a, _b, _c;
    const envVars = [
        "SYSTEM_PULLREQUEST_SOURCECOMMITID",
        "BASE_SHA",
        "API_TOKEN",
    ];
    const missingVars = [];
    envVars.forEach((envVar) => { var _a; return (_a = process.env[envVar]) !== null && _a !== void 0 ? _a : missingVars.push(envVar); });
    if (missingVars.length > 0) {
        logger_1.logger.error(`Missing environment variables: ${missingVars.join(", ")}`);
        throw new Error("One or more Azure DevOps environment variables are not set");
    }
    return {
        azdevSha: (_a = process.env.SYSTEM_PULLREQUEST_SOURCECOMMITID) !== null && _a !== void 0 ? _a : "",
        baseSha: (_b = process.env.BASE_SHA) !== null && _b !== void 0 ? _b : "",
        azdevToken: (_c = process.env.API_TOKEN) !== null && _c !== void 0 ? _c : "",
    };
};
exports.gitAzdevEnvVariables = gitAzdevEnvVariables;
