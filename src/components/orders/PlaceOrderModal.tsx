import {
  Modal,
  Button,
  FileInput,
} from "@mantine/core";

import { useState } from "react";

import type {
  QuoteRequest,
} from "../../services/api";

import { placeOrder } from "../../services/api";

import { notifications } from "@mantine/notifications";

interface Props {
  opened: boolean;

  onClose: () => void;

  request: QuoteRequest | null;
}

export default function PlaceOrderModal({
  opened,
  onClose,
  request,
}: Props) {
  const [receiptFile, setReceiptFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handlePlaceOrder =
    async () => {
      if (!request || !receiptFile)
        return;

      try {
        setLoading(true);

        await placeOrder(
          request.id,
          receiptFile
        );

        notifications.show({
          color: "green",
          title: "Order Submitted",
          message:
            "Receipt uploaded successfully.",
        });

        setReceiptFile(null);

        onClose();
      } catch (err) {
        console.error(err);

        notifications.show({
          color: "red",
          title: "Failed",
          message:
            "Could not submit order.",
        });
      } finally {
        setLoading(false);
      }
    };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      title="Complete Payment"
    >
      <div className="space-y-5">
        {/* ORDER SUMMARY */}

        <div className="rounded-xl bg-gray-100 p-4 text-black">
          <h3 className="font-semibold mb-3">
            Order Summary
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>
                Total Quote
              </span>

              <span>
                ETB{" "}
                {
                  request?.quoted_price
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Initial Payment
              </span>

              <span>
                ETB{" "}
                {
                  request?.initial_payment
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Estimated Arrival
              </span>

              <span>
                {
                  request?.estimated_arrival
                }
              </span>
            </div>
          </div>
        </div>

        {/* BANKS */}

        <div>
          <h3 className="font-semibold mb-3">
            Bank Transfer Instructions
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            Please transfer the
            required payment amount
            and upload your receipt.
          </p>

          <div className="space-y-3">
            {/* CBE */}

            <div className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Commercial Bank
                  of Ethiopia
                </p>

                <p className="text-sm text-gray-500">
                  1000123456789
                </p>
              </div>

              <img
                src="/banks/cbe.png"
                alt="CBE"
                className="w-14 h-14 object-contain"
              />
            </div>

            {/* AWASH */}

            <div className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Awash Bank
                </p>

                <p className="text-sm text-gray-500">
                  0112233445566
                </p>
              </div>

              <img
                src="/banks/awash.png"
                alt="Awash"
                className="w-14 h-14 object-contain"
              />
            </div>

            {/* DASHEN */}

            <div className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Dashen Bank
                </p>

                <p className="text-sm text-gray-500">
                  9988776655
                </p>
              </div>

              <img
                src="/banks/dashen.png"
                alt="Dashen"
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>
        </div>

        {/* RECEIPT */}

        <FileInput
          label="Upload Receipt"
          placeholder="Choose receipt"
          accept="image/png,image/jpeg,application/pdf"
          value={receiptFile}
          onChange={setReceiptFile}
        />

        <Button
          fullWidth
          color="green"
          loading={loading}
          disabled={!receiptFile}
          onClick={handlePlaceOrder}
        >
          Submit Order
        </Button>
      </div>
    </Modal>
  );
}