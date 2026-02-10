// RJ Contabilidade — Interações (menu, FAQ, ano no footer)
// Ajustes feitos SOMENTE nos pontos solicitados:
// 1) Hambúrguer funcionando com segurança (DOM carregado via defer no HTML)
// 2) Menu "acompanha scroll" (link ativo conforme a seção) incluindo #sobre

(() => {
  // Ano no footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu (hambúrguer)
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (menuBtn && mobileNav) {
    const closeMenu = () => {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    };

    menuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Fecha ao clicar em link
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", closeMenu);
    });

    // Fecha ao apertar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Destaque do link ativo conforme scroll (inclui #sobre)
  const sectionIds = ["inicio", "servicos", "sobre", "faq", "contato"];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  const setActive = () => {
    const y = window.scrollY + 140; // ajuste para header sticky

    let currentId = sectionIds[0] || "inicio";
    for (const sec of sections) {
      if (sec.offsetTop <= y) currentId = sec.id;
    }

    navLinks.forEach(l => {
      const href = l.getAttribute("href") || "";
      l.classList.toggle("is-active", href === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const ans = item.querySelector(".faq-a");
    if (!btn || !ans) return;

    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      ans.hidden = !open;
    });
  });

  // Reveal on scroll
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const revealEls = Array.from(document.querySelectorAll(".reveal"));

  if (prefersReduced) {
    revealEls.forEach(el => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

    revealEls.forEach(el => io.observe(el));
  }

  // Submit (demo)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Mensagem enviada (demo front-end). Integre um back-end/Forms para envio real.");
    });
  }
})();
