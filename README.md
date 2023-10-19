# Geotempo

Geotempo é uma aplicação web que fornece informações climáticas em tempo real e previsões climáticas para uma cidade específica. Os dados climáticos são obtidos a partir de fontes como a API do OpenWeather e a API do HGWeather.

## Como Executar

Para executar a aplicação, siga os passos abaixo:

1. Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Clone este repositório:

   ```bash
   git clone https://github.com/thiagogpx/prevapp.git
   cd prevapp
   ```

3. Instale as dependências usando o npm ou yarn:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Inicie a aplicação:

   ```bash
   npm start
   # ou
   yarn start
   ```

A aplicação estará disponível em `http://localhost:5173/` no seu navegador.

## Como Usar

- Na página inicial, você pode digitar o nome de uma cidade e clicar no botão "Consulta" para obter informações climáticas em tempo real para a cidade selecionada.

- Você pode selecionar uma cidade anteriormente pesquisada no menu suspenso.

- O botão "Informações climáticas" abre um pop-up com informações detalhadas sobre o clima, incluindo temperatura atual, máxima e mínima, descrição do clima e fase da lua.

- O botão "Previsões climáticas" exibe um pop-up com previsões climáticas para os próximos dias, incluindo temperatura máxima, mínima, descrição do clima e probabilidade de chuva.

## Uso do OpenLayers

O mapa exibido na aplicação é renderizado usando o OpenLayers, uma poderosa biblioteca de mapeamento geoespacial. O OpenLayers é responsável pela exibição das informações de localização e pela interação com o usuário.

## Estrutura do Projeto

O projeto Geotempo é construído com React e consiste nos seguintes componentes principais:

- `App.jsx`: O componente principal que gerencia a interface do usuário e as interações do usuário.

- `HGWeather.jsx`: Componente que obtém e exibe informações climáticas em tempo real usando a API do HGWeather.

- `OpenWeather.jsx`: Componente que utiliza o OpenLayers para exibir um mapa interativo e obter informações de localização usando a API do OpenWeather.

- `PrevHGWeather.jsx`: Componente que obtém e exibe previsões climáticas usando a API do HGWeather.


