(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();var D=[[1552,1562],[1611,1631],[1648,1648],[1750,1773],[64606,64610]],P=[[1552,1562],[1750,1773]],Y=[8204,8205,173],X=[1570,1571,1573,1649,1650,1651],tt=new Map([[64336,"ٱ"],[64337,"ٱ"],[64338,"ٻ"],[64339,"ٻ"],[64340,"ٻ"],[64341,"ٻ"],[64342,"پ"],[64343,"پ"],[64344,"پ"],[64345,"پ"],[64346,"ڀ"],[64347,"ڀ"],[64348,"ڀ"],[64349,"ڀ"],[64350,"ٺ"],[64351,"ٺ"],[64352,"ٺ"],[64353,"ٺ"],[64354,"ٿ"],[64355,"ٿ"],[64356,"ٿ"],[64357,"ٿ"],[64358,"ٹ"],[64359,"ٹ"],[64360,"ٹ"],[64361,"ٹ"],[64362,"ڤ"],[64363,"ڤ"],[64364,"ڤ"],[64365,"ڤ"],[64366,"ڦ"],[64367,"ڦ"],[64368,"ڦ"],[64369,"ڦ"],[64370,"ڄ"],[64371,"ڄ"],[64372,"ڄ"],[64373,"ڄ"],[64374,"ڃ"],[64375,"ڃ"],[64376,"ڃ"],[64377,"ڃ"],[64378,"چ"],[64379,"چ"],[64380,"چ"],[64381,"چ"],[64382,"ڇ"],[64383,"ڇ"],[64384,"ڇ"],[64385,"ڇ"],[64386,"ڍ"],[64387,"ڍ"],[64388,"ڌ"],[64389,"ڌ"],[64390,"ڎ"],[64391,"ڎ"],[64392,"ڈ"],[64393,"ڈ"],[64394,"ژ"],[64395,"ژ"],[64396,"ڑ"],[64397,"ڑ"],[64398,"ک"],[64399,"ک"],[64400,"ک"],[64401,"ک"],[64402,"گ"],[64403,"گ"],[64404,"گ"],[64405,"گ"],[64406,"ڳ"],[64407,"ڳ"],[64408,"ڳ"],[64409,"ڳ"],[64410,"ڱ"],[64411,"ڱ"],[64412,"ڱ"],[64413,"ڱ"],[64414,"ں"],[64415,"ں"],[64416,"ڻ"],[64417,"ڻ"],[64418,"ڻ"],[64419,"ڻ"],[64420,"ۀ"],[64421,"ۀ"],[64422,"ہ"],[64423,"ہ"],[64424,"ہ"],[64425,"ہ"],[64426,"ھ"],[64427,"ھ"],[64428,"ھ"],[64429,"ھ"],[64430,"ے"],[64431,"ے"],[64432,"ۓ"],[64433,"ۓ"],[65136,"ً"],[65137,"ـً"],[65138,"ٌ"],[65140,"ٍ"],[65142,"َ"],[65143,"ـَ"],[65144,"ُ"],[65145,"ـُ"],[65146,"ِ"],[65147,"ـِ"],[65148,"ّ"],[65149,"ـّ"],[65150,"ْ"],[65151,"ـْ"],[65152,"ء"],[65153,"آ"],[65154,"آ"],[65155,"أ"],[65156,"أ"],[65157,"ؤ"],[65158,"ؤ"],[65159,"إ"],[65160,"إ"],[65161,"ئ"],[65162,"ئ"],[65163,"ئ"],[65164,"ئ"],[65165,"ا"],[65166,"ا"],[65167,"ب"],[65168,"ب"],[65169,"ب"],[65170,"ب"],[65171,"ة"],[65172,"ة"],[65173,"ت"],[65174,"ت"],[65175,"ت"],[65176,"ت"],[65177,"ث"],[65178,"ث"],[65179,"ث"],[65180,"ث"],[65181,"ج"],[65182,"ج"],[65183,"ج"],[65184,"ج"],[65185,"ح"],[65186,"ح"],[65187,"ح"],[65188,"ح"],[65189,"خ"],[65190,"خ"],[65191,"خ"],[65192,"خ"],[65193,"د"],[65194,"د"],[65195,"ذ"],[65196,"ذ"],[65197,"ر"],[65198,"ر"],[65199,"ز"],[65200,"ز"],[65201,"س"],[65202,"س"],[65203,"س"],[65204,"س"],[65205,"ش"],[65206,"ش"],[65207,"ش"],[65208,"ش"],[65209,"ص"],[65210,"ص"],[65211,"ص"],[65212,"ص"],[65213,"ض"],[65214,"ض"],[65215,"ض"],[65216,"ض"],[65217,"ط"],[65218,"ط"],[65219,"ط"],[65220,"ط"],[65221,"ظ"],[65222,"ظ"],[65223,"ظ"],[65224,"ظ"],[65225,"ع"],[65226,"ع"],[65227,"ع"],[65228,"ع"],[65229,"غ"],[65230,"غ"],[65231,"غ"],[65232,"غ"],[65233,"ف"],[65234,"ف"],[65235,"ف"],[65236,"ف"],[65237,"ق"],[65238,"ق"],[65239,"ق"],[65240,"ق"],[65241,"ك"],[65242,"ك"],[65243,"ك"],[65244,"ك"],[65245,"ل"],[65246,"ل"],[65247,"ل"],[65248,"ل"],[65249,"م"],[65250,"م"],[65251,"م"],[65252,"م"],[65253,"ن"],[65254,"ن"],[65255,"ن"],[65256,"ن"],[65257,"ه"],[65258,"ه"],[65259,"ه"],[65260,"ه"],[65261,"و"],[65262,"و"],[65263,"ى"],[65264,"ى"],[65265,"ي"],[65266,"ي"],[65267,"ي"],[65268,"ي"],[65269,"لآ"],[65270,"لآ"],[65271,"لأ"],[65272,"لأ"],[65273,"لإ"],[65274,"لإ"],[65275,"لا"],[65276,"لا"]]);function G(t){return t&&t.replace(/\u064a/g,"ی").replace(/\u0643/g,"ک").replace(/\u0647/g,"ہ")}var O={nfc:!0,nbsp:!0,alifMadda:!0,numerals:!0,zeroWidth:!0,diacritics:!0,honorifics:!0,hamza:!0,kashida:!1,presentationForms:!1,punctuationTrim:!1,normalizeCharacters:!1};function S(t,e){if(!t)return t;const s=e?{...O,...e}:O;let n=t;if(s.nfc&&(n=n.normalize("NFC")),s.nbsp&&(n=n.replace(/\u00a0/g," ")),s.alifMadda&&(n=n.replace(/[\u0627\u0671]\u0653/g,"آ")),s.numerals&&(n=n.replace(/[\u0660-\u0669\u06f0-\u06f9]/g,r=>String(r.codePointAt(0)&15))),s.zeroWidth){const r=new Set(Y);n=[...n].filter(a=>!r.has(a.codePointAt(0))).join("")}if(s.diacritics&&(n=z(n,D)),s.honorifics&&(n=z(n,P)),s.hamza&&(n=n.replace(/\u0623/g,"ا").replace(/\u0624/g,"و")),s.kashida&&(n=n.replace(/\u0640/g,"")),s.presentationForms){let r="";for(const a of n){const i=a.codePointAt(0);r+=tt.get(i)??a}n=r}return s.punctuationTrim&&(n=n.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,"")),s.normalizeCharacters&&(n=G(n)),n}function z(t,e){if(!t)return t;let s="";for(const n of t){const r=n.codePointAt(0);e.some(([a,i])=>r>=a&&r<=i)||(s+=n)}return s}function q(t){return t?S(t,{nfc:!0,nbsp:!0,alifMadda:!0,numerals:!0,zeroWidth:!0,diacritics:!0,honorifics:!0,hamza:!0,kashida:!1,presentationForms:!1,punctuationTrim:!0}).trim():""}function U(t){return z(t,D)}function et(t){return D.some(([e,s])=>t>=e&&t<=s)}function M(t){return t.replace(/[\u200c\u200d\u00ad]/g,"")}var st=new RegExp("["+X.map(t=>String.fromCodePoint(t)).join("")+"]","g");function W(t){return t.replace(st,"ا")}function V(t){return t.replace(/\u0623/g,"ا").replace(/\u0624/g,"و")}function nt(t,e){return t.replace(/[\u0660-\u0669\u06f0-\u06f9]/g,s=>{const n=s.codePointAt(0)&15;return String.fromCodePoint(1776+n)})}function rt(t){return String(t).replace(/[0-9]/g,e=>String.fromCodePoint(1776+Number(e)))}var F=new Set([1657,1662,1670,1672,1681,1705,1711,1722,1726,1729,1740,1746]);function at(t){const e=t.codePointAt(0)??0;return F.has(e)||e>=1776&&e<=1785}function R(t){const e=t.codePointAt(0)??0;return F.has(e)||e>=1776&&e<=1785?"urdu-letter":et(e)?"diacritic":e>=1632&&e<=1641?"numeral":e===1548||e===1563||e===1567||e===1748?"punctuation":e>=1536&&e<=1791?"arabic-letter":e>=48&&e<=57?"numeral":e>=65&&e<=90||e>=97&&e<=122?"latin":e===32||e===160||e===8203||e===9||e===10||e===13?"whitespace":e>=33&&e<=47||e>=58&&e<=64?"punctuation":"other"}function Z(t){if(!t)return 0;const e=[...t].filter(n=>!/\s/.test(n));return e.length===0?0:e.filter(n=>{const r=n.codePointAt(0)??0;return F.has(r)||r>=1776&&r<=1785}).length/e.length}function it(t){if(!t.trim())return"unknown";const e=[...t].filter(i=>!/\s/.test(i));if(e.length===0)return"unknown";let s=0,n=0,r=0;for(const i of e){const u=i.codePointAt(0)??0;if(F.has(u)||u>=1776&&u<=1785){s++;continue}if(u>=1536&&u<=1791){n++;continue}(u>=65&&u<=90||u>=97&&u<=122)&&r++}const a=e.length;return s/a>=.1&&r/a>=.1?"mixed":s/a>=.1?"urdu":n/a>=.5?"arabic":r/a>=.8?"latin":s>0||n>0?"arabic":"unknown"}function ut(t){for(const e of t){const s=e.codePointAt(0)??0;if(s>=1424&&s<=2303||s>=64285&&s<=65023||s>=65136&&s<=65279)return!0;if(s>=65&&s<=90||s>=97&&s<=122)return!1}return!1}var ot=["exact","nfc","strip-zerowidth","strip-diacritics","normalize-alif","strip-honorifics","normalize-hamza","trim-punctuation","compound-split"];function H(t,e){switch(e){case"exact":return t;case"nfc":return t.normalize("NFC");case"strip-zerowidth":return M(t);case"strip-diacritics":return U(t);case"normalize-alif":return W(t);case"strip-honorifics":return z(t,P);case"normalize-hamza":return V(t);case"trim-punctuation":return t.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,"");default:return t}}function ct(t,e,s=ot){let n=t,r=e;for(const a of s){if(a==="compound-split"){const i=n.split(/\s+/),u=r.split(/\s+/);if(i.some(v=>u.includes(v)))return{matched:!0,layer:a,normalizedQuery:n,normalizedTarget:r};continue}if(n=H(n,a),r=H(r,a),n===r)return{matched:!0,layer:a,normalizedQuery:n,normalizedTarget:r}}return{matched:!1,layer:null,normalizedQuery:n,normalizedTarget:r}}function lt(t,e){const s=t.length,n=e.length;if(s===0)return n;if(n===0)return s;let r=Array.from({length:n+1},(i,u)=>u),a=new Array(n+1);for(let i=1;i<=s;i++){a[0]=i;for(let u=1;u<=n;u++){const v=t[i-1]===e[u-1]?0:1;a[u]=Math.min(a[u-1]+1,r[u]+1,r[u-1]+v)}[r,a]=[a,r]}return r[n]}function dt(t,e){const s=t.length,n=e.length,r=Array.from({length:s+1},()=>new Array(n+1).fill(0));for(let a=1;a<=s;a++)for(let i=1;i<=n;i++)r[a][i]=t[a-1]===e[i-1]?r[a-1][i-1]+1:Math.max(r[a-1][i],r[a][i-1]);return r[s][n]}function pt(t){const e=[t],s=x=>{x!==e[e.length-1]&&e.push(x)},n=t.normalize("NFC");s(n);const r=M(n);s(r);const a=U(r);s(a);const i=W(a);s(i);const u=z(i,P);s(u);const v=V(u);s(v);const y=v.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,"");return s(y),e}function mt(t,e){if(!e.length)return null;const s=S(t);let n=null;for(const r of e){const a=S(r),i=Math.max(s.length,a.length);if(i===0)continue;const u=lt(s,a),v=dt(s,a),y=.6*(1-u/i)+.4*(v/i);y>=.5&&(!n||y>n.score)&&(n={candidate:r,score:y})}return n}var I=["صفر","ایک","دو","تین","چار","پانچ","چھ","سات","آٹھ","نو","دس","گیارہ","بارہ","تیرہ","چودہ","پندرہ","سولہ","سترہ","اٹھارہ","انیس","بیس","اکیس","بائیس","تئیس","چوبیس","پچیس","چھبیس","ستائیس","اٹھائیس","انتیس","تیس","اکتیس","بتیس","تینتیس","چونتیس","پینتیس","چھتیس","سینتیس","اڑتیس","انتالیس","چالیس","اکتالیس","بیالیس","تینتالیس","چوالیس","پینتالیس","چھیالیس","سینتالیس","اڑتالیس","انچاس","پچاس","اکاون","باون","ترپن","چوون","پچپن","چھپن","ستاون","اٹھاون","انسٹھ","ساٹھ","اکسٹھ","باسٹھ","ترسٹھ","چوسٹھ","پینسٹھ","چھیاسٹھ","سڑسٹھ","اڑسٹھ","انہتر","ستر","اکہتر","بہتر","تہتر","چوہتر","پچھتر","چھہتر","ستہتر","اٹھہتر","اناسی","اسی","اکاسی","بیاسی","تراسی","چوراسی","پچاسی","چھیاسی","ستاسی","اٹھاسی","نواسی","نوے","اکانوے","بانوے","ترانوے","چورانوے","پچانوے","چھیانوے","ستانوے","اٹھانوے","ننانوے"],ft=["","ایک سو","دو سو","تین سو","چار سو","پانچ سو","چھ سو","سات سو","آٹھ سو","نو سو"],vt=new Map([[1,{masculine:"پہلا",feminine:"پہلی"}],[2,{masculine:"دوسرا",feminine:"دوسری"}],[3,{masculine:"تیسرا",feminine:"تیسری"}],[4,{masculine:"چوتھا",feminine:"چوتھی"}],[5,{masculine:"پانچواں",feminine:"پانچویں"}],[6,{masculine:"چھٹا",feminine:"چھٹی"}],[7,{masculine:"ساتواں",feminine:"ساتویں"}],[8,{masculine:"آٹھواں",feminine:"آٹھویں"}],[9,{masculine:"نواں",feminine:"نویں"}],[10,{masculine:"دسواں",feminine:"دسویں"}]]),gt=[[1000000000000000n,"نیل"],[1000000000000n,"کھرب"],[1000000000n,"ارب"],[10000000n,"کروڑ"],[100000n,"لاکھ"],[1000n,"ہزار"]];function L(t){if(t===0n)return I[0];const e=[];let s=t;for(const[n,r]of gt)s>=n&&(e.push(`${L(s/n)} ${r}`),s=s%n);if(s>=100n){const n=Number(s/100n);s=s%100n,e.push(ft[n]??`${I[n]} سو`)}return s>0n&&e.push(I[Number(s)]),e.join(" ")}function B(t,e){const s=typeof t=="number"?BigInt(Math.trunc(t)):t,n=s<0n,r=n?-s:s;if(e!=null&&e.ordinal){const i=Number(r),u=vt.get(i),v=u?e.gender==="feminine"?u.feminine:u.masculine:L(r)+(e.gender==="feminine"?"ویں":"واں");return n?`منفی ${v}`:v}const a=L(r);return n?`منفی ${a}`:a}var $=new Map;(function(){for(let e=0;e<=99;e++)$.set(B(BigInt(e)),BigInt(e));for(let e=1;e<=9;e++)$.set(B(BigInt(e*100)),BigInt(e*100));$.set("سو",100n),$.set("ہزار",1000n),$.set("لاکھ",100000n),$.set("کروڑ",10000000n),$.set("ارب",1000000000n),$.set("کھرب",1000000000000n),$.set("نیل",1000000000000000n)})();function ht(t){let e=t.trim(),s=!1;e.startsWith("منفی ")&&(s=!0,e=e.slice(5).trim());const n=$.get(e);if(n!==void 0)return s?-n:n;const r=e.split(/\s+/);let a=0n,i=0n;for(const u of r){const v=$.get(u);if(v===void 0)return null;v>=1000n?(a+=(i||1n)*v,i=0n):v===100n?i=(i||1n)*100n:i+=v}return a+=i,s?-a:a}function bt(t,e){const s=t<0,n=Math.abs(t),r=Math.trunc(n),a=Math.round((n-r)*100),i=B(BigInt(r)),u=e==="PKR"?"روپے":"روپیہ",v=e==="PKR"?"پیسے":"پیسہ";let y=`${i} ${u}`;return a>0&&(y+=` ${B(BigInt(a))} ${v}`),s?`منفی ${y}`:y}function yt(t){if(!t.trim())return"whitespace";const e=[...t];let s=0,n=0,r=0;for(const i of e){const u=R(i);u==="urdu-letter"?s++:u==="latin"?n++:u==="numeral"&&r++}const a=e.length;return r===a?"numeral":s/a>=.8?"urdu-word":n/a>=.8?"latin-word":s>0&&n>0?"mixed":"urdu-word"}function Q(t){return t?t.split(/([\u0020\u00a0\u200b\t\n\r\v]+)/).filter(e=>e.length>0).map(e=>({text:e,type:yt(e)})):[]}function $t(t){return t?t.split(/[\u06d4\u061f!]+/).map(e=>e.trim()).filter(e=>e.length>0):[]}function Ct(t,e){if(e<=0||t.length<e)return[];const s=[];for(let n=0;n<=t.length-e;n++)s.push(t.slice(n,n+e));return s}function At(t){return t.trim()?t.split(/(\s+)/).reverse().join(""):t}function wt(t,e,s="..."){if([...t].length<=e)return t;const n=e-[...s].length;if(n<=0)return s;const r=t.split(/(\s+)/);let a="";for(const u of r){if([...a+u].length>n)break;a+=u}return(a.trimEnd()||[...t].slice(0,n).join(""))+s}function xt(t,e,s=" ",n="start"){const r=e-[...t].length;if(r<=0)return t;const a=s.repeat(r);return n==="start"?a+t:t+a}function Et(t){return t.trim()?t.trim().split(/\s+/).length:0}function j(t,e){return[...t].length}function zt(t){const e=[];let s="";for(const r of t){const a=r.codePointAt(0)??0;if(a>=1536&&a<=1791||a>=1872&&a<=1919||a>=64336&&a<=65023||a>=65136&&a<=65279)s+=r;else if(r===" "&&s)s+=r;else{const u=s.trim();u&&e.push(u),s=""}}const n=s.trim();return n&&e.push(n),e}function Bt(t){return t&&t.replace(/&nbsp;/g," ").replace(/&ldquo;/g,"“").replace(/&rdquo;/g,"”").replace(/&lsquo;/g,"‘").replace(/&rsquo;/g,"’").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&")}var kt=new Map([[129,"ا"],[130,"ب"],[131,"پ"],[132,"ت"],[133,"ٹ"],[134,"ث"],[135,"ج"],[136,"چ"],[137,"ح"],[138,"خ"],[139,"د"],[140,"ڈ"],[141,"ذ"],[142,"ر"],[143,"ڑ"],[144,"ز"],[145,"ژ"],[146,"س"],[147,"ش"],[148,"ص"],[149,"ض"],[150,"ط"],[151,"ظ"],[152,"ع"],[153,"غ"],[154,"ف"],[155,"ق"],[156,"ک"],[157,"گ"],[158,"ل"],[159,"م"],[160,"ن"],[161,"ں"],[162,"و"],[163,"ہ"],[164,"ھ"],[165,"ء"],[166,"ی"],[167,"ے"],[190,"أ"],[191,"آ"],[192,"ؤ"],[193,"ئ"],[194,"َ"],[195,"ِ"],[196,"ُ"],[197,"ّ"],[198,"ْ"],[199,"ً"],[200,"ٌ"],[201,"ٍ"],[202,"ٔ"],[203,"ٰ"],[204,"ٓ"],[208,"۰"],[209,"۱"],[210,"۲"],[211,"۳"],[212,"۴"],[213,"۵"],[214,"۶"],[215,"۷"],[216,"۸"],[217,"۹"],[218,"،"],[219,"؛"],[220,"؟"],[221,"۔"],[222,"("],[223,")"],[32," "]]);function Ut(t,e="auto"){return(e==="auto"?St(t):e)==="v3"?Tt(t):Ft(t)}function St(t){const e=t.slice(0,Math.min(512,t.length));let s=0;for(const n of e)n===4&&s++;return s/Math.max(e.length,1)>.05?"v1":"v3"}function Ft(t){const e=[],s=[];let n="",r=0;for(;r<t.length;){const a=t[r];if(a===12)n.trim()&&(e.push(n.trim()),n=""),s.push(e.length),r++;else if(a===10||a===13)n.trim()&&(e.push(n.trim()),n=""),r++;else if(a===4&&r+1<t.length){const i=kt.get(t[r+1]);i&&(n+=i),r+=2}else a===32?(n+=" ",r++):(a>=33&&a<=126&&(n+=String.fromCharCode(a)),r++)}return n.trim()&&e.push(n.trim()),{paragraphs:e,pageBreakIndices:s,filteredCount:0}}function Tt(t){const e=[],s=[];let n="";for(let r=0;r+1<t.length;r+=2){const a=t[r]|t[r+1]<<8;a===12?(n.trim()&&(e.push(n.trim()),n=""),s.push(e.length)):a===13||a===10||a===65535?n.trim()&&(e.push(n.trim()),n=""):a>=32&&(n+=String.fromCharCode(a))}return n.trim()&&e.push(n.trim()),{paragraphs:e,pageBreakIndices:s,filteredCount:0}}function It(t){if(t.length>=2&&t[0]===255&&t[1]===254)return"utf-16le";if(t.length>=2&&t[0]===254&&t[1]===255)return"utf-16be";if(t.length>=3&&t[0]===239&&t[1]===187&&t[2]===191)return"utf-8";const e=t.slice(0,Math.min(512,t.length));let s=0;for(const r of e)r===4&&s++;if(s/Math.max(e.length,1)>.05)return"inpage-v1v2";let n=0;for(let r=0;r+1<e.length;r+=2)e[r+1]===6&&n++;return n/Math.max(e.length/2,1)>.1?"inpage-v3":"utf-8"}var Rt=[8364,1662,8218,402,8222,8230,8224,8225,710,8240,1657,8249,1670,1688,1672,1681,1711,8216,8217,8220,8221,8226,8211,8212,1706,8482,1681,8250,1688,1722,1726,1729,160,1548,162,163,164,165,166,167,168,169,1726,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,1563,187,188,189,190,1567,1729,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,215,1591,1592,1593,1594,1600,1601,1602,1603,224,1604,226,1605,1606,1607,1608,231,232,1610,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,1740,251,252,8206,8207,1746];function Lt(t){let e="";for(const s of t){const n=s.charCodeAt(0);if(n<128){e+=s;continue}const r=Rt[n-128];e+=r!==void 0?String.fromCodePoint(r):s}return e}var Nt=[1569,1575,1576,1662,1578,1657,1579,1580,1670,1581,1582,1583,1672,1584,1585,1681,1586,1688,1587,1588,1589,1590,1591,1592,1593,1594,1601,1602,1705,1711,1604,1605,1606,1722,1608,1729,1726,1740,1746],Dt=new Map(Nt.map((t,e)=>[t,e+1]));function k(t){return[...U(t)].map(s=>(Dt.get(s.codePointAt(0)??0)??40).toString().padStart(2,"0")).join("")}function J(t,e){const s=k(t),n=k(e);return s<n?-1:s>n?1:0}function Pt(t){return[...t].sort(J)}var Mt=[["بھ","bh"],["پھ","ph"],["تھ","th"],["ٹھ","Th"],["جھ","jh"],["چھ","chh"],["دھ","dh"],["ڈھ","Dh"],["گھ","gh"],["کھ","kh"],["چ","ch"],["ش","sh"],["خ","kh"],["غ","gh"],["ژ","zh"],["ا","a"],["ب","b"],["پ","p"],["ت","t"],["ٹ","T"],["ث","s"],["ج","j"],["ح","h"],["د","d"],["ڈ","D"],["ذ","z"],["ر","r"],["ڑ","R"],["ز","z"],["س","s"],["ص","s"],["ض","z"],["ط","t"],["ظ","z"],["ع","'"],["ف","f"],["ق","q"],["ک","k"],["گ","g"],["ل","l"],["م","m"],["ن","n"],["ں","n"],["و","w"],["ہ","h"],["ھ","h"],["ء","'"],["ی","y"],["ے","ay"],["َ","a"],["ِ","i"],["ُ","u"]],Wt=[["chh","چ"],["بh","بھ"],["bh","بھ"],["ph","پھ"],["th","تھ"],["Th","ٹھ"],["jh","جھ"],["dh","دھ"],["Dh","ڈھ"],["gh","غ"],["kh","خ"],["sh","ش"],["zh","ژ"],["ch","چ"],["ay","ے"],["a","ا"],["b","ب"],["p","پ"],["t","ت"],["T","ٹ"],["s","س"],["j","ج"],["h","ہ"],["d","د"],["D","ڈ"],["z","ز"],["r","ر"],["R","ڑ"],["f","ف"],["q","ق"],["k","ک"],["g","گ"],["l","ل"],["m","م"],["n","ن"],["w","و"],["y","ی"],["i","ِ"],["u","ُ"]];function Ot(t){if(!t)return t;let e="",s=0;for(;s<t.length;){let n=!1;for(const[r,a]of Mt)if(t.startsWith(r,s)){e+=a,s+=r.length,n=!0;break}n||(e+=t[s],s++)}return e}function qt(t){if(!t)return t;let e="",s=0;for(;s<t.length;){let n=!1;for(const[r,a]of Wt)if(t.startsWith(r,s)){e+=a,s+=r.length,n=!0;break}n||(e+=t[s],s++)}return e}const b=t=>document.getElementById(t),o=t=>document.getElementById(t).value,Ht=t=>{try{return BigInt(o(t).trim()||"0")}catch{return 0n}},E=t=>document.getElementById(t).checked;function c(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function h(t){return Array.from(t).map(e=>{const s=e.codePointAt(0);return s>127?`\\u${s.toString(16).toUpperCase().padStart(4,"0")}`:e}).join("")}async function T(t,e){try{await navigator.clipboard.writeText(t),e.textContent="✓ Copied",e.classList.add("copied"),setTimeout(()=>{e.textContent="⎘ Copy",e.classList.remove("copied")},1800)}catch{e.textContent="✗ Error"}}function C(t,e,s="urdu",n){var i,u;const r=b(t),a=s==="urdu"?"result-urdu":"result-code";r.className="result-box ok",r.innerHTML=`
    <div class="result-top">
      <span class="result-lbl">Output</span>
      <div class="result-actions">
        <button class="copy-btn" id="${t}-copy">⎘ Copy</button>
        <button class="expand-btn" id="${t}-expand">⤢ Expand</button>
      </div>
    </div>
    <div class="result-content">
      <div class="${a}">${c(e)}</div>
      ${n?`<div class="result-meta">${c(n)}</div>`:""}
    </div>`,(i=b(`${t}-copy`))==null||i.addEventListener("click",v=>T(e,v.currentTarget)),(u=b(`${t}-expand`))==null||u.addEventListener("click",()=>jt("Output",t,"",e,s))}function g(t,e,s){var r;const n=b(t);n.className="result-box ok",n.innerHTML=`
    <div class="result-top">
      <span class="result-lbl">Output</span>
      <div class="result-actions">
        ${s?`<button class="copy-btn" id="${t}-copy">⎘ Copy</button>`:""}
      </div>
    </div>
    <div class="result-content">${e}</div>`,s&&((r=b(`${t}-copy`))==null||r.addEventListener("click",a=>T(s,a.currentTarget)))}function d(t,e){const s=b(t);s.className="result-box err",s.innerHTML=`
    <div class="result-top"><span class="result-lbl" style="color:#fb7185">Error</span></div>
    <div class="result-content"><div class="result-err">⚠ ${c(e)}</div></div>`}function jt(t,e,s,n,r){var u,v,y;(u=document.querySelector(".popup-overlay"))==null||u.remove();const a=document.createElement("div");a.className="popup-overlay";const i=r==="urdu";a.innerHTML=`
    <div class="popup-win">
      <div class="popup-head">
        <div><div class="popup-fn">${c(e)}()</div><div class="popup-title">${c(t)}</div></div>
        <button class="popup-close" id="pc">✕</button>
      </div>
      <div class="popup-body">
        
        <div class="popup-sec"><div class="popup-sec-lbl">📤 Output</div>
          ${i?`<div class="popup-urdu">${c(n)}</div>`:`<pre class="popup-pre" style="direction:ltr">${c(n)}</pre>`}
        </div>
        <div class="popup-sec"><div class="popup-sec-lbl">🔢 Unicode Escapes</div>
          <pre class="popup-pre" style="direction:ltr">${c(h(n))}</pre>
        </div>
        <div class="popup-sec">
          <button class="run-btn" id="pc-copy" style="width:100%;justify-content:center">⎘ Copy Output</button>
        </div>
      </div>
    </div>`,document.body.appendChild(a),a.addEventListener("click",x=>{x.target===a&&a.remove()}),(v=b("pc"))==null||v.addEventListener("click",()=>a.remove()),(y=b("pc-copy"))==null||y.addEventListener("click",async x=>T(n,x.currentTarget))}function p(t){var s;const e=(s=t.presets)!=null&&s.length?`<div class="presets">
         <span class="preset-label">Try:</span>
         ${t.presets.map((n,r)=>`
           <button class="preset-chip" data-preset="${t.resultId}-${r}">
             ${c(n.label)}
           </button>`).join("")}
       </div>`:"";return`
    <div class="test-card" id="card-${t.resultId}">
      <div class="card-head">
        <div class="card-head-left">
          <div class="card-fn">${t.fn}()</div>
          <div class="card-sig">${t.sig}</div>
        </div>
        <span class="card-badge" style="background:${t.color}18;color:${t.color};border:1px solid ${t.color}35">${t.badge}</span>
      </div>
      <div class="card-import">
        <span><span class="i-keyword">import</span> { <span class="i-name">${t.importFn}</span> } <span class="i-from">from</span> <span class="i-path">'@iamahsanmehmood/urdu-tools'</span></span>
        <button class="import-copy-btn" data-copy="import { ${t.importFn} } from '@iamahsanmehmood/urdu-tools'">⎘</button>
      </div>
      <div class="card-body">
        <div class="card-desc">${t.desc}</div>
        ${e}
        <div class="ctrl-group">
          ${t.body}
        </div>
        <div class="result-box" id="${t.resultId}">
          <div class="result-top"><span class="result-lbl">Output</span></div>
          <div class="result-content"><div class="result-placeholder">← Run to see result</div></div>
        </div>
      </div>
    </div>`}function l(t,e,s,n,r="input"){const a=n==="urdu"?"urdu-input":n==="latin"?"latin-input":"num-input",i=s.replace(/"/g,"&quot;");return r==="textarea"?`<div><div class="ctrl-label">${e}</div><textarea id="${t}" class="${a}" rows="3">${s}</textarea></div>`:`<div><div class="ctrl-label">${e}</div><input id="${t}" class="${a}" value="${i}" /></div>`}function m(t,e){return`<button class="run-btn" id="${e}">▶ ${t}</button>`}const N=[{id:"normalization",icon:"🔧",label:"Normalization",color:"#7c5cfc",count:7},{id:"search",icon:"🔍",label:"Search & Match",color:"#4f9cf9",count:3},{id:"numbers",icon:"🔢",label:"Numbers",color:"#f59e0b",count:4},{id:"tokenization",icon:"✂️",label:"Tokenization",color:"#22c55e",count:3},{id:"string-utils",icon:"📝",label:"String Utils",color:"#14b8a6",count:6},{id:"encoding",icon:"💾",label:"Encoding",color:"#fb923c",count:3},{id:"sorting",icon:"🔤",label:"Sorting",color:"#6366f1",count:2},{id:"transliteration",icon:"🔄",label:"Transliteration",color:"#f43f5e",count:2},{id:"analysis",icon:"🧬",label:"Analysis",color:"#a855f7",count:4}],w={"r-normalize":[{label:"Arabic Confusion",fields:{"n-text":"يه ملك وكتاب"}},{label:"With Diacritics",fields:{"n-text":"عِلمٌ وَالعَمَلُ"}},{label:"Zero-Width",fields:{"n-text":"علم‌ہے یہ‍بھی"}},{label:"Honorifics",fields:{"n-text":"محمدﷺ اور اللہﷻ"}}],"r-fingerprint":[{label:"Same word",fields:{"fp-a":"عِلمٌ","fp-b":"عَلم"}},{label:"Arabic/Urdu ي/ی",fields:{"fp-a":"یہ","fp-b":"يه"}}],"r-match":[{label:"Diacritic diff",fields:{"m-q":"عِلمٌ","m-t":"علم"}},{label:"Arabic vs Urdu",fields:{"m-q":"يه كتاب","m-t":"یہ کتاب"}},{label:"Hamza variant",fields:{"m-q":"أردو","m-t":"اردو"}}],"r-ntw":[{label:"1 Lakh",fields:{"ntw-n":"100000"}},{label:"1 Crore",fields:{"ntw-n":"10000000"}},{label:"1 Billion",fields:{"ntw-n":"1000000000"}},{label:"-42",fields:{"ntw-n":"-42"}}],"r-tokenize":[{label:"Mixed nums",fields:{"tok-t":"پاکستان ایک خوبصورت ملک ہے، جہاں ۱۲ کروڑ لوگ رہتے ہیں۔"}},{label:"English mix",fields:{"tok-t":"یہ AI پروجیکٹ 2024 میں شروع ہوا۔"}}],"r-sort":[{label:"Alphabet",fields:{"so-words":"ے،ا،ک،ب،پ،ت،علم،اردو،بہترین،زبان،پاکستان"}},{label:"Cities",fields:{"so-words":"لاہور،کراچی،اسلام آباد،پشاور،کوئٹہ،ملتان"}}],"r-to-roman":[{label:"پاکستان",fields:{"tr-u":"پاکستان زندہ باد"}},{label:"Aspirated",fields:{"tr-u":"بھارت چھوٹا بھائی"}}]};b("app").innerHTML=`
  <div id="header">
    <div class="h-left">
      <div class="h-logo">اُ</div>
      <div>
        <div class="h-title">Urdu Tools Playground</div>
        <div class="h-sub">@iamahsanmehmood/urdu-tools · v1.0.0 · 9 Modules</div>
      </div>
    </div>
    <div class="h-right">
      <span class="h-pill">284 Tests · TypeScript · .NET</span>
      <a class="h-docs" href="./docs/" title="Full API documentation">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <span class="h-link-text">Docs</span>
      </a>
      <a class="h-link" href="https://github.com/iamahsanmehmood/urdu-tools" target="_blank" rel="noopener">
        <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
        <span class="h-link-text">GitHub</span>
      </a>
      <a class="h-report" href="https://github.com/iamahsanmehmood/urdu-tools/issues/new/choose" target="_blank" rel="noopener" title="Report a bug or request a feature">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span class="h-link-text">Report</span>
      </a>
    </div>
  </div>

  <div id="mobile-nav">
    ${N.map(t=>`
      <button class="mod-btn ${t.id==="normalization"?"active":""}" id="mnav-${t.id}" data-module="${t.id}">
        <div class="mod-icon" style="background:${t.color}18;color:${t.color}">${t.icon}</div>
        ${t.label}
      </button>`).join("")}
  </div>

  <div class="layout">
    <div id="sidebar">
      <div class="sb-search-wrap">
        <input class="sb-search" id="sb-search" placeholder="🔍 Filter modules…" />
      </div>
      <div class="sb-section">
        <div class="sb-label">Modules</div>
        ${N.map(t=>`
          <button class="mod-btn ${t.id==="normalization"?"active":""}" id="nav-${t.id}" data-module="${t.id}">
            <div class="mod-icon" style="background:${t.color}18;color:${t.color}">${t.icon}</div>
            ${t.label}
            <span class="mod-count">${t.count}</span>
          </button>`).join("")}
      </div>
    </div>

    <div id="content">
      ${_t()}
      ${Kt()}
      ${Gt()}
      ${Vt()}
      ${Zt()}
      ${Qt()}
      ${Jt()}
      ${Yt()}
      ${Xt()}
    </div>
  </div>`;N.forEach(t=>{var e,s;(e=b(`nav-${t.id}`))==null||e.addEventListener("click",()=>_(t.id)),(s=b(`mnav-${t.id}`))==null||s.addEventListener("click",()=>_(t.id))});var K;(K=b("sb-search"))==null||K.addEventListener("input",t=>{const e=t.target.value.toLowerCase();document.querySelectorAll(".mod-btn").forEach(s=>{s.style.display=s.textContent.toLowerCase().includes(e)?"":"none"})});document.addEventListener("keydown",t=>{var e;if(t.key==="Enter"&&(t.ctrlKey||t.metaKey)||t.key==="F5"){const s=document.querySelector(".module-panel.active");(e=s==null?void 0:s.querySelector(".run-btn"))==null||e.click()}});document.querySelectorAll(".import-copy-btn").forEach(t=>{t.addEventListener("click",()=>T(t.dataset.copy,t))});document.querySelectorAll(".preset-chip").forEach(t=>{var a;const e=t.dataset.preset,[s,n]=e.split(/-(\d+)$/),r=(a=w[s])==null?void 0:a[Number(n)];r&&t.addEventListener("click",()=>{Object.entries(r.fields).forEach(([i,u])=>{const v=document.getElementById(i);v&&(v.value=u)})})});function _(t){var e,s,n,r;document.querySelectorAll(".module-panel").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".mod-btn").forEach(a=>a.classList.remove("active")),(e=b(`panel-${t}`))==null||e.classList.add("active"),(s=b(`nav-${t}`))==null||s.classList.add("active"),(n=b(`mnav-${t}`))==null||n.classList.add("active"),(r=b(`mnav-${t}`))==null||r.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}function A(t,e,s,n,r,a){return`
    <div class="mod-header">
      <div class="mod-tag" style="color:${e}">${s} Module ${n} of 9</div>
      <h1 class="mod-title">${r}</h1>
      <p class="mod-desc">${a}</p>
    </div>`}function _t(){return`<div class="module-panel active" id="panel-normalization">
    ${A("normalization","#7c5cfc","🔧",1,"Normalization",`12-layer deterministic pipeline — NFC → nbsp → alifMadda → numerals → zeroWidth → diacritics →
       honorifics → hamza → kashida → presentationForms → punctuationTrim → normalizeCharacters.
       Run before every DB write and before every search query.`)}
    <div class="tests-grid">

      ${p({fn:"normalize",sig:'<span class="t-kw">function</span> normalize(text: <span class="t-type">string</span>, options?: NormalizeOptions): <span class="t-type">string</span>',badge:"12-Layer Pipeline",color:"#7c5cfc",importFn:"normalize",resultId:"r-normalize",desc:"Deterministic 12-layer pipeline. Pass options to turn layers on/off. Default: NFC + nbsp + alifMadda + numerals + zeroWidth + diacritics + honorifics + hamza.",presets:w["r-normalize"],body:`
          ${l("n-text","Urdu Text","عِلمٌ اَور یہ‌ہے ي ه ك","urdu")}
          <div class="checks-row">
            <label class="ctrl-check"><input type="checkbox" id="n-kashida" checked />kashida</label>
            <label class="ctrl-check"><input type="checkbox" id="n-pres" />presentationForms</label>
            <label class="ctrl-check"><input type="checkbox" id="n-nc" checked />normalizeChars</label>
            <label class="ctrl-check"><input type="checkbox" id="n-pt" />punctuationTrim</label>
          </div>
          ${m("Normalize","btn-normalize")}`})}

      ${p({fn:"fingerprint",sig:'<span class="t-kw">function</span> fingerprint(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Equality Key",color:"#7c5cfc",importFn:"fingerprint",resultId:"r-fingerprint",desc:"Produces a canonical key — عِلمٌ and عَلم yield identical fingerprints. Use instead of === for all Urdu string comparisons.",presets:w["r-fingerprint"],body:`
          ${l("fp-a","Text A","عِلمٌ","urdu")}
          ${l("fp-b","Text B","عَلم","urdu")}
          ${m("Compare Fingerprints","btn-fingerprint")}`})}

      ${p({fn:"stripDiacritics",sig:'<span class="t-kw">function</span> stripDiacritics(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Harakat Layer",color:"#7c5cfc",importFn:"stripDiacritics",resultId:"r-strip-diacritics",desc:"Removes all harakat: zabar (فتحہ ◌َ), zer (کسرہ ◌ِ), pesh (ضمہ ◌ُ), tanwin, shadda, sukun. Essential before any search index write.",body:`
          ${l("sd-text","Text with diacritics","عِلمٌ وَالعَمَلُ نَبیؐ","urdu")}
          ${m("Strip Diacritics","btn-strip-diacritics")}`})}

      ${p({fn:"normalizeCharacters",sig:'<span class="t-kw">function</span> normalizeCharacters(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Arabic Fix",color:"#f59e0b",importFn:"normalizeCharacters",resultId:"r-normalize-chars",desc:"THE most critical fix: ي (U+064A) → ی (U+06CC), ك (U+0643) → ک (U+06A9), ه (U+0647) → ہ (U+06C1). Searching بھارت with Arabic ه returns zero DB results without this.",body:`
          ${l("nc-text","Mixed Arabic/Urdu (paste from Arabic sources)","يه ملك وكتاب","urdu")}
          ${m("Fix Arabic Characters","btn-normalize-chars")}`})}

      ${p({fn:"stripZeroWidth",sig:'<span class="t-kw">function</span> stripZeroWidth(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Invisible Chars",color:"#22c55e",importFn:"stripZeroWidth",resultId:"r-strip-zw",desc:'Removes ZWNJ (U+200C) and ZWJ (U+200D). Without this, "قلم" === "قلم" can return false if one string has an invisible joiner. Try the preset.',body:`
          ${l("zw-text","Text with hidden zero-width chars","علم‌ہے یہ‍بھی","urdu")}
          ${m("Strip Zero-Width","btn-strip-zw")}`})}

      ${p({fn:"normalizeAlif",sig:'<span class="t-kw">function</span> normalizeAlif(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Alif Variants",color:"#14b8a6",importFn:"normalizeAlif",resultId:"r-alif",desc:"Consolidates ا + madda (◌ٓ) → آ, and normalizes أ/إ/آ/ٱ variants. Different keyboards produce different code points for the same visual character.",body:`
          ${l("alif-text","Text with Alif variants","آب اور أردو إسلام ٱللہ","urdu")}
          ${m("Normalize Alif","btn-alif")}`})}

      ${p({fn:"normalizeNumerals",sig:'<span class="t-kw">function</span> normalizeNumerals(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Numeral Layer",color:"#f59e0b",importFn:"normalizeNumerals",resultId:"r-numerals",desc:"Converts Arabic-Indic (٠-٩) and Extended Arabic-Indic / Urdu (۰-۹) numerals to ASCII (0-9) for consistent numeric parsing.",body:`
          ${l("num-text","Text with Arabic/Urdu numerals","قیمت ۱۲۳ اور ٤٥٦ ہے","urdu")}
          ${m("Normalize Numerals","btn-numerals")}`})}
    </div>
  </div>`}function Kt(){return`<div class="module-panel" id="panel-search">
    ${A("search","#4f9cf9","🔍",2,"Search & Matching",`9-layer progressive strategy: exact → NFC → stripZeroWidth → stripDiacritics → normalizeAlif →
       stripHonorifics → normalizeHamza → trimPunctuation → compoundSplit. Returns which layer matched,
       so you know exactly why a match succeeded.`)}
    <div class="tests-grid">

      ${p({fn:"match",sig:'<span class="t-kw">function</span> match(query: <span class="t-type">string</span>, target: <span class="t-type">string</span>): MatchResult | <span class="t-type">null</span>',badge:"9-Layer Match",color:"#4f9cf9",importFn:"match",resultId:"r-match",desc:"Progressive matcher. Returns layer number + name so you understand why it matched. Layer 1=exact, Layer 3=strip diacritics, Layer 6=hamza normalize, etc.",presets:w["r-match"],body:`
          ${l("m-q","Query (what user typed)","عِلمٌ","urdu")}
          ${l("m-t","Target (what is in your DB/index)","علم","urdu")}
          ${m("Match","btn-match")}`})}

      ${p({fn:"fuzzyMatch",sig:'<span class="t-kw">function</span> fuzzyMatch(query: <span class="t-type">string</span>, candidates: <span class="t-type">string</span>[], threshold?: <span class="t-type">number</span>): <span class="t-type">string</span>[]',badge:"Levenshtein+LCS",color:"#4f9cf9",importFn:"fuzzyMatch",resultId:"r-fuzzy",desc:"Hybrid Levenshtein + LCS distance, threshold 0–1 (default 0.5). Returns candidates above threshold sorted by score. Best for autocomplete and spell-checking.",body:`
          ${l("fm-q","Query","کتاب","urdu")}
          ${l("fm-cands","Candidates (comma separated)","علم، کتابیں، کتب، قلم، کتاب، کتابچہ","urdu")}
          ${m("Fuzzy Match","btn-fuzzy")}`})}

      ${p({fn:"getAllNormalizations",sig:'<span class="t-kw">function</span> getAllNormalizations(word: <span class="t-type">string</span>): <span class="t-type">string</span>[]',badge:"DB Fallback Ladder",color:"#4f9cf9",importFn:"getAllNormalizations",resultId:"r-all-norms",desc:'Returns 8 progressively looser forms. Run DB queries against each form in order until one hits. Eliminates the "zero results" problem for almost all Urdu inputs.',body:`
          ${l("gn-w","Word to get all forms of","عِلمٌ","urdu")}
          ${m("Get All Forms","btn-all-norms")}`})}
    </div>
  </div>`}function Gt(){return`<div class="module-panel" id="panel-numbers">
    ${A("numbers","#f59e0b","🔢",3,"Numbers",`BigInt throughout — South Asian grouping: ہزار (1K) لاکھ (100K) کروڑ (10M) ارب (1B) کھرب (1T) نیل (10¹⁵).
       Full gender agreement: مذکر/مؤنث. Ordinals. PKR/INR currency with paisa.`)}
    <div class="tests-grid">

      ${p({fn:"numberToWords",sig:'<span class="t-kw">function</span> numberToWords(n: <span class="t-type">bigint</span>, opts?: WordOpts): <span class="t-type">string</span>',badge:"Cardinal / Ordinal",color:"#f59e0b",importFn:"numberToWords",resultId:"r-ntw",desc:"BigInt → Urdu words. Gender agreement for ordinals: پہلا/پہلی, دوسرا/دوسری. Handles negatives and numbers up to نیل (10¹⁵).",presets:w["r-ntw"],body:`
          ${l("ntw-n","Number (BigInt safe)","10000000","num")}
          <div class="checks-row">
            <label class="ctrl-check"><input type="checkbox" id="ntw-ord" />Ordinal</label>
            <select class="ctrl-select" id="ntw-gender" style="width:auto;margin-top:0">
              <option value="">No gender (default)</option>
              <option value="masculine">Masculine — مذکر</option>
              <option value="feminine">Feminine — مؤنث</option>
            </select>
          </div>
          ${m("Convert to Words","btn-ntw")}`})}

      ${p({fn:"formatCurrency",sig:'<span class="t-kw">function</span> formatCurrency(amount: <span class="t-type">number</span>, currency: <span class="t-str">"PKR"</span> | <span class="t-str">"INR"</span>): <span class="t-type">string</span>',badge:"PKR / INR",color:"#f59e0b",importFn:"formatCurrency",resultId:"r-currency",desc:"Formats float as Urdu currency text with paisa. PKR → روپے/پیسے, INR → روپیہ/پیسہ. Handles singular/plural.",body:`
          ${l("fc-amt","Amount (with decimal for paisa)","1505.50","num")}
          <select class="ctrl-select" id="fc-cur"><option value="PKR">PKR — پاکستانی روپے</option><option value="INR">INR — بھارتی روپیہ</option></select>
          ${m("Format Currency","btn-currency")}`})}

      ${p({fn:"wordsToNumber",sig:'<span class="t-kw">function</span> wordsToNumber(text: <span class="t-type">string</span>): <span class="t-type">bigint</span>',badge:"Parse Urdu → BigInt",color:"#f59e0b",importFn:"wordsToNumber",resultId:"r-wtn",desc:"Inverse of numberToWords. Parses compound Urdu number expressions back to BigInt.",body:`
          ${l("wtn-t","Urdu number words","ایک کروڑ پانچ لاکھ","urdu")}
          ${m("Parse → BigInt","btn-wtn")}`})}

      ${p({fn:"toUrduNumerals",sig:'<span class="t-kw">function</span> toUrduNumerals(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"ASCII → ۱۲۳",color:"#f59e0b",importFn:"toUrduNumerals",resultId:"r-urdu-num",desc:"Converts ASCII digits to Extended Arabic-Indic numerals (۰-۹). Used in formal Urdu printing, newspaper mastheads, dates.",body:`
          ${l("un-t","ASCII number or date","2024-12-25 at 09:30","latin")}
          ${m("To Urdu Numerals","btn-urdu-num")}`})}
    </div>
  </div>`}function Vt(){return`<div class="module-panel" id="panel-tokenization">
    ${A("tokenization","#22c55e","✂️",4,"Tokenization",`ZWNJ-aware splitting preserves compound words. Sentences split on ۔ ؟ ! only — ، (Urdu comma)
       and ؛ (Urdu semicolon) are NOT sentence boundaries. Returns typed tokens for NLP pipelines.`)}
    <div class="tests-grid">

      ${p({fn:"tokenize",sig:'<span class="t-kw">function</span> tokenize(text: <span class="t-type">string</span>): Token[]',badge:"Typed Tokens",color:"#22c55e",importFn:"tokenize",resultId:"r-tokenize",desc:"Returns typed token objects: urdu-word, punctuation, numeral, latin, whitespace. Color-coded chips show each type. Handles mixed Urdu+English+Numbers.",presets:w["r-tokenize"],body:`
          ${l("tok-t","Urdu text","پاکستان ایک خوبصورت ملک ہے، جہاں ۱۲ کروڑ لوگ رہتے ہیں۔","urdu","textarea")}
          ${m("Tokenize","btn-tokenize")}`})}

      ${p({fn:"sentences",sig:'<span class="t-kw">function</span> sentences(text: <span class="t-type">string</span>): <span class="t-type">string</span>[]',badge:"Sentence Split",color:"#22c55e",importFn:"sentences",resultId:"r-sentences",desc:"Splits on ۔ ؟ ! only. The ، (U+060C) Arabic comma and ؛ (U+061B) Arabic semicolon are treated as internal punctuation, never as sentence boundaries.",body:`
          ${l("sent-t","Multi-sentence text","پہلا جملہ۔ دوسرا جملہ؟ تیسرا جملہ! چوتھا، پانچواں — یہ ایک ہی ہے۔","urdu","textarea")}
          ${m("Split Sentences","btn-sentences")}`})}

      ${p({fn:"ngrams",sig:'<span class="t-kw">function</span> ngrams(tokens: <span class="t-type">string</span>[], n: <span class="t-type">number</span>): <span class="t-type">string</span>[][]',badge:"ML Feature Extraction",color:"#22c55e",importFn:"ngrams",resultId:"r-ngrams",desc:"Sliding window n-grams over tokenized words. n=2 gives bigrams (two consecutive words), n=3 trigrams, etc. Essential for language model training.",body:`
          ${l("ng-t","Urdu sentence","ایک دو تین چار پانچ چھ","urdu")}
          ${l("ng-n","N (gram size)","2","num")}
          ${m("Generate N-Grams","btn-ngrams")}`})}
    </div>
  </div>`}function Zt(){return`<div class="module-panel" id="panel-string-utils">
    ${A("string-utils","#14b8a6","📝",5,"String Utilities",`RTL-aware string operations. charCount uses grapheme clusters — عِلم counts as 3, not 4 code units.
       decodeHtmlEntities MUST be called before normalize() for TinyMCE/Quill output.`)}
    <div class="tests-grid">

      ${p({fn:"reverse",sig:'<span class="t-kw">function</span> reverse(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Word-Order Reverse",color:"#14b8a6",importFn:"reverse",resultId:"r-reverse",desc:"Reverses WORD ORDER — each word's internal letter sequence is preserved so Arabic shaping stays intact. Not character reversal.",body:`
          ${l("rv-t","Urdu sentence","پاکستان ہندوستان ایران چین","urdu")}
          ${m("Reverse Word Order","btn-reverse")}`})}

      ${p({fn:"truncate",sig:'<span class="t-kw">function</span> truncate(text: <span class="t-type">string</span>, length: <span class="t-type">number</span>, suffix?: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Smart Truncate",color:"#14b8a6",importFn:"truncate",resultId:"r-truncate",desc:'Truncates at word boundaries — never mid-syllable. Default suffix "…". Safe for RTL card titles and previews.',body:`
          ${l("tr-t","Long Urdu text","یہ ایک بہت لمبا جملہ ہے جو کہ کافی طویل ہے اور ختم نہیں ہوتا","urdu")}
          ${l("tr-l","Max grapheme length","20","num")}
          ${m("Truncate","btn-truncate")}`})}

      ${p({fn:"wordCount / charCount",sig:'<span class="t-kw">function</span> wordCount(text): <span class="t-type">number</span> | charCount(text): <span class="t-type">number</span>',badge:"Grapheme Counting",color:"#14b8a6",importFn:"wordCount, charCount",resultId:"r-count",desc:"wordCount splits by whitespace. charCount counts grapheme clusters — عِلم is 3 clusters even though it's 4 code points (ع + ِ + ل + م).",body:`
          ${l("cnt-t","Urdu text","عِلم وَالعَمَلُ نَبیؐ","urdu")}
          ${m("Count","btn-count")}`})}

      ${p({fn:"extractUrdu",sig:'<span class="t-kw">function</span> extractUrdu(text: <span class="t-type">string</span>): <span class="t-type">string</span>[]',badge:"Mixed Text Extraction",color:"#14b8a6",importFn:"extractUrdu",resultId:"r-extract",desc:"Pulls all Urdu/Arabic script segments from mixed-language text. Returns segments in order of appearance.",body:`
          ${l("ex-t","Mixed text (English + Urdu)","The word علم means knowledge and عمل means action","latin")}
          ${m("Extract Urdu","btn-extract")}`})}

      ${p({fn:"decodeHtmlEntities",sig:'<span class="t-kw">function</span> decodeHtmlEntities(html: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Editor Output Fix",color:"#14b8a6",importFn:"decodeHtmlEntities",resultId:"r-html-ent",desc:"ALWAYS call before normalize() when input comes from TinyMCE/Quill. Editors convert U+2019 Izafat apostrophe → &amp;rsquo; breaking all compound word lookups.",body:`
          ${l("he-t","HTML entity text (from editor)","کتاب&rsquo;خانہ علم&nbsp;ہے &amp; مزید &ldquo;اردو&rdquo;","latin")}
          ${m("Decode HTML Entities","btn-html-ent")}`})}

      ${p({fn:"pad",sig:'<span class="t-kw">function</span> pad(text: <span class="t-type">string</span>, length: <span class="t-type">number</span>, char?: <span class="t-type">string</span>, dir?: <span class="t-str">"start"</span>|<span class="t-str">"end"</span>): <span class="t-type">string</span>',badge:"RTL-Safe Padding",color:"#14b8a6",importFn:"pad",resultId:"r-pad",desc:'Pads string to given codepoint length. Works correctly with multi-byte Urdu characters. Direction: "start" (default) adds to right in RTL context.',body:`
          ${l("pad-t","Urdu text","علم","urdu")}
          ${l("pad-l","Target length","8","num")}
          ${l("pad-c","Pad character"," ","latin")}
          ${m("Pad","btn-pad")}`})}
    </div>
  </div>`}function Qt(){return`<div class="module-panel" id="panel-encoding">
    ${A("encoding","#fb923c","💾",6,"Encoding",`Legacy Urdu encoding support. InPage v1/v2 use 0x04-prefix byte pairs. InPage v3 uses UTF-16LE.
       Windows-1256 (CP1256) is common in older Arabic/Urdu Windows software. All converters produce clean Unicode.`)}
    <div class="tests-grid">

      ${p({fn:"detectEncoding",sig:'<span class="t-kw">function</span> detectEncoding(buffer: Uint8Array): Encoding',badge:"Auto Detection",color:"#fb923c",importFn:"detectEncoding",resultId:"r-detect-enc",desc:"Detects: utf-8, utf-16le (BOM), utf-16be (BOM), inpage-v1v2 (0x04 byte density > 5%), inpage-v3 (UTF-16LE with 0x06xx Urdu pairs). Input as hex bytes.",body:`
          ${l("de-hex","Hex bytes (space-separated)","FF FE 27 06 28 06","latin")}
          ${m("Detect Encoding","btn-detect-enc")}`})}

      ${p({fn:"decodeInpage",sig:'<span class="t-kw">function</span> decodeInpage(buffer: Uint8Array, version: InpageVersion): InpageDecodeResult',badge:"InPage Binary",color:"#fb923c",importFn:"decodeInpage",resultId:"r-inpage",desc:'Decodes InPage binary format to Unicode paragraphs. Version "v1" for classic InPage, "v3" for newer UTF-16LE format, "auto" for automatic detection.',body:`
          ${l("ip-hex","Hex bytes (InPage binary)","04 81 20 04 83","latin")}
          <select class="ctrl-select" id="ip-ver">
            <option value="auto">auto — detect version</option>
            <option value="v1">v1 — classic InPage</option>
            <option value="v3">v3 — UTF-16LE InPage</option>
          </select>
          ${m("Decode InPage","btn-inpage")}`})}

      ${p({fn:"convertWindows1256ToUnicode",sig:'<span class="t-kw">function</span> convertWindows1256ToUnicode(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"CP1256 → Unicode",color:"#fb923c",importFn:"convertWindows1256ToUnicode",resultId:"r-win1256",desc:"Converts Windows-1256 (CP1256) encoded strings to Unicode. Common in old Arabic/Urdu Windows apps, emails, and legacy databases. Bytes above 0x7F are remapped.",body:`
          ${l("w1-text","Win-1256 string (byte values as \\xFF escapes or paste raw)","\\x81\\xc1\\xff","latin")}
          ${m("Convert CP1256 → Unicode","btn-win1256")}`})}
    </div>
  </div>`}function Jt(){return`<div class="module-panel" id="panel-sorting">
    ${A("sorting","#6366f1","🔤",7,"Urdu Sorting",`39-letter canonical order: ء ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ہ ھ ی ے.
       Diacritics stripped before comparison. علم and عِلم sort to the same position.`)}
    <div class="tests-grid">

      ${p({fn:"sort",sig:'<span class="t-kw">function</span> sort(words: <span class="t-type">string</span>[], reverse?: <span class="t-type">boolean</span>): <span class="t-type">string</span>[]',badge:"Urdu Collation",color:"#6366f1",importFn:"sort",resultId:"r-sort",desc:"Sorts using the 39-letter canonical Urdu alphabet. Diacritics stripped before key generation — عِلم and علم sort identically.",presets:w["r-sort"],body:`
          ${l("so-words","Words (comma or newline separated)","ے،ا،ک،ب،پ،ت،علم،اردو،بہترین،زبان،پاکستان","urdu","textarea")}
          <label class="ctrl-check"><input type="checkbox" id="so-rev" />Reverse order (ے → ء)</label>
          ${m("Sort in Urdu Alphabet Order","btn-sort")}`})}

      ${p({fn:"compare / sortKey",sig:'<span class="t-kw">function</span> compare(a: <span class="t-type">string</span>, b: <span class="t-type">string</span>): <span class="t-type">number</span>',badge:"Collation Compare",color:"#6366f1",importFn:"compare, sortKey",resultId:"r-compare",desc:"compare() returns &lt;0 if A comes before B in Urdu alphabet, 0 if equal, &gt;0 if A comes after. sortKey() returns the raw deterministic key string.",body:`
          ${l("cmp-a","String A","ب","urdu")}
          ${l("cmp-b","String B","ا","urdu")}
          ${m("Compare","btn-compare")}`})}
    </div>
  </div>`}function Yt(){return`<div class="module-panel" id="panel-transliteration">
    ${A("transliteration","#f43f5e","🔄",8,"Transliteration",`FSM-based Urdu ↔ Roman. 18 aspirated digraphs: بھ→bh, پھ→ph, تھ→th, ٹھ→Th, جھ→jh, چھ→chh,
       دھ→dh, ڈھ→Dh, کھ→kh, گھ→gh + 8 more. Digraph priority: بھارت → "bharat" not "b"+"harat".`)}
    <div class="tests-grid">

      ${p({fn:"toRoman",sig:'<span class="t-kw">function</span> toRoman(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Urdu → Roman (FSM)",color:"#f43f5e",importFn:"toRoman",resultId:"r-to-roman",desc:'Finite-state machine converts with digraph priority: بھارت → "bharat". All 18 aspirated consonants handled correctly. Good for search index aliases.',presets:w["r-to-roman"],body:`
          ${l("tr-u","Urdu text","پاکستان زندہ باد بھارت چھوٹا","urdu")}
          ${m("To Roman","btn-to-roman")}`})}

      ${p({fn:"fromRoman",sig:'<span class="t-kw">function</span> fromRoman(text: <span class="t-type">string</span>): <span class="t-type">string</span>',badge:"Roman → Urdu (Trie)",color:"#f43f5e",importFn:"fromRoman",resultId:"r-from-roman",desc:'Trie-based best-effort Roman-to-Urdu conversion. NOT round-trip safe (vowels are ambiguous). Best for search autocomplete: "pakistan" → "پاکستان".',body:`
          ${l("fr-r","Roman Urdu (phonetic)","pakistan zindabad","latin")}
          ${m("From Roman","btn-from-roman")}`})}
    </div>
  </div>`}function Xt(){return`<div class="module-panel" id="panel-analysis">
    ${A("analysis","#a855f7","🧬",9,"Text Analysis",`Script detection, RTL directionality, Urdu density scoring, per-character classification.
       Use getUrduDensity() to decide rendering direction for user-generated content.`)}
    <div class="tests-grid">

      ${p({fn:"getScript / isRTL",sig:'<span class="t-kw">function</span> getScript(text: <span class="t-type">string</span>): ScriptFamily',badge:"Script Detection",color:"#a855f7",importFn:"getScript, isRTL",resultId:"r-script",desc:'getScript() returns: "urdu" | "arabic" | "latin" | "mixed" | "numeric" | "other". isRTL() returns boolean — use for dynamic dir attribute on user content.',body:`
          ${l("sc-t","Text to analyse","یہ AI ٹیکنالوجی 2024 میں بہت آگے گئی۔","urdu")}
          ${m("Analyse Script","btn-script")}`})}

      ${p({fn:"getUrduDensity",sig:'<span class="t-kw">function</span> getUrduDensity(text: <span class="t-type">string</span>): <span class="t-type">number</span>',badge:"Density Score 0–1",color:"#a855f7",importFn:"getUrduDensity",resultId:"r-density",desc:"Returns 0–1 ratio of Urdu-specific characters. Use as threshold (> 0.3) to decide RTL rendering. Arabic letters score low — Urdu-specific letters (پ ٹ چ ژ ڈ ڑ گ ں ہ ھ ی ے) score high.",body:`
          ${l("dn-t","Text (try pure Urdu vs mixed)","پاکستان ایک اسلامی جمہوری ملک ہے","urdu")}
          ${m("Get Density","btn-density")}`})}

      ${p({fn:"classifyChar",sig:'<span class="t-kw">function</span> classifyChar(cp: <span class="t-type">number</span>): CharClass',badge:"Per-Character",color:"#a855f7",importFn:"classifyChar",resultId:"r-classify",desc:"Returns CharClass for each character: UrduLetter, ArabicLetter, Diacritic, Numeral, Punctuation, Latin, Whitespace, Other. Shows a table with codepoints.",body:`
          ${l("cl-t","Text to classify character-by-character","علم۱ہے!A","urdu")}
          ${m("Classify Characters","btn-classify")}`})}

      ${p({fn:"isUrduChar",sig:'<span class="t-kw">function</span> isUrduChar(char: <span class="t-type">string</span>): <span class="t-type">boolean</span>',badge:"Single Char Check",color:"#a855f7",importFn:"isUrduChar",resultId:"r-is-urdu",desc:"Returns true only for Urdu-specific codepoints (not general Arabic). پ ٹ چ ڈ ژ ڑ گ ں ہ ھ ی ے are Urdu-specific; ب is shared Arabic/Urdu.",body:`
          ${l("iu-t","Character to check (single character)","پ","urdu")}
          ${m("Check isUrduChar","btn-is-urdu")}`})}
    </div>
  </div>`}function f(t,e){var s;(s=document.getElementById(t))==null||s.addEventListener("click",e)}f("btn-normalize",()=>{try{const t=o("n-text"),e=S(t,{kashida:E("n-kashida"),presentationForms:E("n-pres"),normalizeCharacters:E("n-nc"),punctuationTrim:E("n-pt")}),s=e!==t;g("r-normalize",`
      <div class="ba-box">
        <div class="ba-side">
          <div class="ba-label">Before</div>
          <div class="ba-val">${c(t)}</div>
          <div class="result-meta">${h(t)}</div>
        </div>
        <div class="ba-arrow">→</div>
        <div class="ba-side">
          <div class="ba-label">After</div>
          <div class="ba-val" style="color:${s?"var(--green)":"var(--text-2)"}">${c(e)}</div>
          <div class="result-meta">${h(e)}</div>
        </div>
      </div>
      <div class="result-meta" style="margin-top:8px">${s?"✓ Text was changed":"● No change needed"}</div>`,e)}catch(t){d("r-normalize",String(t))}});f("btn-fingerprint",()=>{try{const t=o("fp-a"),e=o("fp-b"),s=q(t),n=q(e),r=s===n;g("r-fingerprint",`
      <div class="cmp-row">
        <div class="cmp-in">${c(t)}</div><div class="cmp-arr">→</div>
        <div class="cmp-out" style="font-family:var(--font-code);font-size:12px;color:var(--blue)">${c(s)}</div>
      </div>
      <div class="cmp-row">
        <div class="cmp-in">${c(e)}</div><div class="cmp-arr">→</div>
        <div class="cmp-out" style="font-family:var(--font-code);font-size:12px;color:var(--blue)">${c(n)}</div>
      </div>
      <div style="margin-top:10px">
        <span class="match-badge ${r?"yes":"no"}">${r?"✓ Same fingerprint — strings are equal":"✗ Different fingerprints — strings are not equal"}</span>
      </div>`,t+" vs "+e)}catch(t){d("r-fingerprint",String(t))}});f("btn-strip-diacritics",()=>{try{const t=o("sd-text"),e=U(t);C("r-strip-diacritics",e,"urdu",`Before: ${h(t)} | After: ${h(e)}`)}catch(t){d("r-strip-diacritics",String(t))}});f("btn-normalize-chars",()=>{try{const t=o("nc-text"),e=G(t);g("r-normalize-chars",`
      <div class="ba-box">
        <div class="ba-side"><div class="ba-label">Before (Arabic)</div><div class="ba-val">${c(t)}</div><div class="result-meta">${h(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side"><div class="ba-label">After (Urdu)</div><div class="ba-val" style="color:var(--green)">${c(e)}</div><div class="result-meta">${h(e)}</div></div>
      </div>`,e)}catch(t){d("r-normalize-chars",String(t))}});f("btn-strip-zw",()=>{try{const t=o("zw-text"),e=M(t);C("r-strip-zw",e,"urdu",`Removed ${t.length-e.length} zero-width char(s) | After: ${h(e)}`)}catch(t){d("r-strip-zw",String(t))}});f("btn-alif",()=>{try{const t=o("alif-text"),e=W(t);C("r-alif",e,"urdu",`Before: ${h(t)} | After: ${h(e)}`)}catch(t){d("r-alif",String(t))}});f("btn-numerals",()=>{try{const t=o("num-text"),e=nt(t);C("r-numerals",e,"urdu",`Before: ${h(t)} | After: ${h(e)}`)}catch(t){d("r-numerals",String(t))}});f("btn-match",()=>{try{const t=o("m-q"),e=o("m-t"),s=ct(t,e);s.matched?g("r-match",`
        <span class="match-badge yes">✓ Matched</span>
        <div class="match-layer">Layer: <strong>${c(s.layer??"")}</strong></div>
        <div class="result-meta" style="margin-top:8px">Normalized query: ${h(s.normalizedQuery)} → target: ${h(s.normalizedTarget)}</div>`,"matched"):g("r-match",'<span class="match-badge no">✗ No match — even after all 9 normalization layers</span>',"no match")}catch(t){d("r-match",String(t))}});f("btn-fuzzy",()=>{try{const t=o("fm-q"),e=o("fm-cands").split(/[,،\n]/).map(n=>n.trim()).filter(Boolean),s=mt(t,e);if(!s){g("r-fuzzy",'<div class="result-placeholder">No candidate scored above threshold 0.5</div>');return}g("r-fuzzy",`
      <div class="word-list">
        <div class="word-item">
          <span class="word-item-n">Best</span>
          <span class="word-item-t">${c(s.candidate)}</span>
          <span class="word-item-n" style="font-size:10px;opacity:0.7">score: ${s.score.toFixed(2)}</span>
        </div>
      </div>
      <div class="result-meta" style="margin-top:6px">Hybrid Levenshtein+LCS score out of 1.0 — threshold 0.5</div>`,s.candidate)}catch(t){d("r-fuzzy",String(t))}});f("btn-all-norms",()=>{try{const t=pt(o("gn-w"));g("r-all-norms",`
      <div class="norm-ladder">
        ${t.map((e,s)=>`
          <div class="norm-step">
            <span class="norm-step-n">${s+1}</span>
            <span class="norm-step-v">${c(e)}</span>
            <span class="norm-step-tag">${s===0?"original":s===t.length-1?"most loose":"layer "+s}</span>
          </div>`).join("")}
      </div>
      <div class="result-meta" style="margin-top:8px">${t.length} forms — try DB query with each until you get results</div>`,t.join(`
`))}catch(t){d("r-all-norms",String(t))}});f("btn-ntw",()=>{try{const t=Ht("ntw-n"),e=E("ntw-ord"),s=o("ntw-gender")||void 0,n=B(t,{ordinal:e,gender:s});C("r-ntw",n,"urdu",`Input: ${t.toLocaleString()} | ordinal: ${e} | gender: ${s||"none"}`)}catch(t){d("r-ntw",String(t))}});f("btn-currency",()=>{try{const t=bt(parseFloat(o("fc-amt")),o("fc-cur"));C("r-currency",t,"urdu",`${o("fc-amt")} ${o("fc-cur")}`)}catch(t){d("r-currency",String(t))}});f("btn-wtn",()=>{try{const t=ht(o("wtn-t"));C("r-wtn",t.toString(),"code",`Parsed BigInt: ${t.toLocaleString()}`)}catch(t){d("r-wtn",String(t))}});f("btn-urdu-num",()=>{try{const t=rt(o("un-t"));C("r-urdu-num",t,"urdu",`Before: ${o("un-t")} | After: ${h(t)}`)}catch(t){d("r-urdu-num",String(t))}});f("btn-tokenize",()=>{try{const t=Q(o("tok-t")),e=t.map(n=>`<span class="token-chip ${n.type}" title="${n.type}: U+${(n.text.codePointAt(0)||0).toString(16).toUpperCase()}">${c(n.text)}</span>`).join(""),s={};t.forEach(n=>{s[n.type]=(s[n.type]||0)+1}),g("r-tokenize",`
      <div class="token-chips">${e}</div>
      <div class="result-meta" style="margin-top:8px">
        ${Object.entries(s).map(([n,r])=>`${n}: ${r}`).join(" · ")} · total: ${t.length}
      </div>`,t.map(n=>n.text).join(" "))}catch(t){d("r-tokenize",String(t))}});f("btn-sentences",()=>{try{const t=$t(o("sent-t"));g("r-sentences",`
      <div class="word-list">
        ${t.map((e,s)=>`<div class="word-item"><span class="word-item-n">#${s+1}</span><span class="word-item-t" style="font-size:14px">${c(e)}</span></div>`).join("")}
      </div>
      <div class="result-meta" style="margin-top:6px">${t.length} sentence(s)</div>`,t.join(`
`))}catch(t){d("r-sentences",String(t))}});f("btn-ngrams",()=>{try{const t=Q(o("ng-t")).filter(n=>n.type==="urdu-word").map(n=>n.text),e=Math.max(1,parseInt(o("ng-n"))||2),s=Ct(t,e);g("r-ngrams",`
      <div class="word-list">
        ${s.map((n,r)=>`<div class="word-item"><span class="word-item-n">#${r+1}</span><span class="word-item-t" style="font-size:13px">[${n.map(a=>`"${c(a)}"`).join(", ")}]</span></div>`).join("")}
      </div>
      <div class="result-meta" style="margin-top:6px">${s.length} ${e}-gram(s) from ${t.length} tokens</div>`,JSON.stringify(s))}catch(t){d("r-ngrams",String(t))}});f("btn-reverse",()=>{try{C("r-reverse",At(o("rv-t")),"urdu")}catch(t){d("r-reverse",String(t))}});f("btn-truncate",()=>{try{const t=o("tr-t"),e=parseInt(o("tr-l"))||20,s=wt(t,e);C("r-truncate",s,"urdu",`Input: ${[...t].length} graphemes → Output: ${[...s].length} graphemes (limit: ${e})`)}catch(t){d("r-truncate",String(t))}});f("btn-count",()=>{try{const t=o("cnt-t"),e=Et(t),s=j(t),n=j(U(t));g("r-count",`
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-val">${e}</div><div class="stat-lbl">Words</div></div>
        <div class="stat-box"><div class="stat-val">${s}</div><div class="stat-lbl">Graphemes</div></div>
        <div class="stat-box"><div class="stat-val">${n}</div><div class="stat-lbl">Base chars</div></div>
        <div class="stat-box"><div class="stat-val">${t.length}</div><div class="stat-lbl">Code units</div></div>
      </div>`,`words:${e} graphemes:${s}`)}catch(t){d("r-count",String(t))}});f("btn-extract",()=>{try{const t=zt(o("ex-t"));g("r-extract",`
      <div class="word-list">
        ${t.map((e,s)=>`<div class="word-item"><span class="word-item-n">#${s+1}</span><span class="word-item-t">${c(e)}</span></div>`).join("")}
      </div>
      <div class="result-meta" style="margin-top:6px">${t.length} segment(s) extracted</div>`,t.join(" | "))}catch(t){d("r-extract",String(t))}});f("btn-html-ent",()=>{try{const t=o("he-t"),e=Bt(t);g("r-html-ent",`
      <div class="ba-box">
        <div class="ba-side" style="direction:ltr;text-align:left"><div class="ba-label">Before (HTML)</div><div class="ba-val" style="font-family:var(--font-code);font-size:12px;color:var(--text-1)">${c(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side"><div class="ba-label">After (Unicode)</div><div class="ba-val">${c(e)}</div><div class="result-meta">${h(e)}</div></div>
      </div>`,e)}catch(t){d("r-html-ent",String(t))}});f("btn-pad",()=>{try{const t=o("pad-t"),e=parseInt(o("pad-l"))||8,s=o("pad-c")||" ",n=xt(t,e,s);g("r-pad",`
      <div class="ba-box">
        <div class="ba-side"><div class="ba-label">Before (${[...t].length} chars)</div><div class="ba-val">${c(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side"><div class="ba-label">After (${[...n].length} chars)</div><div class="ba-val">${c(n)}</div></div>
      </div>`,n)}catch(t){d("r-pad",String(t))}});f("btn-detect-enc",()=>{try{const e=o("de-hex").trim().split(/\s+/).map(r=>parseInt(r,16)).filter(r=>!isNaN(r)),s=new Uint8Array(e),n=It(s);g("r-detect-enc",`
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <span class="match-badge yes" style="font-size:14px">📡 ${c(n)}</span>
      </div>
      <div class="result-meta">Input: [${e.map(r=>"0x"+r.toString(16).toUpperCase().padStart(2,"0")).join(", ")}] (${e.length} bytes)</div>`,n)}catch(t){d("r-detect-enc",String(t))}});f("btn-inpage",()=>{try{const e=o("ip-hex").trim().split(/\s+/).map(a=>parseInt(a,16)).filter(a=>!isNaN(a)),s=new Uint8Array(e),n=o("ip-ver"),r=Ut(s,n);g("r-inpage",`
      <div class="word-list">
        ${r.paragraphs.map((a,i)=>`<div class="word-item"><span class="word-item-n">¶${i+1}</span><span class="word-item-t">${c(a)||'<em style="opacity:0.4">empty</em>'}</span></div>`).join("")}
      </div>
      <div class="result-meta" style="margin-top:6px">${r.paragraphs.length} paragraph(s) · ${r.pageBreakIndices.length} page break(s)</div>`,r.paragraphs.join(`
`))}catch(t){d("r-inpage",String(t))}});f("btn-win1256",()=>{try{const t=o("w1-text"),e=t.replace(/\\x([0-9a-fA-F]{2})/g,(n,r)=>String.fromCharCode(parseInt(r,16))),s=Lt(e);C("r-win1256",s,"urdu",`Input: "${c(t)}" | Unicode: ${h(s)}`)}catch(t){d("r-win1256",String(t))}});f("btn-sort",()=>{try{const e=o("so-words").split(/[,،\n]/).map(r=>r.trim()).filter(Boolean),s=E("so-rev"),n=Pt(e,s);g("r-sort",`
      <div class="word-list">
        ${n.map((r,a)=>`<div class="word-item"><span class="word-item-n">${a+1}</span><span class="word-item-t">${c(r)}</span><span class="word-item-n" style="font-size:9px">${c(h(k(r)).slice(0,20))}</span></div>`).join("")}
      </div>
      <div class="result-meta" style="margin-top:6px">${n.length} items sorted in ${s?"reverse":""} Urdu alphabetical order</div>`,n.join("، "))}catch(t){d("r-sort",String(t))}});f("btn-compare",()=>{try{const t=o("cmp-a"),e=o("cmp-b"),s=J(t,e),n=k(t),r=k(e),a=s<0?`"${t}" comes BEFORE "${e}"`:s>0?`"${t}" comes AFTER "${e}"`:`"${t}" equals "${e}" in sort order`;g("r-compare",`
      <span class="match-badge ${s===0?"yes":"no"}" style="margin-bottom:10px;display:inline-flex">${s<0?"← A before B":s>0?"→ A after B":"= Equal"}</span>
      <div class="result-meta">${c(a)}</div>
      <div class="result-meta" style="margin-top:6px">Key A: ${c(n)} | Key B: ${c(r)}</div>`,a)}catch(t){d("r-compare",String(t))}});f("btn-to-roman",()=>{try{const t=o("tr-u"),e=Ot(t);g("r-to-roman",`
      <div class="ba-box">
        <div class="ba-side"><div class="ba-label">Urdu</div><div class="ba-val">${c(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side" style="direction:ltr;text-align:left"><div class="ba-label">Roman</div><div class="ba-val" style="font-family:var(--font-ui);font-size:18px">${c(e)}</div></div>
      </div>`,e)}catch(t){d("r-to-roman",String(t))}});f("btn-from-roman",()=>{try{const t=o("fr-r"),e=qt(t);g("r-from-roman",`
      <div class="ba-box">
        <div class="ba-side" style="direction:ltr;text-align:left"><div class="ba-label">Roman</div><div class="ba-val" style="font-family:var(--font-ui);font-size:18px">${c(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side"><div class="ba-label">Urdu</div><div class="ba-val">${c(e)}</div></div>
      </div>`,e)}catch(t){d("r-from-roman",String(t))}});f("btn-script",()=>{try{const t=o("sc-t"),e=it(t),s=ut(t),n=Z(t);g("r-script",`
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-val">${c(e)}</div><div class="stat-lbl">Script</div></div>
        <div class="stat-box"><div class="stat-val">${s?"RTL":"LTR"}</div><div class="stat-lbl">Direction</div></div>
        <div class="stat-box"><div class="stat-val">${(n*100).toFixed(0)}%</div><div class="stat-lbl">Urdu density</div></div>
        <div class="stat-box"><div class="stat-val">${t.length}</div><div class="stat-lbl">Length</div></div>
      </div>
      <div class="density-bar" style="margin-top:10px"><div class="density-fill" style="width:${(n*100).toFixed(1)}%"></div></div>
      <div class="result-meta" style="margin-top:4px">Urdu density: ${(n*100).toFixed(1)}% ${n>.3?"→ render RTL":"→ render LTR"}</div>`,`script:${e} rtl:${s} density:${n}`)}catch(t){d("r-script",String(t))}});f("btn-density",()=>{try{const t=o("dn-t"),e=Z(t),s=(e*100).toFixed(1);g("r-density",`
      <div class="stat-box" style="text-align:center;padding:16px">
        <div class="stat-val" style="font-size:36px">${s}%</div>
        <div class="stat-lbl">Urdu-specific character ratio</div>
      </div>
      <div class="density-bar" style="margin-top:10px"><div class="density-fill" style="width:${s}%"></div></div>
      <div class="result-meta" style="margin-top:6px">
        Threshold guide: &lt;10% → likely Arabic | 10–30% → mixed | &gt;30% → Urdu
        <br>Recommendation: render <strong>${e>.1?"RTL":"LTR"}</strong>
      </div>`,`${s}%`)}catch(t){d("r-density",String(t))}});f("btn-classify",()=>{try{const t=o("cl-t"),e=Array.from(t);g("r-classify",`
      <table class="char-table">
        <thead><tr><th>Char</th><th>Codepoint</th><th>Class</th><th>Name</th></tr></thead>
        <tbody>
          ${e.map(s=>{const n=s.codePointAt(0),r=R(s);return`<tr>
              <td class="char-glyph">${c(s)}</td>
              <td>U+${n.toString(16).toUpperCase().padStart(4,"0")}</td>
              <td><span class="card-badge" style="background:var(--bg-3);color:var(--text-1)">${c(r)}</span></td>
              <td style="color:var(--text-2);font-size:10px">${c(s===" "?"SPACE":s)}</td>
            </tr>`}).join("")}
        </tbody>
      </table>`,e.map(s=>`${s}:${R(s.codePointAt(0))}`).join(" "))}catch(t){d("r-classify",String(t))}});f("btn-is-urdu",()=>{try{const t=o("iu-t"),e=Array.from(t)[0]??"";if(!e){d("r-is-urdu","Enter at least one character");return}const s=at(e),n=e.codePointAt(0);g("r-is-urdu",`
      <div style="display:flex;align-items:center;gap:12px">
        <div class="stat-box" style="font-family:var(--font-urdu);font-size:40px;padding:20px 28px">${c(e)}</div>
        <div>
          <span class="match-badge ${s?"yes":"no"}">${s?"✓ Urdu-specific character":"✗ Not Urdu-specific"}</span>
          <div class="result-meta" style="margin-top:8px">U+${n.toString(16).toUpperCase().padStart(4,"0")}</div>
          <div class="result-meta">${s?"Only exists in Urdu Unicode block (not shared with Arabic)":"Shared Arabic/other block character"}</div>
        </div>
      </div>`,`${e} → ${s}`)}catch(t){d("r-is-urdu",String(t))}});
