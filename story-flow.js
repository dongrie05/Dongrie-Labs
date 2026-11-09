'use strict';
(()=>{
 const section=document.querySelector('#ligar');
 const stage=document.querySelector('#story-stage');
 if(!section||!stage)return;
 const camera=document.querySelector('#story-camera');
 const table=stage.querySelector('.story-film-table');
 const paperField=document.querySelector('#story-papers');
 const box=stage.querySelector('#story-box');
 const boxLabels=[...box.querySelectorAll('[data-box-label]')];
 const uprightPose=box.querySelector('.story-film-box-pose--upright');
 const tippedPose=box.querySelector('.story-film-box-pose--tipped');
 const heading=stage.querySelector('.story-film-heading');
 const searchHand=stage.querySelector('.story-film-search-hand');
 const requestHand=stage.querySelector('.story-film-request-hand');
 const folders=[...stage.querySelectorAll('[data-folder]')];
 const bots=[...stage.querySelectorAll('[data-bot]')];
 const frontRobot=stage.querySelector('.story-film-robot-front');
 const actionCard=stage.querySelector('.story-film-action-card');
 const title=stage.querySelector('[data-step-title]');
 const copy=stage.querySelector('[data-step-copy]');
 const counter=stage.querySelector('[data-step-count]');
 const progressCurrent=stage.querySelector('[data-progress-current]');
 const progressBar=stage.querySelector('[data-progress-bar]');
 const hint=stage.querySelector('.story-film-hint');
 const clientButtons=[...stage.querySelectorAll('[data-client-pick]')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const clients={
  maria:{name:'Maria Lopes',action:'Confirmar disponibilidade da peça',detail:'Maria Lopes · Reparação'},
  oficina:{name:'Oficina Norte',action:'Validar o orçamento com a oficina',detail:'Oficina Norte · Proposta'},
  sofia:{name:'Sofia Almeida',action:'Responder à pendência do cliente',detail:'Sofia Almeida · Acompanhamento'}
 };
 const story=[
  ['A mesa vazia.','Há espaço para ver tudo com clareza.'],
  ['Chegam os emails.','Uma caixa cheia de folhas soltas entra sobre a mesa.'],
  ['A primeira descarga.','As mãos inclinam a caixa. Os documentos caem no centro.'],
  ['Chegam as mensagens.','Outra caixa traz mais informação para a mesma pilha.'],
  ['A pilha cresce.','As mensagens misturam-se com os emails anteriores.'],
  ['Chegam os sistemas.','Fichas, formulários e relatórios acrescentam mais contexto disperso.'],
  ['Tudo se mistura.','A informação fica sobreposta. Já não se vê a resposta.'],
  ['Alguém tenta encontrá-la.','Uma mão procura, levanta folhas e volta ao início.'],
  ['Entram os robôs.','A câmara sobe. De cima, vemos a pilha e as pastas vazias.'],
  ['Organizam por cliente.','Cada documento sai da pilha e entra na pasta certa.'],
  ['A pessoa escolhe.','Indica um cliente. O robô entrega a pasta correspondente.'],
  ['O próximo passo.','Com o contexto reunido, o robô entrega uma ação concreta.']
 ];
 const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
 const smooth=(a,b,n)=>{const x=clamp((n-a)/(b-a));return x*x*(3-2*x)};
 const lerp=(a,b,n)=>a+(b-a)*n;
 const hash=n=>{const v=Math.sin(n*91.73+14.27)*43758.5453;return v-Math.floor(v)};
 const folderX=[22,50,78];
 let selected='maria',lastStep=-1,frame=0;
 const papers=Array.from({length:21},(_,i)=>{
  const element=document.createElement('div');
  element.className='story-film-paper'+(i%5===2?' is-envelope':'');
  element.setAttribute('aria-hidden','true');
  const item={element,group:Math.floor(i/7),within:i%7,client:i%3,x:43+hash(i+2)*14,y:39+hash(i+53)*14,angle:-29+hash(i+88)*58};
  element.style.left=item.x+'%';element.style.top=item.y+'%';
  element.style.zIndex=String(4+i);
  paperField.append(element);
  return item;
 });
 function chooseClient(key){
  if(!clients[key])return;
  selected=key;stage.dataset.client=key;
  clientButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.clientPick===key)));
  actionCard.querySelector('[data-action-title]').textContent=clients[key].action;
  actionCard.querySelector('[data-action-detail]').textContent=clients[key].detail;
  schedule();
 }
 clientButtons.forEach(button=>{
  button.addEventListener('click',()=>chooseClient(button.dataset.clientPick));
  button.addEventListener('pointerenter',()=>chooseClient(button.dataset.clientPick));
  button.addEventListener('focus',()=>chooseClient(button.dataset.clientPick));
 });
 function renderBox(t){
  const starts=[.74,2.74,4.74];
  let source=-1,local=0;
  starts.forEach((start,index)=>{if(t>=start&&t<start+2){source=index;local=t-start;}});
  if(source<0){box.style.opacity='0';return;}
  const enter=smooth(0,.38,local),tip=smooth(.86,1.48,local),exit=smooth(1.65,1.99,local);
  boxLabels.forEach(label=>{label.textContent=['EMAILS','MENSAGENS','OUTRAS COISAS'][source]});
  box.style.opacity=String(enter*(1-exit));
  const mix=smooth(.13,.83,tip);
  uprightPose.style.opacity=String(1-mix);
  tippedPose.style.opacity=String(mix);
  const y=-340*(1-enter)-22*tip-340*exit;
  box.style.transform=`translate(-50%, ${y}px)`;
 }
 function renderPapers(t,w,h){
  const selectedIndex=['maria','oficina','sofia'].indexOf(selected);
  for(let i=0;i<papers.length;i++){
   const p=papers[i];
   const arrival=1.74+p.group*2+p.within*.055;
   const fall=smooth(arrival,arrival+.62,t);
   const sort=smooth(9.02+i*.023,9.48+i*.023,t);
   const deliver=p.client===selectedIndex?smooth(10.24,10.84,t):0;
   const fx=folderX[p.client]+(p.within%3-1)*.8;
   const fy=72+(p.within%2?1:-1)*.7;
   let x=lerp(p.x,fx,sort),y=lerp(p.y,fy,sort);
   x+=deliver*(55-fx)*sort;y+=deliver*(53-fy)*sort;
   const enterX=(52-p.x)*(1-fall)*w/100;
   const enterY=-135*(1-fall);
   const z=150*(1-fall)+38*Math.sin(sort*Math.PI);
   const angle=lerp(p.angle,(p.within%3-1)*4,sort)+(1-fall)*19;
   p.element.style.opacity=String(clamp(fall*2.4));
   p.element.style.zIndex=sort>.96?'1':String(4+i);
   p.element.style.transform=`translate(-50%,-50%) translate3d(${(x-p.x)*w/100+enterX}px,${(y-p.y)*h/100+enterY}px,${z}px) rotate(${angle}deg) scale(${1-.18*sort})`;
  }
 }
 function renderFolders(t,w,h){
  const reveal=smooth(8.02,8.48,t);
  const delivery=smooth(10.24,10.84,t);
  folders.forEach((folder,i)=>{
   const chosen=folder.dataset.folder===selected;
   folder.style.opacity=String(reveal);
   folder.style.zIndex=chosen?'7':'2';
   const dx=chosen?(55-folderX[i])*w/100*delivery:0;
   const dy=chosen?(53-72)*h/100*delivery:0;
   folder.style.transform=`translate(-50%,-50%) translate3d(${dx}px,${dy+50*(1-reveal)}px,${chosen?delivery*12:0}px) scale(${1+(chosen?.08:0)*delivery})`;
  });
 }
 function renderBots(t){
  const enter=smooth(8.08,8.56,t),exit=smooth(9.9,10.52,t),sort=smooth(9.08,9.86,t);
  bots.forEach((bot,i)=>{
   const fromX=[-10,50,110][i],fromY=[45,-10,45][i];
   const nearX=[41,50,59][i],nearY=[47,43,47][i];
   const x=lerp(lerp(fromX,nearX,enter),folderX[i],sort);
   const y=lerp(lerp(fromY,nearY,enter),61,sort);
   bot.style.left=x+'%';bot.style.top=y+'%';
   bot.style.opacity=String(enter*(1-exit));
   bot.style.transform=`translate(-50%,-50%) rotate(${(i-1)*10*sort}deg) scale(${lerp(.8,1,enter)})`;
  });
  const front=smooth(10.12,10.62,t);
  frontRobot.style.opacity=String(front);
  frontRobot.style.transform=`translateY(${45*(1-front)}px) scale(${.9+.1*front})`;
 }
 function renderHandsAndCard(t,w){
  const searchIn=smooth(7.04,7.35,t),searchOut=smooth(7.88,8.23,t);
  searchHand.style.opacity=String(searchIn*(1-searchOut));
  searchHand.style.transform=`translate(${lerp(.12,-.38,searchIn)*w+Math.sin(t*12)*10}px,${Math.sin(t*9)*7}px) rotate(${Math.sin(t*11)*3}deg)`;
  const request=smooth(10.15,10.64,t);
  requestHand.style.opacity=String(request*(1-smooth(11.3,11.8,t)));
  requestHand.style.transform=`translate(${lerp(-.15,.39,request)*w}px,0) rotate(${-2*request}deg)`;
  const card=smooth(11.03,11.65,t);
  actionCard.style.opacity=String(card);
  actionCard.style.transform=`translate(-50%,-50%) translate3d(${120*(1-card)}px,${-35*(1-card)}px,${75*(1-card)+65*card}px) rotate(${4*(1-card)}deg)`;
 }
 function render(t){
  const sceneStep=Math.min(11,Math.floor(t));
  if(sceneStep!==lastStep){
   lastStep=sceneStep;stage.dataset.step=String(sceneStep);
   counter.textContent=String(sceneStep+1).padStart(2,'0')+' / 12';
   progressCurrent.textContent=String(sceneStep+1).padStart(2,'0');
   title.textContent=story[sceneStep][0];copy.textContent=story[sceneStep][1];
  }
  const overhead=smooth(7.72,8.4,t)-smooth(9.84,10.56,t);
  const tilt=48*(1-overhead);
  const zoom=1+.08*(smooth(7.02,7.6,t)-smooth(8.03,8.5,t));
  const cameraTop=innerWidth<=450?49:innerWidth<=800?48:54;
  camera.style.top=`${cameraTop-5*overhead}%`;
  camera.style.transform=`translate(-50%,-50%) rotateX(${tilt}deg) scale(${zoom})`;
  const intro=1-smooth(.6,1.5,t);
  heading.style.opacity=String(intro);
  heading.style.transform=`translateY(${-25*(1-intro)}px)`;
  stage.classList.toggle('is-choice',t>=10.12);
  progressBar.style.transform=`scaleX(${clamp(t/11.99)})`;
  hint.style.opacity=String(1-smooth(1.1,2,t));
  renderBox(t);
  const w=table.clientWidth,h=table.clientHeight;
  renderPapers(t,w,h);renderFolders(t,w,h);renderBots(t);renderHandsAndCard(t,w);
 }
 function update(){
  frame=0;
  const rect=section.getBoundingClientRect();
  const distance=Math.max(1,rect.height-innerHeight);
  let t=clamp(-rect.top/distance)*11.99;
  if(reduced.matches)t=Math.round(t);
  render(t);
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update)}
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule);
 reduced.addEventListener('change',schedule);
 new ResizeObserver(schedule).observe(table);
 schedule();
})();
