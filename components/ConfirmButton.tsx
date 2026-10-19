"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  message: string;
  className?: string;
  formAction?: string | ((formData: FormData) => void | Promise<void>);
};

export default function ConfirmButton({ children, message, className, formAction }: Props) {
  return (
    <button
      type="submit"
      className={className}
      formAction={formAction}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
