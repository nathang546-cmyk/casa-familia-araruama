# Casa Família · site

Site da **Casa Família**, casa de temporada em Araruama/RJ (Região dos Lagos).

**No ar:** https://nathang546-cmyk.github.io/casa-familia-araruama/

## O que tem no site

- **Abertura** com a foto da piscina e o nome animado.
- **Tour pela casa**: ao rolar a página, cada ambiente aparece dentro de um arco (o mesmo formato da logo) e depois toma a tela. São 10 paradas: varanda, sala, cozinha, suíte, quartos, banheiro, edícula, piscina, área gourmet e jardim de inverno.
- **Vídeo** vertical do tour, com botão para enviar o site no WhatsApp.
- **Galeria** com filtros (casa, quartos, banheiros, lazer, condomínio) e foto ampliada.
- **Comodidades**, **lazer do condomínio** (rolagem horizontal), **opções de reserva** (casa toda ou só a edícula) e **contato**.
- Botões de WhatsApp com mensagem pronta e prévia bonita quando o link é compartilhado.

Funciona no celular e no computador. Para quem prefere menos movimento (configuração do sistema), as animações são desligadas e o conteúdo aparece normalmente.

## Como editar

| O que mudar | Onde |
|---|---|
| Textos do site | `index.html` |
| Cores, fontes e espaçamentos | `assets/css/style.css` (variáveis no topo do arquivo) |
| Número do WhatsApp e mensagens prontas | `assets/js/main.js` (constantes `WA` e `MSG`) |
| Fotos da galeria (lista, legendas e categorias) | `assets/js/main.js` (lista `FOTOS`) |
| Arquivos de foto | `assets/img/fotos/` (cada foto tem duas versões: `nome-800.webp` e `nome-1600.webp`) |
| Vídeo | `assets/video/tour-casa-familia.mp4` |
| Prévia do link no WhatsApp/redes | `assets/img/compartilhar.jpg` (1200×630) |

Depois de alterar o CSS ou o JavaScript, aumente o número da versão nos links do `index.html` (`style.css?v=1` → `?v=2`, `main.js?v=1` → `?v=2`) para os visitantes receberem a versão nova na hora.

## Ver no computador antes de publicar

Na pasta do projeto:

```bash
python -m http.server 8080
```

Depois abra http://localhost:8080 no navegador.

## Publicar

O site é publicado pelo **GitHub Pages** a partir da branch `main`. Qualquer alteração enviada para a `main` entra no ar em 1 ou 2 minutos.

Para trabalhar em equipe: crie uma branch, faça as alterações e abra um Pull Request. Assim as outras pessoas revisam antes de ir para o ar.

Para dar acesso a alguém: **Settings → Collaborators → Add people** no repositório.

## Créditos

- Animações: [GSAP](https://gsap.com) e ScrollTrigger (licença gratuita da GSAP), rolagem suave: [Lenis](https://github.com/darkroomengineering/lenis) (MIT). Os arquivos estão em `assets/vendor/`.
- Ícones: [Lucide](https://lucide.dev) (ISC).
- Fontes: Playfair Display e Montserrat (Google Fonts).
- Música do vídeo: “Inside You”, lemonmusicstudio ([Pixabay](https://pixabay.com/music/acoustic-group-inside-you-162760/), licença Pixabay).
- Fotos: Casa Família.
