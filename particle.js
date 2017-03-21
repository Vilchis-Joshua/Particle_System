var camera;
var scene;
var renderer;
var cubeMesh;
var clock;
var deltaTime;
var rotationCamera = 0;
var particleSystem;
var lx, ly, lx;
var controls;
var ParticleSSun, particleSSun1, particleSMercury, particleSVenus, particleSEarth, particleSMars, particleSJupiter, particleSSaturn, particleSUranus, particleSNeptune;
var pivot, pivotMecury, pivotVenus, pivotEarth, pivotMars, pivotJupiter, pivotSaturn, pivotUranus, pivotNeptune;
var pivotOuterRingSaturn, pivotInnerRingSaturn;
var innerRingSaturn, outerRingSaturn;
var parameters;
var na, filler;
var pathMercury, pathVenus, pathEarth, pathMars, pathJupiter, pathSaturn, pathUranus, pathNeptune;

//Point lights
var pointLight;

//Speeds of the planets
var mecurySpeed = 0.08;
var venusSpeed = 0.06;
var earthSpeed = 0.04;
var marsSpeed = 0.02;
var jupiterSpeed = 0.01;
var saturnSpeed = 0.009;
var innerRingSpeed = saturnSpeed;
var outterRingSpeed = saturnSpeed;
var uranusSpeed = 0.007;
var neptuneSpeed = 0.005;

init();
animate();

function init() {


    clock = new THREE.Clock(true);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 6000);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 2000;
    //controls.minDistance = 600;

  // var cubeGeometry = new THREE.CubeGeometry( 10, 10, 10, 30, 30, 30 );
  // var triangleGeometry = new THREE.Geometry();
  // triangleGeometry.vertices.push(new THREE.Vector3( 0.0,  20.0, 0.0));
  // triangleGeometry.vertices.push(new THREE.Vector3(-20.0, -20.0, 0.0));
  // triangleGeometry.vertices.push(new THREE.Vector3( 20.0, -20.0, 0.0));
  // triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));





// var triangleMaterial = new THREE.MeshBasicMaterial({
//color:0xFFFFFF,
//side:THREE.DoubleSide
//});

// var triangleMesh = new THREE.Mesh(triangleGeometry, discTexture);
// triangleMesh.position.set(0, 0.0, -400);
// scene.add(triangleMesh);


    parameters = new function () {
      this.rotatoP = 1;
      //this.reset = function () { reset() };
    };

    addParameters(parameters);


    addPaths();
    addSunAndPlanets();
    addMoons();
    addContinents();
    addPivots();





    render();
}

function animate() {

    render();
    requestAnimationFrame( animate );
   //  camera.lookAt( scene.position ); // the origin

   animateParticles(particleSSun1);
   rotatePlanets();
   rotateAroundSun();
   rotateMoons();
  //  blowUpSun(particleSSun);
  //  blowUpSun(particleSSun1);


}

function render() {
    renderer.render( scene, camera );
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}

// function reset() {
//   init();
// }

function createTriangle3() {
  var x = 0, y = 0;

  var heartShape = new THREE.Shape();

  // for(var i = 0; i < 5; i++) {
  //   heartShape.moveTo( x, y );
  //   heartShape.bezierCurveTo(x - 3.5, y + 2);
  //   heartShape.bezierCurveTo(x - 1.5, y - 1.5);
  //
  //   heartShape.bezierCurveTo()
  //   // heartShape.bezierCurveTo(x + 5 - i, y - 5 + i);
  //   // heartShape.bezierCurveTo(x - 5 + (2 * i), y - 5);
  // }

  var heartShape = new THREE.Shape();

heartShape.moveTo( 0, 0 );

heartShape.bezierCurveTo( -6/4, 0, -6/4, -7/4, -6/4, -5/4);
heartShape.bezierCurveTo( -5/4, -8/4, -4/4, -8/4, -3/4, -8/4 );
heartShape.bezierCurveTo( -3/4, -8/4, -1/4, -4/4, 1/4, -8/4);
heartShape.bezierCurveTo( 1/4, -8/4, 4/4, -10/4, 7/4, -6/4);
heartShape.bezierCurveTo( 7/4, -6/4, 6/4, -10/4, 3/4, -11/4);
heartShape.bezierCurveTo( 3/4, -11/4, -9/4, -16/4, -11/4, -1/4);
heartShape.bezierCurveTo( -11/4, -1/4, -14/4, 0, -11/4, -10/4);
heartShape.bezierCurveTo( -11/4, -10/4, -13/4, -13/4, -16/4, 1/4);
heartShape.bezierCurveTo( -16/4, 1/4, -18/4, 4/4, -15/4, 10/4);
heartShape.bezierCurveTo( -15/4, 10/4, -11/4, 18/4, -24/4, 15/4);
heartShape.bezierCurveTo( -24/4, 15/4, -15/4, 25/4, -12/4, 19/4);
heartShape.bezierCurveTo( -12/4, 19/4, -8/4, 15/4, -6/4, 18/4);
heartShape.bezierCurveTo( -6/4, 18/4, 2/4, 18/4, -4/4, 11/4);
heartShape.bezierCurveTo( -4/4, 11/4, 6/4, 8/4, 2/4, 16/4);
heartShape.bezierCurveTo( 2/4, 16/4, 16/4, 16/4, 7/4, 10/4);
heartShape.bezierCurveTo( 7/4, 10/4, 15/4, 10/4, 7/4, 0);
heartShape.bezierCurveTo( 7/4, 0, 12/4, -5/4, 9/4, -5/4);
heartShape.bezierCurveTo( 9/4, -5/4, 7/4 ,0);
  var geometry = new THREE.ShapeGeometry( heartShape, 100 );

	var discTexture = new THREE.PointCloudMaterial({color: 0x256818});
	// var particleMaterial = new THREE.ParticleBasicMaterial({ map: discTexture, size: 10, color: 0xff0000, transparency: true, alphaTest: 0.5});
	var particleCube = new THREE.PointCloud( geometry, discTexture );
	particleCube.position.set(0, 0, 7);

  return particleCube;
	//scene.add( particleCube );
}



function addParameters(param) {
  var gui = new dat.GUI();
  gui.add(param, 'rotatoP', 0, 2, .1);
  //gui.add(param, 'reset');


  gui.open();
}
// Create the lights function --------------------------------------------------
function createLight( color, lx, ly, lz ) {
      var pointLight = new THREE.PointLight( color, 1, 700 );
      // var geometry = new THREE.SphereGeometry( 3, 12, 6 );
      // var material = new THREE.MeshBasicMaterial( { color: color } );
      //
      // var sphere = new THREE.Mesh( geometry, material );
      pointLight.position.set(lx, ly, lz);
      pointLight.add( pointLight );

      return pointLight;
}

function createParticleSystem(color, particleCount, image, startX, startY, startZ, isTransparent, size, oRadius, iRadius) {

    // The number of particles in a particle system is not easily changed.
    // var particleCount = 10000;

    // Particles are just individual vertices in a geometry
    // Create the geometry that will hold all of the vertices
    var particles = new THREE.Geometry();
    var px = 0.0;
    var py = 0.0;
    var pz = 0.0;

    // Create the vertices and add them to the particles geometry
    for (var p = 0; p < particleCount; p++) {

      var distance = THREE.Math.randFloatSpread(oRadius) - iRadius;
      var theta = THREE.Math.randFloatSpread(360);
      var phi = THREE.Math.randFloatSpread(360);

      px = distance * Math.sin(theta) * Math.cos(phi);
      py = distance * Math.sin(theta) * Math.sin(phi);
      pz = distance * Math.cos(theta);
      var particle = new THREE.Vector3(px, py, pz);
        // // This will create all the vertices in a range of -200 to 200 in all directions
        // var x = Math.random() * 400 - 200;
        // var y = Math.random() * 400 - 200;
        // var z = Math.random() * 400 - 200;
        //
        // // Create the vertex
        // var particle = new THREE.Vector3(x, y, z);

        // Add the vertex to the geometry
        particles.vertices.push(particle);
    }

    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial(
            {color: color,
             size: size,
             map: THREE.ImageUtils.loadTexture(image),
             blending: THREE.AdditiveBlending,
             transparent: isTransparent,
            });

    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);

    particleSystem.position.set (startX, startY, startZ);
    return particleSystem;
}

function createParticleSystemRing(color, particleCount, image, startX, startY, startZ, isTransparent, size, oRadius, iRadius ,j ,k) {

    // The number of particles in a particle system is not easily changed.
    // var particleCount = 10000;

    // Particles are just individual vertices in a geometry
    // Create the geometry that will hold all of the vertices
    var particles = new THREE.Geometry();
    var px = 0.0;
    var py = 0.0;
    var pz = 0.0;

    // Create the vertices and add them to the particles geometry
    for (var p = 0; p < particleCount; p++) {

      var distance = THREE.Math.randFloatSpread(oRadius) - iRadius;
      var theta = THREE.Math.randFloatSpread(j);
      var phi = THREE.Math.randFloatSpread(k);

      px = distance * Math.sin(theta) * Math.cos(phi);
      py = distance * Math.sin(theta) * Math.sin(phi);
      pz = distance * Math.cos(theta);
      var particle = new THREE.Vector3(px, py, pz);
        // // This will create all the vertices in a range of -200 to 200 in all directions
        // var x = Math.random() * 400 - 200;
        // var y = Math.random() * 400 - 200;
        // var z = Math.random() * 400 - 200;
        //
        // // Create the vertex
        // var particle = new THREE.Vector3(x, y, z);

        // Add the vertex to the geometry
        particles.vertices.push(particle);
    }

    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial(
            {color: color,
             size: size,
             map: THREE.ImageUtils.loadTexture(image),
             blending: THREE.AdditiveBlending,
             transparent: isTransparent,
            });

    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);

    particleSystem.position.set (startX, startY, startZ);
    return particleSystem;
}

// function createTriangle(size, tcolor, posX, posY, posZ) {
//   var x = 0, y = 0;
//
//   var heartShape = new THREE.Shape();
//
//   for(var i = 0; i < size; i++) {
//     // heartShape.moveTo( x + 5, y + 5 );
//     heartShape.bezierCurveTo(x + i, y + i);
//     heartShape.bezierCurveTo(x - size + i, y + size - i);
//     heartShape.bezierCurveTo(x + size - (2 * i), y + size);
//   }
//   var geometry = new THREE.ShapeGeometry( heartShape, 100);
//
// 	var discTexture = new THREE.PointCloudMaterial({color: tcolor});
// 	// var particleMaterial = new THREE.ParticleBasicMaterial({ map: discTexture, size: 10, color: 0xff0000, transparency: true, alphaTest: 0.5});
// 	var particleCube = new THREE.PointCloud( geometry, discTexture );
// 	particleCube.position.set(posX, posY, posZ);
//
//   return particleCube;
// 	//scene.add( particleCube );
// }

// function createTriangle2(size, tcolor, posX, posY, posZ) {
//   var x = 0, y = 0;
//
//   var heartShape = new THREE.Shape();
//
//   for(var i = 0; i < size; i++) {
//     // heartShape.moveTo( x + 5, y + 5 );
//     heartShape.bezierCurveTo(x - i, y - i);
//     heartShape.bezierCurveTo(x + size - i, y - size + i);
//     heartShape.bezierCurveTo(x - size + (2 * i), y - size);
//   }
//   var geometry = new THREE.ShapeGeometry( heartShape );
//
// 	var discTexture = new THREE.PointCloudMaterial({color: tcolor});
// 	var particleCube = new THREE.PointCloud( geometry, discTexture );
// 	particleCube.position.set(posX, posY, posZ);
//
//   return particleCube;
// }

function addContinents() {
  na = createTriangle3();

  scene.add( na );
}

function addPaths() {
  pathMercury = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 110, 360, 0);
  pathVenus = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 140, 360, 0);
  pathEarth = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 180, 360, 0);
  pathMars = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 215, 360, 0);
  pathJupiter = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 280, 360, 0);
  pathSaturn = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 370, 360, 0);
  pathUranus = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 450, 360, 0);
  pathNeptune = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 500, 360, 0);

  scene.add(pathMercury);
  scene.add(pathVenus);
  scene.add(pathEarth);
  scene.add(pathMars);
  scene.add(pathJupiter);
  scene.add(pathSaturn);
  scene.add(pathUranus);
  scene.add(pathNeptune);
}


function addSunAndPlanets() {
  particleSSun = createParticleSystem(0xEA7D17, 700000, "disc.png", 0, 0, 0, true, 1, 10, 80); //sun
  particleSSun1 = createParticleSystem(0xEEF21F, 100000, "disc.png", 0, 0, 0, true, 4, 80, 40); //sun
  particleSMercury = createParticleSystem(0x86989D, 10000, "disc.png", -110, 0, 0, true, 2, 1, 3); //mercury
  particleSVenus = createParticleSystem(0xDD9939, 30000, "disc.png", 0, 0, -140, true, 2, 1, 8); //venus
  particleSEarth = createParticleSystem(0x1E35BC, 30000, "particle.png", 0, 0, 180, true, 2, 1, 7); //earth
  particleSMars = createParticleSystem(0xDB5525 ,20000, "disc.png", 215, 0, 0, true, 2, 1, 4); //mars
  particleSJupiter = createParticleSystem(0xC1Ac8F, 60000, "particle.png", 0, 0, -280, true, 2, 3, 30); //jupiter
  particleSSaturn = createParticleSystem(0xC1B95B, 60000, "particle.png", 0, 0, 370, true, 3, 1, 27); //saturn
  particleSUranus = createParticleSystem(0x408BB7, 30000, "disc.png", -450, 0, 0, true, 2, 1, 17); //uranus
  particleSNeptune = createParticleSystem(0x408BB7, 40000, "particle.png", 500, 0, 0, true, 2, 1, 17); //neptune
  innerRingSaturn = createParticleSystemRing(0xEFBE5B, 10000, "disc.png", 0, 0, 370, true, 3, 12, 40, 360, 0);
  outerRingSaturn = createParticleSystemRing(0xEFBE5B, 10000, "particle.png", 0, 0, 370, true, 3, 6, 51, 360, 0);
  ringJupiter = createParticleSystemRing(0xEFBE5B, 1000, "particle.png", 0, 0, -280, true, 3, 12, 35, 360, 0);
  eyeOfTheTiget = createParticleSystemRing(0xc6910b, 10000, "particle.png", 0, 0, -24.5, true, 2, 0, 6, 1, 360);



  scene.add(particleSSun);
  scene.add(particleSSun1);
  scene.add(particleSMercury);
  scene.add(particleSVenus);
  scene.add(particleSEarth);
  scene.add(particleSMars);
  scene.add(particleSJupiter);
  scene.add(particleSSaturn);
  scene.add(particleSUranus);
  scene.add(particleSNeptune);
  scene.add(innerRingSaturn);
  scene.add(outerRingSaturn);
  scene.add(ringJupiter);
  scene.add(eyeOfTheTiget);
}

function addMoons() {
  earthMoon = createParticleSystem(0x87939B, 10000, "particle.png", 0, 0, 12, true, 2, 1, 1);
  neptuneMoon = createParticleSystem(0x87939B, 10000, "particle.png", 25, 0, 0, true, 2, 1, 0.5);
  marsMoon1 = createParticleSystem(0x87939B, 10000, "particle.png", 9, 0, 0, true, 2, 1, 0.1);
  marsMoon2 = createParticleSystem(0x87939B, 10000, "particle.png", -9, 0, 0, true, 2, 1, 0.1);

  scene.add(earthMoon);
  scene.add(marsMoon1);
  scene.add(marsMoon2);
  scene.add(neptuneMoon);
}

function rotateAroundSun() {

  pivotMecury.rotation.y += (parameters.rotatoP * mecurySpeed);
  pivotVenus.rotation.y += (parameters.rotatoP * venusSpeed);
  pivotEarth.rotation.y += (parameters.rotatoP * earthSpeed);
  pivotMars.rotation.y += (parameters.rotatoP * marsSpeed);
  pivotJupiter.rotation.y += (parameters.rotatoP * jupiterSpeed);
  pivotSaturn.rotation.y += (parameters.rotatoP * saturnSpeed);
  pivotUranus.rotation.y += (parameters.rotatoP * uranusSpeed);
  pivotNeptune.rotation.y += (parameters.rotatoP * neptuneSpeed);



}

function rotateMoons () {

    pivotEarthMoon.rotation.y += 0.05;
    pivotMarsMoon.rotation.y += 0.05;
    pivotNeptuneMoon.rotation.y += 0.05;
}

function rotatePlanets() {
  particleSMercury.rotation.y += 0.00017;
  particleSVenus.rotation.y += 0.000086;
  particleSEarth.rotation.y += 0.01;
  particleSMars.rotation.y += 0.01;
  particleSJupiter.rotation.y += 0.0266;
  particleSSaturn.rotation.y += 0.024;
  particleSUranus.rotation.y += 0.0141;
  particleSNeptune.rotation.y += 0.015;
  outerRingSaturn.rotation.y += 0.015;
  innerRingSaturn.rotation.y += 0.02;
  pivotEye.rotation.y += 0.0266;
  pivotContinents.rotation.y += 0.01;
  ringJupiter.rotation.y += 0.0255;
}

function addPivots() {
  //Mecury
  pivotMecury = new THREE.Group();
  pivotMecury.add( particleSMercury );
  //Venus
  pivotVenus = new THREE.Group();
  pivotVenus.add( particleSVenus );
  //Earth
  pivotEarthMoon = new THREE.Group();
  pivotEarthMoon.position.set(0, 0, 180);
  pivotEarthMoon.add( earthMoon );

  pivotContinents = new THREE.Group();
  pivotContinents.position.set(0, 0, 180);
  pivotContinents.add( na );
  pivotContinents.add( filler );

  pivotEarth = new THREE.Group();
  pivotEarth.add( particleSEarth );
  pivotEarth.add( pivotEarthMoon );
  pivotEarth.add( pivotContinents );
  //Mars
  pivotMarsMoon = new THREE.Group();
  pivotMarsMoon.position.set(215, 0, 0);
  pivotMarsMoon.add( marsMoon1 );
  pivotMarsMoon.add( marsMoon2 );

  pivotMars = new THREE.Group();
  pivotMars.add( particleSMars );
  pivotMars.add( pivotMarsMoon );
  //Jupiter

  pivotEye = new THREE.Group();
  pivotEye.position.set(0, -10, -280);
  pivotEye.add ( eyeOfTheTiget );

  pivotJupiter = new THREE.Group();

  pivotJupiter.add( particleSJupiter );
  pivotJupiter.add( ringJupiter );
  pivotJupiter.add( pivotEye );
  //Saturn
  pivotSaturn = new THREE.Group();
  pivotSaturn.add( particleSSaturn );
  pivotSaturn.add( innerRingSaturn );
  pivotSaturn.add( outerRingSaturn );
  //Uranus
  pivotUranus = new THREE.Group();
  pivotUranus.add( particleSUranus );
  //Neptune

  pivotNeptuneMoon = new THREE.Group();
  pivotNeptuneMoon.position.set(500, 0, 0);
  pivotNeptuneMoon.add( neptuneMoon );

  pivotNeptune = new THREE.Group();
  pivotNeptune.add( particleSNeptune );
  pivotNeptune.add( pivotNeptuneMoon );






  scene.add( pivotMecury );
  scene.add( pivotVenus );
  scene.add( pivotEarth );
  scene.add( pivotMars );
  scene.add( pivotJupiter );
  scene.add( pivotSaturn );
  scene.add( pivotUranus );
  scene.add( pivotNeptune );

}

function loadSkyBox() {

        // Load the skybox images and create list of materials
        var materials = [
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // right
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // left
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // top
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // bottom
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // back
            createMaterial( 'galaxy-wallpaper-02.jpg' )  // front
        ];

        // Create a large cube
        var mesh = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), new THREE.MeshFaceMaterial( materials ) );
      //   var mesh = new THREE.Mesh( new THREE.SphereGeometry( 100, 100, 800, 1, 1, 1 ), new THREE.MeshFaceMaterial( materials ) );

        // Set the x scale to be -1, this will turn the cube inside out
        mesh.scale.set(-4,4,4);
        scene.add( mesh );
}


function createMaterial( path ) {
    var texture = THREE.ImageUtils.loadTexture(path);
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5});

    return material;
}

function animateParticles(particleSystems) {
  var verts = particleSystems.geometry.vertices;
  for(var i = 0; i < verts.length; i++) {
    var vert = verts[i];

    var curDist = Math.sqrt(Math.pow(vert.y,2)+Math.pow(vert.x,2)+Math.pow(vert.z,2));
    if (curDist < -10 || curDist > 10) {
      var distance = THREE.Math.randFloatSpread(80)- 40;
      var theta = THREE.Math.randFloatSpread(360);
      var phi = THREE.Math.randFloatSpread(360);


      vert.x = distance * Math.sin(theta) * Math.cos(phi);
      vert.y = distance * Math.sin(theta) * Math.sin(phi);
      vert.z = distance * Math.cos(theta);
    }

    var theta = THREE.Math.randFloatSpread(360);
    var phi = THREE.Math.randFloatSpread(360);
    vert.x = vert.x + Math.sin(theta) * Math.cos(phi) *2;
    vert.y = vert.y + Math.sin(theta) * Math.sin(phi) *2;
    vert.z = vert.z + Math.cos(theta) *2;
  }
  particleSystems.geometry.verticesNeedUpdate = true;
}

function blowUpSun(particleSystems) {
  var verts = particleSystems.geometry.vertices;
  for(var i = 0; i < verts.length; i++) {
    var vert = verts[i];


    var theta = THREE.Math.randFloatSpread(360);
    var phi = THREE.Math.randFloatSpread(360);
    vert.x = vert.x + Math.sin(theta) * Math.cos(phi) * 100;
    vert.y = vert.y + Math.sin(theta) * Math.sin(phi) * 100;
    vert.z = vert.z + Math.cos(theta) * 100;
  }
  particleSystems.geometry.verticesNeedUpdate = true;
}
