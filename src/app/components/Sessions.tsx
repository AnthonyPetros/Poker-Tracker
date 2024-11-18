import { useState } from 'react';
import Modal from './Modal';

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

   interface SessionItem {
        id: string;
        result: number;
        won: boolean;
      }

   const Sessions = () => {
     const [sessions, setSessions] = useState<SessionItem[]>([]);
     const [newSessionResult, setNewSessionResult] = useState('');
     const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false);

     const handleOpenModal = () => {
      setIsCreateSessionModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsCreateSessionModalOpen(false);
    };

     const addSession = () => {
       if (newSessionResult !== '') {
         const newId = crypto.randomUUID();
         let res = parseInt(newSessionResult)
         let wonBool =  res> 0; 
         console.log(wonBool);
         const newSessionItem: SessionItem = {
           id: newId,
           result: res,
           won: wonBool
         };
         setSessions([...sessions, newSessionItem]);
         setNewSessionResult('');
       }
     };

     const removeSession = (id: string) => {
       const updatedSessions = sessions.filter((session) => session.id !== id);
       setSessions(updatedSessions);
     };

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
                  <div className='flex flex-row  justify-center'>
                    <div className=' hover:ring-4 ring-offset-2 ring-2 w-1/3 rounded'>
                      <span className={session.won ? 'text-green-500 font-bold px-4' : 'text-red-500 font-bold px-4' }>
                        Result: {session.result}
                      </span>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => removeSession(session.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
         </div>
         <div className='w-2/3 justify-self-center'>
          <Modal  isOpen={isCreateSessionModalOpen}  onClose={handleCloseModal}>
            <></>
            </Modal>
          </div>
       </div>
     );
   };

   export default Sessions;