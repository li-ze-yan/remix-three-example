import {
  Html,
  OrbitControls,
  Preload,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { V2_MetaFunction } from "@remix-run/react";
import { Suspense } from "react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

const Computers = () => {
  const computer = useGLTF("/axe/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

export default function Index() {
  const { progress } = useProgress();
  // const RemixBridge = useRemixBridge();
  return (
    <div style={{ width: 800, height: 800 }}>
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense
          fallback={
            <Html
              as="div"
              center
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span className="canvas-loader"></span>
              <p
                style={{
                  fontSize: 14,
                  color: "#F1F1F1",
                  fontWeight: 800,
                  marginTop: 40,
                }}
              >
                {progress.toFixed(2)}%
              </p>
            </Html>
          }
        >
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          {/* <RemixBridge> */}
          <Computers />
          {/* </RemixBridge> */}
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}
