"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnPR = void 0;
const azdev = __importStar(require("azure-devops-node-api"));
const logger_1 = require("./logger");
const gitAzdevEnvVariables = () => {
    var _a, _b, _c, _d, _e;
    const envVars = [
        "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI",
        "API_TOKEN",
        "SYSTEM_PULLREQUEST_PULLREQUESTID",
        "BUILD_REPOSITORY_ID",
        "SYSTEM_TEAMPROJECTID",
    ];
    const missingVars = [];
    envVars.forEach((envVar) => { var _a; return (_a = process.env[envVar]) !== null && _a !== void 0 ? _a : missingVars.push(envVar); });
    if (missingVars.length > 0) {
        logger_1.logger.error(`Missing environment variables: ${missingVars.join(", ")}`);
        throw new Error("One or more Azure DevOps environment variables are not set");
    }
    return {
        serverUrl: (_a = process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI) !== null && _a !== void 0 ? _a : "",
        azdevToken: (_b = process.env.API_TOKEN) !== null && _b !== void 0 ? _b : "",
        pullRequestId: (_c = process.env.SYSTEM_PULLREQUEST_PULLREQUESTID) !== null && _c !== void 0 ? _c : "",
        project: (_d = process.env.SYSTEM_TEAMPROJECTID) !== null && _d !== void 0 ? _d : "",
        repositoryId: (_e = process.env.BUILD_REPOSITORY_ID) !== null && _e !== void 0 ? _e : "",
    };
};
const commentOnPR = async (comment, signOff) => {
    try {
        const { serverUrl, azdevToken, pullRequestId, repositoryId, project } = gitAzdevEnvVariables();
        const pullRequestIdNumber = Number(pullRequestId);
        const authHandler = azdev.getPersonalAccessTokenHandler(azdevToken);
        const connection = new azdev.WebApi(serverUrl, authHandler);
        const git = await connection.getGitApi();
        const commentThread = {
            comments: [
                {
                    content: `${comment}\n\n---\n\n${signOff}`,
                },
            ],
        };
        await git.createThread(commentThread, repositoryId, pullRequestIdNumber, project);
    }
    catch (error) {
        logger_1.logger.error(`Failed to comment on PR: ${JSON.stringify(error)}`);
        throw error;
    }
};
exports.commentOnPR = commentOnPR;
