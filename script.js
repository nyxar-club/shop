/* NYXAR — script.js */
'use strict';
let catActual='todos', colActual='todas', sliderIdx=0, sliderTimer;

document.addEventListener('DOMContentLoaded',()=>{
  applyConfig();
  buildColFilters();
  renderCaminoCatalog();
  renderVistos();
  renderDest();
  renderTodos();
  setupSlider();
  setupCountdown();
  window.addEventListener('scroll',()=>{ document.getElementById('navbar')?.classList.toggle('scrolled',window.scrollY>30); },{passive:true});
  setupIntersection();
  setupClickOutside();
  document.getElementById('hamburger')?.addEventListener('click',()=>{
    document.getElementById('hamburger').classList.toggle('open');
    document.getElementById('mobMenu').classList.toggle('open');
  });
  Armario.updateBadges();
});

/* Actualizar badge cuando el usuario vuelve a esta página desde el armario */
window.addEventListener('pageshow', () => Armario.updateBadges());
window.addEventListener('focus',    () => Armario.updateBadges());

function applyConfig(){
  const c=STORE_CONFIG.dropActivo;
  const t=document.getElementById('dropTitle'),d=document.getElementById('dropDesc'),b=document.getElementById('btnComprar');
  if(t)t.textContent=c.titulo; if(d)d.textContent=c.descripcion; if(b)b.href=c.linkBoton;
  const wa=`https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent('Hola NYXAR!')}`;
  const waBtn=document.getElementById('waBtn'), fWa=document.getElementById('fWa');
  if(waBtn)waBtn.href=wa; if(fWa)fWa.href=`https://wa.me/${STORE_CONFIG.whatsapp}`;
  // Badges armario
  const b1=document.getElementById('armarioBadge'), b2=document.getElementById('armarioBadgeMob');
  const cnt=Armario.count();
  if(b1){b1.textContent=cnt; b1.style.display=cnt>0?'flex':'none';}
  if(b2)b2.textContent=cnt;
}

function setupSlider(){
  const s=document.querySelectorAll('.slide'); if(!s.length)return; goSlide(0);
}
function goSlide(n){
  const s=document.querySelectorAll('.slide'),d=document.querySelectorAll('.dot');
  sliderIdx=n; s.forEach((x,i)=>x.classList.toggle('active',i===n)); d.forEach((x,i)=>x.classList.toggle('active',i===n));
  clearInterval(sliderTimer); sliderTimer=setInterval(()=>goSlide((sliderIdx+1)%s.length),3800);
}
function setupCountdown(){tick();setInterval(tick,1000);}
function tick(){
  const diff=Math.max(0,new Date(STORE_CONFIG.proximoLanzamiento)-Date.now());
  const fn=id=>document.getElementById(id);
  if(fn('cd-d'))fn('cd-d').textContent=pad(Math.floor(diff/86400000));
  if(fn('cd-h'))fn('cd-h').textContent=pad(Math.floor((diff%86400000)/3600000));
  if(fn('cd-m'))fn('cd-m').textContent=pad(Math.floor((diff%3600000)/60000));
  if(fn('cd-s'))fn('cd-s').textContent=pad(Math.floor((diff%60000)/1000));
}
function pad(n){return String(n).padStart(2,'0');}

function toggleDrop(e, id){
  e.stopPropagation();
  id = id || 'tienda';
  const menuId = 'dropMenu' + id.charAt(0).toUpperCase() + id.slice(1);
  const chevId = 'dropChev' + id.charAt(0).toUpperCase() + id.slice(1);
  const m = document.getElementById(menuId);
  const c = document.getElementById(chevId);
  if(!m) return;
  const open = m.classList.contains('open');
  closeAllDrops();
  if(!open){ m.classList.add('open'); if(c) c.classList.add('open'); }
}
function closeAllDrops(){
  document.querySelectorAll('.drop-menu').forEach(m=>m.classList.remove('open'));
  document.querySelectorAll('.chev').forEach(c=>c.classList.remove('open'));
}
function setupClickOutside(){
  document.addEventListener('click', e=>{
    if(!e.target.closest('.has-drop')) closeAllDrops();
  });
}
function closeMob(){document.getElementById('hamburger')?.classList.remove('open');document.getElementById('mobMenu')?.classList.remove('open');}
function goFilter(cat){
  closeAllDrops(); closeMob(); catActual=cat; colActual='todas';
  document.querySelectorAll('#fCat .fbtn').forEach(b=>b.classList.toggle('active',b.dataset.f===cat));
  updateColBar(); renderTodos();
  setTimeout(()=>document.getElementById('productos')?.scrollIntoView({behavior:'smooth'}),80);
}
function buildColFilters(){
  const bar=document.getElementById('fCol'); if(!bar)return;
  bar.innerHTML='<button class="fbtn-sm active" data-c="todas" onclick="setCola(this)">Todas</button>';
  COLECCIONES.forEach(col=>{
    if(!PRODUCTOS.some(p=>p.coleccion===col.id))return;
    const b=document.createElement('button');
    b.className='fbtn-sm'; b.dataset.c=col.id; b.textContent=col.nombre;
    b.setAttribute('onclick','setCola(this)'); bar.appendChild(b);
  });
}
function setCat(btn){
  catActual=btn.dataset.f; colActual='todas';
  document.querySelectorAll('#fCat .fbtn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  document.querySelectorAll('#fCol .fbtn-sm').forEach(b=>b.classList.toggle('active',b.dataset.c==='todas'));
  updateColBar(); renderTodos();
}
function setCola(btn){
  colActual=btn.dataset.c;
  document.querySelectorAll('#fCol .fbtn-sm').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  renderTodos();
}
function updateColBar(){const bar=document.getElementById('fCol');if(bar)bar.style.display=catActual==='prendas'?'flex':'none';}

function renderCaminoCatalog(){
  const el=document.getElementById('caminoCatalog'); if(!el)return;
  // Tomar los primeros 6 productos disponibles con imagen
  const lista=PRODUCTOS.filter(p=>p.disponible&&p.colores&&p.colores.length).slice(0,6);
  el.innerHTML='';
  lista.forEach(p=>{
    const src=p.colores[0].imagenes?.[0]||p.colores[0].imagen||'';
    const div=document.createElement('div');
    div.className='camino-cat-item';
    div.innerHTML=`<img src="${src}" alt="${p.nombre}" onerror="this.parentElement.classList.add('camino-cat-noimg')"/>`;
    el.appendChild(div);
  });
}
function renderVistos(){render('gridVistos',PRODUCTOS.filter(p=>p.masVisto).slice(0,6));}
function renderDest(){render('gridDest',PRODUCTOS.filter(p=>p.destacado).slice(0,6));}
function renderTodos(){
  let lista=[...PRODUCTOS];
  if(catActual!=='todos')lista=lista.filter(p=>p.categoria===catActual);
  if(catActual==='prendas'&&colActual!=='todas')lista=lista.filter(p=>p.coleccion===colActual);
  render('gridTodos',lista);
}
function render(id,lista){
  const el=document.getElementById(id); if(!el)return; el.innerHTML='';
  if(!lista.length){el.innerHTML='<p style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--muted);font-size:.8rem">Próximamente...</p>';return;}
  lista.forEach(p=>el.appendChild(makeCard(p)));
}
function makeCard(p){
  const card=document.createElement('div');
  card.className='pcard'+((!p.disponible)?' agotado':'');
  card.onclick=()=>{
    if(p.coleccion==='2x1'){window.location.href='coleccion-2x1.html';return;}
    window.location.href=`carrito.html?id=${p.id}`;
  };
  // Imagen de portada: primer color → primera imagen del array imagenes[]
  // Si no tiene colores o imagenes[], usa imagen directa (compatibilidad)
  let imgSrc='';
  if(p.colores && p.colores.length){
    const primerColor = p.colores[0];
    imgSrc = (primerColor.imagenes && primerColor.imagenes.length)
      ? primerColor.imagenes[0]
      : (primerColor.imagen || '');
  } else {
    imgSrc = p.imagen || '';
  }
  const colNombre=p.coleccion?(COLECCIONES.find(c=>c.id===p.coleccion)?.nombre||p.coleccion):p.categoria;
  card.innerHTML=`
    <div class="pcard-img" id="pi${p.id}">
      <img src="${imgSrc}" alt="${p.nombre}" onerror="document.getElementById('pi${p.id}').classList.add('no-img');this.style.display='none'"/>
      <span class="ptag${!p.disponible?' pronto':''}">${!p.disponible?'Próximamente':colNombre}</span>
    </div>
    <div class="pcard-info">
      <p class="pcat">${p.categoria}</p>
      <h3 class="pname">${p.nombre}</h3>
      <div class="pprice">
        <span class="pprice-tach">$${p.precioTachado.toFixed(2)}</span>
        <span class="pprice-real">$${p.precio.toFixed(2)}</span>
      </div>
    </div>`;
  return card;
}
function setupIntersection(){
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:.06});
  document.querySelectorAll('.block,.reveal').forEach(s=>obs.observe(s));
}
function toggleFaq(btn){
  const a=btn.nextElementSibling,open=btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(q=>{q.classList.remove('open');q.nextElementSibling.classList.remove('open');});
  if(!open){btn.classList.add('open');a.classList.add('open');}
}
let _tt;
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>t.classList.remove('show'),2500);}

/* ══════════════════════════════════════
   PERCHERO DIGITAL
══════════════════════════════════════ */

// Estado del modal
var _percheroPrendas  = [];
var _percheroIdx      = 0;
var _percheroVista    = 'front'; // 'front' | 'back'

/* SVG de percha */
function svgPercha() {
  return '<svg class="perchero-percha" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<line x1="20" y1="0" x2="20" y2="8" stroke="rgba(192,132,252,0.7)" stroke-width="1.5"/>'
    + '<path d="M20 8 Q20 14 6 22 Q3 23 2 22 Q0 21 2 19 Q4 18 6 19" stroke="rgba(192,132,252,0.7)" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
    + '<path d="M20 8 Q20 14 34 22 Q37 23 38 22 Q40 21 38 19 Q36 18 34 19" stroke="rgba(192,132,252,0.7)" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
    + '<circle cx="20" cy="4" r="2.5" stroke="rgba(192,132,252,0.7)" stroke-width="1.2" fill="none"/>'
    + '</svg>';
}

/* Construir el perchero con la colección configurada */
function buildPerchero() {
  var colId   = (typeof STORE_CONFIG !== 'undefined') ? STORE_CONFIG.percheroColeccion : null;
  var container = document.getElementById('percheroPrendas');
  if (!container || !colId) return;

  // Filtrar productos de la colección seleccionada y disponibles
  var lista = PRODUCTOS.filter(function(p) {
    return p.coleccion === colId && p.disponible;
  });

  // Actualizar encabezado
  var colObj   = COLECCIONES.find(function(c) { return c.id === colId; });
  var colNombre = colObj ? colObj.nombre : colId;
  var tituloEl = document.getElementById('percheroTitulo');
  var eyeEl    = document.getElementById('percheroEyebrow');
  if (tituloEl) tituloEl.textContent = colNombre;
  if (eyeEl)    eyeEl.textContent    = 'Colección destacada';

  if (!lista.length) {
    container.innerHTML = '<p style="color:rgba(255,255,255,.3);font-size:.8rem;padding:2rem">No hay prendas asignadas a esta colección.</p>';
    return;
  }

  // Guardar para el modal
  _percheroPrendas = lista;

  container.innerHTML = '';
  lista.forEach(function(prod, idx) {
    // Primera imagen del primer color
    var imgSrc = '';
    if (prod.colores && prod.colores.length) {
      imgSrc = (prod.colores[0].imagenes && prod.colores[0].imagenes.length)
        ? prod.colores[0].imagenes[0]
        : (prod.colores[0].imagen || '');
    }

    var item = document.createElement('div');
    item.className = 'perchero-item';
    item.innerHTML =
      svgPercha() +
      '<img class="perchero-item-img" src="' + (imgSrc || '') + '" alt="' + prod.nombre + '"' +
        ' onerror="this.style.opacity=\'0.2\'">' +
      '<span class="perchero-item-nombre">' + prod.nombre + '</span>';

    (function(i) {
      item.addEventListener('click', function() { abrirModalPrenda(i); });
    })(idx);

    container.appendChild(item);
  });
}

/* Abrir modal */
function abrirModalPrenda(idx) {
  _percheroIdx   = idx;
  _percheroVista = 'front';
  renderModalPrenda();
  document.getElementById('modalPrendaBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* Cerrar modal */
function cerrarModalPrenda() {
  document.getElementById('modalPrendaBg').classList.remove('open');
  document.body.style.overflow = '';
}

/* Renderizar contenido del modal */
function renderModalPrenda() {
  var prod = _percheroPrendas[_percheroIdx];
  if (!prod) return;

  // Imagen según vista
  var imgSrc = '';
  if (prod.colores && prod.colores.length) {
    var imgs = prod.colores[0].imagenes || [];
    if (_percheroVista === 'front') {
      imgSrc = imgs[0] || prod.colores[0].imagen || '';
    } else {
      imgSrc = imgs[1] || imgs[0] || prod.colores[0].imagen || '';
    }
  }

  var modalImg = document.getElementById('modalImg');
  modalImg.classList.add('flipping');
  setTimeout(function() {
    modalImg.src = imgSrc || '';
    modalImg.classList.remove('flipping');
  }, 200);

  document.getElementById('modalNombre').textContent = prod.nombre;

  // Botón explorar → carrito
  var cta = document.getElementById('modalCta');
  cta.href = 'carrito.html?id=' + prod.id;

  // Botones vista
  document.getElementById('btnFrente').classList.toggle('active',  _percheroVista === 'front');
  document.getElementById('btnEspalda').classList.toggle('active', _percheroVista === 'back');

  // Flechas prev/next
  document.getElementById('modalPrev').style.opacity = _percheroIdx > 0 ? '1' : '0.3';
  document.getElementById('modalNext').style.opacity = _percheroIdx < _percheroPrendas.length - 1 ? '1' : '0.3';
}

/* Cambiar prenda desde modal */
function cambiarPrenda(dir) {
  var nuevo = _percheroIdx + dir;
  if (nuevo < 0 || nuevo >= _percheroPrendas.length) return;
  _percheroIdx   = nuevo;
  _percheroVista = 'front';
  renderModalPrenda();
}

/* Cambiar vista frente/espalda */
function setVista(vista) {
  _percheroVista = vista;
  renderModalPrenda();
}

/* Scroll con flechas */
function scrollPerchero(dir) {
  var el = document.getElementById('percheroPrendas');
  if (el) el.scrollBy({ left: dir * 280, behavior: 'smooth' });
}

/* Cerrar modal con Escape */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') cerrarModalPrenda();
});

/* Inicializar perchero cuando el DOM esté listo */
(function() {
  function initPerchero() {
    if (typeof PRODUCTOS !== 'undefined' && typeof STORE_CONFIG !== 'undefined') {
      buildPerchero();
    } else {
      setTimeout(initPerchero, 100);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerchero);
  } else {
    initPerchero();
  }
})();
