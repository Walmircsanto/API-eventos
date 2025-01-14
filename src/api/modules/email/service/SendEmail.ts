import nodemailer from 'nodemailer'
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport(
    {
        host: process.env.MAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASSWORD_EMAIL,
        }
    }
);

/*
 como o envio de email, vai ser executado pelo servido smtp, não temos garatia de que esse email sera enviado
 logo o ideal seria joga essa requisição em uma fila( RabbiMQ) para que seja executada de forma assincrona
 e não aguardemos o envio do email.
 */
const send = (to: string, subject: string, body: string) => {

    // aqui dentro eu configuro o envio do email
    transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: to,
        subject: subject,
        text: body
    })
}

export default send;