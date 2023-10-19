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

## Testes de Integração com APIs

Os testes de integração foram realizados usando a ferramenta Postman para verificar a funcionalidade das APIs utilizadas no projeto Geotempo. Aqui estão os testes e os resultados esperados:

### API de Localização

**Teste 1: Consulta de Cidade**

- Método: GET
- URL: `http://api.openweathermap.org/geo/1.0/direct?q=cityname&limit=1&appid=your_api_key`
- Parâmetros:
  - `q`: Nome da cidade a ser consultada (por exemplo, "São Paulo")
  - `limit`: 1 (para obter apenas uma correspondência)
  - `appid`: Sua chave de API do OpenWeather

**Resultado Esperado:**

- Status de resposta: 200 (OK)
- Exemplo de resposta:

```json
[
  {
    "name": "Ilhabela",
    "local_names": {
      "pt": "Ilhabela"
    },
    "lat": -23.816628,
    "lon": -45.368685,
    "country": "BR",
    "state": "São Paulo"
  }
]
```

### API de Previsão do Tempo

**Teste 2: Previsão do Tempo para São Paulo**

- Método: GET
- URL: `https://api.hgbrasil.com/weather?format=json-cors&key=your_api_key&city_name=São%20Paulo`

**Resultado Esperado:**

- Status de resposta: 200 (OK)
- Exemplo de resposta:

```json
{
  "by": "default",
  "valid_key": false,
  "results": {
    "temp": 18,
    "date": "19/10/2023",
    "time": "15:07",
    "condition_code": "28",
    "description": "Tempo nublado",
    "currently": "dia",
    "cid": "",
    "city": "São Paulo, SP",
    "img_id": "28",
    "humidity": 85,
    "cloudiness": 100.0,
    "rain": 0.0,
    "wind_speedy": "6.17 km/h",
    "wind_direction": 160,
    "wind_cardinal": "SE",
    "sunrise": "05:30 am",
    "sunset": "06:12 pm",
    "moon_phase": "waxing_crescent",
    "condition_slug": "cloudly_day",
    "city_name": "São Paulo",
    "timezone": "-03:00",
    "forecast": [
      {
        "date": "19/10",
        "weekday": "Qui",
        "max": 18,
        "min": 15,
        "cloudiness": 97.0,
        "rain": 0.0,
        "rain_probability": 33,
        "wind_speedy": "4.96 km/h",
        "description": "Tempo nublado",
        "condition": "cloudly_day"
      },
      {
        "date": "20/10",
        "weekday": "Sex",
        "max": 21,
        "min": 15,
        "cloudiness": 100.0,
        "rain": 0.0,
        "rain_probability": 40,
        "wind_speedy": "4.41 km/h",
        "description": "Tempo nublado",
        "condition": "cloudly_day"
      }
      // Outros dias da previsão
    ],
    "cref": "b788c1"
  },
  "execution_time": 0.0,
  "from_cache": true
}
```

### Teste de Ícones

Além dos testes nas APIs, também foi realizado um teste de exibição de ícones com base nos resultados da API. Os ícones de condições climáticas e fases da lua foram associados com sucesso aos dados obtidos.

## Passos Futuros

O OpenLayers oferece a capacidade de adicionar vetores ao mapa, o que era uma funcionalidade destacada na documentação para a criação desta página da web. Portanto, como próxima etapa, planejo incorporar ao mapa dois ícones representando informações sobre o tipo de clima previsto e a fase da Lua. Embora essa funcionalidade não tenha sido entregue na versão atual, devido a desafios encontrados na manipulação da biblioteca OpenLayers, pretendo trabalhar nessa implementação em versões futuras do projeto. Esta adição proporcionará uma experiência mais completa e informativa aos usuários, tornando o projeto ainda mais valioso e funcional.

Precisamos também aplicar as boas práticas, utilizando da desestruturação para ter um código mais limpo.
