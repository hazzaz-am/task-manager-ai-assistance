"use client"

import { TAction, TInitialState } from "@/reducers/taskReducer";
import { createContext } from "react";

type ContextType = {
	taskState: TInitialState;
	taskDispatch: React.Dispatch<TAction>;
};

export const TaskContext = createContext<ContextType | null>(null);
