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
var ParticleSSun, particleSSun1, particleSSun2, particleSMercury, particleSVenus, particleSEarth, particleSMars, particleSJupiter, particleSSaturn, particleSUranus, particleSNeptune;
var pivot, pivotMecury, pivotVenus, pivotEarth, pivotMars, pivotJupiter, pivotSaturn, pivotUranus, pivotNeptune;
var pivotOuterRingSaturn, pivotInnerRingSaturn;
var innerRingSaturn, outerRingSaturn;
var parameters;
var na
var pathMercury, pathVenus, pathEarth, pathMars, pathJupiter, pathSaturn, pathUranus, pathNeptune;
var textSun, textMercury, textVenus, textEarth, textMars, textJupiter, textSaturn, textUranus, textNeptune;

//Point lights
var pointLight;

//Speeds of the planets
var mecurySpeed = 0.00011364;
var venusSpeed = 0.00004444;
var earthSpeed = 0.0000274;
var marsSpeed = 0.000014556;
var jupiterSpeed = 0.000002308;
var saturnSpeed = 0.000000929;
var innerRingSpeed = saturnSpeed;
var outterRingSpeed = saturnSpeed;
var uranusSpeed = 0.000000326;
var neptuneSpeed = 0.000000166;

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
    controls.minDistance = 600;


    parameters = new function () {
      this.rotatoP = 1;
      this.ShowPath = false;
      this.showMercury = false;
      this.showVenus = false;
      this.showEarth = false;
      this.showMars = false;
      this.showJupiter = false;
      this.showSaturn = false;
      this.showUranus = false;
      this.showNeptune = false;
      this.explode = false;
      // this.showText = false;
      //this.reset = function () { reset() };
    };

    addParameters(parameters);


    addSunAndPlanets();
    addMoons();
    addContinents();

    addPivots();
        createPlanetNameText();








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

  var shape = new THREE.Shape();

  // for(var i = 0; i < 5; i++) {
  //   shape.moveTo( x, y );
  //   shape.bezierCurveTo(x - 3.5, y + 2);
  //   shape.bezierCurveTo(x - 1.5, y - 1.5);
  //
  //   shape.bezierCurveTo()
  //   // shape.bezierCurveTo(x + 5 - i, y - 5 + i);
  //   // shape.bezierCurveTo(x - 5 + (2 * i), y - 5);
  // }

  var shape = new THREE.Shape();

shape.moveTo( 0, 0 );

shape.bezierCurveTo( -6/4, 0, -6/4, -7/4, -6/4, -5/4);
shape.bezierCurveTo( -5/4, -8/4, -4/4, -8/4, -3/4, -8/4 );
shape.bezierCurveTo( -3/4, -8/4, -1/4, -4/4, 1/4, -8/4);
shape.bezierCurveTo( 1/4, -8/4, 4/4, -10/4, 7/4, -6/4);
shape.bezierCurveTo( 7/4, -6/4, 6/4, -10/4, 3/4, -11/4);
shape.bezierCurveTo( 3/4, -11/4, -9/4, -16/4, -11/4, -1/4);
shape.bezierCurveTo( -11/4, -1/4, -14/4, 0, -11/4, -10/4);
shape.bezierCurveTo( -11/4, -10/4, -13/4, -13/4, -16/4, 1/4);
shape.bezierCurveTo( -16/4, 1/4, -18/4, 4/4, -15/4, 10/4);
shape.bezierCurveTo( -15/4, 10/4, -11/4, 18/4, -24/4, 15/4);
shape.bezierCurveTo( -24/4, 15/4, -15/4, 25/4, -12/4, 19/4);
shape.bezierCurveTo( -12/4, 19/4, -8/4, 15/4, -6/4, 18/4);
shape.bezierCurveTo( -6/4, 18/4, 2/4, 18/4, -4/4, 11/4);
shape.bezierCurveTo( -4/4, 11/4, 6/4, 8/4, 2/4, 16/4);
shape.bezierCurveTo( 2/4, 16/4, 16/4, 16/4, 7/4, 10/4);
shape.bezierCurveTo( 7/4, 10/4, 15/4, 10/4, 7/4, 0);
shape.bezierCurveTo( 7/4, 0, 12/4, -5/4, 9/4, -5/4);
shape.bezierCurveTo( 9/4, -5/4, 7/4 ,0);
  var geometry = new THREE.ShapeGeometry( shape, 100 );

	var discTexture = new THREE.PointCloudMaterial({color: 0x256818});
	// var particleMaterial = new THREE.ParticleBasicMaterial({ map: discTexture, size: 10, color: 0xff0000, transparency: true, alphaTest: 0.5});
	var particleCube = new THREE.PointCloud( geometry, discTexture );
	particleCube.position.set(0, 0, 7);

  return particleCube;
	//scene.add( particleCube );
}



function addParameters(param) {
  var gui = new dat.GUI();
  gui.add(param, 'rotatoP', 0, 10000).name('Rotation Modifier');
  var pathCont = gui.add(param, 'ShowPath').name('Path');
  pathCont.onChange(function(value) {
    if(value == true) {
      addPaths();
    }
    else {
      scene.remove(pathMercury);
      scene.remove(pathVenus);
      scene.remove(pathEarth);
      scene.remove(pathMars);
      scene.remove(pathJupiter);
      scene.remove(pathSaturn);
      scene.remove(pathUranus);
      scene.remove(pathNeptune);
    }
}
);
    var f1 = gui.addFolder('Planets');

    var mercuryCont = f1.add(param, 'showMercury').name('Show Mercury');
    mercuryCont.onChange(function(value) {
      if (value == true) {
        //camera.lookAt( particleSEarth.position );
        pivotMercury.add(camera);

        camera.lookAt(particleSMercury.position);
        camera.position.set(300, 200, 300);
      }
      else {
        pivotMercury.remove(camera);
        camera.position.x = 1200;
        camera.position.y = 800;
        camera.position.z = 1000;
        camera.lookAt( scene.position );

      }
    }
  );
  var venusCont = f1.add(param, 'showVenus').name('Show Venus');
  venusCont.onChange(function(value) {
    if (value == true) {
      //camera.lookAt( particleSEarth.position );
      pivotVenus.add(camera);

      camera.lookAt(particleSVenus.position);
      camera.position.set(300, 200, 300);
    }
    else {
      pivotVenus.remove(camera);
      camera.position.x = 1200;
      camera.position.y = 800;
      camera.position.z = 1000;
      camera.lookAt( scene.position );

    }
  }
);

    var earthCont = f1.add(param, 'showEarth').name('Show Earth');
    earthCont.onChange(function(value) {
      if (value == true) {
        //camera.lookAt( particleSEarth.position );
        pivotEarth.add(camera);

        camera.lookAt(particleSEarth.position);
        camera.position.set(300, 200, 350);
      }
      else {
        pivotEarth.remove(camera);
        camera.position.x = 1200;
        camera.position.y = 800;
        camera.position.z = 1000;
        camera.lookAt( scene.position );

      }
    }
  );

  var marsCont = f1.add(param, 'showMars').name('Show Mars');
  marsCont.onChange(function(value) {
    if (value == true) {
      //camera.lookAt( particleSEarth.position );
      pivotMars.add(camera);

      camera.lookAt(particleSMars.position);
      camera.position.set(400, 200, 400);
    }
    else {
      pivotMars.remove(camera);
      camera.position.x = 1200;
      camera.position.y = 800;
      camera.position.z = 1000;
      camera.lookAt( scene.position );

    }
  }
);

var jupiterCont = f1.add(param, 'showJupiter').name('Show Jupiter');
jupiterCont.onChange(function(value) {
  if (value == true) {
    //camera.lookAt( particleSEarth.position );
    pivotJupiter.add(camera);

    camera.lookAt(particleSJupiter.position);
    camera.position.set(500, 200, 500);
  }
  else {
    pivotJupiter.remove(camera);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;
    camera.lookAt( scene.position );

  }
}
);

var saturnCont = f1.add(param, 'showSaturn').name('Show Saturn');
saturnCont.onChange(function(value) {
  if (value == true) {
    //camera.lookAt( particleSEarth.position );
    pivotSaturn.add(camera);

    camera.lookAt(particleSSaturn.position);
    camera.position.set(450, 200, 600);
  }
  else {
    pivotSaturn.remove(camera);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;
    camera.lookAt( scene.position );

  }
}
);

var uranusCont = f1.add(param, 'showUranus').name('Show Uranus');
uranusCont.onChange(function(value) {
  if (value == true) {
    //camera.lookAt( particleSEarth.position );
    pivotUranus.add(camera);

    camera.lookAt(particleSUranus.position);
    camera.position.set(450, 200, 700);
  }
  else {
    pivotUranus.remove(camera);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;
    camera.lookAt( scene.position );

  }
}
);

var neptuneCont = f1.add(param, 'showNeptune').name('Show Neptune');
neptuneCont.onChange(function(value) {
  if (value == true) {
    //camera.lookAt( particleSEarth.position );
    pivotNeptune.add(camera);

    camera.lookAt(particleSNeptune.position);
    camera.position.set(450, 200, 700);
  }
  else {
    pivotNeptune.remove(camera);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;
    camera.lookAt( scene.position );

  }
}
);

// var textCont = gui.add(param, 'showText').name('Show Planet Names');
// textCont.onChange(function(value) {
//   if (value == true) {
//     createPlanetNameText();
//   }
//   else {
//
//   }
// }
// );

  var explodeCont = gui.add(param, 'explode').name('EXPLODE');
  explodeCont.onChange(function(value) {
    if(value == true) {
      blowUpSun(particleSSun);
      scene.remove(particleSSun1);
      scene.remove(particleSMercury);
      scene.remove(particleSVenus);
      scene.remove(particleSEarth);
      scene.remove(particleSMars);
      scene.remove(particleSJupiter);
      scene.remove(particleSSaturn);
      scene.remove(particleSUranus);
      scene.remove(particleSNeptune);
      scene.remove(innerRingSaturn);
      scene.remove(outerRingSaturn);
      scene.remove(ringJupiter);
      scene.remove(eyeOfTheTiget);

      scene.remove(earthMoon);

      scene.remove( pivotMercury );
      scene.remove( pivotVenus );
      scene.remove( pivotEarth );
      scene.remove( pivotMars );
      scene.remove( pivotJupiter );
      scene.remove( pivotSaturn );
      scene.remove( pivotUranus );
      scene.remove( pivotNeptune );

    }
    else {
      scene.remove(particleSSun);
      particleSSun2 = createParticleSystem(0xEA7D17, 700000, "disc.png", 0, 0, 0, true, 1, 10, 80); //sun
      scene.add(particleSSun1);
      scene.add(particleSSun2);
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

      scene.add(earthMoon);
      addPivots();
      createPlanetNameText();
    }
  });

  //f1.open();
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
  pathSaturn = createParticleSystemRing(0xFFFFFF, 8000, "disc.png", 0, 0, 0, true, 1, 1, 390, 360, 0);
  pathUranus = createParticleSystemRing(0xFFFFFF, 10000, "disc.png", 0, 0, 0, true, 1, 1, 470, 360, 0);
  pathNeptune = createParticleSystemRing(0xFFFFFF, 10000, "disc.png", 0, 0, 0, true, 1, 1, 520, 360, 0);

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
  particleSMercury = createParticleSystem(0x86989D, 10000, "disc.png", 0, 0, 110, true, 2, 1, 3); //mercury
  particleSVenus = createParticleSystem(0xDD9939, 30000, "disc.png", 0, 0, 140, true, 2, 1, 8); //venus
  particleSEarth = createParticleSystem(0x1E35BC, 30000, "particle.png", 0, 0, 180, true, 2, 1, 7); //earth
  particleSMars = createParticleSystem(0xDB5525 ,20000, "disc.png", 0, 0, 215, true, 2, 1, 4); //mars
  particleSJupiter = createParticleSystem(0xC1Ac8F, 60000, "particle.png", 0, 0, 280, true, 2, 3, 30); //jupiter
  particleSSaturn = createParticleSystem(0xC1B95B, 60000, "particle.png", 0, 0, 390, true, 3, 1, 27); //saturn
  particleSUranus = createParticleSystem(0x408BB7, 30000, "disc.png", 0, 0, 470, true, 2, 1, 17); //uranus
  particleSNeptune = createParticleSystem(0x408BB7, 40000, "particle.png", 0, 0, 520, true, 2, 1, 17); //neptune
  innerRingSaturn = createParticleSystemRing(0xEFBE5B, 10000, "disc.png", 0, 0, 390, true, 3, 12, 40, 360, 0);
  outerRingSaturn = createParticleSystemRing(0xEFBE5B, 10000, "particle.png", 0, 0, 390, true, 3, 6, 51, 360, 0);
  ringJupiter = createParticleSystemRing(0xEFBE5B, 1000, "particle.png", 0, 0, 280, true, 3, 12, 35, 360, 0);
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
  // neptuneMoon = createParticleSystem(0x87939B, 10000, "particle.png", 25, 0, 0, true, 2, 1, 0.5);
  // marsMoon1 = createParticleSystem(0x87939B, 10000, "particle.png", 9, 0, 0, true, 2, 1, 0.1);
  // marsMoon2 = createParticleSystem(0x87939B, 10000, "particle.png", -9, 0, 0, true, 2, 1, 0.1);

  scene.add(earthMoon);
  // scene.add(marsMoon1);
  // scene.add(marsMoon2);
  // scene.add(neptuneMoon);
}

function rotateAroundSun() {

  pivotMercury.rotation.y += (parameters.rotatoP * mecurySpeed);
  pivotVenus.rotation.y += (parameters.rotatoP * venusSpeed);
  pivotEarth.rotation.y += (parameters.rotatoP * earthSpeed);
  pivotMars.rotation.y += (parameters.rotatoP * marsSpeed);
  pivotJupiter.rotation.y += (parameters.rotatoP * jupiterSpeed);
  pivotSaturn.rotation.y += (parameters.rotatoP * saturnSpeed);
  pivotUranus.rotation.y += (parameters.rotatoP * uranusSpeed);
  pivotNeptune.rotation.y += (parameters.rotatoP * neptuneSpeed);



}

function rotateMoons () {

    pivotEarthMoon.rotation.y += (parameters.rotatoP * 0.000366);
    // pivotMarsMoon.rotation.y -= 0.05;
    // pivotNeptuneMoon.rotation.y -= 0.05;
}

function rotatePlanets() {
  particleSMercury.rotation.y += (parameters.rotatoP * 0.00017);
  particleSVenus.rotation.y += (parameters.rotatoP * 0.000086);
  particleSEarth.rotation.y += (parameters.rotatoP * 0.01);
  particleSMars.rotation.y += (parameters.rotatoP * 0.01);
  particleSJupiter.rotation.y += (parameters.rotatoP * 0.0266);
  particleSSaturn.rotation.y += (parameters.rotatoP * 0.024);
  particleSUranus.rotation.y += (parameters.rotatoP * 0.0141);
  particleSNeptune.rotation.y += (parameters.rotatoP * 0.015);
  outerRingSaturn.rotation.y += (parameters.rotatoP * 0.015);
  innerRingSaturn.rotation.y += (parameters.rotatoP * 0.02);
  pivotEye.rotation.y += (parameters.rotatoP * 0.0266);
  pivotContinents.rotation.y += (parameters.rotatoP * 0.01);
  ringJupiter.rotation.y += (parameters.rotatoP * 0.0255);
}

function addPivots() {
  //Mecury
  pivotMercury = new THREE.Group();
  pivotMercury.add( particleSMercury );
  pivotMercury.add( textMercury );
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

  pivotEarth = new THREE.Group();
  pivotEarth.add( particleSEarth );
  pivotEarth.add( pivotEarthMoon );
  pivotEarth.add( pivotContinents );
  //Mars
  // pivotMarsMoon = new THREE.Group();
  // pivotMarsMoon.position.set(0, 0, 215);
  // pivotMarsMoon.add( marsMoon1 );
  // pivotMarsMoon.add( marsMoon2 );

  pivotMars = new THREE.Group();
  pivotMars.add( particleSMars );
  // pivotMars.add( pivotMarsMoon );
  //Jupiter

  pivotEye = new THREE.Group();
  pivotEye.position.set(0, -10, 280);
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

  // pivotNeptuneMoon = new THREE.Group();
  // pivotNeptuneMoon.position.set(0, 0, 520);
  // pivotNeptuneMoon.add( neptuneMoon );

  pivotNeptune = new THREE.Group();
  pivotNeptune.add( particleSNeptune );
  // pivotNeptune.add( pivotNeptuneMoon );






  scene.add( pivotMercury );
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
    vert.x = vert.x + Math.sin(theta) * Math.cos(phi) * 1000;
    vert.y = vert.y + Math.sin(theta) * Math.sin(phi) * 1000;
    vert.z = vert.z + Math.cos(theta) * 1000;
  }
  particleSystems.geometry.verticesNeedUpdate = true;
}

function createText(theText, theColor, theSize, x, y, z, scene, pivot) {
   var fontLoader = new THREE.FontLoader();
   fontLoader.load("optimer_bold.typeface.json", function(theFont) {
     var textGeometry = new THREE.TextGeometry(theText, {
     size: theSize,
     height: 1,
     curveSegments: 5,
     font: theFont
    });
    var textMaterial = new THREE.MeshBasicMaterial({color: theColor});
    var mesh = new THREE.Mesh(textGeometry, textMaterial);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    pivot.add(mesh);
 });

}

function createPlanetNameText() {
    createText("Sun", 0xffff00, 30, -30, 100, 0, scene, pivotNeptune);
    createText("Mercury", 0xd3d3d3, 20, -50, 45, 100, scene, pivotMercury);
    createText("Venus", 0xd3d3d3, 20, -40, 45, 130, scene, pivotVenus);
    createText("Earth", 0x0000ff, 20, -35, 45, 170, scene, pivotEarth);
    createText("Mars", 0xd3d3d3, 20, -35, 45, 205, scene, pivotMars);
    createText("Jupiter", 0xd3d3d3, 20, -40, 45, 270, scene, pivotJupiter);
    createText("Saturn", 0xd3d3d3, 20, -40, 45, 380, scene, pivotSaturn);
    createText("Uranus", 0xd3d3d3, 20, -40, 45,470, scene, pivotUranus);
    createText("Neptune", 0xd3d3d3, 20, -50, 45, 520, scene, pivotNeptune);


}
