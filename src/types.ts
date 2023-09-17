export type Company = {
  name: string;
  jobUrl: string;
  url?: string;
};

export type Job = {
  company: Company;
  title: string;
  location: string[];
  note: string;
  status: "open" | "closed" | "";
  jobs: {
    title: string;
    url: string;
  }[];
};
