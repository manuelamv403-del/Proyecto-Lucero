// ======================================
// PROYECTO LUCEROS
// APP
// ======================================

window.addEventListener("load", () => {

    Engine.init();

    Universe.init();

    Heart.init();

    UI.init();

    animate();

});

function animate(){

    requestAnimationFrame(animate);

    const delta = Engine.clock.getDelta();

    Engine.updateCamera(delta);

    Universe.update(delta);

    Heart.update(delta);

    Engine.render();

}