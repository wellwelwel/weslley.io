"use strict";(self.webpackChunkweslley_io=self.webpackChunkweslley_io||[]).push([[2100],{4091:function(e,o,i){i.r(o),i.d(o,{assets:function(){return l},contentTitle:function(){return d},default:function(){return u},frontMatter:function(){return t},metadata:function(){return s},toc:function(){return m}});var s=i(4899),a=i(4848),n=i(8453),r=i(1276);const t={title:"Preventing malicious emails from being sent through your domain",authors:["wellwelwel"],tags:["security","dns","intermediary"]},d=void 0,l={authorsImageUrls:[void 0]},m=[{value:"Poss\xedveis impactos negativos \ud83d\udc7e",id:"poss\xedveis-impactos-negativos-",level:2},{value:"Como se proteger? \ud83e\udd1d",id:"como-se-proteger-",level:2},{value:"DNS",id:"dns",level:3},{value:"MX (Mail Exchange)",id:"mx-mail-exchange",level:3},{value:"SPF",id:"spf",level:3},{value:"Dica:",id:"dica",level:4},{value:"DKIM",id:"dkim",level:3},{value:"DMARC",id:"dmarc",level:3},{value:"Solu\xe7\xf5es e alternativas gratuitas \ud83c\udf1f",id:"solu\xe7\xf5es-e-alternativas-gratuitas-",level:2}];function c(e){const o={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.k,{tiltMaxAngleX:0,perspective:1920,children:(0,a.jsx)(o.p,{children:(0,a.jsx)(o.img,{alt:"Banner",src:i(4143).A+"",width:"1280",height:"720"})})}),"\n",(0,a.jsx)(o.p,{children:"Did you know that malicious people could be using your domain to send spoof emails?"}),"\n","\n",(0,a.jsx)(o.p,{children:"Essa t\xe9cnica \xe9 conhecida como E-mail Spoofing e explora a falta de autentica\xe7\xe3o no envio de e-mails de um dom\xednio, falsificando o remetente e fazendo parecer que a mensagem foi enviada por um dom\xednio confi\xe1vel."}),"\n",(0,a.jsx)(o.p,{children:"Tanto empresas pequenas e grandes podem ser alvos, assim como sites pessoais ou abandonados, onde o intuito pode variar desde capturar dados sens\xedveis e at\xe9 infectar dispositivos dos usu\xe1rios. Tudo isso, usando dom\xednios v\xe1lidos sem autoriza\xe7\xe3o."}),"\n",(0,a.jsx)(o.p,{children:"Os motivos podem variar, mas vou citar alguns super comuns que tornam essa vulnerabilidade poss\xedvel:"}),"\n",(0,a.jsxs)(o.ul,{children:["\n",(0,a.jsx)(o.li,{children:"Falta de conhecimento ou at\xe9 mesmo neglig\xeancia."}),"\n",(0,a.jsx)(o.li,{children:"O provedor do dom\xednio exige um plano pago \xe0 parte para e-mails que o usu\xe1rio n\xe3o est\xe1 disposto a adquirir."}),"\n"]}),"\n",(0,a.jsx)("hr",{}),"\n",(0,a.jsx)(o.h2,{id:"poss\xedveis-impactos-negativos-",children:"Poss\xedveis impactos negativos \ud83d\udc7e"}),"\n",(0,a.jsxs)(o.ul,{children:["\n",(0,a.jsx)(o.li,{children:"Perda de credibilidade."}),"\n",(0,a.jsx)(o.li,{children:"Bloqueio por provedores de e-mail (onde at\xe9 mesmo seus e-mails v\xe1lidos podem ser afetados ao serem entregues como spam ou nem mesmo chegarem ao destinat\xe1rio)."}),"\n",(0,a.jsx)(o.li,{children:"Perda do dom\xednio (den\xfancias, medidas legais ou at\xe9 mesmo pela reputa\xe7\xe3o muito prejudicada)."}),"\n"]}),"\n",(0,a.jsx)("hr",{}),"\n",(0,a.jsx)(o.h2,{id:"como-se-proteger-",children:"Como se proteger? \ud83e\udd1d"}),"\n",(0,a.jsx)(o.p,{children:"Nesse artigo, vou abordar t\xf3picos como SPF, DKIM e DMARC para proteger seu dom\xednio e evitar que pessoas maliciosas consigam acesso n\xe3o autorizado ao seu dom\xednio."}),"\n",(0,a.jsx)(o.admonition,{type:"tip",children:(0,a.jsxs)(o.p,{children:["Veja tamb\xe9m como se proteger do lado do usu\xe1rio final na publica\xe7\xe3o do ",(0,a.jsx)(o.a,{href:"https://www.linkedin.com/posts/wellwelwel_j%C3%A1-recebeu-e-mails-falsos-vindos-de-activity-7264430239038992384-skUX/",children:"LinkedIn"}),"."]})}),"\n",(0,a.jsx)(o.h3,{id:"dns",children:"DNS"}),"\n",(0,a.jsxs)(o.p,{children:["O ",(0,a.jsx)(o.strong,{children:"DNS"})," \xe9 onde voc\xea configura os registros relacionados ao seu dom\xednio, como subdom\xednios, redirecionamentos, envio e recebimento de e-mails, entre outros."]}),"\n",(0,a.jsx)(o.p,{children:"Ao comprar um dom\xednio, \xe9 comum usu\xe1rios se preocuparem especialmente com o IP da hospedagem. Aqui \xe9 onde mora um dos problemas, pois ao notar que o dom\xednio j\xe1 est\xe1 funcionando, o usu\xe1rio pode considerar que o trabalho j\xe1 est\xe1 completo."}),"\n",(0,a.jsx)(o.p,{children:"Dito isso, vamos conhecer os principais registros relacionados ao e-mail:"}),"\n",(0,a.jsx)(o.h3,{id:"mx-mail-exchange",children:"MX (Mail Exchange)"}),"\n",(0,a.jsxs)(o.p,{children:["O registro ",(0,a.jsx)(o.strong,{children:"MX"})," \xe9 o respons\xe1vel por voc\xea receber os e-mails, direcionando-os do seu dom\xednio para o servidor respons\xe1vel por receb\xea-los (",(0,a.jsx)(o.strong,{children:"Google Workspace"}),", ",(0,a.jsx)(o.strong,{children:"Zoho"}),", etc.)."]}),"\n",(0,a.jsx)(o.p,{children:"Sem ele, os e-mails que te enviarem nunca chegar\xe3o at\xe9 voc\xea."}),"\n",(0,a.jsx)(o.h3,{id:"spf",children:"SPF"}),"\n",(0,a.jsxs)(o.p,{children:["O registro ",(0,a.jsx)(o.strong,{children:"SPF"})," \xe9 uma forma de dizer quais servidores est\xe3o autorizados a enviar e-mails em nome do seu dom\xednio, ajudando a evitar que pessoas mal intencionadas usem seu dom\xednio."]}),"\n",(0,a.jsxs)(o.p,{children:["Ele \xe9 especialmente importante contra o E-mail Spoofing, sendo geralmente refor\xe7ado pelo par\xe2metro ",(0,a.jsx)(o.code,{children:"~all"}),"."]}),"\n",(0,a.jsx)(o.h4,{id:"dica",children:"Dica:"}),"\n",(0,a.jsxs)(o.p,{children:["Enquanto a maioria dos servidores de e-mail sugerem ",(0,a.jsx)(o.code,{children:"~all"})," devido \xe0 flexibilidade, se seu dom\xednio j\xe1 foi v\xedtima de ",(0,a.jsx)(o.strong,{children:"E-mail Spoofing"})," ou voc\xea quer refor\xe7ar ainda mais sua seguran\xe7a, voc\xea pode usar ",(0,a.jsx)(o.code,{children:"-all"})," para eliminar a possibilidade de aceita\xe7\xe3o por baixa prioridade de forma estrita, mas note que isso implica na complexidade das configura\xe7\xf5es do ",(0,a.jsx)(o.strong,{children:"DNS"}),", exigindo atualiza\xe7\xf5es manuais sempre que novos servi\xe7os de e-mail forem integrados ao seu dom\xednio."]}),"\n",(0,a.jsx)(o.h3,{id:"dkim",children:"DKIM"}),"\n",(0,a.jsxs)(o.p,{children:["O registro ",(0,a.jsx)(o.strong,{children:"DKIM"})," adiciona uma assinatura digital aos e-mails enviados pelo seu dom\xednio, permitindo que o servidor que recebe o seu e-mail verifique se a mensagem foi realmente enviada por voc\xea e n\xe3o foi alterada no caminho, sendo uma ferramenta complementar essencial ao ",(0,a.jsx)(o.strong,{children:"SPF"}),"."]}),"\n",(0,a.jsx)(o.p,{children:"Isso ajuda a proteger tanto a reputa\xe7\xe3o do seu dom\xednio quanto os destinat\xe1rios, al\xe9m de indiretamente evitar que seus e-mails sejam entregues como spam."}),"\n",(0,a.jsx)(o.h3,{id:"dmarc",children:"DMARC"}),"\n",(0,a.jsxs)(o.p,{children:["O registro ",(0,a.jsx)(o.strong,{children:"DMARC"})," permite que voc\xea defina como os servidores de e-mail devem tratar mensagens que falharem na valida\xe7\xe3o do SPF e do DKIM, fornecendo relat\xf3rios detalhados sobre tentativas indevidas usando seu dom\xednio, permitindo monitorar poss\xedveis abusos."]}),"\n",(0,a.jsx)("hr",{}),"\n",(0,a.jsx)(o.h2,{id:"solu\xe7\xf5es-e-alternativas-gratuitas-",children:"Solu\xe7\xf5es e alternativas gratuitas \ud83c\udf1f"}),"\n",(0,a.jsx)(o.p,{children:"Se seu provedor n\xe3o possui um servidor de e-mails ou voc\xea n\xe3o pretende usar um plano pago para isso, voc\xea pode usar gratuitamente o DNS com o roteamento de e-mails da Cloudflare, redirecionando os e-mails do seu dom\xednio para outro e-mail (por exemplo, um e-mail pessoal do Gmail)."}),"\n",(0,a.jsx)(o.p,{children:"O Zoho tamb\xe9m pode ser uma boa alternativa, n\xe3o sendo necess\xe1rio redirecionar seus e-mails e oferecendo um dashboard pr\xf3prio para os e-mails do seu dom\xednio, mas ele possui limita\xe7\xf5es de recurso em sua vers\xe3o gratuita."}),"\n",(0,a.jsx)(o.p,{children:"\u2014 Curtiu aprender um pouco mais sobre seguran\xe7a? \ud83d\udd10"}),"\n",(0,a.jsx)(o.admonition,{type:"note",children:(0,a.jsx)(o.p,{children:"Esse artigo n\xe3o possui nenhum tipo de patroc\xednio e essas s\xe3o sugest\xf5es que uso tanto pessoalmente, como profissionalmente \ud83d\ude4b\ud83c\udffb"})}),"\n",(0,a.jsx)(o.admonition,{type:"info",children:(0,a.jsxs)(o.p,{children:["Esse artigo foi postado icialmente no ",(0,a.jsx)(o.a,{href:"https://www.linkedin.com/pulse/e-mail-spoofing-prevenindo-o-envio-de-emails-atrav%25C3%25A9s-do-ara%25C3%25BAjo-ff2xc/",children:"LinkedIn"}),"."]})})]})}function u(e={}){const{wrapper:o}={...(0,n.R)(),...e.components};return o?(0,a.jsx)(o,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},4143:function(e,o,i){o.A=i.p+"assets/images/banner-306dd9f78004c89cb57b83a11ee27107.png"},4899:function(e){e.exports=JSON.parse('{"permalink":"/en/articles/2024/11/18/e-mail-spoofing-prevenindo-o-envio-de-emails-atraves-do-seu-dominio","source":"@site/i18n/en/docusaurus-plugin-content-blog-articles/2024/11/18/e-mail-spoofing-prevenindo-o-envio-de-emails-atraves-do-seu-dominio.mdx","title":"Preventing malicious emails from being sent through your domain","description":"Banner","date":"2024-11-18T00:00:00.000Z","tags":[{"inline":false,"label":"Security","permalink":"/en/articles/tags/security","description":"Security tag description"},{"inline":false,"label":"DNS","permalink":"/en/articles/tags/dns","description":"DNS tag description"},{"inline":false,"label":"Intermediary","permalink":"/en/articles/tags/intermediary","description":"Intermediary tag description"}],"readingTime":3.58,"hasTruncateMarker":true,"authors":[{"name":"Weslley Ara\xfajo","title":"Active open-source contributor, MySQL2\'s co-maintainer and Poku\'s creator \u2728","url":"/","socials":{"linkedin":"https://www.linkedin.com/in/wellwelwel/","github":"https://github.com/wellwelwel","instagram":"https://www.instagram.com/wellwelwel","youtube":"https://youtube.com/@weslleyio"},"imageURL":"/en/img/avatar.png","key":"wellwelwel","page":null}],"frontMatter":{"title":"Preventing malicious emails from being sent through your domain","authors":["wellwelwel"],"tags":["security","dns","intermediary"]},"unlisted":false,"lastUpdatedAt":1737085314000,"nextItem":{"title":"Introducing Unit Testing for Beginner Devs","permalink":"/en/articles/2024/03/22/tutorial-introduzindo-testes-unitarios-para-devs-iniciantes"}}')}}]);