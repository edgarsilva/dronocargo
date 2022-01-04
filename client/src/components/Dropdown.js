// React, Reduc & React Router DOM imports
import {useState, useEffect, useRef} from "react";
import {CSSTransition} from "react-transition-group";

// Firebase Imports
// import {firebaseAuth, googleAuthProvider} from "../firebase";

// UI Componenents
import { Button, Icon } from 'semantic-ui-react'

// SVG Icons
// import { ReactComponent as BellIcon } from '../icons/bell.svg';
// import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
// import { ReactComponent as CaretIcon } from '../icons/caret.svg';
// import { ReactComponent as PlusIcon } from "../images/plus.svg";
// import { ReactComponent as CogIcon } from '../icons/cog.svg';
// import { ReactComponent as ArrowIcon } from "../images/arrow.svg";
// import { ReactComponent as BoltIcon } from "../images/bolt.svg";

// Actions
// import {authActions} from "../store/auth-slice";
// import {Divider} from "@material-ui/core";

// Styles
import styled from 'styled-components';
const DropdownContainer = styled.div`
  width: "100%";
  height: 40px;
  width: 100%;
  flex: 1 1 auto;
  background-color: "green";
`;

const AppButton = styled(Button)`
  &.ui.button.app-button {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    padding: 0px 16px;
    color: rgba(0,0,0,1) !important;
    height: 40px;
    margin: 0;

    &.new-delivery {
      padding: 8px 16px;
      background: #307460;
    }
  }
`;

function DropdownMenu({ leftAligned, options, onClick, selected }) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState("auto");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <div
        className={"menu-item" + (props.selected ? " selected" : "")}
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
          props.onClick?.();
        }}
      >
        { props.leftIcon && (
          <span className="icon-button">
            <Icon name={props.leftIcon}></Icon>
          </span>
        )}
        {props.children}
        <span className="icon-right"><Icon name={props.rightIcon}></Icon></span>
      </div>
    );
  }

  return (
    <div
      className={`dropdown ${leftAligned ? "left-aligned" : ""}`}
      style={{height: menuHeight}}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          { options.map((item, index) =>  (
            <DropdownItem
              selected={selected === item.value}
              key={item.id || item.orderId || index}
              leftIcon={item.icon}
              onClick={() => {
                onClick?.(item)
              }}
            >
              { item.text }
            </DropdownItem>
          ))}
        </div>
      </CSSTransition>

      {/* <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition> */}
    </div>
  );
}

const Dropdown = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DropdownContainer>
      <AppButton
        basic
        className="ui button app-button"
        onClick={(ev) => {
          setMenuOpen(!menuOpen);
        }}
      >
        {props.value || props.placeholder || "Actions"}
        <Icon name="chevron down" style={{marginLeft: "auto"}} />
      </AppButton>
      {menuOpen && (
        <DropdownMenu
          selected={props.value}
          leftAligned
          options={props.options}
          onClick={(action) => {
            props.onClick(action);
            setMenuOpen(false);
          }}
        ></DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default Dropdown;