// =====================================================
// PROYECTO LUCEROS
// universe.js
// Parte 1 - Motor del Universo
// =====================================================

const Universe = {

    groups: {

        far: null,
        mid: null,
        near: null,
        dust: null

    },

    stars: [],

    time: 0,

    init() {

        this.createBackground();

        this.createStars();

        this.createDust();

    },

    // =========================================
    // Fondo espacial
    // =========================================

    createBackground() {

        Engine.scene.background = new THREE.Color(0x03040a);

        Engine.scene.fog = new THREE.Fog(

            0x03040a,

            500,

            2500

        );

    },

    // =========================================
    // Capas de estrellas
    // =========================================

    createStars() {

        this.groups.far = this.createStarLayer(
            2600,
            0.7,
            3000,
            0xffffff
        );

        this.groups.mid = this.createStarLayer(
            1500,
            1.3,
            2200,
            0xdce6ff
        );

        this.groups.near = this.createStarLayer(
            700,
            2.4,
            1400,
            0xffd5ef
        );

        Engine.scene.add(this.groups.far);
        Engine.scene.add(this.groups.mid);
        Engine.scene.add(this.groups.near);

    },

    createStarLayer(count, size, spread, color) {

        const geometry = new THREE.BufferGeometry();

        const vertices = [];

        for (let i = 0; i < count; i++) {

            vertices.push(

                (Math.random() - 0.5) * spread,

                (Math.random() - 0.5) * spread,

                (Math.random() - 0.5) * spread

            );

        }

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(

                vertices,

                3

            )

        );

        const material = new THREE.PointsMaterial({

            color,

            size,

            transparent: true,

            opacity: 0.95,

            depthWrite: false,

            sizeAttenuation: true

        });

        return new THREE.Points(

            geometry,

            material

        );

    },

    // =========================================
    // Polvo espacial
    // =========================================

    createDust() {

        const geometry = new THREE.BufferGeometry();

        const vertices = [];

        for (let i = 0; i < 6000; i++) {

            vertices.push(

                (Math.random() - 0.5) * 4500,

                (Math.random() - 0.5) * 2500,

                (Math.random() - 0.5) * 4500

            );

        }

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(

                vertices,

                3

            )

        );

        const material = new THREE.PointsMaterial({

            color: 0xffffff,

            size: 0.35,

            opacity: 0.18,

            transparent: true,

            depthWrite: false

        });

        this.groups.dust = new THREE.Points(

            geometry,

            material

        );

        Engine.scene.add(

            this.groups.dust

        );

    },
        // =========================================
    // Nebulosas (Sprites suaves)
    // =========================================

    createNebula(color, x, y, z, scale) {

        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");

        const gradient = ctx.createRadialGradient(
            128, 128, 0,
            128, 128, 128
        );

        gradient.addColorStop(0, "rgba(255,255,255,0.35)");
        gradient.addColorStop(0.2, "#" + color.toString(16).padStart(6, "0"));
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);

        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.SpriteMaterial({

            map: texture,
            transparent: true,
            opacity: 0.22,
            depthWrite: false

        });

        const sprite = new THREE.Sprite(material);

        sprite.position.set(x, y, z);

        sprite.scale.set(
            scale,
            scale,
            1
        );

        Engine.scene.add(sprite);

        this.stars.push({

            type: "nebula",

            mesh: sprite,

            speed:
                Math.random() * 0.02 + 0.004

        });

    },

    createNebulas() {

        this.createNebula(
            0xff6fd1,
            -350,
            120,
            -900,
            700
        );

        this.createNebula(
            0x7c9bff,
            420,
            -180,
            -1100,
            900
        );

        this.createNebula(
            0xc55bff,
            80,
            300,
            -1400,
            1100
        );

    },

    // =========================================
    // Actualización
    // =========================================

    update(delta) {

        this.time += delta;

        this.groups.far.rotation.y += delta * 0.002;

        this.groups.mid.rotation.y += delta * 0.006;
        this.groups.mid.rotation.x += delta * 0.0015;

        this.groups.near.rotation.y += delta * 0.012;
        this.groups.near.rotation.x += delta * 0.003;

        this.groups.dust.rotation.y += delta * 0.004;

        this.stars.forEach(item => {

            if (item.type === "nebula") {

                item.mesh.material.opacity =
                    0.18 +
                    Math.sin(
                        this.time * item.speed * 20
                    ) * 0.05;

                item.mesh.material.rotation +=
                    delta * item.speed;

            }

        });

    }

};

// =========================================
// Crear nebulosas después del init
// =========================================

const oldUniverseInit = Universe.init;

Universe.init = function () {

    oldUniverseInit.call(this);

    this.createNebulas();

};