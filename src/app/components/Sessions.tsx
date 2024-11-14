import { useState } from 'react';

   interface SessionItem {
        id: string;
        result: number;
        won: boolean;
      }

   const Sessions = () => {
     const [sessions, setSessions] = useState<SessionItem[]>([]);
     const [newSessionResult, setNewSessionResult] = useState('');

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
         <h1 className="text-3xl font-bold underline">Poker Tracker App</h1>
         <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           type="text"
           value={newSessionResult}
           onChange={(e) => setNewSessionResult(e.target.value)}
         />
         <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={addSession}>Add Session</button>
         <ul>
           {sessions.map((session) => (
             <li key={session.id}>

               <span className={session.won ? 'text-black font-bold px-4 rounded' : 'text-red-500 font-bold px-4 rounded' }>
                 {session.result}
               </span>
               <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => removeSession(session.id)}>Remove</button>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default Sessions;