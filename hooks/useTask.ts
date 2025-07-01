import { TaskContext } from "@/contexts";
import { useContext } from "react";

export default function useTask() {
	return useContext(TaskContext);
}
