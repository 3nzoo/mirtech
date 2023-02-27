import axios from 'axios';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_KEY, url } from '../constants';
import { iClient } from '../interfaces';
import Client from './Client';
import ToggleSwitch from './common/switch/ToggleSwitch';
import Toast from './common/toast/Toast';

type Clients = {
  data: iClient[];
};

const ClientsList = ({ data }: Clients) => {
  const [newUpdate, setNewUpdate] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<iClient | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [byStatus, setByStatus] = useState(false);
  const [errorStat, setErrorStat] = useState('');

  const dateList = useMemo(() => {
    const items = localStorage.getItem(CLIENT_KEY);

    if (items) {
      const newData = Array.from(
        new Set(
          JSON.parse(items).map((client: iClient) =>
            client.createdAt.substring(0, 10)
          )
        )
      ).map((date) => {
        return JSON.parse(items).find(
          (client: iClient) => client.createdAt.substring(0, 10) === date
        );
      });

      return newData.sort((a, b) => {
        if (a?.createdAt && b?.createdAt) {
          return a.createdAt.localeCompare(b.createdAt);
        }
        return 0;
      });
    }
    const newData = Array.from(
      new Set(data.map((client) => client.createdAt.substring(0, 10)))
    ).map((date) => {
      return data.find((client) => client.createdAt.substring(0, 10) === date);
    });

    return newData.sort((a, b) => {
      if (a?.createdAt && b?.createdAt) {
        return a.createdAt.localeCompare(b.createdAt);
      }
      return 0;
    });
  }, [data, selectedClient]);

  const clientData = useMemo(() => {
    const items = localStorage.getItem(CLIENT_KEY);
    if (newUpdate === 'filterByDate') {
      if (items) {
        return JSON.parse(items).filter(
          (client: iClient) =>
            client.createdAt.substring(0, 10) == selectedDate.substring(0, 10)
        );
      } else {
        return data.filter(
          (client: iClient) =>
            client.createdAt.substring(0, 10) == selectedDate.substring(0, 10)
        );
      }
    } else if (newUpdate === 'filterByStatus') {
      if (items) {
        return JSON.parse(items).filter(
          (client: iClient) => client.isActive === true
        );
      } else {
        return data.filter((client: iClient) => client.isActive === true);
      }
    }

    if (items) {
      const parsedClient = JSON.parse(items);
      if (parsedClient.length === data.length) {
        return data;
      } else {
        return parsedClient;
      }
    }
  }, [data, newUpdate, selectedDate, byStatus]);

  const handleToggle = async (id: number, status: boolean) => {
    try {
      await axios.patch(`${url}clients/${id}`, {
        isActive: !status,
      });
      const existingClients = localStorage.getItem(CLIENT_KEY);
      if (existingClients) {
        const parsedClient = JSON.parse(existingClients);
        const index = parsedClient.findIndex((item: iClient) => item.id === id);

        if (index !== -1) {
          parsedClient[index].isActive = !status;
          localStorage.setItem(CLIENT_KEY, JSON.stringify(parsedClient));
          if (newUpdate === 'filterByStatus') {
            setByStatus(!byStatus);
          }
        }
      }
    } catch (error: any) {
      setErrorStat(error.toString());
    }
  };

  const handleBack = () => {
    setSelectedClient(null);
  };

  if (selectedClient) {
    return (
      <>
        <Client selectedClient={selectedClient} onClick={handleBack} />
      </>
    );
  }

  return (
    <div className='clientList'>
      {errorStat && <Toast message={errorStat} type='error' />}
      <div className='topContainer'>
        <div className='section'>
          <label>Filter By Date</label>
          <select
            value={selectedDate !== '' ? selectedDate : ''}
            onChange={(e) => {
              setNewUpdate('filterByDate');
              setSelectedDate(e.target.value);
            }}
          >
            <option value='' disabled>
              Select Date
            </option>
            {dateList.map((client) => {
              if (client === undefined) return;
              return (
                <option key={client.id} value={client.createdAt}>
                  {client.createdAt.substring(0, 10)}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label> Show Active Only: </label>
          <input
            type='checkbox'
            checked={newUpdate === 'filterByStatus' ? true : false}
            onChange={(e) => {
              setSelectedDate('');
              if (e.target.checked) {
                setNewUpdate('filterByStatus');
              } else {
                setNewUpdate('');
              }
            }}
          />
        </div>
        <div>
          <Link className='button' to={'/addClient'}>
            Add Client
          </Link>
        </div>
      </div>

      <table>
        <caption>Clients List</caption>
        <thead>
          <tr>
            <th scope='col'>Client</th>
            <th scope='col'>Contact</th>
            <th scope='col'>Organization</th>
            <th scope='col'>Assigned User</th>
            <th scope='col'>Status</th>
            <th scope='col'>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {clientData?.map((client: iClient) => {
            const curDate = new Date(client.createdAt);
            return (
              <tr
                key={client.id}
                onClick={(e: React.MouseEvent<HTMLTableRowElement>) => {
                  if (
                    (e.target as HTMLElement).tagName.toLowerCase() !==
                      'span' &&
                    (e.target as HTMLElement).tagName.toLowerCase() !== 'input'
                  ) {
                    setSelectedClient(client);
                  }
                }}
              >
                <td data-label='Client'>
                  <img className='avatar' src={client.avatar} />
                  <h3>{client.name}</h3>
                </td>
                <td data-label='Contact'>{client.contact}</td>
                <td data-label='Organization'>{client.organization}</td>
                <td data-label='Assigned User'>{client.assigned_user}</td>
                <td data-label='Status'>
                  <ToggleSwitch
                    checked={client.isActive}
                    onChange={() => handleToggle(client.id, client.isActive)}
                  />
                </td>
                <td data-label='Date Created'>
                  {curDate.getFullYear() +
                    '-' +
                    curDate.getMonth() +
                    '-' +
                    curDate.getDate()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
