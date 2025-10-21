import { TributePage } from "@/src/ui/TributePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "In Loving Memory",
  description: "A tribute to the mother of the bride - Forever in our hearts",
};

export default function WeddingDetailsPage() {
  return (
    <div className="min-h-screen">
      <TributePage />
    </div>
  );
}
