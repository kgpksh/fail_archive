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
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { format } from "date-fns"
import { z } from "zod";
import { Badge } from "@/components/ui/badge";

const titleMaxLength = 50
const descriptionLength = 800
const tagMaxLength = 15
const TAGS = 'TAGS'
const maxTagNum = 10

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(50, { message: "Can not over 50 characters" }),
  [TAGS]: z.array(z.object(
    { tag: z.string().min(1, { message: "Each product type must be at least 1 character" }).max(10) }
  )),
  productPeriod: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  description: z.string().min(1, { message: "Description is required" }).max(800, { message: "Can not over 800 characters" }),
});

export default function CaseEdit() {
  const [currentTag, setCurrentTag] = useState<string>("");
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(values))
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { TAGS: [] }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "TAGS"
  });

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
          <FormField
            control={form.control}
            name="productPeriod"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-5">
                <FormLabel className="text-2xl">Product period</FormLabel>
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

          <FormField
            control={form.control}
            name={TAGS}
            render={({ field }) => (
              <FormItem className="flex flex-col mt-5">
                <FormLabel className="text-2xl">Product tags</FormLabel>
                <div className="flex">
                  <Input
                    value={currentTag}
                    onChange={tag => setCurrentTag(tag.target.value)}
                    placeholder="Tag"
                    className="w-1/2"
                    maxLength={tagMaxLength}
                  />
                  <Button
                    type="button"
                    className="ml-3"
                    disabled={fields.length >= maxTagNum || currentTag?.length < 1}
                    onClick={() => {
                        if(currentTag?.length < 1) {
                          return
                        }
                        append({ tag: currentTag })
                        setCurrentTag("")
                      }
                    }
                  >
                    Add tag
                  </Button>
                </div>
                <div className="ml-1">{currentTag ? currentTag.length : 0} / {tagMaxLength}</div>
                
                
                <div className="w-full h-full border-2 rounded-xl">
                  <div className="flex justify-between p-2">
                    <div className="font-bold">Tags</div>
                    <div>{fields.length} / {maxTagNum}</div>
                  </div>
                  
                  {fields.map((tag, index) => (
                    <Badge className="ml-2 my-2 bg-blue-400 cursor-pointer" onClick={() => remove(index)}>{tag.tag} x</Badge>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="text-2xl">Description</FormLabel>
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
