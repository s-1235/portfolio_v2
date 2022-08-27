import type { NextApiRequest, NextApiResponse } from 'next';

interface project {
  id: number;
  name: string;
  details: string;
  img: string;
}

export const projects: project[] = [
  {
    id: 1,
    name: 'propal',
    details: 'I created this for fyp.',
    img: '',
  },
  {
    id: 2,
    name: 'wordpress',
    details: 'I created this for fyp.',
    img: '',
  },
  {
    id: 3,
    name: 'portfolio',
    details: 'I created this for fyp.',
    img: '',
  },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const id = _req?.query?.projectId;

  const portfolio = projects.filter((project) => project.id === +id);
  res.status(200).json({
    data: portfolio,
  });
}
