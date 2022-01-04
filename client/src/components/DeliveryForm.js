import React from "react";
import { Formik, Field } from "formik";

// Utilities
import _ from "lodash";
import faker from "faker";
import shortid from "shortid";

// UI Components
import { Form, Input, Search } from "semantic-ui-react";

// Local Components
import AppButton from "./AppButton";
import Dropdown from "./Dropdown";

// Actions
// import { addNewDelivery } from "../store/deliveries-actions";

// Assets
import closeIcon from "../images/close.svg";

// Styles
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const Description = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 31px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #ccc;
`;

const FormInput = styled(Input)`
  background: #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const Label = styled.label`
  &.ui.form.field.nuvo-label {
    font-size: 14px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.5);
    padding: 2px 0;
    font-weight: normal;
  }
`;

const CloseIcon = styled.img`
  opacity: 0.4;
  height: 16px;
  margin-left: auto;
  cursor: pointer;
`;

const source = _.times(5, () => ({
  title: faker.fake("{{name.firstName}} {{name.lastName}}"),
  description: faker.company.catchPhrase(),
  image: `${faker.image.people()}?rnd=${shortid()}`
}));

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function searchReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

function DeliveryForm({ delivery = {}, onDone, onClose, onCancel, ...props }) {
  const [state, dispatch] = React.useReducer(searchReducer, { ...initialState, value: delivery.technician || "" });
  const { loading, results, value } = state;

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.title)

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      })
    }, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Formik
      initialValues={{
        status: delivery.status || "ready",
        orderId: delivery.orderId || "",
        platform: delivery.platform || "",
        drone: delivery.drone || "",
        technician: delivery.technician || "",
        check: delivery.check || "",
      }}
    >
      {({ values, setFieldValue, submitForm }) => (
        <Content>
          <Title>
            { props.title }
            { onClose && (
              <CloseIcon
                src={closeIcon}
                alt="user icon"
                onClick={onClose}
              />
            )}
          </Title>

          { props.description && (
            <Description>{props.description}</Description>
          )}

          <Form>
            <Form.Group widths="equal" style={{marginBottom: "32px"}}>
              <Form.Field>
                <Label className="ui form field nuvo-label">Order ID</Label>
                <Field name="orderId" as={FormInput} />
              </Form.Field>

              <Form.Field>
                <Label className="ui form field nuvo-label">Technician</Label>
                {/* <Field name="technician" as={FormInput} /> */}
                <Search
                  as={FormInput}
                  name="technician"
                  loading={loading}
                  onResultSelect={(e, data) => {
                    dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title });
                    setFieldValue("technician", data.result.title);
                  }}
                  onSearchChange={handleSearchChange}
                  results={results}
                  value={value}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal" style={{marginBottom: "32px"}}>
              <Form.Field>
                <Label className="ui form field nuvo-label">Platform</Label>
                <Dropdown
                  value={values.platform}
                  text="Platform"
                  options={[
                    {text: "Alpha", value: "alpha"},
                    {text: "Beta", value: "beta"},
                    {text: "Gama", value: "gamma"},
                    {text: "Tetha", value: "tetha"},
                  ]}
                  onClick={(action) => {
                    setFieldValue("platform", action.text);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Label className="ui form field nuvo-label">Drone</Label>
                <Dropdown
                  value={values.drone}
                  text="Drone"
                  options={[
                    {text: "DJI-001Q", value: "DJI-001Q"},
                    {text: "DJI-002Q", value: "DJI-002Q"},
                    {text: "DJI-003Q", value: "DJI-003Q"},
                    {text: "DJI-004Q", value: "DJI-004Q"},
                  ]}
                  onClick={(action) => {
                    setFieldValue("drone", action.value);
                  }}
                />
              </Form.Field>
            </Form.Group>
            {/* <pre>
              { JSON.stringify(values, null, 2) }
            </pre> */}
          </Form>
          <Actions style={{backgroundColor: "transparent"}}>
            <AppButton basic onClick={onCancel}>
              Cancel
            </AppButton>
            <AppButton className="new-delivery"
              onClick={() => onDone(values)}
            >
              { props.doneButtonText || "Done" }
            </AppButton>
          </Actions>
        </Content>
      )}
    </Formik>
  );
}

export default DeliveryForm;