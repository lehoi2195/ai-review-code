"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFiles = void 0;
const path_1 = require("path");
const constants_1 = require("../review/constants");
const filterFiles = (files) => {
    const filteredFiles = files.filter((file) => {
        const ext = (0, path_1.extname)(file.fileName);
        return (constants_1.supportedFiles.has(ext) &&
            ![...constants_1.excludedKeywords].some((keyword) => file.fileName.includes(keyword)) &&
            file.changedLines.trim() !== "");
    });
    return filteredFiles;
};
exports.filterFiles = filterFiles;
