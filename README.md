# Casa Família · site

Site da **Casa Família**, casa de temporada em Araruama/RJ (Região dos Lagos).

**No ar:** https://nathang546-cmyk.github.io/casa-familia-araruama/

## O que tem no site

- **Abertura** com a foto da piscina e o nome animado.
- **Tour pela casa** (10 ambientes): no computador, os textos rolam à esquerda e a foto troca dentro de um arco fixo à direita (o mesmo formato da logo), com uma cortina; no celular, os ambientes aparecem em sequência. A rolagem é sempre a normal do navegador: nada trava a tela.
- **Galeria** com filtros (casa, quartos, banheiros, lazer, condomínio) e foto ampliada.
- **Comodidades**, **lazer do condomínio**, **o que fazer em Araruama** (lagoa, praias, esportes, onde comer e passeios, com distâncias para um bate-volta), **opções de reserva** (casa toda ou só a edícula), botão para enviar o site à família, **perguntas frequentes** (baseadas no contrato) e **contato**.
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
| Seção "O que fazer em Araruama" (fotos, restaurantes, passeios e créditos) | `index.html`, bloco `ARREDORES` |
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

- Animações: [GSAP](https://gsap.com) e ScrollTrigger (licença gratuita da GSAP). Os arquivos estão em `assets/vendor/`.
- Ícones: [Lucide](https://lucide.dev) (ISC).
- Fontes: Playfair Display e Montserrat (Google Fonts).
- Fotos da casa e do condomínio: Casa Família.
- Fotos de Araruama (Wikimedia Commons, com crédito em cada foto no site): Delano Campello (CC BY-SA 3.0), Vinícius94 (CC BY-SA 4.0), Gladstone (CC BY-SA 3.0), M.Pereira (CC BY 3.0), Guilherme Alves dos Santos (CC BY-SA 4.0).
- Sugestões de restaurantes e passeios: pesquisa em Restaurant Guru, Tripadvisor e guias da Região dos Lagos (out/2026).
- Distâncias: rotas calculadas com OpenStreetMap (OSRM), aproximadas e sem trânsito.
