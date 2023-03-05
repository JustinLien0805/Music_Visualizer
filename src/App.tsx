import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Visualizer from "./components/Visualizer";
import { OrbitControls } from "@react-three/drei";
import { AudioAnalyzer } from "./lib/audio";
import Wave from "./components/Wave";
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";
import { Vector2 } from "three";

function App() {
  const [analyzer, setAnalyzer] = useState<AudioAnalyzer | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioElmRef = useRef<HTMLAudioElement>(null!);
  const [fileName, setFileName] = useState<String | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setAudioUrl(url);
    setAnalyzer(new AudioAnalyzer(audioElmRef.current));
  };

  return (
    <div className="bg-white w-screen h-screen">
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#131313",
        }}
      >
        <ambientLight />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            intensity={1}
          />
          <Glitch
            delay={new Vector2(0.5, 2)}
            duration={new Vector2(0.1, 0.2)}
            active={isPlaying}
          />
        </EffectComposer>
        <Wave />
        {analyzer && (
          <Visualizer
            analyzer={analyzer}
            color={0x34ebcc}
            lineWidth={0.03}
            segments={300}
            radius={1.5}
          />
        )}
      </Canvas>
      <h1 className="absolute top-[80px] left-1/2 -translate-x-1/2 font-outline text-center">
        {fileName}
      </h1>
      <div className="w-full flex justify-center items-center absolute bottom-0 text-[#34ebcc] h-[80px] px-4">
        <input type="file" accept="audio/*" onChange={onFileChange} />
        <audio
          controls
          ref={audioElmRef}
          src={audioUrl ?? undefined}
          onPlay={() => {
            setIsPlaying(true);
          }}
          onPause={() => {
            setIsPlaying(false);
          }}
        />
      </div>
    </div>
  );
}

export default App;
