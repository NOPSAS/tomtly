'use client'

import { useEffect, useRef, useState } from 'react'
import { Maximize2, RotateCcw } from 'lucide-react'

interface TerrengData {
  cols: number
  rows: number
  opplosning: number
  bbox: number[]
  dtm: { z: number }[]
  dom: { z: number }[]
}

interface Props {
  terrengData: TerrengData
  teigCoords?: number[][] // UTM25833 polygon coords
}

export function Terreng3D({ terrengData, teigCoords }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const rendererRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current || loaded) return

    async function init() {
      try {
        const THREE = await import('three')
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')

        const container = containerRef.current!
        const { cols, rows, dtm, dom, bbox, opplosning } = terrengData
        const [minX, minY, maxX, maxY] = bbox

        const sizeX = maxX - minX
        const sizeY = maxY - minY

        // Scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf5f0e8) // tomtly-warm

        // Camera
        const aspect = container.clientWidth / container.clientHeight
        const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 10000)

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05

        // Find height range
        const heights = dtm.map(p => p.z).filter(z => z > 0)
        const minH = Math.min(...heights)
        const maxH = Math.max(...heights)
        const hRange = maxH - minH || 1

        // Terrain mesh
        const geometry = new THREE.PlaneGeometry(sizeX, sizeY, cols - 1, rows - 1)
        const vertices = geometry.attributes.position.array as Float32Array

        for (let i = 0; i < Math.min(dtm.length, vertices.length / 3); i++) {
          vertices[i * 3 + 2] = (dtm[i].z - minH) * 2 // Exaggerate height 2x
        }
        geometry.computeVertexNormals()

        // Color terrain by height
        const colors = new Float32Array(vertices.length)
        for (let i = 0; i < Math.min(dtm.length, vertices.length / 3); i++) {
          const norm = (dtm[i].z - minH) / hRange
          colors[i * 3] = 0.2 + norm * 0.5     // R
          colors[i * 3 + 1] = 0.55 - norm * 0.2 // G
          colors[i * 3 + 2] = 0.15               // B
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const material = new THREE.MeshPhongMaterial({
          vertexColors: true,
          side: THREE.DoubleSide,
          flatShading: true,
        })

        const terrain = new THREE.Mesh(geometry, material)
        terrain.rotation.x = -Math.PI / 2
        scene.add(terrain)

        // Buildings (DOM - DTM > 2.5m = building, > 1m and < 2.5m might be low structures)
        for (let i = 0; i < Math.min(dtm.length, dom.length); i++) {
          const diff = dom[i].z - dtm[i].z
          if (diff > 2.5) {
            const col = i % cols
            const row = Math.floor(i / cols)

            const boxH = diff * 2 // Same exaggeration
            const boxGeo = new THREE.BoxGeometry(opplosning * 0.7, boxH, opplosning * 0.7)
            const isTree = diff < 6 && diff > 2.5
            const boxMat = new THREE.MeshPhongMaterial({
              color: isTree ? 0x2d5a3d : 0x888888, // tomtly-accent for trees, gray for buildings
              transparent: true,
              opacity: 0.85,
            })
            const mesh = new THREE.Mesh(boxGeo, boxMat)

            const x = (col - cols / 2) * opplosning
            const z = (row - rows / 2) * opplosning
            const y = (dtm[i].z - minH) * 2 + boxH / 2

            mesh.position.set(x, y, z)
            scene.add(mesh)
          }
        }

        // Property boundary line
        if (teigCoords && teigCoords.length > 2) {
          const centerX = (minX + maxX) / 2
          const centerY = (minY + maxY) / 2

          const linePoints: any[] = teigCoords.map(coord => {
            const x = coord[0] - centerX
            const z = coord[1] - centerY

            // Find approximate height at this point
            const col = Math.round((coord[0] - minX) / opplosning)
            const row = Math.round((coord[1] - minY) / opplosning)
            const idx = row * cols + col
            const h = idx >= 0 && idx < dtm.length ? (dtm[idx].z - minH) * 2 + 1 : 1

            return new THREE.Vector3(x, h, z)
          })

          const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
          const lineMat = new THREE.LineBasicMaterial({ color: 0xff4444, linewidth: 2 })
          const line = new THREE.Line(lineGeo, lineMat)
          scene.add(line)
        }

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 0.5))
        const sun = new THREE.DirectionalLight(0xffffff, 0.8)
        sun.position.set(sizeX, sizeX, sizeX * 0.5)
        scene.add(sun)

        // Camera position
        const maxSize = Math.max(sizeX, sizeY)
        camera.position.set(maxSize * 0.6, maxSize * 0.5, maxSize * 0.6)
        controls.target.set(0, 0, 0)
        camera.lookAt(0, 0, 0)

        // Animate
        function animate() {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        // Resize handler
        const onResize = () => {
          if (!container) return
          camera.aspect = container.clientWidth / container.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(container.clientWidth, container.clientHeight)
        }
        window.addEventListener('resize', onResize)

        setLoaded(true)

        return () => {
          window.removeEventListener('resize', onResize)
          renderer.dispose()
        }
      } catch (err: any) {
        setError(err.message || 'Kunne ikke laste 3D-visning')
      }
    }

    init()
  }, [terrengData, teigCoords, loaded])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full aspect-[16/10] bg-tomtly-warm rounded-lg overflow-hidden"
        style={{ touchAction: 'none' }}
      />
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-tomtly-warm rounded-lg">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-tomtly-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-brand-500">Bygger 3D-modell...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}
      {loaded && (
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => {
              const el = containerRef.current
              if (el) el.requestFullscreen?.()
            }}
            className="p-2 bg-white/90 rounded-lg shadow hover:bg-white transition-colors"
            title="Fullskjerm"
          >
            <Maximize2 className="w-4 h-4 text-brand-600" />
          </button>
        </div>
      )}
      <p className="text-[10px] text-brand-400 mt-2">
        Terrengdata: Kartverket DTM1/DOM1 (1m oppløsning). Grå = bygninger, grønn = trær. Rødt = eiendomsgrense. Bruk mus/touch for å rotere.
      </p>
    </div>
  )
}
