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
    const videos = Array.from(document.querySelectorAll(".service-card video, .cf-video-bg video"));
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

  const initCanvas = () => {
    const canvas = document.getElementById("heroCanvas");
    if (!(canvas instanceof HTMLCanvasElement) || prefersReducedMotion) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = 0;
    let resizeTimer = 0;
    let isRunning = true;
    const mouse = { x: null, y: null, radius: window.matchMedia("(max-width: 760px)").matches ? 90 : 130 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.6 + 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.35 + 0.12;
        this.density = Math.random() * 20 + 5;
        this.color = Math.random() > 0.75 ? "rgba(255, 123, 61, 0.72)" : "rgba(64, 224, 255, 0.8)";
      }

      update() {
        this.angle += this.speed * 0.02;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * this.density;
            this.y -= (dy / distance) * force * this.density;
          }
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const density = mobile ? 13000 : 9800;
      const count = Math.min(95, Math.max(30, Math.floor((width * height) / density)));
      for (let i = 0; i < count; i += 1) {
        particles.push(new Particle());
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouse.radius = window.matchMedia("(max-width: 760px)").matches ? 90 : 130;
      initParticles();
    };

    const drawConnections = () => {
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const maxDistance = mobile ? 72 : 96;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > maxDistance) continue;

          const alpha = 0.2 - distance / 420;
          const warm = particles[i].color.includes("255, 123, 61") || particles[j].color.includes("255, 123, 61");
          ctx.strokeStyle = warm ? `rgba(255, 138, 72, ${alpha})` : `rgba(103, 221, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawConnections();
      rafId = window.requestAnimationFrame(animate);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        window.cancelAnimationFrame(rafId);
        resize();
        animate();
      }, 120);
    };

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener("resize", onResize, { passive: true });

    resize();
    animate();

    return {
      pause: () => {
        isRunning = false;
        window.cancelAnimationFrame(rafId);
      },
      resume: () => {
        if (isRunning) return;
        isRunning = true;
        animate();
      }
    };
  };

  initReveal();
  initAnchorScroll();
  initParallax();
  initVideoVisibility();
  const canvasController = initCanvas();

  document.addEventListener("visibilitychange", () => {
    if (!canvasController) return;
    if (document.hidden) {
      canvasController.pause();
    } else {
      canvasController.resume();
    }
  });
});
