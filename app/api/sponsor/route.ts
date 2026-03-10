import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { empresa, responsavel, telemovel, areaNegocio, localidade, email, mensagem } = body;

    // Validation
    if (!empresa?.trim() || !responsavel?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Campos obrigatórios em falta (empresa, responsável, email).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Endereço de email inválido.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to the club
    await transporter.sendMail({
      from: `"Website ADSR" <${process.env.SMTP_USER}>`,
      to: 'geral@adsaoromao.pt',
      replyTo: email,
      subject: `[Website] Proposta de Patrocínio — ${empresa}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #032d61; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #FFD700; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">
              Nova Proposta de Patrocínio
            </h1>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 13px;">
              Recebida através do formulário de patrocinadores em www.adsaoromao.pt
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; width: 140px; vertical-align: top;">Empresa</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${empresa}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Responsável</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">${responsavel}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #032d61; text-decoration: underline;">${email}</a>
                </td>
              </tr>
              ${telemovel ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Telemóvel</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">
                  <a href="tel:${telemovel}" style="color: #032d61; text-decoration: underline;">${telemovel}</a>
                </td>
              </tr>
              ` : ''}
              ${areaNegocio ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Área de Negócio</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">${areaNegocio}</td>
              </tr>
              ` : ''}
              ${localidade ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Localidade</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">${localidade}</td>
              </tr>
              ` : ''}
            </table>
            
            ${mensagem ? `
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin: 0 0 10px;">Mensagem</p>
              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="color: #374151; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${mensagem}</p>
              </div>
            </div>
            ` : ''}
          </div>
          
          <div style="background: #032d61; padding: 20px 30px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #64748b; font-size: 11px; margin: 0;">
              Este email foi enviado automaticamente pelo website da AD São Romão. Para responder, utilize o botão "Responder" — a resposta será enviada diretamente para ${email}.
            </p>
          </div>
        </div>
      `,
    });

    // Confirmation email to the sponsor
    await transporter.sendMail({
      from: `"AD São Romão" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Confirmação de pedido de parceria — AD São Romão`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #032d61; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #FFD700; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">
              AD São Romão
            </h1>
            <p style="color: white; margin: 8px 0 0; font-size: 14px;">Juntos e Fortes</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #032d61; margin: 0 0 15px; font-size: 18px;">Olá ${responsavel},</h2>
            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              Recebemos o pedido de proposta comercial da <strong>${empresa}</strong> e ficamos muito satisfeitos com o interesse demonstrado.
            </p>
            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              A nossa equipa irá preparar um <strong>dossier comercial personalizado</strong> e contactá-lo no prazo máximo de <strong>48 horas úteis</strong>.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD700; margin: 20px 0;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin: 0 0 8px;">Dados submetidos:</p>
              <p style="color: #374151; font-size: 13px; line-height: 1.8; margin: 0;">
                <strong>Empresa:</strong> ${empresa}<br/>
                <strong>Responsável:</strong> ${responsavel}<br/>
                ${telemovel ? `<strong>Telemóvel:</strong> ${telemovel}<br/>` : ''}
                ${areaNegocio ? `<strong>Área de Negócio:</strong> ${areaNegocio}<br/>` : ''}
                ${localidade ? `<strong>Localidade:</strong> ${localidade}<br/>` : ''}
                ${mensagem ? `<strong>Mensagem:</strong> ${mensagem}` : ''}
              </p>
            </div>

            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              Obrigado pelo interesse em apoiar o desporto local!<br/>
              <strong>Direção da AD São Romão</strong>
            </p>
          </div>
          
          <div style="background: #032d61; padding: 20px 30px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">
              Estádio N. Sra. da Conceição, 6270-273 São Romão, Seia · +351 925 228 934
            </p>
            <p style="color: #64748b; font-size: 10px; margin: 8px 0 0;">
              Este é um email automático. Para contacto direto: geral@adsaoromao.pt
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sponsor form error:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar pedido. Por favor tenta novamente ou contacta-nos diretamente por email.' },
      { status: 500 }
    );
  }
}
