# Margen Joias — material para a landing page

Pesquisa realizada em **11 de setembro de 2026**. Foram extraídas **10 fotos únicas**, sete do Instagram e três de fotos atribuídas ao proprietário no Google Maps. Os arquivos foram preservados como exportados, sem retoque, recorte, aumento artificial de resolução ou recriação de peças.

## Entregáveis

- `imagens/`: dez JPEGs, numerados e com nomes descritivos.
- [CATALOGO.md](CATALOGO.md): seleção visual, informações, fontes e indicação de uso.
- [catalogo.json](catalogo.json): dados estruturados da empresa, peças e imagens; textos alternativos, dimensões, hashes e links de consulta.
- `fontes/`: manifestos de extração com URLs dos arquivos de origem. Os caminhos temporários nos manifestos são históricos; a integração deve usar os caminhos relativos de `catalogo.json`.

O arquivo preexistente `JoiasImg/braceleteDourado.jfif` não foi incluído na seleção nem modificado: sua origem e ficha não foram confirmadas nesta pesquisa.

## Informações da loja

**Margen Joias — Aracaju, SE.** A bio informa 12 anos de atuação e oferece relógios, ouro, prata e semijoias. A embalagem da foto MJ-01 traz “Desde 2014”. A publicação comercial no Maps acrescenta alianças, anéis e atendimento personalizado.

- Instagram: [@margenjoias](https://www.instagram.com/margenjoias/).
- WhatsApp e telefone: [(79) 99808-0745](https://wa.me/5579998080745).
- Endereço: **Galeria Áurea Sampaio, Rua Dr. Osório de Araújo Ramos, 333, sala 06, bairro 13 de Julho, Aracaju–SE, CEP 49020-700**.
- Horários: segunda, terça, quarta e sexta, 9h–18h30; quinta, 9h–18h; sábado, 9h–13h; domingo fechado.
- Google: **5,0 em 10 avaliações**, consultado em 11/09/2026. Número e nota são dinâmicos.
- O Maps informa compras na loja, retirada e entrega. Cobertura, taxas e prazos não foram localizados.

[Fonte primária: ficha consultada no Google Maps](https://www.google.com/maps/place/Margen+Joias+%7C+Joias+em+Ouro+18k+para+todos+os+estilos/@-10.932819,-37.0502016,17z/data=!3m1!4b1!4m6!3m5!1s0x71ab30f76953275:0x7e48645c73b64a82!8m2!3d-10.932819!4d-37.0502016!16s%2Fg%2F11p5g5mshx).

Diretórios de busca mostram endereço antigo na Suíssa. Para esta preparação, prevalecem a ficha atual do Maps e a localização na bio oficial, ambas na Galeria Áurea Sampaio. A quinta-feira tem horário diferente dos outros dias úteis e deve manter essa distinção.

## Conteúdo sugerido

Os textos desta seção são propostas editoriais para construção, baseadas nas informações acima.

**Título de abertura:** Joias para celebrar a sua história.

**Texto de apoio:** Conheça a seleção de joias em ouro, prata, semijoias e relógios da Margen Joias, em Aracaju. Encontre uma peça para presentear ou marcar um momento especial, com atendimento personalizado.

**Ação principal:** Fale com a Margen pelo WhatsApp.

**Vitrine:** Peças que expressam o seu estilo.

**Texto da vitrine:** Explore nossa seleção e consulte os detalhes e a disponibilidade da peça que combina com você.

**Sobre:** Desde 2014, a Margen Joias faz parte de histórias em Aracaju. Visite nossa loja na Galeria Áurea Sampaio, no bairro 13 de Julho.

**Visita:** Encontre seu próximo presente na Margen Joias.

## Organização visual

1. Abertura com colar pantera (MJ-04), em composição com imagem ao lado do texto. A foto vertical não deve ser esticada como banner horizontal.
2. Vitrine principal com pulseira Fé (MJ-05), pulseira com esmeraldas (MJ-07), pulseira com medalha (MJ-06) e colar pantera (MJ-04). Essas fotos têm boa unidade de cores quentes.
3. Complementos com brincos em uso (MJ-03) e conjunto colorido (MJ-02), que já possuem texto incorporado à imagem.
4. Presentes com significado: estojos da marca e colares (MJ-01).
5. Variedade na loja: colares do expositor (MJ-08), relógios (MJ-09) e anéis (MJ-10).
6. Confiança e visita: história da marca, nota do Google com data da consulta, endereço, horários e WhatsApp.

A paleta observada nas publicações combina dourado, marrom, bege, rosado e branco, com vermelho nos estojos. Usar as fotos como referência visual. A marca original deve vir de um arquivo próprio de logotipo quando disponível; não redesenhar a assinatura a partir das embalagens.

## Critérios de integração

- Usar `imagem.arquivo` como caminho relativo à pasta deste pacote. Hospedar as imagens junto da landing page; URLs de CDN ficam apenas como proveniência e podem expirar.
- `nome_editorial` serve para a vitrine. `nome_oficial` e `sku` permanecem nulos, pois não foram encontrados.
- As dez entradas representam fotografias/seleções. Algumas contêm vários produtos e não devem virar um único item de checkout.
- Preço, estoque, peso, medidas e garantia estão nulos. Usar **Consultar esta peça**, com link específico em `cta.url`.
- Ouro 18k confirmado em uma legenda não se aplica automaticamente a todas as peças da loja. Aparência dourada ou prateada não define material.
- Na foto MJ-04, a legenda associa ouro 18 aos elos; a composição do pingente permanece pendente. Na MJ-03, “brilhantes” é a descrição da loja; não acrescentar peso, certificação ou classificação gemológica.
- Preservar enquadramento com `object-fit: contain`; o foco sugerido é apenas orientação para o futuro layout. Textos incorporados às fotos MJ-02 e MJ-03 não foram removidos.
- A foto MJ-09 mede 508 × 677 px: usar em cartão compacto. A MJ-10 foi publicada em março de 2023, com captura indicada em dezembro de 2022: serve como referência de coleção até a loja confirmar estoque.
- Revalidar nota, número de avaliações e horários ao publicar. Não transformar avaliações de clientes em promessa de menor preço.
- Promoções antigas vistas no perfil e no Maps, incluindo frete grátis, sorteio e brinde com alianças, não foram incorporadas ao conteúdo permanente.
- Para a etapa de desempenho da página, gerar versões responsivas a partir destes originais conforme o layout. Este pacote contém apenas as dez fotos exportadas, sem duplicatas de tamanho.

## Informações ainda não localizadas

Referências comerciais, preços, estoque atual, tamanhos, comprimentos, pesos, detalhes das gemas, condições de pagamento, garantia, troca, área de entrega e validade de promoções. Para a produção da vitrine, essas informações podem ser obtidas no atendimento da loja; o material atual já permite uma landing page de apresentação com consulta pelo WhatsApp.
