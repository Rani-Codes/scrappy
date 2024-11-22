import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

export const InputFile = forwardRef<HTMLInputElement, { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }>(
  ({ onChange }, ref) => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture or PDF</Label>
        <Input
          id="picture"
          type="file"
          accept="image/*,application/pdf" // Allow all images and PDFs
          onChange={onChange}
          ref={ref} // Attach the ref for external control
        />
      </div>
    );
  }
);

InputFile.displayName = "InputFile"; // Required for forwardRef
