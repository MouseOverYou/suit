var firstHit = false
function startExp() {
    playAstro()
    //makeItGlow()
    astroAnimGroup.play(false)
}

function awakeExp() {
    
    trackerAnimGroup.play(false)
    scene.getMeshByName("Astronaut").isVisible =false
    //makeInitMeshesInvisible()
}

function makeItGlow(){
    var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
    gl.intensity = 0.1
    gl.addIncludedOnlyMesh(sun)

}

function playAstro(){
    scene.getMeshByName("Astronaut").isVisible =true
    scene.beginAnimation(sun, 0, 30, true);
    sun.isVisible =true
}



function makeChildrenVisible(obj) {
    for (var i = 0; i < obj.getChildMeshes().length; i++) {
        obj.getChildMeshes()[i].isVisible = true
    }
}

function makeChildrenInvisible(obj) {
    for (var i = 0; i < obj.getChildMeshes().length; i++) {
        obj.getChildMeshes()[i].isVisible = false
    }
}


