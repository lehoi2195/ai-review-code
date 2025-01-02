"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptsIntoBatches = void 0;
const logger_1 = require("../../common/logger");
const getLengthOfFile_1 = require("./getLengthOfFile");
const promptsIntoBatches = (promptFiles, maxBatchSize) => {
    const batches = [];
    let currentBatch = [];
    let currentBatchSize = 0;
    for (const file of promptFiles) {
        const currentFileSize = (0, getLengthOfFile_1.getLengthOfFile)(file);
        if (currentFileSize > maxBatchSize) {
            logger_1.logger.error(`Changes to file ${file.fileName} are larger than the max prompt length, consider using a model with a larger context window. Skipping file changes...`);
            continue;
        }
        else if (currentBatchSize + currentFileSize > maxBatchSize) {
            batches.push(currentBatch);
            currentBatch = [file];
            currentBatchSize = currentFileSize;
        }
        else {
            currentBatch.push(file);
            currentBatchSize += currentFileSize;
        }
    }
    // Add the last batch to the result
    if (currentBatch.length > 0) {
        batches.push(currentBatch);
    }
    return batches;
};
exports.promptsIntoBatches = promptsIntoBatches;
