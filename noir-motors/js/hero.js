/* ============================================================
   NOIR MOTORS — HERO THREE.JS SCENE
   ============================================================ */

const HeroScene = (() => {
  let scene, camera, renderer, animId;
  let particles, particlesMesh;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let clock;
  let canvas;
  let initialized = false;

  const CONFIG = {
    particleCount: 1800,
    spread: 28,
    depth: 16,
    particleSize: 0.028,
    color1: 0xc9a96e,
    color2: 0x3a2e1e,
    colorWhite: 0xf0ede8,
    fogColor: 0x080808,
    fogNear: 12,
    fogFar: 40,
    speed: 0.00018,
    mouseInfluence: 0.00012,
  };

  function init() {
    canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(CONFIG.fogColor, 0.038);
    scene.background = new THREE.Color(CONFIG.fogColor);

    // Camera
    camera = new THREE.PerspectiveCamera(
      65,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    clock = new THREE.Clock();

    _createParticles();
    _createAtmosphere();
    _addLights();
    _bindEvents();

    initialized = true;
    animate();
  }

  function _createParticles() {
    const count = CONFIG.particleCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    const colGold = new THREE.Color(CONFIG.color1);
    const colDark = new THREE.Color(CONFIG.color2);
    const colWhite = new THREE.Color(CONFIG.colorWhite);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Positions - slight galaxy-like distribution
      const radius = Math.pow(Math.random(), 0.5) * CONFIG.spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.6;

      positions[i3]     = radius * Math.cos(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * 0.5;
      positions[i3 + 2] = (Math.random() - 0.5) * CONFIG.depth;

      // Colors - mix between gold, dark, white
      const mix = Math.random();
      let col;
      if (mix < 0.12) {
        col = colWhite.clone().lerp(colGold, Math.random() * 0.3);
      } else if (mix < 0.45) {
        col = colGold.clone().lerp(colDark, Math.random() * 0.6);
      } else {
        col = colDark.clone().lerp(colGold, Math.random() * 0.2);
      }

      colors[i3]     = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      // Size variation
      sizes[i] = CONFIG.particleSize * (0.3 + Math.random() * 1.4);
      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

    const mat = new THREE.PointsMaterial({
      size: CONFIG.particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    particlesMesh = new THREE.Points(geo, mat);
    scene.add(particlesMesh);

    particles = { geo, mat, count, positions, speeds };
  }

  function _createAtmosphere() {
    // Subtle floating plane with shimmer
    const planeGeo = new THREE.PlaneGeometry(50, 30, 1, 1);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x0d0a06,
      transparent: true,
      opacity: 0.0,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.z = -5;
    scene.add(plane);

    // Thin line geometry for subtle structure lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc9a96e,
      transparent: true,
      opacity: 0.04,
    });

    for (let i = 0; i < 6; i++) {
      const points = [];
      const y = (i - 2.5) * 2.8;
      points.push(new THREE.Vector3(-20, y, -3));
      points.push(new THREE.Vector3(20, y, -3));
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
    }
  }

  function _addLights() {
    const ambient = new THREE.AmbientLight(0x0a0805, 1);
    scene.add(ambient);

    const gold = new THREE.PointLight(0xc9a96e, 0.8, 25);
    gold.position.set(3, 2, 5);
    scene.add(gold);

    const blue = new THREE.PointLight(0x0a1520, 0.4, 20);
    blue.position.set(-4, -2, 3);
    scene.add(blue);
  }

  function _bindEvents() {
    window.addEventListener('mousemove', _onMouseMove, { passive: true });
    window.addEventListener('resize', _onResize, { passive: true });
    document.getElementById('hero')?.addEventListener('touchmove', _onTouch, { passive: true });
  }

  function _onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function _onTouch(e) {
    const t = e.touches[0];
    mouseX = (t.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (t.clientY / window.innerHeight - 0.5) * 2;
  }

  function _onResize() {
    if (!canvas || !renderer || !camera) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function animate() {
    animId = requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();
    const delta = clock.getDelta();

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Rotate particles
    if (particlesMesh) {
      particlesMesh.rotation.y = elapsed * CONFIG.speed * 60 + targetX * CONFIG.mouseInfluence * 60;
      particlesMesh.rotation.x = targetY * CONFIG.mouseInfluence * 30;

      // Subtle breathing scale
      const breathe = 1 + Math.sin(elapsed * 0.4) * 0.003;
      particlesMesh.scale.setScalar(breathe);
    }

    // Animate camera for subtle drift
    camera.position.x += (targetX * 0.8 - camera.position.x) * 0.025;
    camera.position.y += (-targetY * 0.4 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('mousemove', _onMouseMove);
    window.removeEventListener('resize', _onResize);
    if (renderer) {
      renderer.dispose();
    }
    if (particles) {
      particles.geo.dispose();
      particles.mat.dispose();
    }
    initialized = false;
  }

  return { init, destroy };
})();
