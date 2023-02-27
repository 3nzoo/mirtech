import axios from 'axios';
import React, { useState } from 'react';
import { CLIENT_KEY, url } from '../constants';
import { iClient } from '../interfaces';
import ToggleSwitch from './common/switch/ToggleSwitch';
import Toast from './common/toast/Toast';

type Props = {
  selectedClient: iClient | null;
  onClick: () => void;
};

const Client = (props: Props) => {
  const [errorStat, setErrorStat] = useState('');

  const handleToggle = async (id: number, status: boolean) => {
    try {
      await axios.patch(`${url}clients/${id}`, {
        isActive: !status,
      });
      const items = localStorage.getItem(CLIENT_KEY);
      if (items) {
        const parsedClient = JSON.parse(items);
        const index = parsedClient.findIndex((item: iClient) => item.id === id);

        if (index !== -1) {
          parsedClient[index].isActive = !status;
          localStorage.setItem(CLIENT_KEY, JSON.stringify(parsedClient));
        }
      }
    } catch (error: any) {
      console.error(error);
      setErrorStat(error.toString());
    }
  };

  return (
    <div>
      {errorStat && <Toast message={errorStat} type='error' />}

      <div className='container'>
        <button className='button button-client' onClick={props.onClick}>
          back
        </button>
        <div>
          <img
            src={props.selectedClient?.avatar}
            alt={props.selectedClient?.name}
            className='img-fluid rounded-circle'
          />
        </div>
        <div>
          <h2>{props.selectedClient?.name}</h2>
          <p>
            <strong>Status:</strong>{' '}
            <ToggleSwitch
              checked={
                props.selectedClient?.isActive === undefined
                  ? false
                  : props.selectedClient.isActive
              }
              onChange={() =>
                handleToggle(
                  props.selectedClient?.id === undefined
                    ? 0
                    : props.selectedClient.id,
                  props.selectedClient?.isActive === undefined
                    ? false
                    : props.selectedClient?.isActive
                )
              }
            />
          </p>
          <p>
            <strong>Phone:</strong> {props.selectedClient?.contact}
          </p>
          <p>
            <strong>Organization:</strong> {props.selectedClient?.organization}
          </p>
          <p>
            <strong>Assigned User:</strong>{' '}
            {props.selectedClient?.assigned_user}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Client;
