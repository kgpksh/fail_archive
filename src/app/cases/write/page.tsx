import CaseEditor from "../caseEditor";
import { TAGS, Writing } from "../edittingType";

export default function WriteCase() {
    const defaultValue : Writing = {
        [TAGS] : []
    }
    return (
        <CaseEditor defaultValue={defaultValue} id={null}/>
    )
}