# Sistema visual ADSR — "Nova Época"

Direção retirada do que já existe e agrada: `LoadingScreen.tsx` e `Hero.tsx`.
Serve para alinhar o resto do site sem inventar uma linguagem nova.

## Princípio

O site é **escuro e azul**, com o dourado usado como luz, não como preenchimento.
Secções claras (`bg-white`, `bg-[#f7f8fb]`, cartões cinzentos com borda `gray-100`)
são o que faz o site parecer datado — é isso que se substitui.

## Superfície

Fundo de secção, por camadas, de baixo para cima:

1. `bg-navy-900` (#032d61) como base — ou `bg-[#020a18]` quando se quer mais peso.
2. Opcional: imagem de contexto em `object-cover` com `opacity-20`.
3. Véu: `bg-navy-900/70`.
4. Gradiente diagonal: `bg-[linear-gradient(120deg,rgba(3,21,58,0.95)_0%,rgba(3,21,58,0.72)_42%,rgba(3,21,58,0.34)_100%)]`.
5. Halo dourado, um por secção, nunca dois:
   `bg-[radial-gradient(circle_at_50%_40%,rgba(255,215,0,0.10),transparent_38%)]`.

## Cartões

```
rounded-lg border border-white/12 bg-[#03153a]/58 backdrop-blur-md
shadow-[0_22px_70px_rgba(0,0,0,0.35)]
```

- Hover: `hover:border-yellow-400/40 hover:-translate-y-0.5`, transição 300ms.
- Destaque (o nosso clube, o primeiro lugar): `border-yellow-400/25 bg-yellow-400/10`.
- Campos internos: `bg-white/[0.07]`, sem borda.
- **Nunca** cartões dentro de cartões.

## Tipografia

- Títulos: `font-display font-bold uppercase` (Oswald). Escala generosa: `text-2xl sm:text-3xl md:text-5xl`.
- Etiqueta acima de um número ou estado: `text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400`.
- Corpo: Inter, `text-sm`, `text-gray-300` sobre escuro. **Nunca** cinzento neutro sobre azul: usar `text-gray-300`/`text-gray-400`.
- Números de tabela: `tabular-nums`.

## Título de secção

O padrão já usado nas Equipas e na ADSR Cup, e é o que se mantém:

```jsx
<div className="flex items-center gap-2 sm:gap-3 md:gap-4">
  <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
  <h2 className="font-display text-lg font-bold uppercase text-white sm:text-xl md:text-3xl">…</h2>
</div>
```

Sem kicker/eyebrow por cima do título.

## Movimento

Um gesto por secção, não um por elemento.

- Entrada: `cubic-bezier(0.16, 1, 0.3, 1)`, `translateY(18px) scale(0.98)` → normal, 0.85s.
- Pulso de espera: 1.4s–1.7s `ease-in-out infinite`, amplitude pequena.
- Brilho dourado: `shadow-[0_0_18px_rgba(255,215,0,0.55)]` em elementos vivos.
- Respeitar `@media (prefers-reduced-motion: reduce)`.

## Cores

| Uso | Valor |
|---|---|
| Base | `navy-900` #032d61 |
| Superfície de cartão | `#03153a` a 58% |
| Acento | `yellow-400` #FFD700 |
| Texto principal | branco |
| Texto secundário | `gray-300` / `gray-400` |

Verde, roxo, vermelho e azul-claro só quando representam um dado (vitória, derrota,
subida, descida) — nunca como decoração.

## A não fazer

- Gradiente em texto.
- Emoji a fazer de ícone (usar `lucide-react`).
- Sombra sem desfoque.
- Borda colorida grossa à esquerda do cartão.
- Contraste abaixo de 4.5:1 em texto corrido.

---

## Superfície CLARA (alternância do homepage)

O site alterna secções escuras (navy) com secções claras (brancas). A superfície
clara usa exactamente a mesma linguagem — barra amarela no título, cartão com
raio `rounded-lg`, mesma curva de movimento — só muda a paleta.

**Invólucro da secção**

```
className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-24"
```

Sem imagem de fundo, sem véu. Um único halo subtil, opcional:

```
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,45,97,0.05),transparent_45%)]" />
```

**Cartão**

```
rounded-lg border border-navy-900/10 bg-white shadow-[0_18px_50px_rgba(3,21,58,0.08)]
hover:border-yellow-400/60 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(3,21,58,0.12)]
transition-all duration-300
```

Cartão em destaque: `border-yellow-400/60 bg-yellow-400/[0.08]`.
Campos internos / stages de imagem: `bg-navy-900/[0.04]`.
Divisores: `border-navy-900/10`.

**Texto** (contraste mínimo 4.5:1 sobre branco)

| Papel | Classe |
|---|---|
| Título de secção | `text-navy-900` |
| Título de cartão | `text-navy-900` |
| Corpo | `text-gray-600` |
| Meta / legenda | `text-gray-500` |
| Realce | `text-navy-800` / `text-navy-700` (amarelo NUNCA em texto sobre branco: `yellow-400` dá 1.4:1 e `yellow-500` 1.7:1 — só serve como barra, selo ou sublinhado) |

Proibido sobre branco: `text-white`, `text-gray-400`, `text-yellow-400`/`text-yellow-500` em texto,
e qualquer `text-*/40` ou `/50` derivado de navy.

**Botões**

- Primário: `bg-yellow-400 text-navy-900 hover:bg-yellow-500`
- Secundário: `border border-navy-900/20 text-navy-900 hover:bg-navy-900 hover:text-white`
- Setas de carrossel: `border border-navy-900/15 bg-white text-navy-900 hover:border-yellow-400 hover:bg-yellow-400`

**Cabeçalho de secção** — igual ao escuro, só a cor do título muda:

```
<div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8" />
<h2 className="font-display text-lg font-bold uppercase text-navy-900 sm:text-xl md:text-3xl">
```

**Selos / badges**: `bg-yellow-400 text-navy-900` mantém-se igual nas duas superfícies.

### Que secções são claras

Claras: Melhores Jogadores, Galeria e Vídeo, Classificações, Destaques do Clube,
Loja Oficial, Quem Apoia o Nosso Clube (inclui Qualidade & Ética), Redes Sociais.

Escuras: Hero, Próximos Jogos por Escalão, Informações do Clube, Últimos
Resultados, Recrutamento, Galeria dos Escalões, O Nosso Legado, Sócios.
