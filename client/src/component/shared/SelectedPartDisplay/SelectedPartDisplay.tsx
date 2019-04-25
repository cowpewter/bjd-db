import FaIcon from '@component/shared/FaIcon';
import { UserPartData } from '@component/shared/PartPicker';
import { isArray, startCase } from 'lodash';
import React, { Component } from 'react';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');

interface Props {
  parts?: UserPartData | UserPartData[];
  selectedPart: Parts;
  className?: string;
  onRemoveItem: (item: UserPartData) => void;
}

const partToString = (part?: UserPartData) => {
  if (!part || !part.part || !part.company || !part.resinColor) {
    return 'None';
  }
  return `${part.company.name}
    ${part.part.name}
    (${part.resinColor.name} - ${part.resinColor.type})`;
};

class SelectedPartDisplay extends Component<Props> {
  private handleRemove = (index: number) => {
    const { onRemoveItem, parts } = this.props;
    console.log('remove', parts);
    if (!parts) {
      return;
    }
    if (isArray(parts)) {
      onRemoveItem(parts[index]);
    } else {
      onRemoveItem(parts);
    }
  }

  render() {
    const { className, parts: propParts, selectedPart } = this.props;
    const parts: UserPartData[] = isArray(propParts) ? propParts : (propParts ? [propParts] :[]);

    if (!parts.length) {
      return <h3>{`Selecting ${startCase(selectedPart)}:`}</h3>;
    }

    return (
      <div className={className}>
        <h3>Selected {startCase(selectedPart)}:</h3>
        {parts.map((part, index) => (
          <p key={index}>{partToString(part)}&nbsp;
            <a className={sharedStyle.subtitle} onClick={() => this.handleRemove(index)}>
              <FaIcon type="light" icon="times" /> remove
            </a>
          </p>
        ))}
      </div>
    );
  }
}

export default SelectedPartDisplay;
