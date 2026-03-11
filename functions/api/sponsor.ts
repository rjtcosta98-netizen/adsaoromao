interface Env {
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json() as {
      empresa: string;
      responsavel: string;
      telemovel: string;
      areaNegocio: string;
      localidade: string;
      email: string;
      mensagem?: string;
    };

    const { empresa, responsavel, telemovel, areaNegocio, localidade, email, mensagem } = body;

    if (!empresa || !responsavel || !email) {
      return new Response(JSON.stringify({ error: 'Campos obrigatórios em falta.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1f398a 0%, #162a6b 100%); padding: 25px; text-align: center;">
          <img src="https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png" alt="ADSR" style="height: 60px;" />
          <h1 style="color: #fed700; margin: 15px 0 5px; font-size: 24px;">Novo Pedido de Patrocínio</h1>
          <p style="color: #aaa; margin: 0; font-size: 14px;">Proposta Comercial ADSR 2026</p>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #1f398a; margin: 0 0 20px; font-size: 18px; border-bottom: 2px solid #fed700; padding-bottom: 10px;">
              📋 Dados da Empresa
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666; width: 140px;">Empresa:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${empresa}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Responsável:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${responsavel}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #1f398a;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Telemóvel:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${telemovel || 'Não indicado'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Área de Negócio:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${areaNegocio || 'Não indicada'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #666;">Localidade:</td>
                <td style="padding: 12px 0; color: #333;">${localidade || 'Não indicada'}</td>
              </tr>
            </table>
          </div>
          
          ${mensagem ? `
          <div style="background: white; border-radius: 12px; padding: 25px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="color: #1f398a; margin: 0 0 15px; font-size: 16px;">💬 Mensagem Adicional:</h3>
            <p style="margin: 0; color: #444; line-height: 1.6; white-space: pre-wrap;">${mensagem}</p>
          </div>
          ` : ''}
          
          <div style="background: #fed700; border-radius: 8px; padding: 15px; margin-top: 20px; text-align: center;">
            <p style="margin: 0; color: #1f398a; font-weight: bold;">⚡ Responder a este pedido no prazo máximo de 48h</p>
          </div>
        </div>
        <div style="background: #1f398a; padding: 20px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">© AD São Romão - Formulário de Patrocínios</p>
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
        from: 'ADSR Website <noreply@adsaoromao.pt>',
        to: ['geral@adsaoromao.pt'],
        reply_to: email,
        subject: `[ADSR Patrocínio] Proposta de ${empresa}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend error:', errorData);
      throw new Error('Falha ao enviar email.');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Sponsor form error:', error);
    return new Response(JSON.stringify({ error: 'Erro ao processar pedido.' }), {
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
