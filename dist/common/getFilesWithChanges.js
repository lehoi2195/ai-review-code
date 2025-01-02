"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesWithChanges = void 0;
const promises_1 = require("fs/promises");
const process_1 = require("process");
const getChangedFileLines_1 = require("./getChangedFileLines");
const getChangedFilesNames_1 = require("./getChangedFilesNames");
const logger_1 = require("./logger");
const getFilesWithChanges = async () => {
    try {
        const fileNames = await (0, getChangedFilesNames_1.getChangedFilesNames)();
        if (fileNames.length === 0) {
            logger_1.logger.warn("No files with changes found, you might need to stage your changes.");
            (0, process_1.exit)(0);
        }
        const files = await Promise.all(fileNames.map(async (fileName) => {
            const fileContent = await (0, promises_1.readFile)(fileName, "utf8");
            const changedLines = await (0, getChangedFileLines_1.getChangedFileLines)(fileName);
            return { fileName, fileContent, changedLines };
        }));
        return files;
    }
    catch (error) {
        throw new Error(`Failed to get files with changes: ${JSON.stringify(error)}`);
    }
};
exports.getFilesWithChanges = getFilesWithChanges;
