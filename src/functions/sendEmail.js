import handler from "../../libs/handler-lib";
import nodemailer from "nodemailer";

export const main = handler(async (event, context) => {
  const { name, email, content } =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "exemplo@gmail.com",
      pass: "**********",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailSent = await transporter.sendMail({
    subject: "Você recebeu uma menagem romântica!",
    from: "Cupido Online<cupido.online0@gmail.com>",
    to: email,
    html: `
            <html>
            <body bgcolor="#FFFFFF">
              <table cellspacing="0" cellpadding="0" bgcolor="#f0f0f0" width="600">
              <tr>
                <td>
                  <img src="https://www3.unicentro.br/petfisica/wp-content/uploads/sites/54/2018/06/A-ci%C3%AAncia-e-a-poesia-menos-rom%C3%A2ntica.jpg" alt="crush" width="600" height="200">
                </td>
              </tr>
              <tr>
                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                  <center>
                    Olá ${name} você recebeu uma mensagem romântica!
                  </center>
                </td>
              </tr>
              <br>
              <br>
              <tr>
                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                  Mensagem:
                </td>
              </tr>
              <br>
              <tr>
              <td bgcolor="#a0a0a0" style="padding: 20px 20px 20px 20px;" width="300"; font-size: 12px;>
              <center>
                ${content}
              </center>
              </td>
              </tr>
              <br>
              <br>
              <br>
              <br>
              <tr>
              <td bgcolor="#a6dced" style="padding: 30px 30px 30px 30px;">
              <center>
              Mensagem enviada pelo CUPIDO ONLINE.
              <br>
              POR FAVOR NÃO RESPONDA O EMAIL!
              <center>
              </td>
              </tr>
              </table>
            </body>
            </html>
            `,
  });
  return mailSent;
});
