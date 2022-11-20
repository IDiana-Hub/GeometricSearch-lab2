let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let pointArray=[];
canvas.addEventListener('click', (e) => {
    if (pointArray.length >= 4)
        pointArray = [];
    pointArray.push({'x': e.x, 'y': e.y}); 

    reDraw();

    if (pointArray.length == 4)
        check();
})

function reDraw(){
    ctx.fillStyle = "#eeeeee";
    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff0000";
    pointArray.forEach(element => {
        ctx.beginPath();
        ctx.arc(element.x, element.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        if (pointArray.length > 1 ) {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0].x, pointArray[0].y);
            ctx.lineTo(pointArray[1].x, pointArray[1].y);
            if (pointArray.length >= 4){
                ctx.moveTo(pointArray[2].x, pointArray[2].y);
                ctx.lineTo(pointArray[3].x, pointArray[3].y);
            }
            ctx.stroke();
            ctx.closePath();
        }
    });
}

function check(){
    let del1 = (pointArray[1].x - pointArray[0].x) * (pointArray[2].y - pointArray[0].y) - 
        (pointArray[1].y - pointArray[0].y) * (pointArray[2].x - pointArray[0].x);
    let del2 = (pointArray[1].x - pointArray[0].x) * (pointArray[3].y - pointArray[0].y) - 
        (pointArray[1].y - pointArray[0].y) * (pointArray[3].x - pointArray[0].x);
    let del3 = (pointArray[3].x - pointArray[2].x) * (pointArray[0].y - pointArray[2].y) - 
        (pointArray[3].y - pointArray[2].y) * (pointArray[0].x - pointArray[2].x);
    let del4 = (pointArray[3].x - pointArray[2].x) * (pointArray[1].y - pointArray[2].y) - 
        (pointArray[3].y - pointArray[2].y) * (pointArray[1].x - pointArray[2].x);
    if (del1 * del2 < 0 && del3 * del4 < 0){
        console.log ("segments intersect");
        pointO();
    }else
        console.log ("segments not intersect");
    if (del1 * del2 * del3 * del4 == 0)
        console.log("the point of one segment belongs to another");
}

function pointO(){
    let z1 = (pointArray[1].x - pointArray[0].x) * (pointArray[2].y - pointArray[0].y) - 
    (pointArray[1].y - pointArray[0].y) * (pointArray[2].x - pointArray[0].x);
    let z2 = (pointArray[1].x - pointArray[0].x) * (pointArray[3].y - pointArray[0].y) - 
    (pointArray[1].y - pointArray[0].y) * (pointArray[3].x - pointArray[0].x);
    let x = pointArray[2].x + (pointArray[3].x - pointArray[2].x) * Math.abs(z1)/Math.abs(z2 - z1);
    let y = pointArray[2].y + (pointArray[3].y - pointArray[2].y) * Math.abs(z1)/Math.abs(z2 - z1);
    pointArray.push({'x': x, 'y': y});
    reDraw();
}