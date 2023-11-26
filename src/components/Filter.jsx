import { Input } from 'antd';
import styled from 'styled-components';
const { Search } = Input;

const StyledSearch = styled(Search)`
  width: 400px;
`;

function Filter() {
    return (
        <StyledSearch
            style={{ width: '400px' }}
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={'onSearch'}
        />
    );
}

export default Filter;
