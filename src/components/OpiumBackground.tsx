import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const OpiumBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // === 1. БАЗА ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40; // Чуть приблизили камеру

    // Включаем сглаживание (antialias), чтобы линии не были "лесенкой"
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Для четкости на Retina-экранах
    mountNode.appendChild(renderer.domElement);

    // === 2. ЧАСТИЦЫ ===
    const particlesCount = 150; // Оптимально для производительности
    const posArray = new Float32Array(particlesCount * 3);
    const velocities: { x: number, y: number, z: number }[] = []; 

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    // Задаем случайную скорость каждой точке
    for (let i = 0; i < particlesCount; i++) {
      velocities.push({
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1,
        z: (Math.random() - 0.5) * 0.1
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({ size: 0.15, color: 0xffffff });
    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // === 3. ЛИНИИ (Паутина) ===
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
    const lineGeometry = new THREE.BufferGeometry();
    // Выделяем память под максимальное количество возможных линий
    const positions = new Float32Array(particlesCount * particlesCount * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // === 4. СЛЕЖКА ЗА КУРСОРОМ ===
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    // === 5. ПУЛЬС (Анимация) ===
    const animate = () => {
      requestAnimationFrame(animate);

      // Плавное движение камеры за мышью
      targetX = mouseX * 0.05;
      targetY = mouseY * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Достаем текущие координаты точек
      const positionsAttribute = geometry.attributes.position;
      const currentPositions = positionsAttribute.array as Float32Array;

      // Двигаем точки
      for (let i = 0; i < particlesCount; i++) {
        currentPositions[i * 3] += velocities[i].x;
        currentPositions[i * 3 + 1] += velocities[i].y;
        currentPositions[i * 3 + 2] += velocities[i].z;

        // Отскок от "невидимых стен", чтобы точки не улетали бесконечно
        if (currentPositions[i * 3] > 50 || currentPositions[i * 3] < -50) velocities[i].x *= -1;
        if (currentPositions[i * 3 + 1] > 50 || currentPositions[i * 3 + 1] < -50) velocities[i].y *= -1;
        if (currentPositions[i * 3 + 2] > 50 || currentPositions[i * 3 + 2] < -50) velocities[i].z *= -1;
      }
      positionsAttribute.needsUpdate = true;

      // Рисуем линии между близкими точками
      let vertexpos = 0;
      let numConnected = 0;

      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
          const dx = currentPositions[i * 3] - currentPositions[j * 3];
          const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
          const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Если дистанция меньше 15 - соединяем линией
          if (dist < 15) { 
            positions[vertexpos++] = currentPositions[i * 3];
            positions[vertexpos++] = currentPositions[i * 3 + 1];
            positions[vertexpos++] = currentPositions[i * 3 + 2];
            positions[vertexpos++] = currentPositions[j * 3];
            positions[vertexpos++] = currentPositions[j * 3 + 1];
            positions[vertexpos++] = currentPositions[j * 3 + 2];
            numConnected++;
          }
        }
      }

      // Говорим рендереру рисовать только те линии, которые мы сейчас создали
      lineGeometry.setDrawRange(0, numConnected * 2);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
      document.removeEventListener('mousemove', onDocumentMouseMove);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-r from-zinc-800 via-[#050505] to-[#050505]">
      
      {/* Слой с авангардным шумом и потертостями */}
      <div 
        className="absolute inset-0 opacity-[0.12] mix-blend-screen pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Слой с виньеткой (затемнение по краям для глубины) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />

      {/* Контейнер для нашего 3D-движка */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      
    </div>
  );
};