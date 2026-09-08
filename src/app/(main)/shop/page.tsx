import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ShopPage from "@/components/layout/pages/shop/ShopPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <ShopPage />
    </Suspense>
  );
}

