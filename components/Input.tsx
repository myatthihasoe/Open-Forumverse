import { InputProps } from "@/types/type.data";

export default function Input({
  placeholder,
  label,
  text,
  ...props
}: InputProps) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-bold text-white">{label}</label>
      )}
      <input
        {...props}
        type="text"
        className="bg-primary px-4 py-2 w-full rounded-md"
        placeholder={placeholder}
      />
      {text && <p className="my-1 text-xs text-gray-400">{text}</p>}
    </div>
  );
}
