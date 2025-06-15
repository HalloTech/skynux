import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { writeFile } from 'fs/promises';
import path from 'path';

// In-memory store for posts (replace with database in production)
let posts: Post[] = [];

// Updated Post interface
interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  hashtags?: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
  likes: number;
  comments: Array<{
    id: string;
    content: string;
    author: {
      name: string;
      image: string;
    };
    createdAt: string;
  }>;
}

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const content = formData.get('content') as string;
    const image = formData.get('image') as File;
    const hashtags = formData.get('hashtags') as string;
    const filter = formData.get('filter') as string;

    if (!content?.trim() && !image) {
      return NextResponse.json(
        { error: 'Either content or image is required' },
        { status: 400 }
      );
    }

    let imageUrl;
    if (image) {
      // Convert the file to buffer
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = `${uniqueSuffix}-${image.name}`;
      
      // Save to public directory
      const publicPath = path.join(process.cwd(), 'public', 'uploads');
      await writeFile(path.join(publicPath, filename), buffer);
      
      // Set the URL for the image
      imageUrl = `/uploads/${filename}`;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      content,
      imageUrl,
      hashtags: hashtags?.trim(),
      createdAt: new Date().toISOString(),
      author: {
        name: session.user?.name || 'Anonymous',
        image: session.user?.image || '/default-avatar.png',
      },
      likes: 0,
      comments: [],
    };

    posts.unshift(newPost);

    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // In a real application, you would:
    // 1. Delete the image from storage
    // 2. Delete the post from database
    posts.splice(postIndex, 1);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 