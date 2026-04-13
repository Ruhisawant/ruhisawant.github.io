import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Scene } from "./components/Scene";
import { PageNavigation } from "./components/PageNavigation";
import { LogoMenuBar } from "./components/LogoMenuBar";
import { StaticContentPage } from "./components/StaticContentPage";
import { PageBubbles } from "./components/PageBubbles";

function getHashRoute() {
  if (typeof window === "undefined") {
    return "/";
  }

  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
}

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
  const [route, setRoute] = useState(getHashRoute);

  useEffect(() => {
    const updateRoute = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  const isBookRoute = route === "/";

  return (
    <>
      <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover -z-10" >
        <source src="/background/background-video.mp4" type="video/mp4" />
      </video>

      {isBookRoute ? (
        <>
          <PageNavigation />
          <PageBubbles />
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
      ) : (
        <>
          <main className="fixed inset-0 z-20 pointer-events-none select-none flex justify-between flex-col">
            <LogoMenuBar />
          </main>
          <StaticContentPage route={route} />
        </>
      )}
    </>
  );
}

export default App;