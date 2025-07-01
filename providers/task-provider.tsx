"use client"

import { TaskContext } from "@/contexts";
import { initialState, taskReducer } from "@/reducers/taskReducer";
import { ReactNode, useReducer } from "react";

export default function TaskProvider({ children }: { children: ReactNode }) {
	const [taskState, taskDispatch] = useReducer(taskReducer, initialState);

	return (
		<TaskContext.Provider value={{ taskState, taskDispatch }}>
			{children}
		</TaskContext.Provider>
	);
}
