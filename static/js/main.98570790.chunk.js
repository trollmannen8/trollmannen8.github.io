(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{15:function(e,n,t){},18:function(e,n,t){"use strict";t.r(n);var a=t(1),i=t.n(a),r=t(6),o=t.n(r),s=(t(15),t(7)),c=t(8),d=t(2),l=t(10),h=t(9),u=t(3),b=t.n(u),p=t(5),j=t.n(p),g=t(0);b.a.setOptions({breaks:!0,highlight:function(e){return j.a.highlight(e,j.a.languages.javascript,"javascript")}});var m=new b.a.Renderer;m.link=function(e,n,t){return'<a target="_blank" href="'.concat(e,'">').concat(t,"</a>")};var f=function(e){Object(l.a)(t,e);var n=Object(h.a)(t);function t(e){var a;return Object(s.a)(this,t),(a=n.call(this,e)).state={markdown:w},a.handleChange=a.handleChange.bind(Object(d.a)(a)),a}return Object(c.a)(t,[{key:"handleChange",value:function(e){this.setState({markdown:e.target.value})}},{key:"render",value:function(){return Object(g.jsxs)("div",{children:[Object(g.jsxs)("div",{id:"input",children:[Object(g.jsx)("h3",{class:"title",children:"Editor:"}),Object(g.jsx)(k,{markdown:this.state.markdown,onChange:this.handleChange})]}),Object(g.jsxs)("div",{id:"output",children:[Object(g.jsx)("h3",{class:"title",children:"Preview:"}),Object(g.jsx)(v,{markdown:this.state.markdown})]})]})}}]),t}(i.a.Component),k=function(e){return Object(g.jsx)("textarea",{id:"editor",onChange:e.onChange,type:"text",value:e.markdown})},v=function(e){return Object(g.jsx)("div",{id:"preview",dangerouslySetInnerHTML:{__html:b()(e.markdown,{renderer:m})}})},w="# Welcome to the Markdown Previewer App!\n## It's made for redering your markdown\nWrite GitHub Flavored Markdown in the editor and you'll see the result in the Preview field.\n\nYou can use **bold** text.\n\nNot to mention code: `const NUMBER = 8`\n\nAnd code block:\n```\nfunction beHappy(you) {\n  if (you.happiness === false) {\n    you.happiness = true;\n  }\n  return you.happiness;\n}\n```\n\nThis is a [link](https://trollmannen8.github.io/).\n\nHere's an image:\n![image](https://trollmannen8.github.io/assets/img/about.webp \"Coffee\")\n\nAnd a list:\n- One\n- Two\n- Three\n\nAnd finally a blockquote:\n> \u201cLife is really simple, but social media has made it complicated.\u201d\n",O=f,y=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,19)).then((function(n){var t=n.getCLS,a=n.getFID,i=n.getFCP,r=n.getLCP,o=n.getTTFB;t(e),a(e),i(e),r(e),o(e)}))};o.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(O,{})}),document.getElementById("root")),y()}},[[18,1,2]]]);
//# sourceMappingURL=main.98570790.chunk.js.map