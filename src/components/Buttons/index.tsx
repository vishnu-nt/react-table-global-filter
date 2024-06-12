import { ButtonHTMLAttributes } from "react";
import { BiLoaderAlt } from "react-icons/bi";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "filled";
  isLoading?: boolean;
}

const Button = ({ children, variant, isLoading, ...props }: Props) => {
  return (
    <button
      className={`px-4 py-2 ${
        variant === "outline"
          ? "text-primary underline"
          : "bg-primary hover:bg-primary-lite text-white rounded-md"
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <span className="flex"><BiLoaderAlt className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" /> loading</span> :children}
    </button>
  );
};

export default Button;
