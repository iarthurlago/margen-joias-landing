# Margen Joias

Landing page inicial em **React + TypeScript + CSS Modules**, com Vite, fotografias locais e consulta de peças por WhatsApp.

## Estrutura

```text
Margen/
├── conteudo-landing/             # Briefing, catálogo e fotos originais preservados
├── public/
│   ├── favicon.svg
│   └── images/                  # WebP responsivos gerados pelo script
├── scripts/
│   ├── prepare-assets.mjs
│   ├── prerender.mjs
│   └── check-build.mjs
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── ProductGallery/      # ProductGallery + ProductCard
│   │   ├── ProductDetail/       # Detalhes, galeria e recomendações
│   │   ├── BrandStory/
│   │   ├── CallToAction/
│   │   ├── Footer/
│   │   └── ui/                 # ContactLink + ProductImage
│   ├── data/
│   │   ├── catalog.ts
│   │   ├── products.generated.json
│   │   └── site.ts
│   ├── services/conversion.ts
│   ├── styles/global.css
│   ├── types/product.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── entry-server.tsx
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

Cada bloco tem seu arquivo `.tsx` e sua folha `.module.css`. `App.tsx` compõe a página; os componentes de UI concentram o comportamento dos links e das imagens.

## Executar

Use Node.js **22.12+** (ou Node.js 24 LTS).

```sh
npm ci
npm run dev
```

Abra `http://127.0.0.1:5173`. `predev` gera as imagens e o catálogo leve automaticamente.

```sh
npm run build
npm run check:build
npm run preview
```

A prévia de produção fica em `http://127.0.0.1:4173`. O resultado publicável está em `dist/`.

## Deploy no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` compila e valida a aplicação a cada push na branch `main`, envia somente `dist/` e publica pelo GitHub Pages. Durante esse build, `VITE_BASE_PATH=/margen-joias-landing/` garante que JavaScript, favicon e imagens sejam carregados no subdiretório do repositório. O desenvolvimento local continua disponível na raiz, em `http://127.0.0.1:5173/`.

No GitHub, a fonte de publicação do Pages deve estar definida como **GitHub Actions** em **Settings → Pages → Build and deployment**.

## JAMstack e integração futura

O build gera HTML com todo o conteúdo usando `react-dom/server`. O navegador recebe esse HTML e o React conecta os eventos usando `hydrateRoot`. Assim, a vitrine, a navegação e o WhatsApp continuam disponíveis sem JavaScript. Nenhum servidor Node é necessário na hospedagem.

`src/services/conversion.ts` contém o mock assíncrono vazio `trackConversion`. Ele recebe a origem do clique e, quando aplicável, o ID editorial da seleção. Não coleta dados, não faz requisições e não grava nada.

Para integrar Cloudflare Workers/KV:

1. Implemente um endpoint como `POST /api/conversions` em um Worker separado.
2. Substitua somente o corpo de `trackConversion` por `fetch` com o contrato tipado.
3. Valide os dados e mantenha as credenciais e o binding KV no Worker. O frontend nunca acessa KV diretamente.

`ContactLink` centraliza as chamadas e mantém a navegação independente de falhas da futura telemetria. Os links abrem uma conversa com a loja; nenhum pedido ou mensagem é enviado automaticamente. Não há carrinho, checkout ou formulário com sucesso simulado.

## Conteúdo e imagens

- Fonte: `conteudo-landing/catalogo.json` e `BRIEFING.md`, pesquisa de 11/09/2026.
- As dez imagens são utilizadas: uma na abertura, nove na vitrine e uma na história (o colar pantera aparece na abertura e na vitrine).
- `npm run assets` cria WebP de até 360, 720 e 1080 px, respeitando a resolução original e sem cortar o enquadramento.
- `srcSet`/`sizes`, dimensões explícitas e `object-fit: contain` evitam distorções e deslocamentos de layout. Só a imagem de abertura recebe prioridade alta; as demais usam carregamento tardio.
- Os originais e os PNGs adicionais permanecem intactos. As fontes temporárias de CDN não são usadas pela aplicação.
- Nomes são editoriais; fotografias podem representar composições. Preços, estoque e características não confirmadas não foram inventados.
- O retrato dos anéis aparece como referência de coleção. Os horários preservam a diferença de quinta-feira e exibem a data de consulta, 11/09/2026. Revalidar horários e demais informações dinâmicas antes da publicação.
- A assinatura tipográfica e o favicon com inicial são provisórios. Substitua pelos arquivos oficiais quando disponíveis.

## UI e acessibilidade

Estilo mobile first, grade de uma coluna em telas pequenas, duas a partir de 640 px, e quatro/cinco em telas largas. Navegação visível também no celular, sem menu dependente de JavaScript. Sem bibliotecas de ícones, fontes remotas, carrosséis ou animações pesadas.

Inclui `lang="pt-BR"`, landmarks semânticos, hierarquia de títulos, textos alternativos do catálogo, link de pular conteúdo, nomes acessíveis para consultas, aviso de nova aba, foco visível, áreas de toque de pelo menos 44 px e respeito a `prefers-reduced-motion`.

## Referências técnicas

- [Vite: TypeScript e CSS Modules](https://vite.dev/guide/features.html)
- [React: hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)

O comando de build executa a checagem TypeScript. `check:build` verifica o HTML pré-renderizado, presença das dez fotos, variantes locais, assets, URLs de consulta e âncoras.

## Visualização dos produtos

Os cards e as imagens em destaque abrem detalhes em URLs como `/#produto/mj-05`. A navegação usa fragmentos, compatíveis com hospedagem estática, links diretos e histórico do navegador. Os detalhes dependem de JavaScript; a vitrine e os links de consulta continuam disponíveis no HTML inicial.

A galeria oferece miniaturas, setas e ampliação em tela cheia com fechamento por Escape. As teclas de seta navegam entre as fotos quando o foco está na galeria. `prepare-detail-assets.mjs` prepara as sete variações de estúdio, associadas explicitamente por ID, e as fotos adicionais existentes de MJ-03 e MJ-04 também são usadas. MJ-08, MJ-09 e MJ-10 têm apenas sua foto original disponível.

A seção “Você também pode gostar” apresenta quatro outros produtos, priorizando a mesma categoria. `check:build` também verifica a renderização das dez páginas de detalhes, as variantes das galerias, os destinos dos links e a exclusão do produto atual das recomendações.
