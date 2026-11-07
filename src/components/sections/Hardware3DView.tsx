import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useTechLab } from '../../context/TechLabContext';
import { 
  Cpu, Eye, RefreshCw, Layers, CheckCircle2, 
  AlertTriangle, BookOpen, Sparkles, X, ChevronDown, ChevronUp,
  Palette, Gauge, Compass, Scan
} from 'lucide-react';

interface PartInfo {
  id: string;
  name: string;
  category: string;
  specs: string[];
  tip: string;
  caution: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
}

// Positions calibrated around centered rootAssembly
const HARDWARE_PARTS: Record<string, PartInfo> = {
  motherboard: {
    id: 'motherboard',
    name: 'Placa-Mãe (Motherboard ATX)',
    category: 'Circuito Central & Barramentos',
    specs: [
      'Socket LGA1700 / AM5 com trava de aço',
      '4x Slots DDR5 Dual Channel blindados',
      '1x PCIe 5.0 x16 Reforçado contra empenamento',
      'VRM 16+1+2 Fases Digitais com Dissipador Aletado',
      '4x M.2 NVMe PCIe 4.0/5.0 com Thermal Pads'
    ],
    tip: 'Certifique-se de que a quantidade de suportes dourados (standoffs) no gabinete corresponde exatamente aos furos da placa antes de parafusar.',
    caution: 'Nunca apoie a placa sobre o plástico cinza antiestático da embalagem por fora (ele é condutivo na face externa). Apoie sobre a caixa de papelão.',
    cameraPos: [3.4, 2.9, 3.6],
    targetPos: [0, 1.1, 0],
  },
  cpu: {
    id: 'cpu',
    name: 'Processador (CPU) & Socket AM5/LGA',
    category: 'Unidade de Processamento Central',
    specs: [
      '16 Núcleos Físicos / 32 Threads Virtuais',
      'Clock Boost até 5.7 GHz · 64MB L3 Cache',
      'Litografia 4nm / 5nm · TDP 105W',
      'Barramento PCIe 5.0 Direto para GPU e NVMe'
    ],
    tip: 'Encaixe com gravidade pura (Zero Insertion Force), alinhando o triângulo dourado do processador com a marcação no socket.',
    caution: 'Nunca toque nos pinos do socket da placa-mãe. Eles são microscópicos e entortam com pressão levíssima.',
    cameraPos: [-0.6, 2.3, 1.8],
    targetPos: [-0.55, 1.25, -0.6],
  },
  gpu: {
    id: 'gpu',
    name: 'Placa de Vídeo (GPU) Triple Fan RTX',
    category: 'Processamento Gráfico & IA',
    specs: [
      '16 GB GDDR6X · 256-bit Bus',
      '3x Ventoinhas Axial-Tech com Rolamento Duplo',
      'Dissipador Aletado Vapor Chamber de Cobre',
      'Conector PCIe 16-pin 12V-2x6',
      'Suporte a Ray Tracing de 3ª Geração e DLSS'
    ],
    tip: 'Utilize o suporte antiqueda (anti-sag bracket) para evitar empenamento e microfissuras na trilha do slot PCIe devido ao peso.',
    caution: 'Conecte o cabo HDMI ou DisplayPort na saída da GPU, e JAMAIS na saída da placa-mãe, para utilizar a potência gráfica dedicada.',
    cameraPos: [-0.75, 2.1, 3.2],
    targetPos: [-0.75, 1.25, 0.5],
  },
  cooler: {
    id: 'cooler',
    name: 'Water Cooler AIO 240mm RGB',
    category: 'Arrefecimento Líquido & Bomba',
    specs: [
      'Bomba Cerâmica 3200 RPM com Bloco de Cobre',
      'Radiador Duplo 240mm de Alumínio Alta Densidade',
      '2x Mangueiras Trançadas Antivazamento FEP',
      '2x Ventoinhas 120mm PWM Fluid Dynamic Bearing'
    ],
    tip: 'Aperte os parafusos do bloco da bomba em padrão de X (cruzado), dando meia volta em cada um para assentar a pasta térmica com pressão equilibrada.',
    caution: 'ATENÇÃO CRÍTICA: Remova a película plástica transparente da base de cobre da bomba antes de instalar sobre a CPU!',
    cameraPos: [-0.2, 2.8, 2.5],
    targetPos: [-0.2, 1.8, -0.6],
  },
  ram: {
    id: 'ram',
    name: 'Memória RAM DDR5 Dual Channel',
    category: 'Memória Primária Ultrarrápida',
    specs: [
      '32 GB Kit (2x 16 GB Dual Channel)',
      'Frequência 6000 MT/s · CL30 Low Latency',
      'Dissipador de Alumínio Anodizado com Difusor RGB',
      'Perfis Intel XMP 3.0 e AMD EXPO de Fábrica'
    ],
    tip: 'Em placas-mãe de 4 slots, priorize os slots 2 e 4 (A2 e B2) a contar da CPU para garantir o sinal limpo do Dual Channel.',
    caution: 'Pressione com firmeza uniforme em ambas as extremidades do pente até ouvir o clique seco das travas de retenção.',
    cameraPos: [1.3, 2.1, 1.5],
    targetPos: [0.38, 1.3, -0.6],
  },
  psu: {
    id: 'psu',
    name: 'Fonte de Alimentação ATX 850W Gold',
    category: 'Distribuição Elétrica',
    specs: [
      '850W Contínuos · Certificação 80 Plus Gold (92%)',
      'Grelha Honeycomb com Ventoinha 135mm FDB Silenciosa',
      'Cabeamento 100% Full Modular Sleeved',
      'Padrão ATX 3.0 & Cabo Nativo PCIe 5.0'
    ],
    tip: 'Instale a fonte com a ventoinha voltada para a grelha inferior do gabinete para captar ar frio de fora e expelir pelo fundo.',
    caution: 'Nunca misture cabos modulares de fontes diferentes, mesmo da mesma marca. A pinagem interna varia e queima componentes.',
    cameraPos: [2.3, 2.3, 1.8],
    targetPos: [1.1, 0.8, -0.6],
  },
};

export const Hardware3DView: React.FC = () => {
  const { setCurrentSection } = useTechLab();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // UI State
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [selectedPartKey, setSelectedPartKey] = useState<string>('motherboard');
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [fansActive, setFansActive] = useState<boolean>(true);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<'cyberpunk' | 'royal' | 'stealth'>('cyberpunk');
  const [ultraPbr, setUltraPbr] = useState<boolean>(true);
  const [isXRay, setIsXRay] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rootAssemblyRef = useRef<THREE.Group | null>(null);
  const animatedPartsRef = useRef<Record<string, THREE.Object3D>>({});
  const fanMeshesRef = useRef<THREE.Mesh[]>([]);
  const rgbLightsRef = useRef<THREE.PointLight[]>([]);
  const rgbMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  
  // X-Ray materials tracking
  const shellMeshesRef = useRef<{ mesh: THREE.Mesh; originalMat: THREE.Material | THREE.Material[] }[]>([]);
  const internalMeshesRef = useRef<THREE.Mesh[]>([]);

  // Camera transition state without fighting OrbitControls
  const isTransitioningRef = useRef<boolean>(false);
  const cameraTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(4.0, 3.2, 4.4));
  const controlsTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.35, 0));

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Accurate immediate dimensions
    const rect = container.getBoundingClientRect();
    const width = rect.width > 100 ? rect.width : (container.clientWidth || 900);
    const height = Math.max(560, Math.min(window.innerHeight - 200, 700));

    // Scene with dark tech background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040814);
    scene.fog = new THREE.FogExp2(0x040814, 0.035);
    sceneRef.current = scene;

    // Camera calibrated exactly on the PC center
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 70);
    camera.position.set(4.0, 3.2, 4.4);
    cameraRef.current = camera;

    // High performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Orbit Controls with free, fluid movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 1.35, 0); // Focus directly on center of computer
    controls.minDistance = 0.8;
    controls.maxDistance = 14.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.rotateSpeed = 0.9;
    controls.zoomSpeed = 1.1;
    controls.panSpeed = 0.8;
    controlsRef.current = controls;

    // Stop programmatic transitions when the user starts manual orbit
    controls.addEventListener('start', () => {
      isTransitioningRef.current = false;
    });

    // Lighting Setup
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambientLight);

    // Dynamic RGB Accent Lights
    const cyanLight = new THREE.PointLight(0x06b6d4, 3.5, 7, 2);
    cyanLight.position.set(-0.8, 1.8, 0.4);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xd946ef, 3.0, 7, 2);
    magentaLight.position.set(0.4, 1.9, -0.4);
    scene.add(magentaLight);

    rgbLightsRef.current = [cyanLight, magentaLight];

    // Pedestal Ground: Realistic dark studio platform (NO giant glowing cyan slab!)
    const floorGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.16, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070d1a,
      roughness: 0.65,
      metalness: 0.35,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.08;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Subtle edge ring (thin glowing accent)
    const ringGeo = new THREE.TorusGeometry(4.22, 0.025, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      roughness: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.0;
    scene.add(ringMesh);

    // Subtle tech grid
    const grid = new THREE.GridHelper(6.4, 16, 0x1e3a8a, 0x0d1e3f);
    grid.position.y = 0.005;
    scene.add(grid);

    // ==========================================
    // 3D PC MODEL ASSEMBLY (CENTERED IN VIEWPORT)
    // ==========================================
    // Shifting rootAssembly by (-0.3, 0.0, 0.0) balances the Motherboard, GPU, and PSU in the dead center!
    const rootAssembly = new THREE.Group();
    rootAssembly.position.set(-0.3, 0.02, 0.0);
    scene.add(rootAssembly);
    rootAssemblyRef.current = rootAssembly;

    const parts: Record<string, THREE.Object3D> = {};
    const fanMeshes: THREE.Mesh[] = [];
    const rgbMats: THREE.MeshStandardMaterial[] = [];
    const shellMeshes: { mesh: THREE.Mesh; originalMat: THREE.Material | THREE.Material[] }[] = [];
    const internalMeshes: THREE.Mesh[] = [];

    const registerShell = (mesh: THREE.Mesh) => {
      shellMeshes.push({ mesh, originalMat: mesh.material });
    };

    const registerInternal = (mesh: THREE.Mesh) => {
      internalMeshes.push(mesh);
    };

    // --- 1. MOTHERBOARD ---
    const mbGroup = new THREE.Group();
    mbGroup.userData = { partId: 'motherboard' };

    const pcbGeo = new THREE.BoxGeometry(3.2, 0.08, 4.0);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0b1320,
      roughness: 0.45,
      metalness: 0.35,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    pcbMesh.castShadow = true;
    pcbMesh.receiveShadow = true;
    mbGroup.add(pcbMesh);
    registerShell(pcbMesh);

    // Copper traces for X-Ray
    const tracePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.0, 3.8),
      new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      })
    );
    tracePlane.rotation.x = -Math.PI / 2;
    tracePlane.position.y = 0.045;
    mbGroup.add(tracePlane);
    registerInternal(tracePlane);

    // VRM Heatsinks
    const vrmLeftGeo = new THREE.BoxGeometry(0.48, 0.42, 2.2);
    const vrmMat = new THREE.MeshStandardMaterial({
      color: 0x182234,
      roughness: 0.25,
      metalness: 0.85,
    });
    const vrmLeft = new THREE.Mesh(vrmLeftGeo, vrmMat);
    vrmLeft.position.set(-1.26, 0.25, -0.6);
    vrmLeft.castShadow = true;
    mbGroup.add(vrmLeft);
    registerShell(vrmLeft);

    const vrmTopGeo = new THREE.BoxGeometry(1.6, 0.38, 0.42);
    const vrmTop = new THREE.Mesh(vrmTopGeo, vrmMat);
    vrmTop.position.set(-0.25, 0.23, -1.65);
    vrmTop.castShadow = true;
    mbGroup.add(vrmTop);
    registerShell(vrmTop);

    // Chipset Heatsink
    const pchGeo = new THREE.BoxGeometry(0.9, 0.22, 1.1);
    const pchMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const pch = new THREE.Mesh(pchGeo, pchMat);
    pch.position.set(0.9, 0.15, 0.8);
    pch.castShadow = true;
    mbGroup.add(pch);
    registerShell(pch);

    // PCIe Slots
    const pcieMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.95,
    });
    for (let i = 0; i < 2; i++) {
      const pcie = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 2.4), pcieMat);
      pcie.position.set(-0.45 - i * 0.55, 0.12, 0.4);
      pcie.castShadow = true;
      mbGroup.add(pcie);
    }

    // Capacitors
    const capGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.18, 12);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.9,
    });
    for (let c = 0; c < 8; c++) {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(-0.95, 0.14, -1.4 + c * 0.32);
      mbGroup.add(cap);
    }

    mbGroup.position.set(0, 0.6, 0);
    rootAssembly.add(mbGroup);
    parts.motherboard = mbGroup;

    // --- 2. CPU & SOCKET ---
    const cpuGroup = new THREE.Group();
    cpuGroup.userData = { partId: 'cpu' };

    const socketFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.08, 1.05),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.4, metalness: 0.6 })
    );
    socketFrame.position.set(-0.25, 0.68, -0.6);
    cpuGroup.add(socketFrame);
    registerShell(socketFrame);

    // LGA Contact Pins
    const pinsGeo = new THREE.PlaneGeometry(0.7, 0.7, 10, 10);
    const pinsMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.9,
      wireframe: true,
    });
    const pinsMesh = new THREE.Mesh(pinsGeo, pinsMat);
    pinsMesh.rotation.x = -Math.PI / 2;
    pinsMesh.position.set(-0.25, 0.73, -0.6);
    cpuGroup.add(pinsMesh);
    registerInternal(pinsMesh);

    // IHS
    const ihsGeo = new THREE.BoxGeometry(0.82, 0.07, 0.82);
    const ihsMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.95,
    });
    const ihsMesh = new THREE.Mesh(ihsGeo, ihsMat);
    ihsMesh.position.set(-0.25, 0.74, -0.6);
    ihsMesh.castShadow = true;
    cpuGroup.add(ihsMesh);
    registerShell(ihsMesh);

    // Silicon Die
    const dieGeo = new THREE.BoxGeometry(0.45, 0.03, 0.45);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.2,
      roughness: 0.1,
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.position.set(-0.25, 0.72, -0.6);
    cpuGroup.add(dieMesh);
    registerInternal(dieMesh);

    // Gold triangle mark
    const triangleGeo = new THREE.ConeGeometry(0.04, 0.02, 3);
    const triangleMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const triangle = new THREE.Mesh(triangleGeo, triangleMat);
    triangle.rotation.x = Math.PI / 2;
    triangle.position.set(-0.58, 0.78, -0.93);
    cpuGroup.add(triangle);

    rootAssembly.add(cpuGroup);
    parts.cpu = cpuGroup;

    // --- 3. WATER COOLER AIO 240MM ---
    const coolerGroup = new THREE.Group();
    coolerGroup.userData = { partId: 'cooler' };

    const pumpGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.36, 32);
    const pumpMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.7,
    });
    const pumpMesh = new THREE.Mesh(pumpGeo, pumpMat);
    pumpMesh.position.set(-0.25, 0.96, -0.6);
    pumpMesh.castShadow = true;
    coolerGroup.add(pumpMesh);
    registerShell(pumpMesh);

    // Internal copper cooling fins
    const copperFinBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 0.08, 16),
      new THREE.MeshStandardMaterial({
        color: 0xb45309,
        emissive: 0xd97706,
        emissiveIntensity: 0.6,
      })
    );
    copperFinBase.position.set(-0.25, 0.88, -0.6);
    coolerGroup.add(copperFinBase);
    registerInternal(copperFinBase);

    // Pump ARGB Ring
    const pumpRingGeo = new THREE.TorusGeometry(0.42, 0.045, 16, 40);
    const pumpRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });
    const pumpRing = new THREE.Mesh(pumpRingGeo, pumpRingMat);
    pumpRing.rotation.x = Math.PI / 2;
    pumpRing.position.set(-0.25, 1.15, -0.6);
    coolerGroup.add(pumpRing);
    rgbMats.push(pumpRingMat);

    // Radiator
    const radGeo = new THREE.BoxGeometry(2.6, 0.28, 1.15);
    const radMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.5,
      metalness: 0.6,
    });
    const radMesh = new THREE.Mesh(radGeo, radMat);
    radMesh.position.set(0.1, 2.65, -0.6);
    radMesh.castShadow = true;
    coolerGroup.add(radMesh);
    registerShell(radMesh);

    // Radiator Fans
    for (let f = -1; f <= 1; f += 2) {
      const radFanFrame = new THREE.Mesh(
        new THREE.BoxGeometry(1.05, 0.14, 1.05),
        new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.4 })
      );
      radFanFrame.position.set(0.1 + f * 0.65, 2.45, -0.6);
      coolerGroup.add(radFanFrame);
      registerShell(radFanFrame);

      const radFanGroup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.44, 0.44, 0.06, 16),
        new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0284c7,
          emissiveIntensity: 0.35,
          roughness: 0.3,
          transparent: true,
          opacity: 0.9,
        })
      );
      radFanGroup.rotation.x = Math.PI / 2;
      radFanGroup.position.set(0.1 + f * 0.65, 2.45, -0.6);
      coolerGroup.add(radFanGroup);
      fanMeshes.push(radFanGroup);
    }

    // Cooling Tubes
    const createTube = (start: THREE.Vector3, mid: THREE.Vector3, end: THREE.Vector3) => {
      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.05, 12, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.3,
        metalness: 0.4,
      });
      return new THREE.Mesh(tubeGeo, tubeMat);
    };

    const tube1 = createTube(
      new THREE.Vector3(-0.12, 1.08, -0.45),
      new THREE.Vector3(0.0, 1.85, -0.48),
      new THREE.Vector3(0.35, 2.5, -0.45)
    );
    tube1.castShadow = true;
    coolerGroup.add(tube1);
    registerShell(tube1);

    const tube2 = createTube(
      new THREE.Vector3(-0.35, 1.08, -0.45),
      new THREE.Vector3(-0.25, 1.9, -0.4),
      new THREE.Vector3(0.15, 2.5, -0.45)
    );
    tube2.castShadow = true;
    coolerGroup.add(tube2);
    registerShell(tube2);

    rootAssembly.add(coolerGroup);
    parts.cooler = coolerGroup;

    // --- 4. DUAL CHANNEL DDR5 RAM ---
    const ramGroup = new THREE.Group();
    ramGroup.userData = { partId: 'ram' };

    for (let r = 0; r < 2; r++) {
      const xOffset = 0.58 + r * 0.22;
      const ramStick = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.68, 1.6),
        new THREE.MeshStandardMaterial({
          color: 0x111827,
          roughness: 0.2,
          metalness: 0.85,
        })
      );
      ramStick.position.set(xOffset, 1.05, -0.6);
      ramStick.castShadow = true;
      ramGroup.add(ramStick);
      registerShell(ramStick);

      // Internal BGA DRAM chips
      for (let m = 0; m < 4; m++) {
        const chip = new THREE.Mesh(
          new THREE.BoxGeometry(0.095, 0.16, 0.24),
          new THREE.MeshStandardMaterial({
            color: 0x10b981,
            emissive: 0x059669,
            emissiveIntensity: 0.7,
          })
        );
        chip.position.set(xOffset, 1.0, -1.1 + m * 0.35);
        ramGroup.add(chip);
        registerInternal(chip);
      }

      // Top Illuminated RGB Lightbar
      const ramRgbMat = new THREE.MeshStandardMaterial({
        color: 0xd946ef,
        emissive: 0xd946ef,
        emissiveIntensity: 0.95,
        roughness: 0.2,
      });
      const ramRgb = new THREE.Mesh(
        new THREE.BoxGeometry(0.11, 0.08, 1.62),
        ramRgbMat
      );
      ramRgb.position.set(xOffset, 1.42, -0.6);
      ramGroup.add(ramRgb);
      rgbMats.push(ramRgbMat);
    }

    rootAssembly.add(ramGroup);
    parts.ram = ramGroup;

    // --- 5. TRIPLE-FAN GRAPHICS CARD (GPU) ---
    const gpuGroup = new THREE.Group();
    gpuGroup.userData = { partId: 'gpu' };

    const shroudGeo = new THREE.BoxGeometry(1.2, 0.65, 3.4);
    const shroudMat = new THREE.MeshStandardMaterial({
      color: 0x182030,
      roughness: 0.35,
      metalness: 0.75,
    });
    const shroud = new THREE.Mesh(shroudGeo, shroudMat);
    shroud.position.set(-0.45, 1.25, 0.5);
    shroud.castShadow = true;
    gpuGroup.add(shroud);
    registerShell(shroud);

    // Internal copper heatpipes
    const heatpipeGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.8, 12);
    const heatpipeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      metalness: 0.9,
    });
    for (let hp = -1; hp <= 1; hp++) {
      const heatpipe = new THREE.Mesh(heatpipeGeo, heatpipeMat);
      heatpipe.rotation.x = Math.PI / 2;
      heatpipe.position.set(-0.45 + hp * 0.28, 1.15, 0.5);
      gpuGroup.add(heatpipe);
      registerInternal(heatpipe);
    }

    // Metal Backplate
    const backplate = new THREE.Mesh(
      new THREE.BoxGeometry(1.22, 0.05, 3.42),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.25, metalness: 0.9 })
    );
    backplate.position.set(-0.45, 0.91, 0.5);
    gpuGroup.add(backplate);
    registerShell(backplate);

    // Side RGB Accent Bar
    const sideRgbMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.85,
    });
    const sideRgb = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.12, 2.2),
      sideRgbMat
    );
    sideRgb.position.set(0.16, 1.35, 0.5);
    gpuGroup.add(sideRgb);
    rgbMats.push(sideRgbMat);

    // 3x Axial Fan Hubs
    for (let i = -1; i <= 1; i++) {
      const fanCenterZ = 0.5 + i * 1.0;

      const fanRing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.44, 0.44, 0.04, 28),
        new THREE.MeshStandardMaterial({ color: 0x0b111e, roughness: 0.4, metalness: 0.8 })
      );
      fanRing.position.set(-0.45, 1.58, fanCenterZ);
      gpuGroup.add(fanRing);
      registerShell(fanRing);

      const fanHub = new THREE.Group();
      fanHub.position.set(-0.45, 1.59, fanCenterZ);

      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.05, 16),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.9 })
      );
      fanHub.add(cap);

      const bladeGeo = new THREE.BoxGeometry(0.08, 0.02, 0.28);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.35,
        metalness: 0.6,
      });
      for (let b = 0; b < 9; b++) {
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        const angle = (b / 9) * Math.PI * 2;
        blade.position.set(Math.cos(angle) * 0.25, 0, Math.sin(angle) * 0.25);
        blade.rotation.y = -angle + 0.35;
        fanHub.add(blade);
      }

      gpuGroup.add(fanHub);
      fanMeshes.push(fanHub as unknown as THREE.Mesh);
    }

    rootAssembly.add(gpuGroup);
    parts.gpu = gpuGroup;

    // --- 6. ATX POWER SUPPLY (PSU) ---
    const psuGroup = new THREE.Group();
    psuGroup.userData = { partId: 'psu' };

    const psuBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.95, 1.8),
      new THREE.MeshStandardMaterial({
        color: 0x090d16,
        roughness: 0.5,
        metalness: 0.5,
      })
    );
    psuBody.position.set(1.4, 0.55, -0.6);
    psuBody.castShadow = true;
    psuGroup.add(psuBody);
    registerShell(psuBody);

    // Internal copper transformer coil
    const coil = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.12, 16, 24),
      new THREE.MeshStandardMaterial({
        color: 0xd97706,
        emissive: 0xb45309,
        emissiveIntensity: 0.9,
      })
    );
    coil.rotation.x = Math.PI / 2;
    coil.position.set(1.4, 0.55, -0.6);
    psuGroup.add(coil);
    registerInternal(coil);

    // Honeycomb Top Grill Pattern
    const grillRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.62, 0.04, 32),
      new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x0284c7,
        emissiveIntensity: 0.3,
        roughness: 0.4,
        metalness: 0.8,
      })
    );
    grillRing.position.set(1.4, 1.04, -0.6);
    psuGroup.add(grillRing);
    registerShell(grillRing);

    // Internal PSU fan
    const psuFan = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.02, 16),
      new THREE.MeshStandardMaterial({ color: 0x0b1329, roughness: 0.4 })
    );
    psuFan.position.set(1.4, 1.01, -0.6);
    psuGroup.add(psuFan);
    fanMeshes.push(psuFan);

    rootAssembly.add(psuGroup);
    parts.psu = psuGroup;

    // Store references
    animatedPartsRef.current = parts;
    fanMeshesRef.current = fanMeshes;
    rgbMaterialsRef.current = rgbMats;
    shellMeshesRef.current = shellMeshes;
    internalMeshesRef.current = internalMeshes;

    // Sync first frame directly without any jumping animation
    controls.update();
    renderer.render(scene, camera);

    // --- Raycasting for interaction ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedPart = (clientX: number, clientY: number): string | null => {
      const elRect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - elRect.left) / elRect.width) * 2 - 1;
      mouse.y = -((clientY - elRect.top) / elRect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(rootAssembly.children, true);

      if (intersects.length > 0) {
        let curr: THREE.Object3D | null = intersects[0].object;
        while (curr && curr !== rootAssembly) {
          if (curr.userData?.partId) {
            return curr.userData.partId;
          }
          curr = curr.parent;
        }
      }
      return null;
    };

    // Single click: Selects part without opening modal
    const handleClick = (e: MouseEvent) => {
      const partId = getIntersectedPart(e.clientX, e.clientY);
      if (partId && HARDWARE_PARTS[partId]) {
        setSelectedPartKey(partId);
      }
    };

    // Double click: Opens inspector modal
    const handleDoubleClick = (e: MouseEvent) => {
      const partId = getIntersectedPart(e.clientX, e.clientY);
      if (partId && HARDWARE_PARTS[partId]) {
        setSelectedPartKey(partId);
        setIsInspectorOpen(true);
      }
    };

    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('dblclick', handleDoubleClick);

    // Animation Loop
    let reqId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (currentTime: number) => {
      reqId = requestAnimationFrame(animate);

      // FPS Calculation
      frameCount++;
      if (currentTime - fpsTimer >= 600) {
        const calculatedFps = Math.round((frameCount * 1000) / (currentTime - fpsTimer));
        setFps(Math.min(60, Math.max(30, calculatedFps)));
        frameCount = 0;
        fpsTimer = currentTime;
      }

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Rotate fans if active
      if (fansActive) {
        fanMeshesRef.current.forEach((mesh, idx) => {
          if (idx < 2) {
            mesh.rotation.z += 0.14;
          } else if (idx < 5) {
            mesh.rotation.y += 0.18;
          } else {
            mesh.rotation.y += 0.12;
          }
        });
      }

      // Smooth camera transition ONLY when isTransitioningRef is true
      if (isTransitioningRef.current) {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraTargetPos.current.x, 3.5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraTargetPos.current.y, 3.5, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTargetPos.current.z, 3.5, delta);

        controls.target.x = THREE.MathUtils.damp(controls.target.x, controlsTargetPos.current.x, 3.5, delta);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, controlsTargetPos.current.y, 3.5, delta);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, controlsTargetPos.current.z, 3.5, delta);

        if (camera.position.distanceTo(cameraTargetPos.current) < 0.04) {
          isTransitioningRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    reqId = requestAnimationFrame(animate);

    // Resize Observer for robust layout responsiveness without jump
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 100) {
          const h = Math.max(560, Math.min(window.innerHeight - 200, 700));
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('dblclick', handleDoubleClick);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  // Update auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
      controlsRef.current.autoRotateSpeed = 1.4;
    }
  }, [isAutoRotate]);

  // Exploded View transforms
  useEffect(() => {
    const parts = animatedPartsRef.current;
    if (!parts.cooler || !parts.gpu || !parts.ram || !parts.cpu || !parts.psu) return;

    const t = explodedFactor / 100;

    // Cooler lifts upwards
    parts.cooler.position.y = t * 1.8;

    // CPU lifts slightly from socket
    parts.cpu.position.y = t * 0.45;

    // RAM lifts vertically
    parts.ram.position.y = t * 1.1;

    // GPU pulls outward on X and Z
    parts.gpu.position.x = -t * 1.3;
    parts.gpu.position.y = -t * 0.35;
    parts.gpu.position.z = t * 0.5;

    // PSU pulls outward to the right
    parts.psu.position.x = t * 0.9;
  }, [explodedFactor]);

  // RAIO-X (X-Ray Holographic Mode) Transformation
  useEffect(() => {
    if (!sceneRef.current) return;
    const shells = shellMeshesRef.current;
    const internals = internalMeshesRef.current;

    if (isXRay) {
      const xrayMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x0284c7,
        emissiveIntensity: 0.45,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      });

      shells.forEach(({ mesh }) => {
        mesh.material = xrayMat;
      });

      internals.forEach(mesh => {
        mesh.visible = true;
        if (mesh.material && 'emissiveIntensity' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.4;
        }
      });
    } else {
      shells.forEach(({ mesh, originalMat }) => {
        mesh.material = originalMat;
      });

      internals.forEach(mesh => {
        mesh.visible = true;
        if (mesh.material && 'emissiveIntensity' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        }
      });
    }
  }, [isXRay]);

  // Color Theme Switcher
  useEffect(() => {
    if (!sceneRef.current) return;
    const lights = rgbLightsRef.current;
    const mats = rgbMaterialsRef.current;

    if (themeMode === 'cyberpunk') {
      if (lights[0]) lights[0].color.setHex(0x06b6d4);
      if (lights[1]) lights[1].color.setHex(0xd946ef);
      mats.forEach((m, idx) => {
        const hex = idx % 2 === 0 ? 0x06b6d4 : 0xd946ef;
        m.color.setHex(hex);
        m.emissive.setHex(hex);
      });
    } else if (themeMode === 'royal') {
      if (lights[0]) lights[0].color.setHex(0x2563eb);
      if (lights[1]) lights[1].color.setHex(0x38bdf8);
      mats.forEach(m => {
        m.color.setHex(0x2563eb);
        m.emissive.setHex(0x38bdf8);
      });
    } else {
      // Stealth Dark
      if (lights[0]) lights[0].color.setHex(0x64748b);
      if (lights[1]) lights[1].color.setHex(0x334155);
      mats.forEach(m => {
        m.color.setHex(0x475569);
        m.emissive.setHex(0x1e293b);
      });
    }
  }, [themeMode]);

  // Ultra PBR vs Light Mode
  useEffect(() => {
    if (!rendererRef.current || !sceneRef.current) return;
    rendererRef.current.shadowMap.enabled = ultraPbr;
    sceneRef.current.traverse(obj => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = ultraPbr;
        obj.receiveShadow = ultraPbr;
      }
    });
  }, [ultraPbr]);

  // Camera Focus Preset Handler
  const focusOnPart = (partKey: string) => {
    setSelectedPartKey(partKey);
    const part = HARDWARE_PARTS[partKey];
    if (part) {
      isTransitioningRef.current = true;
      cameraTargetPos.current.set(...part.cameraPos);
      controlsTargetPos.current.set(...part.targetPos);
    }
  };

  const focusTopView = () => {
    isTransitioningRef.current = true;
    cameraTargetPos.current.set(0.01, 7.2, 0.01);
    controlsTargetPos.current.set(0, 1.2, 0);
  };

  const resetCamera = () => {
    isTransitioningRef.current = true;
    cameraTargetPos.current.set(4.0, 3.2, 4.4);
    controlsTargetPos.current.set(0, 1.35, 0);
    setExplodedFactor(0);
  };


  const selectedPart = HARDWARE_PARTS[selectedPartKey] || HARDWARE_PARTS.motherboard;

  return (
    <div className="relative w-full space-y-4 select-none pb-8">
      {/* Main 3D Viewport Wrapper with Cyber Royal Styling */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/25 bg-[#040814] shadow-2xl shadow-blue-950/40">
        
        {/* TOP HUD: Structured Grid & Flex Layout (Zero overlaps guaranteed!) */}
        <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none">
          <div className="bg-[#050e1f]/85 backdrop-blur-md border border-cyan-500/25 rounded-2xl p-2.5 shadow-xl flex flex-wrap items-center justify-between gap-2.5 pointer-events-auto">
            
            {/* Left Items: Badge + Inspector Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#09152b] border border-cyan-500/30 text-xs font-semibold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                <span className="tracking-wide">SIMULADOR 3D</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  PBR V2
                </span>
              </div>

              {/* Click/Inspect Button */}
              <button
                onClick={() => setIsInspectorOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#081836] hover:bg-[#0e2756] border border-cyan-500/40 text-xs font-medium text-cyan-200 hover:text-white transition-all shadow-md group"
                title="Clique para abrir a ficha técnica ou dê duplo clique na peça no 3D"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>
                  Inspecionar: <strong className="text-white font-semibold">{selectedPart.name.split(' (')[0]}</strong>
                </span>
                <span className="hidden md:inline-block text-[10px] text-cyan-400 font-mono bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  2x Clique 3D
                </span>
              </button>

              {/* Raio-X Active Badge */}
              {isXRay && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-950/90 border border-cyan-400 text-xs font-mono text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)] animate-pulse">
                  <Scan className="w-3 h-3 text-cyan-400" />
                  <span>RAIO-X</span>
                </div>
              )}
            </div>

            {/* Hint Notice cleanly integrated inside header */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800">
              <span>🖱️ Arraste para orbitar · 👆 Duplo clique na peça para detalhes</span>
            </div>

            {/* Right Items: Actions & Apostilas */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSection('apostila')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091d3f] hover:bg-blue-600 border border-blue-500/40 text-xs font-semibold text-blue-100 hover:text-white transition-all shadow-md"
                title="Ir para as apostilas e aulas teóricas"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-300" />
                <span className="hidden sm:inline">Apostilas</span>
              </button>

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#071329] border border-slate-700/60 text-xs font-mono text-emerald-400">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                <span>{fps} FPS</span>
              </div>

              <button
                onClick={resetCamera}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#071329] hover:bg-[#0d2247] border border-slate-700/60 hover:border-cyan-500/50 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-md"
                title="Resetar posição e ângulo da câmera"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

          </div>
        </div>

        {/* 3D Canvas Container */}
        <div 
          ref={containerRef} 
          className="w-full h-[560px] sm:h-[620px] lg:h-[680px] cursor-grab active:cursor-grabbing"
        />

        {/* Floating Quick Camera Controls (Right side: Apenas a Bússola) */}
        <div className="absolute right-4 top-24 z-20 flex flex-col gap-2 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotate(prev => !prev)}
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-all shadow-lg ${
              isAutoRotate 
                ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                : 'bg-[#071329]/90 border-slate-700/70 hover:border-cyan-400 text-slate-200 hover:text-white'
            }`}
            title="Bússola · Giro Contínuo 360°"
          >
            <Compass className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
        </div>

        {/* BOTTOM CONTROLS DOCK (Attached Toggle Tab - Never Overlaps!) */}
        {showControls ? (
          <div className="absolute bottom-3 left-3 right-3 z-20 transition-all duration-300">
            {/* Top Attached Tab */}
            <div className="flex justify-center -mb-px">
              <button
                onClick={() => setShowControls(false)}
                className="flex items-center gap-1.5 px-4 py-1 rounded-t-xl bg-[#061124] hover:bg-[#0b1c3b] border-t border-x border-cyan-500/35 text-[11px] font-medium text-cyan-300 hover:text-white shadow-lg transition-all"
              >
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ocultar Controles (Modo Zen)</span>
              </button>
            </div>

            {/* Main Dock Container */}
            <div className="bg-[#061124]/95 backdrop-blur-xl border border-cyan-500/35 rounded-2xl p-3 shadow-2xl space-y-2.5 text-xs text-slate-200">
              
              {/* Row 1: Exploded View & Focus Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Slider */}
                <div className="flex items-center gap-2.5 min-w-[220px]">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold whitespace-nowrap">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Visão Explodida:</span>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold min-w-8">
                    {explodedFactor}%
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={explodedFactor}
                    onChange={e => setExplodedFactor(parseInt(e.target.value, 10))}
                    className="w-28 sm:w-36 accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Focus Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400 font-medium hidden sm:inline mr-1">
                    📷 Foco:
                  </span>
                  {(['motherboard', 'cpu', 'gpu', 'ram'] as const).map(key => {
                    const label = key === 'motherboard' ? 'Placa-Mãe' : key.toUpperCase();
                    return (
                      <button
                        key={key}
                        onClick={() => focusOnPart(key)}
                        className={`px-3 py-1 rounded-lg transition-all font-medium border ${
                          selectedPartKey === key
                            ? 'bg-cyan-600/30 text-cyan-200 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                            : 'bg-[#0a162b] text-slate-300 border-slate-700/80 hover:bg-[#122340]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                  <button
                    onClick={focusTopView}
                    className="px-3 py-1 rounded-lg transition-all font-medium bg-[#0a162b] text-slate-300 border border-slate-700/80 hover:bg-[#122340]"
                  >
                    Topo
                  </button>
                </div>
              </div>

              {/* Row 2: Action Toggles (Raio-X, Fans, Cyberpunk, Ultra PBR) */}
              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-800/80 pt-2">
                {/* Raio-X Toggle */}
                <button
                  onClick={() => setIsXRay(prev => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all font-medium border ${
                    isXRay
                      ? 'bg-cyan-500 text-black font-bold border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                      : 'bg-[#0a162b] text-cyan-300 border-cyan-500/40 hover:bg-[#122340]'
                  }`}
                  title="Ativar modo holográfico translúcido para visualizar camadas internas"
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>Raio-X</span>
                </button>

                {/* Theme Mode Switch */}
                <button
                  onClick={() => {
                    const next = themeMode === 'cyberpunk' ? 'royal' : themeMode === 'royal' ? 'stealth' : 'cyberpunk';
                    setThemeMode(next);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0a162b] hover:bg-[#122340] text-slate-200 border border-slate-700/80 transition-all font-medium"
                  title="Alterar esquema de iluminação RGB"
                >
                  <Palette className="w-3.5 h-3.5 text-pink-400" />
                  <span className="capitalize">{themeMode}</span>
                </button>

                {/* Ultra PBR Switch */}
                <button
                  onClick={() => setUltraPbr(prev => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all font-medium border ${
                    ultraPbr
                      ? 'bg-blue-600/30 text-blue-200 border-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.3)]'
                      : 'bg-[#0a162b] text-slate-400 border-slate-700/80'
                  }`}
                  title="Alternar entre modo ultra PBR com sombras e modo ultra leve"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-300" />
                  <span>{ultraPbr ? 'Ultra PBR' : 'Leve (60FPS)'}</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Zen Mode Collapsed Button */
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
            <button
              onClick={() => setShowControls(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#061124]/95 hover:bg-[#0c1f3d] backdrop-blur-md border border-cyan-500/40 text-xs font-semibold text-cyan-200 hover:text-white shadow-2xl transition-all"
            >
              <ChevronUp className="w-4 h-4 text-cyan-400" />
              <span>Mostrar Controles</span>
            </button>
          </div>
        )}

      </div>

      {/* COMPONENT INSPECTOR MODAL (Opens only on DOUBLE CLICK on 3D, or via "Inspecionar") */}
      {isInspectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#061226] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 text-white space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-cyan-500/20 pb-4">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                  {selectedPart.category}
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>{selectedPart.name}</span>
                </h3>
              </div>
              <button
                onClick={() => setIsInspectorOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Part Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {Object.keys(HARDWARE_PARTS).map(key => {
                const p = HARDWARE_PARTS[key];
                const active = selectedPartKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => focusOnPart(key)}
                    className={`px-2.5 py-1 text-xs rounded-lg whitespace-nowrap transition-colors font-medium border ${
                      active
                        ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                        : 'bg-[#09152b] text-slate-300 border-slate-700/60 hover:bg-[#102242]'
                    }`}
                  >
                    {p.name.split(' (')[0]}
                  </button>
                );
              })}
            </div>

            {/* Specs List */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Especificações Técnicas & Arquitetura
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedPart.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-[#09172f]/80 border border-slate-800 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Golden Rule Tip */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dica de Ouro de Instalação:</span>
              </div>
              <p className="leading-relaxed pl-5 text-emerald-100">{selectedPart.tip}</p>
            </div>

            {/* Caution Warning */}
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Atenção & Cuidado Crítico:</span>
              </div>
              <p className="leading-relaxed pl-5 text-amber-100">{selectedPart.caution}</p>
            </div>

            {/* Footer Close */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setIsInspectorOpen(false);
                  setIsXRay(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0c1f3d] hover:bg-[#122d57] border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition-colors"
              >
                <Scan className="w-4 h-4" />
                <span>Ver com Raio-X</span>
              </button>

              <button
                onClick={() => setIsInspectorOpen(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
              >
                Continuar Navegando
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Component Spec Cards Underneath */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div 
          onClick={() => { focusOnPart('motherboard'); setIsInspectorOpen(true); }}
          className="p-4 rounded-xl bg-[#050f21]/80 hover:bg-[#081733] border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-1.5 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-400">PLACA-MÃE & CHIPSET</span>
            <span className="text-[10px] text-slate-400 font-mono">ATX Flagship</span>
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
            Barramento PCIe 5.0 & VRM 18 Fases
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2">
            Circuito central com dissipadores aletados em alumínio e suporte a 4x M.2 NVMe.
          </p>
        </div>

        <div 
          onClick={() => { focusOnPart('gpu'); setIsInspectorOpen(true); }}
          className="p-4 rounded-xl bg-[#050f21]/80 hover:bg-[#081733] border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-1.5 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-400">GPU DEDICADA</span>
            <span className="text-[10px] text-slate-400 font-mono">16GB GDDR6X</span>
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
            Triple Fan com Ray Tracing & DLSS
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2">
            Dissipador vapor chamber de cobre com 3 ventoinhas axiais e conector 12V-2x6.
          </p>
        </div>

        <div 
          onClick={() => { focusOnPart('cooler'); setIsInspectorOpen(true); }}
          className="p-4 rounded-xl bg-[#050f21]/80 hover:bg-[#081733] border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-1.5 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-400">ARREFECIMENTO AIO</span>
            <span className="text-[10px] text-slate-400 font-mono">240mm RGB</span>
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
            Bomba Cerâmica & Radiador Duplo
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2">
            Circulação de fluido em circuito fechado com mangueiras trançadas e espelho infinito.
          </p>
        </div>
      </div>
    </div>
  );
};
