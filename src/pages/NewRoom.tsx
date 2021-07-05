import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'

export function NewRoom() {

  const { user, signInWithGoogle } = useContext(AuthContext)

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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form>
            <input
              type="text"
              placeholder="Nome da Sala"
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