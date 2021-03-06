let truncation_value = 0.5;
let inp;
let seed;

const model = new rw.HostedModel({
  url: "https://bone-bone-90d2d433.hosted-models.runwayml.cloud/v1/",
  token: "tCtR4MgDW0d5FZmrmLg2Ww==",
});

if(typeof(model)=='undefined'){
  console.log('model inactive')
} else {
  console.log('model active')
  document.querySelectorAll('#inactive')[0].classList.add('hidden')
}

async function checkModel() {
  document.querySelector('body').classList.add('loading')
  if(typeof(model)!='undefined'){
    await model.waitUntilAwake();
    document.querySelector('body').classList.remove('loading')
  }
}

function setup() {
  // create canvas
  pixelDensity(1)
  createCanvas(1024, 1044);
  inp = createInput('');
  inp.input(gotText);
  checkModel();
}

function draw() {
  inp.position(10,10);
}

function gotText() {
  seed = 0;
  if(this.value()!=""){
    let text = this.value()
    for(let t = 0; t < text.length; t++){
      // print(text[t].charCodeAt())
      seed+=int(text[t].charCodeAt())
    }
    // print(seed)
    getImageFromRunway()
  }
}

async function getImageFromRunway() {
  randomSeed(seed);
  z = createZ(512)
  // const path = "http://localhost:8000/query";
  const data = {
    z: z,
    truncation: truncation_value
  };

  if(typeof(model)!='undefined'){
    const result = await model.query(data)
    gotImage(result)
  }
}

function gotImage(result) {
  i = createImg(result.image, imageReady);
  i.hide();
}

function imageReady() {
  image(i, 0, 0,512,512);
}

function createZ(v) {
  let z =[];
  for(let zi = 0; zi < v; zi++){
    z.push(random(-1, 1))
  }
  return z;
}
