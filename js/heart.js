// ======================================
// PROYECTO LUCEROS
// HEART - FINAL
// ======================================

function createHeartStarTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        32, 32, 0,
        32, 32, 32
    );

    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.20, "rgba(255,220,240,0.95)");
    gradient.addColorStop(0.45, "rgba(255,130,200,0.45)");
    gradient.addColorStop(1, "rgba(255,130,200,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
}

const Heart = {
    points: null,
    geometry: null,
    positions: null,
    targets: [],
    velocities: [],
    finalTargets: [],
    active: false,
    finale: false,
    time: 0,

    init() {
        const count = 1600;

        this.positions = new Float32Array(count * 3);
        this.targets = [];
        this.velocities = [];
        this.finalTargets = [];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            this.positions[i3] = (Math.random() - 0.5) * 900;
            this.positions[i3 + 1] = (Math.random() - 0.5) * 600;
            this.positions[i3 + 2] = (Math.random() - 0.5) * 900;

            const t = Math.PI * 2 * (i / count);

            const x = 16 * Math.pow(Math.sin(t), 3);

            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            this.targets.push({
                x: x * 3.25,
                y: y * 3.25,
                z: (Math.random() - 0.5) * 42
            });

            this.finalTargets.push({
                x: (Math.random() - 0.5) * 1000,
                y: 260 + Math.random() * 520,
                z: (Math.random() - 0.5) * 900
            });

            this.velocities.push({
                x: 0,
                y: 0,
                z: 0
            });
        }

        this.geometry = new THREE.BufferGeometry();

        this.geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(this.positions, 3)
        );

        const material = new THREE.PointsMaterial({
            map: createHeartStarTexture(),
            color: 0xffffff,
            size: 4.5,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(this.geometry, material);

        Engine.scene.add(this.points);
    },

    start() {
        this.active = true;
        this.finale = false;
        this.points.material.opacity = 0;
    },

    startFinale() {
        this.active = true;
        this.finale = true;
        this.points.material.opacity = 1;
    },

    update(delta) {
        if (!this.active) return;

        this.time += delta;

        this.points.material.opacity = Math.min(
            this.points.material.opacity + delta * 0.18,
            1
        );

        const pulse =
            1 +
            Math.sin(this.time * 2.4) * 0.045 +
            Math.sin(this.time * 4.8) * 0.012;

        for (let i = 0; i < this.targets.length; i++) {
            const i3 = i * 3;

            const target = this.finale
                ? this.finalTargets[i]
                : this.targets[i];

            const velocity = this.velocities[i];

            const tx = this.finale ? target.x : target.x * pulse;
            const ty = this.finale ? target.y : target.y * pulse;
            const tz = this.finale
                ? target.z
                : target.z + Math.sin(this.time + i * 0.03) * 1.8;

            velocity.x += (tx - this.positions[i3]) * 0.018;
            velocity.y += (ty - this.positions[i3 + 1]) * 0.018;
            velocity.z += (tz - this.positions[i3 + 2]) * 0.018;

            velocity.x *= this.finale ? 0.94 : 0.91;
            velocity.y *= this.finale ? 0.94 : 0.91;
            velocity.z *= this.finale ? 0.94 : 0.91;

            this.positions[i3] += velocity.x;
            this.positions[i3 + 1] += velocity.y;
            this.positions[i3 + 2] += velocity.z;
        }

        this.geometry.attributes.position.needsUpdate = true;

        this.points.rotation.y += this.finale ? delta * 0.03 : delta * 0.14;

        this.points.rotation.x =
            Math.sin(this.time * 0.75) * 0.12;

        this.points.rotation.z =
            Math.sin(this.time * 0.35) * 0.08;

        this.points.position.y =
            Math.sin(this.time * 0.9) * 2.5;
    }
};