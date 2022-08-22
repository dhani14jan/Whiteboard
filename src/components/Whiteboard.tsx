import Board from "./Board"
import EditableTitle from "./EditableTitle"

const Whiteboard = (props: any) => {

    return (
        <div style={{ padding: "1rem", width: "100%", height: "100%" }}>
            <EditableTitle></EditableTitle>
            <Board></Board>
        </div>
    )
}

export default Whiteboard