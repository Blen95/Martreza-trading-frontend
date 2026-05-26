import { useEffect, useState } from "react";

import {
  Card,
  SimpleGrid,
  Text,
  Loader,
  Badge,
} from "@mantine/core";

import {
  fetchProducts,
  fetchLowStockProducts,
} from "../services/api";

import type {
  Product,
} from "../services/api";

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
      (sum, p) =>
        sum + p.quantity,
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

    <div className="p-4 md:p-8 space-y-8 text-white">

      {/* ================= HEADER ================= */}

      <div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">

          Stock Manager Dashboard

        </h1>

        <p className="text-gray-300 mt-2 text-sm md:text-base">

          Inventory overview and stock monitoring

        </p>

        <div className="mt-6 h-px bg-white/10" />

      </div>

      {/* ================= STATS ================= */}

      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 4,
        }}
        spacing="lg"
      >

        {/* TOTAL PRODUCTS */}

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >

          <Text
            size="sm"
            className="text-gray-300"
          >
            Total Products
          </Text>

          <Text
            fw={800}
            className="text-white text-3xl mt-2"
          >
            {totalProducts}
          </Text>

        </Card>

        {/* TOTAL UNITS */}

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >

          <Text
            size="sm"
            className="text-gray-300"
          >
            Total Units
          </Text>

          <Text
            fw={800}
            className="text-white text-3xl mt-2"
          >
            {Intl.NumberFormat(
              "en"
            ).format(totalUnits)}
          </Text>

        </Card>

        {/* LOW STOCK */}

        <Card
          padding="lg"
          radius="xl"
          className="bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-xl shadow-xl"
        >

          <Text
            size="sm"
            className="text-yellow-100"
          >
            Low Stock Products
          </Text>

          <Text
            fw={800}
            className="text-yellow-300 text-3xl mt-2"
          >
            {lowStock.length}
          </Text>

        </Card>

        {/* OUT OF STOCK */}

        <Card
          padding="lg"
          radius="xl"
          className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl shadow-xl"
        >

          <Text
            size="sm"
            className="text-red-100"
          >
            Out of Stock
          </Text>

          <Text
            fw={800}
            className="text-red-400 text-3xl mt-2"
          >
            {outOfStock}
          </Text>

        </Card>

      </SimpleGrid>

      {/* ================= LOW STOCK LIST ================= */}

      <Card
        padding="lg"
        radius="xl"
        className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
      >

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div>

            <h2 className="text-xl md:text-2xl font-semibold text-white">

              Low Stock Alerts

            </h2>

            <p className="text-sm text-gray-400 mt-1">

              Products that need restocking soon

            </p>

          </div>

          <Badge
            color="red"
            size="lg"
            radius="xl"
          >
            {lowStock.length} Items
          </Badge>

        </div>

        {/* EMPTY */}

        {lowStock.length === 0 ? (

          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center">

            <p className="text-green-300 font-medium">

              All inventory levels look good

            </p>

            <p className="text-sm text-gray-400 mt-2">

              No low stock products detected.

            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {lowStock.map(
              (product) => (

                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-black/20 border border-white/10 p-5 hover:bg-white/[0.07] transition"
                >

                  {/* LEFT */}

                  <div>

                    <h3 className="font-semibold text-white text-lg">

                      {product.name}

                    </h3>

                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">

                      {product.category && (
                        <span>
                          Category:{" "}
                          {
                            product.category
                          }
                        </span>
                      )}

                      {product.sku && (
                        <span>
                          SKU:{" "}
                          {product.sku}
                        </span>
                      )}

                    </div>

                  </div>

                  {/* RIGHT */}

                  <Badge
                    color="red"
                    size="lg"
                    radius="xl"
                    variant="filled"
                  >

                    {product.quantity} left

                  </Badge>

                </div>

              )
            )}

          </div>

        )}

      </Card>

    </div>
  );
}