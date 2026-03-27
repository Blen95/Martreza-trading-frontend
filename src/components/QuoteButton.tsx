import { useState } from "react";
import QuoteRequestModal from "./QuoteRequestForm";
import SignupModal from "./Authentication/SignUpForm";

interface Props {
  label?: string;
  productId?: number | null;
  itemName?: string;
}

export default function QuoteButton({
  label = "Request Quote",
  productId = null,
  itemName,
}: Props) {
  const [opened, setOpened] = useState(false);
  const [signupOpened, setSignupOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpened(true)}
        className="text-sm font-medium px-4 py-1.5 rounded-md
                   bg-gradient-to-br from-gray-100/60 via-gray-200/40 to-gray-100/60
                   backdrop-blur-md border border-gray-300/40
                   hover:shadow-sm hover:-translate-y-[1px]
                   transition-all duration-200"
      >
        {label}
      </button>

      <QuoteRequestModal
        opened={opened}
        onClose={() => setOpened(false)}
        productId={productId}
        itemName={itemName}
        onOpenSignup={() => setSignupOpened(true)}
      />

      <SignupModal
        opened={signupOpened}
        onClose={() => setSignupOpened(false)}
      />
    </>
  );
}