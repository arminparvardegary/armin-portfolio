'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

const vert = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
void main(){
  vec2 uv = vUv;
  float d = distance(uv, uMouse);
  vec2 dir = normalize(uv - uMouse);
  uv -= dir * 0.06 * uHover * smoothstep(0.5, 0.0, d);
  uv.x += sin(uv.y * 10.0 + uTime) * 0.003 * uHover;
  gl_FragColor = texture2D(uTex, uv);
}
`;

export default function HoverImage({ src, alt }: { src: string; alt?: string }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const renderer = new Renderer({ alpha: true, dpr: Math.min(2, window.devicePixelRatio) });
    const gl = renderer.gl;
    el.appendChild(gl.canvas);

    const resize = () => renderer.setSize(el.clientWidth, el.clientHeight);
    resize();
    window.addEventListener('resize', resize);

    const texture = new Texture(gl);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      texture.image = img;
    };

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTex: { value: texture },
        uMouse: { value: [0.5, 0.5] },
        uHover: { value: 0 },
        uTime: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let hover = 0;
    let target = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      (program.uniforms.uMouse.value as [number, number]) = [
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      ];
    };
    const onEnter = () => {
      target = 1;
    };
    const onLeave = () => {
      target = 0;
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const loop = (t: number) => {
      hover += (target - hover) * 0.08;
      program.uniforms.uHover.value = hover;
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (gl.canvas.parentNode === el) el.removeChild(gl.canvas);
    };
  }, [src]);

  return <div ref={wrap} className="hover-img" role="img" aria-label={alt} />;
}
