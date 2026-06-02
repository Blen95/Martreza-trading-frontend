// src/pages/StockManagerDashboard.tsx

import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";

import {
  fetchProducts,
  fetchLowStockProducts,
} from "../services/api";

import type { Product } from "../services/api";

import StatsCards from "../components/Stockdashboard/StatCards";
import LowStockSection from "../components/Stockdashboard/LowStockSection";
import OutOfStockSection from "../components/Stockdashboard/OutOfStockSection";

export default function StockManagerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [productsData] = await Promise.all([
          fetchProducts(),
        ]);

        setProducts(productsData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 text-white">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Stock Manager Dashboard
        </h1>
        <p className="text-gray-400">
          Inventory overview and stock monitoring
        </p>
      </div>

      {/* STATS */}
      <StatsCards products={products} />

      {/* OUT OF STOCK */}
      <OutOfStockSection products={products} />

      {/* LOW STOCK */}
      <LowStockSection products={products} />
    </div>
  );
}