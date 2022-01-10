import React from "react";
import "./App.scss";

import { useSpring, animated } from "@react-spring/web";
//Components
import Header from "./components/header";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px)  rotateY(${y / 2}deg) scale(${s / 2})`;

export default function SpringPage() {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <>
      <Header />
      <div className="container">
        <animated.div
          className="card"
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.to(trans) }}
        ></animated.div>
      </div>
    </>
  );
}
