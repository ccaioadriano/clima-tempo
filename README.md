# Clima Tempo

Esta é uma aplicação de previsão do tempo que permite aos usuários obter informações meteorológicas atualizadas para diferentes localidades.

## Funcionalidades

- Exibir a previsão do tempo atual da cidade

## Tecnologias Utilizadas

- react
- API de Previsão do Tempo OpenWeatherMap

## Como Executar Localmente

Siga os passos abaixo para executar a aplicação localmente:

1. **Clone o repositório:**
  ```bash
  git clone https://github.com/ccaioadriano/weather-app.git
  ```
2. **Navegue até o diretório do projeto:**
  ```bash
  cd weather-app
  ```
3. **Instale as dependências:**
  ```bash
  npm install
  ```

4. **Execute a aplicação:**
  ```bash
  npm run dev
  ```

5. **Obtenha uma chave de API:**
  - Registre-se no [OpenWeatherMap](https://openweathermap.org/) e obtenha uma chave de API.

  5.1 **Configure a chave de API:**
    - Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API:
      ```plaintext
      VITE_REACT_APP_API_KEY=sua-chave-de-api
      ```


6. **Execute a aplicação:**
  - Atualize a página no navegador para carregar a previsão do tempo.

Pronto! Agora você deve conseguir visualizar a previsão do tempo para diferentes localidades.

## Contribuição

Se você deseja contribuir com o projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.