interface CaseListItem {
    id: number,
    title: string,
    nickname: string,
    modified_at: string,
    created_at: string,
    tags: string[]
}

interface ReadingCase extends CaseListItem {
    started_date: Date,
    ended_date: Date,
    description: string
}

export type { CaseListItem, ReadingCase }