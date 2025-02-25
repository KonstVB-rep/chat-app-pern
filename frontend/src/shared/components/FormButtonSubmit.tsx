import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

interface FormButtonSubmitProps {
  title: string;
}

const FormButtonSubmit = ({ title }: FormButtonSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full text-center bg-blue-500 cursor-pointer touch:active:bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 group-invalid:pointer-events-none group-invalid:opacity-50"
    >
      {pending ? (
        <LoaderCircle className="animate-spin mx-auto color" />
      ) : (
        title
      )}
    </button>
  );
};

export default FormButtonSubmit;
