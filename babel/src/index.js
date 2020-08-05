let say = (data)=>{
    console.log(data&&"hello world")
}

let p = new Promise((resolve,reject)=>{
    resolve("123")
});
p.then((data)=>{
    sat(data)
})


let obj = {a:"aaa"}
for(let i of obj){
    console.log(i)
}