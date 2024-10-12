import { createClient } from "@/utils/supabase/server";
import CaseEditor from "../caseEditor";
import { DefaultValue, TAGS } from "../edittingType";

export default async function EditCase({ id }: { id: number }) {
    const { data, error } = await createClient()
        .from('fail_cases')
        .select(`
                title,
                tags,
                started_date,
                ended_date,
                description
            `)
        .eq('fail_cases.id', id)
        .single()

    const defaultvalue : DefaultValue = {
        title : data?.title,
        [TAGS]: data?.tags,
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