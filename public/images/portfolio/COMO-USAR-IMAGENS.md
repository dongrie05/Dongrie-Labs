# Como pôr imagens nos projetos do portfólio

## 1. Onde guardar as imagens

Coloca os ficheiros **nesta pasta**: `public/images/portfolio/`

Ou seja, no teu projeto:
```
Dongrie-Labs/
  public/
    images/
      portfolio/    ← coloca aqui as imagens
        smartmeal.png
        medclarityai.png
        ...
```

## 2. Nomes dos ficheiros

Usa o **slug** do projeto + extensão (`.png`, `.jpg` ou `.webp`):

| Projeto        | Nome do ficheiro (exemplo) |
|----------------|----------------------------|
| SmartMeal      | `smartmeal.png`            |
| MedClarityAI   | `medclarityai.png`         |
| Verbalis       | `verbalis.png`             |
| Crypto Adoption| `crypto-adoption.png`      |
| Kairo          | `kairo-decide-better.png`  |

Se usares exatamente estes nomes, as imagens aparecem sozinhas no site.

## 3. Tamanho recomendado

- **Imagem principal (card + página do projeto):** 800×600 px ou 1200×900 px (proporção 4:3 ou 16:10).
- **Formato:** PNG ou JPG. WebP também funciona.

## 4. Várias imagens (galeria)

Para a secção "Galeria" na página de cada projeto, podes adicionar mais imagens. Isso configura-se no ficheiro `src/lib/data/projects.ts` com o array `gallery` (lista de caminhos como `"/images/portfolio/smartmeal-1.png"`).

Resumo: **coloca o ficheiro nesta pasta com o nome igual ao slug do projeto** (ex: `smartmeal.png`) e a imagem aparece no portfólio.

**Nota:** Se ainda não tiveres uma imagem para um projeto, abre `src/lib/data/projects.ts`, encontra esse projeto e apaga a linha `image: '/images/portfolio/xxx.png',` para voltar a mostrar o placeholder (ícone) até teres a imagem.
