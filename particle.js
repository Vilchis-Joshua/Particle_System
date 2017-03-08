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
var particleSMercury, particleSVenus, particleSEarth, particleSMars, particleSJupiter, particleSSaturn, particleSUranus, particleSNeptune;
var pivot;

//Point lights
var pointLight;

init();
animate();

function init() {


    clock = new THREE.Clock(true);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 6000);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;

    // var light = new THREE.DirectionalLight( 0xffffff );
    // light.position.set( 1, -1, 1 ).normalize();
    // scene.add(light);

    // var geometry = new THREE.CubeGeometry( 10, 10, 10);
    // var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x555555, shininess: 30 } );
    //
    // cubeMesh = new THREE.Mesh(geometry, material );
    // cubeMesh.position.z = -30;
    // scene.add( cubeMesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 2000;
    controls.minDistance = 600;

    var particleSSun = createParticleSystem(0xEA7D17, 900000, "disc.png", 0, 0, 0, true, 1, 10, 80); //sun
    var particleSSun1 = createParticleSystem(0xEEF21F, 100000, "disc.png", 0, 0, 0, true, 4, 80, 40); //sun
    particleSMercury = createParticleSystem(0x86989D, 10000, "disc.png", 110, 0, 0, true, 2, 1, 3); //mercury
    particleSVenus = createParticleSystem(0xDD9939, 30000, "disc.png", 140, 0, 0, true, 2, 1, 8); //venus
    particleSEarth = createParticleSystem(0x1E35BC, 30000, "disc.png", 180, 0, 0, true, 2, 1, 7); //earth
    particleSMars = createParticleSystem(0xDB5525 ,20000, "disc.png", 215, 0, 0, true, 2, 1, 4); //mars
    particleSJupiter = createParticleSystem(0xC1Ac8F, 60000, "particle.png", 280, 0, 0, true, 3, 1, 30); //jupiter
    particleSSaturn = createParticleSystem(0xC1B95B, 60000, "particle.png", 370, 0, 0, true, 3, 1, 27); //saturn
    particleSUranus = createParticleSystem(0x408BB7, 30000, "disc.png", 450, 0, 0, true, 2, 1, 17); //uranus
    particleSNeptune = createParticleSystem(0x408BB7, 40000, "particle.png", 500, 0, 0, true, 2, 1, 17); //neptune
    var innerRingSaturn = createParticleSystemRing(0xEFBE5B, 10000, "disc.png", 370, 0, 0, true, 3, 12, 40, 360, 0);
    var outerRingSaturn = createParticleSystemRing(0xEFBE5B, 10000, "particle.png", 370, 0, 0, true, 3, 6, 51, 360, 0);

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

    pivot = new THREE.Group();
    scene.add( pivot );
    pivot.add( particleSMercury );
    pivot.add( particleSVenus );
    pivot.add( particleSEarth );
    pivot.add( particleSMars );
    pivot.add( particleSJupiter );
    pivot.add( particleSSaturn );
    pivot.add( particleSUranus );
    pivot.add( particleSNeptune );
    pivot.add( innerRingSaturn );
    pivot.add( outerRingSaturn );
    loadSkyBox();

    render();
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

function animate() {

    render();
    requestAnimationFrame( animate );
    camera.lookAt( scene.position ); // the origin
    particleSJupiter.rotation.y += 0.01;
    pivot.rotation.y += 0.01;
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
