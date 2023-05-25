# Cookix
Projeto da faculdade de uma aplicação mobile feita em React Native, que utiliza a API da Open AI para realizar buscas de possíveis receitas com os ingredientes descritos pelo usuário e a API Speech to Text do Google para facilitar a entrada de dados.

## Instalação

Após o clone do projeto para a criação da node modules utilize o comando:

```bash
  yarn
```

Para iniciar o projeto utilize o comando:

```bash
  yarn start
```

O projeto possui o Eslint e Prettier configurado, caso alguma regra apresente erro utilize 
    
```bash
  yarn eslint --ext .jsx
  
  yarn prettier --write
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`CHAT_GPD_API_KEY`

`GCP_SPEECH_TO_TEXT_KEY`


## Funcionalidades

- Uso de voz para transcrever o nome dos ingredientes.
- Uso de inteligencia artificial para busca.
- Multiplataforma (Android e IOS).


## Screenshots

![App Screenshot](https://media.licdn.com/dms/image/D4D22AQH4KaoNYICTIQ/feedshare-shrink_2048_1536/0/1685043096061?e=1687996800&v=beta&t=PHyZL5NLt_i33z2v9gp1XUA3BaaU3IvkE50jJ4zs82I)

![App Screenshot](https://media.licdn.com/dms/image/D4D2CAQFkFJMnKSuWUQ/comment-image-shrink_8192_1280/0/1685043196517?e=1685649600&v=beta&t=xjYvdMzj6NEFGvwMGr3R5VWcRI46GVFC0_YJxR24LLI)


## Stack utilizada

**Front-end:** React Native, Native Base, NativeWind.

**Back-end:** Conexão com a API do Speech to Text(Google) e Chat GPT(OpenAI).


## Aprendizados

Por ser o primeiro contato com o React Native, foi surpreendente para eu a proximidade do React.JS
O primeiro contato com a OpenAI também foi algo bem positivo, acessar a documentação e utilizar do GPT foi algo desafiador.

