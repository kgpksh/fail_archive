"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CaseEdit() {
  const editCase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("제출!");
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(values))
  }

  const formSchema = z.object({
    title: z.string()
      .min(1, { message: 'Title is required' })
      .max(20, { message: 'Can not over 20 characters' }),
    productType: z.string(),
    // launchedDate: z.date(),
    // closedDate: z.date()
    //   .nullable(),
    description: z.string().max(100, { message: 'Can not over 100 characters' })
  });



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <div className="items-center justify-items-center p-8 pb-20 w-1/2 font-[family-name:var(--font-geist-sans)]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productType"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Product type" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormDescription>
                  Tell us about your service and any reflections you have.
                </FormDescription>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
