// ======================================
// PROYECTO LUCEROS
// ENGINE
// ======================================

const Engine = {

    scene: null,
    camera: null,
    renderer: null,
    clock: null,

    mouse: {
        x: 0,
        y: 0
    },

    init() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x040816);

        this.scene.fog = new THREE.Fog(
            0x040816,
            250,
            1800
        );

        this.camera = new THREE.PerspectiveCamera(

            60,

            window.innerWidth /
            window.innerHeight,

            0.1,

            3000

        );

        this.camera.position.set(
            0,
            0,
            160
        );

        this.renderer = new THREE.WebGLRenderer({

            canvas:
                document.getElementById("universe"),

            alpha: true,

            antialias: true

        });

        this.renderer.setPixelRatio(

            Math.min(
                window.devicePixelRatio,
                2
            )

        );

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.clock =
            new THREE.Clock();

        window.addEventListener(

            "resize",

            () => {

                this.resize();

            }

        );

        window.addEventListener(

            "mousemove",

            (event)=>{

                this.mouse.x =
                    (event.clientX /
                    window.innerWidth)
                    *2-1;

                this.mouse.y =
                    -(event.clientY /
                    window.innerHeight)
                    *2+1;

            }

        );

    },

    resize(){

        this.camera.aspect =

            window.innerWidth/

            window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    },

    updateCamera(delta){

        this.camera.position.x +=
            ((this.mouse.x*12)-
            this.camera.position.x)
            *delta*1.8;

        this.camera.position.y +=
            ((this.mouse.y*7)-
            this.camera.position.y)
            *delta*1.8;

        this.camera.lookAt(
            0,
            0,
            0
        );

    },

    render(){

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

};