export interface Comments {
  comment_content: string;
  floor: string;
  user_id: number;
  replies: CommReplies[];
}

export interface CommReplies {
  user_id: number;
  comment_content: string;
}