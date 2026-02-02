let data = JSON.parse(localStorage.getItem("uang")) || []

function render(){
let list = document.getElementById("list")
let saldo = 0
list.innerHTML=""

data.forEach((x,i)=>{

saldo += x.tipe=="masuk" ? x.jumlah : -x.jumlah

list.innerHTML += `
<div class="item">
<div>
${x.nama}<br>
<small>${x.tipe}</small>
</div>

<div>
Rp ${x.jumlah}
<button onclick="hapus(${i})">❌</button>
</div>
</div>`
})

document.getElementById("saldo").innerText =
"Rp " + saldo.toLocaleString()

localStorage.setItem("uang",JSON.stringify(data))
}

function tambah(){
let nama = nama.value
let jumlah = +document.getElementById("jumlah").value
let tipe = document.getElementById("tipe").value

data.push({nama,jumlah,tipe})
render()
}

function hapus(i){
data.splice(i,1)
render()
}

render()

// PWA
if('serviceWorker' in navigator){
navigator.serviceWorker.register("service-worker.js")
}