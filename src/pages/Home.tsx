import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'

export function Home() {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()
    
    const [roomCode, setRoomCode] = useState('')

    async function handlerCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
    } 

    async function handlerJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return alert('Preencha o Nome da Sala')
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()) {
            alert('Room does not exists')
            return;
        }

        if (roomRef.val().endedAt) {
           alert('Essa sala está fechada') 
           return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração" />
                <strong>Toda pergunta tem <br /> uma resposta</strong>
                <p>Aprenda e compartilhe conhecimentos <br /> com outras pessoas</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handlerCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="logo do Google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handlerJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}