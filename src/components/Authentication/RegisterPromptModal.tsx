import { Modal, Stack, Text } from "@mantine/core";

interface Props {
  opened: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export default function RegisterPromptModal({
  opened,
  onClose,
  onRegister,
}: Props) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 8,
      }}
      classNames={{
        content:
          "bg-gradient-to-br from-[#0B1C2D]/95 via-[#0F2438]/95 to-[#111827]/95 backdrop-blur-xl border border-white/10 rounded-2xl text-white shadow-2xl",
        body: "p-8",
      }}
    >
      <Stack align="center" gap="md">
        {/* SUCCESS ICON */}

        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/30">
          <span className="text-3xl text-green-400">
            ✓
          </span>
        </div>

        {/* SUCCESS MESSAGE */}

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            Quote Request Submitted!
          </h2>

          <Text className="text-gray-300 mt-2 text-sm leading-relaxed">
            Your request has been received successfully.
            Our team will contact you shortly.
          </Text>
        </div>

        {/* REGISTER PROMPT */}

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full">
          <Text className="text-center text-sm text-gray-300 leading-relaxed">
            Create an account to track your quote
            requests, receive updates, and manage
            future orders more easily.
          </Text>
        </div>

        {/* ACTIONS */}

        <div className="flex gap-3 mt-2 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-white/15 text-gray-300 hover:bg-white/10 transition"
          >
            Maybe Later
          </button>

          <button
            onClick={onRegister}
            className="flex-1 py-2.5 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Create Account
          </button>
        </div>
      </Stack>
    </Modal>
  );
}