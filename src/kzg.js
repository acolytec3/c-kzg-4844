
var kzg = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir ||= __filename;
  return (
function(moduleArg = {}) {

var g=moduleArg,aa,ba;g.ready=new Promise((a,b)=>{aa=a;ba=b});var ca=Object.assign({},g),da="object"==typeof window,k="function"==typeof importScripts,ea="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,n="",y,z,fa;
if(ea){var fs=require("fs"),ha=require("path");n=k?ha.dirname(n)+"/":__dirname+"/";y=(a,b)=>{a=ia(a)?new URL(a):ha.normalize(a);return fs.readFileSync(a,b?void 0:"utf8")};fa=a=>{a=y(a,!0);a.buffer||(a=new Uint8Array(a));return a};z=(a,b,c,d=!0)=>{a=ia(a)?new URL(a):ha.normalize(a);fs.readFile(a,d?void 0:"utf8",(e,f)=>{e?c(e):b(d?f.buffer:f)})};process.argv.slice(2)}else if(da||k)k?n=self.location.href:"undefined"!=typeof document&&document.currentScript&&(n=document.currentScript.src),_scriptDir&&
(n=_scriptDir),n.startsWith("blob:")?n="":n=n.substr(0,n.replace(/[?#].*/,"").lastIndexOf("/")+1),y=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},k&&(fa=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),z=(a,b,c)=>{var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=()=>{200==d.status||0==d.status&&d.response?b(d.response):c()};d.onerror=c;d.send(null)};
var ja=g.print||console.log.bind(console),A=g.printErr||console.error.bind(console);Object.assign(g,ca);ca=null;var la;g.wasmBinary&&(la=g.wasmBinary);"object"!=typeof WebAssembly&&B("no native wasm support detected");var ma,na=!1,C,D,oa,E,F;
function pa(){var a=ma.buffer;g.HEAP8=C=new Int8Array(a);g.HEAP16=oa=new Int16Array(a);g.HEAPU8=D=new Uint8Array(a);g.HEAPU16=new Uint16Array(a);g.HEAP32=E=new Int32Array(a);g.HEAPU32=F=new Uint32Array(a);g.HEAPF32=new Float32Array(a);g.HEAPF64=new Float64Array(a)}var qa=[],ra=[],sa=[];function ta(){var a=g.preRun.shift();qa.unshift(a)}var G=0,ua=null,va=null;function wa(){G++;g.monitorRunDependencies?.(G)}
function xa(){G--;g.monitorRunDependencies?.(G);if(0==G&&(null!==ua&&(clearInterval(ua),ua=null),va)){var a=va;va=null;a()}}function B(a){g.onAbort?.(a);a="Aborted("+a+")";A(a);na=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");ba(a);throw a;}var ya=a=>a.startsWith("data:application/octet-stream;base64,"),ia=a=>a.startsWith("file://"),I;I="kzg.wasm";if(!ya(I)){var za=I;I=g.locateFile?g.locateFile(za,n):n+za}
function Aa(a){if(a==I&&la)return new Uint8Array(la);if(fa)return fa(a);throw"both async and sync fetching of the wasm failed";}function Ba(a){if(!la&&(da||k)){if("function"==typeof fetch&&!ia(a))return fetch(a,{credentials:"same-origin"}).then(b=>{if(!b.ok)throw`failed to load wasm binary file at '${a}'`;return b.arrayBuffer()}).catch(()=>Aa(a));if(z)return new Promise((b,c)=>{z(a,d=>b(new Uint8Array(d)),c)})}return Promise.resolve().then(()=>Aa(a))}
function Ca(a,b,c){return Ba(a).then(d=>WebAssembly.instantiate(d,b)).then(d=>d).then(c,d=>{A(`failed to asynchronously prepare wasm: ${d}`);B(d)})}function Da(a,b){var c=I;return la||"function"!=typeof WebAssembly.instantiateStreaming||ya(c)||ia(c)||ea||"function"!=typeof fetch?Ca(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){A(`wasm streaming compile failed: ${e}`);A("falling back to ArrayBuffer instantiation");return Ca(c,a,b)}))}
var J,Ea,Fa=a=>{for(;0<a.length;)a.shift()(g)},Ga="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,K=(a,b)=>{for(var c=b+NaN,d=b;a[d]&&!(d>=c);)++d;if(16<d-b&&a.buffer&&Ga)return Ga.decode(a.subarray(b,d));for(c="";b<d;){var e=a[b++];if(e&128){var f=a[b++]&63;if(192==(e&224))c+=String.fromCharCode((e&31)<<6|f);else{var h=a[b++]&63;e=224==(e&240)?(e&15)<<12|f<<6|h:(e&7)<<18|f<<12|h<<6|a[b++]&63;65536>e?c+=String.fromCharCode(e):(e-=65536,c+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else c+=
String.fromCharCode(e)}return c},Ha=(a,b)=>{for(var c=0,d=a.length-1;0<=d;d--){var e=a[d];"."===e?a.splice(d,1):".."===e?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a},L=a=>{var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=Ha(a.split("/").filter(d=>!!d),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a},Ia=a=>{var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return".";b&&=b.substr(0,b.length-
1);return a+b},Ja=a=>{if("/"===a)return"/";a=L(a);a=a.replace(/\/$/,"");var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)},Ka=()=>{if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues)return c=>crypto.getRandomValues(c);if(ea)try{var a=require("crypto");if(a.randomFillSync)return c=>a.randomFillSync(c);var b=a.randomBytes;return c=>(c.set(b(c.byteLength)),c)}catch(c){}B("initRandomDevice")},La=a=>(La=Ka())(a);
function Ma(){for(var a="",b=!1,c=arguments.length-1;-1<=c&&!b;c--){b=0<=c?arguments[c]:"/";if("string"!=typeof b)throw new TypeError("Arguments to path.resolve must be strings");if(!b)return"";a=b+"/"+a;b="/"===b.charAt(0)}a=Ha(a.split("/").filter(d=>!!d),!b).join("/");return(b?"/":"")+a||"."}
var Na=[],Oa=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);127>=d?b++:2047>=d?b+=2:55296<=d&&57343>=d?(b+=4,++c):b+=3}return b},Pa=(a,b,c,d)=>{if(!(0<d))return 0;var e=c;d=c+d-1;for(var f=0;f<a.length;++f){var h=a.charCodeAt(f);if(55296<=h&&57343>=h){var q=a.charCodeAt(++f);h=65536+((h&1023)<<10)|q&1023}if(127>=h){if(c>=d)break;b[c++]=h}else{if(2047>=h){if(c+1>=d)break;b[c++]=192|h>>6}else{if(65535>=h){if(c+2>=d)break;b[c++]=224|h>>12}else{if(c+3>=d)break;b[c++]=240|h>>18;b[c++]=128|h>>
12&63}b[c++]=128|h>>6&63}b[c++]=128|h&63}}b[c]=0;return c-e};function Qa(a){var b=Array(Oa(a)+1);a=Pa(a,b,0,b.length);b.length=a;return b}var Ra=[];function Sa(a,b){Ra[a]={input:[],output:[],J:b};Ta(a,Ua)}
var Ua={open(a){var b=Ra[a.node.rdev];if(!b)throw new M(43);a.tty=b;a.seekable=!1},close(a){a.tty.J.fsync(a.tty)},fsync(a){a.tty.J.fsync(a.tty)},read(a,b,c,d){if(!a.tty||!a.tty.J.aa)throw new M(60);for(var e=0,f=0;f<d;f++){try{var h=a.tty.J.aa(a.tty)}catch(q){throw new M(29);}if(void 0===h&&0===e)throw new M(6);if(null===h||void 0===h)break;e++;b[c+f]=h}e&&(a.node.timestamp=Date.now());return e},write(a,b,c,d){if(!a.tty||!a.tty.J.V)throw new M(60);try{for(var e=0;e<d;e++)a.tty.J.V(a.tty,b[c+e])}catch(f){throw new M(29);
}d&&(a.node.timestamp=Date.now());return e}},Va={aa(){a:{if(!Na.length){var a=null;if(ea){var b=Buffer.alloc(256),c=0,d=process.stdin.fd;try{c=fs.readSync(d,b)}catch(e){if(e.toString().includes("EOF"))c=0;else throw e;}0<c?a=b.slice(0,c).toString("utf-8"):a=null}else"undefined"!=typeof window&&"function"==typeof window.prompt?(a=window.prompt("Input: "),null!==a&&(a+="\n")):"function"==typeof readline&&(a=readline(),null!==a&&(a+="\n"));if(!a){a=null;break a}Na=Qa(a)}a=Na.shift()}return a},V(a,b){null===
b||10===b?(ja(K(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},fsync(a){a.output&&0<a.output.length&&(ja(K(a.output,0)),a.output=[])},la(){return{va:25856,xa:5,ua:191,wa:35387,ta:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},ma(){return 0},na(){return[24,80]}},Wa={V(a,b){null===b||10===b?(A(K(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},fsync(a){a.output&&0<a.output.length&&(A(K(a.output,0)),a.output=[])}};
function Xa(a,b){var c=a.A?a.A.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)>>>0),0!=c&&(b=Math.max(b,256)),c=a.A,a.A=new Uint8Array(b),0<a.D&&a.A.set(c.subarray(0,a.D),0))}
var N={G:null,I(){return N.createNode(null,"/",16895,0)},createNode(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new M(63);N.G||(N.G={dir:{node:{L:N.B.L,F:N.B.F,lookup:N.B.lookup,P:N.B.P,rename:N.B.rename,unlink:N.B.unlink,rmdir:N.B.rmdir,readdir:N.B.readdir,symlink:N.B.symlink},stream:{M:N.C.M}},file:{node:{L:N.B.L,F:N.B.F},stream:{M:N.C.M,read:N.C.read,write:N.C.write,X:N.C.X,U:N.C.U,fa:N.C.fa}},link:{node:{L:N.B.L,F:N.B.F,readlink:N.B.readlink},stream:{}},Z:{node:{L:N.B.L,F:N.B.F},stream:Ya}});
c=Za(a,b,c,d);O(c.mode)?(c.B=N.G.dir.node,c.C=N.G.dir.stream,c.A={}):32768===(c.mode&61440)?(c.B=N.G.file.node,c.C=N.G.file.stream,c.D=0,c.A=null):40960===(c.mode&61440)?(c.B=N.G.link.node,c.C=N.G.link.stream):8192===(c.mode&61440)&&(c.B=N.G.Z.node,c.C=N.G.Z.stream);c.timestamp=Date.now();a&&(a.A[b]=c,a.timestamp=c.timestamp);return c},ya(a){return a.A?a.A.subarray?a.A.subarray(0,a.D):new Uint8Array(a.A):new Uint8Array(0)},B:{L(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;
b.nlink=1;b.uid=0;b.gid=0;b.rdev=a.rdev;O(a.mode)?b.size=4096:32768===(a.mode&61440)?b.size=a.D:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.atime=new Date(a.timestamp);b.mtime=new Date(a.timestamp);b.ctime=new Date(a.timestamp);b.ja=4096;b.blocks=Math.ceil(b.size/b.ja);return b},F(a,b){void 0!==b.mode&&(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=b.timestamp);if(void 0!==b.size&&(b=b.size,a.D!=b))if(0==b)a.A=null,a.D=0;else{var c=a.A;a.A=new Uint8Array(b);c&&a.A.set(c.subarray(0,
Math.min(b,a.D)));a.D=b}},lookup(){throw $a[44];},P(a,b,c,d){return N.createNode(a,b,c,d)},rename(a,b,c){if(O(a.mode)){try{var d=P(b,c)}catch(f){}if(d)for(var e in d.A)throw new M(55);}delete a.parent.A[a.name];a.parent.timestamp=Date.now();a.name=c;b.A[c]=a;b.timestamp=a.parent.timestamp;a.parent=b},unlink(a,b){delete a.A[b];a.timestamp=Date.now()},rmdir(a,b){var c=P(a,b),d;for(d in c.A)throw new M(55);delete a.A[b];a.timestamp=Date.now()},readdir(a){var b=[".",".."],c;for(c of Object.keys(a.A))b.push(c);
return b},symlink(a,b,c){a=N.createNode(a,b,41471,0);a.link=c;return a},readlink(a){if(40960!==(a.mode&61440))throw new M(28);return a.link}},C:{read(a,b,c,d,e){var f=a.node.A;if(e>=a.node.D)return 0;a=Math.min(a.node.D-e,d);if(8<a&&f.subarray)b.set(f.subarray(e,e+a),c);else for(d=0;d<a;d++)b[c+d]=f[e+d];return a},write(a,b,c,d,e,f){b.buffer===C.buffer&&(f=!1);if(!d)return 0;a=a.node;a.timestamp=Date.now();if(b.subarray&&(!a.A||a.A.subarray)){if(f)return a.A=b.subarray(c,c+d),a.D=d;if(0===a.D&&0===
e)return a.A=b.slice(c,c+d),a.D=d;if(e+d<=a.D)return a.A.set(b.subarray(c,c+d),e),d}Xa(a,e+d);if(a.A.subarray&&b.subarray)a.A.set(b.subarray(c,c+d),e);else for(f=0;f<d;f++)a.A[e+f]=b[c+f];a.D=Math.max(a.D,e+d);return d},M(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.D);if(0>b)throw new M(28);return b},X(a,b,c){Xa(a.node,b+c);a.node.D=Math.max(a.node.D,b+c)},U(a,b,c,d,e){if(32768!==(a.node.mode&61440))throw new M(43);a=a.node.A;if(e&2||a.buffer!==C.buffer){if(0<c||c+b<
a.length)a.subarray?a=a.subarray(c,c+b):a=Array.prototype.slice.call(a,c,c+b);c=!0;B();b=void 0;if(!b)throw new M(48);C.set(a,b)}else c=!1,b=a.byteOffset;return{Ba:b,sa:c}},fa(a,b,c,d){N.C.write(a,b,0,d,c,!1);return 0}}},ab=(a,b,c)=>{var d=`al ${a}`;z(a,e=>{b(new Uint8Array(e));d&&xa(d)},()=>{if(c)c();else throw`Loading data file "${a}" failed.`;});d&&wa(d)},bb=g.preloadPlugins||[],cb=(a,b,c,d)=>{"undefined"!=typeof Browser&&Browser.za();var e=!1;bb.forEach(f=>{!e&&f.canHandle(b)&&(f.handle(a,b,c,
d),e=!0)});return e},eb=(a,b,c,d,e,f,h,q,r,m)=>{function l(w){function t(u){m?.();q||db(a,b,u,d,e,r);f?.();xa(v)}cb(w,p,t,()=>{h?.();xa(v)})||t(w)}var p=b?Ma(L(a+"/"+b)):a,v=`cp ${p}`;wa(v);"string"==typeof c?ab(c,l,h):l(c)},fb=(a,b)=>{var c=0;a&&(c|=365);b&&(c|=146);return c},gb=null,hb={},ib=[],jb=1,Q=null,kb=!0,M=class{constructor(a){this.name="ErrnoError";this.K=a}},$a={};
function R(a,b={}){a=Ma(a);if(!a)return{path:"",node:null};b=Object.assign({$:!0,W:0},b);if(8<b.W)throw new M(32);a=a.split("/").filter(h=>!!h);for(var c=gb,d="/",e=0;e<a.length;e++){var f=e===a.length-1;if(f&&b.parent)break;c=P(c,a[e]);d=L(d+"/"+a[e]);c.O&&(!f||f&&b.$)&&(c=c.O.root);if(!f||b.R)for(f=0;40960===(c.mode&61440);)if(c=lb(d),d=Ma(Ia(d),c),c=R(d,{W:b.W+1}).node,40<f++)throw new M(32);}return{path:d,node:c}}
function S(a){for(var b;;){if(a===a.parent)return a=a.I.ea,b?"/"!==a[a.length-1]?`${a}/${b}`:a+b:a;b=b?`${a.name}/${b}`:a.name;a=a.parent}}function mb(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%Q.length}function P(a,b){var c=O(a.mode)?(c=nb(a,"x"))?c:a.B.lookup?0:2:54;if(c)throw new M(c);for(c=Q[mb(a.id,b)];c;c=c.N){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.B.lookup(a,b)}
function Za(a,b,c,d){a=new ob(a,b,c,d);b=mb(a.parent.id,a.name);a.N=Q[b];return Q[b]=a}function O(a){return 16384===(a&61440)}function pb(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}function nb(a,b){if(kb)return 0;if(!b.includes("r")||a.mode&292){if(b.includes("w")&&!(a.mode&146)||b.includes("x")&&!(a.mode&73))return 2}else return 2;return 0}function qb(a,b){try{return P(a,b),20}catch(c){}return nb(a,"wx")}function rb(){for(var a=0;4096>=a;a++)if(!ib[a])return a;throw new M(33);}
function T(a){a=ib[a];if(!a)throw new M(8);return a}function sb(a,b=-1){tb||(tb=function(){this.H={}},tb.prototype={},Object.defineProperties(tb.prototype,{object:{get(){return this.node},set(c){this.node=c}},flags:{get(){return this.H.flags},set(c){this.H.flags=c}},position:{get(){return this.H.position},set(c){this.H.position=c}}}));a=Object.assign(new tb,a);-1==b&&(b=rb());a.fd=b;return ib[b]=a}var Ya={open(a){a.C=hb[a.node.rdev].C;a.C.open?.(a)},M(){throw new M(70);}};
function Ta(a,b){hb[a]={C:b}}function ub(a,b){var c="/"===b;if(c&&gb)throw new M(10);if(!c&&b){var d=R(b,{$:!1});b=d.path;d=d.node;if(d.O)throw new M(10);if(!O(d.mode))throw new M(54);}b={type:a,Aa:{},ea:b,qa:[]};a=a.I(b);a.I=b;b.root=a;c?gb=a:d&&(d.O=b,d.I&&d.I.qa.push(b))}function vb(a,b,c){var d=R(a,{parent:!0}).node;a=Ja(a);if(!a||"."===a||".."===a)throw new M(28);var e=qb(d,a);if(e)throw new M(e);if(!d.B.P)throw new M(63);return d.B.P(d,a,b,c)}function U(a){return vb(a,16895,0)}
function wb(a,b,c){"undefined"==typeof c&&(c=b,b=438);return vb(a,b|8192,c)}function xb(a,b){if(!Ma(a))throw new M(44);var c=R(b,{parent:!0}).node;if(!c)throw new M(44);b=Ja(b);var d=qb(c,b);if(d)throw new M(d);if(!c.B.symlink)throw new M(63);c.B.symlink(c,b,a)}
function yb(a){var b=R(a,{parent:!0}).node;if(!b)throw new M(44);var c=Ja(a);a=P(b,c);a:{try{var d=P(b,c)}catch(f){d=f.K;break a}var e=nb(b,"wx");d=e?e:O(d.mode)?31:0}if(d)throw new M(d);if(!b.B.unlink)throw new M(63);if(a.O)throw new M(10);b.B.unlink(b,c);b=mb(a.parent.id,a.name);if(Q[b]===a)Q[b]=a.N;else for(b=Q[b];b;){if(b.N===a){b.N=a.N;break}b=b.N}}function lb(a){a=R(a).node;if(!a)throw new M(44);if(!a.B.readlink)throw new M(28);return Ma(S(a.parent),a.B.readlink(a))}
function zb(a,b){a="string"==typeof a?R(a,{R:!0}).node:a;if(!a.B.F)throw new M(63);a.B.F(a,{mode:b&4095|a.mode&-4096,timestamp:Date.now()})}
function Ab(a,b,c){if(""===a)throw new M(44);if("string"==typeof b){var d={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[b];if("undefined"==typeof d)throw Error(`Unknown file open mode: ${b}`);b=d}c=b&64?("undefined"==typeof c?438:c)&4095|32768:0;if("object"==typeof a)var e=a;else{a=L(a);try{e=R(a,{R:!(b&131072)}).node}catch(f){}}d=!1;if(b&64)if(e){if(b&128)throw new M(20);}else e=vb(a,c,0),d=!0;if(!e)throw new M(44);8192===(e.mode&61440)&&(b&=-513);if(b&65536&&!O(e.mode))throw new M(54);if(!d&&(c=
e?40960===(e.mode&61440)?32:O(e.mode)&&("r"!==pb(b)||b&512)?31:nb(e,pb(b)):44))throw new M(c);if(b&512&&!d){c=e;c="string"==typeof c?R(c,{R:!0}).node:c;if(!c.B.F)throw new M(63);if(O(c.mode))throw new M(31);if(32768!==(c.mode&61440))throw new M(28);if(d=nb(c,"w"))throw new M(d);c.B.F(c,{size:0,timestamp:Date.now()})}b&=-131713;e=sb({node:e,path:S(e),flags:b,seekable:!0,position:0,C:e.C,ra:[],error:!1});e.C.open&&e.C.open(e);!g.logReadFiles||b&1||(Bb||={},a in Bb||(Bb[a]=1));return e}
function Cb(a){if(null===a.fd)throw new M(8);a.S&&(a.S=null);try{a.C.close&&a.C.close(a)}catch(b){throw b;}finally{ib[a.fd]=null}a.fd=null}function Db(a,b,c){if(null===a.fd)throw new M(8);if(!a.seekable||!a.C.M)throw new M(70);if(0!=c&&1!=c&&2!=c)throw new M(28);a.position=a.C.M(a,b,c);a.ra=[]}
function Eb(a,b,c,d,e,f){if(0>d||0>e)throw new M(28);if(null===a.fd)throw new M(8);if(0===(a.flags&2097155))throw new M(8);if(O(a.node.mode))throw new M(31);if(!a.C.write)throw new M(28);a.seekable&&a.flags&1024&&Db(a,0,2);var h="undefined"!=typeof e;if(!h)e=a.position;else if(!a.seekable)throw new M(70);b=a.C.write(a,b,c,d,e,f);h||(a.position+=b);return b}var Fb;
function Gb(a,b){a="string"==typeof a?a:S(a);for(b=b.split("/").reverse();b.length;){var c=b.pop();if(c){var d=L(a+"/"+c);try{U(d)}catch(e){}a=d}}return d}function Hb(a,b,c,d){a=L(("string"==typeof a?a:S(a))+"/"+b);c=fb(c,d);return vb(a,(void 0!==c?c:438)&4095|32768,0)}
function db(a,b,c,d,e,f){var h=b;a&&(a="string"==typeof a?a:S(a),h=b?L(a+"/"+b):a);a=fb(d,e);h=vb(h,(void 0!==a?a:438)&4095|32768,0);if(c){if("string"==typeof c){b=Array(c.length);d=0;for(e=c.length;d<e;++d)b[d]=c.charCodeAt(d);c=b}zb(h,a|146);b=Ab(h,577);Eb(b,c,0,c.length,0,f);Cb(b);zb(h,a)}}
function V(a,b,c,d){a=L(("string"==typeof a?a:S(a))+"/"+b);b=fb(!!c,!!d);V.da||(V.da=64);var e=V.da++<<8|0;Ta(e,{open(f){f.seekable=!1},close(){d?.buffer?.length&&d(10)},read(f,h,q,r){for(var m=0,l=0;l<r;l++){try{var p=c()}catch(v){throw new M(29);}if(void 0===p&&0===m)throw new M(6);if(null===p||void 0===p)break;m++;h[q+l]=p}m&&(f.node.timestamp=Date.now());return m},write(f,h,q,r){for(var m=0;m<r;m++)try{d(h[q+m])}catch(l){throw new M(29);}r&&(f.node.timestamp=Date.now());return m}});return wb(a,
b,e)}function Ib(a){if(!(a.oa||a.pa||a.link||a.A)){if("undefined"!=typeof XMLHttpRequest)throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");if(y)try{a.A=Qa(y(a.url)),a.D=a.A.length}catch(b){throw new M(29);}else throw Error("Cannot load without read() or XMLHttpRequest.");}}
function Jb(a,b,c,d,e){function f(){this.T=!1;this.H=[]}f.prototype.get=function(l){if(!(l>this.length-1||0>l)){var p=l%this.chunkSize;return this.ba(l/this.chunkSize|0)[p]}};f.prototype.ga=function(l){this.ba=l};f.prototype.Y=function(){var l=new XMLHttpRequest;l.open("HEAD",c,!1);l.send(null);if(!(200<=l.status&&300>l.status||304===l.status))throw Error("Couldn't load "+c+". Status: "+l.status);var p=Number(l.getResponseHeader("Content-length")),v,w=(v=l.getResponseHeader("Accept-Ranges"))&&"bytes"===
v;l=(v=l.getResponseHeader("Content-Encoding"))&&"gzip"===v;var t=1048576;w||(t=p);var u=this;u.ga(H=>{var ka=H*t,X=(H+1)*t-1;X=Math.min(X,p-1);if("undefined"==typeof u.H[H]){var Qb=u.H;if(ka>X)throw Error("invalid range ("+ka+", "+X+") or no bytes requested!");if(X>p-1)throw Error("only "+p+" bytes available! programmer error!");var x=new XMLHttpRequest;x.open("GET",c,!1);p!==t&&x.setRequestHeader("Range","bytes="+ka+"-"+X);x.responseType="arraybuffer";x.overrideMimeType&&x.overrideMimeType("text/plain; charset=x-user-defined");
x.send(null);if(!(200<=x.status&&300>x.status||304===x.status))throw Error("Couldn't load "+c+". Status: "+x.status);ka=void 0!==x.response?new Uint8Array(x.response||[]):Qa(x.responseText||"");Qb[H]=ka}if("undefined"==typeof u.H[H])throw Error("doXHR failed!");return u.H[H]});if(l||!p)t=p=1,t=p=this.ba(0).length,ja("LazyFiles on gzip forces download of the whole file when length is accessed");this.ia=p;this.ha=t;this.T=!0};if("undefined"!=typeof XMLHttpRequest){if(!k)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
var h=new f;Object.defineProperties(h,{length:{get:function(){this.T||this.Y();return this.ia}},chunkSize:{get:function(){this.T||this.Y();return this.ha}}});var q=void 0}else q=c,h=void 0;var r=Hb(a,b,d,e);h?r.A=h:q&&(r.A=null,r.url=q);Object.defineProperties(r,{D:{get:function(){return this.A.length}}});var m={};Object.keys(r.C).forEach(l=>{var p=r.C[l];m[l]=function(){Ib(r);return p.apply(null,arguments)}});m.read=(l,p,v,w,t)=>{Ib(r);l=l.node.A;if(t>=l.length)p=0;else{w=Math.min(l.length-t,w);
if(l.slice)for(var u=0;u<w;u++)p[v+u]=l[t+u];else for(u=0;u<w;u++)p[v+u]=l.get(t+u);p=w}return p};m.U=()=>{Ib(r);B();throw new M(48);};r.C=m;return r}var W={},tb,Bb,Kb=void 0;function Y(){var a=E[+Kb>>2];Kb+=4;return a}
var Ob=(a,b,c,d)=>{var e={string:m=>{var l=0;if(null!==m&&void 0!==m&&0!==m){l=Oa(m)+1;var p=Lb(l);Pa(m,D,p,l);l=p}return l},array:m=>{var l=Lb(m.length);C.set(m,l);return l}};a=g["_"+a];var f=[],h=0;if(d)for(var q=0;q<d.length;q++){var r=e[c[q]];r?(0===h&&(h=Mb()),f[q]=r(d[q])):f[q]=d[q]}c=a.apply(null,f);return c=function(m){0!==h&&Nb(h);return"string"===b?m?K(D,m):"":"boolean"===b?!!m:m}(c)};
function ob(a,b,c,d){a||=this;this.parent=a;this.I=a.I;this.O=null;this.id=jb++;this.name=b;this.mode=c;this.B={};this.C={};this.rdev=d}Object.defineProperties(ob.prototype,{read:{get:function(){return 365===(this.mode&365)},set:function(a){a?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146===(this.mode&146)},set:function(a){a?this.mode|=146:this.mode&=-147}},pa:{get:function(){return O(this.mode)}},oa:{get:function(){return 8192===(this.mode&61440)}}});
[44].forEach(a=>{$a[a]=new M(a);$a[a].stack="<generic error, no stack>"});Q=Array(4096);ub(N,"/");U("/tmp");U("/home");U("/home/web_user");(function(){U("/dev");Ta(259,{read:()=>0,write:(d,e,f,h)=>h});wb("/dev/null",259);Sa(1280,Va);Sa(1536,Wa);wb("/dev/tty",1280);wb("/dev/tty1",1536);var a=new Uint8Array(1024),b=0,c=()=>{0===b&&(b=La(a).byteLength);return a[--b]};V("/dev","random",c);V("/dev","urandom",c);U("/dev/shm");U("/dev/shm/tmp")})();
(function(){U("/proc");var a=U("/proc/self");U("/proc/self/fd");ub({I(){var b=Za(a,"fd",16895,73);b.B={lookup(c,d){var e=T(+d);c={parent:null,I:{ea:"fake"},B:{readlink:()=>e.path}};return c.parent=c}};return b}},"/proc/self/fd")})();g.FS_createPath=Gb;g.FS_createDataFile=db;g.FS_createPreloadedFile=eb;g.FS_unlink=yb;g.FS_createLazyFile=Jb;g.FS_createDevice=V;
var Pb={k:(a,b,c,d)=>{B(`Assertion failed: ${a?K(D,a):""}, at: `+[b?b?K(D,b):"":"unknown filename",c,d?d?K(D,d):"":"unknown function"])},c:function(a,b,c){Kb=c;try{var d=T(a);switch(b){case 0:var e=Y();if(0>e)break;for(;ib[e];)e++;return sb(d,e).fd;case 1:case 2:return 0;case 3:return d.flags;case 4:return e=Y(),d.flags|=e,0;case 12:return e=Y(),oa[e+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(f){if("undefined"==typeof W||"ErrnoError"!==f.name)throw f;return-f.K}},f:function(a,b,c){Kb=c;try{var d=
T(a);switch(b){case 21509:return d.tty?0:-59;case 21505:if(!d.tty)return-59;if(d.tty.J.la){a=[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];var e=Y();E[e>>2]=25856;E[e+4>>2]=5;E[e+8>>2]=191;E[e+12>>2]=35387;for(var f=0;32>f;f++)C[e+f+17>>0]=a[f]||0}return 0;case 21510:case 21511:case 21512:return d.tty?0:-59;case 21506:case 21507:case 21508:if(!d.tty)return-59;if(d.tty.J.ma)for(e=Y(),a=[],f=0;32>f;f++)a.push(C[e+f+17>>0]);return 0;case 21519:if(!d.tty)return-59;e=Y();
return E[e>>2]=0;case 21520:return d.tty?-28:-59;case 21531:e=Y();if(!d.C.ka)throw new M(59);return d.C.ka(d,b,e);case 21523:if(!d.tty)return-59;d.tty.J.na&&(f=[24,80],e=Y(),oa[e>>1]=f[0],oa[e+2>>1]=f[1]);return 0;case 21524:return d.tty?0:-59;case 21515:return d.tty?0:-59;default:return-28}}catch(h){if("undefined"==typeof W||"ErrnoError"!==h.name)throw h;return-h.K}},g:function(a,b,c,d){Kb=d;try{b=b?K(D,b):"";var e=b;if("/"===e.charAt(0))b=e;else{var f=-100===a?"/":T(a).path;if(0==e.length)throw new M(44);
b=L(f+"/"+e)}var h=d?Y():0;return Ab(b,c,h).fd}catch(q){if("undefined"==typeof W||"ErrnoError"!==q.name)throw q;return-q.K}},j:a=>{do{var b=F[a>>2];a+=4;var c=F[a>>2];a+=4;var d=F[a>>2];a+=4;b=b?K(D,b):"";Gb("/",Ia(b),!0,!0);db(b,null,C.subarray(d,d+c),!0,!0,!0)}while(F[a>>2])},h:(a,b,c)=>D.copyWithin(a,b,b+c),d:a=>{var b=D.length;a>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=Math;d=Math.max(a,d);a:{e=(e.min.call(e,2147483648,d+(65536-d%65536)%
65536)-ma.buffer.byteLength+65535)/65536;try{ma.grow(e);pa();var f=1;break a}catch(h){}f=void 0}if(f)return!0}return!1},a:function(a){try{var b=T(a);Cb(b);return 0}catch(c){if("undefined"==typeof W||"ErrnoError"!==c.name)throw c;return c.K}},e:function(a,b,c,d){try{a:{var e=T(a);a=b;for(var f,h=b=0;h<c;h++){var q=F[a>>2],r=F[a+4>>2];a+=8;var m=e,l=f,p=C;if(0>r||0>l)throw new M(28);if(null===m.fd)throw new M(8);if(1===(m.flags&2097155))throw new M(8);if(O(m.node.mode))throw new M(31);if(!m.C.read)throw new M(28);
var v="undefined"!=typeof l;if(!v)l=m.position;else if(!m.seekable)throw new M(70);var w=m.C.read(m,p,q,r,l);v||(m.position+=w);var t=w;if(0>t){var u=-1;break a}b+=t;if(t<r)break;"undefined"!==typeof f&&(f+=t)}u=b}F[d>>2]=u;return 0}catch(H){if("undefined"==typeof W||"ErrnoError"!==H.name)throw H;return H.K}},i:function(a,b,c,d,e){b=c+2097152>>>0<4194305-!!b?(b>>>0)+4294967296*c:NaN;try{if(isNaN(b))return 61;var f=T(a);Db(f,b,d);Ea=[f.position>>>0,(J=f.position,1<=+Math.abs(J)?0<J?+Math.floor(J/4294967296)>>>
0:~~+Math.ceil((J-+(~~J>>>0))/4294967296)>>>0:0)];E[e>>2]=Ea[0];E[e+4>>2]=Ea[1];f.S&&0===b&&0===d&&(f.S=null);return 0}catch(h){if("undefined"==typeof W||"ErrnoError"!==h.name)throw h;return h.K}},b:function(a,b,c,d){try{a:{var e=T(a);a=b;for(var f,h=b=0;h<c;h++){var q=F[a>>2],r=F[a+4>>2];a+=8;var m=Eb(e,C,q,r,f);if(0>m){var l=-1;break a}b+=m;"undefined"!==typeof f&&(f+=m)}l=b}F[d>>2]=l;return 0}catch(p){if("undefined"==typeof W||"ErrnoError"!==p.name)throw p;return p.K}}},Z=function(){function a(c){Z=
c.exports;ma=Z.l;pa();ra.unshift(Z.m);xa("wasm-instantiate");return Z}var b={a:Pb};wa("wasm-instantiate");if(g.instantiateWasm)try{return g.instantiateWasm(b,a)}catch(c){A(`Module.instantiateWasm callback failed with error: ${c}`),ba(c)}Da(b,function(c){a(c.instance)}).catch(ba);return{}}();g._load_trusted_setup_file_from_wasm=()=>(g._load_trusted_setup_file_from_wasm=Z.n)();g._free_trusted_setup_wasm=()=>(g._free_trusted_setup_wasm=Z.o)();
g._blob_to_kzg_commitment_wasm=a=>(g._blob_to_kzg_commitment_wasm=Z.p)(a);g._compute_blob_kzg_proof_wasm=(a,b)=>(g._compute_blob_kzg_proof_wasm=Z.q)(a,b);g._verify_blob_kzg_proof_wasm=(a,b,c)=>(g._verify_blob_kzg_proof_wasm=Z.r)(a,b,c);g._verify_kzg_proof_wasm=(a,b,c,d)=>(g._verify_kzg_proof_wasm=Z.s)(a,b,c,d);var Mb=()=>(Mb=Z.u)(),Nb=a=>(Nb=Z.v)(a),Lb=a=>(Lb=Z.w)(a);g.___emscripten_embedded_file_data=414940;g.addRunDependency=wa;g.removeRunDependency=xa;g.FS_createPath=Gb;g.FS_createLazyFile=Jb;
g.FS_createDevice=V;g.cwrap=(a,b,c,d)=>{var e=!c||c.every(f=>"number"===f||"boolean"===f);return"string"!==b&&e&&!d?g["_"+a]:function(){return Ob(a,b,c,arguments)}};g.FS_createPreloadedFile=eb;g.FS_createDataFile=db;g.FS_unlink=yb;var Rb;va=function Sb(){Rb||Tb();Rb||(va=Sb)};
function Tb(){function a(){if(!Rb&&(Rb=!0,g.calledRun=!0,!na)){g.noFSInit||Fb||(Fb=!0,g.stdin=g.stdin,g.stdout=g.stdout,g.stderr=g.stderr,g.stdin?V("/dev","stdin",g.stdin):xb("/dev/tty","/dev/stdin"),g.stdout?V("/dev","stdout",null,g.stdout):xb("/dev/tty","/dev/stdout"),g.stderr?V("/dev","stderr",null,g.stderr):xb("/dev/tty1","/dev/stderr"),Ab("/dev/stdin",0),Ab("/dev/stdout",1),Ab("/dev/stderr",1));kb=!1;Fa(ra);aa(g);if(g.onRuntimeInitialized)g.onRuntimeInitialized();if(g.postRun)for("function"==
typeof g.postRun&&(g.postRun=[g.postRun]);g.postRun.length;){var b=g.postRun.shift();sa.unshift(b)}Fa(sa)}}if(!(0<G)){if(g.preRun)for("function"==typeof g.preRun&&(g.preRun=[g.preRun]);g.preRun.length;)ta();Fa(qa);0<G||(g.setStatus?(g.setStatus("Running..."),setTimeout(function(){setTimeout(function(){g.setStatus("")},1);a()},1)):a())}}if(g.preInit)for("function"==typeof g.preInit&&(g.preInit=[g.preInit]);0<g.preInit.length;)g.preInit.pop()();Tb();


  return moduleArg.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = kzg;
else if (typeof define === 'function' && define['amd'])
  define([], () => kzg);
