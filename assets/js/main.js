/* Casa Família · interações do site
   GSAP + ScrollTrigger para as animações; a rolagem é a nativa do navegador. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const motion = root.classList.contains('motion');

  /* ---------------- WhatsApp com mensagem pronta ---------------- */
  const WA = '5521998092708';
  const MSG = {
    geral: 'Olá! Vi o site da Casa Família e gostaria de consultar datas e valores.',
    casa: 'Olá! Vi o site da Casa Família e quero consultar datas para a casa toda.',
    edicula: 'Olá! Vi o site da Casa Família e quero consultar datas para a edícula.',
  };
  $$('[data-wa]').forEach(a => { a.href = `https://wa.me/${WA}?text=${encodeURIComponent(MSG[a.dataset.wa] || MSG.geral)}`; });

  /* ---------------- fotos ---------------- */
  const F = (id, cat, t, w, h) => ({ id, cat, t, w, h });
  const FOTOS = [
    F('fachada_nova', 'casa', 'Fachada', 1280, 960), F('varanda_nova', 'casa', 'Varanda e garagem', 1280, 960),
    F('varanda_nova2', 'casa', 'Varanda com garagem coberta', 960, 1280), F('sala', 'casa', 'Sala de estar', 1600, 900), F('sala2', 'casa', 'Sala e jantar integrados', 505, 647),
    F('jantar', 'casa', 'Mesa de jantar', 505, 647), F('hall', 'casa', 'Sala e hall', 1600, 900), F('cozinha', 'casa', 'Cozinha', 1152, 1536),
    F('cozinha2', 'casa', 'Cooktop com coifa', 1536, 1152), F('cozinha3', 'casa', 'Mesa da cozinha', 1152, 1536),
    F('suite', 'quartos', 'Suíte', 505, 647), F('suite2', 'quartos', 'Suíte', 505, 647),
    F('q2', 'quartos', 'Quarto 2', 505, 647), F('q2b', 'quartos', 'Quarto 2 com escrivaninha', 505, 647),
    F('q3', 'quartos', 'Quarto 3', 1152, 1536), F('q3b', 'quartos', 'Quarto 3', 1152, 1536),
    F('edicula', 'quartos', 'Edícula', 1280, 720), F('edicula2', 'quartos', 'Quarto da edícula', 720, 1280),
    F('edicula3', 'quartos', 'Cantinho de leitura da edícula', 720, 1280), F('enxoval', 'quartos', 'Enxoval Casa Família', 505, 647),
    F('suite_banho', 'banheiros', 'Banheiro da suíte', 720, 1280), F('suite_banho2', 'banheiros', 'Box do banheiro da suíte', 720, 1280),
    F('banho', 'banheiros', 'Banheiro social', 1152, 1536), F('banho2', 'banheiros', 'Banheiro social', 1152, 1536),
    F('edicula_banho', 'banheiros', 'Banheiro da edícula', 720, 1280),
    F('piscina2', 'lazer', 'Piscina privativa', 1080, 1440), F('capa', 'lazer', 'Cascata da piscina', 1080, 1440),
    F('piscina3', 'lazer', 'Piscina e mesas externas', 1080, 1440), F('piscina4', 'lazer', 'Mesa com ombrelone', 1080, 1440),
    F('area_externa', 'lazer', 'Área externa', 1280, 720),
    F('gourmet', 'lazer', 'Área gourmet com churrasqueira', 1080, 1440), F('gourmet2', 'lazer', 'Mesa externa', 1080, 1440),
    F('jardim', 'lazer', 'Jardim de inverno', 1080, 1440),
    F('jardim2', 'lazer', 'Cantinho do café', 1080, 1440), F('lavanderia', 'lazer', 'Lavanderia', 1080, 1440),
    F('condo_quiosques', 'condominio', 'Piscina com quiosques', 960, 1280), F('condo_piscina', 'condominio', 'Piscinas do condomínio', 720, 1280),
    F('quadra', 'condominio', 'Quadra poliesportiva', 960, 1280), F('campo', 'condominio', 'Campo de futebol', 1280, 960),
    F('playground', 'condominio', 'Playground', 960, 1280), F('condo_jardim', 'condominio', 'Jardins', 960, 1280), F('condo_alameda', 'condominio', 'Alameda arborizada', 720, 1280), F('condo_pergolado', 'condominio', 'Pergolado', 960, 1280),
    F('condo_palmeiras', 'condominio', 'Palmeiras ao pôr do sol', 960, 1280),
    F('condo_sunset', 'condominio', 'Pôr do sol na piscina', 960, 1280),
  ];
  const byId = Object.fromEntries(FOTOS.map(f => [f.id, f]));
  const src = (id, size) => `assets/img/fotos/${id}-${size}.webp`;
  const DESTAQUES = ['area_externa', 'sala', 'piscina2', 'cozinha', 'q3', 'gourmet', 'fachada_nova', 'capa', 'suite', 'banho2',
    'edicula', 'varanda_nova', 'condo_quiosques', 'jardim', 'cozinha2', 'condo_sunset'];
  const ordem = [...DESTAQUES.map(id => byId[id]), ...FOTOS.filter(f => !DESTAQUES.includes(f.id))];

  /* ---------------- lightbox ---------------- */
  const lb = $('[data-lightbox]');
  const lbImg = $('[data-lb-img]');
  let lbList = [], lbIndex = 0, lastFocus = null;
  const renderLB = () => {
    const f = lbList[lbIndex];
    lbImg.src = src(f.id, 1600);
    lbImg.alt = f.t;
    $('[data-lb-cap]').textContent = f.t;
    $('[data-lb-count]').textContent = `${lbIndex + 1} / ${lbList.length}`;
    [lbList[(lbIndex + 1) % lbList.length], lbList[(lbIndex - 1 + lbList.length) % lbList.length]]
      .forEach(n => { const im = new Image(); im.src = src(n.id, 1600); });
  };
  const openLB = (list, i) => {
    lbList = list; lbIndex = i; lastFocus = document.activeElement;
    renderLB(); lb.hidden = false; document.body.style.overflow = 'hidden';
    $('[data-lb-close]').focus();
  };
  const closeLB = () => { lb.hidden = true; document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
  const stepLB = d => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; renderLB(); };
  $('[data-lb-close]').addEventListener('click', closeLB);
  $('[data-lb-prev]').addEventListener('click', () => stepLB(-1));
  $('[data-lb-next]').addEventListener('click', () => stepLB(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowRight') stepLB(1);
    if (e.key === 'ArrowLeft') stepLB(-1);
  });
  let px = null;
  lb.addEventListener('pointerdown', e => { px = e.clientX; });
  lb.addEventListener('pointerup', e => { if (px !== null && Math.abs(e.clientX - px) > 50) stepLB(e.clientX < px ? 1 : -1); px = null; });

  /* ---------------- galeria ---------------- */
  const gal = $('[data-gallery]');
  const LIMITE = 16;
  let filtro = 'todos', mostrarTudo = false;
  ordem.forEach((f, i) => {
    const b = document.createElement('button');
    const ratio = f.w / f.h;
    b.className = 'tile' + (ratio > 1.2 ? ' wide tall' : (i % 3 === 2 ? '' : ' tall'));
    b.dataset.cat = f.cat; b.dataset.id = f.id;
    b.setAttribute('aria-label', `Ampliar foto: ${f.t}`);
    b.innerHTML = `<img src="${src(f.id, 800)}" alt="${f.t}" loading="lazy" width="${f.w}" height="${f.h}"><span>${f.t}</span>`;
    gal.appendChild(b);
  });
  const mais = document.createElement('button');
  mais.className = 'btn btn-line gallery-more';
  gal.after(mais);
  const visiveis = () => $$('.tile', gal).filter(t => !t.classList.contains('is-hidden'));
  const aplicarFiltro = () => {
    let n = 0;
    $$('.tile', gal).forEach(t => {
      const ok = filtro === 'todos' || t.dataset.cat === filtro;
      const cabe = filtro !== 'todos' || mostrarTudo || n < LIMITE;
      t.classList.toggle('is-hidden', !(ok && cabe));
      if (ok) n++;
    });
    const resto = FOTOS.length - LIMITE;
    mais.hidden = !(filtro === 'todos' && !mostrarTudo);
    mais.textContent = `Ver todas as fotos (+${resto})`;
    if (window.gsap && motion) gsap.fromTo(visiveis(), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .025, ease: 'power2.out', overwrite: true });
    window.ScrollTrigger && ScrollTrigger.refresh();
  };
  mais.addEventListener('click', () => { mostrarTudo = true; aplicarFiltro(); });
  $$('[data-filter]').forEach(b => b.addEventListener('click', () => {
    $$('[data-filter]').forEach(x => x.classList.toggle('is-active', x === b));
    filtro = b.dataset.filter; aplicarFiltro();
  }));
  gal.addEventListener('click', e => {
    const t = e.target.closest('.tile'); if (!t) return;
    const list = visiveis().map(x => byId[x.dataset.id]);
    openLB(list, list.findIndex(f => f.id === t.dataset.id));
  });
  aplicarFiltro();

  /* ---------------- miniaturas do tour ---------------- */
  $$('[data-thumbs]').forEach(box => {
    const list = box.dataset.thumbs.split(',').map(id => byId[id]).filter(Boolean);
    list.forEach((f, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Ver foto: ${f.t}`);
      b.innerHTML = `<img src="${src(f.id, 800)}" alt="" loading="lazy">`;
      b.addEventListener('click', () => openLB(list, i));
      box.appendChild(b);
    });
  });

  /* ---------------- cabeçalho e menu ---------------- */
  const nav = $('[data-nav]');
  const toggle = $('[data-menu-toggle]');
  const fab = $('.fab');
  const fecharMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open));
  });
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-solid', y > 40);
    fab.classList.toggle('is-visible', y > window.innerHeight * .6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const share = $('[data-share]');
  share && share.addEventListener('click', () => {
    const url = location.href.split('#')[0];
    const text = 'Olha essa casa de temporada em Araruama! Piscina privativa e lazer para a família toda:';
    if (navigator.share) navigator.share({ title: 'Casa Família · Araruama/RJ', text, url }).catch(() => {});
    else window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank', 'noopener');
  });

  /* ---------------- TOUR ----------------
     Computador: os textos rolam à esquerda e o arco à direita fica fixo; quando um ambiente chega
     ao meio da tela, a foto troca dentro do arco com uma cortina (descendo: sobe; subindo: desce).
     Rolagem 100% normal: nada trava, nada puxa. Celular: cada ambiente com a própria foto. */
  const stage = $('[data-tour]');
  const steps = $$('.tour-step', stage);
  const sticky = document.createElement('div');
  sticky.className = 'tour-sticky';
  sticky.setAttribute('aria-hidden', 'true');
  sticky.innerHTML = '<div class="tour-frame-wrap"><div class="tour-frame"></div></div><p class="tour-label"></p><div class="tour-dots"></div>';
  const frame = $('.tour-frame', sticky), dots = $('.tour-dots', sticky), label = $('.tour-label', sticky);
  const titles = steps.map(st => $('h3', st).textContent);
  const pics = steps.map((st, i) => {
    const orig = $('.tour-arch img', st);
    const im = document.createElement('img');
    im.className = 'tour-pic' + (i === 0 ? ' is-first' : '');
    im.src = orig.getAttribute('src'); im.alt = ''; im.decoding = 'async';
    frame.appendChild(im);
    const b = document.createElement('button');
    b.tabIndex = -1;
    b.addEventListener('click', () => st.scrollIntoView({ behavior: motion ? 'smooth' : 'auto', block: 'center' }));
    dots.appendChild(b);
    return im;
  });
  stage.appendChild(sticky);
  let atual = -1, camada = 1;
  const ativar = i => {
    if (i === atual) return;
    const dir = i > atual ? 1 : -1, primeira = atual === -1;
    atual = i;
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    [...dots.children].forEach((b, k) => b.classList.toggle('is-active', k === i));
    label.textContent = titles[i];
    const pic = pics[i];
    pic.classList.remove('is-first');
    pic.style.zIndex = ++camada;
    if (primeira) { pic.style.transition = 'none'; pic.style.clipPath = 'inset(0% 0% 0% 0%)'; pic.style.transform = 'none'; return; }
    pic.style.transition = 'none';
    pic.style.clipPath = dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)';
    pic.style.transform = 'scale(1.08)';
    void pic.offsetWidth;
    pic.style.transition = '';
    pic.style.clipPath = 'inset(0% 0% 0% 0%)';
    pic.style.transform = 'scale(1)';
  };
  // o ambiente que cruza a faixa do meio da tela vira o ativo
  const observador = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) ativar(steps.indexOf(e.target)); });
  }, { rootMargin: '-48% 0px -48% 0px' });
  steps.forEach(st => observador.observe(st));
  ativar(0);

  /* ---------------- sem GSAP ou com movimento reduzido: para aqui ---------------- */
  const anchorScroll = target => {
    const behavior = motion ? 'smooth' : 'auto';
    if (target === 0) window.scrollTo({ top: 0, behavior }); else target.scrollIntoView({ behavior });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const el = id === '#topo' ? 0 : $(id);
    if (el === null) return;
    e.preventDefault(); fecharMenu(); anchorScroll(el);
  });
  if (!window.gsap || !window.ScrollTrigger || !motion) return;

  gsap.registerPlugin(ScrollTrigger);
  // celular: não recalcula tudo quando a barra de endereço aparece/some (evita pulos no tour)
  ScrollTrigger.config({ ignoreMobileResize: true });
  root.classList.add('gsap-ready');

  /* hero: título letra a letra e foto aproximando */
  const split = el => {
    [...el.childNodes].forEach(node => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span'); w.className = 'w';
          [...part].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; w.appendChild(s); });
          frag.appendChild(w);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) split(node);
    });
  };
  $$('[data-split]').forEach(split);
  gsap.from('[data-hero-media]', { scale: 1.16, duration: 2.6, ease: 'power2.out' });
  gsap.from('.hero-title .ch', { yPercent: 115, duration: 1.15, ease: 'power3.out', stagger: .05, delay: .15 });
  gsap.from(['.hero .eyebrow', '.hero-sub', '.hero-ctas', '.hero-facts'], { y: 26, opacity: 0, duration: 1, stagger: .12, delay: .6, ease: 'power2.out' });
  gsap.to('[data-hero-media] img', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('[data-hero-content]', { y: -90, opacity: 0, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: '65% top', scrub: true } });

  /* textos que aparecem ao rolar */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .1, overwrite: true }),
  });

  /* números contando */
  $$('[data-count]').forEach(el => {
    const alvo = +el.dataset.count; const o = { v: 0 }; el.textContent = '0';
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(o, { v: alvo, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
  });

  /* parallax suave */
  $$('[data-parallax]').forEach(el => {
    const v = +el.dataset.parallax;
    gsap.fromTo(el, { yPercent: -v / 2 }, { yPercent: v / 2, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.fromTo('[data-parallax-bg]', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.closing', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* tour no celular: cada foto abre no arco ao aparecer na tela */
  const mm = gsap.matchMedia();
  mm.add('(max-width: 760px)', () => {
    steps.forEach(st => {
      const img = $('.tour-arch img', st), txt = $('.tour-text', st);
      gsap.timeline({ scrollTrigger: { trigger: st, start: 'top 82%', once: true } })
        .fromTo(img, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' })
        .to(img, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0)
        .fromTo(txt, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out' }, .35);
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();

