
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { DateTimePicker } from '@/components/ui/dateTimePicker';
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import {postPokerSessionData} from "@/lib/sessionData";
import { SessionItem } from '../interfaces/sessionItem';
import { v4 } from "uuid";
import {stakesConstants, gameTypeConstants, locationConstants} from '../constants/comboConstants';
import StakesPicker from "./Custom/StakesPicker"


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCloseModalAdd: (session: SessionItem) => void;
}

const FilterModal: React.FC<ModalProps> = ({isOpen, onClose, handleCloseModalAdd}) => {
  const [date12Start, setDate12Start] = useState<Date | undefined>(undefined);
  const [date12End, setDate12End] = useState<Date | undefined>(undefined);
  const [newSessionBuyIn, setNewSessionBuyIn] = useState('');
  const [newSessionCashOut, setNewSessionCashOut] = useState('');
  const [newSessionStakes, setNewSessionStakes] = useState('');
  const [newSessionGameType, setNewSessionGameType] = useState('');
  const [newSessionLocation, setNewSessionLocation] = useState('');
  const addSession = () => {
      const newSessionItem: SessionItem = {
        id: v4(),
        stime: date12Start!,
        etime: date12End!,
        buy:parseInt(newSessionBuyIn),
        cash:parseInt(newSessionCashOut),
        stakes:newSessionStakes,
        type:newSessionGameType,
        location:newSessionLocation,
        result: 0,
        graphDate: 0,
        cumResult: 0,
      };
      postPokerSessionData(newSessionItem);
      setNewSessionBuyIn('');  
      setNewSessionCashOut('');
      setNewSessionStakes('');
      setNewSessionGameType('');
      setNewSessionLocation('');
      setDate12End(undefined);
      setDate12Start(undefined);
      handleCloseModalAdd(newSessionItem);
  };
  if (!isOpen) return null;
  return (
   <Card className='w-2/3'>
    <CardHeader className='grid grid-cols-2 bg-blue-300'>     
      <CardTitle className='py-2'>Filter Sessions</CardTitle>
      <div className="justify-self-end">
        <button onClick={onClose} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </CardHeader>
      
      <CardContent className='grid grid-cols-2 gap-1.5'>
        <div>
          <Label htmlFor="buyIn">Buy In:</Label>
          <Textarea id="buyIn" className='h-10'  placeholder="Enter how much you bought in for." onChange={(e) => setNewSessionBuyIn(e.target.value)}></Textarea>
        </div>
        <div>
          <Label htmlFor="cashOut">Cashout:</Label>
          <Textarea id="cashOut" className='h-10' placeholder="Enter how much you cashed out for." onChange={(e) => setNewSessionCashOut(e.target.value)}></Textarea>
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
          <StakesPicker onChange={setNewSessionStakes} items={stakesConstants}></StakesPicker>
        </div>
        <div>
          <Label htmlFor="game">Game Type:</Label>
          <StakesPicker onChange={setNewSessionGameType} items={gameTypeConstants}></StakesPicker>
        </div>
        <div>
        <Label htmlFor="location">Location:</Label>
        <StakesPicker onChange={setNewSessionLocation} items={locationConstants}></StakesPicker>
        </div>
      
      </CardContent>
      <CardFooter>
      <button className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={addSession} >Add Session</button>
      </CardFooter>
   </Card>
      
  );
};

export default FilterModal;