import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const Canvas = (props: any) => {
    const [showTitle, setShowTitle] = useState(true)
    const [editTitle, setEditTitle] = useState(false)
    const [title, setTitle] = useState("Your Whiteboard!")
    const titleRef = useRef(null)
    const handleTitleToggle = () => {
        setShowTitle(prev => !prev)
    }
    const handleEditButton = () => {
        setEditTitle(true)
    }
    const handleEditEnter = () => {
        setEditTitle(false)
    }
    const handleInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") setEditTitle(false)
    }
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    return (
        <div style={{ padding: "1rem", width: "100%", height: "100%" }}>
            <h2 ref={titleRef} style={{ textAlign: "center" }}>{!editTitle ? title : <input value={title} onChange={handleTitleChange} onKeyDown={handleInputKey} />}<sub><ModeEditIcon color="primary" onClick={handleEditButton} /></sub></h2>
            <canvas style={{ border: "1px solid black", width: "100%", height: "100%", borderRadius: "2rem" }}></canvas>
        </div>
    )
}

export default Canvas