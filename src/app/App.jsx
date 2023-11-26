import { Typography } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import { colors } from '../shared/SharedUtils';
import TaskListView from '../components/TaskListView';
import Filter from '../components/Filter';
import TaskProvider from '../app/TaskContext'

const StyledLayout = styled(Layout)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
`;


const StyledContent = styled(Content)`
  background-color: ${colors.primary[6]};
`;

function App() {
  return (
    <TaskProvider>
      <StyledLayout>
        <StyledHeader>
          <Typography.Title level={3} type="secondary">
            Schoofi Task Mmanagement
          </Typography.Title>
          <Filter />
        </StyledHeader>
        <StyledContent>
          <TaskListView />
        </StyledContent>
      </StyledLayout>
    </TaskProvider>
  );
}

export default App;
