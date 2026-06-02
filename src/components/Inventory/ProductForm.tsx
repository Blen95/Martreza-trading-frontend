// src/components/inventory/ProductForm.tsx

import {
  TextInput,
  NumberInput,
  Select,
} from "@mantine/core";

import { finishingCategories } from "../../data/finishingCategories";

interface Props {
  name: string;
  setName: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  origin: string;
  setOrigin: (value: string) => void;

  quantity: number;
  setQuantity: (value: number) => void;

  unit: string;
  setUnit: (value: string) => void;

  minimumStock: number;
  setMinimumStock: (
    value: number
  ) => void;

  price: number;
  setPrice: (value: number) => void;
}

export default function ProductForm({
  name,
  setName,
  category,
  setCategory,
  origin,
  setOrigin,
  quantity,
  setQuantity,
  unit,
  setUnit,
  minimumStock,
  setMinimumStock,
  price,
  setPrice,
}: Props) {
  const defaultUnits: Record<
    string,
    string
  > = {
    Paint: "liter",
    Tiles: "m²",
    Cement: "bag",
    Steel: "kg",
    Doors: "pcs",
    Windows: "pcs",
    Plumbing: "pcs",
    Electrical: "pcs",
  };

  return (
    <div className="space-y-4">
      <TextInput
        label="Product Name"
        value={name}
        onChange={(e) =>
          setName(
            e.currentTarget.value
          )
        }
      />

      {/* CATEGORY */}

      <Select
        label="Category"
        placeholder="Select category"
        searchable
        data={finishingCategories.map(
          (cat) => ({
            value: cat.name,
            label: cat.name,
          })
        )}
        value={category}
        onChange={(value) => {
          const selected =
            value || "";

          setCategory(selected);

          // Auto-select sensible unit
          if (
            selected &&
            defaultUnits[selected]
          ) {
            setUnit(
              defaultUnits[selected]
            );
          }
        }}
      />

      <TextInput
        label="Origin"
        placeholder="e.g. China, Turkey, Italy"
        value={origin}
        onChange={(e) =>
          setOrigin(
            e.currentTarget.value
          )
        }
      />

      <NumberInput
        label="Quantity"
        min={0}
        value={quantity}
        onChange={(v) =>
          setQuantity(Number(v))
        }
      />

      {/* UNIT */}

      <Select
        label="Unit"
        value={unit}
        onChange={(v) =>
          setUnit(v || "pcs")
        }
        data={[
          {
            value: "pcs",
            label: "Pieces (pcs)",
          },
          {
            value: "kg",
            label: "Kilograms (kg)",
          },
          {
            value: "ton",
            label: "Tons (ton)",
          },
          {
            value: "bag",
            label: "Bags",
          },
          {
            value: "box",
            label: "Boxes",
          },
          {
            value: "roll",
            label: "Rolls",
          },
          {
            value: "sheet",
            label: "Sheets",
          },
          {
            value: "m",
            label: "Meters (m)",
          },
          {
            value: "m²",
            label: "Square Meters (m²)",
          },
          {
            value: "liter",
            label: "Liters",
          },
          {
            value: "set",
            label: "Sets",
          },
        ]}
      />

      <NumberInput
        label="Minimum Stock"
        min={0}
        value={minimumStock}
        onChange={(v) =>
          setMinimumStock(
            Number(v)
          )
        }
      />

      <NumberInput
        label="Price (ETB)"
        min={0}
        thousandSeparator=","
        value={price}
        onChange={(v) =>
          setPrice(Number(v))
        }
      />
    </div>
  );
}