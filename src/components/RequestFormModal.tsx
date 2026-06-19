import {
  Modal,
  TextInput,
  Select,
  Button,
  Stack,
} from "@mantine/core";

import {
  useEffect,
  useState,
} from "react";
import PhoneField from "../components/PhoneField";

import {
isValidPhoneNumber,
}
from
"react-phone-number-input";
import {
  submitProjectRequest,
  type RequestType,
} from "../services/api";

interface Props {
  opened: boolean;
  onClose: () => void;
  type?: RequestType;
}

export default function RequestFormModal({
  opened,
  onClose,
  type,
}: Props) {

  const [loading,
    setLoading] =
    useState(false);

  const [requestType,
    setRequestType] =
    useState<RequestType | null>(
      null
    );

  const [fullName,
    setFullName] =
    useState("");

  const [companyName,
    setCompanyName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [phone,
    setPhone] =
    useState("");

  useEffect(() => {
    if (type) {
      setRequestType(type);
    }
  }, [type]);
  const [
phoneError,

setPhoneError
]

=
useState("");

  const handleSubmit =
  async () => {

    setPhoneError("");

    if (!requestType) {
      return;
    }

    if (
      !phone ||
      !isValidPhoneNumber(
        phone
      )
    ) {

      setPhoneError(
        "Please enter a valid phone number"
      );

      return;
    }

    try {

      setLoading(
        true
      );

      await submitProjectRequest({

        full_name:
          fullName,

        company_name:
          companyName,

        email,

        phone,

        request_type:
          requestType,

      });

      alert(
        "Request submitted successfully"
      );

      setFullName("");

      setCompanyName("");

      setEmail("");

      setPhone("");

      setPhoneError("");

      onClose();

    } catch (
      error
    ) {

      console.log(
        error
      );

      alert(
        "Failed to submit"
      );

    } finally {

      setLoading(
        false
      );

    }
};

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      radius="lg"
      size="md"
      overlayProps={{
        backgroundOpacity:
          0.55,
        blur: 3,
      }}
      styles={{
        content: {
          background:
            "linear-gradient(to bottom right, #0F2438, #111827)",
          color:
            "white",
        },
      }}
      title={
        <span className="text-white font-bold text-lg">
          Project Request
        </span>
      }
    >

      <Stack>

        <TextInput
          label="Full Name"
          placeholder="Enter your name"
          required
          value={fullName}
          onChange={(e)=>
            setFullName(
              e.currentTarget.value
            )
          }
          styles={
            inputStyles
          }
        />

        <TextInput
          label="Company Name (Optional)"
          placeholder="Your company"
          value={companyName}
          onChange={(e)=>
            setCompanyName(
              e.currentTarget.value
            )
          }
          styles={
            inputStyles
          }
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e)=>
            setEmail(
              e.currentTarget.value
            )
          }
          styles={
            inputStyles
          }
        />

        <PhoneField
label="Phone Number"
value={phone}
onChange={setPhone}
error={phoneError}
/>

        <Select
          label="Request Type"
          value={requestType}
          onChange={(v)=>
            setRequestType(
              v as RequestType
            )
          }

          data={[
            {
              value:
                "sell_excess",
              label:
                "Sell Excess Materials",
            },
            {
              value:
                "consultation",
              label:
                "Request Consultation",
            },
            {
              value:
                "procurement",
              label:
                "Request International Procurement",
            },
            {
              value:
                "service",
              label:
                "Request Service",
            },
          ]}

          styles={
            inputStyles
          }
        />

        <Button
          size="md"
          radius="xl"
          loading={
            loading
          }
          className="
            bg-white
            text-black
            font-bold
            hover:bg-gray-200
            mt-4
          "
          onClick={
            handleSubmit
          }
        >
          Submit Request
        </Button>

      </Stack>

    </Modal>
  );
}

const inputStyles = {
  label: {
    color:
      "#E5E7EB",

    marginBottom:
      4,
  },

  input: {
    backgroundColor:
      "#1F2937",

    color:
      "white",

    border:
      "1px solid #374151",
  },
};