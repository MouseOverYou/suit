
var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true }, false); // Generate the BABYLON 3D engine
var light1, light, shadowGenerator, moveScene_P
var camera
var slotmachinePlaced = false;
var isWinning = false;
var ground, sphere, planeHolder, spherePbr
var trackingImageId = "";
var wheelSideImage = "", wheelMiddleImage = "", wheelEmissiveImage = "";
var touches = new Array();
var currentScale = 1.0;
var startScale = 1.0;
var scalingDone = false;


/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    //    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2, Math.PI/2, 8, new BABYLON.Vector3(0, 1.5, 0), scene);
    camera = new BABYLON.FreeCamera('Camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    camera.position = new BABYLON.Vector3(0, 3, 5);

    ground = BABYLON.Mesh.CreatePlane('ground', 100, scene);
    ground.rotation.x = Math.PI / 2;
    ground.material = new BABYLON.StandardMaterial("groundMaterial", scene);
    ground.material.alpha = 0;

    moveScene_P = new BABYLON.TransformNode("moveScene_P");
    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)

    light = new BABYLON.DirectionalLight("*dir00", new BABYLON.Vector3(0,0, -1), scene);
    light.position = new BABYLON.Vector3(0,0,-1);
    light.intensity = 0.1

    moveScene_P = new BABYLON.TransformNode("moveScene_P", scene)
    return scene;
};

var scene = createScene(); //Call the createScene function

var onImageUpdated = function (e) {
    console.log("Image Update found.");
    //sphere.position.copyFrom(e.position)
    moveScene_P.position.copyFrom(e.position)
    moveScene_P.rotationQuaternion = new BABYLON.Quaternion();
    moveScene_P.rotationQuaternion.copyFrom(e.rotation);
    moveScene_P.scaling.set(e.scale, e.scale, e.scale)
};


var onImageFound = function (e) {

    
    console.log("Image found.");
    moveScene_P.position.copyFrom(e.position)
    moveScene_P.rotationQuaternion = new BABYLON.Quaternion();
    moveScene_P.rotationQuaternion.copyFrom(e.rotation);
    moveScene_P.scaling.set(e.scale, e.scale, e.scale)
    /*
    if (!slotmachinePlaced) {
        const pos = BABYLON.Vector3.Project(
            e.position,
            BABYLON.Matrix.IdentityReadOnly,
            scene.getTransformMatrix(),
            camera.viewport.toGlobal(
                engine.getRenderWidth(),
                engine.getRenderHeight(),
            )
        );

        var ray = scene.createPickingRay(pos.x, pos.y, BABYLON.Matrix.IdentityReadOnly, camera, false);

        const worldPos = new BABYLON.Vector3();
        worldPos.copyFrom(ray.origin);

        const epos = new BABYLON.Vector3(e.position.x, e.position.y, e.position.z);
        const dist = epos.subtract(camera.position).length();

        var relDist = dist / e.scale;

        worldPos.addInPlace(ray.direction.scale(1.2 * relDist));

        const camPos = camera.position;
        const hitpos = new BABYLON.Vector3();
        hitpos.copyFrom(worldPos);

        const campos = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
        const v = hitpos.subtract(campos);

        const threshold = 1;

        const planeV = new BABYLON.Vector3(v.x, 0, v.z);

        moveScene_P.scaling.set(e.scale, e.scale, e.scale)
        if (planeV.length() < threshold) {
            // Camera is above ticket - use ticket orientation

            moveScene_P.rotationQuaternion = new BABYLON.Quaternion();
            moveScene_P.rotationQuaternion.copyFrom(e.rotation);
            moveScene_P.rotate(BABYLON.Axis.X, -2* Math.PI, BABYLON.Space.LOCAL);
            moveScene_P.rotate(BABYLON.Axis.Y, Math.PI*2, BABYLON.Space.LOCAL);

        }
        else {
            // Make slotmachine face camera
            var ang = -Math.atan2(v.z, v.x) - 0.5 * Math.PI;
            const rot = BABYLON.Quaternion.FromEulerAngles(0, Math.PI + ang, 0);
            moveScene_P.rotationQuaternion = rot;
        }

        moveScene_P.position.set(worldPos.x, worldPos.y, worldPos.z);

        slotmachinePlaced = true;
    }*/



};

var onImageLost = function (e) {
};

var onImageScanning = function (e) {
    console.log("scanning!!!")
}
var onxrloaded = function () {


    // Set list of recognized image targets
    XR8.XrController.configure({ imageTargets: ["tracker_b"] });

    XR.addCameraPipelineModules([
        XRExtras.AlmostThere.pipelineModule(),
        XRExtras.FullWindowCanvas.pipelineModule(),
        XRExtras.Loading.pipelineModule(),
        XRExtras.RuntimeError.pipelineModule()
    ]);

    camera.addBehavior(XR.Babylonjs.xrCameraBehavior(), true);

    scene.onXrImageFoundObservable.add(onImageFound);
    scene.onXrImageLostObservable.add(onImageLost);
    scene.onXrImageUpdatedObservable.add(onImageUpdated);
    scene.onXrImageScanningObservable.add(onImageScanning);

    //alert("xr loaded.");
    console.log(camera)
};

/******* End of the create scene function ******/

//scene.debugLayer.show();
function load() {
    XRExtras.Loading.showLoading({ onxrloaded });
}

window.onload = function () {
    if (window.XRExtras)
        load();
    else
        window.addEventListener('xrextrasloaded', load);
};



// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

