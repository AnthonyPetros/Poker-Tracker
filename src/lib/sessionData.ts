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
    await db(`INSERT INTO poker_sessions (id,buy,cash,stime,etime,stakes,type,location)
    values($1,$2,$3,$4,$5,$6,$7,$8)`,[session.id,session.buy,session.cash,session.stime,session.etime,session.stakes,session.type,session.location]);
}

export async function getAllSessionData(){
    const sql = neon(process.env.DATABASE_URL!);
    let res = await sql`SELECT * from poker_sessions`;
    return JSON.stringify(res);
}

