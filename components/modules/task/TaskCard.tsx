import { Button } from "@/components/ui/button";
import useTask from "@/hooks/useTask";
import { TTask } from "@/types";
import { Trash2 } from "lucide-react";
import TaskModal from "./TaskModal";
import { ResultPopup } from "./ResultPopup";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type TaskProps = {
	task: TTask;
};

export default function TaskCard({ task }: TaskProps) {
	const taskReducer = useTask();
	const { id, title, status, description, dueDate } = task;

	return (
		<div className="border px-5 py-3 rounded-md">
			<div className="flex justify-between items-center flex-wrap gap-3">
				<div className="flex gap-2">
					<div>
						<div className="flex items-center gap-2 flex-wrap-reverse">
							<h1 className="font-bold">Title:</h1> {title}
							{status === "pending" ? (
								<Badge
									variant="secondary"
									className="bg-yellow-500 text-white dark:bg-yellow-600"
								>
									Pending
								</Badge>
							) : (
								<Badge
									variant="secondary"
									className="bg-green-500 text-white dark:bg-green-600"
								>
									Completed
								</Badge>
							)}
						</div>
						<p>
							<span className="font-bold">Description:</span> {description}
						</p>
						<p>
							<span className="font-bold">DueDate:</span>{" "}
							{dueDate && format(dueDate, "PPP")}
						</p>
						<ResultPopup title={title} description={description} />
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
