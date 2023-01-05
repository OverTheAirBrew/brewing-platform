import { FC } from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';

const AppTable = styled(Table)`
  table-layout: fixed;
`;

const StyledTh = styled.thead`
  position: sticky;
  top: -1px;
  background-color: #fff;
  z-index: 9999;
`;

const IndexPage: FC<{
  applications: { name: string }[];
  environments: { name: string }[];
}> = () => {
  return <>HELLO</>;
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
