import '../sass/main.scss';
import Body from '../components/Ghost/Body';
import React, { useState, useEffect, useRef } from 'react';
import { TweenMax, Power3, Power2, Power4, Back, TimelineMax, Elastic, Power1 } from 'gsap';


const peek = new TimelineMax({ paused: true, restart: false, reversed: true });
const eyesShift = new TimelineMax({ paused: true, restart: false });
const hover = new TimelineMax({ repeat: -1 });
const bounce = new TimelineMax({ paused: true, restart: false });
const boo = new TimelineMax({ paused: true, restart: false, reversed: true });
const spiderFall = new TimelineMax({ paused: true, reversed: false });



const Home = () => {
  const [sayBoo, setBoo] = useState(false);

  let shadow = useRef(null);
  let ghostBod = useRef(null);
  let bothArms = useRef(null);
  let rightArm = useRef(null);
  let leftArm = useRef(null);
  let eyes = useRef(null);
  let mouth = useRef(null);
  let bubble = useRef(null);

  let spider = useRef(null);
  let web = useRef(null);


  let furrow1 = useRef(null);
  let furrow2 = useRef(null);

  // componentDidMount
  useEffect(() => {


    spiderFall.play()
    setInterval(() => {
      !spiderFall.reversed() ? spiderFall.reverse() : spiderFall.play()
    }, 8000)

    spiderFall
      .fromTo(spider, 3, { y: 0, ease: Power1.easeInOut }, { y: 0, ease: Back.easeInOut })
      .fromTo(web, 3, { height: 0, ease: Power2.easeInOut }, { height: '65', ease: Back.easeOut }, '-=1.5')

    // this is for the bobbing up and down. 
    hover.add("start", 0)
    hover.fromTo(ghostBod, 1, { y: -10, ease: Power2.easeIn }, { y: 0, ease: Back.easeOut })
      .fromTo(ghostBod, 1, { y: 0, ease: Power2.easeIn }, { y: -10, ease: Back.easeOut })
      .fromTo(shadow, 1, { opacity: .8, scale: .9, ease: Power2.easeIn }, { opacity: 1, scale: 1, ease: Back.easeOut }, "start")
      .fromTo(shadow, 1, { opacity: 1, scale: 1, ease: Power2.easeIn }, { opacity: .8, scale: .9, ease: Back.easeOut }, '=-1')


    // Peeking animation
    peek
      .add("initial")
      .add("startArms", 0)
      .fromTo(eyes, .5, { x: 0, ease: Power2.easeInOut }, { x: 8, ease: Back.easeOut }, '-=.5')
      .fromTo(eyes, 1, { y: 0, ease: Power2.easeInOut }, { y: -25, ease: Back.easeOut }, '-=.5')
      .add("eyeShiftStart")
      .fromTo(eyes, .5, { x: 8, ease: Power2.easeIn }, { x: -8, ease: Back.easeOut })
      .fromTo(eyes, .5, { x: -8, ease: Power2.easeIn }, { x: 0, ease: Back.easeOut })
      .fromTo(eyes, .5, { scaleY: 1, ease: Power2.easeIn }, { scaleY: 0, ease: Back.easeOut })
      .fromTo(eyes, .5, { scaleY: 0, ease: Power2.easeIn }, { scaleY: 1 })
      .to(eyes, 1, { scaleY: 1, ease: Power2.easeIn })
      .add("eyeShiftEnd")

    eyesShift.add(peek.tweenFromTo("eyeShiftStart", "eyeShiftEnd"))
    eyesShift.add(peek.tweenFromTo("eyeShiftEnd", "eyeShiftStart"))


    boo
      .add("startBoo", 0)
      .fromTo(eyes, .5, { x: 0, y: 0, scaleY: 1, ease: Power2.easeIn }, { x: 0, y: -15, scaleY: 1, ease: Back.easeOut }, '-=.5')
      .fromTo(furrow1, .2, { y: 0, ease: Power2.easeIn }, { y: 25, ease: Back.easeInOut }, '-=.5')
      .fromTo(furrow2, .2, { y: 0, ease: Power2.easeIn }, { y: 25, ease: Back.easeInOut }, '-=.5')
      .fromTo(rightArm, .04, { y: 0, x: 0 }, { y: -25, x: -40 }, 'startBoo')
      .fromTo(rightArm, .05, { css: { rotationY: 0, rotationX: 0 } }, { css: { rotationY: 120, rotationX: -10 } }, 'startBoo')
      .fromTo(leftArm, .04, { y: 0, x: 0 }, { y: -15, x: 70 }, 'startBoo')
      .fromTo(leftArm, .05, { css: { rotationY: 0, rotationX: 0 } }, { css: { rotationY: 120, rotationX: -10 } }, 'startBoo')
      .fromTo(mouth, .5, { scaleY: 1, scaleX: 1, ease: Power2.easeIn }, { scaleY: 6, scaleX: 4, ease: Back.easeOut }, '-=1')
      .fromTo(bubble, .5, { y: 0, opacity: 0, scale: 0 }, { y: -125, opacity: 1, duration: 2.5, ease: Elastic.easeIn.config(1.5, 1), scale: 1.2, }, '-=1')

    bounce.fromTo(ghostBod, 1, { scale: .85, }, { scale: .9, duration: 1, ease: Elastic.easeOut.config(1, 0.3), scale: 1 });


  }, []);


  // function that will make the ghost jump, wave out his arms and say 'Boo!'
  function Boo() {

    bounce.restart() ? bounce.restart() : bounce.play().restart(true)

    if (sayBoo === false) {
      peek.pause()
      eyesShift.pause()
      boo.play()
      setBoo(true)
    }
  }

  function Peep(e) {
    if (!sayBoo) {
      peek
        .to(bothArms, 1, { x: -15, y: 20, ease: Back.easeOut }, "startArms")
        .to(mouth, .6, { x: 2, y: -30, ease: Power2.easeInOut }, 'startArms')
      peek.restart() ? peek.restart() : peek.play().restart(true);
    }
  }

  function stopPeep(e) {

    if (sayBoo) {
      boo.reverse().timeScale(4)
      peek.tweenFromTo("armsStart", "initial", { ease: Power2.easeOut })
      peek.restart(false)
      bounce.reverse()
      setBoo(false)
      return;
    }
    peek.tweenFromTo("armsStart", "initial", { ease: Power2.easeOut })
    peek.restart(false)

  }

  return (
    <div className="home">
      <div className="spider">
        <div className="web" ref={el => { web = el }}></div>
        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" ref={el => { spider = el }}>
          <path d="M13.6 15.2609C13.6 16.7736 12.5255 18 11.2 18C9.87452 18 8.8 16.7736 8.8 15.2609C8.8 13.7481 9.87452 12.5217 11.2 12.5217C12.5255 12.5217 13.6 13.7481 13.6 15.2609Z" fill="#1C1D22" />
          <path d="M16 8.86957C16 11.559 13.9853 13.7391 11.5 13.7391C9.01472 13.7391 7 11.559 7 8.86957C7 6.18018 9.01472 4 11.5 4C13.9853 4 16 6.18018 16 8.86957Z" fill="#1C1D22" />
          <path d="M1 4.16675C3.5 -1.17781 6.9375 2.59482 8.5 4.48109M13.1875 3.85232C15.6875 -1.49224 19.4375 1.96606 21 3.85233M13.8125 5.73866C16.3125 0.394095 18.5 4.48118 20.0625 6.36744M1.9375 11.7121C4.4375 6.36757 5.6875 6.68194 7.25 8.5682M13.8125 8.5682C16.3125 3.22364 18.5 7.93951 20.0625 9.82577M6.3125 18C7.25 15.4849 7.25 15.1705 9.125 16.1136M13.8125 10.769C16.3125 5.42439 17.5625 10.4547 19.125 12.3409M1.9375 7.31063C4.4375 1.96606 5.6875 4.48118 7.25 6.36744M3.5 14.2273C6 8.88272 6.3125 8.88269 7.875 10.769M12.25 16.1136C13.1875 14.2273 14.125 14.2273 14.75 18" stroke="#1C1D22" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="title-wrapper">
        <h1 className="title">Happy Halloween!</h1>
      </div>
      <div className="ghost-wrapper">
        <div className="boo-bubble">
          <svg width="131" height="90" viewBox="0 0 131 90" fill="none" xmlns="http://www.w3.org/2000/svg" ref={el => { bubble = el }}>
            <path d="M10.5613 4.52297C29.6572 -0.134527 108.623 -0.453995 122.061 4.52299C135.5 9.49998 130 46 125 67C123.333 74 70 70.023 70 70.023L65.5614 89.023L58.5 70.023C58.5 70.023 2.99999 77.5 3.00003 62C3.00009 39.4172 -6.58501 8.70496 10.5613 4.52297Z" fill="#B6659F" />
            <path d="M28.112 55C27.984 55 27.92 54.92 27.92 54.76L28.016 21.784C28.016 21.656 28.08 21.592 28.208 21.592H37.424C39.248 21.592 40.88 22.04 42.32 22.936C43.76 23.8 44.896 24.952 45.728 26.392C46.56 27.832 46.976 29.4 46.976 31.096C46.976 32.472 46.656 33.752 46.016 34.936C45.408 36.12 44.672 37.08 43.808 37.816C44.736 38.744 45.456 39.816 45.968 41.032C46.48 42.248 46.736 43.528 46.736 44.872C46.736 46.728 46.288 48.424 45.392 49.96C44.496 51.496 43.28 52.728 41.744 53.656C40.24 54.552 38.56 55 36.704 55H28.112ZM33.776 34.84H37.424C38.544 34.84 39.44 34.456 40.112 33.688C40.816 32.888 41.168 32.024 41.168 31.096C41.168 30.072 40.8 29.192 40.064 28.456C39.328 27.688 38.448 27.304 37.424 27.304H33.776V34.84ZM33.728 49.144H36.704C37.856 49.144 38.848 48.728 39.68 47.896C40.512 47.032 40.928 46.024 40.928 44.872C40.928 43.72 40.512 42.728 39.68 41.896C38.848 41.064 37.856 40.648 36.704 40.648H33.776L33.728 49.144ZM59.0656 55.48C57.3376 55.48 55.7536 55.048 54.3136 54.184C52.9056 53.288 51.7696 52.12 50.9056 50.68C50.0416 49.208 49.6096 47.592 49.6096 45.832L49.6576 30.616C49.6576 28.856 50.0736 27.256 50.9056 25.816C51.7696 24.376 52.9216 23.224 54.3616 22.36C55.8016 21.496 57.3696 21.064 59.0656 21.064C60.7936 21.064 62.3616 21.496 63.7696 22.36C65.1776 23.224 66.2976 24.376 67.1296 25.816C67.9936 27.256 68.4256 28.856 68.4256 30.616L68.4736 45.832C68.4736 47.592 68.0416 49.208 67.1776 50.68C66.3456 52.12 65.2096 53.288 63.7696 54.184C62.3616 55.048 60.7936 55.48 59.0656 55.48ZM59.0656 49.672C60.0256 49.672 60.8576 49.288 61.5616 48.52C62.2976 47.72 62.6656 46.824 62.6656 45.832L62.6176 30.616C62.6176 29.56 62.2816 28.664 61.6096 27.928C60.9376 27.192 60.0896 26.824 59.0656 26.824C58.0736 26.824 57.2256 27.192 56.5216 27.928C55.8176 28.632 55.4656 29.528 55.4656 30.616V45.832C55.4656 46.888 55.8176 47.8 56.5216 48.568C57.2256 49.304 58.0736 49.672 59.0656 49.672ZM81.0031 55.48C79.2751 55.48 77.6911 55.048 76.2511 54.184C74.8431 53.288 73.7071 52.12 72.8431 50.68C71.9791 49.208 71.5471 47.592 71.5471 45.832L71.5951 30.616C71.5951 28.856 72.0111 27.256 72.8431 25.816C73.7071 24.376 74.8591 23.224 76.2991 22.36C77.7391 21.496 79.3071 21.064 81.0031 21.064C82.7311 21.064 84.2991 21.496 85.7071 22.36C87.1151 23.224 88.2351 24.376 89.0671 25.816C89.9311 27.256 90.3631 28.856 90.3631 30.616L90.4111 45.832C90.4111 47.592 89.9791 49.208 89.1151 50.68C88.2831 52.12 87.1471 53.288 85.7071 54.184C84.2991 55.048 82.7311 55.48 81.0031 55.48ZM81.0031 49.672C81.9631 49.672 82.7951 49.288 83.4991 48.52C84.2351 47.72 84.6031 46.824 84.6031 45.832L84.5551 30.616C84.5551 29.56 84.2191 28.664 83.5471 27.928C82.8751 27.192 82.0271 26.824 81.0031 26.824C80.0111 26.824 79.1631 27.192 78.4591 27.928C77.7551 28.632 77.4031 29.528 77.4031 30.616V45.832C77.4031 46.888 77.7551 47.8 78.4591 48.568C79.1631 49.304 80.0111 49.672 81.0031 49.672ZM95.3086 46.168C95.1806 46.168 95.1006 46.088 95.0686 45.928L94.0606 34.888V21.832C94.0606 21.672 94.1246 21.592 94.2526 21.592H99.6286C99.7886 21.592 99.8686 21.672 99.8686 21.832L99.8206 34.888L98.8126 45.928C98.7806 46.088 98.7006 46.168 98.5726 46.168H95.3086ZM94.2526 55C94.1246 55 94.0606 54.92 94.0606 54.76V49.528C94.0606 49.4 94.1246 49.336 94.2526 49.336H99.6286C99.7566 49.336 99.8206 49.4 99.8206 49.528V54.76C99.8206 54.92 99.7566 55 99.6286 55H94.2526Z" fill="white" />
          </svg>
        </div>
        <div className="body-wrapper" ref={el => { ghostBod = el }} onClick={Boo} onMouseEnter={Peep} onMouseLeave={stopPeep} onTouchStart={Peep}>
          <svg width="215" height="264" viewBox="0 0 215 264" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4142 224.874C-30.7643 68.2968 41.1883 20.6428 44.768 17.7764C48.3478 14.91 65.8752 1.00008 101.686 1.00008C101.686 1.00008 142.913 -2.93245 172.922 17.7764C249 70.2764 197.622 224.874 197.622 224.874C197.622 224.874 204.066 234.906 200.128 238.418C196.191 241.93 181.156 234.906 181.156 234.906C181.711 237.135 181.129 238.829 179.709 240.018C175.605 243.455 164.496 242.678 153.592 238.418C151.086 249.884 130.682 246.372 122.806 241.714C113.141 253.538 99.1799 248.164 94.5262 241.714C94.5262 241.714 85.577 247.447 76.9856 247.447C68.3943 247.447 62.3087 238.418 62.3087 238.418C62.3087 238.418 45.1581 248.681 37.9665 244.581C33.0084 241.754 34.3868 234.906 34.3868 234.906C34.3868 234.906 11.8345 241.356 11.8345 234.906C11.8345 228.457 15.4142 224.874 15.4142 224.874Z" fill="url(#paint0_radial1)" />
            <defs>
              <radialGradient id="paint0_radial1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(39.0405 93.3777) rotate(35.1405) scale(271.41 224.643)">
                <stop offset="0.609375" stopColor="white" />
                <stop offset="1" stopColor="#7A5E9E" stopOpacity="0.95" />
              </radialGradient>
            </defs>
          </svg>
          {/* <Body /> */}
          <div className="arms-wrapper" ref={el => { bothArms = el }}>
            <span className="right-arm">
              <svg width="93" height="86" viewBox="0 0 93 86" fill="none" xmlns="http://www.w3.org/2000/svg" ref={el => { rightArm = el }}>
                <path d="M90.5688 25.3988C89.2311 52.1854 37.257 78.0025 23.7891 80.1165C10.3213 82.2304 -2.13504 82.5373 2.62935 60.9474C7.39373 39.3575 39.422 10.8924 63.9399 5.02777C78.3965 1.5698 91.2397 11.9641 90.5688 25.3988Z" fill="url(#paint0_radial3)" stroke="#F5F5F5" />
                <defs>
                  <radialGradient id="paint0_radial3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.9771 5.88332) rotate(-1.43065) scale(99.2204 99.7401)">
                    <stop offset="0.604167" stopColor="white" />
                    <stop offset="0.734375" stopColor="#F0EDF4" />
                    <stop offset="1" stopColor="#B1A1C6" />
                  </radialGradient>
                </defs>
              </svg>
            </span>
            <span className="left-arm">
              <svg width="100" height="98" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg" ref={el => { leftArm = el }}>
                <path d="M21.3957 14.633C48.4418 8.48005 87.3789 47.335 92.9063 58.6564C98.4336 69.9777 101.903 80.9001 79.1675 82.6023C56.4325 84.3044 19.92 63.7988 7.84741 43.7406C0.728972 31.9136 7.83092 17.719 21.3957 14.633Z" fill="url(#paint0_radial2)" stroke="#FCF8F8" />
                <defs>
                  <radialGradient id="paint0_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60.392 23.2862) rotate(56.8983) scale(87.5504 79.0609)">
                    <stop offset="0.59375" stopColor="white" />
                    <stop offset="0.734375" stopColor="#F0EDF4" />
                    <stop offset="1" stopColor="#B1A1C6" />
                  </radialGradient>
                </defs>
              </svg>
            </span>
          </div>
          <div className="eye-covers">
            <div className="eye-covers-1" ref={el => { furrow1 = el }}></div>
            <div className="eye-covers-2" ref={el => { furrow2 = el }}></div>
          </div>
          <div className="eyes-wrapper" ref={el => { eyes = el }}>

            <span className="eyes eyes-1">
              <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="8" cy="13" rx="8" ry="13" fill="#4B3B65" />
              </svg>
            </span>
            <span className="eyes eyes-2">
              <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="8" cy="13" rx="8" ry="13" fill="#4B3B65" />
              </svg>
            </span>
          </div>
          <div className="mouth-wrapper">
            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" ref={el => { mouth = el }}>
              <circle cx="2" cy="2" r="2" fill="#5F577C" />
            </svg>
          </div>
        </div>
        <div className="shadow" ref={el => { shadow = el }}></div>
      </div>
    </div>
  )
}

export default Home
