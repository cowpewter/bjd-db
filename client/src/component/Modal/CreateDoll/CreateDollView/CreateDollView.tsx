import { CreateDollResponse } from '@store/query/CreateDoll';
import { DollConfiguration } from '@store/type/DollConfiguration';
import { Me } from '@store/type/Me';
import React from 'react';
import { MutationFn } from 'react-apollo';

import ConfigPartsStep from './ConfigPartsStep';
import CreateDollStep from './CreateDollStep';

type Step = 'doll' | 'config' | 'purchase';

interface CreateDollViewProps {
  user: Me;
  closeModal: MutationFn<null>;
  createDoll: MutationFn<CreateDollResponse>;
  saveDollConfig: MutationFn<DollConfiguration>;
}

interface CreateDollViewState {
  step: Step;
  dollId?: string;
}

class CreateDollView extends React.Component<CreateDollViewProps, CreateDollViewState> {
  state: CreateDollViewState = {
    step: 'doll',
    dollId: undefined,
  };

  private toConfigParts = (dollId: string) => {
    this.setState({ dollId, step: 'config' });
  }

  private toPurchases = () => {
    this.setState({ step: 'purchase' });
  }

  render() {
    const { user, createDoll, saveDollConfig, closeModal } = this.props;
    const { step, dollId } = this.state;

    switch (step) {
      case 'doll':
        return (
          <CreateDollStep
            closeModal={closeModal}
            createDoll={createDoll}
            nextStep={this.toConfigParts}
          />
        );
      case 'config':
        return (
          <ConfigPartsStep
            closeModal={closeModal}
            configParts={saveDollConfig}
            dollId={dollId}
            nextStep={this.toPurchases}
          />
        );
      case 'purchase':
        return 'not implemented';
      default:
        return null;
    }
  }
}

export default CreateDollView;
