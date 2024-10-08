const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: "SoftSeason@yandex.ru",
    pass: "tlrozowdvoqzkmpu",
  },
});

app.post("/send", (req, res) => {
  const { from_email, from_name, subject, message } = req.body;

  const mailOptions = {
    from: "SoftSeason@yandex.ru",
    to: "nekita118118@gmail.com",
    subject: subject, 
    html: `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <style>
          body { text-decoration: none, font-family: Arial, sans-serif; line-height: 1.6; padding: 0; margin: 0; }
          .container { max-width: 600px; margin: auto; overflow: hidden; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { background-color: #3498db; color: white; padding: 20px 0; text-align: center; border-bottom: 2px solid #2980b9; }
          .content { padding: 20px; }
          .sender-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
          .sender-name { font-size: 24px; font-weight: bold; }
          .sender-email { font-size: 16px; color: #666; }
          .subject { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .message { font-size: 14px; line-height: 1.5; }
          table { width: 100%; border-collapse: collapse; border-spacing: 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${subject}</h1>
          </div>
          <div class="content">
            <div class="sender-info">
              <span class="sender-name">${from_name}</span>
              <span class="sender-email">${from_email}</span>
            </div>
            <table>
              <tr>
                <th>Отправитель</th>
                <td>${from_name} (${from_email})</td>
              </tr>
              <tr>
                <th>Тема</th>
                <td>${subject}</td>
              </tr>
              <tr>
                <th>Сообщение</th>
                <td>${message}</td>
              </tr>
            </table>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Ошибка отправки:', error);
      return res.status(500).json({ message: "Ошибка отправки", error });
    }
    console.log('Письмо успешно отправлено');
    res.status(200).json({ message: "Письмо успешно отправлено" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
