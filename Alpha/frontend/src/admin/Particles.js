import React, { Component } from "react";
import Particles from "react-particles-js";

class Canvas extends Component {
 state={
   height : this.props.height
 }
  render() {
   
    return (
      <Particles
        {...this.state}
        params={{
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 500
              }
            },
            color: {
              value: "#415076"
            },
            shape: {
              type: "circle",
              stroke: {
                width: 5,
                color: "#262626"
              }
            //   image: {
            //     src: "img/github.svg",
            //     width: 100,
            //     height: 100
            //   }
            },
            opacity: {
              value: 0.4,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable_auto: true,
              distance: 100,
              color: "#415076",
              opacity: 1,
              width: 1,
              condensed_mode: {
                enable: false,
                rotateX: 700,
                rotateY: 600
              }
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: false
              },
              onclick: {
                enable: false
              },
              
            }
          },
          retina_detect: true
        }}
      />
    );
  }
}

export default Canvas;