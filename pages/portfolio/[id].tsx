import { useRouter } from 'next/router';
import useSWR from 'swr';

const id = () => {
  const router = useRouter();
  const id = router.query.id;

  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(`../api/projects/${id}`, fetcher);

  console.log(data, error);
  return <div className='portfolio'>Id is: {id}</div>;
};

export default id;
