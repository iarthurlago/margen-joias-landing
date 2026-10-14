from pathlib import Path
import json, hashlib
from urllib.parse import quote
from PIL import Image

ROOT = Path(__file__).resolve().parent
DATA = '2026-09-11'
IG = 'https://www.instagram.com/margenjoias/'
MAPS = 'https://www.google.com/maps/place/Margen+Joias+%7C+Joias+em+Ouro+18k+para+todos+os+estilos/@-10.932819,-37.0502016,17z/data=!3m1!4b1!4m6!3m5!1s0x71ab30f76953275:0x7e48645c73b64a82!8m2!3d-10.932819!4d-37.0502016!16s%2Fg%2F11p5g5mshx'
assets = {}
for manifest in (ROOT/'fontes').glob('*assets.json'):
    for a in json.loads(manifest.read_text(encoding='utf-8-sig'))['assets']:
        assets[a['id']] = a

# Nomes editoriais para organização; não são referências oficiais da loja.
rows = [
 ('2a841c17be5dcc45','colares-pingentes-afetivos','Colares com pingentes afetivos','Colares','Dcyz3O1FBdf','2026-09-02',
  'Dois colares de tonalidade dourada com pequenos pingentes claros, apresentados em estojos vermelhos da Margen.',
  {'metal':'Ouro citado na legenda; teor não especificado.'},
  'A publicação associa as joias à história pessoal e ao ouro. Os estojos trazem a inscrição Desde 2014.',
  'Presentes e joias com significado. Foto recente com embalagem da marca.',
  'Confirmar composição dos pingentes e se os colares são vendidos separadamente.', '50% 40%'),
 ('db30f3e316422527','colar-brincos-pedras-coloridas','Colar e brincos com pedras coloridas','Conjuntos','DYVRgw_lDo9','2026-05-14',
  'Colar e par de brincos com elementos ovais e em gota, em tons vinho, amarelo e acinzentado, sobre tecido claro.',
  {'metal':'Ouro 18k, informado na legenda.','pedras':'Pedras naturais, informadas na legenda; espécies não identificadas.'},
  'A legenda apresenta pedras naturais e ouro 18k. Não informa quais gemas compõem o conjunto.',
  'Seção de pedras coloridas ou galeria de conjuntos.',
  'Foto contém texto sobreposto na parte superior. Confirmar espécies das gemas e venda conjunta ou separada.', '50% 70%'),
 ('f024b21a10a5614a','brincos-correntes-ouro18k','Brincos de correntes em ouro 18k','Brincos','DW6whrajj-n','2026-04-09',
  'Brinco alongado em uso, com arcos dourados, correntes finas em camadas e detalhe central brilhante.',
  {'metal':'Ouro 18k 750, informado na legenda e na imagem.','pedras':'A legenda usa o termo brilhantes; peso e certificação não informados.'},
  'A legenda informa ouro 18k 750 e brilhantes. O texto impresso na imagem também informa ouro 18k.',
  'Seção de brincos; imagem em uso para mostrar o caimento.',
  'Há texto sobreposto na base. A foto mostra um lado; confirmar venda por par e dimensões.', '50% 30%'),
 ('16b52402b4770a2d','colar-pantera-elos-portugueses','Colar pantera com elos portugueses','Colares','DWg9g2TE4oq','2026-03-30',
  'Corrente de elos redondos com pingente em forma de pantera, superfície brilhante clara e detalhes dourados, em fundo rosado.',
  {'corrente':'Elos portugueses em ouro 18, conforme a legenda.','pingente':'Pantera citada na legenda; composição e gemas não detalhadas.'},
  'A legenda identifica elos portugueses em ouro 18 e o motivo pantera.',
  'Destaque principal da vitrine e imagem de abertura em composição dividida com texto.',
  'Não estender o teor da corrente ao pingente sem confirmação. Não identificar as pedras como diamantes pela foto.', '50% 58%'),
 ('e7df508ff7942f26','pulseira-fe-ouro18k','Pulseira Fé em ouro 18k','Pulseiras','DWgybzdjrhn','2026-03-30',
  'Pulseira de elos dourados com pingente escrito FÉ, com pequenos pontos brilhantes claros, sobre apoio dourado.',
  {'metal':'Ouro 18k 750, informado na legenda.'},
  'A legenda informa ouro 18k 750. O pingente FÉ é identificado visualmente.',
  'Produto de destaque e seção de presentes com significado.',
  'Confirmar composição dos pontos brilhantes, comprimento e peso.', '50% 55%'),
 ('6242501ccdd9e5ae','pulseira-medalha-simbolos','Pulseira com medalha e símbolos','Pulseiras','DWgx6HKjpoF',None,
  'Pulseira delicada de tonalidade dourada com medalha circular trabalhada e pequenos símbolos laterais.',
  {'metal':'Ouro citado na legenda; teor não especificado.'},
  'A legenda menciona ouro e símbolos. A medalha e os elementos laterais são descritos a partir da imagem.',
  'Seção de presentes e pulseiras delicadas.',
  'Confirmar nome comercial, significado dos símbolos e teor do ouro.', '50% 55%'),
 ('b1daa9864c816889','pulseira-esmeraldas','Pulseira com esmeraldas','Pulseiras','DWgunTlji7L',None,
  'Pulseira de tonalidade dourada com motivo central curvo, pedras verdes em composição floral e pequenos pontos brilhantes.',
  {'metal':'Ouro citado na legenda; teor não especificado.','pedras':'Esmeralda citada na legenda; origem e tratamento não informados.'},
  'A legenda associa a peça ao ouro e à esmeralda. Não informa quilatagem ou características gemológicas.',
  'Destaque para joias com pedras coloridas.',
  'Confirmar teor do ouro, especificação das esmeraldas e tipo das pedras claras.', '50% 55%'),
 ('935857bb066aa2df','colares-expositor-maps','Seleção de colares com pingentes','Colares',None,'2026-07',
  'Quatro colares de tonalidade prateada em expositor branco, com pingentes claros e azuis e um motivo de pássaro.',
  {}, 'Foto publicada pelo perfil comercial no Google Maps em julho de 2026; sem ficha técnica individual.',
  'Galeria da loja e variedade de colares.',
  'Tonalidade prateada não confirma prata nem ouro branco. Confirmar materiais e pedras de cada colar.', '50% 48%'),
 ('f45771967cd9b889','relogios-champion-maps','Relógios Champion na vitrine','Relógios',None,'2026-07',
  'Relógios analógicos em diferentes acabamentos, junto de estojos com a marca Champion, na vitrine da loja.',
  {'marca_observada':'Champion aparece nos estojos; confirmar marca e referência de cada relógio.'},
  'Foto do perfil comercial no Google Maps em julho de 2026. Champion é legível nos estojos.',
  'Cartão compacto da categoria relógios.',
  'Resolução de 508 × 677 px: evitar banner amplo e ampliação. Confirmar modelo, mecanismo e resistência à água.', '50% 50%'),
 ('349e191cdfb3d18b','aneis-composicao-maps','Composição de anéis','Anéis',None,'2023-03',
  'Diversos anéis em mãos, com tonalidades douradas, elementos coloridos, peça oval clara, formas geométricas e a palavra fé.',
  {}, 'Foto do perfil comercial no Maps, publicada em março de 2023; a interface indica captura em dezembro de 2022.',
  'Referência de estilo e variedade de anéis, sujeita à atualização da coleção.',
  'Foto antiga: confirmar disponibilidade de cada modelo. Materiais, pedras e tamanhos não informados.', '50% 50%'),
]
photo_ids = {'935857bb066aa2df':'CIABIhCHsUrdB4HWtps0xRTtWGQx','f45771967cd9b889':'CIABIhAFf4oQX-aTberDHuRqrfuH','349e191cdfb3d18b':'CIHM0ogKEICAgIDhvpSELw'}
products = []
for n, row in enumerate(rows, 1):
    aid, slug, name, category, post, date, desc, confirmed, evidence, usage, caution, focal = row
    old = ROOT/'imagens'/f'{aid}.jpg'
    filename = f'{n:02d}-{slug}.jpg'
    dest = ROOT/'imagens'/filename
    if old.exists():
        old.rename(dest)
    with Image.open(dest) as img:
        w,h = img.size
        img.verify()
    source = {'plataforma':'Instagram' if post else 'Google Maps','url':f'{IG}p/{post}/' if post else MAPS,
      'autor_exibido':'Margen Joias','data_publicacao':date,'data_consulta':DATA,'resumo_evidencia':evidence,
      'arquivo_remoto':assets[aid]['url'],'id_foto_maps':photo_ids.get(aid)}
    products.append({'id':f'MJ-{n:02d}','slug':slug,'nome_editorial':name,'nome_oficial':None,'sku':None,
      'categoria':category,'tipo_registro':'selecao_fotografica','descricao_visual':desc,
      'informacoes_confirmadas_na_fonte':confirmed,'preco_brl':None,'disponibilidade':None,
      'peso_gramas':None,'medidas':None,'garantia':None,'fonte':source,
      'imagem':{'arquivo':f'imagens/{filename}','alt':desc,'largura':w,'altura':h,'bytes':dest.stat().st_size,
        'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'formato':'image/jpeg','edicoes':'Nenhuma; arquivo exportado da plataforma.',
        'object_fit':'contain','foco_sugerido':focal},
      'uso_sugerido':usage,'observacoes':caution,
      'cta':{'texto':'Consultar esta peça','url':'https://wa.me/5579998080745?text='+quote(f'Olá! Gostaria de consultar {name.lower()} que vi na seleção da Margen. Referência: {source["url"]}')}})

business = {'nome':'Margen Joias','data_consulta':DATA,'instagram':IG,'whatsapp':'https://wa.me/5579998080745',
 'telefone':'+55 79 99808-0745','maps':MAPS,'endereco':{'logradouro':'Rua Dr. Osório de Araújo Ramos','numero':'333','complemento':'Sala 06, Galeria Áurea Sampaio','bairro':'13 de Julho','cidade':'Aracaju','uf':'SE','cep':'49020-700','fonte':MAPS},
 'coordenadas':{'latitude':-10.932819,'longitude':-37.0502016},
 'horarios':{'segunda':'09:00–18:30','terca':'09:00–18:30','quarta':'09:00–18:30','quinta':'09:00–18:00','sexta':'09:00–18:30','sabado':'09:00–13:00','domingo':'Fechado','fonte':MAPS},
 'avaliacao_google':{'nota':5.0,'quantidade':10,'consultado_em':DATA,'fonte':MAPS},
 'historia':{'anos_declarados_na_bio':12,'desde':2014,'evidencia':'Bio do Instagram informa 12 anos; embalagem na foto MJ-01 traz Desde 2014.','fontes':[IG,products[0]['fonte']['url']]},
 'categorias_declaradas':['Joias em ouro','Joias em prata','Alianças','Anéis','Relógios','Semijoias'],
 'categorias_fontes':[IG,MAPS],
 'servicos_declarados':{'itens':['Atendimento personalizado','Compras na loja','Retirada','Entrega'],'fonte':MAPS,'observacao':'Prazo, área de entrega e frete não informados.'},
 'divergencias_resolvidas':'Diretórios secundários mostram endereço antigo na Suíssa. Priorizar Maps atual e bio oficial na Galeria Áurea Sampaio.'}
payload = {'versao':'1.0','idioma':'pt-BR','data_coleta':DATA,'total_fotos':len(products),'empresa':business,
 'criterios':['Até 10 fotos, sem duplicatas.','Publicações da marca e fotos do proprietário no Maps.','Nomes são descrições editoriais, não nomes oficiais ou SKUs.','Campos nulos significam informação não localizada.','Fotos com múltiplas peças são registros de seleção e não produtos únicos vendáveis.'],
 'produtos':products}
(ROOT/'catalogo.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

lines = ['# Margen Joias — seleção de produtos','',f'Coleta em 11/09/2026 · **10 fotos: 7 Instagram + 3 Google Maps**.','',
 'Arquivos originais exportados, com nomes organizados. As fotos mostram peças e composições; os nomes abaixo são editoriais. Preços, estoque e medidas precisam ser consultados.','',
 '[Dados para integração](catalogo.json) · [Briefing da landing page](BRIEFING.md)','',
 '| ID | Seleção | Fonte | Resolução |','|---|---|---|---|']
for p in products:
    im=p['imagem']; lines.append(f'| {p["id"]} | {p["nome_editorial"]} | {p["fonte"]["plataforma"]} | {im["largura"]} × {im["altura"]} |')
for p in products:
    s=p['fonte']; lines += ['',f'## {p["id"]} — {p["nome_editorial"]}','',
      f'![{p["imagem"]["alt"]}]({p["imagem"]["arquivo"]})','',p['descricao_visual'],'',
      '**Informações da fonte:** '+s['resumo_evidencia'],'',
      '**Uso na página:** '+p['uso_sugerido'],'',
      '**A conferir:** '+p['observacoes'],'',
      f'[Publicação de origem]({s["url"]}) · Data: {s["data_publicacao"] or "não registrada"} · [Arquivo da foto]({p["imagem"]["arquivo"]})']
(ROOT/'CATALOGO.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps({'fotos':len(products),'bytes':sum(p['imagem']['bytes'] for p in products),'arquivos':[p['imagem']['arquivo'] for p in products]},ensure_ascii=False,indent=2))
