import { CreateDollResponse } from '@store/query/CreateDoll';
import { CreateDollConfigOutput } from '@store/query/CreateDollConfiguration';
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
  saveDollConfig: MutationFn<CreateDollConfigOutput>;
}

interface CreateDollViewState {
  step: Step;
  dollId?: string;
  wishlistId?: string;
  dollConfigId?: string;
}

class CreateDollView extends React.Component<CreateDollViewProps, CreateDollViewState> {
  state: CreateDollViewState = {
    step: 'doll',
    dollId: undefined,
    wishlistId: undefined,
    dollConfigId: undefined,
  };

  private toConfigParts = (dollId: string, wishlistId?: string) => {
    this.setState({ dollId, wishlistId, step: 'config' });
  }

  private toPurchases = (dollConfigId: string) => {
    console.warn('hey', dollConfigId);
    this.setState({ dollConfigId, step: 'purchase' });
  }

  render() {
    const { user, createDoll, saveDollConfig, closeModal } = this.props;
    const { step, dollId, wishlistId } = this.state;

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
            wishlistId={wishlistId}
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
