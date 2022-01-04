// React Imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route, Link,  useNavigate, useParams, Outlet } from 'react-router-dom';

// Firebase
import { auth } from "../services/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";



// Local components
import Dropdown from "./Dropdown";
import NewDeliveryModal from "./NewDeliveryModal";
import AppButton from "./AppButton";

// CSS Assets
import '../styles/index.css';
import '../styles/App.css';
import 'semantic-ui-css/semantic.min.css';

// UI Componenents
import { Icon, Confirm, Image, Input, Segment, Table } from 'semantic-ui-react'

// Actions
import { fetchDeliveries, commitDelivery, deleteDelivery } from "../store/deliveries-actions";
import { firebaseSignIn } from "../store/auth-actions";

// Assets
import userIcon from "../images/user.svg";
import sidebarIcon from "../images/sidebar-icon.svg";

// Styles
import styled from 'styled-components';
import DeliveryForm from "./DeliveryForm";

const FlexContainer = styled.div`
  display: flex;
  padding: 24px 32px;
  min-height: 100vh;
  flex-direction: column;
`;

const AppbarContainer = styled.div`
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
  align-items: center;
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
  line-height: 40px;
`;

const HeaderSub = styled.span`
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
  flex: 1;
  margin-bottom: 40px;
`;

const Footer = styled.div`
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

const SearchInput = styled(Input)`
  &.ui.input.novo-search {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteItem, setDeleteItem] = useState({ show: false });

  return (
    <>
      <NovoTable basic="very" className="novo-table">
        <Table.Body>
          {dataset.map((item) => (
            <Table.Row key={item.orderId}>
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
                {item.check || "pending"}
              </TableCell>
              <TableCell collapsing>
                <ActionsContainer>
                  <AppButton
                    style={{ marginRight: 16 }}
                    as={Link}
                    to={`/shipment/${item.orderId}`}
                  >
                    Details
                    <IconImg src={sidebarIcon} />
                  </AppButton>
                  <Dropdown
                    text="Some  Actions"
                    options={[
                      {text: "Edit", value: "edit"},
                      {text: "Delete", value: "delete"},
                    ]}
                    onClick={(action) => {
                      switch (action.value) {
                        case "edit":
                          return navigate(`/shipment/${item.orderId}`);
                        case "delete":
                          return setDeleteItem({ id: item.id, show: true });
                        default:
                          break;
                      }
                    }}
                  />
                </ActionsContainer>
              </TableCell>
            </Table.Row>
          ))}
        </Table.Body>

      </NovoTable>
      <Confirm
        open={deleteItem.show}
        content={<HeaderTitle style={{ padding: 30 }}>Are you sure?</HeaderTitle>}
        cancelButton={<AppButton className="ui button app-button" style={{ display: "inline-block "}}>Cancel</AppButton>}
        confirmButton={<AppButton className="ui button app-button new-delivery" style={{ display: "inline-block "}}>Delete</AppButton>}
        onCancel={() => setDeleteItem({ ...deleteItem, show: false })}
        onConfirm={() => {
          dispatch(deleteDelivery(deleteItem.id)).then(() => {
            setDeleteItem({ show: false });
          });
        }}
      />
    </>
  );
};

const provider = new GoogleAuthProvider();
const Appbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user)

  if (!user) {
    return (
      <AppbarContainer>
        <CompanyName>Dronocargo</CompanyName>
        <AppButton
          className="ui button app-button new-delivery"
          onClick={() => {
            signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              // jconst credential = GoogleAuthProvider.credentialFromResult(result);
              // jconst token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // console.log("User Info:", user);
              dispatch(firebaseSignIn(user));
              // ...
            }).catch((error) => {
              // Handle Errors here.
              // jconst errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              // jconst email = error.email;
              // The AuthCredential type that was used.
              // jconst credential = GoogleAuthProvider.credentialFromError(error);
              console.error("The Error:", errorMessage);
              // ...
            });
          }}
        >
          Login with google
        </AppButton>
      </AppbarContainer>
    );
  }

  return (
    <AppbarContainer>
      <CompanyName>Dronocargo</CompanyName>
      <UserName>
        {user.displayName}

        {user.photoURL ? (
          <Image style={{marginLeft: "10px"}} src={user.photoURL} avatar />
        ) : (
          <img style={{marginLeft: "10px", opacity: 0.5}} src={userIcon} alt="user icon" />
        )}

        <Icon
          name="sign out"
          size="large"
          alt="Sign Out"
          style={{cursor: "pointer"}}
          onClick={() => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
                dispatch(signOut());
              })
              .catch((error) => {
                console.log("Sign out error:", error);
                // An error happened.
              });
          }}
        />
      </UserName>
    </AppbarContainer>
  );
}

const Landing = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deliveries = useSelector(state => {
    return state.deliveries?.items;
  });

  useEffect(() => {
    if (deliveries == null) {
      dispatch(fetchDeliveries());
    }
  }, []);

  const dataset = () => (deliveries || []);

  return (
    <>
      <HeaderContainer>
        <HeaderTitle>
          Delivery
          <HeaderSub>History</HeaderSub>
        </HeaderTitle>
        <HeaderActions>
          <SearchInput
            size="big"
            icon="search"
            iconPosition="left"
            placeholder="Search"
            className="novo-search"
          />
          <AppButton className="ui button app-button new-delivery" onClick={() => setIsModalOpen(true)}>
            New Delivery
          </AppButton>
        </HeaderActions>
      </HeaderContainer>

      <DeliveriesTable dataset={dataset()} />

      <NewDeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      />
    </>
  );
};

const OrderDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const delivery = useSelector(state => state.deliveries?.items?.find(item => item.orderId === params.orderId ));

  useEffect(() => {
    if (delivery) {
      return;
    }

    navigate("/");
  }, []);

  return (
    <>
      <HeaderContainer>
        <HeaderTitle>
          Delivery
          <HeaderSub>Details</HeaderSub>
        </HeaderTitle>
      </HeaderContainer>

      <Segment compact loading={delivery.loading}>
        <DeliveryForm
          delivery={delivery}
          onDone={(values) => {
            dispatch(commitDelivery({...values, id: delivery.id})).then(() => {
              navigate("/");
            });
          }}
          onCancel={() => {
            navigate("/");
          }}
        />
      </Segment>
    </>
  );
}

const SharedLayout = () => {
  const dispatch = useDispatch();
  const [firebaseUser] = useAuthState(auth);
  // const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(firebaseSignIn(firebaseUser));
  }, [dispatch, firebaseUser]);

  return (
    <FlexContainer>
      <Appbar />

      <MainContent>
        <Outlet />
      </MainContent>

      <Footer>
        <FooterText>Powered by Nuvocargo</FooterText>
        <FooterText>Help</FooterText>
      </Footer>
    </FlexContainer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/shipment/:orderId" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}