// src/pages/stockmanager/InventoryPage.tsx

import { useEffect, useState } from "react";

import {
  Button,
  Loader,
} from "@mantine/core";

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/api";

import type {
  Product,
} from "../../services/api";

import InventoryStats from "../../components/Inventory/InventoryStats";

import InventoryTable from "../../components/Inventory/InventoryTable";

import ProductModal from "../../components/Inventory/ProductModal";

export default function InventoryPage() {

  // ================= STATE ================= //

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [opened, setOpened] =
    useState(false);

  const [editOpened, setEditOpened] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  // ================= FORM ================= //

  const [name, setName] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [origin, setOrigin] =
    useState("");

  const [quantity, setQuantity] =
    useState(0);

  const [unit, setUnit] =
    useState("pcs");

  const [minimumStock, setMinimumStock] =
    useState(5);

  const [price, setPrice] =
    useState(0);

  // ================= LOAD ================= //

  const loadProducts =
    async () => {

      try {

        setLoading(true);

        const data =
          await fetchProducts();

        setProducts(data || []);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {
    loadProducts();
  }, []);

  // ================= RESET ================= //

  const resetForm = () => {

    setName("");

    setCategory("");

    setOrigin("");

    setQuantity(0);

    setUnit("pcs");

    setMinimumStock(5);

    setPrice(0);
  };

  // ================= CREATE ================= //

  const handleCreate =
    async () => {

      try {

        await createProduct({
          name,
          category,
          origin,
          quantity,
          unit,
          minimum_stock:
            minimumStock,
          price,
        });

        setOpened(false);

        resetForm();

        loadProducts();

      } catch (error) {

        console.error(error);

      }
    };

  // ================= EDIT ================= //

  const openEditModal = (
    product: Product
  ) => {

    setEditingProduct(product);

    setName(product.name);

    setCategory(
      product.category || ""
    );

    setOrigin(
      product.origin || ""
    );

    setQuantity(
      product.quantity
    );

    setUnit(
      product.unit || "pcs"
    );

    setMinimumStock(
      product.minimum_stock
    );

    setPrice(
      Number(product.price) ||
        0
    );

    setEditOpened(true);
  };

  const handleUpdate =
    async () => {

      if (!editingProduct)
        return;

      try {

        await updateProduct(
          editingProduct.id,
          {
            name,
            category,
            origin,
            quantity,
            unit,
            minimum_stock:
              minimumStock,
            price,
          }
        );

        setEditOpened(false);

        setEditingProduct(null);

        resetForm();

        loadProducts();

      } catch (error) {

        console.error(error);

      }
    };

  // ================= DELETE ================= //

  const handleDelete =
    async (
      id: number
    ) => {

      try {

        await deleteProduct(id);

        loadProducts();

      } catch (error) {

        console.error(error);

      }
    };

  // ================= FILTER ================= //

  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        product.sku
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // ================= LOADING ================= //

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  // ================= UI ================= //

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-white">

            Inventory

          </h1>

          <p className="text-gray-400">

            Manage products and stock

          </p>

        </div>

        <Button
          onClick={() =>
            setOpened(true)
          }
        >
          Add Product
        </Button>

      </div>

      <InventoryStats
        products={products}
      />

      <InventoryTable
        products={
          filteredProducts
        }
        search={search}
        setSearch={setSearch}
        onEdit={
          openEditModal
        }
        onDelete={
          handleDelete
        }
      />

      {/* CREATE */}

      <ProductModal
        opened={opened}
        onClose={() =>
          setOpened(false)
        }
        title="Add Product"
        submitLabel="Save Product"
        onSubmit={
          handleCreate
        }
        name={name}
        setName={setName}
        category={category}
        setCategory={
          setCategory
        }
        origin={origin}
        setOrigin={setOrigin}
        quantity={quantity}
        setQuantity={
          setQuantity
        }
        unit={unit}
        setUnit={setUnit}
        minimumStock={
          minimumStock
        }
        setMinimumStock={
          setMinimumStock
        }
        price={price}
        setPrice={setPrice}
      />

      {/* EDIT */}

      <ProductModal
        opened={editOpened}
        onClose={() =>
          setEditOpened(false)
        }
        title="Edit Product"
        submitLabel="Update Product"
        onSubmit={
          handleUpdate
        }
        name={name}
        setName={setName}
        category={category}
        setCategory={
          setCategory
        }
        origin={origin}
        setOrigin={setOrigin}
        quantity={quantity}
        setQuantity={
          setQuantity
        }
        unit={unit}
        setUnit={setUnit}
        minimumStock={
          minimumStock
        }
        setMinimumStock={
          setMinimumStock
        }
        price={price}
        setPrice={setPrice}
      />

    </div>
  );
}