import type {
  QuoteRequest,
} from "../../services/api";

import {
  Image as ImageIcon,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

interface Props {
  request: QuoteRequest;
}

export default function RequestCard({
  request,
}: Props) {

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl">

      {/* TOP */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-semibold">
            {request.items?.[0]?.category}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Submitted on{" "}
            {new Date(
              request.created_at
            ).toLocaleDateString()}
          </p>

        </div>

        <StatusBadge
          status={request.status}
        />

      </div>

      {/* ITEMS */}

      <div className="mt-6 grid md:grid-cols-2 gap-5">

        {request.items?.map(
          (item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 overflow-hidden"
            >

              {/* IMAGES */}

              <div className="grid grid-cols-2 gap-1 bg-black/30">

                <div className="h-48">

                  {item.design_url ? (

                    <img
                      src={item.design_url}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="h-full flex items-center justify-center text-gray-500">
                      <ImageIcon />
                    </div>

                  )}

                </div>

                <div className="h-48">

                  {item.design2_url ? (

                    <img
                      src={item.design2_url}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="h-full flex items-center justify-center text-gray-500">
                      <ImageIcon />
                    </div>

                  )}

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-5 space-y-2">

                <h3 className="font-semibold">
                  {item.category}
                </h3>

                {item.brand && (
                  <p className="text-sm text-gray-400">
                    Brand: {item.brand}
                  </p>
                )}

                {item.size && (
                  <p className="text-sm text-gray-400">
                    Size: {item.size}
                  </p>
                )}

                <p className="text-sm text-gray-400">
                  Quantity:{" "}
                  {item.quantity}{" "}
                  {item.unit}
                </p>

              </div>

            </div>

          )
        )}

      </div>

      {/* QUOTE DETAILS */}

      {request.status === "quoted" && (

        <div className="mt-6 rounded-2xl bg-green-500/10 border border-green-500/20 p-5">

          <h3 className="font-semibold mb-4">
            Quote Details
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">

              <span className="text-gray-400">
                Quoted Price
              </span>

              <span className="font-semibold">
                ETB {request.quoted_price}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Initial Payment
              </span>

              <span className="font-semibold">
                ETB {request.initial_payment}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Estimated Arrival
              </span>

              <span className="font-semibold">
                {request.estimated_arrival}
              </span>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}