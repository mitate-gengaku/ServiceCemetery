import { Button } from "@/components/ui/button";

export const TopSection = () => (
  <div className="w-full md:w-1/2 px-4 md:px-10 py-16 md:py-8 gap-y-4 flex flex-col justify-center">
    <div className="space-y-1">
      <h2 className="text-4xl  font-cardo font-semibold tracking-tight text-center md:text-left">RIPro</h2>
      <h3 className="text-2xl font-semibold tracking-tight text-foreground text-center md:text-left">
        失敗も成功も、すべては財産
      </h3>
    </div>
    <p className="text-muted-foreground">
      終了したプロジェクトの記録と教訓を大切に保存するサービスです。成功も失敗も、すべての経験を組織の財産として継承し、次世代のプロジェクトに活かします。過去から学び、未来を創るため共有しましょう。
    </p>
    <Button className="bg-emerald-500 hover:bg-emerald-600">始める</Button>
  </div>
);
