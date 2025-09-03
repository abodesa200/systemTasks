import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  trigger?: React.ReactNode;
  isLoading?: boolean;
  variant?: "default" | "destructive" | "outline";
  size?: "sm" | "default" | "lg" | "icon";
}

export function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete this item.",
  confirmText = "Delete",
  cancelText = "Cancel",
  trigger,
  isLoading = false,
  variant = "destructive",
  size = "default",
}: DeleteDialogProps) {
  const [isInternalOpen, setIsInternalOpen] = useState(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? open : isInternalOpen;
  const setIsOpen = isControlled ? onOpenChange : setIsInternalOpen;

  const handleConfirm = () => {
    onConfirm();
    if (!isControlled) {
      setIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      {trigger && (
        <Button
          variant={variant}
          size={size}
          onClick={() => setIsOpen(true)}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          {size !== "icon" && trigger}
        </Button>
      )}

      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent className="bg-card border-2 border-destructive max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-destructive/20">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <AlertDialogTitle className="text-destructive">
                {title}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// مكون مساعد لاستخدامه في الجداول والقوائم
export function DeleteButton({
  onConfirm,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  variant = "destructive",
  size = "icon",
  className = "",
}: Omit<DeleteDialogProps, "trigger" | "open" | "onOpenChange"> & {
  className?: string;
}) {
  return (
    <DeleteDialog
      onConfirm={onConfirm}
      title={title}
      description={description}
      confirmText={confirmText}
      cancelText={cancelText}
      isLoading={isLoading}
      variant={variant}
      size={size}
      trigger={
        <span className={className}>
          <Trash2 className="h-4 w-4" />
        </span>
      }
    />
  );
}
