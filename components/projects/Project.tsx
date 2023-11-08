import ProjectBox from "./ProjectBox";

const Project = () => {
  return (
    <div className="project">
      {/* <h2
        className='header__hero--heading-gradient project__title'
        // style={{ margin: '5.5rem 0' }}
      > */}
      <div className="project__content-style">
        <h1 className="heading-1">
          <span>Projects </span> ⚒️
        </h1>
        <p className="about-text m-heading project__desc ">
          {/* <p className='paragraph paragraph-sub '> */}
          More of my projects, I am blessed to have worked with great clients
          and help them with my skills I have uploaded these with their
          consents!
        </p>
      </div>
      <div className="project__grid">
        <div className="project__row " style={{ marginBottom: "1rem" }}>
          <div className="project__item">
            <ProjectBox
              img="webp/alexxandria-2.webp"
              id={1}
              desc=""
            />
          </div>
          <div className="project__item">
            <ProjectBox
              img="webp/1.png"
              id={2}
              desc="A Real Estate Portal Made using React Js, Node Js, Express Js and Artificial Intelligence"
            />
          </div>
          <div className="project__item">
            <ProjectBox
              img="webp/2.png"
              id={3}
              desc="A Modern Day Freelancing Portal which uses AI to Enhance Collaboration"
            />
          </div>
          <div className="project__item">
            <ProjectBox
              img="webp/3.png"
              id={4}
              desc="A chrome extension for filling out text inputs on runtime using AI"
            />
          </div>
        </div>
        <div className="project__row ">
          <div className="project__item">
            <ProjectBox
              img="webp/5.png"
              id={5}
              desc="A hotel management system developed using microservices architecture"
            />
          </div>
          <div className="project__item">
            <ProjectBox
              img="webp/safarika-2.webp"
              id={6}
              desc="A Frontend created with ReactJs, Typescript and Framer Motion"
            />
          </div>
          <div className="project__item">
            <ProjectBox
              img="webp/pixelchef-2.webp"
              id={7}
              desc="A Frontend created with ReactJs, MUI and Framer Motion"
            />
          </div>
          <div className="project__item">
            <ProjectBox
              img=""
              id={8}
              desc="A Frontend created with NextJs, Chakra UI and Framer Motion"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project;
