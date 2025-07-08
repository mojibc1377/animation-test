'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Scene3DProps {
  currentSnap: number;
  scrollProgress: number;
  isScrolling: boolean;
}

export default function Scene3D({ currentSnap, isScrolling }: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainObjectsRef = useRef<THREE.Mesh[]>([]);
  const backgroundObjectsRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  // Create 4 different objects
  const createObjects = (scene: THREE.Scene) => {
    const objects: THREE.Mesh[] = [];

    // Object 1: Rotating Torus
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.6, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      shininess: 100,
      specular: 0x004422
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    objects.push(torus);

    // Object 2: Pulsating Sphere
    const sphereGeometry = new THREE.SphereGeometry(1.8, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff4444,
      shininess: 80,
      specular: 0x440000
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    objects.push(sphere);

    // Object 3: Dancing Cube
    const cubeGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x4444ff,
      shininess: 120,
      specular: 0x000044
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    objects.push(cube);

    // Object 4: Spiraling Dodecahedron
    const dodecaGeometry = new THREE.DodecahedronGeometry(2, 0);
    const dodecaMaterial = new THREE.MeshPhongMaterial({
      color: 0xff44ff,
      shininess: 90,
      specular: 0x440044
    });
    const dodeca = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
    objects.push(dodeca);

    // Add all objects to scene but make them invisible initially
    objects.forEach((obj, index) => {
      obj.visible = index === 0; // Only first object visible initially
      scene.add(obj);
    });

    return objects;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000428, 1, 100);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000428, 1);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create main objects
    const mainObjects = createObjects(scene);
    mainObjectsRef.current = mainObjects;

    // Create background objects (floating particles)
    const backgroundObjects: THREE.Mesh[] = [];
    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
      });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      scene.add(sphere);
      backgroundObjects.push(sphere);
    }
    backgroundObjectsRef.current = backgroundObjects;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ff88, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.016; // Approximate 60fps

      // Animate current object based on currentSnap
      mainObjects.forEach((obj, index) => {
        if (obj.visible) {
          // Object-specific animations
          switch (index) {
            case 0: // Torus - Rotating
              obj.rotation.x += 0.01;
              obj.rotation.y += 0.01;
              obj.rotation.z += 0.005;
              break;
            
            case 1: // Sphere - Pulsating
              obj.rotation.y += 0.02;
              obj.scale.setScalar(1 + Math.sin(timeRef.current * 2) * 0.3);
              obj.position.y = Math.sin(timeRef.current * 1.5) * 0.5;
              break;
            
            case 2: // Cube - Dancing
              obj.rotation.x += 0.02;
              obj.rotation.y += 0.03;
              obj.rotation.z += 0.01;
              obj.position.x = Math.sin(timeRef.current * 1.2) * 0.8;
              obj.position.y = Math.cos(timeRef.current * 1.8) * 0.6;
              break;
            
            case 3: // Dodecahedron - Spiraling
              obj.rotation.x += 0.015;
              obj.rotation.y += 0.025;
              obj.position.x = Math.sin(timeRef.current) * 1.2;
              obj.position.z = Math.cos(timeRef.current) * 0.5;
              obj.scale.setScalar(1 + Math.sin(timeRef.current * 3) * 0.1);
              break;
          }
        }
      });

      // Background objects animation
      backgroundObjects.forEach((sphere, index) => {
        sphere.rotation.x += 0.01 * (index % 3 + 1);
        sphere.rotation.y += 0.01 * (index % 2 + 1);
        sphere.position.y += Math.sin(timeRef.current + index) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      const mountElement = mountRef.current;
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update scene based on current snap
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current || !mainObjectsRef.current.length) return;

    // Switch object visibility with smooth transitions
    mainObjectsRef.current.forEach((obj, index) => {
      if (index === currentSnap) {
        obj.visible = true;
        // Smooth entrance animation
        if (isScrolling) {
          obj.scale.setScalar(0.8);
          const targetScale = 1;
          const animate = () => {
            const currentScale = obj.scale.x;
            const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
            obj.scale.setScalar(newScale);
            if (Math.abs(newScale - targetScale) > 0.01) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      } else {
        obj.visible = false;
      }
    });

    // Update camera position based on current snap
    const cameraPositions = [
      { x: 0, y: 0, z: 5 },    // Snap 0: Front view
      { x: 3, y: 2, z: 4 },    // Snap 1: Angled view
      { x: -2, y: 3, z: 5 },   // Snap 2: Side view
      { x: 0, y: 4, z: 3 }     // Snap 3: Top-down view
    ];

    const targetPos = cameraPositions[currentSnap];
    if (isScrolling) {
      const animate = () => {
        cameraRef.current!.position.lerp(new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z), 0.05);
        cameraRef.current!.lookAt(0, 0, 0);
        
        const distance = cameraRef.current!.position.distanceTo(new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z));
        if (distance > 0.1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }

    // Update scene colors based on current snap
    const snapColors = [
      { bg: 0x000428, fog: 0x000428 },  // Deep blue
      { bg: 0x280004, fog: 0x280004 },  // Deep red
      { bg: 0x000428, fog: 0x000040 },  // Deep blue-purple
      { bg: 0x280028, fog: 0x280028 }   // Deep magenta
    ];

    const colors = snapColors[currentSnap];
    if (sceneRef.current.fog) {
      sceneRef.current.fog.color.setHex(colors.fog);
      rendererRef.current?.setClearColor(colors.bg);
    }

  }, [currentSnap, isScrolling]);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}