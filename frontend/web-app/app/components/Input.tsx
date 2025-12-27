import { HelperText, Label, TextInput } from "flowbite-react";
import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps;

export default function Input(props: Props) {
  const { field, fieldState } = useController({ ...props });
  return (
    <div className="mb-3 block">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label
            htmlFor={field.name}
            className="text-sm sm:text-base font-semibold text-gray-700"
          >
            {props.label}
          </Label>
        </div>
      )}
      <TextInput
        {...props}
        {...field}
        value={field.value || ""}
        type={props.type || "text"}
        color={
          fieldState?.error ? "failure" : !fieldState?.isDirty ? "" : "success"
        }
        placeholder={props.label}
        className="rounded-xl border-2 focus:ring-0 focus:border-blue-500 transition-colors"
        style={{
          borderColor: fieldState?.error
            ? "#ef4444"
            : !fieldState?.isDirty
            ? "#d1d5db"
            : "#22c55e",
        }}
      />
      <HelperText color="failure">{fieldState?.error?.message}</HelperText>
    </div>
  );
}
