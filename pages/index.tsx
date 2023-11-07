import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";
import Project from "../components/projects/Project";
import Contact from "../components/contact/contact";

interface indexProps {}

interface Ireply {
  id: number;
  name: string;
  userName: string;
  reply: string;
}

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: number[] } = {
  duration: 1.4,
  ease: [0.6, 0.01, -0.05, 0.9],
};

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const index: React.FC<indexProps> = ({}) => {
  const [speakerState, setSpeakerState] = useState("muted");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const { data: reviews, error } = useSwr("/api/tweets", fetcher);

  if (error) console.log(error);

  const refScroll = React.useRef(null);
  let lscroll: any;

  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;
    // @ts-ignore
    lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    // update locomotive scroll
    window.addEventListener("load", () => {
      let image = document.querySelector("img");
      // @ts-ignore
      const isLoaded = image!.complete && image!.naturalHeight !== 0;
      lscroll.update();
    });

    // image hover effect
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        new hoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      }
    );

    // header cursor
    // const cursor = document.querySelector('.cursor');
    // window.onmousemove = (e: any) => {
    //   cursor!.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
    // };

    console.clear();
    console.log.apply(console, [
      "%c Designed and Developed by Sadam Khan %c %c🚀 %c\n",
      "color: #fff; background: #01010a; padding:5px 0;",
      "color: #fff; background: #242424; padding:5px 0 5px 5px;",
      "background: #242424; padding:5px 0",
      "background: #242424; padding:5px 5px 5px 0",
    ]);
    // console.log.apply(console, [
    //   '%c Thanks for stopping by, I’m currently looking to a new team of creative designers and developers.\n',
    //   'color: #fff; background: #8000ff; padding:5px 0;',
    // ]);
  }, []);

  const handleSpeaker = () => {
    const audio = document.querySelector("#audioPlayer") as HTMLVideoElement;

    if (speakerState === "muted") {
      setSpeakerState("unmuted");
      audio.pause();
    } else {
      setSpeakerState("muted");
      audio.play();
    }
  };

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="svg/sadam2.svg" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>Sadam Khan 🚀 &mdash; Software Engineer</title>
          <meta
            name="description"
            content="I'm a self-taught Software Engineer and turning ideas into real life products is my calling."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Sadam Khan 🚀 &mdash; Software Engineer"
          />
          //! <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
            content="I'm a self-taught Software Engineer and turning ideas into real life products is my calling."
          />
          <meta
            name="twitter:title"
            content="Sadam Khan 🚀 &mdash; Software Engineer"
          />
          <meta
            name="twitter:description"
            content="I'm a self-taught Software Engineer and turning ideas into real life products is my calling."
          />
          <meta name="twitter:image" content="webp/preview-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <audio loop id="audioPlayer" autoPlay style={{ display: "none" }}>
          <source src="sound/preloader.mp3" type="audio/mp3" />
        </audio>
        <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#menu-target"
          animate={{ top: "-100vh", transition: { ...transition, delay: 9 } }}
          className="preloader"
        >
          <div className="preloader__wrapper">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__left"
            >
              <img src="svg/sadam2.svg" alt="sadam logo" width="30px" />
            </motion.div>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__right"
            >
              <p className="preloader__text">JS Frameworks</p>
              <p className="preloader__text">MERN STACK</p>
              <p className="preloader__text">NEXT JS</p>
              <p className="preloader__text">Artificial Intelligence</p>
              <p className="preloader__text">Blockchain</p>
              <p className="preloader__text">Full Stack</p>
            </motion.div>
          </div>
        </motion.div>
        {/* <div className='cursor'></div> */}
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          {/* <header className='header'> */}
          <header
            className="header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src="svg/sadamAva.png"
              alt="Sadam Khan"
              className="header__avatar"
            />
            <div className="header__hero">
              <div
                className="header__hero--heading"
                style={{ fontSize: "7rem" }}
              >
                <span>Full Stack Web </span> <br />
                <span>Developer</span>
                <br />
                <span className="header__hero--heading-gradient">
                  Let's build the future!
                </span>
                <br />
                {/* <span>is my calling.</span> */}
              </div>
              <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
              >
                VIEW PROJECTS
              </a>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker">
                <div
                  onClick={handleSpeaker}
                  className={`${"speaker__toggle"} ${
                    speakerState === "unmuted"
                      ? `${"speaker__toggle--anim"}`
                      : ``
                  }`}
                >
                  &nbsp;
                </div>
                <div className="speaker__muted">
                  <img src="svg/muted.svg" alt="muted icon" />
                </div>
                <div className="speaker__unmuted">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.599976"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect1-anim"
                    />
                    <rect
                      x="9"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect2-anim"
                    />
                    <rect
                      x="4.79999"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect3-anim"
                    />
                    {/* <rect
                      x="13.2"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect4-anim"
                    /> */}
                  </svg>
                </div>
              </div>
            </div>
            <div className="header__footer--right">
              <a
                href="https://github.com/s-1235"
                rel="noopener"
                target="_blank"
              >
                👾 GH
              </a>
              <a href="https://twitter.com" rel="noopener" target="_blank">
                🐦 TW
              </a>
              <a
                href="https://www.linkedin.com/in/sadam-khan-9aba2b213"
                rel="noopener"
                target="_blank"
              >
                💼 LD
              </a>
            </div>
          </div>
        </div>
        {/* <p className='section-contact__h2 m-heading'> */}
        <p className="about-text m-heading">
          Hello stranger! 👋, my name is Sadam and I am a software engineer,
          passionate <br /> about digital products that help people experience
          everyday life, not endure it.
        </p>

        {/* <Project /> */}

        <main className="container">
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>Yeah, I work hard </span> <small>💼</small>
            </h1>
            {/* <p className='paragraph'> */}
            <p className="section-contact__h2">
              Each project is unique. Here are some of my works.
            </p>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  NEXT JS, LOCOMOTIVE SCROLL, FRAMER MOTION
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/alexxandria-1.webp" alt="alexxandria model" />
                <img src="webp/alexxandria-2.webp" alt="alexxandria logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  Alexxandria
                  <br /> Forque
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://alexxandria.vercel.app/"
                  className="project-card__link"
                >
                  VISIT THE WEBSITE
                </a>
                <div className="project-card__socials">
                  <a href="#">
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/s-1235"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">REACT JS, FRAMER MOTION</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/safarika-1.webp" alt="safarika" />
                <img src="webp/safarika-2.webp" alt="safarika logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  Safarika
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://safarika-adeola.netlify.app/"
                  className="project-card__link"
                >
                  VISIT THE WEBSITE
                </a>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://dribbble.com/shots/12361426-Safarika-Adventure"
                  >
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/s-1235"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  React JS, Node JS, Mongo DB, Express Framework
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/heatrow-2.webp" alt="heatrow logo" />
                <img src="webp/pro_pal.png" alt="heatrow" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  Propal
                </h2>
                <a
                  href="https://heatrow.vercel.app/"
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  VISIT THE WEBSITE
                </a>
                <div className="project-card__socials">
                  <a href="#">
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/adeolaadeoti/heatrow"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">HTML, SCSS, JAVASCRIPT, GSAP</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/adeola-1.webp" alt="adeola model" />
                <img src="webp/adeola-2.webp" alt="adeola logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  AdeolaAdeoti
                  <br /> version 1
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://github.com/s-1235"
                  className="project-card__link"
                >
                  VIEW SOURCE CODE
                </a>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://dribbble.com/shots/12338926-Adeola-Adeoti-Portfolio"
                  >
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/adeolaadeoti/adeolaadeoti-portfolio"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* //Experiment
          //Experiment close */}
          <Project />
          <section
            data-scroll
            data-scroll-offset="35%"
            data-scroll-repeat={true}
            data-scroll-class="section-reviews__bg"
            className="section-reviews"
          >
            <div className="section-reviews__top">
              <h1 className="heading-1">
                <span>Hear from others</span> <small>✨</small>
              </h1>
              {/* <p className='paragraph paragraph__sub'> */}
              <p className="section-contact__h2">
                I am lucky to be working with awesome peoples from all aroumd
                the world...
              </p>
            </div>
            <div className="section-reviews__bottom">
              <div className="section-reviews__bottom-wrapper review-card__anim1">
                {reviews?.data.map((review: Ireply) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{review.name}</p>
                        <h3 className="review-card__h3">{review.userName}</h3>
                      </div>
                      <div className="review-card__top--right">
                        {/* <img src='svg/twitter.svg' alt='twitter icon' /> */}
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{review.reply}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-reviews__bottom-wrapper review-card__anim2">
                {reviews?.data.sort().map((review: Ireply) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{review.name}</p>
                        <h3 className="review-card__h3">{review.userName}</h3>
                      </div>
                      <div className="review-card__top--right">
                        {/* <img src='svg/twitter.svg' alt='twitter icon' /> */}
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{review.reply}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Contact />
          <section className="section-contact">
            <h1 className="heading-1">
              <span>Sold Yet? </span> <small>🤙</small>
            </h1>
            <h2 className="section-contact__h2">
              Thanks for stopping by, I am here to help with anything
              development related just ping me!
              <a
                href="mailto:sadamkhan505880@gmail.com"
                rel="noopener"
                target="_blank"
              >
                &nbsp; Email 📧
              </a>
              .
            </h2>
          </section>
          <section className="section-socials">
            <h1 className="heading-1">
              <span>Dont be a stranger!</span> <small>👋</small>
            </h1>
            {/* <p className='paragraph'>Connect with me online</p> */}
            <h2 className="section-contact__h2">Connect with me online</h2>
            <div className="section-socials--links">
              <a
                href="https://github.com/s-1235"
                rel="noopener"
                target="_blank"
              >
                👾 GitHub
              </a>
              <a
                href="https://twitter.com/bigDaddy8555"
                rel="noopener"
                target="_blank"
              >
                🐦 Twitter
              </a>
              <a
                href="https://www.linkedin.com/in/sadam-khan-9aba2b213/"
                rel="noopener"
                target="_blank"
              >
                💼 LinkedIn
              </a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <img
            src="svg/sadam2.svg"
            alt="design and devloped by Sadam Khan
            "
            width="40px"
          />
          <div className="footer__socials">
            <a href="https://github.com/s-1235" target="_blank" rel="noopener">
              <img src="svg/github.svg" alt="github logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
