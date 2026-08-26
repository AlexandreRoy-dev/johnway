const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@johnway.ca";

export async function submitForm(payload: Record<string, unknown>) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      _subject: "Demande Johnway.ca",
      _template: "table",
    }),
  });

  if (!response.ok) {
    throw new Error("submit failed");
  }
}
