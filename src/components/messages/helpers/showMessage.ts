import { toast } from "@/components/ui/toast";

export function showMessage(
  success: boolean,
  successMessage: string,
  statusCode?: number,
  errorMessage?: string
) {
  toast({
    title: success ? "Success" : `Error: ${statusCode}`,
    description: success ? successMessage : errorMessage,
  });
}
