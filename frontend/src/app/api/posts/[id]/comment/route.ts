import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

// Temporary in-memory storage for comments
const postComments: {
  [key: string]: Array<{
    id: string;
    content: string;
    author: {
      name: string;
      image: string;
    };
    createdAt: string;
  }>;
} = {};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    return NextResponse.json({
      comments: postComments[id] || [],
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const { content } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

    // Initialize comments array for post if it doesn't exist
    if (!postComments[id]) {
      postComments[id] = [];
    }

    const newComment = {
      id: Date.now().toString(),
      content,
      author: {
        name: session.user?.name || 'Anonymous',
        image: session.user?.image || '/default-avatar.png',
      },
      createdAt: new Date().toISOString(),
    };

    postComments[id].push(newComment);

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 