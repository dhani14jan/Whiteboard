import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const EditableTitle = (props: any) => {
    const [showTitle, setShowTitle] = useState(true)
    const [editTitle, setEditTitle] = useState(false)
    const [title, setTitle] = useState((props.default ? props.default : "Your Whiteboard!"))
    const [oldTitle, setOldTitle] = useState((props.default ? props.default : "Your Whiteboard!"))
    const titleRef = useRef(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const cancelAction = () => {
        setTitle(oldTitle)
        setEditTitle(false)
    }
    const applyAction = () => {
        setOldTitle(title)
        setEditTitle(false)
        document.title = title
    }

    const handleTitleToggle = () => {
        setShowTitle(prev => !prev)
    }
    const handleEditButton = () => {
        setEditTitle(true)
    }
    const handleCheckIcon = () => {
        applyAction()
    }
    const handleCloseIcon = () => {
        cancelAction()
    }
    const handleInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            applyAction()
        }
        else if (e.key === "Escape") {
            cancelAction()
        }
    }
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleShowTitleToggle = () => {
        setShowTitle(prev => !prev)
    }

    if (showTitle) {
        return (
            <div ref={titleRef} style={{ minHeight: "5vh", padding: "1rem", textAlign: "center", verticalAlign: "middle" }}>
                <ExpandLess color="error" style={{ position: "fixed", top: 0, left: 0 }} onClick={handleShowTitleToggle} />
                {!editTitle ?
                    <>
                        <span style={{ fontSize: "2rem" }}>{title}</span>
                        <sub><ModeEditIcon color="primary" onClick={handleEditButton} /></sub>
                    </>
                    :
                    <>
                        <CloseIcon color="error" onClick={handleCloseIcon}></CloseIcon>
                        <input autoFocus={true} value={title} ref={inputRef} onChange={handleTitleChange} onKeyDown={handleInputKey} />
                        <CheckIcon color="primary" onClick={handleCheckIcon}></CheckIcon>
                    </>
                }

            </div>
        )
    }
    else return (
        <ExpandMore style={{ position: "fixed", top: 0, left: 0 }} onClick={handleShowTitleToggle} />
    )
}

export default EditableTitle