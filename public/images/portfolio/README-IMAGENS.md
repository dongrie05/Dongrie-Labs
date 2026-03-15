# Fotos do portfólio – o que precisas e onde pôr

## Onde pôr

**Pasta:**  
`Dongrie-Labs/public/images/portfolio/`

Ou seja, no teu projeto:
```
Dongrie-Labs/
  public/
    images/
      portfolio/     ← coloca aqui as imagens
```

---

## Lista exata de ficheiros

Coloca **uma imagem por projeto** com **exatamente** estes nomes:

| # | Nome do ficheiro        | Projeto        | Onde aparece no site |
|---|-------------------------|----------------|----------------------|
| 1 | `smartmeal.png`         | SmartMeal      | Cards do portfólio + página do projeto |
| 2 | `medclarityai.png`      | MedClarityAI   | Cards do portfólio + página do projeto |
| 3 | `verbalis.png`          | Verbalis       | Cards do portfólio + página do projeto |
| 4 | `crypto-adoption.png`   | Crypto Adoption| Cards do portfólio + página do projeto |
| 5 | `kairo-decide-better.png` | Kairo       | Cards do portfólio + página do projeto |

**Formato:** `.png`, `.jpg` ou `.webp` (podes usar qualquer um; se usares `.jpg`, o nome fica por exemplo `smartmeal.jpg` e tens de alterar em `src/lib/data/projects.ts` o caminho para `'/images/portfolio/smartmeal.jpg'`).

---

## Especificações das imagens

- **Uso:** imagem principal do app (screenshot ou mockup).
- **Proporção:** 4:3 ou 16:10 (ex.: 800×600 px ou 1200×900 px).
- **Tamanho:** até ~500 KB por imagem é suficiente para web.
- **Conteúdo:** screenshot do ecrã do app, mockup no telemóvel ou imagem que represente o projeto.

---

## Resumo rápido

1. Cria/usa 5 imagens (uma por app).
2. Coloca-as na pasta `public/images/portfolio/`.
3. Nomes: `smartmeal.png`, `medclarityai.png`, `verbalis.png`, `crypto-adoption.png`, `kairo-decide-better.png`.
4. Se usares outro formato (ex. `.jpg`), altera o caminho em `src/lib/data/projects.ts` para cada projeto.

Se um ficheiro não existir, o site mostra um placeholder (ícone 📱) até a imagem estar na pasta com o nome certo.
