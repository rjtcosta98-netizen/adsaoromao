import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface OrderItem {
  name: string;
  selectedSize: string;
  quantity: number;
  price: string | number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, telefone, morada, codPostal, cidade, moradaEnvio, codPostalEnvio, cidadeEnvio, observacoes, items, total } = body;

    // Validation
    if (!nome?.trim() || !email?.trim() || !morada?.trim()) {
      return NextResponse.json(
        { error: 'Campos obrigatórios em falta (nome, email, morada).' },
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

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'O carrinho está vazio.' },
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

    const enderecoEnvio = moradaEnvio
      ? `${moradaEnvio}, ${codPostalEnvio} ${cidadeEnvio}`
      : `${morada}, ${codPostal} ${cidade}`;

    const itemsHtml = (items as OrderItem[]).map((item: OrderItem) => `
      <tr>
        <td style="padding: 10px; color: #1e293b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">${item.name}</td>
        <td style="padding: 10px; color: #64748b; font-size: 13px; text-align: center; border-bottom: 1px solid #e2e8f0;">${item.selectedSize}</td>
        <td style="padding: 10px; color: #64748b; font-size: 13px; text-align: center; border-bottom: 1px solid #e2e8f0;">${item.quantity}</td>
        <td style="padding: 10px; color: #1e293b; font-size: 13px; text-align: right; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${item.price}</td>
      </tr>
    `).join('');

    // Email to the club
    await transporter.sendMail({
      from: `"Website ADSR" <${process.env.SMTP_USER}>`,
      to: 'geral@adsaoromao.pt',
      replyTo: email,
      subject: `[Loja] Nova Encomenda — ${nome}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #032d61; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #FFD700; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">
              Nova Encomenda da Loja
            </h1>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 13px;">
              Recebida através da Loja Online em www.adsaoromao.pt
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            
            <!-- Dados do Cliente -->
            <h3 style="color: #032d61; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px; border-bottom: 2px solid #FFD700; padding-bottom: 8px;">
              Dados do Cliente
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; width: 140px; vertical-align: top;">Nome</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #032d61; text-decoration: underline;">${email}</a>
                </td>
              </tr>
              ${telefone ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Telefone</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">
                  <a href="tel:${telefone}" style="color: #032d61; text-decoration: underline;">${telefone}</a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Morada Faturação</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${morada}, ${codPostal} ${cidade}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Morada Envio</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${enderecoEnvio}</td>
              </tr>
              ${observacoes ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; vertical-align: top;">Observações</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${observacoes}</td>
              </tr>
              ` : ''}
            </table>

            <!-- Itens da Encomenda -->
            <h3 style="color: #032d61; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px; border-bottom: 2px solid #FFD700; padding-bottom: 8px;">
              Artigos Encomendados
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #032d61;">
                  <th style="padding: 10px; color: #FFD700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; text-align: left;">Artigo</th>
                  <th style="padding: 10px; color: #FFD700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Tam.</th>
                  <th style="padding: 10px; color: #FFD700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Qtd.</th>
                  <th style="padding: 10px; color: #FFD700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; text-align: right;">Preço</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div style="margin-top: 15px; padding: 15px; background: #032d61; border-radius: 8px; text-align: right;">
              <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total Estimado: </span>
              <span style="color: #FFD700; font-size: 22px; font-weight: bold; margin-left: 10px;">${typeof total === 'number' ? total.toFixed(2) : total}€</span>
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

    // Confirmation email to the buyer
    await transporter.sendMail({
      from: `"AD São Romão — Loja" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Confirmação de encomenda — Loja AD São Romão`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #032d61; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #FFD700; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">
              AD São Romão
            </h1>
            <p style="color: white; margin: 8px 0 0; font-size: 14px;">Loja Oficial</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #032d61; margin: 0 0 15px; font-size: 18px;">Olá ${nome},</h2>
            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              Recebemos o teu pedido de encomenda e iremos processá-lo com a maior brevidade.
            </p>
            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              Serás contactado por email ou telefone para <strong>confirmação do pagamento e prazo de entrega</strong>.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD700; margin: 20px 0;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin: 0 0 12px;">Resumo da encomenda:</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
              </table>
              <div style="margin-top: 12px; padding-top: 12px; border-top: 2px solid #e2e8f0; text-align: right;">
                <span style="color: #64748b; font-size: 12px;">Total estimado: </span>
                <span style="color: #032d61; font-size: 18px; font-weight: bold;">${typeof total === 'number' ? total.toFixed(2) : total}€</span>
              </div>
            </div>

            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 15px 0;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin: 0 0 8px;">Envio para:</p>
              <p style="color: #374151; font-size: 13px; margin: 0;">${enderecoEnvio}</p>
            </div>

            <p style="color: #374151; font-size: 14px; line-height: 1.7;">
              Obrigado pela tua compra!<br/>
              <strong>Loja AD São Romão</strong>
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
    console.error('Order form error:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar encomenda. Por favor tenta novamente ou contacta-nos diretamente por email.' },
      { status: 500 }
    );
  }
}
