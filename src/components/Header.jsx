import styled from 'styled-components';
import Dropdown from './Dropdown';

const HeaderLayout = styled.header`
  width: 100%;
  height: 100px;
  background: #FFFFFF;
  box-shadow: 0px 0px 12px rgb(0 0 0 / 20%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

 const Header = ({users, name, onChangeUser}) => (
  <HeaderLayout>
    <Title>Voting Page</Title>
    <Dropdown options={users} value={name} onChange={onChangeUser}/>
  </HeaderLayout>
);

export default Header;