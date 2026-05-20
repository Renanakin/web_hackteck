document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIntersectionObserver = "IntersectionObserver" in window;

  const revealElements = document.querySelectorAll(".reveal");
  const revealAll = () => revealElements.forEach((el) => el.classList.add("visible"));

  const initReveal = () => {
    if (prefersReducedMotion || !hasIntersectionObserver) {
      revealAll();
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.getAttribute("data-delay") || 0);
          window.setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  };

  const initAnchorScroll = () => {
    const header = document.querySelector(".site-header");

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function onAnchorClick(e) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const headerOffset = header ? header.getBoundingClientRect().height + 18 : 0;
        const top = window.scrollY + target.getBoundingClientRect().top - headerOffset;
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? "auto" : "smooth"
        });
      });
    });
  };

  const initParallax = () => {
    if (prefersReducedMotion) return;

    const parallaxRoots = document.querySelectorAll("[data-parallax-root]");
    if (parallaxRoots.length === 0) return;

    const state = { x: 0, y: 0, active: false };
    let rafId = 0;

    const render = () => {
      rafId = 0;
      parallaxRoots.forEach((root) => {
        const rect = root.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (state.x - cx) / (window.innerWidth / 2);
        const dy = (state.y - cy) / (window.innerHeight / 2);

        root.querySelectorAll("[data-parallax]").forEach((panel) => {
          const depth = Number(panel.getAttribute("data-depth") || 8);
          panel.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
        });
      });
    };

    window.addEventListener(
      "pointermove",
      (e) => {
        state.x = e.clientX;
        state.y = e.clientY;
        if (!rafId) rafId = window.requestAnimationFrame(render);
      },
      { passive: true }
    );

    window.addEventListener("pointerleave", () => {
      if (!state.active) return;
      state.active = false;
    });
  };

  const initVideoVisibility = () => {
    const videos = Array.from(document.querySelectorAll(".cf-video-bg video"));
    if (videos.length === 0 || prefersReducedMotion) return;

    // Lower playback cost on mobile.
    if (window.matchMedia("(max-width: 760px)").matches) {
      videos.forEach((video) => {
        video.removeAttribute("autoplay");
        video.pause();
      });
    }

    if (!hasIntersectionObserver) return;

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && !document.hidden) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    videos.forEach((video) => videoObserver.observe(video));
  };

  const initTechCore = () => {
    const nodes = document.querySelectorAll(".core-node");
    const paths = {
      ai: document.getElementById("line-ai"),
      sec: document.getElementById("line-sec"),
      cloud: document.getElementById("line-cloud"),
      auto: document.getElementById("line-auto"),
      ops: document.getElementById("line-ops"),
      dev: document.getElementById("line-dev"),
      net: document.getElementById("line-net"),
      edge: document.getElementById("line-edge")
    };

    // Pre-activate AI CORE on load to give system activity feel
    const preActive = document.getElementById("node-ai");
    if (preActive) {
      preActive.classList.add("active");
      if (paths.ai) paths.ai.classList.add("active");
    }

    nodes.forEach((node) => {
      node.addEventListener("mouseenter", () => {
        // Clear all active states
        nodes.forEach((n) => n.classList.remove("active"));
        Object.values(paths).forEach((p) => p && p.classList.remove("active"));

        // Set hover target to active
        node.classList.add("active");
        const mod = node.getAttribute("data-module");
        if (mod && paths[mod]) {
          paths[mod].classList.add("active");
        }
      });
    });
  };

  const statusPhrases = [
    { prefix: "[ INITIALIZING ]", text: "YA VIENE" },
    { prefix: "[ INITIALIZING ]", text: "INTELIGENCIA ARTIFICIAL APLICADA" },
    { prefix: "[ INITIALIZING ]", text: "DESARROLLO WEB Y SOFTWARE" },
    { prefix: "[ ACTIVE ]", text: "AUTOMATIZACIONES OPERATIVAS" },
    { prefix: "[ ONLINE SOON ]", text: "CIBERSEGURIDAD EMPRESARIAL" },
    { prefix: "[ DEPLOYING ]", text: "INFRAESTRUCTURA CLOUD" },
    { prefix: "[ DEPLOYING ]", text: "REDES Y COMUNICACIONES" },
    { prefix: "[ DEPLOYING ]", text: "SEGURIDAD PERIMETRAL" },
    { prefix: "[ ONLINE SOON ]", text: "FORO Y COMUNIDAD" },
    { prefix: "[ ONLINE SOON ]", text: "HELP CENTER" },
    { prefix: "[ ACTIVE ]", text: "PROYECTOS EN DESPLIEGUE" },
    { prefix: "[ ACTIVE ]", text: "NOTICIAS Y ACTUALIZACIONES" },
    { prefix: "[ ONLINE SOON ]", text: "RESPUESTAS Y DOCUMENTACIÓN" },
    { prefix: "[ INITIALIZING ]", text: "HACKTECK PLATFORM" },
    { prefix: "[ ONLINE SOON ]", text: "SYSTEM ONLINE SOON" }
  ];

  const initStatusBanner = () => {
    const prefixEl = document.getElementById("tickerPrefix");
    const textEl = document.getElementById("tickerText");
    const wrapperEl = document.querySelector(".status-ticker-wrapper");
    if (!prefixEl || !textEl || !wrapperEl) return;

    let currentIndex = 0;

    const cycleText = () => {
      wrapperEl.classList.add("ticker-fade");

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % statusPhrases.length;
        const current = statusPhrases[currentIndex];
        
        prefixEl.textContent = current.prefix;
        textEl.textContent = current.text;

        wrapperEl.classList.remove("ticker-fade");
      }, 400);
    };

    setInterval(cycleText, 3500);
  };

  initReveal();
  initAnchorScroll();
  initParallax();
  initVideoVisibility();
  initTechCore();
  initStatusBanner();
});
