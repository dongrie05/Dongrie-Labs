(()=>{
 const film=document.querySelector('#brand-video');const anchor=film.closest('a');
 function cutout(source,canvas){const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.clearRect(0,0,canvas.width,canvas.height);try{ctx.drawImage(source,0,0,canvas.width,canvas.height);const image=ctx.getImageData(0,0,canvas.width,canvas.height),p=image.data;for(let i=0;i<p.length;i+=4){const r=p[i],g=p[i+1],b=p[i+2];const dominance=b-Math.max(r*1.25,g*1.35);const key=Math.min(1,Math.max(0,(dominance-27)/43))*Math.min(1,Math.max(0,(b-60)/25));p[i+3]=Math.round(255*(1-key));}ctx.putImageData(image,0,0);}catch{}}
 document.querySelectorAll('.brand-home img').forEach(img=>{const canvas=document.createElement('canvas');canvas.width=600;canvas.height=201;canvas.setAttribute('aria-hidden','true');img.after(canvas);const paint=()=>{cutout(img,canvas);img.classList.add('brand-keyed');};if(img.complete)paint();else img.addEventListener('load',paint,{once:true});});
 const canvas=anchor.querySelector('canvas');const poster=anchor.querySelector('img');let timer,reverse=false,scheduled=false;
 const paused=()=>document.body.classList.contains('motion-paused');
 const staticLogo=()=>{if(poster.complete)cutout(poster,canvas);};
 function draw(){if(film.readyState>=2&&!paused())cutout(film,canvas);else staticLogo();if(!film.paused&&!film.ended&&!scheduled){scheduled=true;const next=()=>{scheduled=false;draw();};if(film.requestVideoFrameCallback)film.requestVideoFrameCallback(next);else requestAnimationFrame(next);}}
 const start=()=>{if(paused()||document.hidden)return;film.play().then(draw).catch(staticLogo);};
 film.addEventListener('play',draw);film.addEventListener('seeked',()=>{if(paused())staticLogo();else draw();});film.addEventListener('loadeddata',()=>{if(paused())staticLogo();else start();});
 film.addEventListener('ended',()=>{clearTimeout(timer);timer=setTimeout(()=>{if(paused()||document.hidden)return;reverse=!reverse;film.querySelector('source').src=reverse?'assets/logo-disappear.mp4':'assets/logo-reveal.mp4';film.load();},reverse?600:9500);});
 document.addEventListener('visibilitychange',()=>{clearTimeout(timer);if(document.hidden)film.pause();else if(!paused()){if(film.ended){reverse=false;film.querySelector('source').src='assets/logo-reveal.mp4';film.load();}else start();}});
 document.querySelector('#motion-toggle').addEventListener('click',()=>{clearTimeout(timer);if(paused()){film.pause();staticLogo();}else{reverse=false;film.querySelector('source').src='assets/logo-reveal.mp4';film.load();}});
 anchor.addEventListener('mouseenter',()=>{if(film.ended&&!paused()){clearTimeout(timer);reverse=false;film.querySelector('source').src='assets/logo-reveal.mp4';film.load();}});start();
})();
