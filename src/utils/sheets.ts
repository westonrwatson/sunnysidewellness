export interface SheetSubmission {
  name: string;
  email: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
}

export async function submitToSheets(data: SheetSubmission): Promise<{ success: boolean; error?: string }> {
  const url = import.meta.env.VITE_SHEETS_URL;
  if (!url) {
    return { success: false, error: 'Sheets URL not configured' };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return { success: true };
    }
    const text = await res.text();
    return { success: false, error: text || res.statusText };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Network error';
    return { success: false, error: msg };
  }
}
