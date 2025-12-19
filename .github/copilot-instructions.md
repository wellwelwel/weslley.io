# Instruções do GitHub Copilot

## Regras de Estilo de Código

### Controle de Fluxo

- Evite `else`/`if-else`, opte por `return`, `continue`, `break`, etc., sempre que possível.
- Use guard clauses para tratar casos especiais no início das funções.
- Opte por alternativas e recursos modernos da linguagem e evite operações síncronas (não use opções legadas).
- Prefira recursos nativos e, em casos complexos (como recriar a roda), sugira ferramentas altamente mantidas antes de continuar.
- Prefira `const` com arrow functions ao invés de funções tradicionais.
  - Exemplo: `const myFunction = () => {}` ao invés de `function myFunction() {}`.
- Evite usar protótipos como `.toString()`, `.valueOf()`, etc., preferindo métodos globais como `String()`, etc., o mesmo para objetos e quaisquer outros tipos.
- Não gere strings a partir de `let` com `+=`, prefira `Array.join` ou template strings com `const`.
- Quando só houver uma única linha no corpo de funções, loops ou condicionais, opte por omitir as chaves `{}`.
- Nunca use, por exemplo, `' ' + line`, sempre use template strings, como `` `${line}` ``.
- Ao criar um objeto com propriedades dinâmicas, use `Object.create(null)` ao invés de `{}`.
- Importações dentro dos artigos `.mdx` devem ser feitas após o "truncate".

### Testes

- Os testes são realizados com o test runner Poku, no diretório `./test`.
  - É importante notar que o Poku preserva o `async/await` para testes assíncronos (por exemplo: `await describe(...)`, `await it(...)` e `await test(...)`).
  - Use o método `strict` do Poku para asserções.
- Os testes devem garantir a funcionalidade dos `./src/helpers/` e `./tools/`.
- Para testes sem grupos, utilize o método `test`.
- Para grupos de testes, utilize `describe` + `it`.
- Em asserções individuais dentro do `it` ou `test`, use as mensagens descritivas dos testes no próprio `strict` ao invés do `it` ou `test`, por exemplo: `strict.equal(1, 1, 'should handle deeply nested headings')`.
  - Todas as asserções devem conter mensagens descritivas, não apenas os blocos de teste.
  - Quando o bloco de testes possui múltiplas asserções, o `it` ou `test` deve descrever o grupo de asserções, além das descrições das asserções em si.
  - Quando há uma única asserção no bloco de teste, a descrição do `it` ou `test` pode ser omitida.
- Não importe arquivos `tsx` diretamente nos testes.
- Peça permissão antes de criar um teste.
- Ao finalizar um testes, solicite a execução de `npm test`.

### Documentação

- Não crie documentações para o projeto atual.

### Idioma do Código Gerado

- Todo o código gerado deve ser totalmente em inglês, incluindo comentários e variáveis.
- Use nomes claros e descritivos em inglês para variáveis, funções e tipos, optando por uma palavra quando possível, ou camel case. Se passar de três palavras, julgue a viabilidade de transformar em um objeto.
  - Evite variáveis como `i`, `j`, etc., mesmo em loops curtos e simples.

## Diretrizes Específicas do Projeto

### Commits

- Mensagens de commits devem seguir o padrão Conventional Commits, sempre em inglês.

### TypeScript

- Este é um projeto TypeScript (latest). Sempre use sintaxe TypeScript com tipagem adequada.
- Utilize as definições de tipos de `src/@types/` ao trabalhar com artigos e front matter.
- Não use o tipo `any` a menos que seja absolutamente necessário: prefira `unknown` no lugar.
- Evite usar `as` a menos que necessário: prefira `satisfies` quando aplicável.
- O teste básico de compilação do TypeScript é feito via `npm run typecheck`.
  - Para erros de compilação, os erros devem ser corrigidos no próprio código.

### Estrutura de Arquivos

- Siga a estrutura existente do projeto:
  - Ferramentas em `/tools/`
  - Plugins desenvolvidos para o Docusaurus em `/plugins/`
  - Definições de tipos em `/src/@types/`
  - Artigos em `/src/i18n/**/{articles,talks}/**/*.{mdx,md}`
  - Páginas em `/src/pages/`
    - Se necessário usar recursos backend, utilize os diretórios `/tools/`, refletindo para o plugin em questão.

### Docusaurus

- Este projeto usa Docusaurus. Esteja atento às convenções e APIs do Docusaurus.
- Respeite a arquitetura de plugins em `/plugins/`.

### Artigos

- Artigos são armazenados sem hierarquia definida, deixando a organização de diretórios à escolha do usuário.
- Artigos usam formato MDX ou MD com front matter.
- Use os utilitários existentes em `/tools/` para processamento de artigos.

### Qualidade de Código

- Escreva código limpo e manutenível seguindo o princípio de responsabilidade única.
- Mantenha funções pequenas e focadas.
- Use nomes significativos para variáveis e funções.
- Prefira `return`, `continue`, `break`, etc., em vez de `else` ou `else-if` sempre que possível.
- Adicione comentários apenas quando necessário para explicar o "porquê", não o "o quê".

### Tratamento de Erros

- Trate erros graciosamente com early returns.
- Valide entradas no início das funções.
- Forneça mensagens de erro significativas.

### Testes fora do escopo real do projeto (debugging e validação rápida)

- Em hipótese alguma sugira executar comandos com `node -e` ou similares para testes rápidos.
  - Você pode testar, depurar ou validar situações usando os arquivos `t.mts` ou `t.ts` na raiz do projeto (eles não são rastreados pelo Git).
    - Não se preocupe em sobrescrevê-los, eles são apenas para testes temporários.
