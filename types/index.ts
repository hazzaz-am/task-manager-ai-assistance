export type TTask = {
	id: string;
	title: string;
	description: string;
	status: "pending" | "completed";
	dueDate: Date;
};
