/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import { client, jsKeyCodes } from '@csegames/camelot-unchained';
import * as events from '@csegames/camelot-unchained/lib/events';

import SocialMain from './components/SocialMain';
import { store } from './services/session/reducer';


export interface SocialContainerProps {
  containerClass?: string;
  visibleComponent: string;
}

export interface SocialContainerState {
  visible: boolean;
}

class SocialContainer extends React.Component<SocialContainerProps, SocialContainerState> {
  private hudNavListener: number;
  private initialized = false;
  private mainRef: any = null;

  constructor(props: SocialContainerProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  public render() {
    return this.props.visibleComponent === 'social' && (
      <Provider store={store}>
        <SocialMain ref={r => this.mainRef = r} {...(this.props as any)} />
      </Provider>
    );
  }

  public componentDidMount() {
    this.hudNavListener = events.on('hudnav--navigate', (name: string) => {
      const { visible } = this.state;
      switch (name) {
        case 'social': {
          if (visible) {
            this.hide();
          } else {
            this.show();
          }
          break;
        }
        default: {
          if (visible) this.hide();
          break;
        }
      }
    });
    if (!this.initialized) {
      this.initialized = true;
    }
    window.addEventListener('keydown', this.onKeyDown);
  }

  public componentWillUnmount() {
    events.off(this.hudNavListener);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const { visible } = this.state;
    if (e.which === jsKeyCodes.ESC && visible) {
      client.ReleaseInputOwnership();
      this.hide();
    }
  }

  private show = () => {
    if (typeof client.RequestInputOwnership === 'function') client.RequestInputOwnership();
    this.setState({ visible: true });
  }

  private hide = () => {
    if (typeof client.ReleaseInputOwnership === 'function') client.ReleaseInputOwnership();
    this.setState({ visible: false });
  }
}

export default SocialContainer;
