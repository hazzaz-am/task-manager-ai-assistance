import { TTask } from "@/types";

export type TInitialState = {
	tasks: TTask[];
};

export type AddTaskType = Pick<
	TTask,
	"title" | "description" | "status" | "dueDate"
>;
type EditTaskType = {
	id: string;
	task: Partial<AddTaskType>;
};

export type TAction =
	| { type: "ADD_TASK"; payload: AddTaskType }
	| { type: "EDIT_TASK"; payload: EditTaskType }
	| { type: "DELETE_TASK"; payload: string };

export const initialState: TInitialState = {
	tasks: [],
};

export const taskReducer = (state: TInitialState, action: TAction) => {
	switch (action.type) {
		case "ADD_TASK": {
			const id = crypto.randomUUID();
			const task = {
				...action.payload,
				id,
			};

			return {
				...state,
				tasks: [...state.tasks, task],
			};
		}

		case "EDIT_TASK": {
			const updateTask = state.tasks.map((task) => {
				if (task.id === action.payload.id) {
					return {
						...task,
						...action.payload.task,
					};
				} else {
					return task;
				}
			});

			return {
				...state,
				tasks: [...updateTask],
			};
		}
		case "DELETE_TASK": {
			const filteredTasks = state.tasks.filter(
				(task) => task.id !== action.payload
			);
			return {
				...state,
				tasks: [...filteredTasks],
			};
		}

		default:
			return state;
	}
};
