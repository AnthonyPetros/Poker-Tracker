import { useState, useEffect } from 'react';
import Modal from './Modal';
import {getAllSessionData} from '@/lib/sessionData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import { SessionItem } from '../interfaces/sessionItem';
import Link from 'next/link';
import { ResponsiveContainer ,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Label } from '@radix-ui/react-label';


   const HomePage = () => {
     const [sessions, setSessions] = useState<SessionItem[]>([]);
     const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false);
     let [minDate] = useState(new Date(Date.now()).getTime());
     let [maxDate] = useState(0);
     let [cumResultsState, setCumResultsState] = useState(0);
     let [cumHours, setCumHours] = useState(0);
     let [cumBB, setCumBB] = useState(0);
    
    

     const handleOpenModal = () => {
      setIsCreateSessionModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsCreateSessionModalOpen(false);
    };

    const handleCloseModalAdd = (session: SessionItem) => {
      setIsCreateSessionModalOpen(false);
      console.log(session)
      sessions.push(session)
      updateSessionData()
      //sessions.sort((a, b) => a.etime.getTime() - b.etime.getTime());
    }

     useEffect(() => {
      getAllSessionData().then((response) =>
        setSessions(JSON.parse(response))
      );
    }, []);


    useEffect(() => {
      updateSessionData()
    },[sessions])

    const formatXAxis = (tickFormat: number) => {
      const curr = new Date(tickFormat);
      const dd = String(curr.getDate()).padStart(2, '0');
      const mm = String(curr.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = curr.getFullYear();
      
      return mm + '/' + dd + '/' + yyyy;
    }

      const updateSessionData = () => {
        let cumResults = 0;
        let cHours = 0;
        let cBB = 0;
        sessions.toReversed().map((session) => {
          const bb = session.stakes.split("/").toReversed()[0]
          const currDate = new Date(session.etime).getTime();
          const startDate = new Date(session.stime).getTime();
          session.result = session.cash - session.buy;
          session.cumResult = session.result + cumResults;
          cumResults = session.cumResult;
          session.graphDate = currDate;
          cHours = cHours + ((currDate - startDate)/3600000);
          cBB = cBB + (session.result / Number(bb));
          minDate = Math.min(minDate,currDate);
          maxDate = Math.max(maxDate,currDate);
        });
        setCumResultsState(cumResults);
        setCumHours(cHours);
        setCumBB(cBB);
      } ;

     return (
       <div >
        <div className={isCreateSessionModalOpen ? 'blur':''}>
        <Tabs defaultValue="sessions">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger disabled={isCreateSessionModalOpen} className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' value="stats">Stats</TabsTrigger>
            <TabsTrigger disabled={isCreateSessionModalOpen} className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' value="sessions">Sessions</TabsTrigger>
          </TabsList>
        <TabsContent value="sessions">
          <div >
            <h1 className="text-3xl font-bold underline flex flex-row  justify-center">Poker Bankroll Tracker</h1>
            
            <div className='flex flex-row  justify-center'>
              <button disabled={isCreateSessionModalOpen} className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={handleOpenModal}>Add Session</button>
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
         <div className='grid grid-cols-3'>
            <div className='col-span-2 py-1'>
            <ResponsiveContainer width="100%" height={600}>
              <LineChart  data={sessions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="graphDate" type="number" scale={'time'} domain={[minDate, maxDate]} tickFormatter={(tick) => formatXAxis(tick)}/>
                <YAxis />
                <Tooltip labelFormatter={(tick) => formatXAxis(tick)} />
                <Legend />
                <Line type="monotone" dataKey="cumResult" name="Total Profit" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            </div>
            <div className='py-2.5'>
              <div className='ring-2 w-full text-center'>
                <Label className='font-bold'>Total Profit: </Label>
                <br></br>
                ${cumResultsState.toLocaleString()}
              </div>
              <div className='ring-2 w-full text-center'>
                <Label className='font-bold'>Total BBs Won: </Label>
                <br></br>
                {cumBB.toFixed(2)}
              </div>
              <div className='ring-2 w-full text-center'>
                <Label className='font-bold'>Total Hours: </Label>
                <br></br>
                {cumHours}
              </div>
              <div className='ring-2 w-full text-center'>
                <Label className='font-bold'>Win Rate Per Hour: </Label>
                <br></br>
                ${(cumResultsState/cumHours).toLocaleString()}
              </div>
              <div className='ring-2 w-full text-center'>
                <Label className='font-bold'>Win Rate Per Session: </Label>
                <br></br>
                ${(cumResultsState/sessions.length).toLocaleString()}
              </div>
              <div className='ring-2 w-full text-center'>
                <Label className='font-bold'>BB Per Hour: </Label>
                <br></br>
                {(cumBB / cumHours).toFixed(2)}
              </div>
              <div className='ring-2 w-full text-center'>
                <Label className='font-bold'>Estimated Hands: </Label>
                <br></br>
                {Math.floor(cumHours * 25)}
              </div>
            </div>
          </div>
         </TabsContent>
         </Tabs>
         </div>
         <div className='flex w-full'>
          <div className ={isCreateSessionModalOpen ? ' absolute flex justify-center items-center inset-0':''}>
              <Modal  isOpen={isCreateSessionModalOpen}  onClose={handleCloseModal} handleCloseModalAdd={handleCloseModalAdd}>
              </Modal>
          </div>
        </div>
       </div>
     );
   };

   export default HomePage;