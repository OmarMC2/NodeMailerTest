import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.tudominio.com', // Reemplaza con el servidor SMTP adecuado
  port: 465, // Puede variar, revisa la configuración del servidor
  secure: true,
  auth: {
    user: 'tu_usuario@tudominio.com', // Reemplaza con tu nombre de usuario
    pass: 'tu_contraseña' // Reemplaza con tu contraseña
  }
});

export default transporter;