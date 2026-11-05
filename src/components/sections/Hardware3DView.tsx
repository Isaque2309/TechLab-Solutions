import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TECHLAB_DATA } from '../../data/techlabData';
import { 
  Cpu, RotateCw, Eye, RefreshCw, Layers, CheckCircle2, 
  AlertTriangle, Wrench, ChevronRight, Sliders 
} from 'lucide-react';

interface PartInfo {
  id: string;
  name: string;
  category: string;
  specs: string[];
  tip: string;
  caution: string;
}

const HARDWARE_PARTS: Record<string, PartInfo> = {
  cpu: {
    id: 'cpu',
    name: 'Processador (CPU) LGA / AM5',
    category: 'Processamento Central',
    specs: ['16 Núcleos / 32 Threads', 'Boost Clock até 5.7 GHz', '105W TDP', 'PCIe 5.0 Controller'],
    tip: 'Encaixe com gravidade pura (Zero Insertion Force), alinhando o triângulo dourado com o socket da placa-mãe.',
    caution: 'Nunca toque nos pinos do socket da placa-mãe; eles são extremamente frágeis e entortam com toque leve.',
  },
  cooler: {
    id: 'cooler',
    name: 'Water Cooler AIO 240mm RGB',
    category: 'Arrefecimento Líquido',
    specs: ['Bomba cerâmica 3200 RPM', 'Radiador de alumínio denso', '2x Ventoinhas 120mm PWM', 'ARGB Sync'],
    tip: 'Aperte os parafusos do bloco em padrão de X (cruzado) aos poucos para distribuir a pressão uniformemente.',
    caution: 'Retire a película plástica de proteção da base de cobre antes de fixar sobre o processador!',
  },
  ram: {
    id: 'ram',
    name: 'Memória RAM DDR5 (Dual Channel)',
    category: 'Memória Primária',
    specs: ['32 GB (2x 16 GB)', '6000 MT/s CL30', 'Dissipador de alumínio anodizado', 'Suporte a Intel XMP e AMD EXPO'],
    tip: 'Em placas de 4 slots, instale sempre nos slots 2 e 4 (a partir da CPU) para habilitar Dual Channel.',
    caution: 'Pressione firmemente em ambas as extremidades até ouvir o clique duplo das travas plásticas.',
  },
  gpu: {
    id: 'gpu',
    name: 'Placa de Vídeo (GPU) Triple Fan',
    category: 'Processamento Gráfico',
    specs: ['16 GB GDDR6X', '3x Ventoinhas Axial-tech', 'Conector 12V-2x6 / PCIe 8-pin', 'Suporte Ray Tracing e DLSS/FSR'],
    tip: 'Fixe os parafusos no gabinete traseiro para evitar empenamento do slot PCIe devido ao peso da GPU.',
    caution: 'Conecte o cabo HDMI/DisplayPort NA GPU e não na placa-mãe para ter sinal de vídeo dedicado!',
  },
  ssd: {
    id: 'ssd',
    name: 'SSD M.2 NVMe PCIe 4.0/5.0',
    category: 'Armazenamento Ultrarrápido',
    specs: ['2 TB de capacidade', 'Leitura: 7.300 MB/s', 'Gravação: 6.800 MB/s', 'Formato 2280'],
    tip: 'Insira no slot M.2 em um ângulo de ~30 graus e depois empurre suavemente para baixo antes de parafusar.',
    caution: 'Remova a película plástica azul do pad térmico da placa-mãe antes de fechar o dissipador.',
  },
  motherboard: {
    id: 'motherboard',
    name: 'Placa-Mãe ATX Chipset Flagship',
    category: 'Circuito Central & Barramentos',
    specs: ['Socket LGA1700 / AM5', '4x DDR5 Slots', 'PCIe 5.0 x16 Slot', 'VRM 16+1+2 Fases Digitais'],
    tip: 'Certifique-se de que a quantidade de suportes dourados (standoffs) no gabinete corresponde exatamente aos furos da placa.',
    caution: 'Coloque a placa sobre sua própria caixa de papelão durante a pré-montagem, nunca sobre o plástico antiestático externo.',
  },
  psu: {
    id: 'psu',
    name: 'Fonte de Alimentação 850W Gold',
    category: 'Alimentação Elétrica',
    specs: ['850W 80 Plus Gold Modular', 'Capacitores 100% Japoneses 105°C', 'ATX 3.0 Ready', 'Cabos sleeved pretos'],
    tip: 'Instale com a ventoinha virada para baixo no gabinete para puxar ar fresco de fora e expelir pelo fundo.',
    caution: 'Use exclusivamente os cabos modulares originais que acompanham a fonte; cabos de outras marcas queimam componentes!',
  },
};

export const Hardware3DView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [explodedFactor, setExplodedFactor] = useState(0);
  const [selectedPartKey, setSelectedPartKey] = useState<string>('cpu');
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'guia'>('3d');

  // References for 3D objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const partsGroupRef = useRef<Record<string, THREE.Group | THREE.Mesh>>({});
  const fansRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = 480;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.5, 3.8, 5.0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 1.2, 0);
    controls.minDistance = 2.0;
    controls.maxDistance = 12.0;
    controlsRef.current = controls;

    // Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x06b6d4, 3.5, 8);
    cyanRim.position.set(-3, 2, 2);
    scene.add(cyanRim);

    const indigoRim = new THREE.PointLight(0x6366f1, 3.0, 8);
    indigoRim.position.set(3, 3, -3);
    scene.add(indigoRim);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Mirror floor
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x070a12, roughness: 0.9, metalness: 0.1 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid helper
    const gridHelper = new THREE.GridHelper(16, 16, 0x1e293b, 0x0f172a);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Build PC Assembly
    const parts: Record<string, THREE.Group | THREE.Mesh> = {};
    const fans: THREE.Mesh[] = [];

    // 1. Motherboard
    const mbGroup = new THREE.Group();
    const mbGeo = new THREE.BoxGeometry(2.4, 0.08, 3.0);
    const mbMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, metalness: 0.3 });
    const mbMesh = new THREE.Mesh(mbGeo, mbMat);
    mbMesh.castShadow = true;
    mbGroup.add(mbMesh);

    // VRM Heatsinks
    const vrmGeo = new THREE.BoxGeometry(0.35, 0.4, 1.4);
    const vrmMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 });
    const vrm1 = new THREE.Mesh(vrmGeo, vrmMat);
    vrm1.position.set(-0.9, 0.22, -0.4);
    mbGroup.add(vrm1);

    const vrm2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.35, 0.3), vrmMat);
    vrm2.position.set(-0.2, 0.2, -1.2);
    mbGroup.add(vrm2);

    mbGroup.position.set(0, 1.2, 0);
    rootGroup.add(mbGroup);
    parts.motherboard = mbGroup;

    // 2. CPU
    const cpuGroup = new THREE.Group();
    const cpuGeo = new THREE.BoxGeometry(0.75, 0.06, 0.75);
    const cpuMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, roughness: 0.2, metalness: 0.9 });
    const cpuMesh = new THREE.Mesh(cpuGeo, cpuMat);
    cpuGroup.add(cpuMesh);
    cpuGroup.position.set(-0.2, 1.27, -0.2);
    rootGroup.add(cpuGroup);
    parts.cpu = cpuGroup;

    // 3. Water Cooler
    const coolerGroup = new THREE.Group();
    // Pump block
    const pumpGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 32);
    const pumpMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3, metalness: 0.7 });
    const pumpMesh = new THREE.Mesh(pumpGeo, pumpMat);
    pumpMesh.position.set(-0.2, 1.48, -0.2);
    coolerGroup.add(pumpMesh);

    // Glowing ring
    const ringGeo = new THREE.TorusGeometry(0.36, 0.04, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(-0.2, 1.65, -0.2);
    coolerGroup.add(ring);

    // Radiator
    const radGeo = new THREE.BoxGeometry(2.3, 0.18, 1.0);
    const radMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 });
    const rad = new THREE.Mesh(radGeo, radMat);
    rad.position.set(0, 2.7, -0.3);
    coolerGroup.add(rad);

    // Radiator Fans
    for (let i = -1; i <= 1; i += 2) {
      const fanGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 16);
      const fanMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.4, roughness: 0.4 });
      const fan = new THREE.Mesh(fanGeo, fanMat);
      fan.rotation.x = Math.PI / 2;
      fan.position.set(i * 0.6, 2.56, -0.3);
      coolerGroup.add(fan);
      fans.push(fan);
    }

    rootGroup.add(coolerGroup);
    parts.cooler = coolerGroup;

    // 4. RAM
    const ramGroup = new THREE.Group();
    for (let i = 0; i < 2; i++) {
      const ramGeo = new THREE.BoxGeometry(0.08, 0.55, 1.15);
      const ramMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.5, roughness: 0.3 });
      const ram = new THREE.Mesh(ramGeo, ramMat);
      ram.position.set(0.42 + i * 0.18, 1.5, -0.2);
      ramGroup.add(ram);
    }
    rootGroup.add(ramGroup);
    parts.ram = ramGroup;

    // 5. GPU
    const gpuGroup = new THREE.Group();
    const gpuGeo = new THREE.BoxGeometry(1.0, 0.55, 2.6);
    const gpuMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4, metalness: 0.8 });
    const gpuMesh = new THREE.Mesh(gpuGeo, gpuMat);
    gpuGroup.add(gpuMesh);

    // GPU Fans
    for (let i = -1; i <= 1; i++) {
      const gFanGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 16);
      const gFanMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.3 });
      const gFan = new THREE.Mesh(gFanGeo, gFanMat);
      gFan.rotation.z = Math.PI / 2;
      gFan.position.set(-0.53, 0.0, i * 0.75);
      gpuGroup.add(gFan);
      fans.push(gFan);
    }

    gpuGroup.position.set(-0.5, 0.75, 0.3);
    rootGroup.add(gpuGroup);
    parts.gpu = gpuGroup;

    // 6. SSD M.2 NVMe
    const ssdGroup = new THREE.Group();
    const ssdGeo = new THREE.BoxGeometry(0.28, 0.04, 0.85);
    const ssdMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4, metalness: 0.7 });
    const ssdMesh = new THREE.Mesh(ssdGeo, ssdMat);
    ssdGroup.add(ssdMesh);
    ssdGroup.position.set(0.25, 1.27, 0.5);
    rootGroup.add(ssdGroup);
    parts.ssd = ssdGroup;

    // 7. PSU
    const psuGroup = new THREE.Group();
    const psuGeo = new THREE.BoxGeometry(1.5, 0.9, 1.6);
    const psuMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6, metalness: 0.5 });
    const psuMesh = new THREE.Mesh(psuGeo, psuMat);
    psuGroup.add(psuMesh);
    psuGroup.position.set(0, 0.45, -0.6);
    rootGroup.add(psuGroup);
    parts.psu = psuGroup;

    partsGroupRef.current = parts;
    fansRef.current = fans;

    // Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Spin fans
      fans.forEach(f => {
        f.rotation.y += 0.08;
      });

      // Auto rotation
      if (controls.autoRotate) {
        controls.update();
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  // Update controls auto-rotation
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 1.2;
    }
  }, [autoRotate]);

  // Update wireframe
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.traverse(obj => {
      if (obj instanceof THREE.Mesh && obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => (m.wireframe = wireframe));
        } else {
          obj.material.wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Exploded View transforms
  useEffect(() => {
    const parts = partsGroupRef.current;
    if (!parts.cooler || !parts.gpu || !parts.ram || !parts.ssd || !parts.cpu) return;

    const t = explodedFactor / 100;

    // Cooler lifts upwards
    parts.cooler.position.y = t * 1.4;

    // GPU drops and slides outward
    parts.gpu.position.x = -0.5 - t * 1.2;
    parts.gpu.position.y = 0.75 - t * 0.4;

    // RAM lifts up
    parts.ram.position.y = t * 0.8;

    // CPU lifts
    parts.cpu.position.y = 1.27 + t * 0.4;

    // SSD lifts slightly
    parts.ssd.position.y = 1.27 + t * 0.3;
    parts.ssd.position.z = 0.5 + t * 0.4;
  }, [explodedFactor]);

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(4.5, 3.8, 5.0);
      controlsRef.current.target.set(0, 1.2, 0);
      setExplodedFactor(0);
    }
  };

  const selectedPart = HARDWARE_PARTS[selectedPartKey] || HARDWARE_PARTS.cpu;
  const pcGuide = TECHLAB_DATA.guias[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span>Laboratório Interativo de Arquitetura de Computadores</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Estação 3D: PC Gamer & Hardware Desmontável
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Gire, aproxime, aplique visão explodida e inspecione componentes físicos, sockets e barramentos PCIe.
          </p>
        </div>

        {/* Tab switch: 3D Viewport vs Guia de Montagem */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === '3d'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulador 3D</span>
          </button>
          <button
            onClick={() => setActiveTab('guia')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'guia'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Guia Passo a Passo</span>
          </button>
        </div>
      </div>

      {activeTab === '3d' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3D Viewport Column */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
              <div ref={containerRef} className="w-full h-[480px] cursor-grab active:cursor-grabbing" />

              {/* Floating Controls Overlay */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs text-white">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono">WebGL High-Performance</span>
                </div>

                <div className="pointer-events-auto flex items-center gap-1.5">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md border transition-colors ${
                      autoRotate
                        ? 'bg-indigo-600/90 text-white border-indigo-500'
                        : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{autoRotate ? 'Giro Ativo' : 'Giro Pausado'}</span>
                  </button>

                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md border transition-colors ${
                      wireframe
                        ? 'bg-cyan-600/90 text-white border-cyan-500'
                        : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Raio-X</span>
                  </button>

                  <button
                    onClick={resetCamera}
                    className="p-1.5 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-700 hover:bg-slate-800 backdrop-blur-md transition-colors"
                    title="Resetar Câmera"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Exploded View Slider Dock */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                  <div className="text-xs font-medium text-slate-300 whitespace-nowrap">
                    Visão Explodida:
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={explodedFactor}
                    onChange={e => setExplodedFactor(parseInt(e.target.value, 10))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <span className="font-mono text-xs text-indigo-400 font-bold min-w-10">
                    {explodedFactor}%
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 hidden sm:block">
                  Arraste com o mouse para orbitar · Role para zoom
                </div>
              </div>
            </div>

            {/* Quick Part Selection Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
              {Object.keys(HARDWARE_PARTS).map(key => {
                const part = HARDWARE_PARTS[key];
                const active = selectedPartKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPartKey(key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors border ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-2xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {part.name.split(' (')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Part Inspection Details Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  {selectedPart.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedPart.name}
                </h3>
              </div>

              {/* Specs List */}
              <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Especificações Técnicas
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {selectedPart.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-mono text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Installation Tip */}
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Dica de Ouro de Instalação:</span>
                </div>
                <p className="leading-relaxed pl-5">{selectedPart.tip}</p>
              </div>

              {/* Caution Warning */}
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Atenção & Cuidado Crítico:</span>
                </div>
                <p className="leading-relaxed pl-5">{selectedPart.caution}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Guia Passo a Passo de Montagem */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {pcGuide.titulo}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {pcGuide.subtitulo} · {pcGuide.duracao}
            </p>
          </div>

          <div className="space-y-6">
            {pcGuide.passos.map(passo => (
              <div
                key={passo.numero}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {passo.numero}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {passo.titulo}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {passo.conteudo}
                </p>

                {passo.dica && (
                  <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 font-medium">
                    💡 {passo.dica}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
