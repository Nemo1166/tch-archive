export interface ApiResponse {
  code: number;
  content: UserContent;
}

export interface UserContent {
  avatar: string | null;
  honor: string | null;
  name: string;
  verify: number | null;
}

export interface UserFullmeta {
  avatar: string;
  desc: string;
  honor: string;
  last_login: string;
  name: string;
  user_id: number;
  verify: number;
  verify_info: string;
}

export interface PostInfo {
  comment_count: number;
  guid: number;
  post_date: string;
  post_views: number;
  title: string;
}

export interface Published {
  posts: PostInfo[];
  total: number;
}
