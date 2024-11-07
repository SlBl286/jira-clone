import { parseAsBoolean, useQueryState } from "nuqs"

export const useCreateProjectModal = ()=>{
    const [isOpen,setIsOpen] = useQueryState(
        "create-project",
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