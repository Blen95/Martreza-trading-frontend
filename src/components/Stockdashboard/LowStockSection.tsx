// src/components/stock/LowStockSection.tsx

import { Card, Badge } from "@mantine/core";
import type { Product } from "../../services/api";

interface Props {
  products: Product[];
}

export default function LowStockSection({ products }: Props) {
  const lowStockProducts = products.filter(
    (p) => p.quantity > 0 && p.quantity <= p.minimum_stock
  );

  return (
    <Card className="bg-white/5 border border-white/10" p="lg" radius="xl">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Low Stock Alerts
          </h2>
          <p className="text-sm text-gray-400">
            Products that need restocking soon
          </p>
        </div>

        <Badge color="yellow" size="lg">
          {lowStockProducts.length} Items
        </Badge>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="text-center text-green-300 bg-green-500/10 p-6 rounded-xl">
          All inventory levels look good
        </div>
      ) : (
        <div className="space-y-4">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between bg-black/20 p-4 rounded-xl border border-white/10"
            >
              <div>
                <h3 className="text-white font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  {product.category} • {product.sku}
                </p>
              </div>

              <Badge color="yellow" size="lg">
                {product.quantity} {product.unit} left
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}