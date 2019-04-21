import Errors from '@component/shared/Errors';
import PartPicker, { UserPartData } from '@component/shared/PartPicker';
import PartPickerDisplay from '@component/shared/PartPickerDisplay';
import ScaleSelector from '@component/shared/ScaleSelector';
import SelectedPartDisplay from '@component/shared/SelectedPartDisplay';
import { DollConfiguration } from '@store/type/DollConfiguration';
import { UserPart } from '@store/type/UserPart';
import { Button, Checkbox, Input, Modal, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import { findIndex, isEqual } from 'lodash';
import React, { Component, SyntheticEvent } from 'react';
import { MutationFn } from 'react-apollo';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');
const style = require('./ConfigPartsStep.m.less');

export interface BodyParts {
  [key: string]: UserPartData | UserPartData[] | undefined;
  head?: UserPartData;
  body?: UserPartData;
  upperBody?: UserPartData;
  lowerBody?: UserPartData;
  rightUpperArm?: UserPartData;
  rightLowerArm?: UserPartData;
  rightHand?: UserPartData;
  leftUpperArm?: UserPartData;
  leftLowerArm?: UserPartData;
  leftHand?: UserPartData;
  rightUpperLeg?: UserPartData;
  rightLowerLeg?: UserPartData;
  rightFoot?: UserPartData;
  leftUpperLeg?: UserPartData;
  leftLowerLeg?: UserPartData;
  leftFoot?: UserPartData;
  accessory: UserPartData[];
}

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
  scale: DollScaleType;

  parts: BodyParts;
}

const handleFieldsChange = ({ form }: any, changedValue: any) => {
  if (changedValue.isHybrid && !changedValue.isHybrid.value) {
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
    scale: '1/3',
    parts: {
      head: undefined,
      body: undefined,
      upperBody: undefined,
      lowerBody: undefined,
      rightUpperArm: undefined,
      rightLowerArm: undefined,
      rightHand: undefined,
      leftUpperArm: undefined,
      leftLowerArm: undefined,
      leftHand: undefined,
      rightUpperLeg: undefined,
      rightLowerLeg: undefined,
      rightFoot: undefined,
      leftUpperLeg: undefined,
      leftLowerLeg: undefined,
      leftFoot: undefined,
      accessory: [],
    },
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
          .catch((errors) => {
            const errorMsgs: string[] = [];
            if (errors.graphQLErrors) {
              errors.graphQLErrors.forEach((error: GraphQLError) => {
                if (error.message) {
                  errorMsgs.push(error.message);
                }
                if (error.extensions) {
                  const { validationErrors } = error.extensions.exception;
                  const fieldData: any = {};
                  if (validationErrors) {
                    Object.keys(validationErrors).forEach((fieldName) => {
                      fieldData[fieldName] = {
                        errors: [new Error(validationErrors[fieldName])],
                        value: values[fieldName],
                      };
                    });
                  }
                  this.props.form.setFields(fieldData);
                }
              });
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

  private handleScaleChange = (value: string) => {
    const { parts, scale } = this.state;
    if ((parts.head || parts.body || parts.upperBody || parts.lowerBody || parts.rightUpperArm ||
      parts.rightLowerArm || parts.rightHand || parts.leftUpperArm || parts.leftLowerArm ||
      parts.leftHand || parts.rightUpperLeg || parts.rightLowerLeg || parts.rightFoot ||
      parts.leftUpperLeg || parts.leftLowerLeg || parts.leftFoot || parts.accessory.length) &&
      scale !== value
    ) {
      Modal.confirm({
        title: 'Are you sure?',
        content: "Changing your doll's scale will reset all your parts. Are you sure?",
        onOk: () => this.doChangeScale(value as DollScaleType),
        onCancel: () => {},
      });
      return;
    }
    if (scale !== value) {
      this.doChangeScale(value as DollScaleType);
    }
  }

  private doChangeScale = (newScale: DollScaleType) => {
    this.setState({
      parts: {
        head: undefined,
        body: undefined,
        upperBody: undefined,
        lowerBody: undefined,
        rightUpperArm: undefined,
        rightLowerArm: undefined,
        rightHand: undefined,
        leftUpperArm: undefined,
        leftLowerArm: undefined,
        leftHand: undefined,
        rightUpperLeg: undefined,
        rightLowerLeg: undefined,
        rightFoot: undefined,
        leftUpperLeg: undefined,
        leftLowerLeg: undefined,
        leftFoot: undefined,
        accessory: [],
      },
      scale: newScale,
    });
  }

  private handleSelectedPartChange = (part: Parts) => {
    this.setState({ selectedPart: part });
  }

  private handleRemoveItem = (part: UserPartData) => {
    const { parts } = this.state;
    const selectedPart = part.part.type;
    if (selectedPart) {
      if (selectedPart === 'accessory') {
        const index = findIndex(parts.accessory, item => isEqual(item, part));
        parts.accessory.splice(index, 1);
      } else {
        parts[selectedPart] = undefined;
      }
    }
    this.setState({ parts });
  }

  private getCurrentCompany = () => {
    const { parts } = this.state;
    const { head, upperBody } = parts;
    if (head && head.company) {
      return head.company;
    }
    if (upperBody && upperBody.company) {
      return upperBody.company;
    }
    return undefined;
  }

  private handleSavePart = (newPart: UserPartData) => {
    const { parts, selectedPart } = this.state;
    parts[selectedPart] = newPart;
    this.setState({ parts });
  }

  public render() {
    const { dollId } = this.props;
    const { loading, errorMsgs, isHybrid, isComplexHybrid, selectedPart, scale } = this.state;
    const { getFieldDecorator } = this.props.form;
    const parts = this.state.parts[selectedPart];

    console.warn(this.state);

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
        Please refresh and go to the doll's page to define its parts.
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
          <div className={style.optionsWrapper}>
            <Form.Item label="Doll Scale" className={style.scale}>
              {getFieldDecorator('scale', {
                initialValue: scale,
              })(
                <ScaleSelector onChange={this.handleScaleChange} />,
              )}
            </Form.Item>
            <div className={style.hybridWrapper}>
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
            </div>
          </div>
        </Form>
        <div className={style.pickerWrapper}>
          <PartPickerDisplay
            className={style.pickerView}
            isHybrid={isHybrid}
            isComplexHybrid={isComplexHybrid}
            selected={selectedPart}
            onSelectedPartChange={this.handleSelectedPartChange}
          />
          <div>
            {parts && (
              <SelectedPartDisplay
                selectedPart={selectedPart}
                parts={parts}
                onRemoveItem={this.handleRemoveItem}
              />
            )}
            {(!parts || selectedPart === 'accessory') && (
              <PartPicker
                className={style.picker}
                scale={scale}
                partType={selectedPart}
                company={!isHybrid ? this.getCurrentCompany() : undefined}
                onSavePart={this.handleSavePart}
              />
            )}
          </div>
        </div>
      </Modal>
    );
  }
}

export default Form.create({
  name: 'configPartsStep',
  onFieldsChange: handleFieldsChange,
})(ConfigPartsStep);
