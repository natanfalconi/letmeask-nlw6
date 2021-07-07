import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function NewRoom() {
    const { user } = useAuth()
    const history = useHistory()

    const [newRoom, setNewRoom] = useState('');

    async function handlerCreateRoom(event: FormEvent){
        event.preventDefault()

        if (newRoom.trim() === ''){
            
            return alert('Preencha o Nome da Sala');
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({ 
            titlle: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
        
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handlerCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da Sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link> </p>
                </div>
            </main>
        </div>
    )
}