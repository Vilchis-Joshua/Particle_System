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

//Point lights
var pointLight;

init();
animate();

function init() {


    clock = new THREE.Clock(true);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 6000);
    camera.position.x = 400;
    camera.position.y = 400;
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
    controls.maxDistance = 2500;
    controls.minDistance = 300;


    var particleSMercury = createParticleSystem(0x86989D, 100000, "disc.png", -100, 0, 0, true, 1, 5, 5);
   //  var particleS2 = createParticleSystem(0x00ff00, 100000, "disc.png", 50, 0, 50, false, 2); //green
   //  var particleS3 = createParticleSystem(0xff0000, 100000, "disc.png", -50, 0, -50, false, 2); //red
  //  var sunLight = createLight(0x00ff00, -400, 0, -10);
  //  scene.add( sunLight );
    var particleSSun = createParticleSystem(0xEA7D17, 200000, "disc.png", -170, 0, 0, true, 4, 25, 40); //yellow

   //  particleS2.position.set (150, 150, 150);
    scene.add(particleSMercury);
   //  scene.add(particleS2);
   //  scene.add(particleS3);
    scene.add(particleSSun);
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

function animateParticles() {
    var verts = particleSystem.geometry.vertices;
    for(var i = 0; i < verts.length; i++) {
        var vert = verts[i];
        if (vert.y < -200) {
            vert.y = Math.random() * 400 - 200;
        }
        vert.y = vert.y - (10 * deltaTime);
    }
    particleSystem.geometry.verticesNeedUpdate = true;
    particleSystem.rotation.y -= .1 * deltaTime;

}

function animate() {
    // deltaTime = clock.getDelta();

    // cubeMesh.rotation.x += 1 * deltaTime;
    // cubeMesh.rotation.y += 2 * deltaTime;

    //animateParticles();
    render();
    requestAnimationFrame( animate );

    // rotationCamera += 0.01;
    // camera.position.x = Math.sin(rotationCamera) * 100;
    // camera.position.z = Math.cos(rotationCamera) * 100;
    camera.lookAt( scene.position ); // the origin
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


// function loadSkyBox() {
//
//      // Load the skybox images and create list of materials
//      var materials = [
//           createMaterial( 'images/skyX55+x.png' ), // right
//           createMaterial( 'images/skyX55-x.png' ), // left
//           createMaterial( 'images/skyX55+y.png' ), // top
//           createMaterial( 'images/skyX55-y.png' ), // bottom
//           createMaterial( 'images/skyX55+z.png' ), // back
//           createMaterial( 'images/skyX55-z.png' )  // front
//      ];
//
//      // Create a large cube
//      var mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100, 1, 1, 1 ), new THREE.MeshFaceMaterial( materials ) );
//
//      // Set the x scale to be -1, this will turn the cube inside out
//      mesh.scale.set(-1,1,1);
//      scene.add( mesh );
// }


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

function loadSkyBox2() {
  var geometry = new THREE.SphereGeometry(300, 200, 200);
  var materials = [
      createMaterial( 'galaxy-wallpaper-02.jpg' ), // right

  ];
  var material = new THREE.MeshFaceMaterial( materials );
// var uniforms = {
//   texture: { type: 't', value: THREE.ImageUtils.loadTexture('galaxy-wallpaper-02.jpg') }
// };

// var material = new THREE.ShaderMaterial( {
//   uniforms:       uniforms,
//   vertexShader:   document.getElementById('sky-vertex').textContent,
//   fragmentShader: document.getElementById('sky-fragment').textContent
// });

skyBox = new THREE.Mesh(geometry, material);
skyBox.scale.set(-2, 2, 2);
skyBox.eulerOrder = 'XZY';
skyBox.renderDepth = 500.0;
scene.add(skyBox);
}

function createMaterial( path ) {
    var texture = THREE.ImageUtils.loadTexture(path);
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5, doubleSided: true });

    return material;
}
