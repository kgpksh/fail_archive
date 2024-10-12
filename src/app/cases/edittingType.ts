import { z } from "zod";

const TAGS = 'TAGS'
const tagMaxLength = 15
const maxTagNum = 10

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(50, { message: "Can not over 50 characters" }),
    [TAGS]: z.array(z.object(
      { tag: z.string().min(1, { message: "Each product type must be at least 1 character" }).max(tagMaxLength) }
    )).max(maxTagNum),
    productPeriod: z.object({
      from: z.date(),
      to: z.preprocess(
        (input) => input === undefined ? null : input,  // undefined 값을 null로 변환
        z.date().nullable() // null을 허용
      )
    }),
    description: z.string().min(1, { message: "Description is required" }).max(800, { message: "Can not over 800 characters" }),
  });

interface Writing {
    [TAGS]: []
}

type Editing = z.infer<typeof formSchema>

type DefaultValue = Writing | Editing

export {TAGS, tagMaxLength, maxTagNum, formSchema}

export type {Writing, Editing, DefaultValue}