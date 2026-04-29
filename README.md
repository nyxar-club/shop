# NYXAR — README COMPLETO v4

## ARCHIVOS DEL PROYECTO
```
nyxar-main/
├── index.html           ← Página principal
├── carrito.html         ← Detalle de prenda (talla, color, corte, premium, agregar al armario)
├── armario.html         ← Mi Armario — lista, total, finalizar pedido
├── coleccion-2x1.html   ← Configurador especial 2×1
│
├── style.css            ← Estilos compartidos (todas las páginas)
├── carrito.css          ← Estilos página carrito/detalle
├── armario.css          ← Estilos página armario
├── 2x1.css              ← Estilos configurador 2×1
│
├── armario.js           ← Utilidad localStorage armario (incluir en todas las páginas)
├── script.js            ← Lógica página principal
├── carrito.js           ← Lógica página detalle
├── armario-page.js      ← Lógica página armario
├── 2x1.js               ← Lógica configurador 2×1
│
├── productos.js         ← ★ BASE DE DATOS — edita solo aquí
│
└── assets/
    ├── icono-ppal.png      ← Logo del navbar y footer (todas las páginas)
    ├── icono-premium.png   ← Solo en carrito.html y coleccion-2x1.html (paquete premium)
    ├── hero/
    │   ├── drop-01.webp
    │   ├── drop-02.webp
    │   └── drop-03.webp
    ├── 2x1/
    │   ├── diseno-street.webp
    │   └── diseno-sweet.webp
    └── productos/
        ├── basica/
        │   ├── all-eyes-negro.webp / all-eyes-blanco.webp
        │   ├── griega-negro.webp / griega-blanco.webp
        │   ├── nxrclb-negro.webp / nxrclb-blanco.webp / nxrclb-azul.webp
        │   ├── nxrclb-beige.webp / nxrclb-rosa-black.webp / nxrclb-rosa-white.webp
        │   ├── nxrclb-blanco-black.webp / nxrclb-blanco-red.webp
        │   ├── ajedrez-negro.webp
        │   ├── thenyxarclub-negro.webp / thenyxarclub-blanco.webp
        │   ├── esencia-negro.webp / esencia-blanco.webp / esencia-azul.webp
        │   ├── esencia-beige.webp / esencia-rosa.webp / esencia-blanco-alt.webp
        │   ├── dragon-negro.webp / dragon-blanco.webp
        ├── estelar/
        │   ├── stlr-001.webp ... stlr-005.webp
        ├── hallownyx/
        │   ├── calabaza.webp / fantasma.webp / hallownyx.webp
        │   ├── wazpsmoke.webp / hallonyx.webp / zombie.webp
        ├── nooc/
        │   ├── basico-negro.webp / basico-blanco.webp / basico-beige.webp / basico-rosa.webp
        │   ├── norobos-negro.webp
        │   ├── snppy-negro.webp / snppy-blanco.webp
        └── sivarx/
            ├── sivarx-01.webp / sivarx-02.webp / sivarx-03.webp
```

---

## FLUJO DEL ARMARIO

1. Cliente navega en `index.html` → hace clic en una prenda
2. Va a `carrito.html` → selecciona color, talla, corte + opcional premium
3. Hace clic en **"🧺 Agregar al armario"** → guardado en localStorage
4. Puede seguir viendo prendas y agregar más
5. Va a `armario.html` → ve todo lo que agregó, puede eliminar
6. Hace clic en **"Finalizar pedido"** → WhatsApp con resumen completo

---

## CÓMO CAMBIAR PRECIOS

En `productos.js`, cada producto tiene:
```js
precio: 25.99,          // precio real del cliente
precioTachado: 30.00,   // precio tachado (oferta visual)
```
Usa Ctrl+F para buscar por nombre de colección y cambia ambos valores.

---

## RECARGOS POR CORTE (solo L y XL)

```js
recargos: {
  oversize: { L:1, XL:1 },   // +$1 en L y XL
  boxy:     { L:2, XL:2 },   // +$2 en L y XL
},
```

---

## DÓNDE PEGAR EL LINK DE PAGO

En `armario-page.js`, busca el comentario:
```
── DÓNDE PEGAR EL LINK DE PAGO ─────
```
Reemplaza el href del btnFinalizar:
```js
btn.href = "https://tu-link-de-pago.com";
```

También puedes poner links individuales por producto en `productos.js`:
```js
linkPago: "https://pagadito.com/tu-link"
```

---

## CÓMO AGREGAR UN PRODUCTO NUEVO

```js
{
  id: 901,                 // número único
  nombre: "Nombre",
  coleccion: "basica",
  categoria: "prendas",
  precio: 25.99,
  precioTachado: 30.00,
  colores: [
    { nombre:"Negro", hex:"#111111", imagen:"assets/productos/basica/nombre-negro.webp" },
  ],
  slideshow: [],
  tallas: ["XS","S","M","L","XL"],
  cortes: ["Regular","Oversize","Boxy"],
  descripcion: "Descripción corta.",
  masVisto: false,
  destacado: false,
  disponible: true,
  linkPago: "#",
},
```

---

## ACTUALIZAR MÁS VISTOS

Cambia `masVisto: true` en los 6 productos con más clics del mes.
Los demás deben tener `masVisto: false`.

---

## NÚMERO DE WHATSAPP

```js
whatsapp: "50312345678",  // sin + ni espacios
```

---

## IMÁGENES

- Formato: WebP (comprime con squoosh.app, calidad 85%)
- Productos: 3:4 (ej: 600×800px), máximo 300KB
- Hero: 16:9 (ej: 1200×800px)
- icono-ppal.png: PNG con fondo transparente
- icono-premium.png: PNG con fondo transparente (solo aparece en carrito y 2×1)

---

## SUBIR A GITHUB PAGES

1. Crea repo `nyxar-main` en github.com
2. Sube TODOS los archivos + carpeta `assets/`
3. Settings → Pages → Branch: main → Save
4. URL: `https://nyxar-club.github.io/nyxar-main/`
