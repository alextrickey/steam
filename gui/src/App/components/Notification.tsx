/*
  Copyright (C) 2016 H2O.ai, Inc. <http://h2o.ai/>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Created by justin on 8/8/16.
 */
import * as React from 'react';
import * as classNames from 'classnames';
import { Overlay } from 'h2oUIKit';
import { connect } from 'react-redux';
import '../styles/notification.scss';
import { closeNotification } from '../actions/notification.actions';
import { bindActionCreators } from 'redux';

interface Props {
  notification: {
    isOpen: boolean,
    notificationType: string,
    text: string,
    actions: any
  }
}

interface DispatchProps {
  closeNotification: Function
}

export class Notification extends React.Component<Props & DispatchProps, any> {
  render(): React.ReactElement<Overlay> {
    return (
      <Overlay className={classNames('notification', this.props.notification.notificationType)}
               open={this.props.notification.isOpen}>
        <div className="inner-notification">
          <div className="icon-container">
            <i className={classNames('fa', {
              'fa-warning': this.props.notification.notificationType === 'error',
              'fa-info-circle': this.props.notification.notificationType === 'warn',
              'fa-check-circle': this.props.notification.notificationType === 'success',
              'fa-circle-o-notch': this.props.notification.notificationType === 'info',
              'fa-spin': this.props.notification.notificationType === 'info'
            })}/>
          </div>
          <div className="text-container">
            {this.props.notification.text}
          </div>
          <div className="actions-container">
            <button onClick={this.props.closeNotification}><i className="fa fa-close"/> Close</button>
          </div>
        </div>
      </Overlay>
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeNotification: bindActionCreators(closeNotification, dispatch)
  };
}

export default connect<any, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Notification);
