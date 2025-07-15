"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface PostProps {
  id: string;
  content: string;
  imageUrl?: string;
  hashtags?: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
  likes?: number;
  comments?: Array<{
    id: string;
    content: string;
    author: {
      name: string;
      image: string;
    };
    createdAt: string;
  }>;
  onDelete?: (id: string) => void;
}

const Post: React.FC<PostProps> = ({
  id,
  content,
  imageUrl,
  hashtags,
  createdAt,
  author,
  likes = 0,
  comments = [],
  onDelete,
}) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(comments);

  const handleLike = async () => {
    try {
      // TODO: Implement actual like API call
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      
      const response = await fetch(`/api/posts/${id}/like`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      // Revert the optimistic update
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // TODO: Implement actual comment API call
      const comment = {
        id: Date.now().toString(),
        content: newComment,
        author: {
          name: session?.user?.name || 'Anonymous',
          image: session?.user?.image || '/default-avatar.png',
        },
        createdAt: new Date().toISOString(),
      };

      setLocalComments([...localComments, comment]);
      setNewComment('');

      const response = await fetch(`/api/posts/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error commenting:', error);
      toast.error('Failed to add comment');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out this post!',
        text: content,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src={author.image}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold">{author.name}</h3>
            <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
          </div>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </div>

      {/* Post Image */}
      {imageUrl && (
        <div className="relative aspect-square">
          <img
            src={imageUrl}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-gray-500'
            } hover:text-red-500 transition-colors`}
          >
            <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
            <span>{likesCount}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <i className="far fa-comment"></i>
            <span>{localComments.length}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <i className="far fa-share-square"></i>
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 py-2">
        <p className="text-gray-800">{content}</p>
        {hashtags && (
          <p className="mt-2 text-violet-600">
            {hashtags.split(' ').map(tag => (
              <span key={tag} className="mr-2">
                #{tag}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <div className="p-4 space-y-4">
            {localComments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Image
                  src={comment.author.image}
                  alt={comment.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-semibold text-sm">{comment.author.name}</p>
                    <p className="text-gray-800">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))}

            {/* Add Comment Form */}
            <form onSubmit={handleComment} className="flex items-center space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-violet-600 text-white px-4 py-2 rounded-full hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post; 