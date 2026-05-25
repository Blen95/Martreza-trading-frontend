import { useEffect, useState } from "react";

import {
  Table,
  Button,
  Modal,
  TextInput,
  NumberInput,
  Loader,
  Badge,
} from "@mantine/core";

import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../services/api";

import type { Product } from "../../services/api";

export default function InventoryPage() {
  // ================= STATE ================= //

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  // CREATE MODAL
  const [opened, setOpened] = useState(false);

  // EDIT MODAL
  const [editOpened, setEditOpened] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  // FORM
  const [name, setName] = useState("");

  const [category, setCategory] =
    useState("");

  const [origin, setOrigin] =
    useState("");

  const [quantity, setQuantity] =
    useState(0);

  const [minimumStock, setMinimumStock] =
    useState(5);

  const [price, setPrice] =
    useState(0);

  // ================= FETCH PRODUCTS ================= //

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await fetchProducts();

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

  // ================= RESET FORM ================= //

  const resetForm = () => {

    setName("");

    setCategory("");

    setOrigin("");

    setQuantity(0);

    setMinimumStock(5);

    setPrice(0);
  };

  // ================= CREATE PRODUCT ================= //

  const handleCreate = async () => {
    try {

      await createProduct({
        name,
        category,
        origin,
        quantity,
        minimum_stock: minimumStock,
        price,
      });

      setOpened(false);

      resetForm();

      loadProducts();

    } catch (error) {

      console.error(error);

    }
  };

  // ================= OPEN EDIT ================= //

  const openEditModal = (
    product: Product
  ) => {

    setEditingProduct(product);

    setName(product.name || "");

    setCategory(product.category || "");

    setOrigin(product.origin || "");

    setQuantity(product.quantity || 0);

    setMinimumStock(
      product.minimum_stock || 5
    );

    setPrice(Number(product.price) || 0);

    setEditOpened(true);
  };

  // ================= UPDATE PRODUCT ================= //

  const handleUpdate = async () => {

    if (!editingProduct) return;

    try {

      await updateProduct(
        editingProduct.id,
        {
          name,
          category,
          origin,
          quantity,
          minimum_stock: minimumStock,
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

  const handleDelete = async (
    id: number
  ) => {

    try {

      await deleteProduct(id);

      loadProducts();

    } catch (error) {

      console.error(error);

    }
  };

  // ================= UI ================= //

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Inventory
          </h1>

          <p className="text-gray-400">
            Manage products and stock
          </p>

        </div>

        <Button
          onClick={() => setOpened(true)}
        >
          Add Product
        </Button>

      </div>

      {/* ================= TABLE ================= */}

      <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#13283D]">

        <Table
          verticalSpacing="md"
          horizontalSpacing="lg"
          className="text-white"
        >

          <Table.Thead className="bg-white/5">

            <Table.Tr>

              <Table.Th className="text-gray-300">
                Name
              </Table.Th>

              <Table.Th className="text-gray-300">
                Category
              </Table.Th>

              <Table.Th className="text-gray-300">
                Origin
              </Table.Th>

              <Table.Th className="text-gray-300">
                Quantity
              </Table.Th>

              <Table.Th className="text-gray-300">
                Price
              </Table.Th>

              <Table.Th className="text-gray-300">
                Status
              </Table.Th>

              <Table.Th className="text-gray-300">
                Actions
              </Table.Th>

            </Table.Tr>

          </Table.Thead>

          <Table.Tbody>

            {products.map((product) => {

              const lowStock =
                product.quantity <=
                product.minimum_stock;

              return (

                <Table.Tr
                  key={product.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >

                  <Table.Td>
                    {product.name}
                  </Table.Td>

                  <Table.Td className="text-gray-300">
                    {product.category}
                  </Table.Td>

                  <Table.Td className="text-gray-300">
                    {product.origin}
                  </Table.Td>

                  <Table.Td className="font-semibold">
                    {product.quantity}
                  </Table.Td>

                  <Table.Td>
                    ${product.price}
                  </Table.Td>

                  <Table.Td>

                    {lowStock ? (

                      <Badge color="red">
                        Low Stock
                      </Badge>

                    ) : (

                      <Badge color="green">
                        In Stock
                      </Badge>

                    )}

                  </Table.Td>

                  <Table.Td>

                    <div className="flex gap-2">

                      <Button
                        size="xs"
                        variant="light"
                        onClick={() =>
                          openEditModal(product)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        color="red"
                        size="xs"
                        variant="light"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        Delete
                      </Button>

                    </div>

                  </Table.Td>

                </Table.Tr>

              );
            })}

          </Table.Tbody>

        </Table>

      </div>

      {/* ================= CREATE MODAL ================= */}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Product"
      >

        <div className="space-y-4">

          <TextInput
            label="Name"
            value={name}
            onChange={(e) =>
              setName(e.currentTarget.value)
            }
          />

          <TextInput
            label="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.currentTarget.value)
            }
          />

          <TextInput
            label="Origin"
            value={origin}
            onChange={(e) =>
              setOrigin(e.currentTarget.value)
            }
          />

          <NumberInput
            label="Quantity"
            value={quantity}
            onChange={(v) =>
              setQuantity(Number(v))
            }
          />

          <NumberInput
            label="Minimum Stock"
            value={minimumStock}
            onChange={(v) =>
              setMinimumStock(Number(v))
            }
          />

          <NumberInput
            label="Price"
            value={price}
            onChange={(v) =>
              setPrice(Number(v))
            }
          />

          <Button
            fullWidth
            onClick={handleCreate}
          >
            Save Product
          </Button>

        </div>

      </Modal>

      {/* ================= EDIT MODAL ================= */}

      <Modal
        opened={editOpened}
        onClose={() =>
          setEditOpened(false)
        }
        title="Edit Product"
      >

        <div className="space-y-4">

          <TextInput
            label="Name"
            value={name}
            onChange={(e) =>
              setName(e.currentTarget.value)
            }
          />

          <TextInput
            label="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.currentTarget.value)
            }
          />

          <TextInput
            label="Origin"
            value={origin}
            onChange={(e) =>
              setOrigin(e.currentTarget.value)
            }
          />

          <NumberInput
            label="Quantity"
            value={quantity}
            onChange={(v) =>
              setQuantity(Number(v))
            }
          />

          <NumberInput
            label="Minimum Stock"
            value={minimumStock}
            onChange={(v) =>
              setMinimumStock(Number(v))
            }
          />

          <NumberInput
            label="Price"
            value={price}
            onChange={(v) =>
              setPrice(Number(v))
            }
          />

          <Button
            fullWidth
            onClick={handleUpdate}
          >
            Update Product
          </Button>

        </div>

      </Modal>

    </div>
  );
}