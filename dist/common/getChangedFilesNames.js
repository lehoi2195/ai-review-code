"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChangedFilesNames = exports.getGitRoot = exports.getChangedFilesNamesCommand = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const config_1 = require("../config");
const getChangedFilesNamesCommand = () => {
    const { azdevSha, baseSha } = (0, config_1.gitAzdevEnvVariables)();
    return `git diff --name-only --diff-filter=AMRT ${baseSha} ${azdevSha}`;
};
exports.getChangedFilesNamesCommand = getChangedFilesNamesCommand;
const getGitRoot = () => {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)("git rev-parse --show-toplevel", (error, stdout) => {
            if (error) {
                reject(new Error(`Failed to find git root. Error: ${error.message}`));
            }
            else {
                resolve(stdout.trim());
            }
        });
    });
};
exports.getGitRoot = getGitRoot;
const getChangedFilesNames = async () => {
    const gitRoot = await (0, exports.getGitRoot)();
    const commandString = (0, exports.getChangedFilesNamesCommand)();
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(commandString, { cwd: gitRoot }, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Failed to execute command. Error: ${error.message}`));
            }
            else if (stderr) {
                reject(new Error(`Command execution error: ${stderr}`));
            }
            else {
                const files = stdout
                    .split("\n")
                    .filter((fileName) => fileName.trim() !== "")
                    .map((fileName) => (0, path_1.join)(gitRoot, fileName.trim()));
                resolve(files);
            }
        });
    });
};
exports.getChangedFilesNames = getChangedFilesNames;
