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
    const handleTitleToggle = () => {
        setShowTitle(prev => !prev)
    }
    const handleEditButton = () => {
        setEditTitle(true)
    }
    const handleCheckIcon = () => {
        setOldTitle(title)
        setEditTitle(false)
    }
    const handleCloseIcon = () => {
        setTitle(oldTitle)
        setEditTitle(false)
    }
    const handleInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setOldTitle(title)
            setEditTitle(false)
        }
        else if (e.key === "Escape") {
            setTitle(oldTitle)
            setEditTitle(false)
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
            <div ref={titleRef} style={{ minHeight: "10vh", display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                <ExpandLess color="error" style={{ position: "fixed", top: 0, left: 0 }} onClick={handleShowTitleToggle} />
                {!editTitle ?
                    <>
                        <span style={{ fontSize: "2rem" }}>{title}</span>
                        <sub><ModeEditIcon color="primary" onClick={handleEditButton} /></sub>
                    </>
                    :
                    <>
                        <CloseIcon color="error" onClick={handleCloseIcon}></CloseIcon>
                        <input value={title} onChange={handleTitleChange} onKeyDown={handleInputKey} />
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