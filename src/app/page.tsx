import { JobTable } from "@/components/JobTable";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div>
        <JobTable />
      </div>
    </main>
  );
}
