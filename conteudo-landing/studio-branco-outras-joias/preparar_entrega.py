from pathlib import Path
from PIL import Image
import hashlib, html, json, zipfile

base = Path(__file__).resolve().parent
data = json.loads((base / 'selecionadas.json').read_text(encoding='utf-8'))
items = data['imagens']
manifest = []
groups = {}
for item in items:
    path = base / item['file']
    with Image.open(path) as im:
        im.load()
        rgb = im.convert('RGB')
        w, h = im.size
        corners = [rgb.getpixel(p) for p in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]]
    manifest.append({
        'id': item['id'], 'produto_catalogo': item['produto_catalogo'],
        'titulo': item['title'], 'variante': item['variant'], 'arquivo': item['file'],
        'largura': w, 'altura': h, 'formato': 'PNG', 'bytes': path.stat().st_size,
        'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
        'referencia_original': '../imagens/' + Path(item['ref']).name,
        'gerada_por_ia': True, 'modo': 'image_gen integrada',
        'status': item['status'], 'aprovada_para_publicacao': False,
        'nota_revisao': item['nota_revisao'], 'rgb_cantos': corners,
        'fundo_255_uniforme_comprovado': False,
        'alt': item['title'] + ' — variação ' + str(item['variant']) + ' gerada por IA sobre fundo branco'
    })
    groups.setdefault(item['id'], []).append(item)
(base / 'manifesto.json').write_text(json.dumps({'data': data['data'], 'total': len(manifest), 'imagens': manifest}, ensure_ascii=False, indent=2), encoding='utf-8')

esc = html.escape
nav = ''.join(f'<a href="#{esc(key)}">{esc(group[0]["title"])}</a>' for key,group in groups.items())
sections = []
for index, (key, group) in enumerate(groups.items(), 1):
    first = group[0]
    ref = '../imagens/' + Path(first['ref']).name
    cards = f'<figure><a href="{esc(ref)}" target="_blank"><img src="{esc(ref)}" alt="Referência original: {esc(first["title"])}" loading="lazy"></a><figcaption>Referência coletada</figcaption></figure>'
    for item in group:
        cards += f'<figure><a href="{esc(item["file"])}" target="_blank"><img src="{esc(item["file"])}" alt="{esc(item["title"])} — variação {item["variant"]}" loading="lazy"></a><figcaption>Variação {item["variant"]} · <a href="{esc(item["file"])}" download>Baixar PNG</a></figcaption></figure>'
    status = 'Inscrições divergentes · não usar como reprodução fiel' if key == 'mj-06' else 'Conferência de fidelidade pendente'
    sections.append(f'<section id="{esc(key)}"><div class="heading"><span class="number">{index:02d}</span><div><h2>{esc(first["title"])}</h2><p class="status">{status}</p></div></div><div class="grid">{cards}</div><p class="note">{esc(first["nota_revisao"])}</p></section>')
page = '''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Margen · Estúdio branco — novas joias</title><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fafaf8;color:#26241f;font:15px/1.6 Arial,sans-serif}header,main,footer{max-width:1400px;margin:auto;padding:40px 36px}header{padding-top:64px;padding-bottom:28px}.brand{font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:#78633c}h1{font:normal clamp(32px,5vw,64px)/1.1 Georgia,serif;margin:18px 0}h2{font:normal 29px/1.2 Georgia,serif;margin:0}.lead{max-width:850px;color:#59564e}.stats{display:flex;gap:28px;flex-wrap:wrap;margin:24px 0}.stats strong{font-size:24px;font-weight:400}.stats span{color:#69655b}nav{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px}nav a{border:1px solid #d8d2c7;border-radius:24px;padding:6px 13px;font-size:12px;text-decoration:none}a{color:#69512e}a:hover{color:#201d18}section{scroll-margin-top:24px;border-top:1px solid #d8d2c7;padding:32px 0 44px}.heading{display:flex;gap:18px;align-items:flex-start;margin-bottom:22px}.number{font:24px Georgia,serif;color:#aa9671}.status{margin:7px 0 0;font-size:12px;color:#716958}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}figure{margin:0;min-width:0;background:white;border:1px solid #eeeae3}figure img{display:block;width:100%;aspect-ratio:3/4;object-fit:contain;background:#fff}figcaption{padding:13px 15px;font-size:12px;border-top:1px solid #f1eee8}.note{font-size:13px;color:#696256;max-width:1000px;margin:16px 0 0}details{border:1px solid #ddd7cd;padding:16px 20px;margin:22px 0;background:#fff}summary{cursor:pointer}footer{padding-top:0;color:#6b655b;font-size:13px}@media(max-width:720px){header,main,footer{padding-left:18px;padding-right:18px}.grid{grid-template-columns:1fr}.grid figure:first-child img{max-height:350px}.heading{gap:12px}nav{gap:6px}h2{font-size:25px}}
</style></head><body><header><div class="brand">Margen Joias · Direção de imagem</div><h1>Novas joias.<br>O mesmo estúdio branco.</h1><p class="lead">Duas variações para cada uma das sete referências selecionadas, com iluminação suave e enquadramentos de produto. Compare cada imagem com a fotografia que orientou sua criação.</p><div class="stats"><div><strong>16</strong> <span>fotos analisadas</span></div><div><strong>7</strong> <span>referências trabalhadas</span></div><div><strong>14</strong> <span>variações</span></div></div><details><summary>Sobre a fidelidade e os arquivos</summary><p>Imagens geradas por IA com a ferramenta integrada. Os desenhos gerais foram comparados aos originais, mas a exigência de reprodução exata não foi integralmente atingida. As diferenças estão registradas abaixo. As inscrições da medalha exigem correção antes do uso comercial.</p><p>PNG nativo de 1086 × 1448 pixels; não são arquivos 8K. O fundo é visualmente branco, mas não foi comprovado #FFFFFF uniforme. Clique em uma imagem para abrir o arquivo completo.</p><p><a href="manifesto.json">Manifesto técnico</a> · <a href="selecionadas.json">Prompts e referências selecionados</a> · <a href="ANALISE.md">Análise de todas as fotos</a> · <a href="../studio-branco/galeria.html">Lote anterior: brincos e pantera</a></p></details><nav>''' + nav + '</nav></header><main>' + ''.join(sections) + '</main><footer>Preparação local para a landing page · 16 de outubro de 2026 · As fotografias originais foram preservadas.</footer></body></html>'
(base / 'galeria.html').write_text(page, encoding='utf-8')

archive = base / 'margen-novas-joias.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for item in items:
        z.write(base / item['file'], 'studio-branco-outras-joias/' + item['file'])
    for name in ['manifesto.json','selecionadas.json','prompts.json','prompts-correcoes.json','historico-geracoes.json','galeria.html','ANALISE.md','LEIA-ME.md']:
        z.write(base / name, 'studio-branco-outras-joias/' + name)
    for ref in sorted({Path(item['ref']) for item in items}):
        z.write(ref, 'imagens/' + ref.name)
    # The gallery links to the earlier completed batch; preserve that relative link in the package.
    previous = base.parent / 'studio-branco'
    for path in previous.iterdir():
        if path.is_file() and path.suffix in ['.html','.json','.md','.png']:
            z.write(path, 'studio-branco/' + path.name)
print(json.dumps({'selecionadas':len(items),'grupos':len(groups),'dimensoes':sorted({(m['largura'],m['altura']) for m in manifest}),'galeria':str(base/'galeria.html'),'zip':str(archive),'zip_bytes':archive.stat().st_size,'cantos_rgb':{m['arquivo']:m['rgb_cantos'] for m in manifest}},ensure_ascii=False))
