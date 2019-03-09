let a = {x:{name:"gg",pass:"ass"},y:{name:"gg",pass:"ass"}};
console.log(a);
let b = {};
b = Array.from(a).map(v => {
    let x = v.x;
    let y = v.y;
    return {
        x:x,
        y:y
    }
});
console.log(b);