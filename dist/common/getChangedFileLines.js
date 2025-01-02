"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChangedFileLines = exports.getChangesFileLinesCommand = void 0;
const child_process_1 = require("child_process");
const config_1 = require("../config");
const getChangesFileLinesCommand = (fileName) => {
    const { azdevSha, baseSha } = (0, config_1.gitAzdevEnvVariables)();
    return `git diff -U0 --diff-filter=AMRT ${baseSha} ${azdevSha} ${fileName}`;
};
exports.getChangesFileLinesCommand = getChangesFileLinesCommand;
const getChangedFileLines = async (fileName) => {
    const commandString = (0, exports.getChangesFileLinesCommand)(fileName);
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(commandString, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Failed to execute command. Error: ${error.message}`));
            }
            else if (stderr) {
                reject(new Error(`Command execution error: ${stderr}`));
            }
            else {
                const changedLines = stdout
                    .split("\n")
                    .filter((line) => line.startsWith("+") || line.startsWith("-"))
                    .filter((line) => !line.startsWith("---") && !line.startsWith("+++"))
                    .join("\n");
                resolve(changedLines);
            }
        });
    });
};
exports.getChangedFileLines = getChangedFileLines;
