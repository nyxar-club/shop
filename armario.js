/* ============================================================
   NYXAR — armario.js
   Incluir PRIMERO en todas las páginas, antes de cualquier otro script
   ============================================================ */

const ARMARIO_KEY = 'nyxar_armario';

const Armario = {

  get: function() {
    try {
      var raw = localStorage.getItem(ARMARIO_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch(e) {
      return [];
    }
  },

  save: function(items) {
    try {
      localStorage.setItem(ARMARIO_KEY, JSON.stringify(items));
    } catch(e) {}
    Armario.updateBadges();
  },

  add: function(item) {
    var items = Armario.get();
    // UID simple: solo números, sin caracteres especiales
    item.uid = 'u' + Date.now() + Math.floor(Math.random() * 9999);
    items.push(item);
    Armario.save(items);
  },

  remove: function(uid) {
    var items = Armario.get().filter(function(i) { return i.uid !== uid; });
    Armario.save(items);
  },

  count: function() {
    return Armario.get().length;
  },

  total: function() {
    return Armario.get().reduce(function(s, i) {
      return s + (parseFloat(i.precioFinal) || 0);
    }, 0);
  },

  updateBadges: function() {
    var c = Armario.count();
    // Actualizar TODOS los elementos con cualquiera de estos selectores
    var ids = ['armarioBadge', 'armarioBadgeMob'];
    ids.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.textContent = c;
        el.style.display = c > 0 ? 'flex' : 'none';
      }
    });
    // También por clase
    var byClass = document.querySelectorAll('.armario-count');
    byClass.forEach(function(el) {
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });
  }

};

// Actualizar badges tan pronto como sea posible
(function iniciarBadges() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      Armario.updateBadges();
    });
  } else {
    Armario.updateBadges();
  }
})();

// También al volver a la pestaña
window.addEventListener('focus', function() { Armario.updateBadges(); });
window.addEventListener('pageshow', function() { Armario.updateBadges(); });

