import { useState } from "react"

export default function Login({ submit }: Props) {
    const [username, setUsername] = useState("")

    return (
        <>
            <h2>Pick an username</h2>
            <form className="login-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    submit(username)
                }}
            >
                <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                <input type="submit" />
            </form>
        </>
    )
}

interface Props {
    submit: (username: string) => void
}