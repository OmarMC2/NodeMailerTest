
import React, { useState } from 'react';
import transporter from '../mail/mailer'
export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  
  const isNotVoid = (value, fieldName) => {
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: 'Este campo no puede estar vacío',
      }));
      return false;
    }
    return true;
  };

  const isEmail = (value, fieldName) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isNotVoid(value, fieldName)) {
      return false;
    }

    if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: 'No es un Email válido',
      }));
      return false;
    }

    return true;
  };

  const isTelNumber = (value, fieldName) => {
    const telRegex = /^\d{10}$/;

    if (!isNotVoid(value, fieldName)) {
      return false;
    }

    if (!telRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: 'Ingrese un número de teléfono válido (10 dígitos)',
      }));
      return false;
    }

    return true;
  };
  const mailOptions = {
    from: 'tu_usuario@tudominio.com',
    to: 'omarmc2@gmail.com',
    subject: 'Asunto del correo',
    text: 'Cuerpo del correo electrónico'
  }; 

  const verifications = () => {
    setErrors({}); // Reinicia los errores al realizar nuevas verificaciones

    return (
      isNotVoid(name, 'name') &&
      isEmail(email, 'email') &&
      isTelNumber(tel, 'tel') &&
      isNotVoid(message, 'message')
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (verifications()) {
        //main().catch(console.error)
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //       return console.log('Error al enviar el correo electrónico:', error.message);
        //     }
        //     console.log('Correo electrónico enviado:', info.response);
        //   });

    } else {
      // Muestra un mensaje de error o realiza alguna otra acción
      console.log('Hay errores en el formulario', errors);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nombre
          <input type="text" id="name" name="name" onChange={(event) => setName(event.target.value)} autoComplete='given-name' />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </label>
        <label htmlFor="email">
          Email
          <input type="text" id='email' name="email" onChange={(event) => setEmail(event.target.value)} autoComplete='email'/>
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </label>
        <label htmlFor="tel">
          Teléfono
          <input type="text" id='tel' name="tel" onChange={(event) => setTel(event.target.value)} autoComplete='tel-local'/>
          {errors.tel && <p style={{ color: 'red' }}>{errors.tel}</p>}
        </label>
        <label htmlFor="message">
          Mensaje
          <textarea name="message" id="message" onChange={(event) => setMessage(event.target.value)} />
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </label>
        <button type="submit">Enviar</button>
      </form>

      <section>
        <span>Nombre: {name}</span>
        <span>Email: {email}</span>
        <span>Telefono: {tel}</span>
        <span>Mensaje: {message}</span>
      </section>
    </>
  );
}
