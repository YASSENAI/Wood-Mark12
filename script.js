// سنة الحقوق
document.getElementById('year').textContent = new Date().getFullYear();

// Lightbox
const gridItems = Array.from(document.querySelectorAll('.gallery .card img'));
const lb = document.createElement('div');
lb.id = 'lightbox';
lb.className = 'lightbox';
lb.innerHTML = `
  <button class="close" id="lbClose">✕</button>
  <div class="nav">
    <button id="prev">‹</button>
    <button id="next">›</button>
  </div>
  <img id="lbImg" src="" alt="Lightbox">
`;
document.body.appendChild(lb);

const lbImg = document.getElementById('lbImg');
const btnClose = document.getElementById('lbClose');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
let index = 0;

function openAt(i){ index=i; lbImg.src=gridItems[i].src; lb.classList.add('open'); document.body.style.overflow='hidden'; }
function closeLb(){ lb.classList.remove('open'); document.body.style.overflow=''; }
function prev(){ openAt((index-1+gridItems.length)%gridItems.length); }
function next(){ openAt((index+1)%gridItems.length); }

gridItems.forEach((img,i)=> img.addEventListener('click',()=>openAt(i)));
btnClose.addEventListener('click',closeLb);
btnPrev.addEventListener('click',prev);
btnNext.addEventListener('click',next);
lb.addEventListener('click', e=>{ if(e.target===lb) closeLb(); });
window.addEventListener('keydown', e=>{
  if(!lb.classList.contains('open')) return;
  if(e.key==='Escape') closeLb();
  if(e.key==='ArrowLeft') prev();
  if(e.key==='ArrowRight') next();
});

// Swiper متعدد
document.querySelectorAll('.kitchen-slider').forEach(slider=>{
  new Swiper(slider,{
    loop:true,
    pagination:{ el: slider.querySelector('.swiper-pagination'), clickable:true },
    navigation:{ nextEl: slider.querySelector('.swiper-button-next'), prevEl: slider.querySelector('.swiper-button-prev') },
  });
});
// script.js

// Lightbox

function openAt(i){
  index = i;
  lbImg.src = gridItems[i].src;
  lb.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeLb(){
  lb.classList.remove('open');
  document.body.style.overflow='';
}

function prev(){
  openAt((index - 1 + gridItems.length) % gridItems.length);
}

function next(){
  openAt((index + 1) % gridItems.length);
}

gridItems.forEach((img, i)=> img.addEventListener('click', ()=> openAt(i)));
btnClose.addEventListener('click', closeLb);
btnPrev.addEventListener('click', prev);
btnNext.addEventListener('click', next);
lb.addEventListener('click', e=>{ if(e.target===lb) closeLb(); });
window.addEventListener('keydown', e=>{
  if(!lb.classList.contains('open')) return;
  if(e.key==='Escape') closeLb();
  if(e.key==='ArrowLeft') prev();
  if(e.key==='ArrowRight') next();
});

