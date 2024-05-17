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

export interface Comments {
  comment_content: string;
  floor: string;
  user_id: number;
}