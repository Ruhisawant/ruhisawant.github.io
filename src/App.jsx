import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import React from "react";
import { Scene } from "./components/Scene";
import { PageNavigation } from "./components/PageNavigation";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Canvas error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-white text-center py-20">Error loading 3D content</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <>
      <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover -z-10" >
        <source src="/background/background-video.mp4" type="video/mp4" />
      </video>
      <PageNavigation />
      <Loader />
      <ErrorBoundary>
        <Canvas shadows="percentage" camera={{ position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9], fov: 45 }}>
          <group position-y={0}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </group>
        </Canvas>
      </ErrorBoundary>
    </>
  );
}

export default App;