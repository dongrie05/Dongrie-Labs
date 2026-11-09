import * as THREE from './vendor/three.module.js';
import {createRobot} from './robot-model.mjs';
import {EffectComposer} from './vendor/addons/postprocessing/EffectComposer.js';
import {RenderPass} from './vendor/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from './vendor/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from './vendor/addons/postprocessing/OutputPass.js';
import {CaptureAlphaPass,restoreAlphaPass} from './transparent-bloom.mjs';
const host=document.querySelector('#robot-stage');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
try{
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,premultipliedAlpha:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;host.prepend(renderer.domElement);
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(32,1,.1,50);camera.position.set(0,2.15,8.6);camera.lookAt(0,2.1,0);
 const studio=new THREE.Scene();studio.background=new THREE.Color(0x344460);
 const panel=(c,x,y,z,s)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(s,s),new THREE.MeshBasicMaterial({color:c}));m.position.set(x,y,z);m.lookAt(0,1,0);studio.add(m);};
 panel(0xffffff,-3,5,4,5);panel(0x62cfff,-5,1,0,5);panel(0xd1a4ff,4,2,1,4);panel(0xffd8df,1,-3,3,3);panel(0xffffff,0,6,-2,4);
 const pmrem=new THREE.PMREMGenerator(renderer);const environment=pmrem.fromScene(studio,.02);scene.environment=environment.texture;pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xdcefff,0x4d5985,1.0));
 function lamp(c,i,x,y,z){const l=new THREE.DirectionalLight(c,i);l.position.set(x,y,z);scene.add(l);}lamp(0xe7f8ff,2.5,-3,5,4);lamp(0x8bd7ff,2,-4,1,1);lamp(0xf3c2e6,2.2,4,2,0);lamp(0xd1caff,3,1,4,-3);
 const robot=createRobot();scene.add(robot);robot.rotation.y=-.12;
 const {head,eyes,arms}=robot.userData;
 const target=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,samples:4});const composer=new EffectComposer(renderer,target);composer.addPass(new RenderPass(scene,camera));const alpha=new CaptureAlphaPass();composer.addPass(alpha);const bloom=new UnrealBloomPass(new THREE.Vector2(800,800),.18,.15,1.3);composer.addPass(bloom);composer.addPass(new OutputPass());composer.addPass(restoreAlphaPass(alpha));
 let targetX=-.12,targetY=0,dragging=false,lastX=0,dragRotation=0,visible=true,last=0,frame=0;
 const paused=()=>document.body.classList.contains('motion-paused')||reduced.matches;
 const resize=()=>{const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height);composer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();render(performance.now());};
 function render(ms){const t=ms/1000;const still=paused();robot.position.y=still?0:Math.sin(t*1.4)*.045;robot.rotation.y+=((dragRotation+targetX)-robot.rotation.y)*.075;head.rotation.x+=((still?0:targetY)-head.rotation.x)*.06;head.rotation.y+=((still?0:targetX*.3)-head.rotation.y)*.06;arms.forEach((a,i)=>{a.rotation.z=(i?1:-1)*(still?0:Math.sin(t*1.4)*.018);});const blink=t%5.4;eyes.scale.y=still?1:(blink<.13?.12+(Math.abs(blink-.065)/.065)*.88:1);composer.render();}
 function stop(){if(frame){cancelAnimationFrame(frame);frame=0;}}
 function loop(ms){if(document.hidden||!visible||paused()){stop();return;}if(ms-last>=33){last=ms;render(ms);}frame=requestAnimationFrame(loop);}
 function updateMotion(){if(document.hidden||!visible||paused()){stop();if(!document.hidden&&visible)render(performance.now());return;}if(!frame)frame=requestAnimationFrame(loop);}
 host.addEventListener('pointermove',e=>{if(paused())return;const r=host.getBoundingClientRect();if(dragging){dragRotation+=(e.clientX-lastX)*.009;lastX=e.clientX;}else{targetX=((e.clientX-r.left)/r.width-.5)*.55;targetY=((e.clientY-r.top)/r.height-.5)*.22;}});
 host.addEventListener('pointerdown',e=>{if(paused())return;dragging=true;lastX=e.clientX;host.setPointerCapture(e.pointerId);host.classList.add('is-dragging');});
 host.addEventListener('pointerup',()=>{dragging=false;host.classList.remove('is-dragging');});host.addEventListener('pointercancel',()=>{dragging=false;});
 host.addEventListener('pointerleave',()=>{targetX=-.12;targetY=0;});
 host.addEventListener('keydown',e=>{if(paused())return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();dragRotation+=(e.key==='ArrowLeft'?-.2:.2);}if(e.key==='Home'){e.preventDefault();dragRotation=0;targetX=-.12;}});
 new ResizeObserver(resize).observe(host);new IntersectionObserver(([e])=>{visible=e.isIntersecting;updateMotion();}).observe(host);new MutationObserver(updateMotion).observe(document.body,{attributes:true,attributeFilter:['class']});document.addEventListener('visibilitychange',updateMotion);reduced.addEventListener('change',updateMotion);host.classList.add('is-ready');resize();updateMotion();
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);host.classList.remove('is-ready');});
}catch(error){console.warn('A apresentar a referência do robô:',error);}
