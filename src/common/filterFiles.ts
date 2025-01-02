import { extname } from "path";
import { excludedKeywords, supportedFiles } from "../review/constants";
import { ReviewFile } from "./types";

export const filterFiles = (files: ReviewFile[]): ReviewFile[] => {
  const filteredFiles = files.filter((file) => {
    const ext = extname(file.fileName);

    return (
      supportedFiles.has(ext) &&
      ![...excludedKeywords].some((keyword) =>
        file.fileName.includes(keyword)
      ) &&
      file.changedLines.trim() !== ""
    );
  });

  return filteredFiles;
};
