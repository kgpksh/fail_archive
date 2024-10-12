import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ReadCase({ params: { id } }: { params: { id: string } }) {
    const supabase = createClient()
    const uuid = (await supabase.auth.getUser()).data.user?.id
    const { data, error } = await supabase
        .from('fail_cases')
        .select(`
                user_id,
                id,
                title,
                created_at,
                modified_at,
                tags,
                started_date,
                ended_date,
                description
            `)
        .eq('id', parseInt(id))
        .single()
    
    const isTagExists = data?.tags.length > 0
    console.log(uuid, data?.user_id)

    return (
        <div className="w-full h-full">
            <div className="flex justify-between">
                <div className="text-6xl font-bold">
                    {data?.title}
                </div>
                <div className="flex items-center">
                    {data?.modified_at ? data?.modified_at.slice(0, 10) : data?.created_at.slice(0, 10)}
                </div>
            </div>
            <div className="flex justify-between mt-10">
                <div className="w-1/4">
                    <div className="font-bold text-3xl">{isTagExists ? 'Tags' : 'No tags'}</div>
                    {isTagExists ?
                        <div className="border-2 rounded-xl mt-1">
                            {data?.tags.map((tag: string, index : number) => (
                                <Badge key={index} className="ml-2 my-2 bg-blue-400 cursor-pointer">{tag}</Badge>
                            ))}
                        </div>
                        :
                        ''
                    }
                </div>
                <div className="flex flex-col justify-center text-xl">
                    <div>
                        {`From ${data?.started_date.slice(0, 10)}`}
                    </div>
                    <div>
                        {data?.ended_date ? `To ${data.ended_date.slice(0, 10)}` : '~ Continuing'}
                    </div>
                    {
                        uuid === data?.user_id ?
                        <div className="flex justify-between">
                            <Link
                                href={{
                                    pathname:'/cases/edit',
                                    query: {
                                        
                                    }
                                }}
                                as={'/cases/edit'}
                            >
                                <Button>Modify</Button>
                            </Link>
                            
                            <Button>Delete</Button>
                        </div>
                        : ''
                    }
                    
                </div>
            </div>
            <div className="mt-10">
                <div className="text-3xl font-bold">Description</div>
                <div className="text-2xl mt-2">
                    {data?.description}
                </div>
            </div>
            
        </div>
    )
}