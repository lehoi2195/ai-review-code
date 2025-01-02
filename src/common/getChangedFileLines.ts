import { exec } from "child_process";
import { gitAzdevEnvVariables } from "../config";

export const getChangesFileLinesCommand = (fileName: string): string => {
  const { azdevSha, baseSha } = gitAzdevEnvVariables();
  return `git diff -U0 --diff-filter=AMRT ${baseSha} ${azdevSha} ${fileName}`;
};

export const getChangedFileLines = async (
  fileName: string
): Promise<string> => {
  const commandString = getChangesFileLinesCommand(fileName);

  return new Promise((resolve, reject) => {
    exec(commandString, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Failed to execute command. Error: ${error.message}`));
      } else if (stderr) {
        reject(new Error(`Command execution error: ${stderr}`));
      } else {
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
