import {
  Input,
} from "@mantine/core";

import PhoneInput from
  "react-phone-number-input";

import
  "react-phone-number-input/style.css";

interface Props {
  value: string;

  onChange: (
    value: string
  ) => void;

  label?: string;

  error?: string;
}

export default function PhoneField({
  value,
  onChange,
  label,
  error,
}: Props) {

  return (

    <div>

      {label && (
        <label
          className="
          text-sm
          text-gray-200
          mb-1
          block
        "
        >
          {label}
        </label>
      )}

      <PhoneInput
        international
        defaultCountry="ET"

        value={value}

        onChange={(v) =>
          onChange(
            v || ""
          )
        }

        inputComponent={
          Input
        }

        placeholder="Enter phone number"
      />

      {error && (

        <p
          className="
          text-red-400
          text-xs
          mt-1
        "
        >
          {error}
        </p>

      )}

    </div>

  );
}