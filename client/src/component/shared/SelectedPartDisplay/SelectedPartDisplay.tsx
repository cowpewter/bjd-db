import FaIcon from '@component/shared/FaIcon';
import { UserPartData } from '@component/shared/PartPicker';
import { isArray, startCase } from 'lodash';
import React, { Component } from 'react';

interface Props {
  parts: UserPartData | UserPartData[];
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
    if (isArray(parts)) {
      onRemoveItem(parts[index]);
    } else {
      onRemoveItem(parts);
    }
  }

  render() {
    const { className, parts: propParts, selectedPart } = this.props;
    const parts: UserPartData[] = isArray(propParts) ? propParts : [propParts];

    return (
      <div className={className}>
        <h3>Selected {startCase(selectedPart)}:</h3>
        {parts.map((part, index) => (
          <p key={index}>{partToString(part)}&nbsp;
            <span className="subtitle" onClick={() => this.handleRemove(index)}>
              <FaIcon type="light" icon="times" /> remove
            </span>
          </p>
        ))}
      </div>
    );
  }
}

export default SelectedPartDisplay;
