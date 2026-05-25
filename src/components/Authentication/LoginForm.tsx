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

export default function LoginModal({
  opened,
  onClose,
}: Props) {

  // ================= STATE ================= //

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // ================= LOGIN ================= //

  const handleSubmit = async () => {

    try {

      setLoading(true);

      setError("");

      const res = await loginUser(form);

      // ================= SAVE AUTH ================= //

      localStorage.setItem(
        "token",
        res.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      onClose();

      // ================= ROLE REDIRECT ================= //

      if (res.user.role === "admin") {

  window.open(
    "/admin/dashboard",
    "_blank"
  );

} else if (
  res.user.role ===
  "stock_manager"
) {

  window.open(
    "/stock/dashboard",
    "_blank"
  );

} else if (
  res.user.role ===
  "customer"
) {

  window.open(
    "/dashboard",
    "_blank"
  );

} else {

  navigate("/");

}

    } catch (err: any) {

      setError(
        err.response?.data?.errors
          ?.email?.[0] ||
          "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  // ================= UI ================= //

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

        {/* HEADER */}

        <div>

          <h2 className="text-2xl font-semibold text-white">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Login to continue
          </p>

        </div>

        {/* ERROR */}

        {error && (

          <Notification
            color="red"
            radius="md"
          >
            {error}
          </Notification>

        )}

        {/* EMAIL */}

        <TextInput
          label="Email"
          placeholder="Enter your email"
          radius="md"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.currentTarget.value,
            })
          }
          classNames={{
            label: "text-white mb-1",

            input:
              "bg-white/10 text-white placeholder:text-gray-400 border-white/20 focus:border-white",
          }}
        />

        {/* PASSWORD */}

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          radius="md"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.currentTarget.value,
            })
          }
          classNames={{
            label: "text-white mb-1",

            input:
              "bg-white/10 text-white placeholder:text-gray-400 border-white/20 focus:border-white",
          }}
        />

        {/* BUTTON */}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 w-full text-sm font-medium py-3 rounded-lg
                     bg-white text-black
                     hover:bg-gray-200 transition
                     disabled:opacity-50"
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

      </Stack>

    </Modal>
  );
}