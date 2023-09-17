import { JobTable } from "@/components/JobTable";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="mx-auto md:max-w-[1000px] rounded-md">
        <JobTable />
      </div>
    </main>
  );
}
