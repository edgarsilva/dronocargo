import React from "react";
import { Button } from "semantic-ui-react";

// Styles
import styled from 'styled-components';

const StyledButton = styled(Button)`
  &.ui.button.app-button {
    background-color: transparent;
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

const AppButton = (props) => {
  // const [open, setOpen] = React.useState(false);

  return <StyledButton {...props} className={`ui button app-button ${props.className}`} />;
}

export default AppButton;