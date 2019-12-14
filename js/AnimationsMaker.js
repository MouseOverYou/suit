//CREATE MESHES ------------------------------------------
function createAllMeshes(){
    createTracker()
    createSun()
    //createVogel()
    //createPlanes()
    //createThingInside()
}

//CREATE MESHES ------------------------------------------
var vogelAnim , trackMat, trackerFXMat
var swooshMat, waveMat, blumeMat, sonneMat, spotBlumeMat, vogelMat
var noiseText
var trackerHolder, trackerFX, sun
var wave_P, blume_P, sonne_P, spots_P, vogel_P

function createTracker(){
    var trackerText = new BABYLON.Texture("./assets/tracker_b.png", scene, true, false)
    trackerText.vScale = -1
    trackerText.level =0.5
    trackMat = new BABYLON.PBRMaterial("trackMat", scene);
    trackMat.albedoColor = new BABYLON.Color3(1.0, 1, 1);
    trackMat.metallic = 0.5;
    trackMat.roughness = 0.2;
    trackMat.reflectionTexture = hdrTexture
    trackMat.albedoTexture = trackerText
    //trackMat.emissiveColor = new BABYLON.Color3(1,1,1)
    trackMat.alpha = 1

    trackerHolder = BABYLON.MeshBuilder.CreatePlane("planeHolder", { width: (1280/960)*0.75, height: 1*0.75 }, scene)
    //var quaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), Math.PI );
    //planeHolder.rotationQuaternion = quaternion
    trackerHolder.material = trackMat
    trackerHolder.parent = moveScene_P

    trackerFX = BABYLON.MeshBuilder.CreatePlane("trackerFX", { width: (1280/960)*0.75, height: 1*0.75 }, scene)
    trackerFX.position.z = -0.01
    trackerFX.parent = moveScene_P
    trackerFXMat = new BABYLON.PBRMaterial("trackerFXMat", scene)
    trackerFX.material = trackerFXMat
    noiseText = new BABYLON.NoiseProceduralTexture("perlin", 512, scene);
    noiseText.getAlphaFromRGB = true
    noiseText.octaves = 3
    noiseText.persistence = 1.2
    noiseText.animationSpeedFactor = 0
    noiseText.uScale = 1
    noiseText.vScale = 1
    noiseText.brightness = 0.3
    var trackerOpacitiyText = new BABYLON.Texture("./assets/tracker_opacity.png", scene, true, false)
    trackerOpacitiyText.vScale = -1
    trackerOpacitiyText.level =0.5
    trackerFXMat.albedoTexture = trackerText
    trackerFXMat.opacityTexture = trackerOpacitiyText
    trackerFXMat.emissiveTexture = noiseText
    trackerFXMat.emissiveColor = new BABYLON.Color3(1,1,1)

}

function createSun(){
    sun = new BABYLON.MeshBuilder.CreateSphere("sun",{diameter: 0.1}, scene)
    sun.parent = moveScene_P
    sun.position.x = 0.25
    sun.position.y = 0.35
    sun.position.z = -1
    thingMat = new BABYLON.StandardMaterial("thingMat", scene)
    sun.material =thingMat
    sun.isVisible =false
}

function createVogel(){
    vogel_P = new BABYLON.TransformNode("vogel_P")
    vogelPlane = BABYLON.MeshBuilder.CreatePlane("vogelPlane", { width: 0.5, height: 0.5 }, scene)
    vogelMat = new BABYLON.PBRMaterial("vogelMat", scene)
    vogelPlane.material = vogelMat
    vogelPlane.parent = vogel_P
    vogel_P.parent = moveScene_P
    vogelPlane.position.x = 0.2
    vogelPlane.position.y = 0.33
    vogelPlane.position.z = -0.01
    vogelPlane.rotation.x = 3.14
    vogelPlane.rotation.y = 3.14
    vogelPlane.rotation.z = 3.14
    /*
    //Create a manager for the player's sprite animation
    var spriteManagerVogel = new BABYLON.SpriteManager("spriteManagerVogel", vogelSpriteSheet, 1, 1024, scene)

    // First animated vogel
    vogelAnim = new BABYLON.Sprite("vogelAnim", spriteManagerVogel);
    vogelAnim.playAnimation(0, 11, true, 1);
    vogelAnim.position.y = 0.33;
    vogelAnim.position.x = 0.22;
    vogelAnim.size = 0.5;
    vogelAnim.isPickable = true;*/

    createFlyAnim()
}


function createPlanes(){

    swooshPlane = BABYLON.MeshBuilder.CreatePlane("swooshPlane", { width: 5, height: 5 }, scene)
    swooshMat = new BABYLON.PBRMaterial("swooshMat", scene)
    swooshPlane.material = swooshMat
    swooshPlane.parent = moveScene_P
    swooshPlane.position.y = 0.3
    swooshPlane.position.z = 0.5
    swooshPlane.rotation.x = 3.14
    swooshPlane.rotation.z = 0.9

    wave_P = new BABYLON.TransformNode("wave_P")
    wavePlane = BABYLON.MeshBuilder.CreatePlane("wavePlane", { width: 4, height: 4 }, scene)
    waveMat = new BABYLON.PBRMaterial("waveMat", scene)
    wavePlane.material = waveMat
    wavePlane.parent = wave_P
    wave_P.parent = moveScene_P
    wavePlane.position.x = 1.5
    wavePlane.position.y = 0.3
    wavePlane.position.z = 0.4
    wavePlane.rotation.x = 3.14
    wavePlane.rotation.y = 3.14
    wavePlane.rotation.z = -0.3

    blume_P = new BABYLON.TransformNode("blume_P")
    blumePlane = BABYLON.MeshBuilder.CreatePlane("blumePlane", { width: 2, height: 2 }, scene)
    blumePlane.parent = blume_P
    blume_P.parent = moveScene_P
    blumeMat = new BABYLON.PBRMaterial("blumeMat", scene)
    blumePlane.material = blumeMat
    blumePlane.position.x = -0.5
    blumePlane.position.y = -0.8
    blumePlane.position.z = 0.1
    blumePlane.rotation.x = 0
    blumePlane.rotation.z = -0.3

    sonne_P = new BABYLON.TransformNode("sonne_P")
    sonnePlane = BABYLON.MeshBuilder.CreatePlane("sonnePlane", { width: 2, height: 2 }, scene)
    sonneMat = new BABYLON.PBRMaterial("sonneMat", scene)
    sonnePlane.material = sonneMat
    sonnePlane.parent = sonne_P
    sonne_P.parent = moveScene_P
    sonnePlane.position.x = 1.3
    sonnePlane.position.y = -0.7
    sonnePlane.position.z = 0.2
    sonnePlane.rotation.x = 0
    sonnePlane.rotation.y = 0

    spotBlumePlane = BABYLON.MeshBuilder.CreatePlane("spotBlumePlane", { width: 1, height: 1 }, scene)
    spotBlumeMat = new BABYLON.PBRMaterial("spotBlumeMat", scene)
    spotBlumePlane.material = spotBlumeMat
    spotBlumePlane.parent = moveScene_P
    spotBlumePlane.position.x = -1.2
    spotBlumePlane.position.y =0.6
    spotBlumePlane.position.z = 0
    spotBlumePlane.rotation.x = 0
    spotBlumePlane.rotation.y = 0

    spotclone1 = BABYLON.MeshBuilder.CreatePlane("spotclone1", { width: 1, height: 1 }, scene)
    spotclone1.material = spotBlumeMat
    spotclone1.position.y = 1.2
    spotclone1.position.x =-0.7

    spotclone2 = BABYLON.MeshBuilder.CreatePlane("spotclone2", { width: 1, height: 1 }, scene)
    spotclone2.material = spotBlumeMat
    spotclone2.position.y = 1.4
    spotclone2.position.x = 0

    spots_P = new BABYLON.TransformNode("spots_P")
    spotBlumePlane.parent = spots_P
    spots_P.parent = moveScene_P
    spotclone1.parent = spots_P
    spotclone2.parent = spots_P
}

var thingInside, thingMat

function createThingInside(){
    thingInside = new BABYLON.MeshBuilder.CreateCylinder("Thing",{height: 0.9, diameter: 0.05}, scene)
    thingInside.parent = moveScene_P
    thingInside.position.z = 0.5
    thingInside.position.y = -0.7
    thingInside.rotation.z = Math.PI/2

    thingMat = new BABYLON.StandardMaterial("thingMat", scene)
    thingInside.material =thingMat
}


//CREATE ANIMATIONS------------------------------------------------------------
function createAllAnims(){
    createTrackMatAnim()
    createSunAnimation()
    createAstroMatAnim()
}
//CREATE ANIMATIONS------------------------------------------------------------
function createFlyAnim(){
    //arrowAnimGroup = new BABYLON.AnimationGroup("eggAnimGroup");
    var flyAnimX = new BABYLON.Animation("flyAnimX", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var flyKeysX = []
    flyKeysX.push({ frame: 0, value: 2 })
    flyKeysX.push({ frame: 30, value: 1})
    flyKeysX.push({ frame: 60, value: 0.2})
    flyAnimX.setKeys(flyKeysX)


    var flyAnimY = new BABYLON.Animation("flyAnimY", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var flyKeysY = []
    flyKeysY.push({ frame: 0, value: 2 })
    flyKeysY.push({ frame: 30, value: 1})
    flyKeysY.push({ frame: 60, value: 0.33})
    flyAnimY.setKeys(flyKeysY)


    var scaleVogelAnim = new BABYLON.Animation("scaleVogelAnim", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var sclAnimKeys = []
    sclAnimKeys.push({ frame: 0, value: new BABYLON.Vector3(0,0,0)})
    sclAnimKeys.push({ frame: 60, value: new BABYLON.Vector3(1,1,1) })
    scaleVogelAnim.setKeys(sclAnimKeys)

    vogelPlane.animations = [];
    vogelPlane.animations.push(flyAnimY);
    vogelPlane.animations.push(flyAnimX);
    vogelPlane.animations.push(scaleVogelAnim);
}

function createWaveAnim(){

    var waveAnimChildRotZ = new BABYLON.Animation("waveAnimChildRotZ", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var waveChildKeysZ = []
    waveChildKeysZ.push({ frame: 0, value: 0 })
    waveChildKeysZ.push({ frame: 30, value: 0.4})
    waveChildKeysZ.push({ frame: 60, value: 0})
    waveAnimChildRotZ.setKeys(waveChildKeysZ)

    var waveAnimRotZ = new BABYLON.Animation("waveAnimRotZ", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var waveKeysZ = []
    waveKeysZ.push({ frame: 0, value: 0 })
    waveKeysZ.push({ frame: 45, value: 0.7 })
    waveKeysZ.push({ frame: 65, value: 0})
    waveKeysZ.push({ frame: 85, value: 0.8})
    waveKeysZ.push({ frame: 105, value: 0})
    waveKeysZ.push({ frame: 115, value: 0.6})
    waveKeysZ.push({ frame: 130, value: 0})
    waveAnimRotZ.setKeys(waveKeysZ)


    var waveAnimScale = new BABYLON.Animation("waveAnimScale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var waveSclKeys = []
    waveSclKeys.push({ frame: 0, value: new BABYLON.Vector3(0,0,0) })
    waveSclKeys.push({ frame: 30, value: new BABYLON.Vector3(0,0,0) })
    waveSclKeys.push({ frame: 42, value: new BABYLON.Vector3(1.4,1.4,1.4) })
    waveSclKeys.push({ frame: 45, value: new BABYLON.Vector3(1,1,1) })/*
    waveSclKeys.push({ frame: 65, value: new BABYLON.Vector3(0.2,0.2,0.2) })
    waveSclKeys.push({ frame: 85, value: new BABYLON.Vector3(1,1,1) })
    waveSclKeys.push({ frame: 105, value: new BABYLON.Vector3(0.2,0.2,0.2) })*/
    waveSclKeys.push({ frame: 115, value: new BABYLON.Vector3(1, 1, 1) })
    waveSclKeys.push({ frame: 118, value: new BABYLON.Vector3(1.4, 1.4, 1.4) })
    waveSclKeys.push({ frame: 130, value: new BABYLON.Vector3(0, 0, 0 )})
    waveAnimScale.setKeys(waveSclKeys)

    wave_P.animations = [];
    //wave_P.animations.push(waveAnimRotZ);
    wave_P.animations.push(waveAnimScale);
    //wavePlane.aniamtions = []
    //wavePlane.animations.push(waveAnimChildRotZ)
}

function createBlumeAnim(){

    var blumeAnimScale = new BABYLON.Animation("blumeAnimScale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var blumeSclKeys = []
    blumeSclKeys.push({ frame: 0, value: new BABYLON.Vector3(0,0,0) })
    blumeSclKeys.push({ frame: 12, value: new BABYLON.Vector3(1.4, 1.4, 1.4) })
    blumeSclKeys.push({ frame: 15, value: new BABYLON.Vector3(1, 1, 1) })/*
    blumeSclKeys.push({ frame: 40, value: new BABYLON.Vector3(0.8 , 0.8, 0.8) })
    blumeSclKeys.push({ frame: 65, value: new BABYLON.Vector3(1, 1, 1) })
    blumeSclKeys.push({ frame: 90, value: new BABYLON.Vector3(0.8, 0.8,0.8) })*/
    blumeSclKeys.push({ frame: 115, value: new BABYLON.Vector3(1, 1, 1) })
    blumeSclKeys.push({ frame: 118, value: new BABYLON.Vector3(1.4, 1.4, 1.4) })
    blumeSclKeys.push({ frame: 130, value: new BABYLON.Vector3(0, 0, 0 )})
    blumeAnimScale.setKeys(blumeSclKeys)

    blume_P.animations = [];
    //blume_P.animations.push(blumeAnimRotZ);
    blume_P.animations.push(blumeAnimScale);
}

function createSonneAnim(){

    var sonneAnimRotZ = new BABYLON.Animation("sonneAnimRotZ", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var sonneKeysZ = []
    sonneKeysZ.push({ frame: 0, value: 0 })
    sonneKeysZ.push({ frame: 130, value: Math.PI*2})
    sonneAnimRotZ.setKeys(sonneKeysZ)

    var sonnePnimScale = new BABYLON.Animation("sonnePnimScale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var sonnePSclKeys = []
    sonnePSclKeys.push({ frame: 0, value: new BABYLON.Vector3(0,0,0) })
    sonnePSclKeys.push({ frame: 15, value: new BABYLON.Vector3(0,0,0) })
    sonnePSclKeys.push({ frame: 27, value: new BABYLON.Vector3(1.4,1.4,1.4) })
    sonnePSclKeys.push({ frame: 30, value: new BABYLON.Vector3(1,1,1) })
    sonnePSclKeys.push({ frame: 115, value: new BABYLON.Vector3(1, 1, 1) })
    sonnePSclKeys.push({ frame: 118, value: new BABYLON.Vector3(1.4, 1.4, 1.4) })
    sonnePSclKeys.push({ frame: 130, value: new BABYLON.Vector3(0, 0, 0 )})
    sonnePnimScale.setKeys(sonnePSclKeys)


    var sonneAnimScale = new BABYLON.Animation("sonneAnimScale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var sonneSclKeys = []
    sonneSclKeys.push({ frame: 0, value: new BABYLON.Vector3(1,1,1) })
    sonneSclKeys.push({ frame: 30, value: new BABYLON.Vector3(1.2, 1.2, 1.2) })
    sonneSclKeys.push({ frame: 60, value: new BABYLON.Vector3(1,1,1) })
    sonneAnimScale.setKeys(sonneSclKeys)

    //sonnePlane.animations = [];
    //sonnePlane.animations.push(sonneAnimScale);
    //sonnePlane.animations.push(sonneAnimRotZ);
    sonne_P.animations= []
    sonne_P.animations.push(sonnePnimScale)
}

function createSpotAnim(){

    var  spotAnimRotZ = new BABYLON.Animation("spotAnimRotZ", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var spotKeysZ = []
    spotKeysZ.push({ frame: 0, value: 0 })
    spotKeysZ.push({ frame: 130, value: Math.PI*4})
    spotAnimRotZ.setKeys(spotKeysZ)

    var spotAnimScale = new BABYLON.Animation("spotAnimScale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var spotSclKeys = []
    spotSclKeys.push({ frame: 0, value: new BABYLON.Vector3(0,0,0) })
    spotSclKeys.push({ frame: 45, value: new BABYLON.Vector3(0,0,0) })
    spotSclKeys.push({ frame: 57, value: new BABYLON.Vector3(1.4,1.4,1.4) })
    spotSclKeys.push({ frame: 60, value: new BABYLON.Vector3(1,1,1) })
    spotSclKeys.push({ frame: 115, value: new BABYLON.Vector3(1, 1, 1) })
    spotSclKeys.push({ frame: 118, value: new BABYLON.Vector3(1.4, 1.4, 1.4) })
    spotSclKeys.push({ frame: 130, value: new BABYLON.Vector3(0, 0, 0 )})
    spotAnimScale.setKeys(spotSclKeys)

    spots_P.animations = [];
    spots_P.animations.push(spotAnimScale);

    /*
    spotclone1.animations = [];
    spotclone1.animations.push(spotAnimRotZ);

    spotclone2.animations = [];
    spotclone2.animations.push(spotAnimRotZ);

    spotBlumePlane.animations = [];
    spotBlumePlane.animations.push(spotAnimRotZ);*/
}

function createPillenAnim(){


    var pillenAnimScale = new BABYLON.Animation("pillenAnimScale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var pillenSclKeys = []
    pillenSclKeys.push({ frame: 0, value: new BABYLON.Vector3(0.001,0.001,0.001) })
    pillenSclKeys.push({ frame: 12, value: new BABYLON.Vector3(0.0024,0.0024,0.0024) })
    pillenSclKeys.push({ frame: 15, value: new BABYLON.Vector3(0.002,0.002,0.002) })
    pillenAnimScale.setKeys(pillenSclKeys)

    pillen_P.animations = []
    pillen_P.animations.push(pillenAnimScale)

}

var astroAnimGroup

function createTrackMatAnim(){
    trackerAnimGroup = new BABYLON.AnimationGroup("trackerAnimGroup");

    var trackerShineAnim = new BABYLON.Animation("trackerShineAnim", "animationSpeedFactor", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var trackerShineKeys = []
    trackerShineKeys.push({ frame: 0, value: 0 })
    trackerShineKeys.push({ frame: 30, value: 5})
    trackerShineAnim.setKeys(trackerShineKeys)

    trackerAnimGroup.addTargetedAnimation(trackerShineAnim, noiseText)
}

function createAstroMatAnim(){
    astroAnimGroup = new BABYLON.AnimationGroup("astroAnimGroup");

    var astroAlphaAnim = new BABYLON.Animation("astroAlphaAnim", "level", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var astroAlphaKeys = []
    astroAlphaKeys.push({ frame: 0, value: 0 })
    astroAlphaKeys.push({ frame: 30, value: 1})
    astroAlphaAnim.setKeys(astroAlphaKeys)

    var astroBrightAnim = new BABYLON.Animation("astroBrightAnim", "brightness", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var astroBrightKeys = []
    astroBrightKeys.push({ frame: 0, value: 0.3 })
    astroBrightKeys.push({ frame: 40, value: 0.3})
    astroBrightKeys.push({ frame: 50, value: 1})
    astroBrightAnim.setKeys(astroBrightKeys)

    astroAnimGroup.addTargetedAnimation(astroAlphaAnim, noiseAstro)
    astroAnimGroup.addTargetedAnimation(astroBrightAnim, noiseAstro)
}


function createSunAnimation(){
    var sunAnimZ = new BABYLON.Animation("sunAnimZ", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var sunKeysZ = []
    sunKeysZ.push({ frame: 0, value: 0 })
    sunKeysZ.push({ frame: 30, value: -1})
    sunAnimZ.setKeys(sunKeysZ)

    var sunAnimScl = new BABYLON.Animation("sunAnimScl", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var sunKeysScl = []
    sunKeysScl.push({ frame: 0, value: new BABYLON.Vector3(0,0,0) })
    sunKeysScl.push({ frame: 25, value: new BABYLON.Vector3(1.1,1.1,1.1)})
    sunKeysScl.push({ frame: 30, value: new BABYLON.Vector3(1,1,1)})
    sunAnimScl.setKeys(sunKeysScl)

    sun.animations = []
    sun.animations.push(sunAnimZ);
    sun.animations.push(sunAnimScl);
}
