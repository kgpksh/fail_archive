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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/hooks/use-toast";
import { useDebouncedCallback } from 'use-debounce';
import { DefaultValue, Editing, formSchema, maxTagNum, tagMaxLength, TAGS, TITLE_MAX_LENGTH, DESCRIPTION_LENGTH } from "./edittingType";



export default function CaseEditor({ defaultValue, id }: { defaultValue: DefaultValue, id: number | null }) {
  const [currentTag, setCurrentTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([])
  const [sending, setSending] = useState<boolean>(false)
  const { toast } = useToast()
  const { push, refresh } = useRouter()
  const tagSearch = useDebouncedCallback(async (input) => {
    if (input?.length > 0) {
      try {
        const tagsRes = await fetch(`/searchTags/?word=${input}`);
        const calledTagsList = await tagsRes.json();
        setTagList(calledTagsList)
      } catch (error) {
      }
    } else if (input === null || input?.length === 0) {
      setTagList([])
    }
  }, 150)

  const createCase = async (values: Editing) => {
    const supabase = createClient()
    const data = {
      case_title: values.title,
      case_started_date: values.productPeriod.from,
      case_ended_date: values.productPeriod.to,
      case_description: values.description,
      tags: values[TAGS].map((tag) => tag.tag),
      case_user_id: (await supabase.auth.getUser()).data.user?.id
    }
    return await supabase.rpc('insert_tags_and_cases', data)
  }

  const editCase = async (values: Editing) => {
    const supabase = createClient()
    const data = {
      case_id: id,
      case_title: values.title,
      case_started_date: values.productPeriod.from,
      case_ended_date: values.productPeriod.to,
      case_description: values.description,
      case_tags: values[TAGS].map((tag) => tag.tag)
    }
    return await supabase.rpc('update_tags_and_cases', data)
  }

  const decideCreatingOrEditing = (values: Editing) => {
    if (id === null) {
      return createCase(values)
    } else {
      return editCase(values)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSending(true)

    const { data, error } = await decideCreatingOrEditing(values)
    console.log(data, error)
    if (data) {
      toast({
        title: "Edit complete"
      })
      push('/')
      refresh()
    } else {
      toast({
        variant: "destructive",
        title: "Something wrong happened",
        description: "Try again"
      })
      console.log(error)
      setSending(false)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "TAGS"
  });
  
  return (
    <div className="mx-auto p-8 pb-20 min-w-[800px] w-1/2 font-[family-name:var(--font-geist-sans)]">
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
                    maxLength={TITLE_MAX_LENGTH}
                    {...field} />
                </FormControl>
                <div className="ml-1">{field.value ? field.value.length : 0} / {TITLE_MAX_LENGTH}</div>
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
                      selected={
                        field.value ? { from: field.value.from, to: field.value.to ?? undefined } : undefined
                      }
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
                  <div className="w-3/4">
                    <div className="flex items-center">
                      <Input
                        value={currentTag}
                        onChange={
                          async (tag) => {
                            const input = tag.target.value
                            setCurrentTag(input)
                            tagSearch(input)
                          }
                        }
                        className="w-80"
                        placeholder="Tag"
                        maxLength={tagMaxLength}
                      />

                      <Button
                        type="button"
                        className="ml-3"
                        disabled={fields.length >= maxTagNum || currentTag?.length < 1 || fields.map((tag) => tag.tag).includes(currentTag)}
                        onClick={() => {
                          if (currentTag?.length < 1) {
                            return
                          }
                          append({ tag: currentTag })
                          setCurrentTag("")
                        }
                        }
                      >
                        Create tag
                      </Button>
                    </div>
                    <div className="ml-1">{currentTag ? currentTag.length : 0} / {tagMaxLength}</div>
                    <ScrollArea className="w-full h-32 rounded-md border p-4">
                      {(tagList.filter((duplicated) => !fields.map(appendedTag => appendedTag.tag).includes(duplicated))).map((tag) =>
                        <div
                          className={`w-full text-center ${fields.length < maxTagNum ? 'cursor-pointer bg-blue-300' : 'bg-gray-50'} mb-2`}
                          onClick={() => {
                            if (fields.length < maxTagNum) {
                              append({ 'tag': tag })
                            }
                          }}
                        >
                          {tag}
                        </div>
                      )}
                    </ScrollArea>
                  </div>

                  <div className="w-full h-48 border-2 rounded-xl ml-5">
                    <div className="flex justify-between p-2">
                      <div className="font-bold">Tags</div>
                      <div>{fields.length} / {maxTagNum}</div>
                    </div>

                    {fields.map((tag, index) => (
                      <Badge className="ml-2 my-2 bg-blue-400 cursor-pointer" onClick={() => remove(index)}>{tag.tag} x</Badge>
                    ))}
                  </div>
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
                    maxLength={DESCRIPTION_LENGTH}
                    {...field}
                  />
                </FormControl>
                <div className="ml-1">{field.value ? field.value.length : 0} / {DESCRIPTION_LENGTH}</div>
              </FormItem>
            )}
          />
          <Button className="mt-5" disabled={sending}>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
