/* NYXAR — script.js */
'use strict';
let catActual='todos', colActual='todas', sliderIdx=0, sliderTimer;

document.addEventListener('DOMContentLoaded',()=>{
  applyConfig();
  buildColFilters();
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

function toggleDrop(e){
  e.stopPropagation();
  const m=document.getElementById('dropMenu'),c=document.getElementById('dropChev'),open=m.classList.contains('open');
  closeAllDrops(); if(!open){m.classList.add('open');c.classList.add('open');}
}
function closeAllDrops(){document.getElementById('dropMenu')?.classList.remove('open');document.getElementById('dropChev')?.classList.remove('open');}
function setupClickOutside(){document.addEventListener('click',e=>{if(!e.target.closest('#navDrop'))closeAllDrops();});}
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
