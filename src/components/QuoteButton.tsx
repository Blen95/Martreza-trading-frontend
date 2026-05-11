// src/components/QuoteButton.tsx

import { useNavigate } from "react-router-dom";

interface Props {
  label?: string;
  itemCategory?: string;
}

export default function QuoteButton({
  label = "Request Quote",
  itemCategory,
}: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate(
          `/quote-request${
            itemCategory
              ? `?category=${encodeURIComponent(
                  itemCategory
                )}`
              : ""
          }`
        )
      }
      className="
        text-sm font-medium px-4 py-1.5 rounded-md
        bg-gradient-to-br
        from-gray-100/60
        via-gray-200/40
        to-gray-100/60
        backdrop-blur-md
        border border-gray-300/40
        hover:shadow-sm
        hover:-translate-y-[1px]
        transition-all duration-200
      "
    >
      {label}
    </button>
  );
}