import { NextPageContext } from 'next';
import { FC } from 'react';

const IndexPage: FC<{
  testing: boolean;
}> = () => {
  return <>HELLO</>;
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {},
  };
};

export default IndexPage;
