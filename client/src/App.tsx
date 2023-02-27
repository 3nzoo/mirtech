import { useEffect, useRef, useState } from 'react';
import './App.css';
import ClientsList from './components/ClientsList';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import AddClient from './components/AddClient';
import PageNotFound from './components/PageNotFound';
import { iClient } from './interfaces';
import { CLIENT_KEY, url } from './constants';

function App() {
  const [data, setData] = useState<iClient[]>([]);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true) {
      const clientJson = localStorage.getItem(CLIENT_KEY);

      if (clientJson?.length) {
        return setData(JSON.parse(clientJson));
      } else {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${url}clients`);
            localStorage.setItem(CLIENT_KEY, JSON.stringify(response.data));
            setData(response.data);
          } catch (error) {
            console.log(error);
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
    <div className='App'>
      <Routes>
        <Route path='/' element={<ClientsList data={data} />} />
        <Route path='/addClient' element={<AddClient />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
