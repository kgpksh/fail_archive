"use client"

import { Button } from "@/components/ui/button";
import React from "react";

export default function CaseEdit() {
    const editCase = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("제출!");
    };

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <form onSubmit={editCase}>
            <Button>제출</Button>
        </form>
      </div>
    );
  }
  