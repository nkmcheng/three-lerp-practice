import React from "react";
import "./styles.css";
import { useSpring, a } from "@react-spring/web";

//Components
import Header from "./components/header";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 240}px,${y / 240}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 180}px,${y / 180}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 160}px,${y / 160}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 120}px,${y / 120}px,0)`;
const trans5 = (x, y) => `translate3d(${x / 100}px,${y / 100}px,0)`;
const trans6 = (x, y) => `translate3d(${x / 120}px,${y / 120}px,0)`;
const trans7 = (x, y) => `translate3d(${x / 100}px,${y / 130}px,0)`;

export default function SpringTwoPage() {
  const [props, set] = useSpring(() => ({ xy: [0, 0] }));
  return (
    <>
      <Header />
      <div
        className="main"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      >
        <div class="ground" />
        <a.div class="clouds-left" style={{ transform: props.xy.to(trans2) }} />
        <a.div
          class="clouds-right"
          style={{ transform: props.xy.to(trans2) }}
        />
        <a.div class="clouds" style={{ transform: props.xy.to(trans2) }} />
        <a.div class="code" style={{ transform: props.xy.interpolate(trans1) }}>
          <div class="code-container">
            <h1>Spring MouseMove</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </a.div>
        <a.div class="chibi1" style={{ transform: props.xy.to(trans4) }} />
        <a.div class="chibi3" style={{ transform: props.xy.to(trans5) }} />
        <a.div class="chibi4" style={{ transform: props.xy.to(trans6) }} />
        <a.div class="chibi5" style={{ transform: props.xy.to(trans3) }} />
        <a.div class="chibi6" style={{ transform: props.xy.to(trans7) }} />
      </div>
    </>
  );
}
