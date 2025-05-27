import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Comment, CommentFormValues } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useCars } from '../../contexts/CarsContext';

interface CarCommentsProps {
  carId: string;
  comments: Comment[];
}

const commentSchema = z.object({
  content: z.string().min(3, 'Comment must be at least 3 characters').max(500, 'Comment cannot exceed 500 characters'),
});

const CarComments = ({ carId, comments }: CarCommentsProps) => {
  const { isAuthenticated, user } = useAuth();
  const { addComment, isLoading } = useCars();
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentFormValues) => {
    try {
      setError(null);
      await addComment(carId, data);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>
      
      {isAuthenticated ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="mb-3">
            <label htmlFor="content" className="block text-sm font-medium text-secondary-700 mb-1">
              Add a comment
            </label>
            <textarea
              id="content"
              rows={3}
              className={`input ${errors.content ? 'border-red-500' : ''}`}
              placeholder="Share your thoughts about this car..."
              {...register('content')}
              disabled={isLoading}
            ></textarea>
            {errors.content && (
              <p className="error-text">{errors.content.message}</p>
            )}
          </div>
          
          {error && (
            <div className="mb-3 p-2 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-secondary-50 rounded-md border border-secondary-200">
          <p className="text-secondary-700">
            Please <a href="/login" className="text-primary-600 hover:underline">sign in</a> to leave a comment.
          </p>
        </div>
      )}
      
      {comments.length === 0 ? (
        <div className="text-center py-8 text-secondary-500">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-md border border-secondary-200">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{comment.username}</div>
                <div className="text-sm text-secondary-500">
                  {formatDistanceToNow(new Date(comment.createdAt))}
                </div>
              </div>
              <p className="text-secondary-700">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarComments;