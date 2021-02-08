
        import * as THREE from './three.module.js';
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
      
        camera.position.z = 5;
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(innerWidth, innerHeight);
        document.body.appendChild(renderer.domElement);
        
        var light = new THREE.DirectionalLight(0xffffff, 0.75);
        light.position.setScalar(1);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.25));
                
        var pts = [
            new THREE.Vector3(0.5, 0.5, 0.5),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(1, 0, 1),
            new THREE.Vector3(1, 0, 0)
        ];
        
        var geom = new THREE.BufferGeometry().setFromPoints(pts);
        geom.setIndex([
            0, 1, 2,
            0, 2, 3, 
            0, 3, 4,
            0, 4, 1,
            1, 3, 2,
            1, 4, 3
        ]);
        geom.computeVertexNormals();
        
        var mat = new THREE.MeshStandardMaterial({color: "white", flatShading: true});
        
        var mesh = new THREE.Mesh(geom, mat);
        
        scene.add(mesh);
        
        renderer.setAnimationLoop(() => {
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;
            mesh.rotation.z += 0.005; 
          renderer.render(scene, camera);
        });
        