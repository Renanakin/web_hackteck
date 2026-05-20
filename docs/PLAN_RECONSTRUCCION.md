# Especificación de Reconstrucción Técnica (Checklist)

## A. Estructura sugerida de proyecto (Vite estático)
- index.html
- style.css
- main.js
- public/
  - ghost-icon.png
  - ghost-logo-text.png
  - Logo_hackteck.png
  - hackteck_logo_header.png
  - OTRA_VIDEOS/

## B. Bloques de página
1. Header (logo + estado sitio)
2. Franja de presencia de marca
3. Hero (headline + "Lo diseña" + media principal + mini-cards)
4. Manifiesto visual
5. Áreas especializadas (7 tarjetas)
6. Contacto/Próximamente (con video FOOTER.mp4 de fondo)
7. Footer

## C. Comportamientos clave
- Videos autoplay muted loop playsinline
- Hover en botones con glow sutil
- Parallax suave en hero (reducido para no invadir composición)
- Fondo neblina/humo interactivo suave con puntero
- Respeto a prefers-reduced-motion

## D. Puntos de calidad para aceptar reconstrucción
- Sin mojibake (acentos correctos)
- Sin cortes de logo por encuadre
- Sin solapamiento crítico de mini-cards sobre copy principal
- Lectura clara en desktop y mobile
- Performance visual estable (sin estrobos)

## E. Prioridad de reconstrucción
1. Restaurar estructura HTML y textos base
2. Restaurar CSS de layout y tipografía
3. Integrar videos por servicio
4. Ajustar hero y paneles flotantes
5. Aplicar efectos finales (cian-magenta sutil, glow, niebla)
6. QA visual y responsive
