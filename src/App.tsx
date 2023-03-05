import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Visualizer from "./components/Visualizer";
import { AudioAnalyzer } from "./lib/audio";
function App() {
  const [analyzer, setAnalyzer] = useState<AudioAnalyzer | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioElmRef = useRef<HTMLAudioElement>(null!);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setAnalyzer(new AudioAnalyzer(audioElmRef.current));
  };

  return (
    <div className="bg-white w-screen h-screen">
      <Canvas
        style={{
          width: "100vw",
          height: "calc(100vh - 80px)",
          backgroundColor: "#131313",
        }}
      >
        {analyzer && (
          <Visualizer analyzer={analyzer} color={0x34ebcc} lineWidth={0.05} />
        )}
      </Canvas>
      <div className="w-full flex justify-center items-center h-[80px] px-4">
        <input type="file" accept="audio/*" onChange={onFileChange} />
        <audio controls ref={audioElmRef} src={audioUrl ?? undefined} />
      </div>
    </div>
  );
}

export default App;
