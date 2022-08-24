import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { Add, Brightness1 } from "@mui/icons-material"
import RemoveIcon from "@mui/icons-material/Remove"
import Toolbox from './Toolbox'

const Board = (props: { width: number, height: number }) => {
    const divRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [lineWidth, setLineWidth] = useState(2)
    const [strokeStyle, setStrokStyle] = useState("black")
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const [isPainting, setIsPainting] = useState(false)
    const [showSizeSlider, setShowSizeSlider] = useState(false);

    const draw = (e: MouseEvent<HTMLCanvasElement>) => {
        if (context) {
            const offsetLeft = canvasRef?.current?.offsetLeft || 0
            const offsetTop = canvasRef?.current?.offsetTop || 0

            context.lineWidth = lineWidth
            context.lineCap = "round"
            context.lineTo(e.clientX - offsetLeft + window.scrollX, e.clientY - offsetTop + window.scrollY)
            context.stroke()
        }
    }
    
    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        setIsPainting(true)
        draw(e)
    }
    const handleMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        setIsPainting(false)
        context?.stroke()
        context?.beginPath()
    }
    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (isPainting) {
            console.log(`x: ${e.clientX}  y: ${e.clientY}`)
            console.log(`dw: ${divRef.current?.offsetWidth}  dh: ${divRef.current?.offsetHeight}`)
            console.log(`scroll: ${window.scrollY}`)
            console.log(`cw: ${canvasRef.current?.width}  ch: ${canvasRef.current?.height}`)
            draw(e)
        }
    }

    const handleColorInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (context) {
            setStrokStyle(e.target.value)
            context.strokeStyle = e.target.value
        }
    }

    const handleSizeSlider = (e: ChangeEvent<HTMLInputElement>) => {
        setLineWidth(Number(e.target.value))
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

    const handleMouseEnter = () => {
        setShowSizeSlider(true)
    }

    const handleLeave = () => {
        setShowSizeSlider(false)
    }

    return (
        <div ref={divRef} style={{ width: "auto", height: "auto", textAlign: "center" }}>
            <canvas
                ref={canvasRef}
                style={{backgroundColor: "white", border: "1px solid black", borderRadius: "2rem", width: props.width? props.width : 1280, height: props.height? props.height : 720 }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            ></canvas>
            <Toolbox className="toolbox">
                <div style={{ position: "relative" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleLeave}>
                    {showSizeSlider && <><input type="range" min={1} max={10} value={lineWidth} step={1} onChange={handleSizeSlider} list="steplist"/>
                    <datalist id="steplist">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        </datalist>
                    </>}
                    <div>
                        <Brightness1 style={{ fontSize: lineWidth * 2, minWidth: "5px", color: strokeStyle }} />
                    </div>
                    <label style={{position: "absolute", left: 0, right: 0}}>{lineWidth}</label>
                </div>
                <div>
                    <input type="color" onChange={handleColorInput} />
                </div>
                <div>
                    Pen
                </div>
                <div>
                    Eraser
                </div>
                <div>
                    Clear
                </div>
            </Toolbox>
        </div>
    )
}

export default Board