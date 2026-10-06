# Instagram sin scroll infinito (Safari / iPhone)

Userscript para usar instagram.com en Safari de iOS sin scroll infinito:

- **Sin feed**: el inicio redirige a Explorar y su botón desaparece de la barra.
- **Sin Reels**: la pestaña Reels redirige a Explorar. Un reel concreto (`/reel/ID`, p. ej. de un DM) sí abre, pero sin "más publicaciones".
- **Libre**: búsqueda y Explorar completos, DMs, perfiles.

Solo funciona en Safari, no en la app de Instagram. Borra la app (o límitala con Tiempo en Pantalla).

## Instalación en iPhone

1. Instala **Userscripts** (gratis, App Store, de Justin Wasack).
2. Ábrela y elige una carpeta en Archivos/iCloud para los scripts.
3. Ajustes → Apps → Safari → Extensiones → Userscripts → activar y permitir en `instagram.com`.
4. Descarga [`instagram-sin-scroll.user.js`](instagram-sin-scroll.user.js) (Raw → Compartir → Guardar en Archivos) a esa carpeta.
   O en Safari abre el link Raw y toca el ícono de Userscripts → Instalar.
5. Abre instagram.com en Safari e inicia sesión.

## Ajustar

Si Instagram cambia su HTML y algo deja de bloquearse, los selectores están en el bloque `css` al inicio del script.
