import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * Real 3D Bangtan Earbuds + Open Charging Case Canvas with Three.js
 * Renders:
 * 1. Open metallic charging case with laser-engraved Bangtan Logo
 * 2. Dual sculpted earbuds hovering in cinematic purple studio lighting
 * 3. 360° interactive mouse & touch drag orbit
 * 4. Physics floating levitation & beat audio pulse
 */
export default function EarbudsCanvas3D({
  colorHex = '#7c3aed',
  modelStyle = 'classic',
  isBeating = false,
  autoRotate = true,
  interactive = true,
  staticRender = false,
  caseOpen = true,
  showHint = true,
  className = "w-full h-full min-h-[460px]"
}) {
  const mountRef = useRef(null);
  const animationFrameRef = useRef(null);
  const materialsRef = useRef({});
  const caseOpenRef = useRef(caseOpen);
  const isBeatingRef = useRef(isBeating);
  const staticRenderRef = useRef(staticRender);
  const initialColorRef = useRef(colorHex);

  useEffect(() => {
    caseOpenRef.current = caseOpen;
  }, [caseOpen]);

  useEffect(() => {
    isBeatingRef.current = isBeating;
  }, [isBeating]);

  // Mouse orbit state
  const mouseState = useRef({
    isDown: false,
    prevX: 0,
    prevY: 0,
    targetRotX: 0.1,
    targetRotY: -0.25,
    currentRotX: 0.1,
    currentRotY: -0.25,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 8.2);

    // 3. Renderer with antialiasing and tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x181028, 2.5);
    scene.add(ambientLight);

    // Key Specular Light (White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    // Purple Neon Rim Light
    const purpleRim = new THREE.DirectionalLight(0xa855f7, 6.0);
    purpleRim.position.set(-6, -2, -3);
    scene.add(purpleRim);

    // Top Soft Violet Fill Light
    const topFill = new THREE.PointLight(0xc084fc, 3.8, 14);
    topFill.position.set(0, 4, 3);
    scene.add(topFill);

    // Ground Purple Reflection Glow
    const groundGlow = new THREE.PointLight(0x6d28d9, 3.0, 10);
    groundGlow.position.set(0, -3, 2);
    scene.add(groundGlow);

    // 5. Build 3D Models
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // PBR Materials
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(initialColorRef.current),
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      ior: 1.5,
    });

    const caseMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(initialColorRef.current === '#7c3aed' ? '#4c1d95' : initialColorRef.current),
      metalness: 0.82,
      roughness: 0.28,
      clearcoat: 0.9,
      ...(modelStyle === 'clear' ? { metalness: 0.12, roughness: 0.1, clearcoat: 1, transmission: 0.72, thickness: 0.5, transparent: true, opacity: 0.62 } : {}),
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.08,
    });

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x111118,
      metalness: 0.8,
      roughness: 0.4,
    });

    const siliconeTipMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2e1065,
      metalness: 0.05,
      roughness: 0.6,
      transmission: 0.4,
      transparent: true,
      opacity: 0.9,
    });

    const ledGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0xa855f7,
      emissiveIntensity: 3.5,
    });

    const logoEmbossMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x9333ea,
      emissiveIntensity: 0.4,
    });

    materialsRef.current = {
      shell: shellMaterial,
      caseMat: caseMaterial,
      chrome: chromeMaterial,
      silicone: siliconeTipMaterial,
      led: ledGlowMaterial,
    };

    // A. Build Charging Case Base
    const caseGroup = new THREE.Group();
    caseGroup.position.set(0, -1.1, 0);

    // Lower Case Body (Pill Capsule Shape)
    const caseBodyGeom = ['faceted', 'angular', 'fusion'].includes(modelStyle)
      ? new THREE.CylinderGeometry(1.9, 1.9, 1.15, 8)
      : modelStyle === 'pebble'
        ? new THREE.SphereGeometry(1, 40, 32)
        : new RoundedBoxGeometry(3.8, 1.15, 1.65, 8, 0.42);
    const caseBody = new THREE.Mesh(caseBodyGeom, caseMaterial);
    if (['faceted', 'angular', 'fusion'].includes(modelStyle)) caseBody.scale.z = 0.46;
    if (modelStyle === 'pebble') caseBody.scale.set(1.9, 0.62, 0.82);
    caseBody.castShadow = true;
    caseGroup.add(caseBody);

    // Inner Wells for Earbuds (Dark cavity)
    const innerRimGeom = new RoundedBoxGeometry(3.3, 0.12, 1.3, 6, 0.2);
    const innerRim = new THREE.Mesh(innerRimGeom, darkTrimMaterial);
    innerRim.position.set(0, 0.57, -0.02);
    caseGroup.add(innerRim);

    // Bangtan Logo on Front of Case (Two distinct stylized polygons)
    const logoShapeLeft = new THREE.Shape();
    logoShapeLeft.moveTo(-0.16, 0.22);
    logoShapeLeft.lineTo(-0.03, 0.18);
    logoShapeLeft.lineTo(-0.03, -0.18);
    logoShapeLeft.lineTo(-0.16, -0.22);
    logoShapeLeft.closePath();

    const logoGeomLeft = new THREE.ExtrudeGeometry(logoShapeLeft, { depth: 0.04, bevelEnabled: false });
    const logoMeshLeft = new THREE.Mesh(logoGeomLeft, logoEmbossMaterial);
    logoMeshLeft.position.set(-0.05, 0.05, 0.84);
    caseGroup.add(logoMeshLeft);

    const logoShapeRight = new THREE.Shape();
    logoShapeRight.moveTo(0.03, 0.18);
    logoShapeRight.lineTo(0.16, 0.22);
    logoShapeRight.lineTo(0.16, -0.22);
    logoShapeRight.lineTo(0.03, -0.18);
    logoShapeRight.closePath();

    const logoGeomRight = new THREE.ExtrudeGeometry(logoShapeRight, { depth: 0.04, bevelEnabled: false });
    const logoMeshRight = new THREE.Mesh(logoGeomRight, logoEmbossMaterial);
    logoMeshRight.position.set(0.05, 0.05, 0.84);
    caseGroup.add(logoMeshRight);

    // LED status indicator on case
    const caseLedGeom = new THREE.SphereGeometry(0.04, 16, 16);
    const caseLed = new THREE.Mesh(caseLedGeom, ledGlowMaterial);
    caseLed.position.set(0, -0.32, 0.86);
    caseGroup.add(caseLed);

    // Hinged Open Lid (Angled back at 75 degrees)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.7, -0.6);
    lidGroup.rotation.x = caseOpenRef.current ? -Math.PI * 0.42 : 0;

    const lidGeom = ['faceted', 'angular', 'fusion'].includes(modelStyle)
      ? new THREE.CylinderGeometry(1.82, 1.82, 0.4, 8)
      : modelStyle === 'pebble'
        ? new THREE.SphereGeometry(1, 40, 32)
        : new RoundedBoxGeometry(3.65, 1.15, 0.42, 8, 0.38);
    const lidMesh = new THREE.Mesh(lidGeom, caseMaterial);
    lidMesh.position.set(0, 0.48, 0);
    if (['faceted', 'angular', 'fusion'].includes(modelStyle)) lidMesh.scale.z = 0.44;
    if (modelStyle === 'pebble') lidMesh.scale.set(1.82, 0.2, 0.78);
    lidGroup.add(lidMesh);
    caseGroup.add(lidGroup);

    if (modelStyle === 'display') {
      const displayMaterial = new THREE.MeshStandardMaterial({ color: 0x10091e, emissive: 0x3b0764, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.2 });
      const display = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.2, 0.045, 5, 0.07), displayMaterial);
      display.position.set(0, -0.34, 0.84);
      caseGroup.add(display);
      for (let bar = 0; bar < 3; bar += 1) {
        const meter = new THREE.Mesh(new RoundedBoxGeometry(0.1, 0.055, 0.025, 3, 0.02), logoEmbossMaterial);
        meter.position.set(-0.12 + bar * 0.12, -0.34, 0.875);
        caseGroup.add(meter);
      }
    }

    rootGroup.add(caseGroup);

    // B. Function to Build an Earbud
    function createEarbud(isRight = true) {
      const earbud = new THREE.Group();

      // Main Acoustic Body Capsule
      const bodyGeom = ['angular', 'blade', 'fin', 'fusion'].includes(modelStyle)
        ? new THREE.IcosahedronGeometry(0.55, 1)
        : new THREE.SphereGeometry(0.55, 40, 32);
      if (modelStyle === 'bean') bodyGeom.scale(1.18, 0.72, 1.08);
      else if (modelStyle === 'disc') bodyGeom.scale(1.16, 0.58, 1.0);
      else if (modelStyle === 'orb') bodyGeom.scale(0.9, 0.96, 0.94);
      else if (modelStyle === 'pebble') bodyGeom.scale(1.2, 0.82, 1.05);
      else if (modelStyle === 'loop' || modelStyle === 'earhook') bodyGeom.scale(0.8, 0.76, 0.82);
      else if (modelStyle === 'fin') bodyGeom.scale(0.95, 0.82, 0.9);
      else if (modelStyle === 'ribbon') bodyGeom.scale(0.84, 0.78, 0.88);
      else if (modelStyle === 'shell') bodyGeom.scale(1.16, 0.64, 1.06);
      else if (modelStyle === 'openfit') bodyGeom.scale(0.92, 0.9, 0.88);
      else if (modelStyle === 'stud') bodyGeom.scale(0.94, 0.92, 0.94);
      else if (modelStyle === 'fusion') bodyGeom.scale(1.05, 0.72, 0.98);
      else bodyGeom.scale(1.05, 0.88, 1.0);
      const bodyMesh = new THREE.Mesh(bodyGeom, shellMaterial);
      bodyMesh.position.y = 0.12;
      earbud.add(bodyMesh);

      // Acoustic Stem
      const hasStem = !['bean', 'disc', 'orb', 'pebble', 'loop', 'earhook', 'stud'].includes(modelStyle);
      const stemGeom = modelStyle === 'blade' || modelStyle === 'angular'
        ? new RoundedBoxGeometry(0.34, 1.16, 0.3, 6, 0.12)
        : new THREE.CylinderGeometry(0.14, 0.12, 1.18, 28);
      const stemMesh = new THREE.Mesh(stemGeom, shellMaterial);
      stemMesh.position.set(isRight ? -0.17 : 0.17, -0.65, 0.15);
      stemMesh.rotation.z = isRight ? 0.2 : -0.2;
      if (hasStem) earbud.add(stemMesh);

      // Chrome Stem Bottom Tip (Charging Contacts)
      const tipCapGeom = new THREE.CylinderGeometry(0.12, 0.13, 0.14, 24);
      const tipCap = new THREE.Mesh(tipCapGeom, chromeMaterial);
      tipCap.position.set(isRight ? -0.31 : 0.31, -1.27, 0.28);
      tipCap.rotation.z = isRight ? 0.2 : -0.2;
      if (hasStem) earbud.add(tipCap);

      // In-Ear Sound Nozzle
      if (modelStyle !== 'openfit') {
        const nozzleGeom = new THREE.CylinderGeometry(0.2, 0.24, 0.3, 28);
        const nozzle = new THREE.Mesh(nozzleGeom, chromeMaterial);
        nozzle.position.set(isRight ? 0.42 : -0.42, 0.16, 0.3);
        nozzle.rotation.z = isRight ? -0.7 : 0.7;
        earbud.add(nozzle);
      }

      // Silicone Ear Tip
      const tipGeom = new THREE.SphereGeometry(0.22, 28, 20);
      tipGeom.scale(1.35, 0.9, 1.0);
      const tip = new THREE.Mesh(tipGeom, siliconeTipMaterial);
      tip.position.set(isRight ? 0.64 : -0.64, 0.22, 0.34);
      if (modelStyle !== 'openfit') earbud.add(tip);

      // Touch Zone with Bangtan mini emblem
      const touchRimGeom = new THREE.RingGeometry(0.2, 0.24, 32);
      const touchRim = new THREE.Mesh(touchRimGeom, chromeMaterial);
      touchRim.position.set(0, 0.1, -0.7);
      touchRim.rotation.y = Math.PI;
      earbud.add(touchRim);

      // Mini LED Glowing Ring
      const ledRingGeom = new THREE.TorusGeometry(0.14, 0.025, 16, 32);
      const ledRing = new THREE.Mesh(ledRingGeom, ledGlowMaterial);
      ledRing.position.set(0, 0.1, -0.71);
      earbud.add(ledRing);

      if (modelStyle === 'loop' || modelStyle === 'earhook') {
        const loop = new THREE.Mesh(
          new THREE.TorusGeometry(modelStyle === 'earhook' ? 0.58 : 0.42, modelStyle === 'earhook' ? 0.095 : 0.07, 16, 48, Math.PI * 1.72),
          shellMaterial
        );
        loop.rotation.z = modelStyle === 'earhook' ? -0.28 : Math.PI * 0.12;
        loop.position.set(0, 0.16, -0.08);
        earbud.add(loop);
      }

      if (modelStyle === 'ribbon' || modelStyle === 'shell' || modelStyle === 'stud') {
        const halo = new THREE.Mesh(
          new THREE.TorusGeometry(modelStyle === 'shell' ? 0.43 : 0.34, modelStyle === 'shell' ? 0.045 : 0.065, 12, 40),
          chromeMaterial
        );
        halo.position.set(0, 0.15, 0.28);
        earbud.add(halo);
      }

      if (modelStyle === 'fin') {
        const finShape = new THREE.Shape();
        finShape.moveTo(0, 0.22);
        finShape.quadraticCurveTo(0.4, 0.05, 0.22, -0.48);
        finShape.quadraticCurveTo(0.05, -0.2, -0.12, -0.1);
        finShape.closePath();
        const fin = new THREE.Mesh(new THREE.ExtrudeGeometry(finShape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.035, bevelSegments: 2 }), shellMaterial);
        fin.position.set(isRight ? 0.33 : -0.47, 0.2, -0.12);
        earbud.add(fin);
      }

      return earbud;
    }

    // Floating Right Earbud (Angled dynamically)
    const rightBud = createEarbud(true);
    rightBud.position.set(0.95, caseOpenRef.current ? 0.9 : -0.05, 0.4);
    rightBud.scale.setScalar(caseOpenRef.current ? 1 : 0.74);
    rightBud.rotation.set(-0.25, -0.35, 0.2);
    rootGroup.add(rightBud);

    // Floating Left Earbud
    const leftBud = createEarbud(false);
    leftBud.position.set(-0.95, caseOpenRef.current ? 0.72 : -0.05, 0.2);
    leftBud.scale.setScalar(caseOpenRef.current ? 1 : 0.74);
    leftBud.rotation.set(0.15, 0.45, -0.15);
    rootGroup.add(leftBud);

    // Floor Shadow Disk
    const floorGeo = new THREE.PlaneGeometry(6, 6);
    const floorMat = new THREE.MeshBasicMaterial({ color: 0x05050a, transparent: true, opacity: 0.7 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.1;
    scene.add(floor);

    // 6. Interactive Drag Orbit
    const handlePointerDown = (e) => {
      if (!interactive) return;
      mouseState.current.isDown = true;
      mouseState.current.prevX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      mouseState.current.prevY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    };

    const handlePointerMove = (e) => {
      if (!interactive || !mouseState.current.isDown) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = clientX - mouseState.current.prevX;
      const deltaY = clientY - mouseState.current.prevY;

      mouseState.current.targetRotY += deltaX * 0.008;
      mouseState.current.targetRotX += deltaY * 0.008;
      mouseState.current.targetRotX = Math.max(-0.6, Math.min(0.6, mouseState.current.targetRotX));

      mouseState.current.prevX = clientX;
      mouseState.current.prevY = clientY;
    };

    const handlePointerUp = () => {
      mouseState.current.isDown = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElem.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 7. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const openProgress = THREE.MathUtils.damp(lidGroup.userData.openProgress ?? (caseOpenRef.current ? 1 : 0), caseOpenRef.current ? 1 : 0, 4, 1 / 60);
      lidGroup.userData.openProgress = openProgress;
      lidGroup.rotation.x = -Math.PI * 0.42 * openProgress;

      // Smooth dampening
      mouseState.current.currentRotX += (mouseState.current.targetRotX - mouseState.current.currentRotX) * 0.08;
      mouseState.current.currentRotY += (mouseState.current.targetRotY - mouseState.current.currentRotY) * 0.08;

      if (autoRotate && !mouseState.current.isDown) {
        mouseState.current.targetRotY += 0.004;
      }

      rootGroup.rotation.x = mouseState.current.currentRotX;
      rootGroup.rotation.y = mouseState.current.currentRotY;

      // Levitation Physics on Earbuds
      const hoverY = Math.sin(elapsed * 1.8) * 0.12 * openProgress;
      rightBud.position.y = THREE.MathUtils.lerp(-0.05, 0.9, openProgress) + hoverY;
      leftBud.position.y = THREE.MathUtils.lerp(-0.05, 0.72, openProgress) - hoverY * 0.8;
      const budScale = THREE.MathUtils.lerp(0.74, 1, openProgress);

      // Beat Pulse
      if (isBeatingRef.current) {
        const beatScale = 1 + Math.sin(elapsed * 12) * 0.035;
        rightBud.scale.setScalar(budScale * beatScale);
        leftBud.scale.setScalar(budScale * beatScale);
        if (materialsRef.current.led) {
          materialsRef.current.led.emissiveIntensity = 3.0 + Math.abs(Math.sin(elapsed * 12)) * 3.5;
        }
      } else {
        rightBud.scale.setScalar(budScale);
        leftBud.scale.setScalar(budScale);
        if (materialsRef.current.led) {
          materialsRef.current.led.emissiveIntensity = 2.5 + Math.sin(elapsed * 2.5) * 0.8;
        }
      }

      renderer.render(scene, camera);
    };

    if (staticRenderRef.current) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (staticRenderRef.current) renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElem.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive, autoRotate]);

  // Update Colorway
  useEffect(() => {
    if (materialsRef.current.shell) {
      materialsRef.current.shell.color.set(colorHex);
    }
    if (materialsRef.current.caseMat) {
      materialsRef.current.caseMat.color.set(colorHex === '#7c3aed' ? '#4c1d95' : colorHex);
    }
  }, [colorHex]);

  return (
    <div
      ref={mountRef}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Click and drag to rotate 360°"
    >
      {showHint && !staticRender && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-purple-500/25 text-[10px] text-gray-300 tracking-wider uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span>Interactive 3D • Drag to Orbit 360°</span>
        </div>
      )}
    </div>
  );
}
