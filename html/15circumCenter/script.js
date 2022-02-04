const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// achtergrond
// 3 punten
// driehoek maken
// 3 lijnen
// bepalen midden AB BC en AC
// 3 loodlijnen door midde AB, AC en BC
// snijpunt bepalen
// afstand snijpunt hoekpunt 
// cirkel door ABC trekken

//scope
let background, A, B, C, ab, ac, bc, mAB, mAC, mBC, pab, pac, pbc, S,dist;

// achtergrond
background = new GraphBackGround();

// 3 punten
A = new Point(100,100,"15","red",true);
B = new Point(500,200,"15","green",true);
C = new Point(200,500,"15","blue",true);

ab = new LinearFunction(0,0);
ac = new LinearFunction(0,0);
bc = new LinearFunction(0,0);

mAB = new Point(0,0,"7","black",false);
mAC = new Point(0,0,"7","black",false);
mBC = new Point(0,0,"7","black",false);

pab = new LinearFunction(0,0);
pac = new LinearFunction(0,0);
pbc = new LinearFunction(0,0);


S = new Point(0,0,"7","white",false);

animate();

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,width,height);
    background.draw();

    ab.slope = (B.y - A.y)/(B.x - A.x); // rise/run
    ab.intercept = B.y - ab.slope * B.x; // intercept = y - slope * x
    ab.draw("rgba(0,0,255,0.4)");

    ac.slope = (C.y - A.y)/(C.x - A.x); // rise/run
    ac.intercept = C.y - ac.slope * C.x; // intercept = y - slope * x
    ac.draw("rgba(0,0,255,0.4)");

    bc.slope = (B.y - C.y)/(B.x - C.x); // rise/run
    bc.intercept = B.y - bc.slope * B.x; // intercept = y - slope * x
    bc.draw("rgba(0,0,255,0.4)");



    mAB.x = (A.x + B.x)/2 ; mAB.y = (A.y + B.y)/2 ;  
    mAC.x = (A.x + C.x)/2 ; mAC.y = (A.y + C.y)/2 ;  
    mBC.x = (C.x + B.x)/2 ; mBC.y = (C.y + B.y)/2 ;  

    mAB.draw();
    mAC.draw();
    mBC.draw();

    pab.slope = -1 /(ab.slope);
    pab.intercept = mAB.y - pab.slope * mAB.x;

    pac.slope = -1 /(ac.slope);
    pac.intercept = mAC.y - pac.slope * mAC.x;

    pbc.slope = -1 /(bc.slope);
    pbc.intercept = mBC.y - pbc.slope * mBC.x;



    pab.draw("rgba(255,0,0,0.4)");
    pac.draw("rgba(255,0,0,0.4)");
    pbc.draw("rgba(255,0,0,0.4)");

    
    S.x =pab.intersection(pbc).x; 
    S.y =pab.intersection(pbc).y; 

   

    dist = Math.sqrt((A.x - S.x)*(A.x - S.x) + (A.y - S.y)*(A.y - S.y)); 



    context.beginPath();
    context.fillStyle = "rgba(0,0,255,0.1)";
    context.arc(S.x,S.y,dist,0,Math.PI*2);
    context.closePath();
    context.stroke();
    context.fill();

    context.beginPath();
    context.fillStyle = "rgba(255,255,0,0.4)";
    context.moveTo(A.x,A.y);
    context.lineTo(B.x,B.y);
    context.lineTo(C.x,C.y);
    context.closePath();
    context.fill();

    S.draw();
    
    A.draw();
    B.draw();
    C.draw();
}