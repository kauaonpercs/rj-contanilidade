(() => {
  const header = document.getElementById("siteHeader");
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  function setHeaderH() {
    if (!header) return;
    const h = header.offsetHeight || 76;
    document.documentElement.style.setProperty("--headerH", `${h}px`);
  }

  setHeaderH();
  window.addEventListener("resize", setHeaderH, { passive: true });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (menuBtn && mobileNav) {
    const closeMenu = () => {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      setHeaderH();
    };
    const openMenu = () => {
      mobileNav.classList.add("open");
      menuBtn.setAttribute("aria-expanded", "true");
      setHeaderH();
    };

    menuBtn.addEventListener("click", () => {
      mobileNav.classList.contains("open") ? closeMenu() : openMenu();
    });

    mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (e) => {
      if (!mobileNav.classList.contains("open")) return;
      const target = e.target;
      const clickedInside = mobileNav.contains(target) || menuBtn.contains(target);
      if (!clickedInside) closeMenu();
    });
  }

  // active link
  const sectionIds = ["inicio", "servicos", "sobre", "faq", "contato"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const setActive = () => {
    const y =
      window.scrollY +
      (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--headerH"), 10) || 76) +
      60;

    let currentId = sectionIds[0] || "inicio";
    for (const sec of sections) if (sec.offsetTop <= y) currentId = sec.id;

    navLinks.forEach((l) => {
      const href = l.getAttribute("href") || "";
      l.classList.toggle("is-active", href === `#${currentId}`);
    });
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // FAQ
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

  // Reveal
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* =========================
     Toast premium
     ========================= */
  const toastEl = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastMsg = document.getElementById("toastMsg");
  const toastIcon = document.getElementById("toastIcon");
  const toastClose = document.getElementById("toastClose");
  let toastTimer = null;

  const icons = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 9v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 17h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M10.3 4.3h3.4L21 12l-7.3 7.7h-3.4L3 12l7.3-7.7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>`
  };

  function showToast({ type = "success", title = "Tudo certo", message = "", duration = 4200 } = {}) {
    if (!toastEl) return;
    toastEl.dataset.type = type;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;
    if (toastIcon) toastIcon.innerHTML = icons[type] || icons.success;

    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add("show"));

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, duration);
  }

  function hideToast() {
    if (!toastEl) return;
    toastEl.classList.remove("show");
    const t = setTimeout(() => {
      toastEl.hidden = true;
      clearTimeout(t);
    }, 260);
  }

  if (toastClose) toastClose.addEventListener("click", hideToast);

  /* =========================
     Submit real com upload (/upload.php)
     ========================= */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // valida nativo (inputs required)
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn ? submitBtn.textContent : null;

      const fileInput = contactForm.querySelector("input[type='file'][name='files']");
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        showToast({
          type: "error",
          title: "Faltou o documento",
          message: "Anexe pelo menos 1 arquivo para enviar."
        });
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Enviando...";
        }

        const formData = new FormData(contactForm);

        const response = await fetch("/upload.php", {
          method: "POST",
          body: formData,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const raw = await response.text();
        let data = null;
        try { data = raw ? JSON.parse(raw) : null; } catch {}

        if (!response.ok) {
          const msg = (data && data.error) || `Erro ao enviar (HTTP ${response.status}).`;
          showToast({ type: "error", title: "Não foi possível enviar", message: msg });
          return;
        }

        showToast({
          type: "success",
          title: "Enviado com sucesso",
          message: "Recebemos sua mensagem. Em breve entraremos em contato."
        });

        contactForm.reset();
      } catch (err) {
        clearTimeout(timeoutId);

        showToast({
          type: "error",
          title: err?.name === "AbortError" ? "Demorou demais" : "Erro inesperado",
          message:
            err?.name === "AbortError"
              ? "O servidor demorou para responder. Tente novamente."
              : "Ocorreu um erro ao enviar. Tente novamente em instantes."
        });
      } finally {
        if (submitBtn && originalText) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }
})();
