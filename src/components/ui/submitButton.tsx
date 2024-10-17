"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600" disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
