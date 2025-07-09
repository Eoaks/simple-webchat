import { useCallback, useEffect, useState } from "react"
import { getTime } from "./utils"
import useWebSocket from "react-use-websocket"

const WS_URL = import.meta.env.VITE_WS_URL

export default function Home({ username }: Props) {
    const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
        queryParams: {
            username
        }
    })
    const socketRunning = readyState === 1
    const [messages, setMessages] = useState<WSMessage[]>([])
    const [message, setMessage] = useState<string>("")

    const submitMessage = useCallback(() => {
        if (!socketRunning || message.trim() === "") return;
        sendJsonMessage(message);
        setMessage("")
    }, [message, sendJsonMessage, socketRunning])

    useEffect(() => {
        const keydownHandler = function (event: KeyboardEvent) {
            if (event.key === 'Enter') {
                submitMessage();
            }
        }
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler)
        }
    }, [submitMessage])

    useEffect(() => {
        if (lastMessage) {
            const content = JSON.parse(lastMessage.data)
            console.log(content)
            if (content.isCache) {
                setMessages(content.MESSAGE_CACHE)
            }
            else setMessages((state) => ([...state, content]))
        }
    }, [lastMessage])

    if (readyState === 3) window.location.reload()

    return (
        <>
            <div className="chat-container">
                <div className="messages-container">
                    {messages.map(({ username, message, timestamp }) => {
                        return <div className="message" key={timestamp}>
                            <b>{username}:</b> <span>{message} <i className="message-timestamp">{getTime(timestamp)}</i></span>
                        </div>
                    })}
                </div>
                <hr />
                <div className="input-container">
                    <input type="text" name="message input" onChange={(e) => setMessage(e.target.value)} value={message} />
                    <button disabled={!socketRunning} onClick={submitMessage}><img src="/send.svg" width={40} height={40} /></button>
                </div>
            </div>
        </>
    )
}


interface Props {
    username: string;
}

interface WSMessage {
    username: string;
    timestamp: number;
    message: string
}