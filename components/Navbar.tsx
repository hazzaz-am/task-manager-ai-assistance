import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
	return (
		<nav className="shadow p-4 border-b">
			<div className="container mx-auto flex items-center justify-between">
				<h2>
					<span className="font-bold">Task</span>Manager
				</h2>
				<ModeToggle />
			</div>
		</nav>
	);
}
