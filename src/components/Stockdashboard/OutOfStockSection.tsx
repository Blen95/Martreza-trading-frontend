// src/components/stock/OutOfStockSection.tsx

import { Card, Badge } from "@mantine/core";
import type { Product } from "../../services/api";

interface Props {
  products: Product[];
}

export default function OutOfStockSection({ products }: Props) {
  const outOfStockProducts = products.filter(
    (p) => p.quantity <= 0
  );

  return (
    <Card className="bg-red-500/10 border border-red-500/20" p="lg" radius="xl">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Out of Stock
          </h2>
          <p className="text-sm text-gray-400">
            Needs immediate restocking
          </p>
        </div>

        <Badge color="red" size="lg">
          {outOfStockProducts.length} Items
        </Badge>
      </div>

      {outOfStockProducts.length === 0 ? (
        <div className="text-center text-green-300 bg-green-500/10 p-6 rounded-xl">
          No products are out of stock
        </div>
      ) : (
        <div className="space-y-4">
          {outOfStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between bg-black/20 p-4 rounded-xl border border-red-500/20"
            >
              <div>
                <h3 className="text-white font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  {product.category} • {product.sku}
                </p>
              </div>

              <Badge color="red" size="lg">
                Out of Stock
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}