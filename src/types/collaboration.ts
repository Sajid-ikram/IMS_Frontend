export interface CollaborationUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface CollaborationRequest {
  id: string;
  user: CollaborationUser;
  ideaName: string;
  status: 'pending' | 'accepted' | 'rejected';
}