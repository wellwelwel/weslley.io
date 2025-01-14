"use strict";(self.webpackChunkweslley_io=self.webpackChunkweslley_io||[]).push([[779],{6264:function(e,t,i){i.r(t),i.d(t,{assets:function(){return p},contentTitle:function(){return o},default:function(){return d},frontMatter:function(){return a},metadata:function(){return n},toc:function(){return h}});var n=i(2030),s=i(4848),r=i(8453),l=i(9672);const a={title:"Introduzindo Testes Unit\xe1rios para Devs Iniciantes",authors:["wellwelwel"],tags:["tests","javascript","beginner"]},o=void 0,p={authorsImageUrls:[void 0]},h=[];function c(e){const t={img:"img",p:"p",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.k,{tiltMaxAngleX:0,perspective:1920,children:(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Banner",src:i(9261).A+"",width:"1280",height:"720"})})}),"\n",(0,s.jsx)(t.p,{children:"Se voc\xea \xe9 um desenvolvedor iniciante (ou n\xe3o), eu quero te mostrar que testes podem sim ser simples e que a complexidade s\xf3 vem conforme nossa pr\xf3pria necessidade."})]})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},9672:function(e,t,i){i.d(t,{k:function(){return a}});var n=i(8587),s=i(7338),r=i(4848),l=["children"],a=function(e){var t=e.children,i=(0,n.A)(e,l);return(0,r.jsx)(s.A,Object.assign({tiltMaxAngleX:7.5,tiltMaxAngleY:7.5,perspective:500,transitionSpeed:750,glareEnable:!1,tiltReverse:!0},i,{children:t}))}},9261:function(e,t,i){t.A=i.p+"assets/images/banner-7ac2c9b37e32ceb4564bb18ee069f67b.png"},8453:function(e,t,i){i.d(t,{R:function(){return l},x:function(){return a}});var n=i(6540);const s={},r=n.createContext(s);function l(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),n.createElement(r.Provider,{value:t},e.children)}},7338:function(e,t,i){i.d(t,{A:function(){return h}});var n=i(4848),s=i(6540);const r=(e,t,i,n)=>{e.style.transition=`${t} ${i}ms ${n}`},l=(e,t,i)=>Math.min(Math.max(e,t),i);class a{constructor(e,t){this.glareAngle=0,this.glareOpacity=0,this.calculateGlareSize=e=>{const{width:t,height:i}=e,n=Math.sqrt(t**2+i**2);return{width:n,height:n}},this.setSize=e=>{const t=this.calculateGlareSize(e);this.glareEl.style.width=`${t.width}px`,this.glareEl.style.height=`${t.height}px`},this.update=(e,t,i,n)=>{this.updateAngle(e,t.glareReverse),this.updateOpacity(e,t,i,n)},this.updateAngle=(e,t)=>{const{xPercentage:i,yPercentage:n}=e,s=180/Math.PI,r=i?Math.atan2(n,-i)*s:0;this.glareAngle=r-(t?180:0)},this.updateOpacity=(e,t,i,n)=>{const{xPercentage:s,yPercentage:r}=e,{glarePosition:a,glareReverse:o,glareMaxOpacity:p}=t,h=i?-1:1,c=n?-1:1,d=o?-1:1;let g=0;switch(a){case"top":g=-s*h*d;break;case"right":g=r*c*d;break;case"bottom":case void 0:g=s*h*d;break;case"left":g=-r*c*d;break;case"all":g=Math.hypot(s,r)}const u=l(g,0,100);this.glareOpacity=u*p/100},this.render=e=>{const{glareColor:t}=e;this.glareEl.style.transform=`rotate(${this.glareAngle}deg) translate(-50%, -50%)`,this.glareEl.style.opacity=this.glareOpacity.toString(),this.glareEl.style.background=`linear-gradient(0deg, rgba(255,255,255,0) 0%, ${t} 100%)`},this.glareWrapperEl=document.createElement("div"),this.glareEl=document.createElement("div"),this.glareWrapperEl.appendChild(this.glareEl),this.glareWrapperEl.className="glare-wrapper",this.glareEl.className="glare";const i={position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden",borderRadius:t,WebkitMaskImage:"-webkit-radial-gradient(white, black)",pointerEvents:"none"},n=this.calculateGlareSize(e),s={position:"absolute",top:"50%",left:"50%",transformOrigin:"0% 0%",pointerEvents:"none",width:`${n.width}px`,height:`${n.height}px`};Object.assign(this.glareWrapperEl.style,i),Object.assign(this.glareEl.style,s)}}class o{constructor(){this.glareAngle=0,this.glareOpacity=0,this.tiltAngleX=0,this.tiltAngleY=0,this.tiltAngleXPercentage=0,this.tiltAngleYPercentage=0,this.update=(e,t)=>{this.updateTilt(e,t),this.updateTiltManualInput(e,t),this.updateTiltReverse(t),this.updateTiltLimits(t)},this.updateTilt=(e,t)=>{const{xPercentage:i,yPercentage:n}=e,{tiltMaxAngleX:s,tiltMaxAngleY:r}=t;this.tiltAngleX=i*s/100,this.tiltAngleY=n*r/100*-1},this.updateTiltManualInput=(e,t)=>{const{tiltAngleXManual:i,tiltAngleYManual:n,tiltMaxAngleX:s,tiltMaxAngleY:r}=t;(null!==i||null!==n)&&(this.tiltAngleX=null!==i?i:0,this.tiltAngleY=null!==n?n:0,e.xPercentage=100*this.tiltAngleX/s,e.yPercentage=100*this.tiltAngleY/r)},this.updateTiltReverse=e=>{const t=e.tiltReverse?-1:1;this.tiltAngleX=t*this.tiltAngleX,this.tiltAngleY=t*this.tiltAngleY},this.updateTiltLimits=e=>{const{tiltAxis:t}=e;this.tiltAngleX=l(this.tiltAngleX,-90,90),this.tiltAngleY=l(this.tiltAngleY,-90,90),t&&(this.tiltAngleX="x"===t?this.tiltAngleX:0,this.tiltAngleY="y"===t?this.tiltAngleY:0)},this.updateTiltAnglesPercentage=e=>{const{tiltMaxAngleX:t,tiltMaxAngleY:i}=e;this.tiltAngleXPercentage=this.tiltAngleX/t*100,this.tiltAngleYPercentage=this.tiltAngleY/i*100},this.render=e=>{e.style.transform+=`rotateX(${this.tiltAngleX}deg) rotateY(${this.tiltAngleY}deg) `}}}const p={scale:1,perspective:1e3,flipVertically:!1,flipHorizontally:!1,reset:!0,transitionEasing:"cubic-bezier(.03,.98,.52,.99)",transitionSpeed:400,trackOnWindow:!1,gyroscope:!1,tiltEnable:!0,tiltReverse:!1,tiltAngleXInitial:0,tiltAngleYInitial:0,tiltMaxAngleX:20,tiltMaxAngleY:20,tiltAxis:void 0,tiltAngleXManual:null,tiltAngleYManual:null,glareEnable:!1,glareMaxOpacity:.7,glareColor:"#ffffff",glarePosition:"bottom",glareReverse:!1,glareBorderRadius:"0"};class h extends s.PureComponent{constructor(){super(...arguments),this.wrapperEl={node:null,size:{width:0,height:0,left:0,top:0},clientPosition:{x:null,y:null,xPercentage:0,yPercentage:0},updateAnimationId:null,scale:1},this.tilt=null,this.glare=null,this.addDeviceOrientationEventListener=async()=>{if(!window.DeviceOrientationEvent)return;const e=DeviceOrientationEvent.requestPermission;"function"==typeof e?"granted"===await e()&&window.addEventListener("deviceorientation",this.onMove):window.addEventListener("deviceorientation",this.onMove)},this.setSize=()=>{this.setWrapperElSize(),this.glare&&this.glare.setSize(this.wrapperEl.size)},this.mainLoop=e=>{null!==this.wrapperEl.updateAnimationId&&cancelAnimationFrame(this.wrapperEl.updateAnimationId),this.processInput(e),this.update(e.type),this.wrapperEl.updateAnimationId=requestAnimationFrame(this.renderFrame)},this.onEnter=e=>{const{onEnter:t}=this.props;this.setSize(),this.wrapperEl.node.style.willChange="transform",this.setTransitions(),t&&t({event:e})},this.onMove=e=>{this.mainLoop(e),this.emitOnMove(e)},this.onLeave=e=>{const{onLeave:t}=this.props;if(this.setTransitions(),t&&t({event:e}),this.props.reset){const e=new CustomEvent("autoreset");this.onMove(e)}},this.processInput=e=>{const{scale:t}=this.props;switch(e.type){case"mousemove":this.wrapperEl.clientPosition.x=e.pageX,this.wrapperEl.clientPosition.y=e.pageY,this.wrapperEl.scale=t;break;case"touchmove":this.wrapperEl.clientPosition.x=e.touches[0].pageX,this.wrapperEl.clientPosition.y=e.touches[0].pageY,this.wrapperEl.scale=t;break;case"deviceorientation":this.processInputDeviceOrientation(e),this.wrapperEl.scale=t;break;case"autoreset":{const{tiltAngleXInitial:e,tiltAngleYInitial:t,tiltMaxAngleX:i,tiltMaxAngleY:n}=this.props,s=t/n*100;this.wrapperEl.clientPosition.xPercentage=l(e/i*100,-100,100),this.wrapperEl.clientPosition.yPercentage=l(s,-100,100),this.wrapperEl.scale=1;break}}},this.processInputDeviceOrientation=e=>{if(!e.gamma||!e.beta||!this.props.gyroscope)return;const{tiltMaxAngleX:t,tiltMaxAngleY:i}=this.props,n=e.gamma;this.wrapperEl.clientPosition.xPercentage=e.beta/t*100,this.wrapperEl.clientPosition.yPercentage=n/i*100,this.wrapperEl.clientPosition.xPercentage=l(this.wrapperEl.clientPosition.xPercentage,-100,100),this.wrapperEl.clientPosition.yPercentage=l(this.wrapperEl.clientPosition.yPercentage,-100,100)},this.update=e=>{const{tiltEnable:t,flipVertically:i,flipHorizontally:n}=this.props;"autoreset"!==e&&"deviceorientation"!==e&&"propChange"!==e&&this.updateClientInput(),t&&this.tilt.update(this.wrapperEl.clientPosition,this.props),this.updateFlip(),this.tilt.updateTiltAnglesPercentage(this.props),this.glare&&this.glare.update(this.wrapperEl.clientPosition,this.props,i,n)},this.updateClientInput=()=>{const{trackOnWindow:e}=this.props;let t,i;if(e){const{x:e,y:n}=this.wrapperEl.clientPosition;t=n/window.innerHeight*200-100,i=e/window.innerWidth*200-100}else{const{size:{width:e,height:n,left:s,top:r},clientPosition:{x:l,y:a}}=this.wrapperEl;t=(a-r)/n*200-100,i=(l-s)/e*200-100}this.wrapperEl.clientPosition.xPercentage=l(t,-100,100),this.wrapperEl.clientPosition.yPercentage=l(i,-100,100)},this.updateFlip=()=>{const{flipVertically:e,flipHorizontally:t}=this.props;e&&(this.tilt.tiltAngleX+=180,this.tilt.tiltAngleY*=-1),t&&(this.tilt.tiltAngleY+=180)},this.renderFrame=()=>{this.resetWrapperElTransform(),this.renderPerspective(),this.tilt.render(this.wrapperEl.node),this.renderScale(),this.glare&&this.glare.render(this.props)}}componentDidMount(){if(this.tilt=new o,this.initGlare(),this.addEventListeners(),"undefined"==typeof CustomEvent)return;const e=new CustomEvent("autoreset");this.mainLoop(e);const t=new CustomEvent("initial");this.emitOnMove(t)}componentWillUnmount(){null!==this.wrapperEl.updateAnimationId&&cancelAnimationFrame(this.wrapperEl.updateAnimationId),this.removeEventListeners()}componentDidUpdate(){const e=new CustomEvent("propChange");this.mainLoop(e),this.emitOnMove(e)}addEventListeners(){const{trackOnWindow:e,gyroscope:t}=this.props;window.addEventListener("resize",this.setSize),e&&(window.addEventListener("mouseenter",this.onEnter),window.addEventListener("mousemove",this.onMove),window.addEventListener("mouseout",this.onLeave),window.addEventListener("touchstart",this.onEnter),window.addEventListener("touchmove",this.onMove),window.addEventListener("touchend",this.onLeave)),t&&this.addDeviceOrientationEventListener()}removeEventListeners(){const{trackOnWindow:e,gyroscope:t}=this.props;window.removeEventListener("resize",this.setSize),e&&(window.removeEventListener("mouseenter",this.onEnter),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseout",this.onLeave),window.removeEventListener("touchstart",this.onEnter),window.removeEventListener("touchmove",this.onMove),window.removeEventListener("touchend",this.onLeave)),t&&window.DeviceOrientationEvent&&window.removeEventListener("deviceorientation",this.onMove)}setWrapperElSize(){const e=this.wrapperEl.node.getBoundingClientRect();this.wrapperEl.size.width=this.wrapperEl.node.offsetWidth,this.wrapperEl.size.height=this.wrapperEl.node.offsetHeight,this.wrapperEl.size.left=e.left+window.scrollX,this.wrapperEl.size.top=e.top+window.scrollY}initGlare(){const{glareEnable:e,glareBorderRadius:t}=this.props;e&&(this.glare=new a(this.wrapperEl.size,t),this.wrapperEl.node.appendChild(this.glare.glareWrapperEl))}emitOnMove(e){const{onMove:t}=this.props;if(!t)return;let i=0,n=0;this.glare&&(i=this.glare.glareAngle,n=this.glare.glareOpacity),t({tiltAngleX:this.tilt.tiltAngleX,tiltAngleY:this.tilt.tiltAngleY,tiltAngleXPercentage:this.tilt.tiltAngleXPercentage,tiltAngleYPercentage:this.tilt.tiltAngleYPercentage,glareAngle:i,glareOpacity:n,event:e})}resetWrapperElTransform(){this.wrapperEl.node.style.transform=""}renderPerspective(){const{perspective:e}=this.props;this.wrapperEl.node.style.transform+=`perspective(${e}px) `}renderScale(){const{scale:e}=this.wrapperEl;this.wrapperEl.node.style.transform+=`scale3d(${e},${e},${e})`}setTransitions(){const{transitionSpeed:e,transitionEasing:t}=this.props;r(this.wrapperEl.node,"all",e,t),this.glare&&r(this.glare.glareEl,"opacity",e,t)}render(){const{children:e,className:t,style:i}=this.props;return(0,n.jsx)("div",{ref:e=>{this.wrapperEl.node=e},onMouseEnter:this.onEnter,onMouseMove:this.onMove,onMouseLeave:this.onLeave,onTouchStart:this.onEnter,onTouchMove:this.onMove,onTouchEnd:this.onLeave,className:t,style:i,children:e})}}h.defaultProps=p},2030:function(e){e.exports=JSON.parse('{"permalink":"/articles/2024/03/22/tutorial-introduzindo-testes-unitarios-para-devs-iniciantes","source":"@site/content/articles/2024/03/22/tutorial-introduzindo-testes-unitarios-para-devs-iniciantes/index.mdx","title":"Introduzindo Testes Unit\xe1rios para Devs Iniciantes","description":"Banner","date":"2024-03-22T00:00:00.000Z","tags":[{"inline":false,"label":"Testes","permalink":"/articles/tags/tests","description":"Tests tag description"},{"inline":false,"label":"JavaScript","permalink":"/articles/tags/javascript","description":"JavaScript tag description"},{"inline":false,"label":"Iniciante","permalink":"/articles/tags/beginner","description":"Beginner tag description"}],"readingTime":6.855,"hasTruncateMarker":true,"authors":[{"name":"Weslley Ara\xfajo","title":"Desenvolvedor ativo no ecossistema open-source, comantenedor do MySQL2 e criador do Poku \u2728","url":"/","socials":{"linkedin":"https://www.linkedin.com/in/wellwelwel/","github":"https://github.com/wellwelwel","instagram":"https://www.instagram.com/wellwelwel","youtube":"https://youtube.com/@weslleyio"},"imageURL":"/img/avatar.png","key":"wellwelwel","page":null}],"frontMatter":{"title":"Introduzindo Testes Unit\xe1rios para Devs Iniciantes","authors":["wellwelwel"],"tags":["tests","javascript","beginner"]},"unlisted":false,"lastUpdatedAt":1736855857000,"prevItem":{"title":"Prevenindo o envio de emails maliciosos atrav\xe9s do seu dom\xednio","permalink":"/articles/2024/11/18/e-mail-spoofing-prevenindo-o-envio-de-emails-atraves-do-seu-dominio"}}')}}]);