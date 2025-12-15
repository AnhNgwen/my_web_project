import { Card, Typography } from "antd";
import Image from "next/image";

const { Title, Paragraph } = Typography;

export default function ChallengeProblemCard() {
  return (
    <Card
      className="max-w-5xl mx-auto rounded-2xl shadow-lg"
      bodyStyle={{ padding: 24 }}
    >
      {/* Header */}
      <div className="mb-4">
        <Title level={4} className="!mb-1 !text-sky-600">
          Challenge Problem
        </Title>
        <Title level={5} className="!mt-0 !mb-0 font-normal !text-sky-600">
          Truck trailer scheduling for transporting containers
        </Title>
      </div>

      {/* Illustration */}
      <div className="my-6 flex justify-center">
        <div className="relative w-full max-w-3xl h-[260px]">
          <Image
            src="/images/challenge-logistics.png"
            alt="Truck trailer scheduling diagram"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Description */}
      <Paragraph className="text-gray-700">
        In the field of logistics and supply chain management, transporting
        goods between ports and warehouses is essential, and this is done using
        containers. Customers place requests for moving goods either from
        warehouses to ports or between different warehouses. In this process,
        trucks, trailers, and containers are distinct entities. Here is how the
        process typically includes:
      </Paragraph>

      {/* Steps */}
      <ol className="list-decimal pl-6 space-y-2 text-gray-700">
        <li>A truck goes to a depot to pick up a trailer.</li>
        <li>
          The truck with trailer attached (truck-trailer) heads to another depot
          to collect an empty container.
        </li>
        <li>
          The truck-trailer proceeds to a warehouse to load goods into the
          container.
        </li>
        <li>
          Once loaded, the truck-trailer transports the container (one or two)
          with goods loaded, to another warehouse or port. Upon arrival, the
          container is unloaded using specialized equipment.
        </li>
        <li>
          If this equipment is unavailable, the trailer (with the container
          still on it) is detached from the truck. The truck (or truck-trailer)
          will continue to travel for servicing other requests.
        </li>
      </ol>
    </Card>
  );
}
