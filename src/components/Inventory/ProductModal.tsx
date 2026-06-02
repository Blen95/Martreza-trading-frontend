// src/components/inventory/ProductModal.tsx

import {
  Modal,
  Button,
} from "@mantine/core";

import ProductForm from "./ProductForm";

interface Props {
  opened: boolean;

  onClose: () => void;

  title: string;

  submitLabel: string;

  onSubmit: () => void;

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

export default function ProductModal(
  props: Props
) {
  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      title={props.title}
    >
      <ProductForm
        name={props.name}
        setName={props.setName}
        category={props.category}
        setCategory={
          props.setCategory
        }
        origin={props.origin}
        setOrigin={props.setOrigin}
        quantity={props.quantity}
        setQuantity={
          props.setQuantity
        }
        unit={props.unit}
        setUnit={props.setUnit}
        minimumStock={
          props.minimumStock
        }
        setMinimumStock={
          props.setMinimumStock
        }
        price={props.price}
        setPrice={props.setPrice}
      />

      <Button
        fullWidth
        mt="md"
        onClick={props.onSubmit}
      >
        {props.submitLabel}
      </Button>
    </Modal>
  );
}