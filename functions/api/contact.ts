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
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    };

    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Campos obrigatórios em falta.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const subjectLabels: Record<string, string> = {
      geral: 'Informações Gerais',
      inscricao: 'Inscrição de Atleta',
      socios: 'Sócios / Quotas',
      loja: 'Loja / Encomendas',
      media: 'Comunicação / Media',
      outro: 'Outro Assunto',
    };

    const subjectLabel = subjectLabels[subject] || subject;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1f398a; padding: 20px; text-align: center;">
          <img src="https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png" alt="ADSR" style="height: 60px;" />
          <h1 style="color: #fed700; margin: 10px 0 0;">Nova Mensagem de Contacto</h1>
        </div>
        <div style="padding: 30px; background: #f5f5f5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 120px;">Nome:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Telefone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Assunto:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subjectLabel}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px;">
            <h3 style="margin: 0 0 10px; color: #1f398a;">Mensagem:</h3>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        <div style="background: #1f398a; padding: 15px; text-align: center;">
          <p style="color: #aaa; margin: 0; font-size: 12px;">© AD São Romão - Formulário de Contacto</p>
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
        subject: `[ADSR Contacto] ${subjectLabel} - ${name}`,
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
    console.error('Contact form error:', error);
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
