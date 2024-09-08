"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns"
import { z } from "zod";

export default function CaseEdit() {
  const titleMaxLength = 50
  const descriptionLength = 1000

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(values))
  }

  const formSchema = z.object({
    title: z.string()
      .min(1, { message: 'Title is required' })
      .max(titleMaxLength, { message: 'Can not over 20 characters' }),
    productType: z.string().min(1, { message: 'Proudct type is required' }),
    productPeriod: z.object({
      from: z.date(),
      to: z.date().optional()
    }),
    description: z.string().min(1, { message: 'Dscription is required' }).max(descriptionLength, { message: 'Can not over 500 characters' })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <div className="items-center justify-items-center p-8 pb-20 min-w-[800px] w-1/2 font-[family-name:var(--font-geist-sans)]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title" className="text-2xl">Title</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="Title"
                    maxLength={titleMaxLength}
                    {...field} />
                </FormControl>
                <div className="ml-1">{field.value ? field.value.length : 0} / {titleMaxLength}</div>
              </FormItem>
            )}
          />

          <div className="flex mt-5 space-x-4">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Product type</FormLabel>
                  <FormControl>
                    <Input placeholder="Product type" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productPeriod"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Product period</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[400px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value?.from ? (
                            format(field.value.from, "PPP") + " - " +
                            (field.value.to ? format(field.value.to, "PPP") : "continuing")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={(range) => field.onChange(range)}
                        captionLayout="dropdown"
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Description</FormLabel>
                <FormDescription>
                  Tell us about your service and any reflections you have.
                </FormDescription>
                <FormControl>
                  <Textarea
                    className="resize-none h-[300px]"
                    maxLength={descriptionLength}
                    {...field}
                  />
                </FormControl>
                <div className="ml-1">{field.value ? field.value.length : 0} / {descriptionLength}</div>
              </FormItem>
            )}
          />
          <Button className="mt-5">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
