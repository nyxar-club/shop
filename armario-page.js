/* NYXAR — armario-page.js */
'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll
  window.addEventListener('scroll', function() {
    var nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Actualizar badges
  Armario.updateBadges();

  // Renderizar contenido del armario
  renderArmario();

  // Re-renderizar si el usuario vuelve desde otra pestaña
  window.addEventListener('focus',    function() { Armario.updateBadges(); });
  window.addEventListener('pageshow', function() { renderArmario(); });
});

// ─────────────────────────────────────────
function renderArmario() {
  var items   = Armario.get();
  var empty   = document.getElementById('armEmpty');
  var content = document.getElementById('armContent');

  if (!empty || !content) return;

  Armario.updateBadges();

  if (items.length === 0) {
    empty.style.display   = 'flex';
    content.style.display = 'none';
    return;
  }

  empty.style.display   = 'none';
  content.style.display = 'grid';

  renderItems(items);
  renderSummary(items);
  buildFinalizarBtn(items);
}

// ─────────────────────────────────────────
function renderItems(items) {
  var container = document.getElementById('armItems');
  if (!container) return;
  container.innerHTML = '';

  items.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'arm-item';

    var imgHTML = '';
    if (item.imagen) {
      imgHTML = '<img src="' + item.imagen + '" alt="' + item.nombre + '" onerror="this.parentElement.classList.add(\'no-img\');this.remove()"/>';
    }

    var chips = '';
    if (item.color && item.color !== 'Único')  chips += '<span class="arm-detail-chip">' + item.color + '</span>';
    if (item.talla && item.talla !== '—')       chips += '<span class="arm-detail-chip">Talla ' + item.talla + '</span>';
    if (item.corte && item.corte !== '—')       chips += '<span class="arm-detail-chip">' + item.corte + '</span>';
    if (item.premium)                           chips += '<span class="arm-detail-chip prem">✦ Premium</span>';

    div.innerHTML =
      '<div class="arm-item-img' + (item.imagen ? '' : ' no-img') + '">' + imgHTML + '</div>' +
      '<div class="arm-item-info">' +
        '<p class="arm-item-col">' + (item.coleccion || 'NYXAR') + '</p>' +
        '<h3 class="arm-item-name">' + item.nombre + '</h3>' +
        '<div class="arm-item-details">' + chips + '</div>' +
      '</div>' +
      '<span class="arm-item-price">$' + parseFloat(item.precioFinal).toFixed(2) + '</span>' +
      '<button class="arm-item-del" title="Eliminar">✕</button>';

    // Botón eliminar — sin uid en el HTML para evitar problemas de escape
    var delBtn = div.querySelector('.arm-item-del');
    (function(uid) {
      delBtn.addEventListener('click', function() { eliminar(uid); });
    })(item.uid);

    container.appendChild(div);
  });
}

// ─────────────────────────────────────────
function renderSummary(items) {
  var rows = document.getElementById('sumRows');
  if (!rows) return;
  rows.innerHTML = '';

  items.forEach(function(item) {
    var row = document.createElement('div');
    row.className = 'sum-row';
    var detalle = [];
    if (item.talla && item.talla !== '—')      detalle.push(item.talla);
    if (item.color && item.color !== 'Único')  detalle.push(item.color);
    var desc = item.nombre + (detalle.length ? ' · ' + detalle.join(' · ') : '');
    row.innerHTML =
      '<span class="sum-row-name">' + desc + '</span>' +
      '<span class="sum-row-price">$' + parseFloat(item.precioFinal).toFixed(2) + '</span>';
    rows.appendChild(row);
  });

  var totalBase  = Armario.total();
  var totalFinal = descuentoActivo
    ? parseFloat((totalBase * (1 - DESCUENTO_PORCIENTO / 100)).toFixed(2))
    : totalBase;
  var totalEl = document.getElementById('sumTotal');
  if (totalEl) {
    totalEl.textContent = '$' + totalFinal.toFixed(2) +
      (descuentoActivo ? ' (-' + DESCUENTO_PORCIENTO + '%)' : '');
  }
}

// ─────────────────────────────────────────
function buildFinalizarBtn(items) {
  var btn = document.getElementById('btnFinalizar');
  if (!btn) return;

  var totalBase = Armario.total();
  var total = descuentoActivo
    ? parseFloat((totalBase * (1 - DESCUENTO_PORCIENTO / 100)).toFixed(2))
    : totalBase;
  var wa    = (typeof STORE_CONFIG !== 'undefined') ? STORE_CONFIG.whatsapp : '50300000000';

  /* ── LINK DE PAGO ──────────────────────────────────────────
     Cuando tengas el link, sustituye estas líneas por:
       btn.href   = "https://tu-link-de-pago.com";
       btn.target = "_blank";
       return;
     ─────────────────────────────────────────────────────── */

  var lineas = ['🖤 *Pedido NYXAR — Mi Armario*', ''];

  items.forEach(function(item, i) {
    lineas.push('*' + (i + 1) + '. ' + item.nombre + '*');
    if (item.color && item.color !== 'Único') lineas.push('   🎨 Color: ' + item.color);
    if (item.talla && item.talla !== '—')     lineas.push('   📏 Talla: ' + item.talla);
    if (item.corte && item.corte !== '—')     lineas.push('   ✂️ Corte: ' + item.corte);
    if (item.premium)                          lineas.push('   ✦ Paquete Premium');
    lineas.push('   💰 $' + parseFloat(item.precioFinal).toFixed(2));
  });

  lineas.push('');
  lineas.push('🚚 Envío: GRATIS');
  if (descuentoActivo) {
    lineas.push('🏷️ Descuento ' + DESCUENTO_PORCIENTO + '%: -$' + (totalBase - total).toFixed(2));
  }
  lineas.push('💳 *Total: $' + total.toFixed(2) + '*');
  lineas.push('');
  lineas.push('Quiero confirmar este pedido. ¿Cómo continúo?');

  btn.href   = 'https://wa.me/' + wa + '?text=' + encodeURIComponent(lineas.join('\n'));
  btn.target = '_blank';
}

// ─────────────────────────────────────────
function eliminar(uid) {
  Armario.remove(uid);
  showToast('Prenda eliminada del armario');
  renderArmario();
}

// ─────────────────────────────────────────
// CÓDIGOS DE DESCUENTO
// Agrega códigos: 'codigo': true
// Desactiva códigos: cambia true por false o elimina la línea
// Cambia el porcentaje: modifica DESCUENTO_PORCIENTO
// ─────────────────────────────────────────
var CODIGOS_DESCUENTO = {
  'willy':  true,
  'ded7':   true,
  'pupusa': true,
};
var DESCUENTO_PORCIENTO = 10;
var descuentoActivo = false;

function aplicarDescuento() {
  var input  = document.getElementById('discountInput');
  var codigo = input ? input.value.trim().toLowerCase() : '';

  if (!codigo) {
    mostrarMsgDescuento('Escribe un código primero.', false);
    return;
  }

  if (CODIGOS_DESCUENTO[codigo]) {
    descuentoActivo = true;
    mostrarMsgDescuento('✓ Código aplicado — ' + DESCUENTO_PORCIENTO + '% de descuento', true);
    if (input) input.disabled = true;
    var btn = document.querySelector('.discount-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Aplicado ✓'; }
    renderSummary(Armario.get());
    buildFinalizarBtn(Armario.get());
  } else {
    descuentoActivo = false;
    mostrarMsgDescuento('Código no válido. Intenta de nuevo.', false);
  }
}

function mostrarMsgDescuento(texto, esValido) {
  var msg = document.getElementById('discountMsg');
  if (!msg) return;
  msg.textContent = texto;
  msg.style.color = esValido ? '#2e7d32' : '#c62828';
}

// ─────────────────────────────────────────
var _tt;
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_tt);
  _tt = setTimeout(function() { t.classList.remove('show'); }, 2500);
}
