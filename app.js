let db = JSON.parse(localStorage.getItem("budggt")) || []

function format(n){
  return "Rp " + n.toLocaleString("id-ID")
}

function render(){

  let list = document.getElementById("list")
  let saldo = 0
  list.innerHTML = ""

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

  let elNama = document.getElementById("nama")
  let elJumlah = document.getElementById("jumlah")
  let elTipe = document.getElementById("tipe")

  let nama = elNama.value
  let jumlah = Number(elJumlah.value)
  let tipe = elTipe.value

  if(!nama || !jumlah){
    alert("Lengkapi dulu ya Malik 😉")
    return
  }

  db.unshift({
    nama: nama,
    jumlah: jumlah,
    tipe: tipe,
    tgl: new Date().toISOString()
  })

  render()

  // reset form
  elNama.value = ""
  elJumlah.value = ""
}

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
