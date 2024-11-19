"use server"
import { neon } from '@neondatabase/serverless';
import { SessionItem } from '@/app/interfaces/sessionItem';

export async function getData() {
    const sql = neon(process.env.DATABASE_URL!);
    const response = await sql`SELECT version()`;
    console.log(response);
}

export async function postPokerSessionData(session: SessionItem){
    console.log(session);
}

