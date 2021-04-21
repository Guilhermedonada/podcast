import { useEffect } from "react"

export default function Home(props) {
  
  return (
    <div>
      <h1>index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}


export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, //a cada 8 horas, é gerada uma versão nova da pagina
  }
}


//SPA => carregado pelo front - se o js nao funcionar nao carrega

// useEffect(() => {
//   fetch('http://localhost:3333/episodes').then(response => response.json()).then(data => console.log(data))
// }, [])



//SSR => carregado pelo next, mas atualiza toda hora que alguem acessa a home

// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data,
//     }
//   }
// }

//SSG => gera uma versao estática da pagina, é bom pra quando os conteudos mudam só as vezes
