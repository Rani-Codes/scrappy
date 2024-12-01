import { UUID } from "crypto";

export interface Post {
    id: UUID;
    title: string;
    description: string;
    image_url?: string;
    created_on: string;
    user_id: UUID;
    users: {
      username: string;
    };
  }