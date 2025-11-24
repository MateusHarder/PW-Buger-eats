# PW-Buger-eats

Projeto de testes automatizados end-to-end (E2E) para o aplicativo Buger Eats utilizando Playwright.

## 📋 Sobre o Projeto

Este projeto contém testes automatizados para validar funcionalidades do aplicativo Buger Eats. Os testes são desenvolvidos usando Playwright, uma ferramenta moderna e confiável para automação de testes em navegadores.

## 🛠️ Tecnologias

- **Playwright** - Framework de automação de testes
- **TypeScript** - Linguagem de programação
- **Node.js** - Ambiente de execução
- **Yarn** - Gerenciador de pacotes

## 📁 Estrutura do Projeto

```
PW-Buger-eats/
├── tests/
│   ├── e2e/              # Testes end-to-end
│   ├── fixture/          # Fixtures e dados de teste
│   └── support/
│       ├── helpers/      # Funções auxiliares
│       └── pages/        # Page Object Model
│           ├── cadastro/ # Páginas relacionadas ao cadastro
│           └── home/     # Páginas relacionadas à home
├── playwright.config.ts  # Configuração do Playwright
├── package.json          # Dependências e scripts
└── README.md            # Este arquivo
```

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Yarn

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/Walterharder/PW-Buger-eats.git
```

2. Entre no diretório do projeto:
```bash
cd PW-Buger-eats
```

3. Instale as dependências:
```bash
yarn install
```

4. Instale os navegadores do Playwright:
```bash
npx playwright install
```

## ⚙️ Configuração

O arquivo `playwright.config.ts` contém as configurações do projeto:

- **Navegadores configurados**: Chromium, Firefox e WebKit
- **Modo paralelo**: Habilitado para execução mais rápida
- **Retry**: Configurado para 2 tentativas em ambiente CI
- **Reporter**: HTML para visualização de relatórios
- **Trace**: Habilitado para retentativas de testes falhados

## 📝 Scripts Disponíveis - 🧪 Executando os Testes

| Script | Descrição |
|--------|-----------|
| `yarn test` | Executa todos os testes |
| `yarn test:headed` | Executa testes com interface gráfica visível |
| `yarn test:debug` | Executa testes em modo debug |
| `yarn test:report` | Abre o relatório HTML dos testes |
| `yarn test:ui` | Executa testes com interface interativa |
| `yarn test:codegen` | Gera código de teste automaticamente |

## 🏗️ Arquitetura

O projeto utiliza o padrão **Page Object Model (POM)**, que organiza os elementos e ações de cada página em classes separadas, facilitando a manutenção e reutilização do código.

### Estrutura de Pastas

- **tests/e2e/**: Contém os arquivos de teste propriamente ditos
- **tests/support/pages/**: Contém as classes Page Object Model
- **tests/support/helpers/**: Contém funções auxiliares reutilizáveis
- **tests/fixture/**: Contém fixtures e dados de teste

## 👤 Autor

**Walter Mateus Harder**
- Email: walter.harder@incentivar.io
- GitHub: [@Walterharder](https://github.com/Walterharder)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🔗 Links Úteis

- [Documentação do Playwright](https://playwright.dev/)
- [Guia de Testes do Playwright](https://playwright.dev/docs/intro)
- [Repositório do Projeto](https://github.com/Walterharder/PW-Buger-eats.git)

