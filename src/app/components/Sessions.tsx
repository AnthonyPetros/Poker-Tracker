import { useState, useEffect } from 'react';
import Modal from './Modal';
import {getAllSessionData} from '@/lib/sessionData';

import { SessionItem } from '../interfaces/sessionItem';
import Link from 'next/link';


   const Sessions = () => {
     const [sessions, setSessions] = useState<SessionItem[]>([]);
     const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false);

     const handleOpenModal = () => {
      setIsCreateSessionModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsCreateSessionModalOpen(false);
    };

    const handleCloseModalAdd = (session: SessionItem) => {
      setIsCreateSessionModalOpen(false);
      sessions.push(session)
    }

     useEffect(() => {
      getAllSessionData().then((response) =>
        setSessions(JSON.parse(response))
      );
    }, []);

     return (
       <div>
        <div className={isCreateSessionModalOpen ? 'blur':''}>
          <h1 className="text-3xl font-bold underline flex flex-row  justify-center">Poker Bankroll Tracker</h1>
          
          <div className='flex flex-row  justify-center'>
            <button className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={handleOpenModal}>Add Session</button>
          </div>
          
          <ul className='my-4'>
            {sessions.map((session) => (  
                <li className='my-3' key={session.id} >
                  <Link href={{pathname:'/session', query: { id: session.id }}}>
                    <div className='flex flex-row  justify-center'>
                      <div className=' hover:ring-4 ring-offset-2 ring-2 w-1/2 rounded'>
                        <span className={(session.cash - session.buy)>=0  ? 'text-green-500 font-bold px-4' : 'text-red-500 font-bold px-4' }>
                          Result: {session.cash - session.buy}
                        </span>
                        <span className='px-4'>
                          Buy In: {session.buy}
                        </span>
                        <span className='px-4'>
                          Cash Out: {session.cash}
                        </span>
                        <span className='px-4'>
                          Location: {session.location}
                        </span>
                        <span className='px-4'>
                          Stakes: {session.stakes}
                        </span>
                        <span className='px-4'>
                          Game Type: {session.type}
                        </span>
                    </div>
                  </div>
                  </Link>
                </li>
            ))}
          </ul>
         </div>
         <div className='w-2/3 justify-self-center'>
          <Modal  isOpen={isCreateSessionModalOpen}  onClose={handleCloseModal} handleCloseModalAdd={handleCloseModalAdd}>
          </Modal>
          </div>
       </div>
     );
   };

   export default Sessions;