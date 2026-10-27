import { animate, stagger, onScroll, svg } from "https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.esm.min.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.esm.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function loadModules() {
  const res = await fetch("content/modules.json");
  return res.json();
}
async function loadQuiz() {
  const res = await fetch("content/quiz.json");
  return res.json();
}
async function loadGlossary() {
  const res = await fetch("content/glossary.json");
  return res.json();
}

function moduleHref(mod) {
  return `module.html?id=${mod.id}`;
}

function renderSideRail(data, currentId) {
  const list = document.querySelector("[data-side-rail-list]");
  if (!list) return;
  const sorted = [...data.modules].sort((a, b) => a.order - b.order);
  list.innerHTML = sorted
    .map((m) => {
      const current = m.id === currentId ? ' aria-current="page"' : "";
      return `<li><a href="${moduleHref(m)}"${current}><span class="nav-num">${m.id}</span>${m.title}</a></li>`;
    })
    .join("");
}

function initNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const rail = document.querySelector("[data-side-rail]");
  if (!toggle || !rail) return;
  toggle.addEventListener("click", () => {
    const open = rail.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  rail.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      rail.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function drawHeroRule() {
  const path = document.querySelector("[data-hero-rule] path");
  if (!path) return;
  if (reduceMotion) return;
  const drawable = svg.createDrawable(path);
  animate(drawable, { draw: ["0 0", "0 1"], duration: 600, ease: "outExpo" });
}

function revealOnScroll(elements) {
  if (reduceMotion || !elements.length) return;
  animate(elements, {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 400,
    delay: stagger(60),
    ease: "outExpo",
    autoplay: onScroll({ enter: "bottom-=40" }),
  });

  // shortcut: anime's onScroll enter-threshold can be skipped by an instant scroll jump
  // in one frame, leaving an element stuck at opacity:0 forever — force-reveal as a safety net
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0px)";
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "200px" });
  elements.forEach((el) => revealObserver.observe(el));

  // shortcut: full-page screenshot tools render beyond the live viewport without scrolling,
  // so neither trigger above fires — force-reveal everything left hidden after a bounded delay
  setTimeout(() => {
    revealObserver.disconnect();
    elements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
    });
  }, 1500);
}

function moduleCardMarkup(m) {
  return `
    <a class="module-card" href="${moduleHref(m)}">
      <span class="module-card-num">${m.id}</span>
      <h3 class="module-card-title">${m.title}</h3>
      <p class="module-card-meta">น. ${m.pageStart}–${m.pageEnd}</p>
      <p class="module-card-excerpt">${m.excerpt ?? ""}</p>
    </a>`;
}

function renderModuleList(data, filterText) {
  const root = document.querySelector("[data-module-list]");
  if (!root) return;
  const query = filterText.trim().toLowerCase();
  const sorted = [...data.modules].sort((a, b) => a.order - b.order);
  const filtered = sorted.filter((m) => {
    if (!query) return true;
    const haystack = `${m.title} ${m.excerpt ?? ""}`.toLowerCase();
    return haystack.includes(query);
  });

  if (filtered.length === 0) {
    root.innerHTML = `<p class="empty-state">ไม่พบโมดูลที่ตรงกับคำค้นหา</p>`;
    return;
  }

  root.innerHTML = `<div class="card-grid">${filtered.map(moduleCardMarkup).join("")}</div>`;
  revealOnScroll([...root.querySelectorAll(".module-card")]);
}

function initSearchFilter(data) {
  const search = document.querySelector("[data-search]");
  const rerender = () => renderModuleList(data, search?.value ?? "");
  search?.addEventListener("input", rerender);
  rerender();
}

function populateHero(data) {
  const l = data.lecture;
  const setText = (sel, text) => { const el = document.querySelector(sel); if (el) el.textContent = text; };
  setText("[data-lecture-title]", l.title);
  setText("[data-lecture-subtitle]", l.subtitle);
  setText("[data-lecture-speaker]", `${l.speaker} — ${l.speakerTitle}`);
  setText("[data-lecture-date]", l.date);
  setText("[data-lecture-venue]", l.venue);
}

async function initIndexPage() {
  const data = await loadModules();
  renderSideRail(data, null);
  initNavToggle();
  drawHeroRule();
  populateHero(data);
  initSearchFilter(data);
}

function badgeifyPageCitations(html) {
  // shortcut: only badges the simple "(สไลด์ น. X[, Y])" form; combined citations with
  // trailing ที่มา:/English text are left as plain text rather than risk mis-matching them
  return html.replace(/\(สไลด์\s+น\.\s[0-9,\-–\s]+\)/g, (m) => `<span class="page-badge">${m.slice(1, -1)}</span>`);
}

function renderArticleBody(container, markdown) {
  const body = markdown.replace(/^---[\s\S]*?---\s*/, "");

  // shortcut: a blank line anywhere inside a raw <figure>/<svg> block makes marked split it
  // into separate HTML blocks (and indented lines inside it become a code block), corrupting
  // the diagram — pull each whole block out before parsing and splice the untouched markup
  // back into the matching placeholder paragraph afterward
  const diagramBlocks = [];
  const withPlaceholders = body.replace(/<figure[\s\S]*?<\/figure>|<svg[\s\S]*?<\/svg>/g, (match) => {
    const i = diagramBlocks.length;
    diagramBlocks.push(match);
    return `\n\nDIAGRAMBLOCKPLACEHOLDER${i}\n\n`;
  });

  let html = marked.parse(withPlaceholders);
  diagramBlocks.forEach((block, i) => {
    html = html.replace(new RegExp(`<p>\\s*DIAGRAMBLOCKPLACEHOLDER${i}\\s*</p>`), block);
  });
  container.innerHTML = html;

  container.querySelectorAll("table").forEach((table) => {
    const wrap = document.createElement("div");
    wrap.className = "table-scroll";
    table.replaceWith(wrap);
    wrap.appendChild(table);
  });

  container.querySelectorAll("svg").forEach((svgEl) => {
    if (svgEl.closest(".diagram-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "diagram-wrap";
    svgEl.replaceWith(wrap);
    wrap.appendChild(svgEl);
    wrap.insertAdjacentHTML("beforeend", `<p class="diagram-hint">เลื่อนดูด้านข้าง →</p>`);
  });

  const headings = [...container.querySelectorAll("h2")];
  headings.forEach((h, i) => (h.id = `sec-${i}`));
  if (headings.length) {
    const listHtml = headings.map((h) => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join("");
    const subtoc = document.createElement("nav");
    subtoc.className = "module-subtoc module-subtoc--inline";
    subtoc.setAttribute("aria-label", "หัวข้อในบทนี้");
    subtoc.innerHTML = `<h2>ในบทนี้</h2><ul>${listHtml}</ul>`;
    container.insertBefore(subtoc, headings[0]);

    const asideList = document.querySelector("[data-aside-subtoc] ul");
    if (asideList) asideList.innerHTML = listHtml;
  }

  container.innerHTML = badgeifyPageCitations(container.innerHTML);
}

function renderPager(data, currentOrder) {
  const pager = document.querySelector("[data-module-pager]");
  if (!pager) return;
  const sorted = [...data.modules].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((m) => m.order === currentOrder);
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];
  pager.innerHTML = `
    ${prev ? `<a class="pager-link pager-prev" href="${moduleHref(prev)}">← โมดูลก่อนหน้า</a>` : "<span></span>"}
    ${next ? `<a class="pager-link pager-next btn" href="${moduleHref(next)}">โมดูลถัดไป →</a>` : "<span></span>"}
  `;
}

function initProgressBar() {
  const fill = document.querySelector("[data-progress-fill]");
  const infoFill = document.querySelector("[data-info-progress-fill]");
  const infoPct = document.querySelector("[data-info-progress-pct]");
  const article = document.querySelector("[data-module-article]");
  if (!fill || !article) return;
  const update = () => {
    const max = article.offsetHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
    fill.style.width = `${pct * 100}%`;
    if (infoFill) infoFill.style.width = `${pct * 100}%`;
    if (infoPct) infoPct.textContent = `${Math.round(pct * 100)}%`;
  };
  document.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function initSubtocSpy(article) {
  const headings = [...article.querySelectorAll("h2[id]")];
  const subtocLinks = [...document.querySelectorAll(".module-subtoc a")];
  if (!headings.length || !subtocLinks.length) return;

  const headerOffset = () => {
    const bar = document.querySelector(".reading-progress");
    return (bar ? bar.getBoundingClientRect().bottom : 0) + 24;
  };

  const syncLayout = () => {
    const offset = headerOffset();
    headings.forEach((h) => (h.style.scrollMarginTop = `${offset}px`));
  };

  const setActive = (id) => {
    subtocLinks.forEach((a) => {
      if (a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  const pickActive = () => {
    const doc = document.documentElement;
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 1) {
      return headings[headings.length - 1];
    }
    const limit = headerOffset() + 4;
    let active = headings[0];
    for (const h of headings) {
      if (h.getBoundingClientRect().top <= limit) active = h;
      else break;
    }
    return active;
  };

  let suppressed = false;
  let resumeTimer = null;

  syncLayout();
  setActive(pickActive().id);

  window.addEventListener("resize", () => {
    syncLayout();
    if (!suppressed) setActive(pickActive().id);
  });

  document.addEventListener("scroll", () => {
    if (suppressed) return;
    setActive(pickActive().id);
  }, { passive: true });

  subtocLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const heading = document.getElementById(id);
      if (!heading) return;
      e.preventDefault();
      setActive(id);
      suppressed = true;
      clearTimeout(resumeTimer);
      heading.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      resumeTimer = setTimeout(() => {
        suppressed = false;
        setActive(pickActive().id);
      }, reduceMotion ? 50 : 700);
    });
  });
}

function renderModuleInfo(mod) {
  const card = document.querySelector("[data-module-info]");
  if (!card) return;
  card.innerHTML = `
    <h2>ข้อมูลโมดูล</h2>
    <dl>
      <dt>ช่วงหน้าสไลด์</dt>
      <dd>น. ${mod.pageStart}–${mod.pageEnd}</dd>
    </dl>
    <a class="btn" href="index.html">← กลับหน้าหลัก</a>
    <p>ความคืบหน้าการอ่าน</p>
    <div class="module-info-progress-track"><div class="module-info-progress-fill" data-info-progress-fill></div></div>
    <p class="module-info-progress-pct" data-info-progress-pct>0%</p>
  `;
}

function quizItemMarkup(item, i) {
  const tagBadge = item.tag === "external"
    ? `<span class="tag-badge tag-badge--external">ข้อมูลเสริมภายนอก</span>`
    : `<span class="tag-badge tag-badge--slide">จากสไลด์</span>`;
  const options = item.type === "mcq"
    ? `<div class="quiz-options" data-quiz-options>
        ${item.options.map((opt, oi) => `<button type="button" class="quiz-option" data-opt="${oi}">${opt}</button>`).join("")}
       </div>`
    : `<input type="text" class="quiz-short-input" data-quiz-input placeholder="พิมพ์คำตอบของคุณ แล้วกด Enter หรือปุ่มตรวจคำตอบ" />
       <button type="button" class="btn btn-outline" data-quiz-check>ตรวจคำตอบ</button>`;
  return `
    <div class="quiz-item" data-quiz-item data-quiz-id="${item.id}" data-module="${item.moduleId}" data-correct="${item.type === "mcq" ? item.answer : ""}">
      <div class="quiz-meta">
        <span class="page-badge">โมดูล ${item.moduleId}</span>
        ${tagBadge}
      </div>
      <p class="quiz-question">${item.question}</p>
      ${options}
      <div class="quiz-explanation" data-quiz-explanation>
        <p><strong>เฉลย:</strong> ${item.type === "mcq" ? item.options[item.answer] : item.answer}</p>
        <p>${item.explanation}</p>
      </div>
    </div>`;
}

function wireQuizItem(el, onScored) {
  const type = el.querySelector("[data-quiz-input]") ? "short" : "mcq";
  const explanation = el.querySelector("[data-quiz-explanation]");
  let scored = false;

  if (type === "mcq") {
    const correctIdx = Number(el.dataset.correct);
    const buttons = [...el.querySelectorAll(".quiz-option")];
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (scored) return;
        scored = true;
        const chosen = Number(btn.dataset.opt);
        buttons.forEach((b) => (b.disabled = true));
        btn.dataset.state = chosen === correctIdx ? "correct" : "wrong";
        buttons[correctIdx].dataset.state = "correct";
        explanation.classList.add("is-visible");
        onScored?.(chosen === correctIdx);
      });
    });
  } else {
    const input = el.querySelector("[data-quiz-input]");
    const check = el.querySelector("[data-quiz-check]");
    const reveal = () => {
      if (scored) return;
      scored = true;
      input.disabled = true;
      check.disabled = true;
      explanation.classList.add("is-visible");
      onScored?.(null); // short-answer: self-graded, not counted as right/wrong
    };
    check.addEventListener("click", reveal);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") reveal(); });
  }
}

async function initQuizPage() {
  const quiz = await loadQuiz();
  const data = await loadModules();
  renderSideRail(data, null);
  initNavToggle();

  const chipGroup = document.querySelector("[data-module-chips]");
  if (chipGroup) {
    const sorted = [...data.modules].sort((a, b) => a.order - b.order);
    chipGroup.innerHTML = `<button type="button" class="chip" data-filter-chip="all" aria-pressed="true">ทั้งหมด</button>` +
      sorted.map((m) => `<button type="button" class="chip" data-filter-chip="${m.id}" aria-pressed="false">${m.id}</button>`).join("");
  }

  const root = document.querySelector("[data-quiz-list]");
  const scoreBar = document.querySelector("[data-quiz-score]");
  let correct = 0;
  let answered = 0;
  const total = quiz.filter((q) => q.type === "mcq").length;

  const updateScore = () => {
    if (scoreBar) scoreBar.textContent = `คะแนน: ${correct} / ${total} ข้อ (ตอบแล้ว ${answered} ข้อ จากทั้งหมด ${quiz.length} ข้อ)`;
  };
  updateScore();

  const render = (activeModule) => {
    const filtered = activeModule === "all" ? quiz : quiz.filter((q) => q.moduleId === activeModule);
    root.innerHTML = filtered.map(quizItemMarkup).join("");
    root.querySelectorAll("[data-quiz-item]").forEach((el, i) => {
      wireQuizItem(el, (isCorrect) => {
        answered += 1;
        if (isCorrect === true) correct += 1;
        updateScore();
      });
    });
    revealOnScroll([...root.querySelectorAll("[data-quiz-item]")]);
  };

  render("all");

  chipGroup?.querySelectorAll("[data-filter-chip]").forEach((chip) => {
    chip.addEventListener("click", () => {
      chipGroup.querySelectorAll("[data-filter-chip]").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      render(chip.dataset.filterChip);
    });
  });
}

async function initModuleEndQuiz(moduleId) {
  const quiz = await loadQuiz();
  const root = document.querySelector("[data-module-quiz-list]");
  if (!root) return;
  const items = quiz.filter((q) => q.moduleId === moduleId);
  root.innerHTML = items.map(quizItemMarkup).join("");
  root.querySelectorAll("[data-quiz-item]").forEach((el) => wireQuizItem(el));
  revealOnScroll([...root.querySelectorAll("[data-quiz-item]")]);
}

async function initModulePage() {
  const data = await loadModules();
  const id = new URLSearchParams(location.search).get("id");
  const mod = data.modules.find((m) => m.id === id);
  const article = document.querySelector("[data-module-article]");

  renderSideRail(data, mod?.id ?? null);
  initNavToggle();

  if (!mod) {
    article.innerHTML = `<p>ไม่พบโมดูลที่ระบุ กรุณา<a href="index.html">กลับสู่หน้าหลัก</a></p>`;
    return;
  }

  document.title = `${mod.title} | การกำกับดูแลการแข่งขันในยุคดิจิทัล`;
  const titleEl = document.querySelector("[data-module-title]");
  if (titleEl) titleEl.textContent = mod.title;
  const kickerEl = document.querySelector("[data-module-kicker]");
  if (kickerEl) kickerEl.textContent = `โมดูล ${mod.id} · น. ${mod.pageStart}–${mod.pageEnd}`;

  renderModuleInfo(mod);

  const res = await fetch(`content/modules/${moduleFileName(mod.id)}`);
  const markdown = await res.text();
  renderArticleBody(article, markdown);
  renderPager(data, mod.order);
  initProgressBar();
  initSubtocSpy(article);
  initModuleEndQuiz(mod.id);
}

const MODULE_FILES = {
  "00": "00-intro.md",
  "01": "01-market-structure.md",
  "02": "02-platform-economy.md",
  "03": "03-market-definition.md",
  "04": "04-market-power.md",
  "05": "05-theory-of-harm.md",
  "06": "06-vertical-algorithms.md",
  "07": "07-thai-law-mergers.md",
};
function moduleFileName(id) { return MODULE_FILES[id]; }

function glossaryItemMarkup(term) {
  const tagBadge = term.tag === "external"
    ? `<span class="tag-badge tag-badge--external">ข้อมูลเสริมภายนอก</span>`
    : `<span class="tag-badge tag-badge--slide">จากสไลด์${term.page ? ` · ${term.page}` : ""}</span>`;
  return `
    <div class="glossary-item" data-glossary-item data-tag="${term.tag}">
      <div class="glossary-term">
        <h3>${term.term}</h3>
        ${tagBadge}
      </div>
      <p class="glossary-def">${term.definition}</p>
    </div>`;
}

async function initGlossaryPage() {
  const data = await loadModules();
  const terms = await loadGlossary();
  renderSideRail(data, null);
  initNavToggle();

  const root = document.querySelector("[data-glossary-list]");
  const search = document.querySelector("[data-search]");
  const chipGroup = document.querySelector("[data-tag-chips]");
  let activeTag = "all";

  const render = () => {
    const query = (search?.value ?? "").trim().toLowerCase();
    const filtered = terms
      .filter((t) => activeTag === "all" || t.tag === activeTag)
      .filter((t) => !query || `${t.term} ${t.definition}`.toLowerCase().includes(query))
      .sort((a, b) => a.term.localeCompare(b.term, "th"));
    if (!filtered.length) {
      root.innerHTML = `<p class="empty-state">ไม่พบคำศัพท์ที่ตรงกับคำค้นหา</p>`;
      return;
    }
    root.innerHTML = filtered.map(glossaryItemMarkup).join("");
  };

  search?.addEventListener("input", render);
  chipGroup?.querySelectorAll("[data-filter-chip]").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeTag = chip.dataset.filterChip;
      chipGroup.querySelectorAll("[data-filter-chip]").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      render();
    });
  });

  render();
}

const page = document.body.dataset.page;
if (page === "index") initIndexPage();
else if (page === "module") initModulePage();
else if (page === "quiz") initQuizPage();
else if (page === "glossary") initGlossaryPage();
