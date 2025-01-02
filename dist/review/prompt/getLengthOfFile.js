"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLengthOfFile = void 0;
const getLengthOfFile = (file) => file.fileName.length + file.promptContent.length;
exports.getLengthOfFile = getLengthOfFile;
