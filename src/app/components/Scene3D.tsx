'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Scene3DProps {
  scrollY: number;
}

export default function Scene3D({ scrollY }: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainObjectRef = useRef<THREE.Mesh | null>(null);
  const backgroundObjectsRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number | null>(null);

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

    // Create main animated object (spinning torus)
    const mainGeometry = new THREE.TorusGeometry(1.5, 0.6, 16, 100);
    const mainMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      shininess: 100,
      specular: 0x004422
    });
    const mainObject = new THREE.Mesh(mainGeometry, mainMaterial);
    scene.add(mainObject);
    mainObjectRef.current = mainObject;

    // Create background objects (floating spheres)
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

      // Main object animation
      if (mainObject) {
        mainObject.rotation.x += 0.01;
        mainObject.rotation.y += 0.01;
        mainObject.rotation.z += 0.005;
      }

      // Background objects animation
      backgroundObjects.forEach((sphere, index) => {
        sphere.rotation.x += 0.01 * (index % 3 + 1);
        sphere.rotation.y += 0.01 * (index % 2 + 1);
        sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update scene based on scroll
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current || !mainObjectRef.current) return;

    const normalizedScroll = scrollY * 0.001;

    // Update camera position based on scroll
    cameraRef.current.position.y = -normalizedScroll * 2;
    cameraRef.current.rotation.x = normalizedScroll * 0.1;

    // Update main object based on scroll
    mainObjectRef.current.position.y = -normalizedScroll * 0.5;
    mainObjectRef.current.scale.setScalar(1 + normalizedScroll * 0.1);

    // Update background objects based on scroll
    backgroundObjectsRef.current.forEach((sphere, index) => {
      sphere.position.y -= normalizedScroll * (0.1 + index * 0.001);
      sphere.rotation.z += normalizedScroll * 0.01;
    });

    // Change scene fog based on scroll
    if (sceneRef.current.fog) {
      const fogColor = new THREE.Color().setHSL(
        0.6 + normalizedScroll * 0.1,
        0.7,
        0.1 + normalizedScroll * 0.05
      );
      sceneRef.current.fog.color = fogColor;
      rendererRef.current?.setClearColor(fogColor);
    }
  }, [scrollY]);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}