import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CaseDeleteButton from "../../caseDeleteButton";

export default async function ReadCase({ params: { id } }: { params: { id: number } }) {
    const supabase = createClient()
    const uuid = (await supabase.auth.getUser()).data.user?.id

    const {data, error} = await supabase.rpc('read_fail_case', {fail_case_id: id})
    const result = data[0]
    const isTagExists = result?.tags.length > 0

    return (
        <div className="w-full h-full">
            <div className="flex justify-between">
                <div className="text-6xl font-bold">
                    {result?.title}
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                    <div>{result?.modified_at ? result?.modified_at.slice(0, 10) : result?.created_at.slice(0, 10)}</div>
                    <div>View: {result.view}</div>
                </div>
            </div>
            <div className="flex justify-between mt-10">
                <div className="w-1/4">
                    <div className="font-bold text-3xl">{isTagExists ? 'Tags' : 'No tags'}</div>
                    {isTagExists ?
                        <div className="border-2 rounded-xl mt-1">
                            {result?.tags.map((tag: string, index : number) => (
                                <Badge key={index} className="ml-2 my-2 bg-blue-400 cursor-pointer">{tag}</Badge>
                            ))}
                        </div>
                        :
                        ''
                    }
                </div>
                <div className="flex flex-col justify-center text-xl">
                    <div>
                        {`From ${result?.started_date.slice(0, 10)}`}
                    </div>
                    <div>
                        {result?.ended_date ? `To ${result.ended_date.slice(0, 10)}` : '~ Continuing'}
                    </div>
                    {
                        uuid === result?.user_id ?
                        <div className="flex justify-between">
                            <Link href={`/cases/edit/${id}`} >
                                <Button>Modify</Button>
                            </Link>
                            
                            <CaseDeleteButton id={id}/>
                        </div>
                        : ''
                    }
                    
                </div>
            </div>
            <div className="mt-10">
                <div className="text-3xl font-bold h-full">Description</div>
                <div className="text-2xl mt-2 whitespace-pre-wrap dangerouslySetInnerHTML={{ __html: data?.description }}">
                    {result?.description}
                </div>
            </div>
            
        </div>
    )
}