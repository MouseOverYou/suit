var dummy_P, vogelSpriteSheet, hdrTexture, planeHolder, astroAnimTask, astro_P

function LoadAssets(scene, assetsManager) {

    //ENV TASK
    var envTask = assetsManager.addCubeTextureTask("envTask", "/assets/environment.dds");

    envTask.onSuccess = function (task) {
        //alert('HDR LOADED');
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("https://mouseoveryou.github.io/suit/assets/environment.dds", scene);

        // Create Skybox
        var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 0
        var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = true;
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    envTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }
    /*
    var vogelTexTask = assetsManager.addTextureTask("vogelImgTask", "/assets/vogel_sheet.png")

    vogelTexTask.onSuccess = function (task) {
        vogelSpriteSheet = task.texture
    }

    vogelTexTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    var dummyPackTask = assetsManager.addMeshTask("","", "/assets/dummyPack.glb")
    dummy_P = new BABYLON.TransformNode("dummy_P")
    dummy_P.parent = moveScene_P
    dummy_P.position.y = 0.18
    dummy_P.position.z = 0.5
    dummy_P.scaling = new BABYLON.Vector3(0.0022, 0.0022, 0.0022)

    dummyPackTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = dummy_P
    }

    dummyPackTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }
    */
    astroAnimTask = assetsManager.addMeshTask("","", "/assets/astronaut.glb")
    astro_P = new BABYLON.TransformNode("astro_P")
    astro_P.rotation.x = Math.PI/2
    astro_P.rotation.y = Math.PI
    astro_P.position.y = 0
    astro_P.position.z = 0
    astro_P.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05)

    astroAnimTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = astro_P
        //task.loadedAnimationGroups[0].pause()
        for (var i = 0; i < task.loadedMeshes[0].getChildMeshes().length; i++) {
            
    astro_P.parent = moveScene_P
            task.loadedMeshes[0].getChildMeshes()[i].isVisible = true
        }
    }

    astroAnimTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    assetsManager.onFinish = function (task) {
        console.log("finish loading")
        createAllMeshes()
        changeMats()
        createAllAnims()
        awakeExp()
    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}
