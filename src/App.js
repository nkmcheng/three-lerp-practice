import React, { Suspense, useRef, useEffect } from "react";
import "./App.scss";
//Components
import Header from "./components/header";
import { Section } from "./components/section";
import { Canvas, useFrame } from "@react-three/fiber";

import { Html, useGLTF, useAnimations } from "@react-three/drei";

// page states
import state from "./components/state";

// intersection observer

import { useInView } from "react-intersection-observer";

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);

  const animate = useAnimations(gltf.animations, gltf.scene);
  useEffect(() => {
    const actionName = animate.names[0];
    console.log("gltf animations", animate.actions[actionName]);
    // actions?.jump.play()
    // if (actions["mixamo.com"]) {
    //   actions["mixamo.com"].play();
    // }
    animate.actions[actionName].play();
  });

  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  );
};

const HtmlContent = ({
  bgColor,
  domContent,
  children,
  modelPath,
  positionY,
  scale,
  meshPositionY,
}) => {
  const ref = useRef();

  useFrame(() => (ref.current.rotation.y += 0.01));
  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView, bgColor]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, meshPositionY, 0]} scale={scale}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HtmlContent
            domContent={domContent}
            modelPath="/model2.gltf"
            positionY={260}
            bgColor={"#D9534F"}
            scale={[0.55, 0.55, 0.55]}
            meshPositionY={50}
          >
            <div className="container">
              <h1 className="title">Hello</h1>
            </div>
          </HtmlContent>
          <HtmlContent
            domContent={domContent}
            modelPath="/model9.gltf"
            positionY={20}
            bgColor={"#B762C1"}
            scale={[0.5, 0.5, 0.5]}
            meshPositionY={-50}
          >
            <div className="container">
              <h1 className="title">World</h1>
            </div>
          </HtmlContent>
          <HtmlContent
            domContent={domContent}
            modelPath="/model8.gltf"
            positionY={-240}
            bgColor={"#F9C5D5"}
            scale={[9, 9, 9]}
            meshPositionY={-40}
          >
            <div className="container">
              <h1 className="title">Bye</h1>
            </div>
          </HtmlContent>
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div className="div"></div>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </>
  );
}
