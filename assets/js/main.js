/* Casa Família · interações do site
   GSAP + ScrollTrigger (animações por rolagem) e Lenis (rolagem suave). */
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
    F('fachada', 'casa', 'Fachada', 1600, 900), F('varanda', 'casa', 'Varanda', 1600, 900),
    F('varanda2', 'casa', 'Varanda com móveis de madeira', 505, 647), F('varanda3', 'casa', 'Vista da varanda', 505, 647),
    F('sala', 'casa', 'Sala de estar', 1600, 900), F('sala2', 'casa', 'Sala e jantar integrados', 505, 647),
    F('jantar', 'casa', 'Mesa de jantar', 505, 647), F('aparador', 'casa', 'Hall de entrada', 505, 647),
    F('hall', 'casa', 'Sala e hall', 1600, 900), F('cozinha', 'casa', 'Cozinha', 1152, 1536),
    F('cozinha2', 'casa', 'Cooktop com coifa', 1536, 1152), F('cozinha3', 'casa', 'Mesa da cozinha', 1152, 1536),
    F('cozinha4', 'casa', 'Bancada da cozinha', 1152, 1536), F('bikes', 'casa', 'Bicicletas e stand up paddle', 505, 647),
    F('suite', 'quartos', 'Suíte', 505, 647), F('suite2', 'quartos', 'Suíte', 505, 647),
    F('q2', 'quartos', 'Quarto 2', 505, 647), F('q2b', 'quartos', 'Quarto 2 com escrivaninha', 505, 647),
    F('q3', 'quartos', 'Quarto 3', 1152, 1536), F('q3b', 'quartos', 'Quarto 3', 1152, 1536),
    F('edicula', 'quartos', 'Edícula', 1280, 720), F('edicula2', 'quartos', 'Quarto da edícula', 720, 1280),
    F('edicula3', 'quartos', 'Cantinho de leitura da edícula', 720, 1280), F('enxoval', 'quartos', 'Enxoval Casa Família', 505, 647),
    F('suite_banho', 'banheiros', 'Banheiro da suíte', 720, 1280), F('suite_banho2', 'banheiros', 'Box do banheiro da suíte', 720, 1280),
    F('banho', 'banheiros', 'Banheiro social', 1152, 1536), F('banho2', 'banheiros', 'Banheiro social', 1152, 1536),
    F('edicula_banho', 'banheiros', 'Banheiro da edícula', 720, 1280),
    F('piscina', 'lazer', 'Piscina e área gourmet', 1280, 960), F('piscina_hero', 'lazer', 'Área externa', 1280, 760),
    F('piscina2', 'lazer', 'Piscina privativa', 1080, 1440), F('capa', 'lazer', 'Cascata da piscina', 1080, 1440),
    F('piscina3', 'lazer', 'Piscina e mesas externas', 1080, 1440), F('piscina4', 'lazer', 'Mesa com ombrelone', 1080, 1440),
    F('gourmet', 'lazer', 'Área gourmet com churrasqueira', 1080, 1440), F('gourmet2', 'lazer', 'Mesa externa', 1080, 1440),
    F('chopeira', 'lazer', 'Chopeira e máquina de gelo', 1080, 1440), F('jardim', 'lazer', 'Jardim de inverno', 1080, 1440),
    F('jardim2', 'lazer', 'Cantinho do café', 1080, 1440), F('lavanderia', 'lazer', 'Lavanderia', 1080, 1440),
    F('lavanderia2', 'lazer', 'Lavanderia', 1080, 1440),
    F('condo_quiosques', 'condominio', 'Piscina com quiosques', 960, 1280), F('condo_piscina', 'condominio', 'Piscinas do condomínio', 720, 1280),
    F('quadra', 'condominio', 'Quadra poliesportiva', 960, 1280), F('campo', 'condominio', 'Campo de futebol', 1280, 960),
    F('playground', 'condominio', 'Playground', 960, 1280), F('condo_parquinho', 'condominio', 'Playground ao entardecer', 960, 1280),
    F('condo_jardim', 'condominio', 'Jardins', 960, 1280), F('condo_jardim2', 'condominio', 'Jardins e alamedas', 960, 1280),
    F('condo_alameda', 'condominio', 'Alameda arborizada', 720, 1280), F('condo_pergolado', 'condominio', 'Pergolado', 960, 1280),
    F('condo_gazebo', 'condominio', 'Área verde', 720, 1280), F('condo_palmeiras', 'condominio', 'Palmeiras ao pôr do sol', 960, 1280),
    F('condo_sunset', 'condominio', 'Pôr do sol na piscina', 960, 1280),
  ];
  const byId = Object.fromEntries(FOTOS.map(f => [f.id, f]));
  const src = (id, size) => `assets/img/fotos/${id}-${size}.webp`;
  const DESTAQUES = ['piscina', 'sala', 'piscina2', 'cozinha', 'q3', 'gourmet', 'fachada', 'capa', 'suite', 'banho2',
    'edicula', 'chopeira', 'condo_quiosques', 'jardim', 'cozinha2', 'condo_sunset'];
  const ordem = [...DESTAQUES.map(id => byId[id]), ...FOTOS.filter(f => !DESTAQUES.includes(f.id))];

  /* ---------------- lightbox ---------------- */
  let lenis = null;
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
    renderLB(); lb.hidden = false; document.body.style.overflow = 'hidden'; lenis && lenis.stop();
    $('[data-lb-close]').focus();
  };
  const closeLB = () => { lb.hidden = true; document.body.style.overflow = ''; lenis && lenis.start(); lastFocus && lastFocus.focus(); };
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

  /* ---------------- vídeo ---------------- */
  const video = $('[data-video]');
  const sound = $('[data-sound]');
  if (video) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: .4 }).observe(video);
    sound.addEventListener('click', () => {
      video.muted = !video.muted;
      if (!video.muted) video.play().catch(() => {});
      sound.innerHTML = `<svg class="i"><use href="#i-${video.muted ? 'volume-x' : 'volume-2'}"/></svg>`;
      sound.setAttribute('aria-label', video.muted ? 'Ativar som' : 'Desativar som');
    });
  }
  const share = $('[data-share]');
  share && share.addEventListener('click', () => {
    const url = location.href.split('#')[0];
    const text = 'Olha essa casa de temporada em Araruama! Piscina privativa e lazer para a família toda:';
    if (navigator.share) navigator.share({ title: 'Casa Família · Araruama/RJ', text, url }).catch(() => {});
    else window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank', 'noopener');
  });

  /* ---------------- condomínio: no celular (ou sem animação) o texto fica acima dos cards ---------------- */
  const condoPin = $('[data-condo]'), condoTrack = $('[data-condo-track]'), condoIntro = $('.condo-intro');
  const mqCondo = matchMedia('(min-width: 900px)');
  const placeCondoIntro = () => {
    const inTrack = mqCondo.matches && motion && !!window.gsap;
    if (inTrack && condoIntro.parentNode !== condoTrack) condoTrack.prepend(condoIntro);
    if (!inTrack && condoIntro.parentNode !== condoPin) condoPin.prepend(condoIntro);
  };
  placeCondoIntro();
  mqCondo.addEventListener('change', placeCondoIntro);

  /* ---------------- sem GSAP ou com movimento reduzido: para aqui ---------------- */
  const anchorScroll = (target) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else (target === 0 ? window.scrollTo({ top: 0, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
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

  if (window.Lenis) {
    lenis = new Lenis({ lerp: .1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

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

  /* ---------------- TOUR: atravessar as portas em arco ---------------- */
  const stage = $('[data-tour]');
  const layers = $$('.tour-layer', stage);
  const map = $('[data-tour-map]');
  const hint = $('[data-tour-hint]');
  const mapBtns = layers.map((l, i) => {
    const b = document.createElement('button');
    b.textContent = l.dataset.room; b.setAttribute('aria-label', `Ir para ${l.dataset.room}`);
    map.appendChild(b); return b;
  });
  const STEP = 1.45;
  const NOSNAP = /[?&]nosnap(&|=|$)/.test(location.search); // só para testes
  const mm = gsap.matchMedia();
  // computador: a seção trava e as salas abrem pelo arco conforme a rolagem
  mm.add('(min-width: 761px)', () => {
    const mobile = false;
    // A próxima sala nasce dentro do arco da foto (como uma cortina subindo) e depois toma a tela.
    const geo = layer => {
      const a = $('.tour-arch', layer), inner = $('.tour-inner', layer);
      return { x: a.offsetLeft + inner.offsetLeft, y: a.offsetTop + inner.offsetTop, w: a.offsetWidth, h: a.offsetHeight, W: layer.offsetWidth, H: layer.offsetHeight };
    };
    const inset = (t, r, b, l, rad) => `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px ${rad}px 24px 24px)`;
    const ARCH = layer => { const g = geo(layer); return inset(g.y, g.W - g.x - g.w, g.H - g.y - g.h, g.x, g.w / 2); };
    const CLOSED = layer => { const g = geo(layer); return inset(g.y + g.h, g.W - g.x - g.w, g.H - g.y - g.h, g.x, g.w / 2); };
    const OPEN = 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)';
    layers.forEach((l, i) => { l.style.zIndex = i + 1; });
    layers.slice(1).forEach(l => gsap.set(l, { clipPath: CLOSED(l) }));
    gsap.set($$('.tour-bg img', stage), { scale: 1.12 });

    const times = [0];
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage, start: 'top top', pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        end: () => `+=${(layers.length - 1) * window.innerHeight * (mobile ? .95 : 1.15)}`,
        snap: NOSNAP ? false : { snapTo: 'labels', inertia: false, duration: { min: .25, max: .9 }, delay: .12, ease: 'power1.inOut' },
        onUpdate: self => {
          const t = self.progress * tl.duration();
          let best = 0;
          times.forEach((x, i) => { if (Math.abs(x - t) < Math.abs(times[best] - t)) best = i; });
          mapBtns.forEach((b, i) => b.classList.toggle('is-active', i === best));
          hint && (hint.style.opacity = self.progress > .02 ? 0 : 1);
        },
      },
    });
    tl.addLabel('r0', 0);
    for (let i = 1; i < layers.length; i++) {
      const at = (i - 1) * STEP + .25;
      const prev = layers[i - 1], cur = layers[i];
      tl.to($('.tour-text', prev), { y: -40, opacity: 0, duration: .4, ease: 'power2.in' }, at)
        .to($('.tour-bg img', prev), { scale: 1.3, duration: 1.1 }, at)
        .fromTo(cur, { clipPath: () => CLOSED(cur) }, { clipPath: () => ARCH(cur), duration: .45, ease: 'power2.inOut', immediateRender: false }, at)
        .fromTo($('.tour-arch', cur), { scale: 1.08 }, { scale: 1, duration: 1.05, ease: 'power2.out', immediateRender: false }, at)
        .to(cur, { clipPath: OPEN, duration: .65, ease: 'power3.inOut' }, at + .45)
        .fromTo($('.tour-bg img', cur), { scale: 1.4 }, { scale: 1.12, duration: .7, ease: 'power2.out', immediateRender: false }, at + .45)
        .fromTo($('.tour-text', cur), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .55, ease: 'power3.out' }, at + .7);
      tl.addLabel(`r${i}`, at + 1.2);
      times.push(at + 1.2);
    }
    tl.to({}, { duration: .35 });

    mapBtns.forEach((b, i) => {
      b.onclick = () => {
        const st = tl.scrollTrigger;
        anchorScroll(st.start + (st.end - st.start) * (times[i] / tl.duration()));
      };
    });
    mapBtns[0].classList.add('is-active');
    return () => { gsap.set(layers, { clearProps: 'clipPath,zIndex' }); };
  });

  // celular: sequência vertical, só rolar para baixo; cada foto abre no arco ao aparecer na tela
  mm.add('(max-width: 760px)', () => {
    layers.forEach(layer => {
      const img = $('.tour-arch img', layer), txt = $('.tour-text', layer);
      gsap.timeline({ scrollTrigger: { trigger: layer, start: 'top 82%', once: true } })
        .fromTo(img, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' })
        .to(img, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0)
        .fromTo(txt, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out' }, .35);
    });
  });

  /* ---------------- CONDOMÍNIO: rolagem horizontal (computador) ---------------- */
  mm.add('(min-width: 900px)', () => {
    const pinEl = $('[data-condo]'); const track = $('[data-condo-track]');
    pinEl.classList.add('h-mode');
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    gsap.to(track, { x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: pinEl, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
    return () => pinEl.classList.remove('h-mode');
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
