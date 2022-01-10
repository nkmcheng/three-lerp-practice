import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">
          <Link to="/">THREE.TEST</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/spring">Spring</Link>
            </li>
            <li>
              <Link to="/spring-2">Spring Two</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
