import React, { LegacyRef, MouseEvent, useEffect, useRef, useState } from 'react'

const Board = (props: any) => {
    const divRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [lineWidth, setLineWidth] = useState(1)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const [isPainting, setIsPainting] = useState(true)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        setIsPainting(true)
    }
    const handleMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        setIsPainting(false)
        context?.stroke()
        context?.beginPath()
    }
    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (context && isPainting) {
            console.log(`x: ${e.clientX}  y: ${e.clientY}`)
            console.log(`dw: ${divRef.current?.offsetWidth}  dh: ${divRef.current?.offsetHeight}`)
            console.log(`scroll: ${window.scrollY}`)
            console.log(`cw: ${canvasRef.current?.width}  ch: ${canvasRef.current?.height}`)
            context.lineWidth = lineWidth
            context.lineCap = "round"
            context.lineTo(e.clientX - offset.x + window.scrollX, e.clientY - offset.y + window.scrollY)
            context.stroke()
        }
    }

    useEffect(() => {
        if (canvasRef.current) {
            const offsetLeft = canvasRef.current.offsetLeft
            const offsetTop = canvasRef.current.offsetTop
            const divHeight = divRef.current?.offsetHeight
            const divWidth = divRef.current?.offsetWidth
            setOffset({ x: offsetLeft, y: offsetTop })
            canvasRef.current.width = divWidth || 1280
            canvasRef.current.height = divHeight || 720
            const tempContext = canvasRef.current.getContext("2d")
            if (tempContext) {
                setContext(tempContext)
            }
        }
    }, [canvasRef, divRef])

    return (
        <div ref={divRef} style={{width: "100%", height: "100%"}}>
            <canvas
                ref={canvasRef}
                style={{ border: "1px solid black", borderRadius: "2rem", width: "100%", height: "100%" }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}

            ></canvas>

        </div>
    )
}

export default Board