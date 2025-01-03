import { exec } from "child_process";
import { join } from "path";
import { gitAzdevEnvVariables } from "../config";

export const getChangedFilesNamesCommand = (): string => {
  const { azdevSha, baseSha } = gitAzdevEnvVariables();

  return `git diff --name-only --diff-filter=AMRT ${baseSha} ${azdevSha}`;
};

export const getGitRoot = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec("git rev-parse --show-toplevel", (error, stdout) => {
      if (error) {
        reject(new Error(`Failed to find git root. Error: ${error.message}`));
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

export const getChangedFilesNames = async (): Promise<string[]> => {
  const gitRoot = await getGitRoot();
  const commandString = getChangedFilesNamesCommand();

  return new Promise((resolve, reject) => {
    exec(commandString, { cwd: gitRoot }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Failed to execute command. Error: ${error.message}`));
      } else if (stderr) {
        reject(new Error(`Command execution error: ${stderr}`));
      } else {
        const files = stdout
          .split("\n")
          .filter((fileName) => fileName.trim() !== "")
          .map((fileName) => join(gitRoot, fileName.trim()));
        resolve(files);
      }
    });
  });
};
