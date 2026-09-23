const text=document.querySelector("#text"),result=document.querySelector("#result"),shopping=document.querySelector("#shopping"),status=document.querySelector("#speechStatus");
const items=JSON.parse(localStorage.getItem("intentflow.shopping")||"[]");
const aliases=new Map([["たまご","卵"],["お米","米"],["しょうゆ","醤油"],["みそ","味噌"]]);
const known=["トイレットペーパー","ティッシュ","キッチンペーパー","マヨネーズ","ケチャップ","醤油","しょうゆ","味噌","みそ","卵","たまご","牛乳","コーヒー","パン","米","お米","洗剤","食器用洗剤","シャンプー","リンス","歯磨き粉","歯ブラシ","ゴミ袋","ラップ","アルミホイル","シリコンスプレー"];
const triggers=["買わなきゃ","買わないと","買って","買う","購入","なくなった","なくなりそう","切れた","切れそう","足りない","足りなくなりそう","必要"];
function normalize(x){return aliases.get(x)||x}
function extract(x){const r=[];for(const i of known)if(x.includes(i)){const n=normalize(i);if(!r.includes(n))r.push(n)}return r}
function parseIntent(x){const found=extract(x),shopping=triggers.some(t=>x.includes(t));return{intent:found.length&&shopping?"AddShoppingItem":"Unknown",items:found.map(name=>({name})),originalText:x,confidence:found.length&&shopping?.95:found.length?.4:.1}}
function render(){shopping.innerHTML="";for(const x of items){const li=document.createElement("li");li.textContent=x;shopping.appendChild(li)}localStorage.setItem("intentflow.shopping",JSON.stringify(items))}
function parse(){const v=text.value.trim();if(!v)return;const d=parseIntent(v);result.textContent=JSON.stringify(d,null,2);if(d.intent==="AddShoppingItem"){for(const x of d.items||[])if(!items.includes(x.name))items.push(x.name);render()}}
document.querySelector("#parse").addEventListener("click",parse);
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SR){const rec=new SR();rec.lang="ja-JP";rec.interimResults=false;rec.continuous=false;document.querySelector("#mic").addEventListener("click",()=>{status.textContent="聞いています…";rec.start()});rec.addEventListener("result",e=>{text.value=e.results[0][0].transcript;status.textContent="音声を取得しました";parse()});rec.addEventListener("error",e=>status.textContent="音声入力エラー: "+e.error);rec.addEventListener("end",()=>{if(status.textContent==="聞いています…")status.textContent=""})}else{document.querySelector("#mic").disabled=true;status.textContent="このブラウザは音声入力に対応していません"}render();