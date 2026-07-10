# PW-Buger-eats

Projeto de testes automatizados end-to-end (E2E) para o fluxo de cadastro do aplicativo Buger Eats, desenvolvido com Playwright e TypeScript.

## Sobre o projeto

Este repositório contém cenários de teste para validar funcionalidades principais da aplicação, com foco em cadastro e navegação. A estrutura foi organizada com o padrão Page Object Model (POM) para facilitar manutenção e reutilização de código.

## Tecnologias

- Playwright
- TypeScript
- Node.js
- Yarn
- Faker e faker-br
- dotenv
- Allure Playwright

## Dependências principais

As dependências do projeto são definidas no arquivo package.json e incluem:

- @playwright/test: execução dos testes E2E
- @types/node: tipagem para Node.js
- dotenv: leitura do arquivo .env
- faker-br: geração de dados brasileiros falsos
- allure-playwright e allure-js-commons: geração de relatórios Allure
- @faker-js/faker: biblioteca adicional para geração de dados

## Pré-requisitos

- Node.js 20 ou superior
- Yarn 1.x
- Git

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Walterharder/PW-Buger-eats.git
```

2. Entre na pasta do projeto:

```bash
cd PW-Buger-eats
```

3. Instale o Yarn, se ainda não tiver:

```bash
corepack enable
corepack prepare yarn@1.22.22 --activate
```

4. Instale as dependências do projeto:

```bash
yarn install
```

5. Instale os navegadores do Playwright:

```bash
yarn playwright install --with-deps
```

6. Crie o arquivo .env na raiz do projeto com a URL base da aplicação:

```env
BASE_URL=https://buger-eats.vercel.app
```

7. Opcionalmente, para gerar o relatório Allure:

```bash
yarn test:allure
```

## Como executar os testes

Os scripts disponíveis estão definidos no arquivo package.json:

| Script | Descrição |
|--------|-----------|
| `yarn test` | Executa todos os testes |
| `yarn test:headed` | Executa os testes com a interface visível |
| `yarn test:debug` | Executa os testes em modo debug |
| `yarn test:report` | Abre o relatório HTML gerado |
| `yarn test:ui` | Abre a interface interativa do Playwright |
| `yarn test:codegen` | Gera testes automaticamente a partir da navegação |

## Estrutura do projeto

```text
PW-Buger-eats/
├── tests/
│   ├── e2e/                # Cenários de teste
│   ├── fixture/            # Dados e fixtures de teste
│   └── support/
│       ├── helpers/        # Funções auxiliares
│       └── pages/          # Page Object Model
│           ├── cadastro/   # Objetos de página do fluxo de cadastro
│           └── home/       # Objetos de página da home
├── playwright.config.ts    # Configuração do Playwright
├── package.json            # Dependências e scripts
└── README.md               # Documentação do projeto
```

## Observações

- Os testes utilizam fixtures e dados gerados para simular diferentes cenários.
- O projeto já está preparado para gerar relatórios HTML e traces em caso de falha.

## Autor

Walter Mateus Harder

## Licença

Este projeto está licenciado sob a licença MIT.

