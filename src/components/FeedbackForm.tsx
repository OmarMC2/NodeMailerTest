import { FormEvent, useState } from "react";

export default function FeedbackForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/sendMail", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">
        Nombre
        <input type="text" id="name" name="name" required />
      </label>
      <label htmlFor="email">
        Correo electrónico
        <input type="email" id="email" name="email" required />
      </label>
      <label htmlFor="message">
        Mensaje
        <textarea id="message" name="message" required />
      </label>
      <button>Enviar</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}