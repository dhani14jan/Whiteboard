import { useEffect, useState } from "react"
import Board from "./Board"
import EditableTitle from "./EditableTitle"

const Whiteboard = (props: any) => {

    return (
        <div style={{ padding: "1rem", width: "100%", height: "100%", position: "relative" }}>
            <EditableTitle></EditableTitle>
            <Board width={window.innerWidth * 0.95} height={window.innerHeight * 0.9}></Board>
        </div>
    )
}

export default Whiteboard