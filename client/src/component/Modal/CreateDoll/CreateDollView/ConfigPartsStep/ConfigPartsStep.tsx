import Errors from '@component/shared/Errors';
import PartPickerDisplay from '@component/shared/PartPickerDisplay';
import { DollConfiguration } from '@store/type/DollConfiguration';
import { Button, Checkbox, Input, Modal, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import React, { Component, SyntheticEvent } from 'react';
import { MutationFn } from 'react-apollo';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');
// const style = require('./ConfigPartsStep.m.less');

interface Props {
  nextStep: () => void;
  closeModal: MutationFn<null>;
  configParts: MutationFn<DollConfiguration>;
  dollId?: string;
  form: WrappedFormUtils;
}

interface State {
  isHybrid: boolean;
  isComplexHybrid: boolean;
  errorMsgs: string[];
  loading: boolean;
  selectedPart: Parts;
}

const handleFieldsChange = ({ form }: any, changedValue: any) => {
  console.warn('change', changedValue);
  if (changedValue.isHybrid && !changedValue.isHybrid.value) {
    console.warn('hey');
    form.setFieldsValue({ isComplexHybrid: false });
  }
};

class ConfigPartsStep extends Component<Props, State> {
  state: State = {
    isHybrid: false,
    isComplexHybrid: false,
    errorMsgs: [],
    loading: false,
    selectedPart: 'head',
  };

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.form.validateFields(async (err, values) => {
      console.warn(values);
      if (!err) {
        const data = {

        };
        this.props.configParts({ variables: { data } })
          .then(() => {
            this.props.nextStep();
          })
          .catch((error) => {
            const errorMsgs: string[] = [];
            if (error.graphQLErrors) {
              error.graphQLErrors.forEach((error: GraphQLError) => {
                if (error.message) {
                  errorMsgs.push(error.message);
                }
              });
              if (error.extensions) {
                const { validationErrors } = error.extensions.exception;
                const fieldData: any = {};
                Object.keys(validationErrors).forEach((fieldName) => {
                  fieldData[fieldName] = {
                    errors: [new Error(validationErrors[fieldName])],
                    value: values[fieldName],
                  };
                });
                this.props.form.setFields(fieldData);
              }
            }
            this.setState({ errorMsgs });
          });
      }
    });
  }

  private handleCancel = () => {
    this.props.closeModal();
  }

  private handleHybridChange = (ev: CheckboxChangeEvent) => {
    this.setState({ isHybrid: !!(ev.target && ev.target.checked) });
  }

  private handleComplexHybridChange = (ev: CheckboxChangeEvent) => {
    const { selectedPart } = this.state;
    const newValue = ev.target && ev.target.checked;
    const newState: any = {
      isComplexHybrid: newValue,
    };
    if (!newValue && selectedPart !== 'head' && selectedPart !== 'accessory') {
      newState.selectedPart = 'body';
    }
    if (newValue && selectedPart === 'body') {
      newState.selectedPart = 'upperBody';
    }
    this.setState(newState);
  }

  private handleSelectedPartChange = (part: Parts) => {
    this.setState({ selectedPart: part });
  }

  public render() {
    const { dollId } = this.props;
    const { loading, errorMsgs, isHybrid, isComplexHybrid, selectedPart } = this.state;
    const { getFieldDecorator } = this.props.form;

    if (!dollId) {
      return (
        <Modal
        title="Configure Parts"
        visible={true}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" type="primary" onClick={this.handleCancel}>
            Close
          </Button>,
        ]}
        >
        An unexpected error has occurred.
        Please refresh and go to the doll's page to set its parts configuration
        </Modal>
      );
    }

    return (
      <Modal
        title="Configure Parts"
        visible={true}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>
            Skip
          </Button>,
          <Button key="create" type="primary" loading={loading} onClick={this.handleSubmit}>
            Next
          </Button>,
        ]}
      >
        <Errors errors={errorMsgs} />

        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('isHybrid', { valuePropName: 'checked' })(
              <Checkbox onChange={this.handleHybridChange}>
                This doll is a hybrid
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isComplexHybrid', { valuePropName: 'checked' })(
              <Checkbox
                onChange={this.handleComplexHybridChange}
                disabled={!isHybrid}
              >
                This doll is a complex hybrid
              </Checkbox>,
            )}
          </Form.Item>
        </Form>
        <PartPickerDisplay
          isHybrid={isHybrid}
          isComplexHybrid={isComplexHybrid}
          selected={selectedPart}
          onSelectedPartChange={this.handleSelectedPartChange}
        />
      </Modal>
    );
  }
}

export default Form.create({
  name: 'configPartsStep',
  onFieldsChange: handleFieldsChange,
})(ConfigPartsStep);
