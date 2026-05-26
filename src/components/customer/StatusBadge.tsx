import { Badge } from "@mantine/core";

interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {

  const getColor = () => {

    switch (status) {

      case "pending":
        return "yellow";

      case "contacted":
        return "blue";

      case "quoted":
        return "green";

      case "closed":
        return "gray";

      case "processing":
        return "blue";

      case "completed":
        return "green";

      case "cancelled":
        return "red";

      default:
        return "dark";
    }
  };

  return (
    <Badge
      color={getColor()}
      variant="light"
      size="lg"
    >
      {status}
    </Badge>
  );
}