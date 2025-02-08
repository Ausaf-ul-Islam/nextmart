import SuccessContainer from "@/components/SuccessContainer";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<Record<string, never>>; // Use Record<string, never> instead of {}
  searchParams: Promise<{ session_id: string | null }>;
}

const SuccessPage = async ({ searchParams }: PageProps) => {
  // Await the searchParams promise
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  return (
    <div>
      <SuccessContainer id={session_id} />
    </div>
  );
};

export default SuccessPage;
