/* Albuquerque Advocacia · projeto fictício de portfólio · Luccas Santana */
(() => {
  'use strict';

  const WA_NUMBER = '5500900000000';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = () => !!(navigator.connection && navigator.connection.saveData);

  const watch = (el, cb, rootMargin = '200px') => {
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    new IntersectionObserver((entries) => cb(entries[0].isIntersecting), { rootMargin }).observe(el);
  };

  /* Vídeos: tocam só quando aparecem na tela */
  $$('video[data-auto]').forEach((video) => {
    video.muted = true;
    const lazy = video.hasAttribute('data-lazy');
    watch(video, (visible) => {
      if (!visible) { video.pause(); return; }
      if (reduceMotion() || saveData()) { video.pause(); return; }
      if (lazy) video.preload = 'auto';
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    });
  });

  /* Links do WhatsApp com mensagem pronta (inclui a área escolhida) */
  const areaSelect = $('#area');
  const updateWhatsApp = () => {
    const area = areaSelect ? areaSelect.value : '';
    const msg = area && area !== 'Outro / não sei'
      ? `Olá! Gostaria de falar com a Albuquerque Advocacia sobre ${area}.`
      : 'Olá! Gostaria de falar com a Albuquerque Advocacia sobre o meu caso.';
    const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    $$('[data-wa]').forEach((a) => { a.href = href; });
  };
  updateWhatsApp();

  /* "Conte-nos sobre o seu caso": abre o WhatsApp com nome e área já escritos */
  const caseWa = $('#case-wa');
  const updateCase = () => {
    if (!caseWa) return;
    const nome = ($('#nome') || {}).value ? $('#nome').value.trim() : '';
    const area = areaSelect && areaSelect.value && areaSelect.value !== 'Outro / não sei' ? areaSelect.value : '';
    const msg = 'Olá! ' + (nome ? 'Sou ' + nome + '. ' : '') + 'Gostaria de falar com a Albuquerque Advocacia' + (area ? ' sobre ' + area : '') + '. Meu caso: ';
    caseWa.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };
  updateCase();
  ['#nome', '#area'].forEach((s) => { const el = $(s); if (el) { el.addEventListener('input', updateCase); el.addEventListener('change', updateCase); } });

  /* Botão de voltar ao topo */
  const hero = $('#hero');
  const toTop = $('#totop');
  if (hero && toTop) watch(hero, (visible) => { toTop.hidden = visible; }, '0px');

  /* Menu do celular */
  const burger = $('#burger');
  const menu = $('#menu-movel');
  const menuClose = $('#menu-close');
  const openMenu = () => {
    menu.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    menuClose.focus();
  };
  const closeMenu = (refocus = true) => {
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    if (refocus) burger.focus({ preventScroll: true });
  };
  if (burger && menu) {
    burger.addEventListener('click', openMenu);
    menuClose.addEventListener('click', () => closeMenu());
    $$('[data-close]', menu).forEach((a) => a.addEventListener('click', () => closeMenu(false)));
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
      if (e.key !== 'Tab') return;
      const items = $$('a[href], button', menu);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* Áreas: cartão "Primeiro passo" que acompanha o cursor */
  const areaList = $('#area-list');
  const card = $('#area-card');
  if (areaList && card) {
    const rows = $$('.area-row', areaList);
    const cardIcon = $('[data-card-icon]', card);
    const cardStep = $('[data-card-step]', card);
    const activate = (row) => {
      rows.forEach((r) => r.classList.toggle('is-active', r === row));
      cardIcon.setAttribute('d', row.dataset.icon);
      cardStep.textContent = row.dataset.step;
      card.classList.add('show');
    };
    const deactivate = () => {
      rows.forEach((r) => r.classList.remove('is-active'));
      card.classList.remove('show');
    };
    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => activate(row));
      const pick = $('.area-pick', row);
      pick.addEventListener('focus', () => {
        card.style.setProperty('--py', `${Math.round(row.offsetTop + row.offsetHeight / 2)}px`);
        card.style.setProperty('--dx', '0px');
        card.style.setProperty('--rot', '0deg');
        activate(row);
      });
      pick.addEventListener('blur', deactivate);
      pick.addEventListener('click', () => {
        if (!areaSelect) return;
        areaSelect.value = row.dataset.area;
        setError('area', '');
        updateWhatsApp();

  /* "Conte-nos sobre o seu caso": abre o WhatsApp com nome e área já escritos */
  const caseWa = $('#case-wa');
  const updateCase = () => {
    if (!caseWa) return;
    const nome = ($('#nome') || {}).value ? $('#nome').value.trim() : '';
    const area = areaSelect && areaSelect.value && areaSelect.value !== 'Outro / não sei' ? areaSelect.value : '';
    const msg = 'Olá! ' + (nome ? 'Sou ' + nome + '. ' : '') + 'Gostaria de falar com a Albuquerque Advocacia' + (area ? ' sobre ' + area : '') + '. Meu caso: ';
    caseWa.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };
  updateCase();
  ['#nome', '#area'].forEach((s) => { const el = $(s); if (el) { el.addEventListener('input', updateCase); el.addEventListener('change', updateCase); } });
      });
    });
    areaList.addEventListener('mouseleave', deactivate);
    areaList.addEventListener('mousemove', (e) => {
      const r = areaList.getBoundingClientRect();
      const dx = Math.max(-20, Math.min(20, ((e.clientX - r.left) - r.width * 0.5) * 0.06));
      card.style.setProperty('--dx', `${dx.toFixed(1)}px`);
      card.style.setProperty('--py', `${Math.round(e.clientY - r.top)}px`);
      card.style.setProperty('--rot', `${(dx / 5).toFixed(2)}deg`);
    });
  }

  /* Balões: movimento contínuo, arraste e volta infinita */
  const mq = $('#mq');
  if (mq) {
    const track = $('.mq-track', mq);
    const base = [...track.children];
    for (let k = 0; k < 2; k++) {
      base.forEach((li) => {
        const copy = li.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        track.appendChild(copy);
      });
    }
    const n = base.length;
    let period = 0;
    let pos = 0;
    let hold = false;
    let drag = null;
    let visible = false;
    let raf = null;
    let last = 0;
    let resumeTimer = null;

    const getPeriod = () => {
      if (!period) period = track.children[n].offsetLeft - track.children[0].offsetLeft;
      return period;
    };
    const wrap = () => {
      const p = getPeriod();
      if (p > 0) {
        while (pos >= 2 * p) pos -= p;
        while (pos < p) pos += p;
      }
      mq.scrollLeft = pos;
    };
    const tick = (t) => {
      raf = null;
      if (!visible || reduceMotion()) { last = 0; return; }
      const dt = last ? Math.min(64, t - last) : 16;
      last = t;
      if (!drag) {
        if (hold) pos = mq.scrollLeft;
        else { pos += 34 * dt / 1000; wrap(); }
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf && visible && !reduceMotion()) { last = 0; raf = requestAnimationFrame(tick); }
    };

    requestAnimationFrame(() => {
      const p = getPeriod();
      if (p > 0) { pos = p; mq.scrollLeft = p; }
    });
    if ('ResizeObserver' in window) new ResizeObserver(() => { period = 0; }).observe(mq);
    watch(mq, (v) => { visible = v; if (v) start(); });

    mq.addEventListener('scroll', () => {
      if (drag || !hold) return;
      const p = getPeriod();
      if (p > 0) {
        if (mq.scrollLeft < p * 0.5) mq.scrollLeft += p;
        else if (mq.scrollLeft > p * 2.5) mq.scrollLeft -= p;
      }
      pos = mq.scrollLeft;
    }, { passive: true });

    mq.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      drag = { x: e.clientX, s: mq.scrollLeft };
      mq.classList.add('dragging');
      mq.setPointerCapture(e.pointerId);
    });
    mq.addEventListener('pointermove', (e) => {
      if (!drag) return;
      pos = drag.s - (e.clientX - drag.x);
      const p = getPeriod();
      if (p > 0 && (pos < p * 0.5 || pos > p * 2.5)) {
        const shift = pos < p * 0.5 ? p : -p;
        pos += shift;
        drag.s += shift;
      }
      mq.scrollLeft = pos;
    });
    const endDrag = () => {
      if (!drag) return;
      drag = null;
      mq.classList.remove('dragging');
    };
    mq.addEventListener('pointerup', endDrag);
    mq.addEventListener('pointercancel', endDrag);

    const holdOn = () => { clearTimeout(resumeTimer); hold = true; };
    const holdOff = () => { hold = false; start(); };
    mq.addEventListener('mouseenter', holdOn);
    mq.addEventListener('mouseleave', holdOff);
    mq.addEventListener('focus', holdOn);
    mq.addEventListener('blur', holdOff);
    mq.addEventListener('touchstart', holdOn, { passive: true });
    mq.addEventListener('touchend', () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(holdOff, 2000);
    });
  }

  /* FAQ */
  const faqButtons = $$('.faq-btn');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';
      faqButtons.forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        $(`#${b.getAttribute('aria-controls')}`).hidden = true;
      });
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        $(`#${btn.getAttribute('aria-controls')}`).hidden = false;
      }
    });
  });

  /* Formulário de contato */
  const form = $('#form');
  const success = $('#success');
  const fields = ['nome', 'tel', 'email', 'area', 'lgpd'];

  function setError(key, message) {
    const input = $(`#${key}`);
    const span = $(`#e-${key}`);
    if (!input || !span) return;
    if (message) {
      span.textContent = message;
      span.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', `e-${key}`);
    } else {
      span.hidden = true;
      input.setAttribute('aria-invalid', 'false');
      input.removeAttribute('aria-describedby');
    }
  }

  const maskPhone = (value) => {
    let d = String(value).replace(/\D/g, '');
    if (d.length > 11 && d.startsWith('55')) d = d.slice(2);
    if (d.length > 11 && d.startsWith('0')) d = d.slice(1);
    d = d.slice(0, 11);
    if (!d.length) return '';
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  if (form && success) {
    const tel = $('#tel');
    const urgente = $('#urgente');
    const urgBox = $('#urg-box');
    const sendBtn = $('#send');
    const sendLabel = $('#send-label');
    let prevTel = '';

    tel.addEventListener('input', () => {
      let raw = tel.value;
      if (raw.length < prevTel.length && maskPhone(raw) === prevTel) raw = prevTel.replace(/\D/g, '').slice(0, -1);
      tel.value = maskPhone(raw);
      prevTel = tel.value;
    });

    fields.forEach((key) => {
      const el = $(`#${key}`);
      el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', () => setError(key, ''));
    });
    areaSelect.addEventListener('change', updateWhatsApp);
    urgente.addEventListener('change', () => { urgBox.hidden = !urgente.checked; });

    const validate = () => {
      const v = (id) => $(`#${id}`).value.trim();
      const errors = {};
      if (v('nome').length < 3) errors.nome = 'Informe seu nome completo.';
      if (v('tel').replace(/\D/g, '').length < 10) errors.tel = 'Informe um telefone com DDD, por exemplo (11) 91234-5678.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) errors.email = 'Informe um e-mail válido, por exemplo nome@email.com.';
      if (!v('area')) errors.area = 'Escolha a área mais próxima do seu caso.';
      if (!$('#lgpd').checked) errors.lgpd = 'Precisamos da sua autorização para retornar o contato.';
      return errors;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (sendBtn.disabled) return;
      const errors = validate();
      fields.forEach((key) => setError(key, errors[key] || ''));
      const first = fields.find((key) => errors[key]);
      if (first) { $(`#${first}`).focus(); return; }

      sendBtn.disabled = true;
      sendLabel.textContent = 'Enviando…';

      /*
        Envio simulado (projeto de portfólio).
        Para receber as mensagens de verdade, troque o setTimeout por um fetch
        para um serviço como Formspree ou EmailJS, por exemplo:
        fetch('https://formspree.io/f/SEU_ID', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      */
      setTimeout(() => {
        const firstName = $('#nome').value.trim().split(/\s+/)[0];
        const phone = tel.value;
        $('#success-title').textContent = firstName ? `Pedido recebido, ${firstName}.` : 'Pedido recebido.';
        $('#success-badge').hidden = !urgente.checked;
        $('#success-body').textContent = urgente.checked
          ? `Sua mensagem entrou como prioridade. Retornamos hoje pelo telefone ${phone}. Se for prisão ou caso criminal, ligue agora para o plantão 24h.`
          : `Um advogado vai retornar pelo telefone ${phone} até o fim do próximo dia útil.`;
        form.hidden = true;
        success.hidden = false;
        $('#success-title').focus();
      }, 1400);
    });

    $('#reset').addEventListener('click', () => {
      form.reset();
      prevTel = '';
      fields.forEach((key) => setError(key, ''));
      urgBox.hidden = true;
      sendBtn.disabled = false;
      sendLabel.textContent = 'Pedir retorno';
      success.hidden = true;
      form.hidden = false;
      updateWhatsApp();

  /* "Conte-nos sobre o seu caso": abre o WhatsApp com nome e área já escritos */
  const caseWa = $('#case-wa');
  const updateCase = () => {
    if (!caseWa) return;
    const nome = ($('#nome') || {}).value ? $('#nome').value.trim() : '';
    const area = areaSelect && areaSelect.value && areaSelect.value !== 'Outro / não sei' ? areaSelect.value : '';
    const msg = 'Olá! ' + (nome ? 'Sou ' + nome + '. ' : '') + 'Gostaria de falar com a Albuquerque Advocacia' + (area ? ' sobre ' + area : '') + '. Meu caso: ';
    caseWa.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };
  updateCase();
  ['#nome', '#area'].forEach((s) => { const el = $(s); if (el) { el.addEventListener('input', updateCase); el.addEventListener('change', updateCase); } });
      $('#nome').focus();
    });
  }
})();
