"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "../../ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, EditIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import useTask from "@/hooks/useTask";
import { AddTaskType } from "@/reducers/taskReducer";

type ModalProps = {
	id?: string;
	action: "add" | "update";
};

export default function TaskModal({ id, action }: ModalProps) {
	const [open, setOpen] = useState(false);
	const taskReducer = useTask();
	let editableTask = taskReducer?.taskState?.tasks?.find(
		(task) => task.id === id
	);

	const form = useForm({
		defaultValues: {
			title: editableTask?.title || "",
			description: editableTask?.description || "",
			status: editableTask?.status || "",
			dueDate: editableTask?.dueDate || null,
		},
	});

	// Reset form values when modal opens or editableTask changes
	useEffect(() => {
		form.reset({
			title: editableTask?.title || "",
			description: editableTask?.description || "",
			status: editableTask?.status || "",
			dueDate: editableTask?.dueDate || null,
		});
	}, [open, editableTask]);

	const onSubmit: SubmitHandler<FieldValues> = (formValues) => {
		if (action === "update" && editableTask) {
			taskReducer?.taskDispatch({
				type: "EDIT_TASK",
				payload: {
					id: editableTask?.id,
					task: {
						...formValues,
					},
				},
			});
		} else {
			taskReducer?.taskDispatch({
				type: "ADD_TASK",
				payload: {
					...formValues,
				} as AddTaskType,
			});
		}

		setOpen(false);
		form.reset();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{action === "add" ? (
					<Button variant="outline">Add Task</Button>
				) : (
					<Button
						title="Update Task"
						variant={"link"}
						className="p-0 text-blue-500"
					>
						<EditIcon size={"15"} />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{action === "add" ? "Add Task" : "Update Task"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl className="w-full">
											<SelectTrigger>
												<SelectValue placeholder="Select Status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="pending">Pending</SelectItem>
											<SelectItem value="completed">Completed</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dueDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Due Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"pl-3 text-left font-normal",

														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												onSelect={field.onChange}
												captionLayout="dropdown"
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">{editableTask ? "Update" : "Add"}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
