/* ============================================================
   NYXAR — productos.js  ★ ÚNICO ARCHIVO QUE EDITAS
   ============================================================

   CÓMO AGREGAR MÚLTIPLES IMÁGENES POR COLOR
   ──────────────────────────────────────────
   Cada color tiene un array "imagenes" con todas las fotos
   de ese color. Al menos 1 es obligatoria, puedes agregar
   todas las que quieras (se recomiendan 3 mínimo).

   Ejemplo:
     { nombre:"Negro", hex:"#111111", imagenes:[
         "assets/productos/basica/all-eyes-negro-1.webp",
         "assets/productos/basica/all-eyes-negro-2.webp",
         "assets/productos/basica/all-eyes-negro-3.webp",
     ]},

   La primera imagen es la que aparece en la tarjeta del catálogo.
   Al abrir el producto y seleccionar el color, el cliente
   verá todas las fotos como miniaturas deslizables.

   CONVENCIÓN DE NOMBRES SUGERIDA:
     {diseño}-{color}-1.webp   → foto frontal principal
     {diseño}-{color}-2.webp   → foto trasera o detalle
     {diseño}-{color}-3.webp   → foto lifestyle o plana

   CÓMO CAMBIAR PRECIOS
   ─────────────────────
     precio:        lo que paga el cliente
     precioTachado: el precio tachado (efecto oferta)

   RECARGOS CORTE (solo L y XL)
   ─────────────────────────────
     Oversize → +$1 en L y XL
     Boxy     → +$2 en L y XL

   MÁS VISTOS
   ───────────
   Cambia masVisto:true en los productos con más clics del mes.
   ============================================================ */

const STORE_CONFIG = {
  recargos: {
    oversize: { L:1, XL:2 },
    boxy:     { L:2, XL:2 },
  },
  estelarXLExtra:    1.00,
  tallaExtra:     { L:2, XL:2 },
  premiumExtra:      3.99,
  envio2x1:          4.67,
  whatsapp:          "50376925839",
  proximoLanzamiento:"2026-07-30T18:30:00",
  dropActivo: {
    titulo:      "Colección Sivar x Nyxar",
    descripcion: "Diseños premium desde El Salvador. Tallas XS–XL.",
    linkBoton:   "#productos",
  },
};

const COLECCIONES = [
  { id:"basica",    nombre:"Colección Básica"    },
  { id:"estelar",   nombre:"Colección Estelar"   },
  { id:"dbzxnxr", nombre:"DBZ x NXR"            },
  { id:"nooc",      nombre:"NXR Outlaw Club"      },
  { id:"2x1",       nombre:"Colección 2×1"        },
  { id:"sivarx",    nombre:"SivarxNyxar"          },
];

/* ============================================================
   ESTRUCTURA DE COLORES CON MÚLTIPLES IMÁGENES:

   colores: [
     {
       nombre:   "Negro",
       hex:      "#111111",
       imagenes: [
         "assets/productos/coleccion/diseno-negro-1.webp",   ← portada
         "assets/productos/coleccion/diseno-negro-2.webp",   ← espalda
         "assets/productos/coleccion/diseno-negro-3.webp",   ← detalle
       ]
     },
   ]
   ============================================================ */

const PRODUCTOS = [

  /* ═══════════════════════════════════
     COLECCIÓN BÁSICA
  ═══════════════════════════════════ */
  {
    id:101, nombre:"All Eyes On Me", coleccion:"basica", categoria:"prendas",
    precio:25.99, precioTachado:30.00,
    colores:[
      { nombre:"Blanco", hex:"#f0f0f0", imagenes:[
        "assets/productos/basica/all-eyes-blanco-1.webp",
        "assets/productos/basica/all-eyes-blanco-2.webp",
	"assets/productos/basica/all-eyes-blanco-3.webp",
        "assets/productos/basica/all-eyes-blanco-4.webp",
      ]},
      { nombre:"Negro",  hex:"#111111", imagenes:[
        "assets/productos/basica/all-eyes-negro-1.webp",
        "assets/productos/basica/all-eyes-negro-2.webp",
	"assets/productos/basica/all-eyes-negro-3.webp",
        "assets/productos/basica/all-eyes-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Diseño icónico de la Colección Básica.",
    masVisto:true, destacado:true, disponible:true, linkPago:"#",
  },
  {
    id:901, nombre:"Hoodie Ajedrez", coleccion:"basica", categoria:"hoodies",
    precio:39.99, precioTachado:55.00,
    colores:[
      { nombre:"Negro",  hex:"#111111", imagenes:[
        "assets/productos/basica/hd-ajedrez-negro-1.webp",
        "assets/productos/basica/hd-ajedrez-negro-2.webp",
        "assets/productos/basica/hd-ajedrez-negro-3.webp",
        "assets/productos/basica/hd-ajedrez-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Sudadera"],
    descripcion:"Nacimiento de la marca.",
    masVisto:true, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:102, nombre:"Griega", coleccion:"basica", categoria:"prendas",
    precio:25.99, precioTachado:30.00,
    colores:[
      { nombre:"Blanco", hex:"#f0f0f0", imagenes:[
        "assets/productos/basica/griega-blanco-1.webp",
	"assets/productos/basica/griega-blanco-2.webp",
        "assets/productos/basica/griega-blanco-3.webp",
        "assets/productos/basica/griega-blanco-4.webp",
      ]},
      { nombre:"Negro",  hex:"#111111", imagenes:[
        "assets/productos/basica/griega-negro-1.webp",
        "assets/productos/basica/griega-negro-2.webp",
	"assets/productos/basica/griega-negro-3.webp",
        "assets/productos/basica/griega-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Arte clásico sobre tela premium.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:103, nombre:"NXR CLB", coleccion:"basica", categoria:"prendas",
    precio:25.99, precioTachado:30.00,
    colores:[
      { nombre:"Negro",        hex:"#111111", imagenes:[
        "assets/productos/basica/nxrclb-negro-1.webp",
        "assets/productos/basica/nxrclb-negro-2.webp",
        "assets/productos/basica/nxrclb-negro-3.webp",
      ]},
      { nombre:"Azul Oscuro",  hex:"#1a237e", imagenes:[
        "assets/productos/basica/nxrclb-azul-1.webp",
        "assets/productos/basica/nxrclb-azul-2.webp",
        "assets/productos/basica/nxrclb-azul-3.webp",
      ]},
      { nombre:"Beige",        hex:"#d6c3a3", imagenes:[
        "assets/productos/basica/nxrclb-beige-1.webp",
        "assets/productos/basica/nxrclb-beige-2.webp",
        "assets/productos/basica/nxrclb-beige-3.webp",
      ]},
      { nombre:"Rosa",   hex:"#e8a0b0", imagenes:[
        "assets/productos/basica/nxrclb-rosa-black-1.webp",
        "assets/productos/basica/nxrclb-rosa-black-2.webp",
        "assets/productos/basica/nxrclb-rosa-black-3.webp",
      ]},
      { nombre:"Blanco Black", hex:"#e8e8e8", imagenes:[
        "assets/productos/basica/nxrclb-blanco-black-1.webp",
        "assets/productos/basica/nxrclb-blanco-black-2.webp",
        "assets/productos/basica/nxrclb-blanco-black-3.webp",
      ]},
      { nombre:"Blanco Red",   hex:"#f5dede", imagenes:[
        "assets/productos/basica/nxrclb-blanco-red-1.webp",
        "assets/productos/basica/nxrclb-blanco-red-2.webp",
        "assets/productos/basica/nxrclb-blanco-red-3.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"El emblema de la marca en 8 variantes de color.",
    masVisto:true, destacado:true, disponible:true, linkPago:"#",
  },
  {
    id:104, nombre:"Pieza de Ajedrez", coleccion:"basica", categoria:"prendas",
    precio:25.99, precioTachado:30.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/basica/ajedrez-negro-1.webp",
        "assets/productos/basica/ajedrez-negro-2.webp",
        "assets/productos/basica/ajedrez-negro-3.webp",
        "assets/productos/basica/ajedrez-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Diseño estratégico. Solo en negro.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:105, nombre:"The Nyxar Club", coleccion:"basica", categoria:"prendas",
    precio:25.99, precioTachado:30.00,
    colores:[
      { nombre:"Negro",  hex:"#111111", imagenes:[
        "assets/productos/basica/thenyxarclub-negro-1.webp",
        "assets/productos/basica/thenyxarclub-negro-2.webp",
		"assets/productos/basica/thenyxarclub-negro-3.webp",
        "assets/productos/basica/thenyxarclub-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"La identidad del club.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:106, nombre:"Esencia", coleccion:"basica", categoria:"prendas",
    precio:25.99, precioTachado:30.00,
    colores:[
      { nombre:"Blanco",     hex:"#f0f0f0", imagenes:[
        "assets/productos/basica/esencia-blanco-1.webp",
        "assets/productos/basica/esencia-blanco-2.webp",
        "assets/productos/basica/esencia-blanco-3.webp",
      ]},
      { nombre:"Negro",      hex:"#111111", imagenes:[
        "assets/productos/basica/esencia-negro-1.webp",
        "assets/productos/basica/esencia-negro-2.webp",
        "assets/productos/basica/esencia-negro-3.webp",
      ]},
      { nombre:"Beige",      hex:"#d6c3a3", imagenes:[
        "assets/productos/basica/esencia-beige-1.webp",
        "assets/productos/basica/esencia-beige-2.webp",
        "assets/productos/basica/esencia-beige-3.webp",
      ]},
      { nombre:"Rosa",       hex:"#f9a8c9", imagenes:[
        "assets/productos/basica/esencia-rosa-1.webp",
        "assets/productos/basica/esencia-rosa-2.webp",
        "assets/productos/basica/esencia-rosa-3.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Seis colores para un solo diseño.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:107, nombre:"Dragón de Batalla", coleccion:"basica", categoria:"prendas",
    precio:25.99, precioTachado:30.00,
    colores:[
      { nombre:"Blanco", hex:"#f0f0f0", imagenes:[
        "assets/productos/basica/dragon-blanco-1.webp",
        "assets/productos/basica/dragon-blanco-2.webp",
        "assets/productos/basica/dragon-blanco-3.webp",
      ]},
      { nombre:"Negro",  hex:"#111111", imagenes:[
        "assets/productos/basica/dragon-negro-1.webp",
        "assets/productos/basica/dragon-negro-2.webp",
        "assets/productos/basica/dragon-negro-3.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Dragón de batalla. Colección Básica.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },

  /* ═══════════════════════════════════
     COLECCIÓN ESTELAR — solo negro, XL +$1
  ═══════════════════════════════════ */
  {
    id:201, nombre:"STLR 001", coleccion:"estelar", categoria:"prendas",
    precio:34.99, precioTachado:40.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/estelar/stlr-001-negro-1.webp",
        "assets/productos/estelar/stlr-001-negro-2.webp",
        "assets/productos/estelar/stlr-001-negro-3.webp",
        "assets/productos/estelar/stlr-001-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Colección Estelar. Solo negro. XL +$1.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:202, nombre:"STLR 002", coleccion:"estelar", categoria:"prendas",
    precio:34.99, precioTachado:40.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/estelar/stlr-002-negro-1.webp",
        "assets/productos/estelar/stlr-002-negro-2.webp",
        "assets/productos/estelar/stlr-002-negro-3.webp",
        "assets/productos/estelar/stlr-002-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Colección Estelar. Solo negro. XL +$1.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:203, nombre:"STLR 003", coleccion:"estelar", categoria:"prendas",
    precio:34.99, precioTachado:40.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/estelar/stlr-003-negro-1.webp",
        "assets/productos/estelar/stlr-003-negro-2.webp",
        "assets/productos/estelar/stlr-003-negro-3.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Colección Estelar. Solo negro. XL +$1.",
    masVisto:false, destacado:true, disponible:true, linkPago:"#",
  },
  {
    id:204, nombre:"STLR 004", coleccion:"estelar", categoria:"prendas",
    precio:34.99, precioTachado:40.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/estelar/stlr-004-negro-1.webp",
        "assets/productos/estelar/stlr-004-negro-2.webp",
        "assets/productos/estelar/stlr-004-negro-3.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Colección Estelar. Solo negro. XL +$1.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:205, nombre:"STLR 005", coleccion:"estelar", categoria:"prendas",
    precio:34.99, precioTachado:40.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/estelar/stlr-005-negro-1.webp",
        "assets/productos/estelar/stlr-005-negro-2.webp",
        "assets/productos/estelar/stlr-005-negro-3.webp",
        "assets/productos/estelar/stlr-005-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Colección Estelar. Solo negro. XL +$1.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },

  /* ═══════════════════════════════════
     DBZNXR — todas agotadas
  ═══════════════════════════════════ */
  {
    id:301, nombre:"Gohan X", coleccion:"dbzxnxr", categoria:"prendas",
    precio:30.75, precioTachado:45.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/dbzxnxr/g1.webp",
        "assets/productos/dbzxnxr/g2.webp",
        "assets/productos/dbzxnxr/g3.webp",
        "assets/productos/dbzxnxr/g4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"La furia que llevas dentro se nota.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:302, nombre:"Broly X", coleccion:"dbzxnxr", categoria:"prendas",
    precio:30.75, precioTachado:45.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/dbzxnxr/b1.webp",
        "assets/productos/dbzxnxr/b2.webp",
        "assets/productos/dbzxnxr/b3.webp",
        "assets/productos/dbzxnxr/b4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"El poder oculto es el unico que te guarda",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:303, nombre:"Black goku X", coleccion:"dbzxnxr", categoria:"prendas",
    precio:30.75, precioTachado:45.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/dbzxnxr/gb1.webp",
        "assets/productos/dbzxnxr/gb2.webp",
        "assets/productos/dbzxnxr/gb3.webp",
        "assets/productos/dbzxnxr/gb4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"La venganza es lo unico que te alimenta",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },

  /* ═══════════════════════════════════
     NXR OUTLAW CLUB
  ═══════════════════════════════════ */
  {
    id:401, nombre:"NOOC — Básico", coleccion:"nooc", categoria:"prendas",
    precio:26.99, precioTachado:35.00,
    colores:[
      { nombre:"Blanco", hex:"#f0f0f0", imagenes:[
        "assets/productos/nooc/basico-blanco-1.webp",
        "assets/productos/nooc/basico-blanco-2.webp",
        "assets/productos/nooc/basico-blanco-3.webp",
        "assets/productos/nooc/basico-blanco-4.webp",
      ]},
      { nombre:"Negro",  hex:"#111111", imagenes:[
        "assets/productos/nooc/basico-negro-1.webp",
        "assets/productos/nooc/basico-negro-2.webp",
        "assets/productos/nooc/basico-negro-3.webp",
        "assets/productos/nooc/basico-negro-4.webp",
      ]},
      { nombre:"Beige",  hex:"#d6c3a3", imagenes:[
        "assets/productos/nooc/basico-beige-1.webp",
        "assets/productos/nooc/basico-beige-2.webp",
        "assets/productos/nooc/basico-beige-3.webp",
      ]},
      { nombre:"Rosa",   hex:"#f9a8c9", imagenes:[
        "assets/productos/nooc/basico-rosa-1.webp",
        "assets/productos/nooc/basico-rosa-2.webp",
        "assets/productos/nooc/basico-rosa-3.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Diseño clásico Outlaw Club. 4 colores.",
    masVisto:false, destacado:true, disponible:true, linkPago:"#",
  },
  {
    id:402, nombre:"NOOC — No Robos", coleccion:"nooc", categoria:"prendas",
    precio:29.99, precioTachado:35.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/nooc/norobos-negro-1.webp",
        "assets/productos/nooc/norobos-negro-2.webp",
        "assets/productos/nooc/norobos-negro-3.webp",
        "assets/productos/nooc/norobos-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Diseño No Robos. Solo negro.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:403, nombre:"NOOC — Snppy", coleccion:"nooc", categoria:"prendas",
    precio:29.99, precioTachado:35.00,
    colores:[
      { nombre:"Blanco", hex:"#f0f0f0", imagenes:[
        "assets/productos/nooc/snppy-blanco-1.webp",
        "assets/productos/nooc/snppy-blanco-2.webp",
        "assets/productos/nooc/snppy-blanco-3.webp",
        "assets/productos/nooc/snppy-blanco-4.webp",
      ]},
      { nombre:"Negro",  hex:"#111111", imagenes:[
        "assets/productos/nooc/snppy-negro-1.webp",
        "assets/productos/nooc/snppy-negro-2.webp",
        "assets/productos/nooc/snppy-negro-3.webp",
        "assets/productos/nooc/snppy-negro-4.webp",
      ]},
    ],
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Diseño Snppy edición Outlaw.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },

  /* ═══════════════════════════════════
     SivarxNyxar — muy pronto
  ═══════════════════════════════════ */
  {
    id:501, nombre:"Raíz 503", coleccion:"sivarx", categoria:"prendas",
    precio:25.99, precioTachado:32.00,
    colores:[
      { nombre:"Blanco", hex:"#f0f0f0", imagenes:[
        "assets/productos/sivarx/sivarx-01-negro-1.webp",
        "assets/productos/sivarx/sivarx-01-negro-2.webp",
        "assets/productos/sivarx/sivarx-01-negro-3.webp",
        "assets/productos/sivarx/sivarx-01-negro-4.webp",
      ]},
      { nombre:"Verde Musgo",  hex:"#535039", imagenes:[
        "assets/productos/sivarx/sivarx-01-verde-1.webp",
        "assets/productos/sivarx/sivarx-01-verde-2.webp",
        "assets/productos/sivarx/sivarx-01-verde-3.webp",
        "assets/productos/sivarx/sivarx-01-verde-4.webp",
      ]},
    ],
	tallaExtra: true,
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Próximamente — SivarxNyxar.",
    masVisto:true, destacado:true, disponible:true, linkPago:"#",
  },
  {
    id:502, nombre:"Codigo 503", coleccion:"sivarx", categoria:"prendas",
    precio:25.99, precioTachado:32.00,
    colores:[
      { nombre:"Blanco", hex:"#f0f0f0", imagenes:[
        "assets/productos/sivarx/sivarx-02-negro-1.webp",
        "assets/productos/sivarx/sivarx-02-negro-2.webp",
        "assets/productos/sivarx/sivarx-02-negro-3.webp",
        "assets/productos/sivarx/sivarx-02-negro-4.webp",
      ]},
    ],
	tallaExtra: true,
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Próximamente — SivarxNyxar.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
  {
    id:503, nombre:"Sombra Alada", coleccion:"sivarx", categoria:"prendas",
    precio:25.99, precioTachado:32.00,
    colores:[
      { nombre:"Negro", hex:"#111111", imagenes:[
        "assets/productos/sivarx/sivarx-03-negro-1.webp",
        "assets/productos/sivarx/sivarx-03-negro-2.webp",
        "assets/productos/sivarx/sivarx-03-negro-3.webp",
        "assets/productos/sivarx/sivarx-03-negro-4.webp",
      ]},
    ],
	tallaExtra: true,
    tallas:["XS","S","M","L","XL"], cortes:["Regular","Oversize","Boxy"],
    descripcion:"Próximamente — SivarxNyxar.",
    masVisto:false, destacado:false, disponible:true, linkPago:"#",
  },
];
