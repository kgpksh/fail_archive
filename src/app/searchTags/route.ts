import { NextRequest, NextResponse } from "next/server";
const MAX_RESULT_NUM = 10
const DEV_TAGS: string[] = ['SaaS', 'Mobile', 'AI', 'asdf', 'sss', 'sadfs', 'ASDHFKALS','adsfkh', 'dsahfksadf', 'sadhfas', 'sadfh;',' dsahlkf', 'kkk', 'asfd']

export async function GET(req: NextRequest) {
    const word = req.nextUrl.searchParams.get('word')
    const searchingWord = word ? word : ""
    const response: string[] = DEV_TAGS.filter((tag: string) => tag.includes(searchingWord))
    return NextResponse.json(response.slice(0, MAX_RESULT_NUM))
}