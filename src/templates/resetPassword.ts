export const resetPassword:string = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Password Reset</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  img {
    -ms-interpolation-mode: bicubic;
  }

  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0px !important;
    margin: 0px !important;
  }

  table {
    border-collapse: collapse !important;
  }

  a {
    color: #2065D1;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
</style>
</head>
<body style="background-color: #e9ecef;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">

  <!-- start logo -->
  <tr>
    <td align="center" bgcolor="#e9ecef">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
          <td align="center" valign="top" style="padding: 36px 24px;">
            <!-- <a href="https://sendgrid.com" target="_blank" style="display: inline-block;">
              <img src="./img/paste-logo-light@2x.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
            </a> -->
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- end logo -->

  <!-- start hero -->
  <tr>
    <td align="center" bgcolor="#e9ecef">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
            <h1 style="margin: 0px; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Redefina sua senha</h1>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- end hero -->

  <!-- start copy block -->
  <tr>
    <td align="center" bgcolor="#e9ecef">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

        <!-- start copy -->
        <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
            <p style="margin: 0px;">
              Olá {{nome}}
              <br/>
              Alguém solicitou um link para alterar sua senha. Você pode fazer isso através do botão abaixo.
            </p>
          </td>
        </tr>
        <!-- end copy -->

        <!-- start button -->
        <tr>
          <td align="left" bgcolor="#ffffff">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" bgcolor="#2065D1" style="border-radius: 6px;">
                        <a href="{{link}}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                          Nova senha
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- end button -->

        <!-- start copy -->
        <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; max-width: 552px;">
            <p style="margin: 0px;">Se não funcionar, copie e cole o link a seguir no seu navegador:</p>
            <p style="margin: 0px; word-wrap: break-word;"><a href="{{link}}" target="_blank">{{link}}</a></p>
          </td>
        </tr>
        <!-- end copy -->

        <!-- start copy -->
        <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
            <p style="margin: 0px;">Obrigado,<br> NOME DA EMPRESA</p>
          </td>
        </tr>
        <!-- end copy -->

      </table>
    </td>
  </tr>
  <!-- end copy block -->

  <!-- start footer -->
  <tr>
    <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

        <!-- start permission -->
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
            <p style="margin: 0px;">
              Você recebeu este e-mail porque recebemos uma solicitação de redefinição de senha para sua conta. Se você não solicitou esta ação, pode excluir este e-mail com segurança.
            </p>
          </td>
        </tr>
        <!-- end permission -->

      </table>
    </td>
  </tr>
</table>
</body>
</html>
`