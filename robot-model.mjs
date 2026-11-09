import * as THREE from './vendor/three.module.js';

// Sculpted closed surfaces, measured against the supplied front reference.
// Local centimetre-like proportions: the complete figure is 4.34 units tall.
const TAU=Math.PI*2;
const spow=(v,p)=>Math.sign(v)*Math.pow(Math.abs(v),p);
function meshOf(name,positions,indices,material,parent){
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();
 const uv=[];for(let i=0;i<positions.length;i+=3)uv.push(positions[i],positions[i+1]);if(material.normalMap){g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.computeTangents();const t=g.attributes.tangent,n=g.attributes.normal;for(let i=0;i<t.count;i++){const normal=new THREE.Vector3().fromBufferAttribute(n,i),tangent=new THREE.Vector3(t.getX(i),t.getY(i),t.getZ(i));if(tangent.lengthSq()<1e-8)tangent.crossVectors(Math.abs(normal.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(0,0,1),normal);tangent.normalize();t.setXYZW(i,tangent.x,tangent.y,tangent.z,t.getW(i)||1);}}
 if(material.userData.opal){const colors=[],c=new THREE.Color(),a=new THREE.Color('#cde7ff'),b=new THREE.Color('#3eacef'),pink=new THREE.Color('#f3bce6');for(let i=0;i<positions.length;i+=3){const x=positions[i],y=positions[i+1],z=positions[i+2];const surfaceY=y+(name.startsWith('Luva')?1.4:name.startsWith('Pé')?1.1:name==='Braço arredondado'?1.65:0);const blue=.12+.57*Math.exp(-Math.pow((surfaceY-1.4)/.43,2))*(.72+.28*Math.cos(x*2.5+z));const rose=Math.max(0,Math.sin(x*4.2-y*2.5+z*3.5))*.33;c.copy(a).lerp(b,blue).lerp(pink,rose);colors.push(c.r,c.g,c.b);}g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));}
 const m=new THREE.Mesh(g,material);m.name=name;parent.add(m);return m;
}
// Smooth ring loft: control points [radiusX, height, radiusZ, centreX].
function loft(name,profile,mat,parent,{rings=64,sides=96,frontPower=.75}={}){
 const curve=new THREE.CatmullRomCurve3(profile.map(p=>new THREE.Vector3(p[0],p[1],p[2])),false,'centripetal');
 const offsets=profile.map(p=>p[3]||0),pos=[],idx=[];
 for(let j=0;j<=rings;j++){const t=j/rings,p=curve.getPoint(t),fi=t*(offsets.length-1),k=Math.min(offsets.length-2,Math.floor(fi)),cx=THREE.MathUtils.lerp(offsets[k],offsets[k+1],fi-k);for(let i=0;i<sides;i++){const a=i/sides*TAU;pos.push(cx+Math.max(.00001,p.x)*Math.sin(a),p.y,Math.max(.00001,p.z)*spow(Math.cos(a),frontPower));}}
 for(let j=0;j<rings;j++)for(let i=0;i<sides;i++){const a=j*sides+i,b=j*sides+(i+1)%sides,c=a+sides,d=b+sides;idx.push(a,b,c,b,d,c);}
 const bottom=pos.length/3;pos.push(offsets[0],profile[0][1],0);const top=pos.length/3;pos.push(offsets.at(-1),profile.at(-1)[1],0);for(let i=0;i<sides;i++){idx.push(bottom,(i+1)%sides,i);const a=rings*sides+i,b=rings*sides+(i+1)%sides;idx.push(top,a,b);}
 return meshOf(name,pos,idx,mat,parent);
}
function oval(name,size,pos,mat,parent){const o=new THREE.Mesh(new THREE.SphereGeometry(1,48,32),mat);if(!mat.normalMap)o.geometry.deleteAttribute('uv');o.name=name;o.scale.set(...size);o.position.set(...pos);parent.add(o);return o;}
// Smooth, convex lens with a closed rear surface, rather than an extruded rectangle.
function lens(name,w,h,centre,mat,parent,{bend=.18,thickness=.07,ex=.52,ey=.63,yBend=.045}={}){
 const p=[],ix=[],n=96,rings=24;
 for(let side=0;side<2;side++){
  p.push(0,0,side?-thickness:0);
  for(let j=1;j<=rings;j++){const r=j/rings;for(let i=0;i<n;i++){const a=i/n*TAU,x=w/2*spow(Math.cos(a),ex)*r,y=h/2*spow(Math.sin(a),ey)*r,z=-bend*(x/(w/2))**2-yBend*(y/(h/2))**2-(side?thickness:0);p.push(x,y,z);}}
  const o=side*(1+rings*n);for(let i=0;i<n;i++){const a=o,b=o+1+i,c=o+1+(i+1)%n;side?ix.push(a,c,b):ix.push(a,b,c);}
  for(let j=0;j<rings-1;j++)for(let i=0;i<n;i++){const a=o+1+j*n+i,b=o+1+j*n+(i+1)%n,c=a+n,d=b+n;side?ix.push(a,d,c,a,b,d):ix.push(a,c,d,a,d,b);}
 }
 const back=1+rings*n,start=1+(rings-1)*n;for(let i=0;i<n;i++){const a=start+i,b=start+(i+1)%n;ix.push(a,b,a+back,b,b+back,a+back);}
 const m=meshOf(name,p,ix,mat,parent);m.position.set(...centre);return m;
}
// An inflated, concave mitten: the thumb and lower finger are one continuous shell.
function mitten(name,side,mat,parent){
 const s=new THREE.Shape();s.moveTo(-.035,.405);s.bezierCurveTo(-.24,.43,-.39,.26,-.395,.025);s.bezierCurveTo(-.42,-.22,-.27,-.40,-.08,-.415);s.bezierCurveTo(.085,-.43,.17,-.37,.12,-.245);s.bezierCurveTo(.09,-.17,.012,-.155,.025,-.065);s.bezierCurveTo(.03,-.025,.058,-.025,.087,-.075);s.bezierCurveTo(.135,-.17,.245,-.12,.25,-.035);s.bezierCurveTo(.27,.10,.17,.30,.07,.37);s.bezierCurveTo(.04,.39,0,.405,-.035,.405);
 const edge=s.getSpacedPoints(128).slice(0,-1),n=edge.length,rings=30,p=[],ix=[],cx=-.105,cy=.015;
 for(let j=0;j<=rings;j++){const a=j/rings*Math.PI,r=Math.sin(a),z=Math.cos(a)*.285;for(const q of edge)p.push((cx+(q.x-cx)*r)*side,cy+(q.y-cy)*r,z);}
 for(let j=0;j<rings;j++)for(let i=0;i<n;i++){const a=j*n+i,b=j*n+(i+1)%n,c=a+n,d=b+n;if(side===1)ix.push(a,c,b,b,c,d);else ix.push(a,b,c,b,d,c);}
 const m=meshOf(name,p,ix,mat,parent);return m;
}
export function createRobot(){
 const robot=new THREE.Group();robot.name='Dongrie';
 const pearl=new THREE.MeshPhysicalMaterial({name:'Opala acetinada',color:0xffffff,vertexColors:true,metalness:.12,roughness:.32,clearcoat:.8,clearcoatRoughness:.2,iridescence:.65,iridescenceIOR:1.34,iridescenceThicknessRange:[200,480],transmission:.07,thickness:.45,ior:1.38,sheen:.4,sheenColor:0xc3dfff,sheenRoughness:.55});pearl.userData.opal=true;
 const data=new Uint8Array(256*256*4);let seed=173;
 for(let i=0;i<data.length;i+=4){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const x=((seed&65535)/65535-.5)*.5;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const y=((seed&65535)/65535-.5)*.5;const v=new THREE.Vector3(x,y,1).normalize();data[i]=Math.round((v.x*.5+.5)*255);data[i+1]=Math.round((v.y*.5+.5)*255);data[i+2]=Math.round((v.z*.5+.5)*255);data[i+3]=255;}
 const grain=new THREE.DataTexture(data,256,256,THREE.RGBAFormat);grain.name='Microtexture opale';grain.wrapS=grain.wrapT=THREE.RepeatWrapping;grain.repeat.set(.8,.8);grain.generateMipmaps=true;grain.minFilter=THREE.LinearMipmapLinearFilter;grain.magFilter=THREE.LinearFilter;grain.needsUpdate=true;pearl.normalMap=grain;pearl.normalScale.set(.3,.3);
 const limb=pearl.clone();limb.vertexColors=false;limb.color.set('#b6dcf5');limb.userData.opal=false;
 const joint=new THREE.MeshPhysicalMaterial({name:'Juntas azuladas',color:0x507eaa,metalness:.35,roughness:.3,clearcoat:.5});
 const glass=new THREE.MeshPhysicalMaterial({name:'Vidro azul profundo',color:0x030c22,metalness:.1,roughness:.25,clearcoat:.8,clearcoatRoughness:.2});
 const eyesMat=new THREE.MeshPhysicalMaterial({name:'Luz dos olhos',color:0x8de6ff,emissive:0x26b9ff,emissiveIntensity:2.5,roughness:.22,clearcoat:1});
 // Head: broad forehead, curved crown and low visor, measured from the reference.
 const head=new THREE.Group();head.name='Cabeça';head.position.y=2.23;robot.add(head);
 loft('Carapaça esculpida',[[.0001,0,.0001],[.73,.018,.47],[1.10,.055,.65],[1.29,.16,.71],[1.38,.38,.75],[1.405,.68,.76],[1.39,1.02,.745],[1.30,1.37,.69],[1.12,1.66,.57],[.84,1.88,.43],[.46,2.035,.24],[.0001,2.08,.0001]],pearl,head,{frontPower:.52});
 lens('Contorno integrado do visor',2.17,1.11,[0,.595,.798],limb,head,{bend:.16,thickness:.10,ex:.5,ey:.62});
 lens('Visor convexo',2.11,1.055,[0,.595,.82],glass,head,{bend:.16,thickness:.05,ex:.5,ey:.62});
 const eyes=new THREE.Group();eyes.name='Olhos';eyes.position.set(0,.53,.81);head.add(eyes);
 for(const side of [-1,1]){const e=lens(side<0?'Olho esquerdo':'Olho direito',.205,.415,[side*.48,0,0],eyesMat,eyes,{bend:.008,thickness:.045,ex:1,ey:.68,yBend:.006});e.rotation.y=side*.13;}
 oval('Pescoço',[.29,.12,.27],[0,2.20,0],joint,robot);
 loft('Tronco orgânico',[[.0001,.96,.0001],[.34,.99,.27],[.57,1.08,.42],[.665,1.26,.49],[.68,1.53,.51],[.655,1.81,.48],[.56,2.035,.39],[.32,2.17,.24],[.0001,2.20,.0001]],pearl,robot,{frontPower:.8});
 const arms=[];
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.name=side<0?'Braço esquerdo':'Braço direito';arm.position.set(side*.69,1.99,0);robot.add(arm);arms.push(arm);
  oval('Junta do ombro',[.055,.12,.20],[-side*.03,-.12,-.015],joint,arm);
  const upper=loft('Braço arredondado',[[.0001,-.65,.0001],[.20,-.60,.22],[.275,-.46,.28],[.26,-.22,.27],[.20,-.02,.23],[.11,.09,.13],[.04,.118,.05],[.0001,.12,.0001]],pearl,arm,{rings:40,sides:64,frontPower:1});upper.position.x=side*.19;upper.rotation.z=side*.39;
  const hand=mitten(side<0?'Luva esquerda':'Luva direita',-side,pearl,arm);hand.scale.set(1.06,1.04,1.03);hand.position.set(side*.33,-.78,.08);hand.rotation.z=side*.12;
  const leg=loft('Perna inclinada',[[.0001,.42,.0001],[.245,.46,.245],[.255,.65,.25],[.225,.94,.23],[.18,1.12,.20],[.0001,1.18,.0001]],pearl,robot,{rings:32,sides:64,frontPower:.85});leg.position.x=side*.57;leg.rotation.z=side*.14;
  const foot=loft('Pé com sola plana',[[.0001,.005,.0001],[.40,.012,.47],[.49,.035,.56],[.52,.10,.59],[.49,.28,.55],[.38,.46,.43],[.21,.58,.26],[.0001,.62,.0001]],pearl,robot,{rings:40,sides:80,frontPower:.82});foot.position.set(side*.57,0,.18);foot.rotation.y=side*.07;
 }
 robot.userData={head,eyes,arms};return robot;
}
