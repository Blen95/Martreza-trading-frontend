// src/components/inventory/InventoryTable.tsx

import {
  Table,
  Button,
  Badge,
  TextInput,
} from "@mantine/core";

import type { Product } from "../../services/api";

interface Props {
  products: Product[];

  search: string;

  setSearch: (
    value: string
  ) => void;

  onEdit: (
    product: Product
  ) => void;

  onDelete: (
    id: number
  ) => void;
}

export default function InventoryTable({
  products,
  search,
  setSearch,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="space-y-4">

      {/* SEARCH */}

      <TextInput
        placeholder="Search by product name or SKU..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.currentTarget.value
          )
        }
      />

      {/* TABLE */}

      <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#13283D]">

        <Table
          verticalSpacing="md"
          horizontalSpacing="lg"
          className="text-white"
        >
          <Table.Thead className="bg-white/5">

            <Table.Tr>

              <Table.Th>
                Name
              </Table.Th>

              <Table.Th>
                SKU
              </Table.Th>

              <Table.Th>
                Category
              </Table.Th>

              <Table.Th>
                Origin
              </Table.Th>

              <Table.Th>
                Stock
              </Table.Th>

              <Table.Th>
                Price
              </Table.Th>

              <Table.Th>
                Status
              </Table.Th>

              <Table.Th>
                Actions
              </Table.Th>

            </Table.Tr>

          </Table.Thead>

          <Table.Tbody>

            {products.map(
              (product) => {

                const outOfStock =
                  product.quantity <= 0;

                const lowStock =
                  product.quantity > 0 &&
                  product.quantity <=
                    product.minimum_stock;

                return (

                  <Table.Tr
                    key={product.id}
                  >
                    <Table.Td>
                      {product.name}
                    </Table.Td>

                    <Table.Td>

                      <Badge
                        color="blue"
                        variant="light"
                      >
                        {product.sku}
                      </Badge>

                    </Table.Td>

                    <Table.Td>
                      {product.category ||
                        "-"}
                    </Table.Td>

                    <Table.Td>
                      {product.origin ||
                        "-"}
                    </Table.Td>

                    <Table.Td>

                      <div className="font-semibold">

                        {product.quantity}
                        {" "}
                        {product.unit}

                      </div>

                      <div className="text-xs text-gray-400">

                        Min:
                        {" "}
                        {
                          product.minimum_stock
                        }
                        {" "}
                        {product.unit}

                      </div>

                    </Table.Td>

                    <Table.Td>

                      {product.price ? (
                        <>
                          ETB{" "}
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </>
                      ) : (
                        "-"
                      )}

                    </Table.Td>

                    <Table.Td>

                      {outOfStock ? (

                        <Badge color="red">

                          Out Of Stock

                        </Badge>

                      ) : lowStock ? (

                        <Badge color="yellow">

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
                            onEdit(product)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="xs"
                          color="red"
                          variant="light"
                          onClick={() =>
                            onDelete(
                              product.id
                            )
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </Table.Td>

                  </Table.Tr>

                );
              }
            )}

          </Table.Tbody>

        </Table>

      </div>

    </div>
  );
}