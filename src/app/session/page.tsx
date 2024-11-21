"use client"
import { SessionItem } from "../interfaces/sessionItem";
import { getSessionDataById } from "@/lib/sessionData";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
    
    const session = () => {
      const searchParams = useSearchParams()
      const [session, setSession] = useState<SessionItem | null>(null);


      useEffect(() =>  {
        const fetchSession = async () => {
          const currSession = await getSessionDataById(searchParams.get("id") || "") ;
          const json = await JSON.parse(currSession);
          setSession(json[0]);
        }
        
          fetchSession();
      },[]);
    return !session ? null :<h1>123: {session.buy}</h1>
  }

  export default session;