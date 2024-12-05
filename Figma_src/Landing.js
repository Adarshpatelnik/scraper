
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { 
//   X,
//   PieChart,
//   File,
//   Bell,
//   BoxArrowRight,
//   Gear,
//   Plus,
//   Person,
//   Search,
//   FileEarmarkArrowDown,
//   InfoCircle,
//   PersonPlus
// } from 'react-bootstrap-icons';
// import { Link, useLocation } from 'react-router-dom';

// // Sidebar component styling
// const Sidebar = styled.div`
//   height: 100%;
//   width: 8%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background: white;
//   color: gray;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   overflow-x: hidden;
//   transition: background 0.4s ease;
//   padding-top: 2rem;
//   display: flex;
//   flex-direction: column;
//   z-index: 1000;

//   @media (max-width: 768px) {
//     width: 60px; /* Adjust for smaller screens */
//   }
// `;

// // Logo styling
// const Logo = styled.img`
//   width: 50px;
//   height: 50px;
//   background: white;
//   object-fit: contain;
//   position: fixed;
//   top: 10px;
//   left: 10px;

//   @media (max-width: 768px) {
//     width: 40px;
//     height: 40px;
//   }
// `;

// // Navbar component styling
// // Navbar component styling
// const Navbar = styled.div`
//   position: fixed;
//   top: 0;
//   left: 5%;
//   height: 60px;
//   width: calc(100% - 8%);
//   background: white;
//   color: #2c3e50;
//   display: flex;
//   align-items: center;
//   padding: 0 2rem;
//   z-index: 999;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

//   @media (max-width: 768px) {
//     left: 0;
//     width: 100%;
//   }
// `;

// // NavItem styling
// const NavItem = styled(Link)`
//   color: ${props => (props.isActive ? 'black' : 'gray')};
//   text-decoration: none;
//   margin-left: 3.6rem; 
//     margin-right: 0rem;

//   font-size: 1rem;

  
// `;


// // Search input container styling
// const SearchContainer = styled.div`
//   position: relative;
//   width: 33%; /* Adjust width as needed */
//   margin-left: 1.2rem;

//   @media (max-width: 768px) {
//     width: 150px;
//   }
// `;

// // Search input styling
// const SearchBar = styled.input`
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   padding: 0.5rem 2rem;
//   font-size: 1rem;
//   width: 100%;
//   box-sizing: border-box;
//   outline: none;
//   padding-right: 30px; /* Space for the icon */
// `;

// // Search icon styling inside the search bar
// const SearchIcon = styled.div`
//   position: absolute;
//   left: 10px;
//   top: 50%;
//   transform: translateY(-50%);
//   color: #99a3a4;
//   font-size: 1rem;
// `;

// // Date display styling
// const DateDisplay = styled.span`
//   font-size: 1rem;
//   color: #2c3e50;
//       margin-right: 1rem;



// `;

// // Date label styling
// const DateLabel = styled.span`
//   font-size: 1.1rem;
//   color: #333;
//   font-weight: 600;
//   margin-left: 1rem;
// `;

// // NavItem styling

// // LogoutButton styling
// const LogoutButton = styled.button`
//   border: none;
//   color: black;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   font-size: 1.2rem;
//   padding: 0.4rem 1rem;

//   &:active {
//     color: black;
//   }

//   @media (max-width: 768px) {
//     margin-right: 1rem;
//   }
// `;

// // Icon styling
// const Icon = styled.div`
//   font-size: 1.3rem;
//   margin-right: 8px;
// `;

// // SidebarItem styling
// const SidebarItem = styled.div`
//   position: relative;
//   padding: ${props => (props.isActive ? '14px 13px' : '18px 19px')};
//   display: flex;
//   border-radius: 4px;
//   align-items: center;
//   cursor: pointer;
//   font-size: 1rem;
//   color: ${props => (props.isActive ? '#fff' : '#99a3a4')};
//   background: ${props => (props.isActive ? '#2980b9' : 'transparent')};
//   transition: background 0.2s ease, padding 0.2s ease;
//   white-space: nowrap;
//   overflow: hidden;
//   margin: 5px 0;
// `;

// // SidebarLink styling
// const SidebarLink = styled(Link)`
//   color: inherit;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   height: 100%;
// `;

// // Text styling
// const Text = styled.span`
//   margin-left: 8px;
//   font-size: 15px;
//   font-weight: 600;
//   color: ${props => props.color || '#000'};
//   white-space: nowrap;
// `;

// // ProfileSection styling
// const ProfileSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 2rem;
//   background: #f9f9f9;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// // ProfileIcon styling
// const ProfileIcon = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   background: linear-gradient(135deg, #e0e0e0, #c0c0c0);
//   color: #333;
//   font-size: 1.1rem;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//   margin-bottom: 1rem;
// `;

// // ProfileText styling
// const ProfileText = styled.span`
//   font-size: 1rem;
//   font-weight: 600;
//   color: #99a3a4;
//   text-align: center;
//   margin-bottom: 1.8rem;
// `;

// const Landing = () => {
//   const [sidebarVisible, ] = useState(false);
//   const location = useLocation();
  
//   const getCurrentDate = () => {
//     const date = new Date();
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${month}/${day}/${year}`;
//   };

  
//   useEffect(() => {
//     if (!sidebarVisible) {
//     }
//   }, [sidebarVisible]);

//   return (
//     <>
//       <Sidebar>
//         <SidebarItem>
//           <SidebarLink to="/">
//             <Icon>
//               <Logo src="logo.png" />
//             </Icon>
//           </SidebarLink>
//         </SidebarItem>
//         <SidebarItem isActive={location.pathname === '/'}>
//         <Icon>
//             <Plus />
//           </Icon>
//             <Text color="#fff">Report</Text> {/* Example color */}
//         </SidebarItem>

//         <SidebarItem >
//           <Text color="#99a3a4">Menu</Text> {/* Example color */}
//         </SidebarItem>

//         <SidebarItem isActive={location.pathname === '/'}>
//         <Icon>
//             <X />
//           </Icon>
//         </SidebarItem>
//         <SidebarItem isActive={location.pathname.startsWith('/student')}>
//           <SidebarLink to="#">
//           <Icon>
//               <PieChart />
//             </Icon>
//           </SidebarLink>
//         </SidebarItem>
//         <SidebarItem isActive={location.pathname.startsWith('/staff')}>
//           <SidebarLink to="#">
//           <Icon>
//               <File />
//             </Icon>
//           </SidebarLink>
//         </SidebarItem>

//         <SidebarItem isActive={location.pathname.startsWith('/staff')}>
//           <SidebarLink to="#">
//           <Icon>
//               <Person />
//             </Icon>
//           </SidebarLink>
//         </SidebarItem>
//         <SidebarItem isActive={location.pathname === '/documents'}>
//           <SidebarLink to="/documents">
//           <Icon>
//               <Bell />
//             </Icon>
//           </SidebarLink>
//         </SidebarItem>

//         <ProfileSection>
//         <ProfileText>Profile</ProfileText>

//         <ProfileIcon>
//             <Person />
//           </ProfileIcon>
//           <LogoutButton>
//             <BoxArrowRight />
//           </LogoutButton>
//         </ProfileSection>
//       </Sidebar>
      
//       <Navbar>
//         <DateDisplay>
//           <DateLabel bold>EOM Matrix</DateLabel>
//           <DateLabel>| Data update</DateLabel>
//           {getCurrentDate()}
//         </DateDisplay> 
//         <SearchContainer>
//           <SearchBar type="text" placeholder="Name, Address, Quote Number, Policy Number" /> 
//           <SearchIcon>
//             <Search />
//           </SearchIcon>
//         </SearchContainer>
//         <NavItem to="/#">
//         <Icon>
//   <Bell />
// </Icon>
//         </NavItem>
//         <NavItem to="/#">
        
// <Icon>
//   <Gear />
// </Icon>
//         </NavItem>
//         <NavItem to="/#">
         
// <Icon>
//   <FileEarmarkArrowDown />
// </Icon>
//         </NavItem>
//         <NavItem to="/#">
//         <Icon>
//   <InfoCircle />
// </Icon>
//         </NavItem>
//         <NavItem to="/#">
//         <Icon>
//   <Person />
// </Icon>
//         </NavItem>
//       </Navbar>
//     </>
//   );
// };

// export default Landing;

// import React from 'react';
// import SidebarComponent from './Sidebar';
// import NavbarComponent from './Navbar';
// import ClaimReport from './ClaimReport';
// import BarChart from './Bar';
// import PieChart from './PieChart';
// const Landing = () => {
//   return (
//     <>
//       <SidebarComponent />
//       <NavbarComponent />
//       <BarChart />    <PieChart />
//       <ClaimReport />
       
  
//       {/* Add other components or content here */}
//     </>
//   );
// };

// export default Landing;






import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const LandingContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Ensure items wrap on smaller screens */
  justify-content: center; /* Center items horizontally */
  align-items: center;
  height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const StyledCard = styled.div`
  background-color: ${(props) => props.bgColor};
  border-radius: 15px;
  padding: 20px;
  width: 300px; /* Default width for larger screens */
  text-align: left;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 5%; /* Margin to space out cards */
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    background-color: ${(props) => props.hoverBgColor};
  }

  @media (max-width: 768px) {
    width: 80%; /* Adjust width for tablets and mobile screens */
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width for very small screens */
  }
`;

const CardImage = styled.img`
  width: 60px; /* Adjust size for smaller screens */
  height: 60px;
  object-fit: contain;
  border-radius: 10px;
  margin-right: 15px;
`;

const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardTitle = styled.h2`
  font-size: 1.1rem; /* Adjust font size for better readability */
  margin-bottom: 0;
  color: #ecf0f1;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const cardColors = [
  { backgroundColor: '#2a73c0', hoverBackgroundColor: '#16a085' },
  { backgroundColor: '#4c7943', hoverBackgroundColor: '#2980b9' },
  { backgroundColor: '#a76837', hoverBackgroundColor: '#c0392b' },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <LandingContainer>
      <VideoBackground autoPlay loop muted>
        <source src="vdo3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      {[
        {
          imageSrc: 'expeired.png',
          title: 'Expired Report',
          onClick: () => navigate('/DashboardPage'),
        },
        {
          imageSrc: 'treansection.png',
          title: 'Policy Transaction Report',
          onClick: () => navigate('/PolicyTransactionDashboard'),
        },
        {
          imageSrc: 'claim.png',
          title: 'Claim Report',
          onClick: () => navigate('/DataDashboard'),
        },
      ].map((card, index) => (
        <StyledCard
          key={index}
          bgColor={cardColors[index].backgroundColor}
          hoverBgColor={cardColors[index].hoverBackgroundColor}
          onClick={card.onClick}
        >
          <CardImage 
            src={card.imageSrc}
            alt={card.title}
          />
          <CardTextContainer>
            <CardTitle>{card.title}</CardTitle>
          </CardTextContainer>
        </StyledCard>
      ))}
    </LandingContainer>
  );
}

export default Landing;
