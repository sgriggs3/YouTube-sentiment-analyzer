import React, { useState, useEffect } from 'react';

interface Sentiment {
    compound: number;
    pos: number;
    neg: number;
    neu: number;
}

interface Comment {
    text: string;
    author: string;
    timestamp: string;
    sentiment: Sentiment;
}

interface CommentListProps {
    videoId: string | null;
}

const CommentList: React.FC<CommentListProps> = ({ videoId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            if (!videoId) return;
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/comments?videoId=${videoId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data);
            } catch (error: any) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [videoId]);

    if (loading) {
        return <div>loading comments...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h3>comments</h3>
            <ul>
                {comments.map((comment, index) => {
                    console.log("Comment object:", comment);
                    return (
                        <li key={index}>
                            <p>{comment.text}</p>
                            <p>Sentiment: {JSON.stringify(comment.sentiment)}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CommentList;