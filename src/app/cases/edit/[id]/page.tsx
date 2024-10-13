import { createClient } from "@/utils/supabase/server";
import CaseEditor from "../../caseEditor";
import { DefaultValue, TAGS } from "../../edittingType";

export default async function EditCase({ params: { id } }: { params: { id: number } }) {
    const { data, error } = await createClient()
        .from('fail_cases')
        .select(`
                id,
                title,
                tags,
                started_date,
                ended_date,
                description
            `)
        .eq('id', id)
        .single()

    const defaultvalue : DefaultValue = {
        title : data?.title,
        [TAGS]: data?.tags.map((tag : string) => ({tag : tag})),
        productPeriod : {
            from: data?.started_date,
            to: data?.ended_date
        },
        description: data?.description
    }

    return (
        <CaseEditor defaultValue={defaultvalue} id={id}/>
    )
}