interface Env {
  RESEND_API_KEY: string;
}

interface OrderItem {
  name: string;
  selectedSize: string;
  quantity: number;
  price: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json() as {
      nome: string;
      email: string;
      telefone: string;
      morada: string;
      codPostal: string;
      cidade: string;
      moradaEnvio?: string;
      codPostalEnvio?: string;
      cidadeEnvio?: string;
      observacoes?: string;
      items: OrderItem[];
      total: number;
    };

    const { nome, email, telefone, morada, codPostal, cidade, moradaEnvio, codPostalEnvio, cidadeEnvio, observacoes, items, total } = body;

    if (!nome || !email || !morada || !items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Campos obrigatórios em falta.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const orderNumber = `ADSR-${Date.now().toString(36).toUpperCase()}`;

    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.selectedSize}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${item.price}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1f398a 0%, #162a6b 100%); padding: 25px; text-align: center;">
          <img src="https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png" alt="ADSR" style="height: 60px;" />
          <h1 style="color: #fed700; margin: 15px 0 5px; font-size: 24px;">Nova Encomenda! 🎉</h1>
          <p style="color: white; margin: 0; font-size: 16px; background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 20px; display: inline-block;">
            Pedido: <strong>${orderNumber}</strong>
          </p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <!-- Dados do Cliente -->
          <div style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #1f398a; margin: 0 0 20px; font-size: 18px; border-bottom: 2px solid #fed700; padding-bottom: 10px;">
              👤 Dados do Cliente
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666; width: 120px;">Nome:</td>
                <td style="padding: 8px 0; color: #333;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1f398a;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Telefone:</td>
                <td style="padding: 8px 0; color: #333;">${telefone || 'Não indicado'}</td>
              </tr>
            </table>
          </div>
          
          <!-- Morada de Faturação -->
          <div style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #1f398a; margin: 0 0 15px; font-size: 16px;">📍 Morada de Faturação</h2>
            <p style="margin: 0; color: #444; line-height: 1.6;">
              ${morada}<br/>
              ${codPostal} ${cidade}
            </p>
          </div>
          
          ${moradaEnvio ? `
          <!-- Morada de Envio -->
          <div style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #1f398a; margin: 0 0 15px; font-size: 16px;">📦 Morada de Envio</h2>
            <p style="margin: 0; color: #444; line-height: 1.6;">
              ${moradaEnvio}<br/>
              ${codPostalEnvio} ${cidadeEnvio}
            </p>
          </div>
          ` : ''}
          
          <!-- Itens do Pedido -->
          <div style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #1f398a; margin: 0 0 20px; font-size: 18px; border-bottom: 2px solid #fed700; padding-bottom: 10px;">
              🛒 Itens do Pedido
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 12px; text-align: left; font-weight: bold; color: #666;">Produto</th>
                  <th style="padding: 12px; text-align: center; font-weight: bold; color: #666;">Tamanho</th>
                  <th style="padding: 12px; text-align: center; font-weight: bold; color: #666;">Qtd</th>
                  <th style="padding: 12px; text-align: right; font-weight: bold; color: #666;">Preço</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #1f398a; text-align: right;">
              <span style="font-size: 14px; color: #666;">Total:</span>
              <span style="font-size: 24px; font-weight: bold; color: #1f398a; margin-left: 10px;">Sob Consulta</span>
            </div>
          </div>
          
          ${observacoes ? `
          <!-- Observações -->
          <div style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="color: #1f398a; margin: 0 0 15px; font-size: 16px;">📝 Observações:</h3>
            <p style="margin: 0; color: #444; line-height: 1.6; white-space: pre-wrap;">${observacoes}</p>
          </div>
          ` : ''}
          
          <div style="background: #fed700; border-radius: 8px; padding: 15px; text-align: center;">
            <p style="margin: 0; color: #1f398a; font-weight: bold;">⚡ Contactar cliente para confirmar encomenda e pagamento</p>
          </div>
        </div>
        
        <div style="background: #1f398a; padding: 20px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">© AD São Romão - Loja Online</p>
        </div>
      </div>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ADSR Loja <noreply@adsaoromao.pt>',
        to: ['geral@adsaoromao.pt'],
        reply_to: email,
        subject: `[ADSR Loja] Nova Encomenda ${orderNumber} - ${nome}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend error:', errorData);
      throw new Error('Falha ao enviar email.');
    }

    return new Response(JSON.stringify({ success: true, orderNumber }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Order form error:', error);
    return new Response(JSON.stringify({ error: 'Erro ao processar encomenda.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
