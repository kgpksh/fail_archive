import { z } from "zod";

const TAGS = 'TAGS'
const tagMaxLength = 15
const maxTagNum = 10
const TITLE_MAX_LENGTH = 50
const DESCRIPTION_LENGTH = 2000

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(TITLE_MAX_LENGTH, { message: `Can not over ${TITLE_MAX_LENGTH} characters` }),
    [TAGS]: z.array(z.object(
      { tag: z.string().min(1, { message: "Each product type must be at least 1 character" }).max(tagMaxLength) }
    )).max(maxTagNum),
    productPeriod: z.object({
      from: z.preprocess(
        (input) => typeof input === 'string' ? new Date(input) : input,
        z.date()
      ),
      to: z.preprocess(
        (input) => {
          if (typeof input === 'string') {
            return new Date(input);  // ISO 형식의 문자열도 Date로 변환
          }
          return input === undefined ? null : input;
        },
        z.date().nullable()
      )
    }),
    description: z.string().min(1, { message: "Description is required" }).max(DESCRIPTION_LENGTH, { message: `Can not over ${DESCRIPTION_LENGTH} characters` }),
  });

interface Writing {
    [TAGS]: []
}

type Editing = z.infer<typeof formSchema>

type DefaultValue = Writing | Editing

export {TAGS, tagMaxLength, maxTagNum, formSchema, TITLE_MAX_LENGTH, DESCRIPTION_LENGTH}

export type {Writing, Editing, DefaultValue}