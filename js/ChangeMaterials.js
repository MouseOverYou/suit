var noiseAstro, astroMat 

function collectEggMats(callback){
    eggMats = []
    for (var i = 0; i < scene.materials.length; i++) {
        if (scene.materials[i].name == "eggMat") {
            eggMats.push(scene.materials[i])
        }
    }
    callback()
}

function changeMats() {
    astroMat = scene.getMaterialByName("Astronaut")
    astroMat.reflectionTexture =hdrTexture
    astroMat.roughness = 0
    

    noiseAstro = new BABYLON.NoiseProceduralTexture("noiseAstro", 512, scene);
    noiseAstro.getAlphaFromRGB = true
    noiseAstro.octaves = 8
    noiseAstro.persistence = 1
    noiseAstro.animationSpeedFactor = 10
    noiseAstro.uScale = 1
    noiseAstro.vScale = 1
    noiseAstro.brightness = 0.3
    noiseAstro.level=0
    astroMat.opacityTexture = noiseAstro
    astroMat.transparencyMode = 2

    thingMat.emissiveColor = new BABYLON.Color3(1,1,1)
   
}

