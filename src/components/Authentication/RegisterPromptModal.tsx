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
      overlayProps={{ backgroundOpacity: 0.6, blur: 8 }}
      classNames={{
        content:
          "bg-gradient-to-br from-[#0B1C2D]/90 via-[#0F2438]/90 to-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-xl text-white",
        body: "p-6",
      }}
    >
      <Stack align="center" gap="md">
        <h2 className="text-xl font-semibold text-center">
          Stay Updated on Your Request
        </h2>

        <Text className="text-gray-300 text-center text-sm">
          Create an account to track your quote, receive updates, and manage your
          requests easily.
        </Text>

        <div className="flex gap-3 mt-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 text-sm py-2 rounded-md border border-white/20 text-gray-300 hover:bg-white/10 transition"
          >
            Maybe Later
          </button>

          <button
            onClick={onRegister}
            className="flex-1 text-sm py-2 rounded-md bg-white text-black hover:bg-gray-200 transition"
          >
            Register
          </button>
        </div>
      </Stack>
    </Modal>
  );
}