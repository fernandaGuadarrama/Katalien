
////// basicos 

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
console.log(canvas)

//canvas.width = innerWidth
//canvas.height = innerHeight


const fondo = new Image()
fondo.scr = "../img/space.png"

/////*BACKGROUND *////////
//const backgroundImage = {
//   img: fondo,
 //   x: 0,
//}
/*    speed: -1,
    move() {
      this.x += this.speed;
      this.x %= canvas.width;
    },
  
    draw: function() {
      ctx.drawImage(this.img, this.x, 0, 900, 600);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, 0, 900, 600);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0, 900, 600);
      }
    },};*/
  



// let empezarJuego()

function empezarJuego() {
//obtenemos los elementos
console.log('empezarJuego()')
    const btnstart = document.getElementById("start")

    //modificamos los elementos
    btnstart.classList.add("noShow")
    canvas.classList.remove("noShow")
   
   // configurarAmbiente()
    actualizarEscenario()
    animate()
}
    
//empezarJuego()

function actualizarEscenario(){
//esto es lo que ejecuta la acción de escenario
//    ctx.clearRect(0,0,900,600)
      
     // crearEnemigos()
  //    backgroundImage.draw()
 //     cat.dibujarse()
  //    backgroundImage.move()

}

const cats = { 
 first: "../img/cat.png",
 second: "../img/cat2.png"
}

let frames = 0;
///// personaje base
//const imagenCat = new Image()
//imagenCat.src = "../img/cat.png"

class Personaje{
    constructor(x,y,w,h,imgs){
        this.x = x
        this.y = y
        this.width = w
        this.height = h
    //    this.radius = radius
      //  this.color = color
        this.image1 = new Image()
        this.image2 = new Image()
        this.image1.src = imgs.first
        this.image2.src = imgs.second
        this.image = this.image1
    }
    draw() {
 /*       c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fill()
        c.fillStyle = this.color
        */
 //      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      if (frames % 100 === 0){
        this.image = this.image === this.image1 ? this.image2 : this.image1
      }

     c.drawImage(this.image, this.x, this.y, this.width, this.height)
       //colision
    }
   }

const x =  canvas.width / 2
const y =  canvas.height / 2  
const gatos = new Personaje(350, 250, 100, 100, cats)
console.log(gatos)






//// projectile
class Projectile {
    constructor (x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
      this.draw()
      //si lo multiplico por3 2 será más rápido, puedo usar una variable fija
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

/* class Personaje{
  constructor(x, y, radius, img, color){
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.img = img
  }
  draw() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fill()
      c.fillStyle = this.color
  }
}
*/
//const x =  canvas.width / 2
//const y =  canvas.height / 2

//// projectile
/*class Enemy {
  constructor (x, y, radius, color, velocity) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.velocity = velocity
  }
  draw() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
  }
  update() {
      this.x = this.x + this.velocity.x
      this.y = this.y + this.velocity.y
  }
}
*/
//// atributos de Cat



//const cat = new Personaje (x, y, 30, "red")


////// creando el projectile 



const projectile = new Projectile(
  canvas.width / 2, 
  canvas.height / 2,
 5, 
 'red', 
 {
  x: 1, 
  y: 1
}
)

/*const projectile2 = new Projectile(
  canvas.width / 2, canvas.height / 2,
 event.clientX, event.clientY, 
 5, 'green', {x: -1, y: -1}) */

const projectiles = []

/* function spawnEnemies(){
  setInterval(() => {
console.log('go');
  }, 1000)
} */
////////// loop, corazón del juego

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    gatos.draw()
    
  //  projectile.draw()
   // projectile.update()
  requestAnimationFrame(animate)
  projectiles.forEach((projectile) => {
    projectile.update ()
 })
    
}

//// activar los controles 
//1245.600 x 688

addEventListener('click', (event) => {
  //var x_mouse = event.clientX
  var y_mouse =  (event.clientY -(688/2))
  //(event.clientY - canvas.height) / 2;
  var x_mouse = (event.clientX - (1245.600/2))
  //(event.clientX - canvas.width) / 2;
  console.log ("go")
 const radianes = Math.atan2(y_mouse, x_mouse)
    const angle = (radianes*180)/Math.PI;
    console.log("x", (event.clientX - (1245.600/2)), "y", (event.clientY -(688/2)), "\n,angle", angle)
 const velocity = {
    x: Math.cos(radianes),
    y: Math.sin(radianes)
 }
 projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 
    5, 'red', velocity)) 

/*const projectile = new Projectile(
    canvas.width / 2, canvas.height / 2,
     event.clientX, event.clientY, 
     5, 'red', {x: 1, y: 1})
projectile.draw()*/




})

