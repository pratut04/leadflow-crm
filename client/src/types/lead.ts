export interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
  followUpDate?: string;
  followUpNote?: string;
}