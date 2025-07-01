import { Button } from "@/components/ui/button";
import useTask from "@/hooks/useTask";
import { cn } from "@/lib/utils";
import { TTask } from "@/types";
import { Loader2Icon, StarsIcon, Trash2 } from "lucide-react";
import TaskModal from "./TaskModal";

type TaskProps = {
	task: TTask;
};

export default function TaskCard({ task }: TaskProps) {
	const taskReducer = useTask();
	const { id, title, status, description, dueDate } = task;
	return (
		<div className="border px-5 py-3 rounded-md">
			<div className="flex justify-between items-center">
				<div className="flex gap-2">
					<div
						className={cn(
							"size-3 rounded-full mt-2",
							status === "completed" && "bg-green-500",
							status === "pending" && "bg-yellow-500"
						)}
					></div>
					<div>
						<h1>
							<span className="font-bold">Title:</span> {title}
						</h1>
						<p>
							<span className="font-bold">Description:</span> {description}
						</p>
						<p>
							<span className="font-bold">DueDate:</span>{" "}
							{dueDate.toLocaleDateString()}
						</p>
						<Button variant={"outline"} color="bg-green-500" className="mt-5">
							<Loader2Icon className="animate-spin" />
							Suggest Subtasks
							<StarsIcon />
						</Button>
					</div>
				</div>
				<div className="flex gap-3 items-center">
					<TaskModal id={id} action="update" />

					<Button
						title="Delete Task"
						onClick={() =>
							taskReducer?.taskDispatch({
								type: "DELETE_TASK",
								payload: id,
							})
						}
						variant={"link"}
						className="p-0 text-red-500"
					>
						<Trash2 />
					</Button>
				</div>
			</div>
		</div>
	);
}
