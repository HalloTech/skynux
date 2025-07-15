import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

// Temporary in-memory storage for likes
const postLikes: { [key: string]: Set<string> } = {};

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
    const userId = session.user?.email || session.user?.name || 'anonymous';

    // Initialize likes set for post if it doesn't exist
    if (!postLikes[id]) {
      postLikes[id] = new Set();
    }

    // Toggle like
    if (postLikes[id].has(userId)) {
      postLikes[id].delete(userId);
    } else {
      postLikes[id].add(userId);
    }

    return NextResponse.json({
      likes: postLikes[id].size,
      isLiked: postLikes[id].has(userId),
    });
  } catch (error) {
    console.error('Error handling like:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 