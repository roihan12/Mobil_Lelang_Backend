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
        className={`rounded-lg w-full border border-gray-600 p-2.5 flex flex-col ${
          fieldState?.error
            ? "bg-red-50border-red-600 text-red-600"
            : !fieldState.invalid && fieldState.isDirty
            ? "bg-green-50 border-green-600 text-green-600"
            : ""
        }`}
      />
      {fieldState?.error && (
        <div className="text-red-500 text-sm">{fieldState?.error?.message}</div>
      )}
    </div>
  );
}
