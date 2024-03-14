import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.API_KEY_URL_PAGE }));

const transporter = nodemailer.createTransport({
service: 'Gmail',
auth: {
    user: process.env.API_KEY_EMAIL,
    pass: process.env.API_KEY_PASSWORD
}
});

app.post('/sendemail', async (req, res) => {
try {
    const { destinatario, asunto, cuerpo } = req.body; 

    if (!destinatario || !asunto || !cuerpo) { 
    return res.status(400).json({ error: 'Algunos campos están vacíos' });
    }

    const mailOptions = {
    from: process.env.API_KEY_EMAIL,
    to:process.env.API_KEY_EMAIL_DESTINY,
    subject: asunto,
    html: cuerpo 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
    res.status(200).json({ message: '¡Correo electrónico enviado con éxito!' });
} catch (error) {
    console.error('Hubo un error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Hubo un error al enviar el correo electrónico.' });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});
