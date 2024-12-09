"use server"
import { neon } from '@neondatabase/serverless';
import { SessionItem } from '@/app/interfaces/sessionItem';


export async function postPokerSessionData(session: SessionItem){
    const db = neon(process.env.DATABASE_URL!);
    await db(`INSERT INTO poker_sessions (id,buy,cash,stime,etime,stakes,type,location)
    values($1,$2,$3,$4,$5,$6,$7,$8)`,[session.id,session.buy,session.cash,session.stime,session.etime,session.stakes,session.type,session.location]);
}

export async function getAllSessionData(){
    const sql = neon(process.env.DATABASE_URL!);
    const res = await sql`SELECT * from poker_sessions order by etime desc`;
    return JSON.stringify(res);
}

export async function getSessionDataById(id: string){
    const sql = neon(process.env.DATABASE_URL!);
    const res = await sql`SELECT * from poker_sessions where id = ${id}`; 
    return JSON.stringify(res);
}

export async function editSessionData(session: SessionItem){
    const sql = neon(process.env.DATABASE_URL!);
    await sql`update poker_sessions set buy = ${session.buy}, cash = ${session.cash},
    stime = ${session.stime}, etime = ${session.etime}, stakes = ${session.stakes}, location = ${session.location}, type =${session.type} where id = ${session.id}`; 
}

export async function deleteSessionDataById(id: string){
    const sql = neon(process.env.DATABASE_URL!);
    await sql`delete from poker_sessions where id = ${id}`;
}

