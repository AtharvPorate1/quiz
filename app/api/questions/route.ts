import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET() {
  try {
    const questions = await redis.lrange('questions', 0, -1);
    const parsedQuestions = questions.map(q => JSON.parse(q));
    return NextResponse.json(parsedQuestions);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}