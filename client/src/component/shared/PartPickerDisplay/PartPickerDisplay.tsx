import { Tooltip } from 'antd';
import classnames from 'classnames';
import React, { Component } from 'react';

const style = require('./PartPickerDisplay.m.less');

interface Props {
  className?: string;
  isHybrid: boolean;
  isComplexHybrid: boolean;
  selected?: Parts;
  onSelectedPartChange?: (part: Parts) => void;
}

/* tslint:disable:max-line-length */

class PartPickerDisplay extends Component<Props> {
  private handleHeadClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('head');
    }
  }
  private handleBodyClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('body');
    }
  }
  private handleUpperBodyClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('upperBody');
    }
  }
  private handleLowerBodyClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('lowerBody');
    }
  }
  private handleRightUpperArmClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('rightUpperArm');
    }
  }
  private handleRightLowerArmClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('rightLowerArm');
    }
  }
  private handleRightHandClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('rightHand');
    }
  }
  private handleLeftUpperArmClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('leftUpperArm');
    }
  }
  private handleLeftLowerArmClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('leftLowerArm');
    }
  }
  private handleLeftHandClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('leftHand');
    }
  }
  private handleRightUpperLegClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('rightUpperLeg');
    }
  }
  private handleRightLowerLegClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('rightLowerLeg');
    }
  }
  private handleRightFootClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('rightFoot');
    }
  }
  private handleLeftUpperLegClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('leftUpperLeg');
    }
  }
  private handleLeftLowerLegClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('leftLowerLeg');
    }
  }
  private handleLeftFootClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('leftFoot');
    }
  }
  private handleExtraClick = () => {
    const { onSelectedPartChange } = this.props;
    if (onSelectedPartChange) {
      onSelectedPartChange('extraParts');
    }
  }

  render() {
    const { isHybrid, isComplexHybrid, selected, onSelectedPartChange, className } = this.props;
    return (
      <div className={classnames(style.root, className)}>
        <div className={style.rightMarker}>R</div>
        <div className={style.leftMarker}>L</div>

        {!isComplexHybrid && (
          <Tooltip title="Edit Body">
            <div
              className={style.body}
              onClick={this.handleBodyClick}
            ></div>
          </Tooltip>
        )}

        <Tooltip title="Edit Head">
          <div
            className={`${style.head} selectable ${selected === 'head' ? 'selected' : ''}`}
            onClick={this.handleHeadClick}
          ></div>
        </Tooltip>

        <Tooltip title="Edit Upper Body">
          <div
            className={`${style.upperBody} selectable ${selected === 'upperBody' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleUpperBodyClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Lower Body">
          <div
            className={`${style.lowerBody} selectable ${selected === 'lowerBody' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleLowerBodyClick}
          ></div>
        </Tooltip>

        <Tooltip title={isComplexHybrid ? 'Edit Upper Right Arm' : 'Edit Body'}>
          <div
            className={`${style.rightUpperArm} selectable ${selected === 'rightUpperArm' || selected === 'body' ? 'selected' : ''}`}
            onClick={isComplexHybrid ? this.handleRightUpperArmClick : this.handleBodyClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Lower Right Arm">
          <div
            className={`${style.rightLowerArm} selectable ${selected === 'rightLowerArm' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleRightLowerArmClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Right Hand">
          <div
            className={`${style.rightHand} selectable ${selected === 'rightHand' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleRightHandClick}
          ></div>
        </Tooltip>

        <Tooltip title={isComplexHybrid ? 'Edit Upper Left Arm' : 'Edit Body'}>
          <div
            className={`${style.leftUpperArm} selectable ${selected === 'leftUpperArm' || selected === 'body' ? 'selected' : ''}`}
            onClick={isComplexHybrid ? this.handleLeftUpperArmClick : this.handleBodyClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Lower Left Arm">
          <div
            className={`${style.leftLowerArm} selectable ${selected === 'leftLowerArm' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleLeftLowerArmClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Left Hand">
          <div
            className={`${style.leftHand} selectable ${selected === 'leftHand' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleLeftHandClick}
          ></div>
        </Tooltip>

        <Tooltip title="Edit Upper Right Leg">
          <div
            className={`${style.rightUpperLeg} selectable ${selected === 'rightUpperLeg' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleRightUpperLegClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Lower Right Leg">
          <div
            className={`${style.rightLowerLeg} selectable ${selected === 'rightLowerLeg' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleRightLowerLegClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Right Foot">
          <div
            className={`${style.rightFoot} selectable ${selected === 'rightFoot' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleRightFootClick}
          ></div>
        </Tooltip>

        <Tooltip title="Edit Upper Left Leg">
          <div
            className={`${style.leftUpperLeg} selectable ${selected === 'leftUpperLeg' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleLeftUpperLegClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Lower Left Leg">
          <div
            className={`${style.leftLowerLeg} selectable ${selected === 'leftLowerLeg' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleLeftLowerLegClick}
          ></div>
        </Tooltip>
        <Tooltip title="Edit Left Foot">
          <div
            className={`${style.leftFoot} selectable ${selected === 'leftFoot' || selected === 'body' ? 'selected' : ''}`}
            onClick={this.handleLeftFootClick}
          ></div>
        </Tooltip>

        <Tooltip title="Edit Accessories and Extra Parts">
          <div
            className={`${style.extraParts} selectable ${selected === 'extraParts' ? 'selected' : ''}`}
            onClick={this.handleExtraClick}
          >Extra</div>
        </Tooltip>
      </div>
    );
  }
}

export default PartPickerDisplay;
