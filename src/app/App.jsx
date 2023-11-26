import { Typography } from 'antd';
import{ Content, Header } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import { colors } from '../shared/SharedUtils';



const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
`;




function App() {
  return (

      <StyledHeader>
        <Typography.Title level={3} type="secondary">
        Schoofi Task Management
        </Typography.Title>
      </StyledHeader>

  );
}

export default App;
