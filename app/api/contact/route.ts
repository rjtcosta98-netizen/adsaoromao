import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SUBJECT_LABELS: Record<string, string> = {
  geral: 'Informações Gerais',
  inscricao: 'Inscrição de Atleta',
  socios: 'Sócios / Quotas',
  loja: 'Loja / Encomendas',
  media: 'Comunicação / Media',
  outro: 'Outro Assunto',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Campos obrigatórios em falta (nome, email, mensagem).' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Endereço de email inválido.' },
        { status: 400 }
      );
    }

    const subjectLabel = SUBJECT_LABELS[subject] || subject || 'Sem assunto';

    // Create transporter
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
      subject: `[Website] ${subjectLabel} — ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #032d61; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #FFD700; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">
              Nova Mensagem do Website
            </h1>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 13px;">
              Recebida através do formulário de contacto em www.adsaoromao.pt
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; width: 120px; vertical-align: top;">Nome</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #032d61; text-decoration: underline;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Telefone</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">
                  <a href="tel:${phone}" style="color: #032d61; text-decoration: underline;">${phone}</a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Assunto</td>
                <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">
                  <span style="background: #FFD700; color: #032d61; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">${subjectLabel}</span>
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin: 0 0 10px;">Mensagem</p>
              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="color: #374151; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
          
          <div style="background: #032d61; padding: 20px 30px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #64748b; font-size: 11px; margin: 0;">
              Este email foi enviado automaticamente pelo website da AD São Romão. Para responder, utilize o botão "Responder" — a resposta será enviada diretamente para ${email}.
            </p>
          </div>
        </div>
      `,
    });

    // Confirmation email to the sender
    await transporter.sendMail({
      from: `"AD São Romão" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Confirmação de contacto — AD São Romão`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #032d61; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #FFD700; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">
              AD São Romão
            </h1>
            <p style="color: white; margin: 8px 0 0; font-size: 14px;">Juntos e Fortes</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #032d61; margin: 0 0 15px; font-size: 18px;">Olá ${name},</h2>
            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              Recebemos a tua mensagem sobre <strong>"${subjectLabel}"</strong> e iremos analisá-la com a maior brevidade.
            </p>
            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              A direção da AD São Romão irá responder no prazo máximo de <strong>48 horas úteis</strong>.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD700; margin: 20px 0;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin: 0 0 8px;">A tua mensagem:</p>
              <p style="color: #374151; font-size: 13px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              Obrigado pelo teu contacto!<br/>
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
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Por favor tenta novamente ou contacta-nos diretamente por email.' },
      { status: 500 }
    );
  }
}
