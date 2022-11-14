import React, { MutableRefObject, useEffect } from "react";
import { Remote, wrap, releaseProxy } from "comlink";
import { WasmWorker } from "./worker";

export type ReplayParserClient = Remote<WasmWorker>;

interface ReplayParserState {
  rawWorker: Worker;
  worker: ReplayParserClient;
}

type ContextState = MutableRefObject<ReplayParserState | undefined>;

const ReplayParserContext = React.createContext<ContextState | undefined>(
  undefined
);

interface ReplayParserProviderProps {
  children: React.ReactNode;
}

export const ReplayParserProvider = ({
  children,
}: ReplayParserProviderProps) => {
  const workerRef = React.useRef<ReplayParserState>();

  useEffect(() => {
    async function effect() {
      const rawWorker = new Worker(new URL("./worker.ts", import.meta.url));
      const worker = wrap<WasmWorker>(rawWorker);
      workerRef.current = {
        worker,
        rawWorker,
      };
    }

    effect();

    return () => {
      if (workerRef.current) {
        workerRef.current.worker[releaseProxy]();
        workerRef.current.rawWorker.terminate();
        workerRef.current = undefined;
      }
    };
  }, []);

  return (
    <ReplayParserContext.Provider value={workerRef}>
      {children}
    </ReplayParserContext.Provider>
  );
};

export function useReplayParser() {
  const context = React.useContext(ReplayParserContext);
  if (context === undefined) {
    throw new Error(
      "useReplayParser must be used within a ReplayParserProvider"
    );
  }

  return React.useCallback(() => {
    if (context.current === undefined) {
      throw new Error("Replay parser is undefined");
    }
    return context.current.worker;
  }, [context.current]);
}
