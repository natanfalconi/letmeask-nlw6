# LetMeAsk

Let Me Ask é uma plataforma aonde é possível criar salas para interação por parte do usuário com perguntas, com a possibilidade de votar(like) nas perguntas mais relevantes, e sendo possível apenas por parte do Administrador responder. 

A Aplicação foi desenvolvida na Sexta Edição da NLW (Next Level Week) na trilha de React.Js com Firebase.


## Tecnologias

Para o backend, com o Firebase, foi utilizando a Autenticação do Google(Apenas usuários logados podem enviar perguntas) e o serviço de Realtime Database, para persistência dos dados.


### React.Js - TypeScript | Firebase | HTML | SCSS 

## Orientações 

Para realizar o clone do repoótório é necessário fazer a instalação das dependecias.

### npm install

Devido as configurações do firebase, existe um arquivo .env.local no projeto, aonde para funcionar, deve ser adicionado diretamenta da sua conta>aplicação no firebase> Utilizando a seguinte sixtaxe 

REACT_APP_API_KEY=""
REACT_APP_AUTH_DOMAIN=""
REACT_APP_DATABASE_URL=""
REACT_APP_PROJECT_ID=""
REACT_APP_STORAGE_BUCKET=""
REACT_APP_MESSAGING_SENDER_ID=""
REACT_APP_APP_ID=""


![enter image description here](https://github.com/FalconiN/letmeask-nlw6/blob/master/src/assets/images/letmeask.png?raw=true)