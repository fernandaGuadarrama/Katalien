
////// basicos 

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')


const fondo = new Image()
fondo.scr = "img/space.png"




// let empezarJuego()

function empezarJuego() {
//obtenemos los elementos
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
 first: "img/cat.png",
 second: "img/cat2.png"
}

let gatoMuerto = new Image()
gatoMuerto.src = "img/catdead.png"



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
        this.life = 100
        this.kills = 0
    }
    recibirDaño(daño){
      this.life -= daño
    }
    draw() {
        if (frames % 100 === 0){
          this.image = this.image === this.image1 ? this.image2 : this.image1
         }

        c.drawImage(this.image, this.x, this.y, this.width, this.height)
       //colision
    }
    drawDead(){
      c.drawImage(gatoMuerto, this.x, this.y, this.width, this.height) 
     // this.image3 = this.image3
    }
   }

          // let colores = {"#FF5CE4", "#FF73C6", "#FFA77D", "FFE25C", "FCF763", "5502BD", "FF0398", "FF5E5E", "#FDA703", "FFEC03", "DAF802", "029666", "CF8BF9", "FFADF1", "FFBDD2", "FFF58A", "#02E1D9"}
          // function random_color(colores) {
          //     let random_color = colores[Math.floor(Math.random() *colores.length)];
          //     return random_color;
          //     console.log(random_color)
          //    }
const x =  canvas.width / 2
const y =  canvas.height / 2  
const gatos = new Personaje(350, 200, 100, 100, cats)

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
  draw(){
  //  if (frames % 10) this.velocity += .5
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
  }
  update(){
      this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
  }
  hitCat(){
      gatos.recibirDaño(5)
      console.log(gatos.life)
  }

}


////// creando el projectile 



const projectile = new Projectile(
  canvas.width / 2, 
  canvas.height / 2,
 5, 
 '#ff2e82', 
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
  //  console.log(velocity)
 //   const velocity = {x :1, y: 1}
  enemies.push (new Enemy(x, y, radius, color, velocity))
//  }, 1500)
 
} 
////////// loop, corazón del juego
let animationId
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    if (gatos.life > 0){ //vivos
      gatos.draw()
      console.log(gatos.life)
    }
    else {
      gatos.drawDead(gatoMuerto) 
      let gameOver;
        function myFunction() {
         timeout = setTimeout(alertFunc, 1000);
        }
        function alertFunc() {
        alert("Dark alien forces got you kitty!");
        }
        myFunction()
    }
    if (frames % 50 == 0){
        spawnEnemies()
    }
    //  projectile.draw()
    // projectile.update()
    projectiles.forEach((projectile, projectileIndex) => {
       projectile.update ()
       if(projectile.x < -500 || projectile.x > 500){
        projectiles.splice(projectileIndex, 1)
       }
    })
    enemies.forEach((enemy, index) => {
       enemy.update ()
//        console.log(projectiles)
//      PROJECTILE COLLISION
      projectiles.forEach((projectile, projectileIndex) => {
        const dist_projectiles_enemy = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
         if (dist_projectiles_enemy - enemy.radius - projectile.radius < 2) {
          enemies.splice(index, 1)
          projectiles.splice(projectileIndex, 1)
          gatos.kills++
      }
      
       if (enemy.x <= 436 && enemy.x >= 364 && enemy.y <= 299 && enemy.y >= 202){
          enemy.hitCat()
          gatos.recibirDaño(25)
          console.log(gatos.life)
       }
       if (gatos.kills>5) {
          alert("You helped the alien nation a lot! THANK YOU kitty!")
       }
        });
    })
    mostrarDatos(gatos.life, gatos.kills)
    animationId = requestAnimationFrame(animate)
}
  //esto es el tablero de la vida
     function mostrarDatos(life, kills){
      c.font = "24px 'Pathway Gothic One', sans-serif"
      c.fillStyle = "white"
      c.font = "18px 'Pathway Gothic One', sans-serif"
      c.fillText(`Kitty life: ${life} Kills: ${kills}`, 600, 40)
     }






//// activar los controles 
addEventListener('click', (event) => {
      //var x_mouse = event.clientX
    let y_mouse =  (event.offsetY - (canvas.height/2))
      //(event.clientY - canvas.height) / 2;
    let x_mouse = (event.offsetX - (canvas.width/2))
      //(event.clientX - canvas.width) / 2;
    const radianes = Math.atan2(y_mouse, x_mouse)
        const angle = (radianes*180)/Math.PI;
    console.log("x", (event.offsetX), "y", (event.offsetY), "\n,angle", angle)
        const velocity = {
          x: Math.cos(radianes),
          y: Math.sin(radianes)
        }
    projectiles.push(
        new Projectile(canvas.width / 2, canvas.height / 2, 
        15, '#C724B1', velocity, radianes)) 
})


