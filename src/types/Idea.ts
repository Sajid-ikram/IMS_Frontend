export interface Idea {
  _id: string;
  title: string;
  content: string;
  author: string; // Changed to simple string
  category: string;
  banner: string;
  votes: number;
  voters: string[]; // Changed to string array
  status: "Idea Pending" | "Idea in Progress" | "Idea Evaluated";
  comments: {
    comment: string;
    commentBy: string;
    commentor: string;
    _id: string;
  }[];
  collaborators: {
    user: string;
    name: string;
    email: string;
    role:
      | "General"
      | "Team Leader"
      | "Researcher"
      | "Developer"
      | "Designer"
      | "Analyst";
    status: "Pending" | "Accepted";
    _id: string;
  }[];
  evaluation?: {
    score?: number;
    report?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
