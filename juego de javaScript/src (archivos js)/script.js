// window.addEventListener("load", ()=> {
//     alert("recolecta las dos estrellas de los lados saltando. Cada 1000 monedas azules desbloquea una estrella")
//  })

let configuracion;

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

let juego = new Phaser.Game(config);

function preload(params) {
    this.load.image('fondoDElJuego', 'assets/fondo del juego.jpg')
    this.load.image('bloqueASaltar', 'assets/Bloque.webp')
    this.load.image('bloque plataforma', 'assets/Bloque plataforma.webp')
    this.load.spritesheet('jugador','assets/Cube25.webp', {frameWidth: 250, frameHeight: 250})
    this.load.image('estrella','assets/Estrella_amarilla.png')
}

function create(params) {
    this.add.image(313, 200, 'fondoDElJuego');

    plataform = this.physics.add.staticGroup();

    plataform.create(310, 380, 'bloque plataforma').setScale(5.2,.3).refreshBody();
    plataform.create(60, 310, 'bloque plataforma').setScale(1,.3).refreshBody();
    plataform.create(104, 234, 'bloque plataforma').setScale(.3,1).refreshBody();
    plataform.create(565, 310, 'bloque plataforma').setScale(1,.3).refreshBody();
    plataform.create(522, 234, 'bloque plataforma').setScale(.3,1).refreshBody();
    plataform.create(313, 250, 'bloqueASaltar').setScale(.3,.3).refreshBody();
    plataform.create(40, 202, 'estrella').setScale(.02, .02).refreshBody();
    plataform.create(590, 200, 'estrella').setScale(.02, .02).refreshBody();

    jugador = this.physics.add.sprite(313, 200, 'jugador').setScale(.2, .2);

    jugador.setCollideWorldBounds(true);
    jugador.setBounce(0.2);
    this.anims.create({
        key: 'left',
        frame: this.anims.generateFrameNumbers('jugador', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'turn',
        frame: [{key: 'jugador', frame: 0}],
        frameRate: 20,
    })

    this.anims.create({
        key: 'right',
        frame: this.anims.generateFrameNumbers('jugador', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    })

    jugador.body.setGravityY(1000);

    this.physics.add.collider(jugador, plataform);

    cursors = this.input.keyboard.createCursorKeys();

    // estrellas = this.physics.add.group({
    //     key: 'estrella',
    //     repeat: 2,
    //     setXY: {x:12, y:-12}
    // })
}

function update() {
    if (cursors.left.isDown) {
        jugador.setVelocityX(-300);
    } else if (cursors.right.isDown) {
        jugador.setVelocityX(300);
    } else {
        jugador.setVelocityX(0);
    }

    if (cursors.up.isDown && jugador.body.touching.down) {
        jugador.setVelocityY(-435);
    }
}