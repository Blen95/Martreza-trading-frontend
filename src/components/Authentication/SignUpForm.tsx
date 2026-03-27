import {
  Modal,
  TextInput,
  PasswordInput,
  Stack,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function SignupModal({ opened, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await registerUser(form);
      localStorage.setItem("token", res.token);
      onClose();
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.errors?.email?.[0] || "Registration failed"
      );
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 6,
      }}
      classNames={{
  content:
    "bg-gradient-to-br from-[#0B1C2D]/90 via-[#0F2438]/90 to-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl text-white",
}}
    >
      <Stack>
        <h2 className="text-xl font-semibold text-gray-900">
          Create Account
        </h2>

        {error && <Notification color="red">{error}</Notification>}

        <TextInput
          placeholder="Name"
          radius="md"
          classNames={{
  input:
    "bg-white/10 text-white placeholder:text-gray-400 border border-white/20 focus:border-white focus:ring-1 focus:ring-white/30",
}}
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.currentTarget.value })
          }
        />

        <TextInput
          placeholder="Email"
          radius="md"
          classNames={{
  input:
    "bg-white/10 text-white placeholder:text-gray-400 border border-white/20 focus:border-white focus:ring-1 focus:ring-white/30",
}}
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.currentTarget.value })
          }
        />

        <PasswordInput
          placeholder="Password"
          radius="md"
          classNames={{
  input:
    "bg-white/10 text-white placeholder:text-gray-400 border border-white/20 focus:border-white focus:ring-1 focus:ring-white/30",
}}
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.currentTarget.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="mt-2 w-full text-sm font-medium text-white py-2 rounded-md
                     bg-gradient-to-br from-gray-800 to-black
                     hover:opacity-90 transition"
        >
          Register
        </button>
      </Stack>
    </Modal>
  );
}