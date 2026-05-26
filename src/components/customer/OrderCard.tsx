import type {
  Order,
} from "../../services/api";

import {
  Image as ImageIcon,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
}

export default function OrderCard({
  order,
}: Props) {

  const request =
    order.quote_request;

  return (

    <div className="rounded-3xl bg-white/5 border border-white/10 p-4 md:p-6 backdrop-blur-xl">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

        <div>

          <h2 className="text-xl md:text-2xl font-semibold">
            Order #{order.id}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Created on{" "}
            {new Date(
              order.created_at
            ).toLocaleDateString()}
          </p>

        </div>

        <StatusBadge
          status={order.status}
        />

      </div>

      {/* ================= ITEMS ================= */}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {request?.items?.map(
          (item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 overflow-hidden bg-black/20"
            >

              {/* ================= IMAGES ================= */}

              <div className="grid grid-cols-2 gap-1 bg-black/30">

                {/* FIRST IMAGE */}

                <div className="h-40 md:h-56">

                  {item.design_url ? (

                    <img
                      src={item.design_url}
                      alt={item.category}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="h-full flex items-center justify-center text-gray-500">
                      <ImageIcon />
                    </div>

                  )}

                </div>

                {/* SECOND IMAGE */}

                <div className="h-40 md:h-56">

                  {item.design2_url ? (

                    <img
                      src={item.design2_url}
                      alt={`${item.category} second`}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="h-full flex items-center justify-center text-gray-500">
                      <ImageIcon />
                    </div>

                  )}

                </div>

              </div>

              {/* ================= CONTENT ================= */}

              <div className="p-5 space-y-2">

                <h3 className="font-semibold text-lg">
                  {item.category}
                </h3>

                {item.brand && (

                  <p className="text-sm text-gray-300">
                    Brand: {item.brand}
                  </p>

                )}

                {item.size && (

                  <p className="text-sm text-gray-300">
                    Size: {item.size}
                  </p>

                )}

                <p className="text-sm text-gray-300">
                  Quantity:{" "}
                  {item.quantity}{" "}
                  {item.unit}
                </p>

              </div>

            </div>

          )
        )}

      </div>

      {/* ================= QUOTE DETAILS ================= */}

      <div className="mt-6 rounded-2xl bg-green-500/10 border border-green-500/20 p-5">

        <h3 className="font-semibold mb-4 text-lg">
          Quote Details
        </h3>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">

            <span className="text-gray-400">
              Quoted Price
            </span>

            <span className="font-semibold">
              ETB{" "}
              {request?.quoted_price}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">
              Initial Payment
            </span>

            <span className="font-semibold">
              ETB{" "}
              {
                request?.initial_payment
              }
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">
              Estimated Arrival
            </span>

            <span className="font-semibold">
              {
                request?.estimated_arrival
              }
            </span>

          </div>

        </div>

      </div>

      {/* ================= RECEIPTS ================= */}

      <div className="mt-6 rounded-2xl bg-black/20 border border-white/10 p-5">

        <h3 className="font-semibold mb-4 text-lg">
          Payment Receipts
        </h3>

        {order.receipts &&
        order.receipts.length >
          0 ? (

          <div className="space-y-3">

            {order.receipts.map(
              (receipt) => (

                <a
                  key={receipt.id}
                  href={receipt.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="font-medium">
                        Receipt #
                        {receipt.id}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Status:{" "}
                        {
                          receipt.status
                        }
                      </p>

                    </div>

                  </div>

                </a>

              )
            )}

          </div>

        ) : (

          <div className="text-sm text-gray-400">
            No receipts uploaded yet.
          </div>

        )}

      </div>

    </div>
  );
}