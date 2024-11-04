import { parseAsBoolean, useQueryState } from "nuqs"

export const useCreateWorkspaceModal = ()=>{
    const [isOpen,setIsOpen] = useQueryState(
        "create-workspace",
        parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true})
    )

    return {
        isOpen,
        setIsOpen,
        toggle : ()=> {
            setIsOpen(!isOpen)
        },
        close : ()=> {
            setIsOpen(false)
        },
        open : ()=> {
            setIsOpen(true)
        }
    }
}