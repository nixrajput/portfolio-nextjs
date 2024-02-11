"use client";

import { Component } from "react";
import anime from "animejs/lib/anime.es.js";
import type { ShootingStarProps } from "@/types";

class ShootingStarEffect extends Component<{}, ShootingStarProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      vw: 0,
      vh: 0,
    };
  }

  starryNight = () => {
    anime({
      targets: ["#sky .star"],
      opacity: [
        {
          duration: 700,
          value: "0",
        },
        {
          duration: 700,
          value: "1",
        },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => 50 * i,
    });
  };

  shootingStars = () => {
    anime({
      targets: ["#shootingstars .wish"],
      easing: "linear",
      loop: true,
      delay: (el, i) => 1000 * i,
      opacity: [
        {
          duration: 700,
          value: "1",
        },
      ],
      width: [{ value: "10rem" }, { value: "0" }],
      translateX: 350,
    });
  };

  randomRadius = () => Math.random() * 0.7 + 0.6;

  getRandomX = () => {
    return Math.floor(Math.random() * Math.floor(this.state.vw)).toString();
  };

  getRandomY = () => {
    return Math.floor(Math.random() * Math.floor(this.state.vh)).toString();
  };

  updateWindowDimensions = () => {
    this.setState({
      vw: Math.max(document.documentElement.clientWidth, window.innerWidth),
      vh: Math.max(document.documentElement.clientHeight, window.innerHeight),
    });
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    this.starryNight();
    this.shootingStars();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    return (
      <div className="w-full h-full absolute overflow-hidden m-0 p-0">
        <svg id="sky">
          {[...Array(60)].map((x, y) => (
            <circle
              cx={this.getRandomX()}
              cy={this.getRandomY()}
              r={this.randomRadius()}
              stroke="none"
              strokeWidth="0"
              fill="white"
              key={y}
              className="star"
            />
          ))}
        </svg>

        <div id="shootingstars">
          {[...Array(60)].map((x, y) => (
            <div
              key={y}
              className="wish"
              style={{
                left: `${this.getRandomY()}px`,
                top: `${this.getRandomX()}px`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ShootingStarEffect;
