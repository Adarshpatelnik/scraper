
import React from 'react';
import styled from 'styled-components';
import { 
  Grid,
  PieChart,
  File,
  Bell,
  BoxArrowRight,
  FileText,
  Person
} from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';

// Sidebar component styling
const Sidebar = styled.div`
  height: 100%;
  width: 6%; /* Increased width for better spacing */
  position: fixed;
  top: 0;
  left: 0;
  // background: #2e4053; /* Dark background */
  color: #fff; /* White text */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
  transition: width 0.4s ease;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 60px; /* Adjust for smaller screens */
  }
`;

// Logo styling
const Logo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  position: fixed;
  top: 1px;
  left: 10px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

// SidebarItem styling
const SidebarItem = styled.div`
  position: relative;
  padding: ${props => (props.isActive ? '10px 25px' : '10px 25px')}; /* Padding around the item */
  display: flex;
  border-radius: 4px;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: ${props => (props.isActive ? '#fff' : '#99a3a4')};
  background: ${props => (props.isActive ? '#3498db' : 'transparent')};
  transition: background 0.2s ease, padding 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  margin: 10px 10px; /* Margin between items */

  &:hover {
    background: #3498db;
  }

  ${props => props.isExpanded && `
    padding: 1rem 1rem; /* Additional padding when expanded */
  `}
`;

// SidebarLink styling
const SidebarLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// Icon styling
const Icon = styled.div`
  font-size: 1.6rem; /* Increased icon size for a bolder appearance */
  color: inherit;
  margin-right: 1rem; /* Space between icon and text */
`;

// Text styling
const Text = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.color || '#fff'};
  white-space: nowrap;
`;

// ProfileSection styling
const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  // background: #1e2a34;
  border-radius: 10px;
  margin-top: auto; /* Pushes profile section to the bottom */
`;

// ProfileIcon styling
const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #34495e;
  color:inherit ;
  font-size: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

// ProfileText styling
const ProfileText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: black;
  text-align: center;
  margin-bottom: 1.8rem;
`;

// LogoutButton styling
const LogoutButton = styled.button`
  border: none;
  color: gray;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.5rem; /* Increased font size for better visibility */
  padding: 0.4rem 1rem;
  background: transparent;
  transition: color 0.3s ease;

  &:hover {
    color: gray;
  }

  &:active {
    color: #c0392b;
  }

  @media (max-width: 768px) {
    margin-right: 1rem;
  }
`;
const SidebarComponent = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarItem>
        <SidebarLink to="/">
          <Icon>
            <Logo src="Bull.png" />
          </Icon>
        </SidebarLink>
      </SidebarItem>
      <SidebarItem isActive={location.pathname === '/'}>
        <SidebarLink to="/">
          <Icon>
            <Grid />
          </Icon>
          <Text></Text>
        </SidebarLink>
      </SidebarItem>
      <SidebarItem isActive={location.pathname === '/PolicyTransactionDashboard'}>
  <SidebarLink to="/PolicyTransactionDashboard">
    <Icon>
      <FileText />
    </Icon>
  </SidebarLink>
</SidebarItem>

      <SidebarItem isActive={location.pathname ==='/DataDashboard'}>
        <SidebarLink to="/DataDashboard">
          <Icon>
            <PieChart />
          </Icon>
          <Text></Text>
        </SidebarLink>
      </SidebarItem>
      <SidebarItem isActive={location.pathname.startsWith('/staff')}>
        <SidebarLink to="/">
          <Icon>
            <File />
          </Icon>
          <Text></Text>
        </SidebarLink>
      </SidebarItem>
      <SidebarItem isActive={location.pathname === '/documents'}>
        <SidebarLink to="/">
          <Icon>
            <Bell />
          </Icon>
          <Text></Text>
        </SidebarLink>
      </SidebarItem>
      <ProfileSection>
        <ProfileText>Profile</ProfileText>
        <ProfileIcon>
          <Person />
        </ProfileIcon>
        <LogoutButton>
          <BoxArrowRight />
        </LogoutButton>
      </ProfileSection>
    </Sidebar>
  );
};

export default SidebarComponent;

