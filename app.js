let db = JSON.parse(localStorage.getItem("budggt")) || []

function format(n){
return "Rp " + n.toLocaleString("id-ID")
}

function render(){

let list = document.getElementById("list")
let saldo = 0
list.innerHTML=""

db.forEach((x,i)=>{

saldo += x.tipe=="masuk" ? x.jumlah : -x.jumlah

list.innerHTML += `
<div class="item ${x.tipe}">
 <div>
   ${x.nama}
   <div style="font-size:12px">${x.tipe}</div>
 </div>

 <div>
   ${format(x.jumlah)}
   <div onclick="hapus(${i})">🗑</div>
 </div>
</div>`
})

document.getElementById("saldo").innerText = format(saldo)

localStorage.setItem("budggt",JSON.stringify(db))
}

function tambah(){

let nama = document.getElementById("nama").value
let jumlah = +document.getElementById("jumlah").value
let tipe = document.getElementById("tipe").value

if(!nama || !jumlah) return alert("Lengkapi data")

db.unshift({
nama,
jumlah,
tipe,
tgl:new Date()
})

render()

nama.value=""
jumlah.value=""
}

// hapus
function hapus(i){
if(confirm("Hapus transaksi?")){
db.splice(i,1)
render()
}
}

render()

// ===== PWA =====
if("serviceWorker" in navigator){
navigator.serviceWorker.register("sw.js")
}

// Tombol install untuk Android + petunjuk iOS
let btn = document.getElementById("btnInstall")

btn.onclick = ()=>{

let ios = /iphone|ipad|ipod/i.test(navigator.userAgent)

if(ios){
alert("Di iPhone:\nTekan SHARE → Add to Home Screen")
}else{
alert("Gunakan menu Add to Home Screen di browser")
}
}
