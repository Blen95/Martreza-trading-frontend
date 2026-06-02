// src/components/inventory/InventoryStats.tsx

import {
  Card,
  Text,
  SimpleGrid,
} from "@mantine/core";

import type {
  Product,
} from "../../services/api";

interface Props {
  products: Product[];
}

export default function InventoryStats({
  products,
}: Props) {
  const totalProducts =
    products.length;

  const lowStock =
    products.filter(
      (p) =>
        p.quantity > 0 &&
        p.quantity <=
          p.minimum_stock
    ).length;

  const outOfStock =
    products.filter(
      (p) => p.quantity <= 0
    ).length;

  const inventoryValue =
    products.reduce(
      (sum, p) =>
        sum +
        (p.price || 0) *
          p.quantity,
      0
    );

  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
        lg: 4,
      }}
    >
      <Card>
        <Text size="sm">
          Products
        </Text>

        <Text fw={700} size="xl">
          {totalProducts}
        </Text>
      </Card>

      <Card>
        <Text size="sm">
          Low Stock
        </Text>

        <Text fw={700} size="xl">
          {lowStock}
        </Text>
      </Card>

      <Card>
        <Text size="sm">
          Out Of Stock
        </Text>

        <Text fw={700} size="xl">
          {outOfStock}
        </Text>
      </Card>

      <Card>
        <Text size="sm">
          Inventory Value
        </Text>

        <Text fw={700} size="xl">
          ETB{" "}
          {inventoryValue.toLocaleString()}
        </Text>
      </Card>
    </SimpleGrid>
  );
}