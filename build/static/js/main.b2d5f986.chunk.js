(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{17:function(e,t,n){e.exports=n(41)},22:function(e,t,n){},23:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(15),c=n.n(r),i=(n(22),n(23),n(2)),o=n(3),s=n(5),u=n(4),m=n(16),h=n.n(m);function d(e){return l.a.createElement("div",null,l.a.createElement("h5",null,e.value))}var p=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).handleSubmit=function(e){e.preventDefault(),a.setState({isClicked:!0}),a.setState({songName:"Searching for Matches.."});var t={name:a.state.lyrics};h.a.post("/",t).then((function(e){a.setState({isClicked:!1}),a.setState({songName:e.data})}))},a.handleInputChange=function(e){console.log(e.target.name),a.setState({lyrics:e.target.value})},a.handleReset=function(){a.setState({lyrics:null})},a.state={lyrics:null,songName:null,isClicked:!1},a}return Object(o.a)(n,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h3",null,"Type lyrics below to find song"),l.a.createElement("p",null,this.state.lyrics),l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("p",null,l.a.createElement("input",{type:"text",placeholder:"Type Lyrics Here",name:"name",onChange:this.handleInputChange}),l.a.createElement("button",{type:"reset",onClick:this.handleReset},"X")),l.a.createElement("p",null,l.a.createElement("button",{disabled:this.state.isClicked,type:"submit"},"Find Song"))),l.a.createElement(d,{value:this.state.songName}))}}]),n}(a.Component),f=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return l.a.createElement("h3",null,"Beta Version ",this.props.beta)}}]),n}(a.Component);var v=function(){return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"App-beta"},l.a.createElement(f,{beta:"1.0.2"})),l.a.createElement("div",{className:"App-header"},l.a.createElement("h1",null,"Welcome to Lyric Finder"),l.a.createElement(p,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.b2d5f986.chunk.js.map