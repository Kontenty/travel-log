const API_URL = 'http://localhost:8080';

export async function listLogEntires() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function addNewEntry(data) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  return response.json()
}