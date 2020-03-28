var imagen1;
var imagen2;

var zoom1=[];

var lectura="";
var cadena="";


let classifier;

let imageModelURL = 'data/modelo/';


function setup() 
{
  createCanvas(windowWidth,windowHeight);
  
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
  imagen1=loadImage("data/imagen_1.png");
  imagen2=createImage(120,120);
  
  for (let x = 0; x < 120; x++) 
  {
    zoom1[x] = []; 
    for (let y = 0; y < 120; y++) 
    {
      zoom1[x][y] = 0;
    }
  }
  
  OCR();
}


function draw() 
{
  background(255);
  
  image(imagen1,10,10);
  
  noFill();
  stroke(0,255,0);
  rect(mouseX,mouseY,120,120);
  
  for(var x2=0;x2<120;x2++)
  {
    for(var y2=0;y2<120;y2++)
    {
      var c = get(mouseX+x2,mouseY+y2);
      zoom1[x2][y2]=c;
    }
  }
  
  imagen2.loadPixels();
  for(var x3=0;x3<120;x3++)
  {
    for(var y3=0;y3<120;y3++)
    {
      imagen2.set(x3,y3,zoom1[x3][y3]);
    }
  }
  imagen2.updatePixels();
  image(imagen2,1200,10);
  
  fill(0);
  textSize(30);
  text("Lectura: "+lectura,1200,180);
  text("Cadena: "+cadena,1200,230);
}

function OCR()
{
  classifier.classify(imagen2, Resultado);
}

function Resultado(error,results)
{
    if (error) 
    {
      console.error(error);
      return;
    }
    lectura = results[0].label;
    console.log(results);
    OCR();
}

function mousePressed()
{
  cadena = cadena+lectura;
}
