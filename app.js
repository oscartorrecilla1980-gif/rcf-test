
let questions=[]
let current=0
let answers=[]
let timer
let timeLeft=60
let globalTime=0
let globalInterval

function startTest(i){
questions = tests[i].sort(()=>Math.random()-0.5)
document.getElementById("menu").classList.add("hidden")
document.getElementById("quiz").classList.remove("hidden")

answers = new Array(questions.length)

createProgress()

globalInterval=setInterval(()=>{
globalTime++
document.getElementById("global").innerText="Tiempo total: "+globalTime+"s"
},1000)

load()
}

function createProgress(){
let p=document.getElementById("progress")
p.innerHTML=""
for(let i=0;i<questions.length;i++){
let b=document.createElement("div")
b.className="box"
p.appendChild(b)
}
}

function load(){
clearInterval(timer)
timeLeft=60
document.getElementById("timer").innerText="Tiempo: "+timeLeft

timer=setInterval(()=>{
timeLeft--
document.getElementById("timer").innerText="Tiempo: "+timeLeft
if(timeLeft<=0){mark(false);next()}
},1000)

let q=questions[current]
document.getElementById("counter").innerText="Pregunta "+(current+1)+"/"+questions.length
document.getElementById("question").innerText=q.q

let a=document.getElementById("answers")
a.innerHTML=""

q.options.forEach((opt,i)=>{
let b=document.createElement("button")
b.innerText=opt
b.onclick=()=>answer(i)
a.appendChild(b)
})

updateProgress()
}

function answer(i){
let q=questions[current]
let correct=(i===q.correct)
answers[current]=i
mark(correct)
alert("Respuesta correcta: "+q.options[q.correct])
}

function mark(correct){
let boxes=document.querySelectorAll(".box")
boxes[current].classList.remove("current")
boxes[current].classList.add(correct?"correct":"wrong")
}

function updateProgress(){
let boxes=document.querySelectorAll(".box")
boxes.forEach(b=>b.classList.remove("current"))
boxes[current].classList.add("current")
}

function next(){
if(current<questions.length-1){current++;load()}
else finish()
}

function prev(){
if(current>0){current--;load()}
}

function finish(){
clearInterval(timer)
clearInterval(globalInterval)
document.getElementById("quiz").classList.add("hidden")
document.getElementById("result").classList.remove("hidden")

let score=0
questions.forEach((q,i)=>{if(answers[i]===q.correct)score++})

let note=((score/questions.length)*10).toFixed(2)

document.getElementById("score").innerText=
"Aciertos: "+score+" | Fallos: "+(questions.length-score)+" | Nota: "+note
}

function exitTest(){
location.reload()
}
