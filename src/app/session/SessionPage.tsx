"use client"
import { SessionItem } from "../interfaces/sessionItem";
import { getSessionDataById, editSessionData, deleteSessionDataById } from "@/lib/sessionData";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link';

import { DateTimePicker } from '@/components/ui/dateTimePicker';
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
    
    const Session = () => {
      const searchParams = useSearchParams();
      const router = useRouter();
      const [session, setSession] = useState<SessionItem | null>(null);


      useEffect(() =>  {
        const fetchSession = async () => {
          const currSession = await getSessionDataById(searchParams.get("id") || "") ;
          const json = await JSON.parse(currSession);
          setSession(json[0]);
          setSessionState(json[0])
        }
        
          fetchSession();
      },[]);
  const [date12Start, setDate12Start] = useState<Date | undefined>(undefined);
  const [date12End, setDate12End] = useState<Date | undefined>(undefined);
  const [newSessionBuyIn, setNewSessionBuyIn] = useState(0);
  const [newSessionCashOut, setNewSessionCashOut] = useState(0);
  const [newSessionStakes, setNewSessionStakes] = useState('');
  const [newSessionGameType, setNewSessionGameType] = useState('');
  const [newSessionLocation, setNewSessionLocation] = useState('');
  const editSession = () => {
    if(session){
      const newSessionItem: SessionItem = {
        id: session.id,
        stime: date12Start!,
        etime: date12End!,
        buy:newSessionBuyIn,
        cash:newSessionCashOut,
        stakes:newSessionStakes,
        type:newSessionGameType,
        location:newSessionLocation
      };
      editSessionData(newSessionItem);
      router.push('/');
   }
  }
  const deleteSession = () => {
    if(session){
      deleteSessionDataById(session.id);
      router.push('/');
   }
  }
  const setSessionState = (session:SessionItem) => {
    setNewSessionBuyIn(session.buy);
    setNewSessionCashOut(session.cash);
    setNewSessionGameType(session.type);
    setNewSessionLocation(session.location);
    setNewSessionStakes(session.stakes);
    setDate12Start(session.stime);
    setDate12End(session.etime);
  }
    return (!session ? null :
    (<Card>
      <CardHeader className='grid grid-cols-12 bg-blue-300'>
        <div className="">
          <Link href={{pathname:'/'}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12">
              <path stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
            </svg>
          </Link>
        </div> 
        <div className="col-span-5 flex flex-row justify-end">
          <CardTitle className='py-2'>Edit a session</CardTitle>
        </div>
      </CardHeader>
        
        <CardContent className='grid grid-cols-2 gap-1.5'>
          <div>
            <Label htmlFor="buyIn">Buy In:</Label>
            <Textarea id="buyIn" className='h-10' value={newSessionBuyIn}  placeholder="Enter how much you bought in for." onChange={(e) => setNewSessionBuyIn(parseInt(e.target.value))}></Textarea>
          </div>
          <div>
            <Label htmlFor="cashOut">Cashout:</Label>
            <Textarea id="cashOut" className='h-10' value={newSessionCashOut} placeholder="Enter how much you cashed out for." onChange={(e) => setNewSessionCashOut(parseInt(e.target.value))}></Textarea>
          </div>
          <div>
            <span>Start Time:</span>
            <DateTimePicker hourCycle={12} value={date12Start} onChange={setDate12Start} />
          </div>
          <div>
            <span>End Time:</span>
            <DateTimePicker hourCycle={12} value={date12End} onChange={setDate12End} />
          </div>
          <div>
            <Label htmlFor="stakes">Stakes:</Label>
            <Textarea id="stakes" className='h-10' value={newSessionStakes} placeholder="What Stakes were played" onChange={(e) => setNewSessionStakes(e.target.value)}></Textarea>
          </div>
          <div>
            <Label htmlFor="game">Game Type:</Label>
            <Textarea id="game" className='h-10' value={newSessionGameType} placeholder="What Game was played" onChange={(e) => setNewSessionGameType(e.target.value)}></Textarea>
          </div>
          <div>
            <Label htmlFor="location">Location:</Label>
            <Textarea id="location" className='h-10' value = {newSessionLocation} placeholder="Where was this played" onChange={(e) => setNewSessionLocation(e.target.value)}></Textarea>
          </div>
        
        </CardContent>
        <CardFooter>
        <button className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={editSession} >Edit Session</button>
        <button className='my-2 mx-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={deleteSession} >Delete Session</button>
        </CardFooter>
     </Card> ))
  }

  export default Session;