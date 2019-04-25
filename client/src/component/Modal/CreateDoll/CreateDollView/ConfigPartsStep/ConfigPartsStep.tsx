import Errors from '@component/shared/Errors';
import PartPicker, { bodyParts, UserPartData } from '@component/shared/PartPicker';
import PartPickerDisplay from '@component/shared/PartPickerDisplay';
import ScaleSelector from '@component/shared/ScaleSelector';
import SelectedPartDisplay from '@component/shared/SelectedPartDisplay';
import { CreateDollConfigOutput } from '@store/query/CreateDollConfiguration';
import { Button, Checkbox, Input, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import { findIndex, isEqual, startCase } from 'lodash';
import React, { ChangeEvent, Component, Fragment, SyntheticEvent } from 'react';
import { MutationFn } from 'react-apollo';
import { isArray } from 'util';

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
  extraParts: UserPartData[];
}

interface Props {
  nextStep: (dollConfigId: string) => void;
  closeModal: MutationFn<null>;
  configParts: MutationFn<CreateDollConfigOutput>;
  dollId?: string;
  wishlistId?: string;
  form: WrappedFormUtils;
}

interface State {
  isHybrid: boolean;
  isComplexHybrid: boolean;
  height?: number;
  scale: DollScaleType;
  errorMsgs: string[];
  loading: boolean;
  skipConfirm: boolean;
  selectedPart: Parts;

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
    skipConfirm: false,
    selectedPart: 'head',
    scale: '1/3',
    height: undefined,
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
      extraParts: [],
    },
  };

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.form.validateFields(async (err, values) => {
      const { parts, skipConfirm, scale, height, isHybrid, isComplexHybrid } = this.state;
      const { wishlistId, dollId } = this.props;

      if (!err) {
        const missingParts: string[] = [];
        if (!parts.head) {
          missingParts.push('Head');
        }
        if (!parts.body) {
          bodyParts.forEach((part) => {
            if (!parts[part]) {
              missingParts.push(startCase(part));
            }
          });
        }

        if (missingParts.length && !skipConfirm) {
          Modal.confirm({
            title: 'Are you sure?',
            content: (
              <Fragment>
                <p>Your doll is missing the following parts:</p>
                <ul>
                  {missingParts.map((part, index) => <li key={index}>{part}</li>)}
                </ul>
                <p>Do you still want to save this configuration?</p>
              </Fragment>
            ),
            onOk: () => {
              this.setState({ skipConfirm: true });
              setTimeout(this.handleSubmit, 0);
            },
            okText: 'Save',
            onCancel: () => {},
          });
          return;
        }

        const data: any = {
          dollId,
          height,
          scale,
          hybridType: isComplexHybrid ? 'complex' : (isHybrid ? 'simple' : 'none'),
          parts: {},
        };
        Object.keys(parts).forEach((partType) => {
          const part = parts[partType];
          if (isArray(part)) {
            data.parts[partType] = [];
            part.forEach((p) => {
              data.parts[partType].push({
                wishlistId,
                id: p.id,
                dollPartId: p.part.id,
                resinColorId: p.resinColor.id,
                artistId: p.artist ? p.artist.id : undefined,
              });
            });
          } else {
            data.parts[partType] = part ? {
              wishlistId,
              id: part.id,
              dollPartId: part.part.id,
              resinColorId: part.resinColor.id,
              artistId: part.artist ? part.artist.id : undefined,
            } : undefined;
          }
        });

        this.props.configParts({ variables: { data } })
          .then((resp) => {
            console.warn(resp);
            if (resp && resp.data) {
              if (wishlistId) {
                this.props.closeModal();
              } else {
                this.props.nextStep(resp.data.createDollConfiguration.id);
              }
            } else {
              const errorMsgs = ['An unexpected error occurred'];
              this.setState({ errorMsgs });
            }
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
    if (!newValue && selectedPart !== 'head' && selectedPart !== 'extraParts') {
      newState.selectedPart = 'body';
    }
    if (newValue && selectedPart === 'body') {
      newState.selectedPart = 'upperBody';
    }
    this.setState(newState);
  }

  private handleHeightChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(ev.target.value, 10);
    this.setState({ height: newValue });
  }

  private handleScaleChange = (value: string) => {
    const { parts, scale } = this.state;
    if ((parts.head || parts.body || parts.upperBody || parts.lowerBody || parts.rightUpperArm ||
      parts.rightLowerArm || parts.rightHand || parts.leftUpperArm || parts.leftLowerArm ||
      parts.leftHand || parts.rightUpperLeg || parts.rightLowerLeg || parts.rightFoot ||
      parts.leftUpperLeg || parts.leftLowerLeg || parts.leftFoot || parts.extraParts.length) &&
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
        extraParts: [],
      },
      scale: newScale,
    });
  }

  private handleSelectedPartChange = (part: Parts) => {
    this.setState({ selectedPart: part });
  }

  private handleRemoveItem = (part: UserPartData) => {
    const { parts, selectedPart } = this.state;
    if (selectedPart === 'extraParts') {
      const index = findIndex(parts.extraParts, item => isEqual(item, part));
      parts.extraParts.splice(index, 1);
    } else {
      parts[selectedPart] = undefined;
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
    if (selectedPart === 'extraParts') {
      parts.extraParts.push(newPart);
    } else {
      parts[selectedPart] = newPart;
    }
    this.setState({ parts });
  }

  public render() {
    const { dollId, wishlistId } = this.props;
    const { loading, errorMsgs, isHybrid, isComplexHybrid, selectedPart, scale } = this.state;
    const { getFieldDecorator } = this.props.form;
    const parts = this.state.parts[selectedPart];

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
            {wishlistId ? 'Finish' : 'Next'}
          </Button>,
        ]}
      >
        <Errors errors={errorMsgs} />

        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <div className={style.optionsWrapper}>
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
            <div className={style.measurementsWrapper}>
              <Form.Item label="Doll Scale">
                {getFieldDecorator('scale', {
                  initialValue: scale,
                })(
                  <ScaleSelector onChange={this.handleScaleChange} />,
                )}
              </Form.Item>
              <Form.Item label="Doll's Height (in cm)">
                {getFieldDecorator('height')(
                  <Input
                    type="number"
                    onChange={this.handleHeightChange}
                  />,
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
            <SelectedPartDisplay
              selectedPart={selectedPart}
              parts={parts}
              onRemoveItem={this.handleRemoveItem}
            />
            {(!parts || selectedPart === 'extraParts') && (
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
