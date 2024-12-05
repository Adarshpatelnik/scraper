import React from 'react';
import styled from 'styled-components';
import { 
  Search,
  Bell,
  Gear,
  FileEarmarkArrowDown,
  InfoCircle,
  Person
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

// Navbar component styling
const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 3%;
  height: 60px;
  width: calc(100% - 6%);
  background: white;
  color: #2c3e50;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 999;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

// Search input container styling
const SearchContainer = styled.div`
  position: relative;
  width: 33%; /* Adjust width as needed */
  margin-left: 1.2rem;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

// Search input styling
const SearchBar = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  padding-right: 30px; /* Space for the icon */
`;

// Search icon styling inside the search bar
const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #99a3a4;
  font-size: 1rem;
`;

// Date display styling
const DateDisplay = styled.span`
  font-size: 1rem;
  color: #2c3e50;
  margin-right: 1.2rem;

`;

// Date label styling
const DateLabel = styled.span`
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
  margin-left: 2rem;
`;

// NavItem styling
const NavItem = styled(Link)`
  color: ${props => (props.isActive ? 'black' : 'gray')};
  text-decoration: none;
  
  font-size: 1rem;
`;

// Icon styling
const Icon = styled.div`
  font-size: 1.3rem;
  margin-right: 28px;
    margin-left: 15px;

  

`;

// LogoutButton styling

const NavbarExpired = () => {
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <Navbar>
      <DateDisplay>
        <DateLabel bold>Expired Report </DateLabel>
        <DateLabel>| Data update       </DateLabel>
        {getCurrentDate()}
      </DateDisplay>
      <SearchContainer>
        <SearchBar type="text" placeholder="Name, Address, Quote Number, Policy Number" />
        <SearchIcon>
          <Search />
        </SearchIcon>
      </SearchContainer>
      <NavItem to="/#">
        <Icon>
          <Bell />
        </Icon>
      </NavItem>
      <NavItem to="/#">
        <Icon>
          <Gear />
        </Icon>
      </NavItem>
      <NavItem to="/#">
        <Icon>
          <FileEarmarkArrowDown />
        </Icon>
      </NavItem>
      <NavItem to="/#">
        <Icon>
          <InfoCircle />
        </Icon>
      </NavItem>
      <NavItem to="/#">
        <Icon>
          <Person />
        </Icon>
      </NavItem>
    </Navbar>
  );
};

export default NavbarExpired;
