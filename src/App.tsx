import { MouseEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Details from "./components/Details";
import Utils from "./utils/Utils";
import { WeatherDetails } from "./interfaces/WeatherDetails";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [dataCity, setDataCity] = useState<WeatherDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let urlWeather =
    import.meta.env.VITE_REACT_APP_WEATHER_API_URL +
    `?q=${inputValue}&appid=${
      import.meta.env.VITE_REACT_APP_WEATHER_API_KEY
    }&lang=${import.meta.env.VITE_REACT_APP_WEATHER_API_LANG}&units=${
      import.meta.env.VITE_REACT_APP_WEATHER_API_UNITS
    }`;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getWeather();
  };

  async function getWeather() {
    if (inputValue === "") {
      alert("Digite o nome da cidade.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(urlWeather);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erro ao buscar os dados da cidade."
        );
      }

      const data = await response.json();
      console.log(data);

      setDataCity(data);
    } catch (error) {
      console.error(error);
      toast.error("Cidade não encontrada. Por favor, tente novamente.");
    } finally {
      setLoading(false);
      setInputValue("");
    }
  }

  let icon = `http://openweathermap.org/img/wn/${dataCity?.weather[0]?.icon}@4x.png`;

  let dataView = dataCity !== null;

  let windSpeed = Utils.convertWindSpeed(dataCity?.wind.speed);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Previsão do Tempo
      </h1>
      <p className="py-3 text-gray-600">
        Descubra a previsão do tempo na sua cidade de forma simples e rápida
      </p>

      <div
        id="form"
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 bg-white p-6 shadow-md rounded-lg w-full sm:w-auto"
      >
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        />
        <button
          className={`bg-blue-600 text-white px-6 py-2 rounded-md transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Pesquisar"}
        </button>
      </div>

      {dataView && (
        <div className="flex flex-col mt-8 p-6 bg-white shadow-md rounded-lg w-full sm:w-3/4 lg:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {dataCity?.name}
          </h2>

          <figure className="flex flex-col items-center mt-4">
            <img
              className="w-24 h-24"
              src={icon}
              alt={`Ícone representando ${dataCity?.weather[0]["description"]}`}
            />
            <figcaption className="text-gray-600 italic mt-2">
              {dataCity?.weather[0]["description"]}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-6 md:flex-row justify-around items-center py-10">
            <div className="text-center">
              <p className="text-gray-800 font-bold">Temperatura</p>
              <p className="text-gray-600">
                {Utils.convertDecimalPoint(dataCity?.main.temp)} °C
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-800 font-bold">Humidade</p>
              <p className="text-gray-600">{dataCity?.main.humidity}%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-800 font-bold">Vento</p>
              <p className="text-gray-600">
                {Utils.convertDecimalPoint(windSpeed)} Km/h
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-md transition-all hover:bg-green-700"
              onClick={openModal}
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      )}
      <Details
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        details={dataCity}
      />
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
