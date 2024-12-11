
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

import {stakesConstants, gameTypeConstants, locationConstants} from '../constants/comboConstants';
import StakesPicker from "./Custom/StakesPicker"
import { FilterItem } from '../interfaces/filterItem';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCloseModalAdd: (filter: FilterItem) => void;
}

const FilterModal: React.FC<ModalProps> = ({isOpen, onClose, handleCloseModalAdd}) => {
  const [date12Start, setDate12Start] = useState<Date | undefined>(undefined);
  const [date12End, setDate12End] = useState<Date | undefined>(undefined);
  const [newSessionStakes, setNewSessionStakes] = useState('');
  const [newSessionGameType, setNewSessionGameType] = useState('');
  const [newSessionLocation, setNewSessionLocation] = useState('');
  const addFilter = () => {
    const filter: FilterItem = {
      stime: date12Start!,
      etime: date12End!,
      stakes:[newSessionStakes],
      type:[newSessionGameType],
      location:[newSessionLocation],
    };
    handleCloseModalAdd(filter);
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
          <span>Between Start Time:</span>
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
      <button className='my-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded' onClick={addFilter} >Add Session</button>
      </CardFooter>
   </Card>
      
  );
};

export default FilterModal;