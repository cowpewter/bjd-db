import { Doll } from '@store/type/Doll';
import { DollConfiguration } from '@store/type/DollConfiguration';
import { Me } from '@store/type/Me';
import React from 'react';
import { MutationFn } from 'react-apollo';

import CreateDollStep from './CreateDollStep';

type Step = 'doll' | 'config' | 'purchase';

interface CreateDollViewProps {
  user: Me;
  closeModal: MutationFn<null>;
  createDoll: MutationFn<Doll>;
  saveDollConfig: MutationFn<DollConfiguration>;
}

interface CreateDollViewState {
  step: Step;
}

class CreateDollView extends React.Component<CreateDollViewProps, CreateDollViewState> {
  state: CreateDollViewState = {
    step: 'doll',
  };

  private handleDollCreate = () => {

  }

  private next = () => {
    const { step } = this.state;
    const { closeModal } = this.props;
    switch (step) {
      case 'doll':
        this.setState({ step: 'config' });
        return;
      case 'config':
        this.setState({ step: 'purchase' });
        return;
      case 'purchase':
        closeModal();
    }
  }

  render() {
    const { user, createDoll, saveDollConfig, closeModal } = this.props;
    const { step } = this.state;

    switch (step) {
      case 'doll':
        return (
          <CreateDollStep
            closeModal={closeModal}
            createDoll={createDoll}
            nextStep={this.next}
          />
        );
      case 'config':
        return 'not implemented';
      case 'purchase':
        return 'not implemented';
      default:
        return null;
    }
  }
}

export default CreateDollView;
