/* ============================================================
   NYXAR — 2x1.js  (versión con frente/espalda, talla y corte por camisa)
   ============================================================ */
'use strict';

/* ── Colores del diseño disponibles ── */
const DC = [
  { nombre:"Blanco",       hex:"#ffffff" },
  { nombre:"Gris",         hex:"#aaaaaa" },
  { nombre:"Gris Oscuro",  hex:"#555555" },
  { nombre:"Negro",        hex:"#111111" },
  { nombre:"Morado",       hex:"#7b00d4" },
  { nombre:"Azul",         hex:"#1565c0" },
  { nombre:"Rosado",       hex:"#f48fb1" },
  { nombre:"Rojo",         hex:"#e53935" },
  { nombre:"Naranja",      hex:"#fb8c00" },
  { nombre:"Amarillo",     hex:"#fdd835" },
  { nombre:"Verde",        hex:"#43a047" },
  { nombre:"Verde Oscuro", hex:"#1b5e20" },
];

/* ── Mapa de nombres de colores en español → slug para rutas ── */
const COLOR_SLUG = {
  'Negro':  'negro',
  'Blanco': 'blanco',
  'Rosa':   'rosa',
  'Gris':   'gris',
  'Beige':  'beige',
};

/* ── Mapa de colores de diseño → slug para rutas ── */
const DC_SLUG = {
  'Blanco':       'blanco',
  'Gris':         'gris',
  'Gris Oscuro':  'gris-oscuro',
  'Negro':        'negro',
  'Morado':       'morado',
  'Azul':         'azul',
  'Rosado':       'rosado',
  'Rojo':         'rojo',
  'Naranja':      'naranja',
  'Amarillo':     'amarillo',
  'Verde':        'verde',
  'Verde Oscuro': 'verde-oscuro',
};

/* ── Estado global ── */
const S = {
  A: { color:'Negro',  hex:'#111111', talla:'XS', corte:'Regular', diseno:'street', dc:{ nombre:'Blanco', hex:'#ffffff' } },
  B: { color:'Blanco', hex:'#f0f0f0', talla:'XS', corte:'Regular', diseno:'street', dc:{ nombre:'Negro',  hex:'#111111' } },
  premium: false,
};

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
    var nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  Armario.updateBadges();
  buildDcGrids();
  updateColorPreviews('A');
  updateColorPreviews('B');
  updateVistas();
  updateTotal();
});

/* ══════════════════════════════════════
   PASO 1 — COLOR
══════════════════════════════════════ */
function pickColor(shirt, nombre, hex, btn) {
  document.querySelectorAll('#color' + shirt + ' .cpick').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  S[shirt].color = nombre;
  S[shirt].hex   = hex;
  updateColorPreviews(shirt);
  updateVistas();
  updateLabel(shirt);
}

/* Actualiza las imágenes de previsualización de color en el paso 1 */
function updateColorPreviews(shirt) {
  var corte = S[shirt].corte.toLowerCase(); // regular / oversize / boxy
  var color = COLOR_SLUG[S[shirt].color] || S[shirt].color.toLowerCase();

  var imgFront = 'assets/2x1/2x1-' + color + '-' + corte + '-frente.webp';
  var imgBack  = 'assets/2x1/2x1-' + color + '-' + corte + '-espalda.webp';

  var sides = ['F', 'B'];
  var srcs  = [imgFront, imgBack];
  var fills = [S[shirt].hex, S[shirt].hex];

  sides.forEach(function(side, i) {
    var imgEl = document.getElementById('colorImg' + shirt + side);
    var silWrap = document.getElementById('sil' + shirt + side);
    var silFill = document.getElementById('sil' + (shirt === 'A'
        ? (side === 'F' ? 'AFill' : 'ABFill')
        : (side === 'F' ? 'BFFill' : 'BBFill')));

    if (imgEl) {
      imgEl.src = srcs[i];
      imgEl.style.display = '';
      if (silWrap) silWrap.style.display = 'none';
      imgEl.onerror = function() {
        this.style.display = 'none';
        if (silWrap) silWrap.style.display = 'flex';
        if (silFill) {
          silFill.style.background = S[shirt].hex;
          var needsBorder = (S[shirt].hex === '#f0f0f0' || S[shirt].hex === '#ffffff');
          silFill.style.border = needsBorder ? '1px solid #ccc' : '1px solid rgba(0,0,0,.08)';
        }
      };
    }
  });
}

/* ══════════════════════════════════════
   PASO 1B — TALLA
══════════════════════════════════════ */
function pickTalla(shirt, talla, btn) {
  document.querySelectorAll('#talla' + shirt + ' .tchip').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  S[shirt].talla = talla;
  updateLabel(shirt);
}

/* ══════════════════════════════════════
   PASO 1C — CORTE
══════════════════════════════════════ */
function pickCorte(shirt, corte, btn) {
  document.querySelectorAll('#corte' + shirt + ' .tchip').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  S[shirt].corte = corte;
  updateColorPreviews(shirt); // las imágenes de color también cambian por corte
  updateVistas();
  updateLabel(shirt);
}

/* ══════════════════════════════════════
   PASO 2 — DISEÑO (por camisa)
══════════════════════════════════════ */
function pickDesign(shirt, diseno, btn) {
  var groupId = 'designOptions' + shirt;
  document.querySelectorAll('#' + groupId + ' .design-opt').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  S[shirt].diseno = diseno;
  updateVistas();
  updateLabel(shirt);
}

/* ══════════════════════════════════════
   PASO 3 — COLOR DEL DISEÑO
══════════════════════════════════════ */
function buildDcGrids() {
  ['A', 'B'].forEach(function(shirt) {
    var el = document.getElementById('dc' + shirt);
    if (!el) return;
    el.innerHTML = '';
    var defaultNombre = shirt === 'A' ? 'Blanco' : 'Negro';

    DC.forEach(function(c) {
      var btn = document.createElement('button');
      btn.className = 'dcbtn' + (c.nombre === defaultNombre ? ' active' : '');
      btn.style.background = c.hex;
      if (c.hex === '#ffffff') btn.style.border = '2.5px solid #ccc';
      btn.title = c.nombre;

      var dark = isDark(c.hex);
      btn.innerHTML = '<span class="ck" style="color:' + (dark ? '#fff' : '#111') + '">✓</span>';

      (function(color) {
        btn.onclick = function() {
          el.querySelectorAll('.dcbtn').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          S[shirt].dc = color;
          var nameEl = document.getElementById('dc' + shirt + 'Name');
          if (nameEl) nameEl.textContent = color.nombre;
          updateVistas();
        };
      })(c);

      el.appendChild(btn);
    });
  });
}

function isDark(hex) {
  var r = parseInt(hex.slice(1,3), 16);
  var g = parseInt(hex.slice(3,5), 16);
  var b = parseInt(hex.slice(5,7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

/* ══════════════════════════════════════
   ACTUALIZAR VISTAS FINALES
   Usa las 360 imágenes reales:
   assets/2x1/2x1-{color}-{corte}-{diseño}-{colorDiseno}-{lado}.webp
══════════════════════════════════════ */
function updateVistas() {
  ['A', 'B'].forEach(function(shirt) {
    var colorCamisa  = COLOR_SLUG[S[shirt].color]  || S[shirt].color.toLowerCase();
    var corte        = S[shirt].corte.toLowerCase();
    var diseno       = S[shirt].diseno;
    var colorDiseno  = DC_SLUG[S[shirt].dc.nombre] || S[shirt].dc.nombre.toLowerCase();

    var imgFront = 'assets/2x1/2x1-' + colorCamisa + '-' + corte + '-' + diseno + '-' + colorDiseno + '-frente.webp';
    var imgBack  = 'assets/2x1/2x1-' + colorCamisa + '-' + corte + '-' + diseno + '-' + colorDiseno + '-espalda.webp';

    setVistaImagen('vShirt' + shirt + 'F', 'vista' + shirt + 'F', imgFront, S[shirt].hex);
    setVistaImagen('vShirt' + shirt + 'B', 'vista' + shirt + 'B', imgBack,  S[shirt].hex);

    // Ocultar overlay de texto (ya no se necesita con imágenes reales)
    var dF = document.getElementById('vDesign' + shirt + 'F');
    var dB = document.getElementById('vDesign' + shirt + 'B');
    if (dF) dF.textContent = '';
    if (dB) dB.textContent = '';
  });
}

function setVistaImagen(imgId, canvasId, src, fallbackHex) {
  var img    = document.getElementById(imgId);
  var canvas = document.getElementById(canvasId);
  if (!img || !canvas) return;

  // Limpiar silueta fallback anterior
  var oldShape = canvas.querySelector('.vista-shirt-shape');
  if (oldShape) oldShape.remove();
  canvas.classList.remove('no-img');
  canvas.style.background = '';

  img.style.display = '';
  img.src = src;
  img.onerror = function() {
    this.style.display = 'none';
    canvas.classList.add('no-img');
    canvas.style.background = fallbackHex;
    if (!canvas.querySelector('.vista-shirt-shape')) {
      var shape = document.createElement('div');
      shape.className = 'vista-shirt-shape';
      shape.style.background = fallbackHex;
      shape.style.border = (fallbackHex === '#f0f0f0' || fallbackHex === '#ffffff')
        ? '1px solid #ccc' : '1px solid rgba(0,0,0,.06)';
      canvas.appendChild(shape);
    }
  };
}

/* ══════════════════════════════════════
   LABEL RESUMEN POR CAMISA
══════════════════════════════════════ */
function updateLabel(shirt) {
  var el = document.getElementById('label' + shirt);
  if (!el) return;
  el.textContent = S[shirt].color + ' · ' + S[shirt].corte + ' · ' +
    (S[shirt].diseno === 'street' ? 'Street' : 'Sweet') + ' · Talla ' + S[shirt].talla;
}

/* ══════════════════════════════════════
   TOTAL
══════════════════════════════════════ */
function updateTotal() {
  var t = 25.99 + 4.67 + (S.premium ? 2.99 : 0);
  var el = document.getElementById('x2Total');
  if (el) el.textContent = '$' + t.toFixed(2);
  buildPayBtn(t);
}

/* ══════════════════════════════════════
   PREMIUM
══════════════════════════════════════ */
function toggle2x1Premium() {
  S.premium = !S.premium;
  var btn = document.getElementById('x2BtnPrem');
  var row = document.getElementById('x2PremRow');
  if (btn) { btn.textContent = S.premium ? '✓ Activo' : '+ $2.99'; btn.classList.toggle('active', S.premium); }
  if (row) row.style.display = S.premium ? '' : 'none';
  updateTotal();
}

/* ══════════════════════════════════════
   BOTÓN PAGAR → WhatsApp
══════════════════════════════════════ */
function buildPayBtn(total) {
  var btn = document.getElementById('x2BtnPagar');
  if (!btn) return;

  var wa = (typeof STORE_CONFIG !== 'undefined') ? STORE_CONFIG.whatsapp : '50300000000';

  var lineas = [
    '🖤 Hola NYXAR! Quiero el 2×1:',
    '',
    '👕 Camisa A:',
    '   Color: '  + S.A.color,
    '   Talla: '  + S.A.talla,
    '   Corte: '  + S.A.corte,
    '   Diseño: ' + (S.A.diseno === 'street' ? 'Street' : 'Sweet'),
    '   Color del diseño: ' + S.A.dc.nombre,
    '',
    '👕 Camisa B:',
    '   Color: '  + S.B.color,
    '   Talla: '  + S.B.talla,
    '   Corte: '  + S.B.corte,
    '   Diseño: ' + (S.B.diseno === 'street' ? 'Street' : 'Sweet'),
    '   Color del diseño: ' + S.B.dc.nombre,
    '',
    S.premium ? '✦ Paquete Premium (+$2.99)' : '',
    '',
    '💰 Prendas: $25.99',
    '🚚 Envío: $4.67',
    '💳 Total: $' + total.toFixed(2),
  ].filter(function(l) { return l !== undefined; }).join('\n');

  btn.href   = 'https://wa.me/' + wa + '?text=' + encodeURIComponent(lineas);
  btn.target = '_blank';
}

/* ── Toast ── */
var _tt2x1;
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(_tt2x1); _tt2x1 = setTimeout(function() { t.classList.remove('show'); }, 2500);
}
