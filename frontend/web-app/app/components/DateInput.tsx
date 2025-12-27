import { HelperText, Label, TextInput } from "flowbite-react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
} & UseControllerProps &
  DatePickerProps;

export default function DateInput(props: Props) {
  const { field, fieldState } = useController({ ...props });

  return (
    <div className="mb-3 block">
      <DatePicker
        {...props}
        {...field}
        selected={field.value}
        placeholderText={props.label}
        className={`rounded-xl w-full border-2 p-2.5 sm:p-3 flex flex-col text-sm sm:text-base transition-all focus:outline-none focus:ring-0 ${
          fieldState?.error
            ? "bg-red-50 border-red-600 text-red-600"
            : !fieldState.invalid && fieldState.isDirty
            ? "bg-green-50 border-green-600 text-green-600"
            : "bg-white border-gray-300 hover:border-blue-500"
        }`}
      />
      {fieldState?.error && (
        <div className="text-red-500 text-sm mt-1">
          {fieldState?.error?.message}
        </div>
      )}
    </div>
  );
}
