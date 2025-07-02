"use client";

import useTask from "@/hooks/useTask";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

export default function Tasks() {
	const taskReducer = useTask();

	return (
		<div className="container mx-auto px-5 mt-20">
			<div className="flex items-center justify-between border-b py-5 flex-wrap gap-3">
				<h2>
					{taskReducer?.taskState?.tasks?.length &&
					taskReducer?.taskState?.tasks?.length > 1
						? `Total Tasks ${taskReducer?.taskState?.tasks.length}`
						: `Total Task ${taskReducer?.taskState?.tasks.length}`}
				</h2>
				<TaskModal action="add"/>
			</div>

			<div className="space-y-5 mt-5">
				{taskReducer?.taskState?.tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
}
