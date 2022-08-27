import Link from 'next/link';

const ProjectBox = ({
  id,
  desc,
  img,
}: {
  id: number;
  desc: string;
  img: string;
}) => {
  if (!img) {
    img = 'webp/heatrow-2.webp';
  }
  return (
    <>
      <div className='wrapper'>
        <div className='box'>
          <img src={img} alt='' className='box__img' />
        </div>
        <div className='overlay'>
          <Link href={`/portfolio/${id}`}>
            <a className='overlay__btn'>Details</a>
          </Link>
          <div className='overlay__desc'>{desc}</div>
        </div>
      </div>
    </>
  );
};
export default ProjectBox;
