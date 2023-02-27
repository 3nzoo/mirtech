import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_KEY, url, USERS_KEY } from '../constants';
import { iFormData, iUser } from '../interfaces';
import ToggleSwitch from './common/switch/ToggleSwitch';
import Toast from './common/toast/Toast';

function getRandomAvatar() {
  const randomNum = Math.floor(Math.random() * 10) + 1;
  return `${randomNum}.png`;
}

const AddClient = () => {
  const [errorStat, setErrorStat] = useState('');
  const [successStat, setSuccessStat] = useState('');
  const [users, setUsers] = useState<iUser[]>([]);
  const [formData, setFormData] = useState<iFormData>({
    name: '',
    contact: '',
    avatar: '/avatar/' + getRandomAvatar(),
    assigned_user: '',
    isActive: false,
    organization: '',
  });
  const effectRan = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      Object.values(formData).some(
        (value) => value === '' || value === null || value === undefined
      )
    ) {
      return setErrorStat('Everything is Required');
    }

    try {
      await axios.post(`${url}clients/`, formData);
      setSuccessStat('you have successfully added a new Client');

      const clients = await axios.get(`${url}clients`);
      if (clients) {
        localStorage.setItem(CLIENT_KEY, JSON.stringify(clients.data));
      }

      setFormData({
        name: '',
        contact: '',
        avatar: '/avatar/' + getRandomAvatar(),
        assigned_user: '',
        isActive: false,
        organization: '',
      });
    } catch (error: any) {
      setErrorStat(error.toString());
    }
  };

  useEffect(() => {
    if (effectRan.current === true) {
      const userJson = localStorage.getItem(USERS_KEY);
      if (userJson?.length) {
        return setUsers(JSON.parse(userJson));
      } else {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${url}users`);
            localStorage.setItem(USERS_KEY, JSON.stringify(response.data));
            setUsers(response.data);
          } catch (error: any) {
            setErrorStat(error.toString());
          }
        };
        fetchData();
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <div className='container'>
      {errorStat && <Toast message={errorStat} type='error' />}
      {successStat && <Toast message={successStat} type='success' />}
      <div>
        <Link className='button' to={'/'}>
          Back
        </Link>
      </div>
      <div className='add-form'>
        <form className='' onSubmit={handleSubmit}>
          <img src={`${formData.avatar}`} />

          <ToggleSwitch
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e })}
          />

          <input
            type='text'
            placeholder='Name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type='text'
            placeholder='Contact Number'
            value={formData.contact}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value)))
                setFormData({
                  ...formData,
                  contact: e.target.value,
                });
            }}
          />
          <input
            type='text'
            placeholder='Organization'
            value={formData.organization}
            onChange={(e) =>
              setFormData({ ...formData, organization: e.target.value })
            }
          />

          <select
            value={formData.assigned_user}
            onChange={(e) =>
              setFormData({ ...formData, assigned_user: e.target.value })
            }
          >
            <option value='' disabled>
              Select User
            </option>

            {users.length > 0 &&
              users.map((user) => {
                return (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                );
              })}
          </select>
          <button>submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
