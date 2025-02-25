import { useEffect } from "react";
import toast from "react-hot-toast";

interface FormFieldProps {
  error?: string;
  type: string;
  placeholder: string;
  name: string;
  label: string;
}

const minSymbols = {
  username: 2,
  password: 5,
  fullName: 5,
  confirmPassword: 5,
};
const maxSymbols = {
  username: 20,
  password: 30,
  fullName: 20,
  confirmPassword: 30,
};

const FormField = ({ error, type, placeholder, name, label }: FormFieldProps) => {

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 5000, position: "top-center", icon: "🚫" });
    }
  }, [error]);


  return (
    <div className="flex flex-col pb-6 relative">
      <div className="flex flex-col gap-2">
        <label className="label">
          <span className="label-text uppercase">
            {label} <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={`peer w-full input h-10 rounded-lg invalid:[&:not(:placeholder-shown)]:border-red-500 valid:border-green-400 ${
            error ? "input-error" : "input-bordered"
          }`}
          name={name}
          required
          minLength={minSymbols[name as keyof typeof minSymbols]}
          maxLength={maxSymbols[name as keyof typeof maxSymbols]}
        />
        <p className="absolute bottom-0 left-1/2 w-full transform -translate-x-1/2 text-xs hidden text-sm text-white peer-[&:not(:placeholder-shown):invalid]:block first-letter:uppercase">
          {name}: {minSymbols[name as keyof typeof minSymbols]}-{maxSymbols[name as keyof typeof maxSymbols]} chars
        </p>
      </div>
    </div>
  );
};

export default FormField;
