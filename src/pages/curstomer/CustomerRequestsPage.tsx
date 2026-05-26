import { useEffect, useState } from "react";

import {
  fetchQuoteRequests
} from "../../services/api";
import type { QuoteRequest } from "../../services/api";
import {
  Loader,
} from "@mantine/core";

import RequestCard from "../../components/customer/RequestCard";

export default function CustomerRequestsPage() {

  const [requests, setRequests] =
    useState<QuoteRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const data =
          await fetchQuoteRequests();

        setRequests(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchData();

  }, []);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-8 py-6">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          My Requests
        </h1>

        <p className="text-gray-400 mt-1">
          Track your submitted requests
        </p>

      </div>

      {/* REQUESTS */}

      <div className="grid gap-6">

        {requests.map((request) => (

          <RequestCard
            key={request.id}
            request={request}
          />

        ))}

      </div>

    </div>
  );
}