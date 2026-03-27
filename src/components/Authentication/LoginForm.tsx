import {
  Modal,
  TextInput,
  PasswordInput,
  Stack,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function LoginModal({ opened, onClose }: Props) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.token);
      onClose();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.errors?.email?.[0] || "Login failed");
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
    backgroundOpacity: 0.6,
    blur: 8,
  }}
  classNames={{
    content:
      "bg-gradient-to-br from-[#0B1C2D]/90 via-[#0F2438]/90 to-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl text-white",
    body: "p-6",
  }}
>
  <Stack>
    <h2 className="text-xl font-semibold text-white">
      Welcome Back
    </h2>

    {error && (
      <Notification color="red" radius="md">
        {error}
      </Notification>
    )}

    <TextInput
      placeholder="Email"
      radius="md"
      classNames={{
        input:
          "bg-white/10 text-white placeholder:text-gray-400 border-white/20 focus:border-white",
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
          "bg-white/10 text-white placeholder:text-gray-400 border-white/20 focus:border-white",
      }}
      value={form.password}
      onChange={(e) =>
        setForm({ ...form, password: e.currentTarget.value })
      }
    />

    <button
      onClick={handleSubmit}
      className="mt-2 w-full text-sm font-medium py-2 rounded-md
                 bg-white text-black
                 hover:bg-gray-200 transition"
    >
      Login
    </button>
  </Stack>
</Modal>
  );
}