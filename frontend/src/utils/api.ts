// utils/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchJobs() {
  const response = await fetch(`${API_URL}/jobs`);
  const data = await response.json();
  return data;
}

export async function postJob(jobData: { title: string; description: string }) {
  const response = await fetch(`${API_URL}/jobs/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return response.json();
}
