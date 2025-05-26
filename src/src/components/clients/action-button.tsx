import { Button } from "@/components/ui/button";
import { type ArchitectureState } from "@/types/architecture";
import { type Project } from "@/types/project";
import { cn } from "@/utils/cn";

interface ActionButtonsProps {
  state: ArchitectureState;
  isLoading: boolean;
  isComplete: boolean;
  authId: string;
  project: Project;
  onSave: () => void;
  onRegenerate: () => void;
  onGenerate: () => void;
}

export const ActionButtons = ({
  state,
  isLoading,
  isComplete,
  authId,
  project,
  onSave,
  onRegenerate,
  onGenerate,
}: ActionButtonsProps) => {
  const isOwner = authId === project.createdById;

  if (state === "none") {
    return (
      <div className="py-8 flex items-center justify-center flex-col gap-4">
        <Button
          type="button"
          className={cn(
            "bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer disabled:bg-emerald-500 disabled:opacity-100",
            isLoading ? "animate-pulse" : "",
          )}
          onClick={onGenerate}
          disabled={isLoading}
        >
          アーキテクチャ図を作成
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {state === "unsaved" && !isComplete && (
        <Button
          type="button"
          className={cn(
            "bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer disabled:bg-emerald-500 disabled:opacity-100",
            isLoading ? "animate-pulse" : "",
          )}
          disabled={isLoading}
          onClick={onSave}
        >
          保存する
        </Button>
      )}
      {(isOwner || state === "unsaved") && (
        <Button
          type="button"
          variant="secondary"
          className="cursor-pointer"
          disabled={isLoading}
          onClick={onRegenerate}
        >
          やり直す
        </Button>
      )}
    </div>
  );
};
