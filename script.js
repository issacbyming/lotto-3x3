const PRIZES = [
  { name: '加入我的多鄰國家族', emoji: '🤗' },
  { name: '付費版記帳軟體', emoji: '💰' },
  { name: '分享一個好秘密', emoji: '🍱' },
  { name: '一起去打匹克球', emoji: '🏃' },
  { name: '一起去體驗做陶', emoji: '☕️' },
  { name: '一個來自瑞士或倫敦的禮物', emoji: '🎁' },
  { name: '一起分享一個平凡的下午，剪一支短影片', emoji: '📸' },
  { name: '一次蓋洛普優勢測驗', emoji: '🌟' },
  { name: '一份專屬於孟函的戀愛歌單', emoji: '🎶' },
];

const grid = document.getElementById('grid');
const dlg = document.getElementById('prizeDialog');
const dlgEmoji = document.getElementById('dlgEmoji');
const dlgName  = document.getElementById('dlgName');
document.getElementById('dlgOK').addEventListener('click', ()=> dlg.close());

function makeGrid(){
  const idx = [...Array(9).keys()];
  for(let i=idx.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [idx[i],idx[j]]=[idx[j],idx[i]]; }
  grid.innerHTML = '';
  idx.forEach(i => grid.appendChild(makeCard(PRIZES[i])));
}
function makeCard(prize){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <div class="face back"><div class="label">點我抽！</div></div>
    <div class="face front"><div class="prize"><div class="emoji">${escapeHtml(prize.emoji)}</div><div class="name">${escapeHtml(prize.name)}</div></div></div>
    <div class="shards"></div>`;
  prepareShards(el);
  el.addEventListener('click', ()=>{
    if(el.classList.contains('opened')) return;
    shatter(el);
    reveal(el, prize);
  });
  return el;
}
function prepareShards(card){
  const shards = card.querySelector('.shards'); shards.innerHTML = '';
  const pos = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]];
  pos.forEach(([x,y])=>{
    const s = document.createElement('div');
    s.className = 'shard'; s.style.left = `${x*33.34}%`; s.style.top = `${y*33.34}%`;
    const tx=(Math.random()*160-80)+'px', ty=(Math.random()*-160-40)+'px', rot=(Math.random()*540-270)+'deg';
    s.style.setProperty('--tx',tx); s.style.setProperty('--ty',ty); s.style.setProperty('--rot',rot);
    shards.appendChild(s);
  });
}
function shatter(card){ card.classList.add('break'); setTimeout(()=> card.querySelector('.shards').innerHTML='', 950); }
function reveal(card, prize){
  card.querySelector('.face.back').style.display = 'none';
  card.querySelector('.face.front').style.display = 'grid';
  card.classList.add('opened');
  dlgEmoji.textContent = prize.emoji; dlgName.textContent = prize.name; dlg.showModal();
}
function escapeHtml(s){ return String(s).replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
makeGrid();
