// import particlesConfig from "../components/config/particles-config";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
export default function ParticleBackground() {

    const particlesInit = async (main) => {
        console.log(main);
        await loadFull(main);
    };

    const particlesLoaded = (container) => {
        // console.log(container);
    };

    return (
        <Particles init={particlesInit} loaded={particlesLoaded}  options={{
         
            
                "fullScreen": {
                    "enable": true,
                    "zIndex": -1
                },
                "particles": {
                    "number": {
                        "value": 8,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                          },
                    },
                    "shape": {
                        "type": "circle",
                        "polygon": {
                            "nb_sides": 5
                          },
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": {
                            "enable": true,
                            "minimumValue": 0.3
                        },
                        "anim": {
                            "enable": false,
                            "speed": 2,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 60,
                        "random": {
                            "enable": true,
                            "minimumValue": 100
                        },
                        "anim": {
                            "enable": false,
                            "speed": 5,
                            "size_min": 40,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false,
                        "distance": 200,
                        "color": "#ffffff",
                        "opacity": 0.8,
                        "width": 2
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
             
                "retina_detect": true,
                "background": {
                    "color":"rgb(2,0,36)",
                    "image": "linear-gradient(90deg,  #8fc3f7 0.5%, #8fc3f7 100%, #ffffff 100%)",
                    "position": "50% 50%",
                    "repeat": "no-repeat",
                    "size": "cover"
                }
            
            
        }}>
          
        </Particles>
    )
}



