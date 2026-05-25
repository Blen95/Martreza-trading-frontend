import { useEffect, useState } from "react";

import {
  Card,
  SimpleGrid,
  Text,
  Loader,
  Badge,
} from "@mantine/core";

import { fetchProducts,fetchLowStockProducts } from "../services/api";

import type { Product } from "../services/api";

export default function StockManagerDashboard() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [lowStock, setLowStock] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ================= LOAD ================= //

  useEffect(() => {

    const load = async () => {

      try {

        const [
          productsData,
          lowStockData,
        ] = await Promise.all([
          fetchProducts(),
          fetchLowStockProducts(),
        ]);

        setProducts(productsData || []);

        setLowStock(lowStockData || []);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    load();

  }, []);

  // ================= STATS ================= //

  const totalProducts =
    products.length;

  const totalUnits =
    products.reduce(
      (sum, p) => sum + p.quantity,
      0
    );

  const outOfStock =
    products.filter(
      (p) => p.quantity <= 0
    ).length;

  // ================= LOADING ================= //

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  // ================= UI ================= //

  return (
    <div className="p-8 space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Stock Manager Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Inventory overview and stock monitoring
        </p>

      </div>

      {/* STATS */}

      <SimpleGrid
        cols={{
          base: 1,
          md: 2,
          lg: 4,
        }}
      >

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10"
        >
          <Text size="sm" c="dimmed">
            Total Products
          </Text>

          <Text
            size="2rem"
            fw={700}
          >
            {totalProducts}
          </Text>
        </Card>

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10"
        >
          <Text size="sm" c="dimmed">
            Total Units
          </Text>

          <Text
            size="2rem"
            fw={700}
          >
            {totalUnits}
          </Text>
        </Card>

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10"
        >
          <Text size="sm" c="dimmed">
            Low Stock Products
          </Text>

          <Text
            size="2rem"
            fw={700}
          >
            {lowStock.length}
          </Text>
        </Card>

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10"
        >
          <Text size="sm" c="dimmed">
            Out of Stock
          </Text>

          <Text
            size="2rem"
            fw={700}
          >
            {outOfStock}
          </Text>
        </Card>

      </SimpleGrid>

      {/* LOW STOCK LIST */}

      <Card
        padding="lg"
        radius="xl"
        className="bg-white/5 border border-white/10"
      >

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-semibold">
            Low Stock Alerts
          </h2>

          <Badge color="red">
            {lowStock.length} Items
          </Badge>

        </div>

        {lowStock.length === 0 ? (

          <p className="text-gray-400">
            No low stock products.
          </p>

        ) : (

          <div className="space-y-4">

            {lowStock.map((product) => (

              <div
                key={product.id}
                className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {product.category}
                  </p>

                </div>

                <Badge color="red">

                  {product.quantity} left

                </Badge>

              </div>

            ))}

          </div>

        )}

      </Card>

    </div>
  );
}