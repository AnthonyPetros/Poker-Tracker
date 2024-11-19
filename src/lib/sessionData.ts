"use server"
import { neon } from '@neondatabase/serverless';
import { SessionItem } from '@/app/interfaces/sessionItem';

export async function getData() {
    const sql = neon(process.env.DATABASE_URL!);
    const response = await sql`SELECT version()`;
    console.log(response);
}

export async function postPokerSessionData(session: SessionItem){
    const db = neon(process.env.DATABASE_URL!);
    await db(`INSERT INTO poker_sessions (id,buy_in,cash_out,start_time,end_time,stakes,game_type,location)
    values($1,$2,$3,$4,$5,$6,$7,$8)`,[session.id,session.buyIn,session.cashOut,session.start,session.end,session.stakes,session.gameType,session.location]);
}

