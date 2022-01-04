import React from "react";
import { useDispatch } from 'react-redux'

// Utilities
import _ from "lodash";

// UI Components
import { Modal } from "semantic-ui-react";

// Local Components
import DeliveryForm from "./DeliveryForm";

// Actions
import { addNewDelivery } from "../store/deliveries-actions";

// Assets
// import closeIcon from "../images/close.svg";

// Styles
// import styled from 'styled-components';

function NewDeliveryModal({ onClose, isOpen }) {
  const dispatch = useDispatch();

  return (
    <Modal onClose={onClose} open={isOpen} size="tiny">
      <DeliveryForm
        onClose={onClose}
        onCancel={onClose}
        onDone={(values) => {
          dispatch(addNewDelivery(values));
        }}
        doneButtonText="Create new delivery"
        title="New Delivery"
        description="Please select the order ID and a technician to deploy the cargo.  All elements are mandatory."
      />
    </Modal>
  );
}

export default NewDeliveryModal;