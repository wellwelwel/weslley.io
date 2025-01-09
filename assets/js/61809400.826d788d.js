"use strict";(self.webpackChunkweslley_io=self.webpackChunkweslley_io||[]).push([[327],{2362:function(e,s,n){n.d(s,{A:function(){return P}});var i=n(6540),r=n(4848);function t(e){var s,n=function(e){var s=i.Children.toArray(e),n=s.find((function(e){return i.isValidElement(e)&&"mdxAdmonitionTitle"===e.type})),t=s.filter((function(e){return e!==n}));return{mdxAdmonitionTitle:null==n?void 0:n.props.children,rest:t.length>0?(0,r.jsx)(r.Fragment,{children:t}):null}}(e.children),t=n.mdxAdmonitionTitle,l=n.rest,o=null!=(s=e.title)?s:t;return Object.assign({},e,o&&{title:o},{children:l})}var l=n(4164),o=n(539),a=n(204),c="admonition_xJq3",d="admonitionHeading_Gvgb",h="admonitionIcon_Rf37",m="admonitionContent_BuS1";function j(e){var s=e.type,n=e.className,i=e.children;return(0,r.jsx)("div",{className:(0,l.A)(a.G.common.admonition,a.G.common.admonitionType(s),c,n),children:i})}function u(e){var s=e.icon,n=e.title;return(0,r.jsxs)("div",{className:d,children:[(0,r.jsx)("span",{className:h,children:s}),n]})}function p(e){var s=e.children;return s?(0,r.jsx)("div",{className:m,children:s}):null}function x(e){var s=e.type,n=e.icon,i=e.title,t=e.children,l=e.className;return(0,r.jsxs)(j,{type:s,className:l,children:[i||n?(0,r.jsx)(u,{title:i,icon:n}):null,(0,r.jsx)(p,{children:t})]})}function g(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 14 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})}))}var f={icon:(0,r.jsx)(g,{}),title:(0,r.jsx)(o.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function w(e){return(0,r.jsx)(x,Object.assign({},f,e,{className:(0,l.A)("alert alert--secondary",e.className),children:e.children}))}function b(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 12 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})}))}var v={icon:(0,r.jsx)(b,{}),title:(0,r.jsx)(o.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function y(e){return(0,r.jsx)(x,Object.assign({},v,e,{className:(0,l.A)("alert alert--success",e.className),children:e.children}))}function q(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 14 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})}))}var A={icon:(0,r.jsx)(q,{}),title:(0,r.jsx)(o.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function N(e){return(0,r.jsx)(x,Object.assign({},A,e,{className:(0,l.A)("alert alert--info",e.className),children:e.children}))}function C(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 16 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})}))}var k={icon:(0,r.jsx)(C,{}),title:(0,r.jsx)(o.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function M(e){return(0,r.jsx)("svg",Object.assign({viewBox:"0 0 12 16"},e,{children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})}))}var S={icon:(0,r.jsx)(M,{}),title:(0,r.jsx)(o.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};var O={icon:(0,r.jsx)(C,{}),title:(0,r.jsx)(o.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};var z={note:w,tip:y,info:N,warning:function(e){return(0,r.jsx)(x,Object.assign({},k,e,{className:(0,l.A)("alert alert--warning",e.className),children:e.children}))},danger:function(e){return(0,r.jsx)(x,Object.assign({},S,e,{className:(0,l.A)("alert alert--danger",e.className),children:e.children}))}},D={secondary:function(e){return(0,r.jsx)(w,Object.assign({title:"secondary"},e))},important:function(e){return(0,r.jsx)(N,Object.assign({title:"important"},e))},success:function(e){return(0,r.jsx)(y,Object.assign({title:"success"},e))},caution:function(e){return(0,r.jsx)(x,Object.assign({},O,e,{className:(0,l.A)("alert alert--warning",e.className),children:e.children}))}},T=Object.assign({},z,D);function P(e){var s,n=t(e),i=(s=n.type,T[s]||(console.warn('No admonition component found for admonition type "'+s+'". Using Info as fallback.'),T.info));return(0,r.jsx)(i,Object.assign({},n))}},5640:function(e,s,n){n.r(s);var i=n(797),r=n(1584),t=n(2362),l=n(6289),o=n(4848);s.default=function(){var e=(0,i.A)().siteConfig;return(0,o.jsx)(r.A,{title:"Sobre | "+e.title,description:"Conhe\xe7a um pouco sobre mim.",children:(0,o.jsx)("div",{id:"contacts",children:(0,o.jsxs)("main",{children:[(0,o.jsxs)("header",{children:[(0,o.jsx)("h1",{children:"Sobre"}),(0,o.jsx)("img",{src:"/img/about.svg",alt:""})]}),(0,o.jsxs)("nav",{children:[(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:"Prazer!"}),(0,o.jsxs)("p",{children:["\ud83d\udc4b\ud83c\udffb Me chamo ",(0,o.jsx)("strong",{children:"Weslley"}),', mas voc\xea pode me chamar de "',(0,o.jsx)("strong",{children:"Well"}),'".']})]}),(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:"O que eu fa\xe7o?"}),(0,o.jsxs)("div",{children:["\u2728 Sou um desenvolvedor ponta-a-ponta, somando mais de"," ",(0,o.jsx)("strong",{children:"10 milh\xf5es de downloads mensais"})," em projetos"," ",(0,o.jsx)("em",{children:"open-source"})," autorais:",(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),(0,o.jsx)("a",{href:"https://www.npmjs.com/~weslley.io",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm-stat/dm/weslley.io?style=flat-square&color=6c5ce7&logo=npm&logoColor=white&label=My%20NPM%20packages%20have%20been%20downloaded",alt:"NPM Downloads by package author"})}),(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),"\ud83d\ude80 Contribuo ativamente em diversos projetos de alto impacto que, juntos, somam mais de"," ",(0,o.jsx)("strong",{children:"550 milh\xf5es de downloads mensais"}),". Alguns deles s\xe3o:",(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),(0,o.jsx)("div",{className:"container",children:(0,o.jsx)("table",{children:(0,o.jsxs)("tbody",{children:[(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{children:[(0,o.jsx)("a",{href:"https://github.com/sidorares/node-mysql2/pulls?q=is:merged+author:wellwelwel",children:"MySQL2"})," ","\u2795"]}),(0,o.jsx)("td",{width:"117",children:(0,o.jsx)("a",{href:"https://www.npmjs.com/package/mysql2",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm/dm/mysql2.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white",alt:"Downloads"})})}),(0,o.jsxs)("td",{children:["\u26a1\ufe0f Fast ",(0,o.jsx)("b",{children:"mysqljs/mysql"})," compatible ",(0,o.jsx)("b",{children:"MySQL"})," ","driver for ",(0,o.jsx)("b",{children:"Node.js"}),"."]})]}),(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{children:[(0,o.jsx)("a",{href:"https://github.com/mysqljs/aws-ssl-profiles/pulls?q=is:merged+author:wellwelwel",children:"AWS SSL Profiles"})," ","\u2795"]}),(0,o.jsx)("td",{children:(0,o.jsx)("a",{href:"https://www.npmjs.com/package/aws-ssl-profiles",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm/dm/aws-ssl-profiles.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white",alt:"Downloads"})})}),(0,o.jsxs)("td",{children:["\ud83d\udcdc AWS RDS SSL certificates bundles"," ",(0,o.jsxs)("i",{children:["(created under"," ",(0,o.jsx)("a",{href:"https://github.com/mysqljs",children:"mysqljs"})," ","organization)"]}),"."]})]}),(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{children:[(0,o.jsx)("a",{href:"https://github.com/wellwelwel/lru.min/pulls?q=is:merged+author:wellwelwel",children:"lru.min"})," ","\u2795"]}),(0,o.jsx)("td",{children:(0,o.jsx)("a",{href:"https://www.npmjs.com/package/lru.min",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm/dm/lru.min.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white",alt:"Downloads"})})}),(0,o.jsxs)("td",{children:["\ud83d\udd25 An extremely fast and efficient ",(0,o.jsx)("b",{children:"LRU"})," cache for ",(0,o.jsx)("b",{children:"JavaScript"}),"."]})]}),(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{children:[(0,o.jsx)("a",{href:"https://github.com/DefinitelyTyped/DefinitelyTyped/pulls?q=is:merged+author:wellwelwel",children:"@types/node"})," ","\u2797"]}),(0,o.jsx)("td",{children:(0,o.jsx)("a",{href:"https://www.npmjs.com/package/@types/node",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm/dm/@types/node.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white",alt:"Downloads"})})}),(0,o.jsx)("td",{children:"\ud83d\udc22 Node.js JavaScript runtime."})]}),(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{children:[(0,o.jsx)("a",{href:"https://github.com/mysqljs/named-placeholders/pulls?q=is:merged+author:wellwelwel",children:"named-placeholders"})," ","\u2797"]}),(0,o.jsx)("td",{children:(0,o.jsx)("a",{href:"https://www.npmjs.com/package/named-placeholders",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm/dm/named-placeholders.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white",alt:"Downloads"})})}),(0,o.jsx)("td",{children:"\ud83d\udc2c PDO-style SQL named placeholders to unnamed compiler."})]}),(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{children:[(0,o.jsx)("a",{href:"https://github.com/testdouble/quibble/pulls?q=is:merged+author:wellwelwel",children:"quibble"})," ","\u2797"]}),(0,o.jsx)("td",{children:(0,o.jsx)("a",{href:"https://www.npmjs.com/package/quibble",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm/dm/quibble.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white",alt:"Downloads"})})}),(0,o.jsx)("td",{children:"\ud83c\udccf Makes it easy to replace require'd dependencies."})]}),(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{children:[(0,o.jsx)("a",{href:"https://github.com/BrasilAPI/cep-promise/pulls?q=is:merged+author:wellwelwel",children:"CEP Promise"})," ","\u2797"]}),(0,o.jsx)("td",{children:(0,o.jsx)("a",{href:"https://www.npmjs.com/package/cep-promise",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm/dm/cep-promise.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white",alt:"Downloads"})})}),(0,o.jsx)("td",{children:"\ud83d\udcea ZIP code search integrated directly with Correios, ViaCEP, and other services."})]}),(0,o.jsxs)("tr",{children:[(0,o.jsxs)("td",{children:[(0,o.jsx)("a",{href:"https://github.com/aashutoshrathi/word-wrap/pulls?q=is:merged+author:wellwelwel",children:"word-wrap"})," ","\u2797"]}),(0,o.jsx)("td",{children:(0,o.jsx)("a",{href:"https://www.npmjs.com/package/@aashutoshrathi/word-wrap",children:(0,o.jsx)("img",{src:"https://img.shields.io/npm/dm/@aashutoshrathi/word-wrap.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white",alt:"Downloads"})})}),(0,o.jsx)("td",{children:"\ud83c\udd70 Wrap words to a specified length."})]})]})})}),(0,o.jsxs)("small",{children:["\u2795 Projetos que mantenho ou co-mantenho.",(0,o.jsx)("br",{}),"\u2797 Os n\xfameros dessas contribui\xe7\xf5es podem n\xe3o ser diretamente meus, mas \xe9 fascinante tentar medir o impacto que minhas contribui\xe7\xf5es podem ter direta e indiretamente."]})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("br",{}),(0,o.jsx)(t.A,{type:"tip",children:"Ao clicar no nome de cada projeto da tabela, voc\xea vai direto para as minhas contribui\xe7\xf5es em cada um deles \ud83d\udc68\ud83c\udffb\u200d\ud83d\udcbb"})]})]}),(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:"MySQL2"}),(0,o.jsxs)("p",{children:["\ud83d\udc2c Tenho orgulho de ser co-mantenedor do ",(0,o.jsx)("strong",{children:"MySQL2"}),", o driver ",(0,o.jsx)("strong",{children:"MySQL"})," mais perform\xe1tico e baixado para ",(0,o.jsx)("strong",{children:"Node.js"}),", ",(0,o.jsx)("strong",{children:"Bun"})," e"," ",(0,o.jsx)("strong",{children:"Deno"}),", utilizado por"," ",(0,o.jsx)(l.A,{target:"_blank",rel:"noopener noreferrer",to:"https://github.com/sidorares/node-mysql2/network/dependents",children:"mais de 880 mil projetos p\xfablicos"})," ","no ",(0,o.jsx)("strong",{children:"GitHub"}),"."]})]}),(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:"Poku"}),(0,o.jsxs)("p",{children:["\ud83d\udc37 Tamb\xe9m sou o criador do"," ",(0,o.jsx)(l.A,{target:"_blank",rel:"noopener noreferrer",to:"https://github.com/wellwelwel/poku",children:"Poku"}),", um executor de testes de alta performance que simplifica a forma como voc\xea testa seu c\xf3digo com ",(0,o.jsx)("strong",{children:"JavaScript"}),"."]})]}),(0,o.jsxs)("section",{children:[(0,o.jsx)("h2",{children:"Impacto"}),(0,o.jsxs)("p",{children:["\ud83c\udf0e Direta ou indiretamente, meu trabalho na comunidade",(0,o.jsx)("em",{children:"open-source"})," impacta e apoia milh\xf5es de desenvolvedores globalmente, especialmente no ecossistema"," ",(0,o.jsx)("strong",{children:"JavaScript"}),".",(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),"\ud83e\udde0 Meu objetivo \xe9 compartilhar conhecimento de forma \xfanica, participando de confer\xeancias e encontros (meetups), palestrando e at\xe9 em um simples bate-papo casual.",(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),"\ud83e\udd1d Fique \xe0 vontade para entrar em contato e me acompanhar nas redes sociais. Estou sempre disposto a discutir maneiras criativas de tornar a vida dos desenvolvedores mais f\xe1cil e segura."]})]})]})]})})})}}}]);