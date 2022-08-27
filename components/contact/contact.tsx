const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact__titlebox'>
        <h2
          className='header__hero--heading-gradient project__title contact__title'
          style={{ margin: '5.5rem 0' }}
        >
          Let's Talk!
        </h2>
        <span>👀</span>
      </div>
      <form action='' className='contact__form'>
        <ul className='contact__list'>
          <div className='contact__half'>
            <li className='contact__item half'>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' id='name' />
            </li>
            <li className='contact__item half'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' id='email' />
            </li>
          </div>
          <li className='contact__item'>
            <label htmlFor='subject'>Subject</label>
            <input type='text' name='subject' id='subject' />
          </li>
          <li className='contact__item'>
            <label htmlFor='message'>Message</label>
            <textarea
              name='message'
              id='message'
              cols={30}
              rows={10}
            ></textarea>
          </li>
          <li className='contact__item'>
            <button className='contact__btn'>Send!</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Contact;
