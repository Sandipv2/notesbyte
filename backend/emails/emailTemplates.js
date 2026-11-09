export const verificationTemplate = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification - Notesbyte</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f8f9fa;
        padding: 20px;
        color: #333;
      }
      .container {
        background: #ffffff;
        border-radius: 8px;
        max-width: 480px;
        margin: auto;
        padding: 30px;
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        color: #1e88e5;
        letter-spacing: 4px;
        margin: 20px 0;
      }
      .footer {
        font-size: 12px;
        color: #888;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Email Verification - Notesbyte</h2>
      <p>Hi <strong>{name}</strong>,</p>
      <p>You recently signed up for an account on <strong>Notesbyte</strong>. To verify your email address, please use the following One-Time Password (OTP):</p>

      <div class="otp">{otp}</div>

      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn&apos;t request this verification, please ignore this email.</p>

      <div class="footer">
        This message was sent by Notesbyte. <br />
        &copy; {year} Notesbyte App. All rights reserved.
      </div>
    </div>
  </body>
</html>

`;

export const welcomeTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Notesbyte</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f3f4f6;
        padding: 40px 20px;
        color: #333;
      }
      .container {
        background-color: #ffffff;
        max-width: 520px;
        margin: 0 auto;
        padding: 40px 30px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        text-align: center;
      }
      .brand {
        font-size: 32px;
        font-weight: bold;
        color: #1e88e5;
        letter-spacing: 2px;
        margin-bottom: 20px;
      }
      h2 {
        color: #333;
        margin-bottom: 10px;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .footer {
        font-size: 12px;
        color: #999;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="brand">Notesbyte</div>
      <h2>Welcome, {name} 👋</h2>
      <p>Thanks for signing up for <strong>Notesbyte</strong>!</p>
      <p>Your account has been created successfully.</p>
      <p>Start organizing your tasks, capturing notes, and boosting productivity — all in one place.</p>
      <p>Let&apos;s get started!</p>

      <div class="footer">
        &copy; {year} Notesbyte App. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;

export const passwordResetTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f7fb;
      padding: 20px;
      color: #333;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: #1e88e5;
      color: #fff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #777;
      text-align: center;
    }
    .brand {
      font-size: 24px;
      font-weight: bold;
      color: #1e88e5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">Notesbyte</div>
    <h2>Reset your password</h2>
    <p>Hello {name},</p>
    <p>You recently requested to reset your password. Click the button below to set a new password:</p>

    <a href="{resetLink}" class="btn">Reset Password</a>
    <p>
        <b>Available for next 10 minutes.</b>
    </p>

    <p>If you didn’t request this, you can safely ignore this email.</p>

    <div class="footer">
      &copy; {year} Notesbyte. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const resetPasswordSuccessTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: "Segoe UI", Roboto, sans-serif;
      background: #f4f6fa;
      padding: 20px;
      color: #333;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      text-align: center;
    }
    .brand {
      font-size: 28px;
      font-weight: bold;
      color: #6a4df4;
      margin-bottom: 10px;
    }
    .status-icon {
      font-size: 48px;
      color: #4caf50;
      margin-bottom: 20px;
    }
    h2 {
      color: #333;
    }
    p {
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">Notesbyte</div>
    <div class="status-icon">✅</div>
    <h2>Password Reset Successful</h2>
    <p>Hello {name},</p>
    <p>Your password has been successfully reset. You can now log in to your Notesbyte account using your new password.</p>
    <p>If you did not perform this action, please contact us immediately.</p>

    <div class="footer">
      &copy; {year} Notesbyte. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const accountDeletedTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Account Deleted</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
    <tr>
      <td style="background-color: #00b8db; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Notesbyte</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333;">Your Account Has Been Deleted</h2>
        <p style="color: #555;">
          {name}, <br><br>
          This is a confirmation that your account has been successfully deleted from our system. We're sorry to see you go!
        </p>
        <p style="color: #555;">Wishing you all the best,<br><strong>The Notesbyte</strong></p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #777;">
        &copy; {year} Notesbyte. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;