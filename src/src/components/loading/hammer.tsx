import { Hammer } from "@/components/icons/hammer";

export const LoadingHammer = () => (
  <div className="flex items-center justify-center relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden bg-white font-geist-sans">
    <div className="flex flex-col items-center justify-center gap-3">
      <Hammer className="size-5" />
      <p className="text-sm animate-pulse">ロード中…</p>
    </div>
  </div>
);
