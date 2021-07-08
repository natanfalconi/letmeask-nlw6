import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { useRoom } from '../hooks/useRoom'

import { Question } from '../components/Question'

import '../styles/room.scss'

type RoomParams = {
    id: string
}

export function AdminRoom(){
    const { user } = useAuth()
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('')
    const roomId = params.id

    const { questions, title } = useRoom(roomId)


    async function handlerSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === ''){
            return;
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);
        
        setNewQuestion('')
    }

    return(
        <div id="page-room">
           <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header> 

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} Pergunta(s)</span>} 
                </div>

                <div className="question-list">
                    { questions.map(questions => {
                        return (
                            <Question
                                key={questions.id}
                                content={questions.content}
                                author={questions.author}
                            />
                        )
                    }) }
                </div>
            </main>
        </div>
    )
}