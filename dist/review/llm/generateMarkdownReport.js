"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMarkdownReport = exports.formatFeedbacks = void 0;
const formatFeedback = (feedback) => `
**Risk Level ${feedback.riskScore} - ${feedback.fileName}**

${feedback.details}

`;
const formatFeedbacks = (feedbacks) => `
${feedbacks.map(formatFeedback).join("\n---\n")}
`;
exports.formatFeedbacks = formatFeedbacks;
const generateMarkdownReport = (feedbacks, summary) => `
${(0, exports.formatFeedbacks)(feedbacks)}
---
${summary}

`;
exports.generateMarkdownReport = generateMarkdownReport;
