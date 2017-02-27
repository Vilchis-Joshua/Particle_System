var camera;
var scene;
var renderer;
var cubeMesh;
var clock;
var deltaTime;
var rotationCamera = 0;
var particleSystem;

init();
animate();

function init() {

    clock = new THREE.Clock(true);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 250;
    camera.position.y = 200;
    camera.position.z = 250;

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, -1, 1 ).normalize();
    scene.add(light);

    // var geometry = new THREE.CubeGeometry( 10, 10, 10);
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x555555, shininess: 30 } );

    // cubeMesh = new THREE.Mesh(geometry, material );
    // cubeMesh.position.z = -30;
    // scene.add( cubeMesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    var particleS1 = createParticleSystem(0x0000ff, 1000, "disc.png", 0, 0, 0);
    var particleS2 = createParticleSystem(0x00ff00, 100000, "disc.png", 50, 0, 50); //green
    var particleS3 = createParticleSystem(0xff0000, 100000, "disc.png", -50, 0, -50); //red
   //  particleS2.position.set (150, 150, 150);
    scene.add(particleS1);
    scene.add(particleS2);
    scene.add(particleS3);

    render();
}

function createParticleSystem(color, particleCount, image, startX, startY, startZ) {

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

      var distance = THREE.Math.randFloatSpread(25) - 12;
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
             size: 1,
             map: THREE.ImageUtils.loadTexture(image),
             blending: THREE.AdditiveBlending,
             transparent: false,
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

    rotationCamera += 0.01;
    camera.position.x = Math.sin(rotationCamera) * 100;
    camera.position.z = Math.cos(rotationCamera) * 100;
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
