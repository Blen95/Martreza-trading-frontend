// src/components/stock/StatsCards.tsx

import { Card, SimpleGrid, Text } from "@mantine/core";
import type { Product } from "../../services/api";

interface Props {
  products: Product[];
}

export default function StatsCards({ products }: Props) {
  const totalProducts = products.length;

  const totalUnits = products.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  const lowStock = products.filter(
    (p) => p.quantity > 0 && p.quantity <= p.minimum_stock
  ).length;

  const outOfStock = products.filter(
    (p) => p.quantity <= 0
  ).length;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
      <Card className="bg-white/5 border border-white/10" p="lg" radius="xl">
        <Text size="sm" c="dimmed">Total Products</Text>
        <Text fw={800} className="text-white text-3xl">
          {totalProducts}
        </Text>
      </Card>

      <Card className="bg-white/5 border border-white/10" p="lg" radius="xl">
        <Text size="sm" c="dimmed">Total Units</Text>
        <Text fw={800} className="text-white text-3xl">
          {Intl.NumberFormat("en").format(totalUnits)}
        </Text>
      </Card>

      <Card className="bg-yellow-500/10 border border-yellow-500/20" p="lg" radius="xl">
        <Text size="sm" className="text-yellow-100">
          Low Stock
        </Text>
        <Text fw={800} className="text-yellow-300 text-3xl">
          {lowStock}
        </Text>
      </Card>

      <Card className="bg-red-500/10 border border-red-500/20" p="lg" radius="xl">
        <Text size="sm" className="text-red-100">
          Out of Stock
        </Text>
        <Text fw={800} className="text-red-400 text-3xl">
          {outOfStock}
        </Text>
      </Card>
    </SimpleGrid>
  );
}