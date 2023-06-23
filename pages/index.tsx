import { Parallax, ParallaxBanner, ParallaxBannerLayer, ParallaxProvider, useParallax } from 'react-scroll-parallax';
import React, { useEffect, useRef, useState } from "react";

import About from "@/components/About";
import Apply_Button from "@/components/Apply_Button";
import Contact from "./contact";
import Cover from '@/components/Cover';
import { Events } from "react-scroll";
import Faq from "@/components/Faq";
import Logo from '@/components/Logo';
import MLH_Trust from "../components/MLH_Trust";
import Mobile_Cover from '@/components/Mobile_Cover';
import MuteButton from "@/components/Mute_Button";
import OurTeam from "@/components/ourteam";
import Prizes from "@/components/Prizes";
import { SliderButton } from "@typeform/embed-react";
import Sponsors from "@/components/Sponsors";
import Tracks from '@/components/Tracks';
import dynamic from "next/dynamic";
import useSound from 'use-sound';

const Rain = dynamic(() => import("../components/rain"), { ssr: false });
const NavBar = dynamic(() => import("../components/NavBar"), { ssr: true });

export default function Home() {
  const [bgImageScale, setBgImageScale] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [rainZIndex, setRainZIndex] = useState(2);
  const [bgZIndex, setBgZIndex] = useState(2);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const pages = ["register", "about", "sponsors", "prizes", "faq", "contact"];

  const [hideButton, setHideButton] = useState(true);
  const [hideName, setHideName] = useState(true);
  const [hideTheme, sethideTheme] = useState(true);

  const [play, { stop, pause }] = useSound('/static/sounds/cyberpunk_cut.mp3');
  const [startRain, setStartRain] = useState(false);

  const [disrupt, startDisrupt] = useState(false);
  const [scrollDisabled, setScrollDisabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollPosition = window.scrollY;
        const newScale = Math.max(0.1, 1 - scrollPosition / 1000);
        setBgImageScale(newScale);
        if (scrollPosition > 300) {
          setRainZIndex(0);
          setBgZIndex(1);
        } else {
          setRainZIndex(1);
          setBgZIndex(0);
        }
      }
    };

    Events.scrollEvent.register("begin", handleScroll);
    Events.scrollEvent.register("end", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = scrollDisabled ? "auto" : "hidden";
    const handleScroll = () => { };

    Events.scrollEvent.register("begin", handleScroll);
    Events.scrollEvent.register("end", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
      window.removeEventListener("scroll", handleScroll);
    };

  }, [scrollDisabled]);

  if (disrupt) {
    var backgroundImage = "background_city"
  } else {
    var backgroundImage = "background_cute"
  }


  const handleClick = async () => {
    play();

    setPlaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setStartRain(true);

    await new Promise((resolve) => setTimeout(resolve, 2650));
    setHideButton(false);

    await new Promise((resolve) => setTimeout(resolve, 2650));
    setHideName(false);

    await new Promise((resolve) => setTimeout(resolve, 2650));
    sethideTheme(false);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    startDisrupt(true);

    setScrollDisabled(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center main-container">

      {/* <RSP pages={6}>
        <ParallaxLayer offset={0} factor={2}>
          hi
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.8} sticky={{ start: 1.5, end: 2.5 }}>
          <About />
        </ParallaxLayer>
      </RSP> */}
      {/* <ParallaxProvider>
        <Parallax scale={[0.5, 1]} className='h-screen'>
          <About />
        </Parallax>
        
        <Parallax scale={[0.5, 1.5]} className='h-screen'>
          <Prizes />
        </Parallax>
        <Parallax scale={[0.5, 1.5]} className='mb-48'>
          <Sponsors />
        </Parallax>
        <Parallax scale={[0.5, 1.5]} className='h-screen'>
          <Faq />
        </Parallax>
        <Parallax scale={[0.5, 1.5]} className='h-screen'>
          <Contact />
        </Parallax>
        
        <Parallax scale={[0.5, 1]} className='h-screen'>
          <OurTeam />
        </Parallax>

        <Parallax scale={[0.5, 1]}>
          <Sponsors />
        </Parallax>
        <Parallax scale={[0.5, 1]}>
          <Faq />
        </Parallax>

      </ParallaxProvider> */}

      {/* <SliderButton
        id={"oNcQNjvg"}
        width={5000}
      >
        <Disrupt_Reality_Button />
      </SliderButton> */}
      <Logo />


      <Cover />
      <Mobile_Cover />

      {/* <Apply_Button /> */}
      <About />
      <Tracks />
      <Sponsors />
      <Faq />
      <Apply_Button glitch={true} />
      <Contact />
      <OurTeam />
    </div >
    // <>
    //   <div
    //     className={backgroundImage}
    //     ref={backgroundRef}
    //   // style={{
    //   //   zIndex: bgZIndex,
    //   //   transform: `scale(${bgImageScale})`,
    //   //   transition: "transform 0.5s ease",
    //   // }}
    //   />

    //   {startRain && (
    //     <div
    //       className="rain-layer"
    //       style={{
    //         zIndex: rainZIndex,
    //       }}
    //     >
    //       <Rain />
    //     </div>
    //   )}

    //   <main className="flex min-h-screen flex-col items-center p-24 main-container">
    //     {disrupt && (<button onClick={() => {
    //       if (playing) {
    //         pause();
    //         setPlaying(false);
    //       }
    //       else {
    //         play();
    //         setPlaying(true);
    //       }
    //     }}>
    //       <MuteButton />
    //     </button>)}
    //     {disrupt && (<MLH_Trust />)}

    //     {hideName && (
    //       <h1 className={`mt-36 text-center ${disrupt ? 'font-RubikGlitch text-7xl sm:text-8xl md:text-9xl' : 'font-Chalkduster text-7xl sm:text-8xl'}`}>Hack Dearborn2</h1>
    //     )}
    //     {!hideName && (
    //       <h1 className="d3">Hack Dearborn2</h1>
    //     )}

    //     <div className="relative">
    //       {!hideTheme && <h3 className="d4">Disrupt Reality</h3>}

    //       <div className="flex justify-center gap-4">
    //         {disrupt && (
    //           <button
    //             className="py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700"
    //             onClick={async () => {
    //               stop();
    //               setStartRain(false);
    //               startDisrupt(false);
    //               setScrollDisabled(false);
    //             }}
    //           >
    //             Back to Reality
    //           </button>
    //         )}
    //       </div>
    //       {hideTheme && !disrupt && (
    //         <h5 className="font-Papyrus text-5xl sm:text-7xl">10.22.2023</h5>
    //       )}
    //     </div>



    //     {disrupt && (<div className="down-arrow"></div>)}

    //     {!disrupt && hideButton && <div><button
    //       onClick={handleClick}
    //       ref={glitch.ref}
    //     >
    //       <Disrupt_Reality_Button />

    //     </button></div>}

    //     {disrupt && (
    //       <>
    //         <About />
    //         <Prizes />
    //         <Sponsors />
    //         <Faq />
    //         <Contact />
    //         <OurTeam />
    //       </>
    //     )}
    //   </main>
    // </>
  );
}