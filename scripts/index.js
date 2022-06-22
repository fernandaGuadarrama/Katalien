
////// basicos 

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
console.log(canvas)

//canvas.width = innerWidth
//canvas.height = innerHeight


const fondo = new Image()
fondo.scr = "../img/space.png"


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

}

const cats = { 
 first: "../img/cat.png",
 second: "../img/cat2.png"
}

let frames = 0;


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
    constructor (x, y, radius, color, velocity, radianes) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.radianes = radianes
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
      this.draw()
//     this.x = Math.cos(this.radianes)
//     this.y = Math.sin(this.radianes)
        this.x = this.x + this.velocity.x 
        this.y = this.y + this.velocity.y 
    }

}

//// enemy
class Enemy {
  constructor (x, y, radius, color, velocity) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.velocity = velocity
  }
  draw() {
  //  if (frames % 10) this.velocity += .5
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
  }
  update() {
      this.draw()
   //   if (frames % 100 == 0) {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
  // }
  }
}


////// creando el projectile 



const projectile = new Projectile(
  canvas.width / 2, 
  canvas.height / 2,
 5, 
 'purple', 
 {
  x: 1, 
  y: 1
}
)


const projectiles = []
const enemies = []

 function spawnEnemies(){
  
 // setInterval(() => {
    const x = Math.floor(Math.random() *  (800 + 100))
    const y = Math.floor(Math.random() *  (800 + 100))
    const radius = Math.random () *(20 - 5) + 5
    const color = 'white'

    const radianes = Math.atan2(canvas.height /2 -y, canvas.width /2 -x)
    const velocity = {
       x: Math.floor(Math.cos(radianes)),
       y: Math.floor(Math.sin(radianes))
    }
    console.log(velocity)
 //   const velocity = {x :1, y: 1}
  enemies.push (new Enemy(x, y, radius, color, velocity))
//  }, 1500)
 
} 
////////// loop, corazón del juego

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    gatos.draw()
    if (frames % 300 == 0){
        spawnEnemies()
    }
    //  projectile.draw()
    // projectile.update()
    projectiles.forEach((projectile) => {
       projectile.update ()
       console.log(projectile)
    })
    enemies.forEach((enemy) => {
       enemy.update ()
        projectiles.forEach(projectile => {
          const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
          console.log (dist)
            if (dist - enemy.radius - projectile.radius < 2) {
             console.log ('killed')
            }
        });
      // spawnEnemies()
    })
    requestAnimationFrame(animate)
}

//// activar los controles 
//1245.600 x 688
//1200 x 600

addEventListener('click', (event) => {
  //var x_mouse = event.clientX
  let y_mouse =  (event.clientY -(688/2))
  //(event.clientY - canvas.height) / 2;
  let x_mouse = (event.clientX - (1245.600/2))
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
    5, 'purple', velocity, radianes)) 


})

