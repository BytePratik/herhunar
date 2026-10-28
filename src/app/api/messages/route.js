import { NextResponse } from 'next/server';
import { getMessages, getConversationsForUser, sendMessage } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const userId = searchParams.get('userId');

    if (userId) {
      const conversations = getConversationsForUser(userId);
      return NextResponse.json({ success: true, data: conversations });
    }

    const messages = getMessages(conversationId);
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { conversationId, senderId, senderName, senderRole, receiverId, text } = body;

    if (!conversationId || !senderId || !text) {
      return NextResponse.json({ success: false, error: 'Missing required message parameters' }, { status: 400 });
    }

    const newMsg = sendMessage({ conversationId, senderId, senderName, senderRole, receiverId, text });
    return NextResponse.json({ success: true, data: newMsg }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
