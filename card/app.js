'use strict';
const CARD_URL='https://devkeerthan-06.github.io/DEV-KEERTHAN.github.io/card/';
const shareText='Connect with Dev Keerthan — Electronics & Communication Engineer. Contact, portfolio and professional profiles: '+CARD_URL;
const $=s=>document.querySelector(s);let timer;
function notify(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>$('#toast').classList.remove('visible'),4000)}
function openShare(){$('#share-dialog').showModal()}
$('#share').addEventListener('click',openShare);$('#share-top').addEventListener('click',openShare);
$('#whatsapp-share').href='https://wa.me/?text='+encodeURIComponent(shareText);
$('#email-share').href='mailto:?subject='+encodeURIComponent('Dev Keerthan | Digital visiting card')+'&body='+encodeURIComponent(shareText);
$('#card-url').value=CARD_URL;
$('#native-share').hidden=!navigator.share;
$('#native-share').addEventListener('click',async()=>{try{await navigator.share({title:'Dev Keerthan | Digital card',text:'Electronics & Communication Engineer',url:CARD_URL})}catch(e){if(e.name!=='AbortError')notify('Choose WhatsApp, email or copy the link instead.')}});
$('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(CARD_URL);notify('Card link copied')}catch{$('#card-url').focus();$('#card-url').select();notify('Select and copy the link shown below.')}});
$('#show-qr').addEventListener('click',()=>$('#qr-dialog').showModal());
for(const dialog of document.querySelectorAll('dialog')){dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}})}
function flip(reverse){$('.front').hidden=reverse;$('.back').hidden=!reverse;(reverse?$('#flip-back'):$('#flip')).focus()}
$('#flip').addEventListener('click',()=>flip(true));$('#flip-back').addEventListener('click',()=>flip(false));
function loadImage(url){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=url})}
const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
function motionState(paused){document.body.classList.toggle('motion-paused',paused);$('#motion').setAttribute('aria-pressed',String(paused));$('#motion').textContent=paused?'Enable animations':'Pause animations'}
motionState(motionQuery.matches);$('#motion').addEventListener('click',()=>motionState(!document.body.classList.contains('motion-paused')));motionQuery.addEventListener('change',e=>motionState(e.matches));
$('#download-card').addEventListener('click',async()=>{
 const button=$('#download-card');button.disabled=true;button.textContent='Preparing your card…';
 try{
  const [photo,qr,signature]=await Promise.all([loadImage('assets/portrait.png'),loadImage('assets/qr.svg'),loadImage('assets/signature.jpg')]);
  const canvas=document.createElement('canvas');canvas.width=1600;canvas.height=1120;const ctx=canvas.getContext('2d');
  const gradient=ctx.createLinearGradient(0,0,1600,1120);gradient.addColorStop(0,'#59432f');gradient.addColorStop(1,'#211b16');ctx.fillStyle=gradient;ctx.fillRect(0,0,1600,1120);
  ctx.strokeStyle='#d9bd7d';ctx.lineWidth=1;ctx.strokeRect(28,28,1544,1064);
  ctx.save();ctx.beginPath();ctx.roundRect(980,64,548,610,24);ctx.clip();const scale=Math.max(548/photo.width,610/photo.height);ctx.drawImage(photo,980+(548-photo.width*scale)/2,64+(610-photo.height*scale)/2,photo.width*scale,photo.height*scale);ctx.restore();
  function text(value,x,y,size,color='#f5f2e9',font='Arial'){ctx.fillStyle=color;ctx.font=size+'px '+font;ctx.fillText(value,x,y)}
  text('ELECTRONICS & COMMUNICATION ENGINEER',70,108,22,'#d9bd7d');text('DEV',65,226,78);text('KEERTHAN',65,332,96,'#efdbad','Georgia');
  text('R&D Engineer (ECE)  ·  Freelancer',70,400,30);text('YuviPep Educational Pvt. Ltd.',70,451,25,'#c4b7a6');text('Part of Telaverge Communications',70,489,21,'#c4b7a6');
  ctx.fillStyle='#d9bd7d';ctx.fillRect(70,529,825,1);
  text('DIGAMBAR JAIN  ·  WE BELIEVE IN TRUST',70,584,25,'#e5c890');text('“Live and let live.”',70,631,32,'#efdbad','Georgia');
  text('+91 91640 59917',70,693,27);text('devkeerthanofficial@gmail.com',70,738,26);text('31 July 2000  /  Koppal, Karnataka, India',70,792,23,'#c4b7a6');text('Interests: trading & investing',70,832,22,'#c4b7a6');text('Instagram & Snapchat: dev.keerthan',70,872,22,'#c4b7a6');
  ctx.fillStyle='#ede2cc';ctx.fillRect(980,710,320,150);ctx.save();ctx.globalCompositeOperation='multiply';ctx.drawImage(signature,180,250,860,355,986,716,304,126);ctx.restore();text('With gratitude, Dev Keerthan',980,895,20,'#d9bd7d');
  ctx.fillStyle='#fff';ctx.fillRect(1335,715,190,190);ctx.drawImage(qr,1347,727,166,166);text('SCAN TO CONNECT',1340,938,15,'#c4b7a6');
  text('Namaste. Thank you for connecting.',70,986,32,'#efdbad','Georgia');text('Contact, social profiles & portfolio — one scan away.',70,1038,20,'#c4b7a6');
  canvas.toBlob(blob=>{if(!blob){notify('Could not create the image. Please try again.');return}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Dev_Keerthan_Visiting_Card.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);notify('Visiting card downloaded')},'image/png');
 }catch{notify('Unable to create the card image. Please try again.')}finally{button.disabled=false;button.innerHTML='<svg class="ui-icon" aria-hidden="true"><use href="#i-download"/></svg> Download visiting card'}
});

const cover=$('#wallet-cover'),profile=$('#profile-content'),openWallet=$('#open-wallet');
let openingWallet=false;document.body.classList.add('wallet-is-closed');
openWallet.addEventListener('click',()=>{if(openingWallet)return;openingWallet=true;openWallet.setAttribute('aria-expanded','true');cover.classList.add('wallet-opening');const reduced=motionQuery.matches||document.body.classList.contains('motion-paused');setTimeout(()=>{cover.hidden=true;profile.hidden=false;profile.classList.add('profile-unfolding');document.body.classList.remove('wallet-is-closed');window.scrollTo({top:0,behavior:'instant'});profile.focus({preventScroll:true});openingWallet=false},reduced?0:480)});
$('#fold-wallet').addEventListener('click',()=>{profile.hidden=true;profile.classList.remove('profile-unfolding');cover.hidden=false;cover.classList.remove('wallet-opening');openWallet.setAttribute('aria-expanded','false');document.body.classList.add('wallet-is-closed');window.scrollTo({top:0,behavior:'instant'});openWallet.focus({preventScroll:true})});
