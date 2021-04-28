# podcast

<b>NEXTJS / REACTJS / TYPESCRIPT  (SPA, SSR and SSG)</b>

1. To run the application. => yarn dev
2. The API's were created as localhost. => yarn server

<b>Dependences</b>

Cria o projeto
- npx create-next-app nome_projeto

Instala typescript
- yarn add typescript @types/react @types/node -D

Instala biblioteca de data
- yarn add date-fns

Instala JSON SERVER (simula api)
- yarn add json-server -D

Instala o axios para fazer requisições
- yarn add axios

Instala o slider (posicionar música)
- yarn add rc-slider






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
