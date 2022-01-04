import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';

// Local components
import Dropdown from "./Dropdown";

// CSS Assets
import '../styles/index.css';
import '../styles/App.css';
import 'semantic-ui-css/semantic.min.css';

// UI Componenents
import { Button, Icon, Input, Table } from 'semantic-ui-react'

// Actions
import { authActions } from "../store/auth-slice";

// Assets
import userIcon from "../images/user.svg";
import sidebarIcon from "../images/sidebar-icon.svg";

// Styles
import styled from 'styled-components';
const FlexContainer = styled.div`
  display: flex;
  padding: 24px 32px;
  min-height: 100vh;
  flex-direction: column;
`;

const Appbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 40px;
`;


const UserName = styled.div`
  display: flex;
  font-size: 16px;
  line-height: 24px;
`;

const CompanyName = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 40px;
`;

const HeaderTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 36px;
`;

const HeaderSub = styled.span`
  // background-color: green;
  display: inline-block;
  margin-left: 16px;
  background-color: 10;
  opacity: 0.5;
`;

const HeaderActions = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainContent = styled.div`
  flex-direction: column;
  // background-color: green;
  flex: 1;
  margin-bottom: 40px;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 40px;
`;

const FooterText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`;

const AppButton = styled(Button)`
  &.ui.button.app-button {
    min-width: 122px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    padding: 0px 16px;
    color: rgba(0,0,0,1) !important;
    margin-left: 16px;
    margin-right: 0px;
    height: 40px;

    &.new-delivery {
      padding: 8px 16px;
      background: #307460;
      color: white !important;
    }
  }
`;

const SearchInput = styled(Input)`
  &.ui.input.novo-search {
    // border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    height: 40px;
    width: 240px;
  }
`;

const NovoTable = styled(Table)`
  &.ui.basic.table.novo-table td {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    padding-top: 32px;
    padding-bottom: 32px;

    /* &.actions-cell {
      color: black;
      display: flex;
    } */
  }
`;

const TableCell = styled(Table.Cell)`
  &.ui.basic.table .novo-cell {
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CellLabel = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.5);
`;

const IconImg = styled.img`
  width: 20px;
  margin-left: 10px;
`;

const DeliveriesTable = ({ dataset }) => {
  return (
    <NovoTable basic="very" className="novo-table">
      <Table.Body>
        {dataset.map((item) => (
          <Table.Row>
            <TableCell>
              <CellLabel>Status</CellLabel>
              {item.status}
            </TableCell>

            <TableCell>
              <CellLabel>Order ID</CellLabel>
              {item.orderId}
            </TableCell>
            <TableCell>
              <CellLabel>Technician</CellLabel>
              {item.technician}
            </TableCell>
            <TableCell>
              <CellLabel>Platfggorm</CellLabel>
              {item.platform}
            </TableCell>
            <TableCell>
              <CellLabel>Drone</CellLabel>
              {item.drone}
            </TableCell>
            <TableCell>
              <CellLabel>Technician Check</CellLabel>
              {item.technicianCheck}
            </TableCell>

            <TableCell collapsing>
              <ActionsContainer>
                <AppButton basic className="ui button app-button">
                  Details
                  <IconImg src={sidebarIcon} />
                </AppButton>
                <Dropdown />
              </ActionsContainer>
            </TableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </NovoTable>
  );
};


const Landing = () => {
  const user = useSelector(state => {
    console.log("Initial State:", state);
    return state.user;
  });

  // if (!user) {
  //   return <Redirect to="/sign-in" />;
  // }

  const dataset = [
    { status: "ready", orderId: "009-300FCT", technician: "Ben Santana", platform: "gamma", drone: "DJI-004Q", technicianCheck: "passed" },
    { status: "ready", orderId: "009-300FCT", technician: "Ben Santana", platform: "gamma", drone: "DJI-004Q", technicianCheck: "passed" },
    { status: "ready", orderId: "009-300FCT", technician: "Ben Santana", platform: "gamma", drone: "DJI-004Q", technicianCheck: "passed" },
    { status: "ready", orderId: "009-300FCT", technician: "Ben Santana", platform: "gamma", drone: "DJI-004Q", technicianCheck: "passed" },
    { status: "ready", orderId: "009-300FCT", technician: "Ben Santana", platform: "gamma", drone: "DJI-004Q", technicianCheck: "passed" },
  ];

  return (
    <FlexContainer>
      <Appbar>
        <CompanyName>Dronocargo</CompanyName>
        <UserName>
          Regina Zepeda
          <img style={{ marginLeft: "10px", opacity: 0.5, }} src={userIcon} alt="user icon" />
          {/* <Icon style={{ marginLeft: "10px", opacity: 0.5, }} name='user circle outline' size='large' /> */}
        </UserName>
      </Appbar>
      <HeaderContainer>
        <HeaderTitle>
          Delivery
          <HeaderSub>History</HeaderSub>
        </HeaderTitle>
        <HeaderActions>
          <SearchInput size="big" icon='search' iconPosition='left' placeholder='Search users...' className="novo-search" />
          <AppButton size='medium' className="ui button app-button new-delivery">New Delivery</AppButton>
        </HeaderActions>
      </HeaderContainer>
      <MainContent>
        <DeliveriesTable dataset={dataset} />
      </MainContent>
      <FooterContainer>
        <FooterText>
          Powered by Nuvocargo
        </FooterText>
        <FooterText>Help</FooterText>
      </FooterContainer>
    </FlexContainer>
  )
};

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const printState = useSelector(state => {
    console.log("PrintState:", state);
});

  useEffect(() => {
    console.log("Use Effect has run!");
    dispatch(authActions.fetchUser("Test passing arguments."));
  }, [dispatch, user]);

  // const classes = useStyles();

  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
      </BrowserRouter>
    </div>
  );
}
