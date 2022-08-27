import ProjectBox from './ProjectBox';

const Project = () => {
  return (
    <div className='project'>
      <h2
        className='header__hero--heading-gradient project__title'
        // style={{ margin: '5.5rem 0' }}
      >
        Projects
      </h2>
      <p className='about-text m-heading project__desc '>
        {/* <p className='paragraph paragraph-sub '> */}
        More of my projects, I am blessed to have worked with great clients and
        help them with my skills I have uploaded these with their consents!
      </p>
      <div className='project__grid'>
        <div className='project__row ' style={{ marginBottom: '1rem' }}>
          <div className='project__item'>
            <ProjectBox
              id={1}
              desc='  A frontend Dashboard created with ReactJs, Express and NodeJs'
            />
          </div>
          <div className='project__item'>
            <ProjectBox
              img='webp/alexxandria-2.webp'
              id={2}
              desc='  i have made this blah blah blah..... i have made this blah blah
            blah..... i have made this blah blah blah.....'
            />
          </div>
          <div className='project__item'>
            <ProjectBox
              id={3}
              desc='  i have made this blah blah blah..... i have made this blah blah
            blah..... i have made this blah blah blah.....'
            />
          </div>
          <div className='project__item'>
            <ProjectBox
              id={4}
              desc='  i have made this blah blah blah..... i have made this blah blah
            blah..... i have made this blah blah blah.....'
            />
          </div>
        </div>
        <div className='project__row '>
          <div className='project__item'>
            <ProjectBox
              id={5}
              desc='  i have made this blah blah blah..... i have made this blah blah
            blah..... i have made this blah blah blah.....'
            />
          </div>
          <div className='project__item'>
            <ProjectBox
              id={6}
              desc='  i have made this blah blah blah..... i have made this blah blah
            blah..... i have made this blah blah blah.....'
            />
          </div>
          <div className='project__item'>
            <ProjectBox
              id={7}
              desc='  i have made this blah blah blah..... i have made this blah blah
            blah..... i have made this blah blah blah.....'
            />
          </div>
          <div className='project__item'>
            <ProjectBox
              id={8}
              desc='  i have made this blah blah blah..... i have made this blah blah
            blah..... i have made this blah blah blah.....'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project;
