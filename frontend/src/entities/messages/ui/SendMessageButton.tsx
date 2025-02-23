import { LoaderCircle, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

const SendMessageButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="group absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
    >
      {pending ? (
        <LoaderCircle className="animate-spin mx-auto" />
      ) : (
        <Send className="w-6 h-6 text-white group-hover:text-emerald-500 group-hover:scale-110 active:scale-90" />
      )}
    </button>
  );
};

export default SendMessageButton;
