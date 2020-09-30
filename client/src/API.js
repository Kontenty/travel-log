const API_URL = 'http://localhost:8080';

export async function listLogEntires() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}
