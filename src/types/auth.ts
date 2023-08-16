export interface ITelegramUser {
  auth_date: number;
  first_name: string;
  last_name?: string;
  photo_url: string;
  hash: string;
  id: number;
  username: string;
}
