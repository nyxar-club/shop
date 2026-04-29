/* NYXAR — carrito.js */
'use strict';
let prod=null, tallaActual=null, corteActual=null, colorActual=0, premActivo=false;

document.addEventListener('DOMContentLoaded',()=>{
  window.addEventListener('scroll',()=>{ document.getElementById('navbar')?.classList.toggle('scrolled',window.scrollY>20); },{passive:true});
  window.addEventListener('pageshow', ()=> Armario.updateBadges());
  window.addEventListener('focus',    ()=> Armario.updateBadges());
  Armario.updateBadges();
  const id=parseInt(new URLSearchParams(window.location.search).get('id'));
  prod=PRODUCTOS.find(p=>p.id===id);
  if(!prod){window.location.href='index.html';return;}
  renderPage();
});

function renderPage(){
  const colNombre=prod.coleccion?(COLECCIONES.find(c=>c.id===prod.coleccion)?.nombre||prod.coleccion):prod.categoria;
  setText('cartColTag',colNombre.toUpperCase());
  setText('cartName',prod.nombre);
  setText('cartPriceTach',`$${prod.precioTachado.toFixed(2)}`);
  setText('cartDesc',prod.descripcion);
  colorActual=0; tallaActual=prod.tallas[0]||null; corteActual=prod.cortes[0]||null;
  buildGallery(0);       // Galería del primer color
  buildColors();
  buildChips('tallaChips',prod.tallas,tallaActual,v=>{tallaActual=v;checkXl();updateTotal();});
  buildChips('corteChips',prod.cortes,corteActual,v=>{corteActual=v;updateTotal();});
  document.getElementById('fieldTalla').style.display=prod.tallas.length?'':'none';
  document.getElementById('fieldCorte').style.display=prod.cortes.length?'':'none';
  if(!prod.disponible) showAgotado();
  checkXl(); updateTotal();
}

/* ── Galería: muestra las imágenes del color seleccionado ── */
function buildGallery(colorIdx){
  const main   = document.getElementById('cartMainImg');
  const thumbs = document.getElementById('cartThumbs');

  // Obtener imágenes del color actual
  let fotos = [];
  if(prod.colores.length && prod.colores[colorIdx]){
    const color = prod.colores[colorIdx];
    // Nuevo formato: imagenes[] (array)
    if(color.imagenes && color.imagenes.length){
      fotos = color.imagenes;
    }
    // Compatibilidad con formato viejo: imagen (string)
    else if(color.imagen){
      fotos = [color.imagen];
    }
  }

  // Si no hay colores, buscar imagen directa del producto (collares, etc.)
  if(!fotos.length && prod.imagen){
    fotos = [prod.imagen];
  }

  // Imagen principal
  main.src = fotos[0] || '';
  main.onerror = ()=>{ main.src=''; };

  // Miniaturas — solo si hay más de 1 foto
  thumbs.innerHTML='';
  if(fotos.length <= 1){
    thumbs.style.display='none';
    return;
  }
  thumbs.style.display='flex';
  fotos.forEach((src,i)=>{
    const d=document.createElement('div');
    d.className='cart-thumb'+(i===0?' active':'');
    d.innerHTML=`<img src="${src}" alt="foto ${i+1}" onerror="this.parentElement.style.display='none'"/>`;
    d.onclick=()=>{
      main.src=src;
      document.querySelectorAll('.cart-thumb').forEach((t,j)=>t.classList.toggle('active',j===i));
    };
    thumbs.appendChild(d);
  });
}

/* ── Dots de color ── */
function buildColors(){
  const wrap=document.getElementById('fieldColor');
  const dots=document.getElementById('cartColorDots');
  const name=document.getElementById('cartColorName');
  if(!prod.colores.length){wrap.style.display='none';return;}
  wrap.style.display=''; dots.innerHTML='';
  prod.colores.forEach((c,i)=>{
    const btn=document.createElement('button');
    btn.className='cdot'+(i===0?' active':'');
    btn.style.background=c.hex;
    if(c.hex==='#f0f0f0'||c.hex==='#ffffff') btn.style.border='2.5px solid #ccc';
    btn.innerHTML='<span class="ck">✓</span>'; btn.title=c.nombre;
    btn.onclick=()=>{
      colorActual=i;
      dots.querySelectorAll('.cdot').forEach((d,j)=>d.classList.toggle('active',j===i));
      name.textContent=c.nombre;
      buildGallery(i);   // ← Reconstruye la galería con las fotos de este color
    };
    dots.appendChild(btn);
  });
  name.textContent=prod.colores[0].nombre;
}

/* ── Chips talla/corte ── */
function buildChips(id,items,active,onChange){
  const el=document.getElementById(id); if(!el)return; el.innerHTML='';
  items.forEach(val=>{
    const btn=document.createElement('button');
    btn.className='mchip'+(val===active?' active':''); btn.textContent=val;
    btn.onclick=()=>{el.querySelectorAll('.mchip').forEach(b=>b.classList.remove('active'));btn.classList.add('active');onChange(val);};
    el.appendChild(btn);
  });
}

function checkXl(){
  const note=document.getElementById('xlNote');
  if(note)note.style.display=(prod.coleccion==='estelar'&&tallaActual==='XL')?'':'none';
}

function updateTotal(){
  let p=prod.precio;
  if(prod.coleccion==='estelar'&&tallaActual==='XL')p+=STORE_CONFIG.estelarXLExtra;
  if(corteActual&&(tallaActual==='L'||tallaActual==='XL')){
    if(corteActual==='Oversize')p+=STORE_CONFIG.recargos.oversize[tallaActual]||0;
    if(corteActual==='Boxy')    p+=STORE_CONFIG.recargos.boxy[tallaActual]||0;
  }
  if(premActivo)p+=STORE_CONFIG.premiumExtra;
  setText('cartPriceReal',`$${p.toFixed(2)}`);
  setText('subPrenda',`$${p.toFixed(2)}`);
  setText('subTotal',`$${p.toFixed(2)}`);
}

function calcPrecio(){
  let p=prod.precio;
  if(prod.coleccion==='estelar'&&tallaActual==='XL')p+=STORE_CONFIG.estelarXLExtra;
  if(corteActual&&(tallaActual==='L'||tallaActual==='XL')){
    if(corteActual==='Oversize')p+=STORE_CONFIG.recargos.oversize[tallaActual]||0;
    if(corteActual==='Boxy')    p+=STORE_CONFIG.recargos.boxy[tallaActual]||0;
  }
  if(premActivo)p+=STORE_CONFIG.premiumExtra;
  return p;
}

function togglePremium(){
  premActivo=!premActivo;
  const btn=document.getElementById('btnPrem');
  if(btn){btn.textContent=premActivo?'✓ Activo':'+ $2.99';btn.classList.toggle('active',premActivo);}
  updateTotal();
}

function agregarAlArmario(){
  if(!prod.disponible){showToast('Esta prenda no está disponible aún');return;}
  const colorNombre=prod.colores.length?prod.colores[colorActual]?.nombre:'Único';
  // Imagen para el armario: primera foto del color actual
  const colorData = prod.colores.length ? prod.colores[colorActual] : null;
  const imgArmario = colorData?.imagenes?.[0] || colorData?.imagen || '';
  const item={
    prodId:      prod.id,
    nombre:      prod.nombre,
    coleccion:   prod.coleccion?(COLECCIONES.find(c=>c.id===prod.coleccion)?.nombre||prod.coleccion):'',
    color:       colorNombre,
    talla:       tallaActual||'—',
    corte:       corteActual||'—',
    imagen:      imgArmario,
    premium:     premActivo,
    precioFinal: parseFloat(calcPrecio().toFixed(2)),
    linkPago:    prod.linkPago||'#',
  };
  Armario.add(item);
  showToast('✦ Agregado al armario');
  const b=document.getElementById('armarioBadge');
  if(b){const cnt=Armario.count();b.textContent=cnt;b.style.display=cnt>0?'flex':'none';}
}

function showAgotado(){
  const actions=document.querySelector('.cart-actions');
  if(actions)actions.innerHTML='<div class="agotado-banner">Esta prenda estará disponible muy pronto</div>';
  const prem=document.getElementById('premiumBox');
  if(prem)prem.style.display='none';
}

function setText(id,val){const e=document.getElementById(id);if(e)e.textContent=val;}
let _tt;
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>t.classList.remove('show'),2500);}
