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
