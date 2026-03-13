
let total=50
let pool=[...preguntas].sort(()=>Math.random()-0.5).slice(0,total)
let i=0
let answers=new Array(total).fill(null)

const q=document.getElementById("question")
const opts=document.getElementById("options")
const prog=document.getElementById("progress")
const counter=document.getElementById("qcounter")
const fb=document.getElementById("feedback")

function buildProgress(){
prog.innerHTML=""
for(let k=0;k<total;k++){
let d=document.createElement("div")
d.className="box"
prog.appendChild(d)
}
}

function render(){

counter.innerText="Pregunta "+(i+1)+" / "+total

let p=pool[i]
q.innerText=p.q
opts.innerHTML=""
fb.innerText=""

p.options.forEach((t,idx)=>{
let b=document.createElement("button")
b.className="option"
b.innerText=t
b.onclick=()=>answer(idx)
opts.appendChild(b)
})

updateProgress()
}

function answer(idx){
answers[i]=idx
let p=pool[i]

let buttons=document.querySelectorAll(".option")
buttons.forEach((b,n)=>{
if(n==p.correct) b.classList.add("correct")
if(n==idx && n!=p.correct) b.classList.add("wrong")
})

fb.innerText="Respuesta correcta: "+["A","B","C","D"][p.correct]

updateProgress()
}

function updateProgress(){
let boxes=document.querySelectorAll(".box")
boxes.forEach((b,k)=>{
b.className="box"
if(k==i) b.classList.add("current")
if(answers[k]!=null){
if(answers[k]==pool[k].correct) b.classList.add("ok")
else b.classList.add("bad")
}
})
}

function next(){
if(i<total-1){i++;render()}
}

function prev(){
if(i>0){i--;render()}
}

buildProgress()
render()
