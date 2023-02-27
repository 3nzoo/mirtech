export interface iClient {
  id: number;
  name: string;
  contact: string;
  avatar: string;
  assigned_user: string;
  isActive: boolean;
  organization: string;
  createdAt: string;
}

export interface iUser {
  id: number;
  name: string;
}

export interface iFormData {
  name: string;
  contact: string;
  avatar: string;
  assigned_user: string;
  isActive: boolean;
  organization: string;
}
