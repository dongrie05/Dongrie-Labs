import * as THREE from './vendor/three.module.js';
import {Pass,FullScreenQuad} from './vendor/addons/postprocessing/Pass.js';
import {ShaderPass} from './vendor/addons/postprocessing/ShaderPass.js';
const vertexShader='varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
export class CaptureAlphaPass extends Pass{
 constructor(){super();this.needsSwap=false;this.target=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType});this.material=new THREE.ShaderMaterial({uniforms:{tDiffuse:{value:null}},vertexShader,fragmentShader:'uniform sampler2D tDiffuse; varying vec2 vUv; void main(){gl_FragColor=texture2D(tDiffuse,vUv);}'});this.quad=new FullScreenQuad(this.material);}
 setSize(w,h){this.target.setSize(w,h);}
 render(renderer,write,read){this.material.uniforms.tDiffuse.value=read.texture;renderer.setRenderTarget(this.target);this.quad.render(renderer);}
 dispose(){this.target.dispose();this.material.dispose();this.quad.dispose();}
}
export function restoreAlphaPass(capture){return new ShaderPass(new THREE.ShaderMaterial({uniforms:{tDiffuse:{value:null},tOriginal:{value:capture.target.texture}},vertexShader,fragmentShader:`uniform sampler2D tDiffuse;uniform sampler2D tOriginal;varying vec2 vUv;void main(){vec4 c=texture2D(tDiffuse,vUv);float objectAlpha=texture2D(tOriginal,vUv).a;float glow=max(c.r,max(c.g,c.b));float alpha=max(objectAlpha,clamp(glow*1.4,0.0,1.0));gl_FragColor=vec4(c.rgb/max(alpha,0.0001),alpha);}`}));}
