import '../styles/global.scss'

import {Header} from '../components/Header'
import {Player} from '../components/Player'

import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header/>
        <Component {...pageProps} />
      </main>
      <Player/>
    </div>
  )
}

export default MyApp

// _app será aberto em todas telas da aplicacao


// Server Side Rendering - SSR
// O SSR funciona da seguinte maneira, ao acessarmos um site por exemplo alura.com.br enviamos uma requisição 
// para o servidor para acessar a página inicial do site, então o servidor manda uma requisição 
// para uma rest api por exemplo pedindo essa pagina inicial

//Static Site Generation - SSG
// O NextJS também possibilita a criação de sites estáticos, que são aqueles sites sem muita interação com o usuário, 
// com pouca ou quase nenhuma mudança na interface, por exemplo uma página de venda de um produto que vai ficar no ar por uma semana.

//next faz com que o html seja montado no server next (porta 3000), 
//e não que o html seja montado pelo javascript em tela, isso evita problemas de carregamento, 
//onde mecanismos de busca não conseguem BUSCA o html pois o mesmo ainda nao foi carregado.
//outro problema é no compartilhar um arquivo que nem foi carregado (exemplo compartilhar 
//o link da aplicação com redes sociais => não ira carregar se nao usar next), 
//BASICAMENTE RENDERIZA O REACT NO LADO DO SERVER

//--pra criar
//npx create-next-app nome_projeto
//--para criar server next
//yarn dev 
//INSTALA TYPESCRIPT
// yarn add typescript @types/react @types/node -D
//INSTALA BIBLIOTECA DE DATA
// yarn add date-fns
//INSTALA JSON SERVER (SIMULA UM API)
// yarn add json-server -D
//adicionar server no package.json 
//roda no terminar yarn server