self.addEventListener("install",e=>{
e.waitUntil(
caches.open("app").then(c=>{
return c.addAll([
"index.html",
"style.css",
"app.js"
])
})
)
})