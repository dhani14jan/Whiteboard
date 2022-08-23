import React, { LegacyRef, MouseEvent, useEffect, useRef, useState } from 'react'

const Board = (props: { width: number, height: number }) => {
    const divRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [lineWidth, setLineWidth] = useState(1)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const [isPainting, setIsPainting] = useState(false)

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        setIsPainting(true)

        if (context) {
            const offsetLeft = canvasRef?.current?.offsetLeft || 0
            const offsetTop = canvasRef?.current?.offsetTop || 0

            context.lineWidth = lineWidth
            context.lineCap = "round"
            context.lineTo(e.clientX - offsetLeft + window.scrollX, e.clientY - offsetTop + window.scrollY)
            context.stroke()
        }
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

            const offsetLeft = canvasRef?.current?.offsetLeft || 0
            const offsetTop = canvasRef?.current?.offsetTop || 0
            
            context.lineWidth = lineWidth
            context.lineCap = "round"
            context.lineTo(e.clientX - offsetLeft + window.scrollX, e.clientY - offsetTop + window.scrollY)
            context.stroke()
        }
    }

    useEffect(() => {
        if (canvasRef.current) {

            canvasRef.current.width = props.width? props.width : 1280
            canvasRef.current.height = props.height? props.height : 720
            console.log(canvasRef.current.width)
            console.log(canvasRef.current.height)
            console.log(props.width)
            console.log(props.height)
            const tempContext = canvasRef.current.getContext("2d")
            if (tempContext) {
                setContext(tempContext)
            }
        }
    }, [canvasRef, divRef])

    return (
        <div ref={divRef} style={{ width: "auto", height: "auto", textAlign: "center" }}>
            <canvas
                ref={canvasRef}
                style={{ border: "1px solid black", borderRadius: "2rem", width: props.width? props.width : 1280, height: props.height? props.height : 720 }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}


            ></canvas>

        </div>
    )
}

export default Board