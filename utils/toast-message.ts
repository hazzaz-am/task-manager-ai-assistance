import { toast } from "sonner";

export default function toastMessage(message: string) {
	return toast.error(message, {
    style: {
      background: "rgba(255, 0, 0, 0.6)",
    },
  });
}
