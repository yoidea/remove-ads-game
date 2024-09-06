'use client'
import React from "react"
import Modal from "react-modal"
import { useTimer } from "react-timer-hook"
import { FormEvent, useState, useRef, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'


const hueBridgeIP = process.env.NEXT_PUBLIC_HUE_BRIDGE_IP
const hueUser = process.env.NEXT_PUBLIC_HUE_USER
const numberOfAds = 5
const skipSeconds = 2
const maxLife = 5
const defaultButtonSize = 20


export default function Create() {
    const modalStyleBase: ReactModal.Styles = {
        overlay: {
            touchAction: "none",
            pointerEvents: "none",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0)"
        },
        content: {
            marginTop: "10rem", 
            touchAction: "none",
            pointerEvents: "auto",
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "10px",
            fontSize: "6rem",
            display: "flex"
        }
    }
    const iconCloseStyle: React.CSSProperties = {
        fontSize: "2rem",
        position: "absolute",
        top: "0.5rem",
        right: "1rem",
        color: "white"
    }
    const iconSkipStyle: React.CSSProperties = {
        fontSize: "2rem",
        position: "absolute",
        width: "8em",
        top: "0.5rem",
        right: "1rem",
        color: "white",
        border: "white",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "4px"

    }
    const audioContextRef = useRef<AudioContext | null>(null)
    const audioBuffersRef = useRef<{[key: string]: AudioBuffer}>({})
    const BGMSourceRef = useRef<AudioBufferSourceNode | null>(null)
    const [countDestroy, setCountDestroy] = useState(0)
    const [countMistake, setCountMistake] = useState(0)
    const [life, setLife] = useState(maxLife)
    const [buttonSize, setButtonSize] = useState(defaultButtonSize)
    const [gameClear, setGameClear] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)
    const [pointer, setPointer] = useState([0, 0])
    const [pointerDisplay, setPointerDisplay] = useState<"flex"|"none">("none")
    const [modalsOpen, setModalsOpen] = useState<boolean[]>([...Array(numberOfAds)].fill(false))
    const [fullScreenAdOpen, setFullScreenAdOpen] = useState<boolean>(false)
    const [initialAdOpen, setInitialAdOpen] = useState<boolean>(true)
    const [fullScreenAdButtonText, setFullScreenAdButtonText] = useState("2秒後にスキップ")
    const [modalStyle, setModalStyle] = useState(modalStyleBase)
    const [modalsStyle, setModalsStyle] = useState([...Array(numberOfAds)].map(() => ({
        ...modalStyleBase,
        content: {
            ...modalStyleBase.content,
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 65}%`,
            background: `center / contain url('/ads/popup${Math.ceil(Math.random() * 20)}.webp')`
        }
    })))

    useEffect(() => {
        // 物理ボタン入力受付
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowLeft') {
                console.log("left")
            }
            if (e.code === 'ArrowRight') {
                console.log("right")
            }
        }
        // タップした場所にエフェクト
        window.addEventListener('keydown', handleKeyDown)
        const handleClick = (e: MouseEvent) => {
            setPointer([e.clientX, e.clientY])
            setPointerDisplay("flex")
            setTimeout(() => {
                setPointerDisplay("none")
            }, 250)
        }
        window.addEventListener('click', handleClick)
        // クライアントサイドでのみ AudioContext を初期化
        if (typeof window !== 'undefined') {
            const audioContext = new AudioContext()
            audioContextRef.current = audioContext
            BGMSourceRef.current = audioContextRef.current.createBufferSource()

            // 音声ファイルをフェッチして AudioBuffer にデコード
            fetch('/start.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.start = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/close1.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.close1 = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/close2.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.close2 = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/close3.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.close3 = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/close4.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.close4 = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/miss.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.miss = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/open.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.open = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/end.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.clear = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/bgm.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.bgm = data
                })
                .catch(error => console.error('Audio error', error))
            fetch('/bgm2.mp3')
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(data => {
                    audioBuffersRef.current.bgm2 = data
                })
                .catch(error => console.error('Audio error', error))
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
        }
    }, [])

    const regenerateModalsStyle = () => {
        playSound("open")
        setColor("blue")
        setTimeout(() => {
            setColor("yellow")
        }, 500)
        if (buttonSize > 10) {
            setButtonSize(buttonSize - 2)    
        } else if (buttonSize > 3) {
            setButtonSize(buttonSize - 1)
        } else if (buttonSize > 2) {
            setButtonSize((buttonSize * 10 - 5) / 10)
        } else if (buttonSize > 1) {
            setButtonSize((buttonSize * 10 - 2) / 10)
        } else if (buttonSize > 0.1) {
            setButtonSize((buttonSize * 10 - 1) / 10)
        } else {
            setButtonSize(0.1)
        }
        const modalsStyle = [...Array(numberOfAds)].map(() => ({
            ...modalStyleBase,
            content: {
                ...modalStyleBase.content,
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 65}%`,
                background: `center / contain url('/ads/popup${Math.ceil(Math.random() * 20)}.webp')`
            }
        }))
        setModalsStyle(modalsStyle)
    }

    const request2hue = (body: any) => {
        const url = `http://${hueBridgeIP}/api`
        // fetch(`${url}/${hueUser}/lights/1/state`, {
        //     "method": "PUT",
        //     "body": JSON.stringify(body)
        // })
    }

    const setColor = (color: "red" | "green" | "yellow" | "blue") => {
        console.log(`Set color to "${color}"`)
        const value = {
            red: 65403,
            green: 24834,
            yellow: 7377,
            blue: 45610
        }
        request2hue({ hue: value[color] })
    }

    const playSound = (name: string) => {
        const buffer = audioBuffersRef.current[name]
        if (audioContextRef.current && buffer) {
            const source = audioContextRef.current.createBufferSource()
            source.buffer = buffer
            source.connect(audioContextRef.current.destination)
            source.start(0)
        }
    }

    const stopBGM = () => {
        if (BGMSourceRef.current) {
            BGMSourceRef.current.stop()
            BGMSourceRef.current.disconnect()    
        }
    }

    const setBGM = (name: string) => {
        const buffer = audioBuffersRef.current[name]
        console.log(buffer)
        if (audioContextRef.current && buffer) {
            const gain = audioContextRef.current.createGain()
            gain.gain.value = 0.3
            const source = audioContextRef.current.createBufferSource()
            source.buffer = buffer
            source.loop = true
            source.connect(gain);
            gain.connect(audioContextRef.current.destination);
            source.start(0)
            BGMSourceRef.current = source
        }
    }

    const handleGameStart = () => {
        setLife(5)
        setInitialAdOpen(false)
        setGameClear(false)
        setPlaying(true)
        setCountDestroy(0)
        setCountMistake(0)
        setColor("yellow")
        playSound("start")
        setBGM("bgm2")
        setModalsOpen([...Array(numberOfAds).fill(true)])
    }

    const handleTapMissArea = () => {
        setCountMistake(countMistake + 1)
        setShowOverlay(false)
        setFullScreenAdOpen(true)
        setLife(life - 1)
        playSound("miss")
        setColor("red")
        setTimeout(() => {
            setColor("yellow")
        }, 500)
    }

    const handleTapButton = () => {        
        setColor("green")
        setTimeout(() => {
            setColor("yellow")
        }, 500)
    }

    const handleGameClear = () => {
        setLife(life - 1)
        setGameClear(true)
        setFullScreenAdOpen(false)
        setPlaying(false)
        setModalsOpen([...Array(numberOfAds).fill(false)])
        playSound("clear")
        stopBGM()
        setColor("red")
        setTimeout(() => {
            setColor("blue")
        }, 500)
    }

    const InitialAd = (
        <Modal isOpen={initialAdOpen}
            style={{ 
                overlay: {
                    ...modalStyleBase.overlay,
                    pointerEvents: "auto",
                    backgroundColor: "rgba(0,0,0,0.5)"
                },
                content: {
                    ...modalStyleBase.content,
                    top: "4rem",
                    left: "4rem",
                    right: "4rem",
                    bottom: "4rem",
                    width: "85%",
                    height: "75%",
                    background: "url('/ads/initial.webp')",
                    backgroundSize: "cover",
                }
            }}
        >
            {/* @ts-ignore */}
            <div style={{ width: "100%", height: "100%" }}>
                <button className="btn btn-danger btn-lg mb-3 start-btn" onClick={handleGameStart}>チャレンジ開始</button>
            </div>
        </Modal>
    )

    const FullScreenAd = (
        <Modal isOpen={fullScreenAdOpen}
            style={{ 
                overlay: {
                    ...modalStyleBase.overlay,
                    pointerEvents: "auto",
                    backgroundColor: "rgba(0,0,0,0.5)"
                },
                content: {
                    ...modalStyleBase.content,
                    top: "4rem",
                    left: "4rem",
                    right: "4rem",
                    bottom: "4rem",
                    width: "85%",
                    height: "75%",
                    background: "url('/ads/rainbow.webp')",
                    backgroundSize: "cover"
                }
            }}
        >
            {/* @ts-ignore */}
            <div style={{ width: "100%", height: "100%" }}>
                <button onClick={(e) => {
                    e.stopPropagation()
                    setFullScreenAdOpen(false)
                    playSound("close4")
                    setColor("green")
                    setTimeout(() => {
                        setColor("yellow")
                    }, 500)
                }} style={iconSkipStyle}>広告を閉じる</button>
                <img className="cat" src="/ads/cat1.webp" alt="" />
            </div>
        </Modal>
    )

    const PopupAds = modalsStyle.map((style, key) => (
        <Modal isOpen={modalsOpen[key]} style={style} key={key}>
            {/* @ts-ignore */}
            <div onClick={() => {
                if (life <= 1) {
                    handleGameClear()
                } else {
                    handleTapMissArea()    
                }
            }} style={{ width: "100%", height: "100%" }}>
                <button onClick={(e) => {
                    e.stopPropagation()
                    playSound(`close${Math.ceil(Math.random()*3)}`)
                    const prev = [...modalsOpen]
                    prev[key] = false
                    setModalsOpen(prev)
                    const countModalsOpen = modalsOpen.filter(v => v === true).length
                    if (countModalsOpen <= 1) {
                        regenerateModalsStyle()
                        setModalsOpen([...Array(numberOfAds).fill(true)])
                    } else {
                        handleTapButton()
                    }
                    setCountDestroy(countDestroy + 1)
                }} style={{
                    ...iconCloseStyle, 
                    fontSize: `${buttonSize}mm`,
                    top: `${(20-buttonSize) / 20 * 4}mm`,
                    right: "4.25mm",
                }}>☒</button>
            </div>
        </Modal>
    ))

    return (
        <>
            <div className="flex items-center h-[100dvh]">
                <div className="container">
                    {InitialAd}
                    {PopupAds}
                    {FullScreenAd}
                    <div className={`${gameClear ? "score-board score-board-wrap" : "score-board"}`}>
                        <div className="item">
                            <div className="life-container">
                                <div className="life">
                                    <span className="life-active">
                                        {"♥".repeat(life)}
                                    </span>
                                    <span>
                                        {"♥".repeat(maxLife-life)}
                                    </span>
                                </div>
                                <p>残りライフ</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="timer-container">
                                <svg width="160" height="160">
                                    <circle id="circle" className="timer-circle"
                                        r="60" cy="80" cx="80" transform="rotate(-90, 80, 80)"
                                        stroke-dasharray="377" stroke-dashoffset="0"
                                        stroke-width="8" stroke="#3f51b5" fill="none"/>
                                </svg>
                                <div className="timer-time">
                                    {countDestroy}                                    
                                </div>
                                <p>消した広告</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="timer-container">
                                <svg width="160" height="160">
                                    <rect id="rect" className="timer-rect"
                                        width="115" height="115" x="22.5" y="22.5" transform="rotate(-90, 80, 80)"
                                        stroke-width="8" stroke="#26a79a" fill="none"/>
                                </svg>
                                <div className="size">
                                    {buttonSize}<span style={{fontSize: "0.5em"}}>mm</span>
                                </div>
                                <p>ボタンサイズ</p>
                            </div>
                        </div>
                    </div>
                    {showOverlay && <div className="clear-overlay-box" style={{
                        background: "center / contain url('/ads/overlay.webp')"
                    }}></div>}
                    {gameClear && <button className="btn btn-primary btn-lg mb-3 score-board-btn" onClick={handleGameStart}>もう一度チャレンジ</button>}
                    <div className="pointer-item" style={{left: pointer[0]-40, top: pointer[1]-40, display: playing ? pointerDisplay : "none"}}>
                        <svg className="pointer" width="80" height="80">
                            <line x1="20" y1="20" x2="60" y2="60" stroke="red" stroke-width="8"/>
                            <line x1="60" y1="20" x2="20" y2="60" stroke="red" stroke-width="8"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
