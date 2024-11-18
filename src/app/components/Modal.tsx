import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { DateTimePicker } from '@/components/ui/dateTimePicker';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose,  children}) => {
  if (!isOpen) return null;
  const [date12, setDate12] = useState<Date | undefined>(undefined);
  const [date24, setDate24] = useState<Date | undefined>(undefined);

  return (
   <Card>
    <CardHeader className='grid grid-cols-2 bg-blue-300'>     
      <CardTitle className='py-2'>Add a new session</CardTitle>
      <div className="justify-self-end">
        <button onClick={onClose} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </CardHeader>
      <CardContent className='grid grid-cols-4'>
      <div>
        <span>Start Time:</span>
        <DateTimePicker hourCycle={12} value={date12} onChange={setDate12} />
      </div>
      
      </CardContent>
   </Card>
      
  );
};

export default Modal;