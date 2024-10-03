import { getTags } from "@/instrumentation";
import { NextRequest, NextResponse } from "next/server";
const MAX_RESULT_NUM = 10

export async function GET(req: NextRequest) {
    const word = req.nextUrl.searchParams.get('word')
    const searchingWord = word ? word : ""
    const TAGS = getTags();
    const response: string[] = TAGS.filter((tag: string) => tag.includes(searchingWord))
    return NextResponse.json(response.slice(0, MAX_RESULT_NUM))
}