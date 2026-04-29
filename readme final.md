# NYXAR — Guía Completa de Control de la Página Web
# Todo lo que necesitas para manejar tu web sin ayuda técnica

---

## ÍNDICE RÁPIDO
1. Cómo editar un archivo ya subido a GitHub
2. Cómo eliminar un archivo de GitHub
3. Cómo subir un archivo nuevo (o reemplazar uno)
4. Cómo subir imágenes a la carpeta assets
5. Cómo agregar una nueva colección completa
6. Cómo agregar un producto a una colección existente
7. Cómo cambiar precios
8. Cómo actualizar las fotos del Hero (portada)
9. Cómo cambiar el número de WhatsApp
10. Cómo activar el link de pago cuando lo tengas
11. Cómo marcar los "Más vistos" del mes
12. Cómo marcar una colección como "Próximamente" o "Agotado"
13. Referencia rápida de archivos
14. Plantilla copia-pega para nueva colección

---

## 1. CÓMO EDITAR UN ARCHIVO YA SUBIDO A GITHUB

Esto es lo que harás cada vez que quieras cambiar precios, agregar productos, etc.

    Paso 1 → Entra a github.com e inicia sesión
    Paso 2 → Abre tu repositorio (nyxar-main)
    Paso 3 → Haz clic en el nombre del archivo que quieres editar
             (ejemplo: productos.js)
    Paso 4 → Haz clic en el ícono del LÁPIZ en la parte superior derecha
    Paso 5 → Edita el contenido directamente en el navegador
    Paso 6 → Baja hasta el final de la página
    Paso 7 → En "Commit changes" escribe una nota breve
             (ejemplo: "Agrego nueva colección")
    Paso 8 → Clic en el botón verde "Commit changes"

El sitio se actualiza automáticamente en 1 a 2 minutos.

---

## 2. CÓMO ELIMINAR UN ARCHIVO DE GITHUB

    Paso 1 → Abre el repositorio en github.com
    Paso 2 → Haz clic en el archivo que quieres eliminar
    Paso 3 → Haz clic en los 3 puntos "..." arriba a la derecha del archivo
    Paso 4 → Selecciona "Delete file"
    Paso 5 → Baja y haz clic en "Commit changes"

---

## 3. CÓMO SUBIR UN ARCHIVO NUEVO (o reemplazar uno)

Subir un archivo de código nuevo (.js, .html, .css):

    Paso 1 → Abre el repositorio en github.com
    Paso 2 → Haz clic en "Add file" luego en "Upload files"
    Paso 3 → Arrastra el archivo desde tu computadora
    Paso 4 → Escribe una nota (ejemplo: "Agrego archivo nuevo")
    Paso 5 → Clic en "Commit changes"

Reemplazar un archivo existente:
El método más fácil es EDITAR directamente (ver paso 1 arriba).
Si prefieres subir el archivo desde tu computadora, primero elimina el
viejo y luego sube el nuevo con el MISMO nombre exacto.

---

## 4. CÓMO SUBIR IMÁGENES A LA CARPETA ASSETS

Navegar a una subcarpeta y subir imágenes:

    Paso 1 → En tu repo, haz clic en la carpeta "assets"
    Paso 2 → Entra a la subcarpeta correcta
             (ejemplo: assets → productos → basica)
    Paso 3 → Haz clic en "Add file" luego en "Upload files"
    Paso 4 → Arrastra tus imágenes .webp desde tu computadora
    Paso 5 → Clic en "Commit changes"

IMPORTANTE — Reglas de nombres de imágenes:

    CORRECTO:   all-eyes-negro.webp
    CORRECTO:   stlr-001.webp
    MAL:        All Eyes Negro.webp   (espacios y mayúsculas rompen la web)
    MAL:        foto 1.png            (sin espacios, usar .webp)

Convertir tus fotos a WebP antes de subir:

    1. Entra a squoosh.app (gratis, funciona en el navegador)
    2. Arrastra tu foto
    3. Panel derecho: cambia el formato a "WebP"
    4. Calidad: 85
    5. Descarga la imagen ya comprimida

Estructura completa de carpetas de imágenes:

    assets/
    ├── icono-ppal.png              Logo del navbar
    ├── icono-premium.png           Icono del paquete premium (solo en carrito)
    ├── hero/                       3 fotos de la portada principal
    │   ├── drop-01.webp
    │   ├── drop-02.webp
    │   └── drop-03.webp
    ├── 2x1/                        Imagenes del configurador 2x1
    │   ├── diseno-street.webp
    │   └── diseno-sweet.webp
    └── productos/
        ├── basica/                 Coleccion Basica
        ├── estelar/                Coleccion Estelar
        ├── hallownyx/              Hallownyx
        ├── nooc/                   NXR Outlaw Club
        ├── sivarx/                 SivarxNyxar
        └── nueva-coleccion/        Tu la creas al subir las fotos

Cómo crear una carpeta nueva en GitHub:
GitHub no permite crear carpetas vacías. Usa este truco:

    Paso 1 → Entra a assets/productos/
    Paso 2 → Clic en "Add file" luego en "Create new file"
    Paso 3 → En el nombre del archivo escribe:
             nueva-coleccion/.gitkeep
             (el "/" le indica a GitHub que cree una carpeta)
    Paso 4 → Clic en "Commit changes"
    Paso 5 → Ahora entra a esa carpeta y sube tus imágenes normalmente

---

## 5. CÓMO AGREGAR UNA COLECCIÓN NUEVA COMPLETA

Paso A — Sube las imágenes primero

    1. Comprime tus fotos a WebP (squoosh.app)
    2. Nombrarlas con guiones, sin espacios, en minúsculas
       Ejemplo: nueva-diseno-negro.webp
    3. Crea la carpeta en GitHub: assets/productos/nueva/
    4. Sube todas las fotos ahí

Paso B — Agrega la colección en productos.js
Abre productos.js en GitHub (icono lapiz).

PRIMERO agrega tu coleccion al listado de COLECCIONES.
Busca esta sección al inicio del archivo:

    const COLECCIONES = [
      { id:"basica",    nombre:"Colección Básica"    },
      { id:"estelar",   nombre:"Colección Estelar"   },
      ...las demás...
    ];

Agrega tu nueva colección antes del cierre ];

    { id:"nueva", nombre:"Nombre Visible" },

SEGUNDO agrega los productos al final del array PRODUCTOS,
antes del cierre ]; al final del archivo.
(Ver plantilla en sección 14 de este README)

Paso C — El sitio se actualiza solo en 1 a 2 minutos.

---

## 6. CÓMO AGREGAR UN PRODUCTO A UNA COLECCIÓN EXISTENTE

Mismo proceso del Paso B de arriba. Solo agrega el bloque del producto
nuevo dentro del array PRODUCTOS usando la plantilla de la sección 14,
con el id correcto y el coleccion apuntando a una ya existente.

IDs disponibles por colección (para no repetir):

    Básica:      101 a 199
    Estelar:     201 a 299
    Hallownyx:   301 a 399
    NOOC:        401 a 499
    SivarxNyxar: 501 a 599
    Nueva:       901 a 999  (usa estos para colecciones nuevas)

---

## 7. CÓMO CAMBIAR PRECIOS

En productos.js cada producto tiene dos precios:

    precio: 25.99,         lo que paga el cliente
    precioTachado: 30.00,  el precio tachado (efecto de oferta)

Para cambiar el precio de toda una colección:

    1. Abre productos.js (icono lapiz)
    2. Presiona Ctrl+F para buscar (Cmd+F en Mac)
    3. Busca el nombre de la colección (ejemplo: estelar)
    4. Cambia precio: y precioTachado: en cada producto de esa sección
    5. Commit changes

Para cambiar el recargo de Oversize y Boxy (solo aplica en L y XL):
Busca en productos.js:

    recargos: {
      oversize: { L:1, XL:1 },
      boxy:     { L:2, XL:2 },
    },

Cambia los números según lo que necesites.

Para cambiar el extra de XL en Estelar:
Busca en productos.js:

    estelarXLExtra: 1.00,

Cambia el número.

---

## 8. CÓMO ACTUALIZAR LAS FOTOS DEL HERO (portada)

Las 3 fotos grandes de la página principal están en:

    assets/hero/drop-01.webp
    assets/hero/drop-02.webp
    assets/hero/drop-03.webp

Para cambiarlas:

    1. Elimina las fotos viejas de la carpeta assets/hero/
    2. Sube las nuevas con los MISMOS nombres exactos

Para cambiar el texto y botón del hero, en productos.js:

    dropActivo: {
      titulo:      "Nombre de la colección activa",
      descripcion: "Texto descriptivo corto.",
      linkBoton:   "#productos",
    },

---

## 9. CÓMO CAMBIAR EL NÚMERO DE WHATSAPP

En productos.js busca:

    whatsapp: "50300000000",

Cámbialo por tu número sin +, sin espacios, sin guiones.
Ejemplo: "50312345678"

---

## 10. CÓMO ACTIVAR EL LINK DE PAGO CUANDO LO TENGAS

Para todos los pedidos desde el armario:
Abre armario-page.js, busca el comentario:

    LINK DE PAGO

Reemplaza las líneas debajo del comentario por:

    btn.href   = "https://tu-link-de-pago.com";
    btn.target = "_blank";
    return;

Para un producto individual:
En productos.js, busca ese producto y cambia:

    linkPago: "https://tu-link-de-pago.com"

---

## 11. CÓMO MARCAR LOS "MÁS VISTOS" DEL MES

En productos.js cambia masVisto: true en los productos
con más clics y masVisto: false en los demás.
Solo aparecen los primeros 6 que tengan true.

Ejemplo — cada inicio de mes actualizas los más vistos:

    { id:103, nombre:"NXR CLB",        masVisto: true,  ... },
    { id:105, nombre:"The Nyxar Club", masVisto: true,  ... },
    { id:101, nombre:"All Eyes On Me", masVisto: false, ... },

---

## 12. MARCAR COMO "PRÓXIMAMENTE" O "AGOTADO"

    disponible: true,    producto disponible para comprar
    disponible: false,   muestra etiqueta "Próximamente", desactiva botones

---

## 13. REFERENCIA RÁPIDA DE ARCHIVOS

    productos.js      Lo que editas siempre (productos, precios, WhatsApp, hero)
    armario-page.js   Solo para pegar el link de pago cuando lo tengas
    index.html        Estructura página principal (raramente lo tocas)
    carrito.html      Página detalle de prenda (no lo tocas)
    armario.html      Página del armario (no lo tocas)
    coleccion-2x1.html  Configurador 2x1 (no lo tocas)
    style.css         Estilos y colores (solo si cambias el diseño)
    armario.js        Motor del armario en localStorage (no lo tocas)
    script.js         Lógica página principal (no lo tocas)
    carrito.js        Lógica detalle de prenda (no lo tocas)
    armario-page.js   Lógica del armario (solo para link de pago)
    2x1.js            Lógica configurador 2x1 (no lo tocas)

---

## 14. PLANTILLA COPIA-PEGA PARA NUEVA COLECCIÓN

Copia este bloque completo y pégalo en productos.js antes del ]; final.
Cambia SOLO los valores indicados con una flecha:

Primero agrega la colección en el listado COLECCIONES:

    { id:"nueva", nombre:"Nombre de tu Colección" },

Luego agrega cada producto en el array PRODUCTOS:

    {
      id: 901,
      nombre: "Nombre del diseño",
      coleccion: "nueva",
      categoria: "prendas",
      precio: 29.99,
      precioTachado: 35.00,
      colores: [
        { nombre:"Negro", hex:"#111111", imagen:"assets/productos/nueva/diseno-negro.webp" },
        { nombre:"Blanco",hex:"#f0f0f0", imagen:"assets/productos/nueva/diseno-blanco.webp" },
      ],
      slideshow: [],
      tallas: ["XS","S","M","L","XL"],
      cortes: ["Regular","Oversize","Boxy"],
      descripcion: "Descripcion corta que vera el cliente.",
      masVisto: false,
      destacado: false,
      disponible: true,
      linkPago: "#",
    },

Para el segundo producto de la misma colección copia el bloque de arriba
y cambia el id a 902, el nombre, los colores y las imágenes. Así sucesivamente.

Hexadecimales de los colores NYXAR disponibles:

    Negro          #111111
    Blanco         #f0f0f0
    Beige          #d6c3a3
    Azul Oscuro    #1a237e
    Rosa Black     #e8a0b0
    Rosa White     #f9d0dc
    Blanco Black   #e8e8e8
    Blanco Red     #f5dede
    Rosa           #f9a8c9
    Gris           #808080
    Morado         #7b00d4

Si solo tiene un color sin variantes usa esto:

    colores: [],

Y agrega la imagen directamente:

    imagen: "assets/productos/nueva/diseno.webp",

---

## TIEMPO DE ACTUALIZACIÓN

    Cambios en código (productos.js, etc.):  1 a 2 minutos
    Imágenes nuevas:                         inmediato al subir
    Si no ves el cambio:                     presiona Ctrl+Shift+R
                                             (recarga sin caché)
