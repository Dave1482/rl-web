import { useCallback } from "react";
import { useReplayParser } from "@/features/worker";
import { useReplay } from "./replay-provider";
import { logError } from "@/utils/logError";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useFilePublisher() {
  const parser = useReplayParser();
  const { dispatch } = useReplay();

  return useCallback(
    async (file: File | string) => {
      try {
        dispatch({ kind: "start-parsing" });
        const data = await parser().parse(file);

        dispatch({ kind: "parsed-replay", ...data });
      } catch (ex) {
        logError(ex);
        dispatch({ kind: "parse-failed", error: getErrorMessage(ex) });
      }
    },
    [parser, dispatch]
  );
}
