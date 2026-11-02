/* SLATOUT 3D mark: the three stacked slabs (white ring, orange slab, white ring) rendered in real time
   with a small raymarching shader. No libraries. Exposes window.Slab3D(canvas, options).
   Parameters (all 0..1 unless noted): split (how far the slabs separate), hl (highlighted slab: -1 none, 0 bottom,
   1 middle, 2 top, 3 all), spin (radians), tilt (from pointer), light (0 dark studio, 1 light studio). */
(function () {
  'use strict';
  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision highp float;',
    'uniform vec2 uRes;uniform float uTime,uSplit,uSpin,uHl,uLight,uZoom,uY,uOff,uTrans;uniform vec2 uTilt;',
    'float rr2(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}',
    'float ext(float d2,float y,float h,float re){vec2 w=vec2(d2+re,abs(y)-h+re);return min(max(w.x,w.y),0.)+length(max(w,0.))-re;}',
    'float ring(vec3 p,float t){float d=max(rr2(p.xz,vec2(1.),.30),-rr2(p.xz,vec2(1.-t),.30*(1.-t)+.02));return ext(d,p.y,.11,.05);}',
    'float solid(vec3 p){return ext(rr2(p.xz,vec2(1.),.30),p.y,.13,.06);}',
    'mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}',
    'float gap(){return mix(.36,1.02,uSplit);}',
    'vec2 map(vec3 p){',
    ' p.yz*=rot(uTilt.y*.35);p.xz*=rot(.785398+uSpin+uTilt.x*.6);',
    ' float g=gap();',
    ' float a=ring(p-vec3(0.,-g,0.),.30);float b=solid(p);float c=ring(p-vec3(0.,g,0.),.42);',
    ' vec2 r=vec2(a,0.);if(b<r.x)r=vec2(b,1.);if(c<r.x)r=vec2(c,2.);',
    ' float fl=p.y+2.15+uY*.0;',
    ' return r;}',
    'vec3 nor(vec3 p){vec2 e=vec2(.0015,-.0015);return normalize(e.xyy*map(p+e.xyy).x+e.yyx*map(p+e.yyx).x+e.yxy*map(p+e.yxy).x+e.xxx*map(p+e.xxx).x);}',
    'float sh(vec3 ro,vec3 rd){float r=1.,t=.03;for(int i=0;i<28;i++){float h=map(ro+rd*t).x;r=min(r,9.*h/t);t+=clamp(h,.02,.35);if(r<.003||t>7.)break;}return clamp(r,0.,1.);}',
    'float ao(vec3 p,vec3 n){float o=0.,s=1.;for(int i=1;i<6;i++){float h=.04*float(i);o+=(h-map(p+n*h).x)*s;s*=.72;}return clamp(1.-2.4*o,0.,1.);}',
    'vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}',
    'void main(){',
    ' vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;uv.x-=uOff;',
    ' vec3 ro=vec3(0.,2.15,6.1)*uZoom;vec3 ta=vec3(0.,uY,0.);',
    ' vec3 ww=normalize(ta-ro),uu=normalize(cross(ww,vec3(0.,1.,0.))),vv=cross(uu,ww);',
    ' vec3 rd=normalize(uv.x*uu+uv.y*vv+1.85*ww);',
    ' vec3 bgD=mix(vec3(.012,.011,.011),vec3(.07,.045,.03),smoothstep(.9,-.4,length(uv-vec2(.1,.05))));',
    ' vec3 bgL=mix(vec3(.80,.80,.82),vec3(.97,.96,.95),smoothstep(1.1,-.3,length(uv-vec2(.1,.1))));',
    ' vec3 bg=mix(bgD,bgL,uLight);',
    ' vec3 col=bg;float al=1.;float t=0.;vec2 h=vec2(1.,-1.);',
    ' for(int i=0;i<110;i++){h=map(ro+rd*t);if(h.x<.0008||t>14.)break;t+=h.x*.9;}',
    ' float fy=-2.2;float tf=(fy-ro.y)/rd.y;',
    ' if(t<14.){',
    '  vec3 p=ro+rd*t,n=nor(p);',
    '  vec3 L=normalize(vec3(-.55,.95,.55)),R=normalize(vec3(.7,.35,-.8));',
    '  float dif=clamp(dot(n,L),0.,1.)*sh(p+n*.003,L);float rim=pow(clamp(1.+dot(n,rd),0.,1.),3.);',
    '  float amb=.5+.5*n.y;float o=ao(p,n);vec3 hv=normalize(L-rd);',
    '  vec3 base;float spw,sps;vec3 em=vec3(0.);',
    '  if(h.y<.5||h.y>1.5){base=vec3(.90,.885,.86);spw=48.;sps=.35;}',
    '  else{base=vec3(1.,.20,.0);spw=90.;sps=.55;em=vec3(.9,.16,.0)*(.06+.16*(1.-dif));}',
    '  float on=min(1.,step(abs(uHl-h.y),.5)+step(2.5,uHl));if(on>.5&&(h.y<.5||h.y>1.5))base=mix(base,vec3(1.,.72,.5),.22);',
    '  em+=on*vec3(1.,.28,.02)*(.06+1.1*rim)*(h.y>.5&&h.y<1.5?.45:1.);',
    '  float sp=pow(clamp(dot(n,hv),0.,1.),spw)*sps*dif;',
    '  float k=(h.y>.5&&h.y<1.5)?.85:1.25;col=base*(dif*vec3(1.,.96,.9)*k+amb*mix(vec3(.10,.09,.09),vec3(.42,.42,.44),uLight)*o)+sp;',
    '  col+=rim*mix(vec3(1.,.45,.12),vec3(.9),.3)*clamp(dot(n,R)+.4,0.,1.)*.55;',
    '  col+=em;',
    ' }else if(tf>0.){',
    '  vec3 p=ro+rd*tf;float s=sh(p+vec3(0.,.01,0.),normalize(vec3(-.55,.95,.55)));',
    '  float r=length(p.xz);float fade=smoothstep(7.,1.,r);',
    '  float glow=exp(-r*r*.35)*.55*(.35+.65*(1.-uLight));',
    '  col=mix(bg,bg*mix(.25,.62,uLight)+vec3(1.,.38,.06)*glow*.22,fade*(1.-s)*.92);',
    '  col+=vec3(1.,.4,.06)*glow*.10*fade*(1.-uLight);',
    '  if(uTrans>.5){vec2 q=gl_FragCoord.xy/uRes;float ef=smoothstep(0.,.14,q.x)*smoothstep(0.,.14,1.-q.x)*smoothstep(0.,.14,q.y)*smoothstep(0.,.2,1.-q.y);float f2=smoothstep(4.5,.8,r);float sa=f2*(1.-s)*.42*ef;float ga=glow*f2*.45*ef;col=vec3(1.,.36,.05)*.55;al=clamp(sa+ga,0.,1.);col*=ga/max(al,.001);}',
    ' }else if(uTrans>.5){col=vec3(0.);al=0.;}',
    ' col=aces(col*1.05);col=pow(col,vec3(1./2.2));',
    ' if(uTrans<.5)col*=1.-.18*dot(uv,uv)*(1.-uLight);',
    ' gl_FragColor=vec4(col*al,al);}'
  ].join('\n');

  function Slab3D(canvas, opt) {
    opt = opt || {};
    var gl = canvas.getContext('webgl', { antialias: false, alpha: !!opt.transparent, premultipliedAlpha: true, preserveDrawingBuffer: !!opt.preserve, powerPreference: 'high-performance' });
    if (!gl) { this.ok = false; return; }
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; }
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) { this.ok = false; return; }
    var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { this.ok = false; return; }
    gl.useProgram(pr);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var U = {}; ['uRes', 'uTime', 'uSplit', 'uSpin', 'uHl', 'uLight', 'uTilt', 'uZoom', 'uY', 'uOff', 'uTrans'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
    this.ok = true; this.gl = gl; this.U = U; this.canvas = canvas; this.trans = !!opt.transparent;
    this.scale = opt.scale || Math.max(1.2, Math.min(window.devicePixelRatio || 1, 2) * 0.9);
    this.p = { split: opt.split == null ? 0 : opt.split, hl: opt.hl == null ? -1 : opt.hl, spin: opt.spin || 0, light: opt.light || 0, tiltX: 0, tiltY: 0, zoom: opt.zoom || 1, y: opt.y || 0, offx: opt.offx || 0 };
    this.resize();
  }
  Slab3D.prototype.resize = function () {
    var r = this.canvas.getBoundingClientRect(), w = Math.max(2, Math.round(r.width * this.scale)), h = Math.max(2, Math.round(r.height * this.scale));
    if (this.canvas.width !== w || this.canvas.height !== h) { this.canvas.width = w; this.canvas.height = h; }
    this.gl.viewport(0, 0, w, h);
  };
  Slab3D.prototype.draw = function (time) {
    var g = this.gl, U = this.U, p = this.p;
    g.uniform2f(U.uRes, this.canvas.width, this.canvas.height); g.uniform1f(U.uTime, time || 0);
    g.uniform1f(U.uSplit, p.split); g.uniform1f(U.uSpin, p.spin); g.uniform1f(U.uHl, p.hl); g.uniform1f(U.uLight, p.light);
    g.uniform2f(U.uTilt, p.tiltX, p.tiltY); g.uniform1f(U.uZoom, p.zoom); g.uniform1f(U.uY, p.y); g.uniform1f(U.uOff, p.offx); g.uniform1f(U.uTrans, this.trans ? 1 : 0);
    g.drawArrays(g.TRIANGLES, 0, 3);
  };
  window.Slab3D = Slab3D;
})();
