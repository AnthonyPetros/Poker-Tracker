import { useState, useEffect } from 'react';
import Modal from './Modal';
import {getAllSessionData} from '@/lib/sessionData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import { SessionItem } from '../interfaces/sessionItem';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


   const HomePage = () => {
     const [sessions, setSessions] = useState<SessionItem[]>([]);
     const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false);
     let [minDate] = useState(new Date(Date.now()).getTime());
     let [maxDate] = useState(0);
   

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

    useEffect(() => {
      let cumResults = 0;
      sessions.toReversed().map((session) => {
        const currDate = new Date(session.etime).getTime();
        session.result = session.cash - session.buy;
        session.cumResult = session.result + cumResults;
        cumResults = session.cumResult;
        session.graphDate = currDate;
        minDate = Math.min(minDate,currDate);
        maxDate = Math.max(maxDate,currDate);
        console.log(currDate);
      });
    },[sessions])
    const formatXAxis = (tickFormat: number) => {
      const curr = new Date(tickFormat);
      const dd = String(curr.getDate()).padStart(2, '0');
      const mm = String(curr.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = curr.getFullYear();
      
      return mm + '/' + dd + '/' + yyyy;
      
    };
     return (
       <div>
        <Tabs defaultValue="sessions">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' value="stats">Stats</TabsTrigger>
            <TabsTrigger className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' value="sessions">Sessions</TabsTrigger>
          </TabsList>
        <TabsContent value="sessions">
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
         </TabsContent>
         <TabsContent value="stats">
          <LineChart width={500} height={500} data={sessions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="graphDate" type="number" scale={'time'} domain={[minDate, maxDate]} tickFormatter={(tick) => formatXAxis(tick)}/>
            <YAxis />
            <Tooltip labelFormatter={(tick) => formatXAxis(tick)} />
            <Legend />
            <Line type="monotone" dataKey="cumResult" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
         </TabsContent>
         </Tabs>
         <div className='w-2/3 justify-self-center'>
          <Modal  isOpen={isCreateSessionModalOpen}  onClose={handleCloseModal} handleCloseModalAdd={handleCloseModalAdd}>
          </Modal>
          </div>
       </div>
     );
   };

   export default HomePage;