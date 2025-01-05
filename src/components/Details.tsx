import React, { useEffect } from "react";
import Utils from "../utils/Utils";
import { WeatherDetails } from "../interfaces/WeatherDetails";

interface DetailsProps {
  isOpen: boolean;
  onClose: () => void;
  details: WeatherDetails | null;
}

const Details: React.FC<DetailsProps> = ({ isOpen, onClose, details }) => {
  if (!isOpen) return null;

  useEffect(() => {
    console.log("info modal => ", details);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4">
        {/* Cabeçalho com nome da cidade */}
        <h2 className="text-2xl font-bold text-center">
          Clima em {details?.name}
        </h2>

        {/* Informações gerais sobre o clima */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src={`http://openweathermap.org/img/wn/${details?.weather[0]?.icon}@4x.png`}
            alt={details?.weather[0]?.description}
            className="w-20 h-20"
          />
          <p className="text-lg capitalize text-gray-700">
            {details?.weather[0]?.description}
          </p>
        </div>

        {/* Temperatura e detalhes */}
        <div className="grid grid-cols-2 gap-4">
          <p className="text-gray-700">
            <strong>Temperatura Atual:</strong>{" "}
            {Utils.convertDecimalPoint(details?.main.temp)}°C
          </p>
          <p className="text-gray-700">
            <strong>Sensação Térmica:</strong>{" "}
            {Utils.convertDecimalPoint(details?.main.feels_like)}°C
          </p>
          <p className="text-gray-700">
            <strong>Temp. Máxima:</strong>{" "}
            {Utils.convertDecimalPoint(details?.main.temp_max)}°C
          </p>
          <p className="text-gray-700">
            <strong>Temp. Mínima:</strong>{" "}
            {Utils.convertDecimalPoint(details?.main.temp_min)}°C
          </p>
          <p className="text-gray-700">
            <strong>Umidade:</strong> {details?.main.humidity}%
          </p>
          <p className="text-gray-700">
            <strong>Pressão:</strong> {details?.main.pressure} hPa
          </p>
          <p className="text-gray-700">
            <strong>Vento:</strong>{" "}
            {Utils.convertWindSpeed(details?.wind.speed)} km/h
          </p>
          <p className="text-gray-700">
            <strong>Direção do Vento:</strong> {details?.wind.deg}°
          </p>
        </div>
        <div className="text-center text-gray-500 text-sm">
          <p>
            <strong>Nascer do Sol:</strong>{" "}
            {details?.sys.sunrise
              ? new Date(details.sys.sunrise * 1000).toLocaleTimeString("pt-BR")
              : "N/A"}
          </p>
          <p>
            <strong>Pôr do Sol:</strong>{" "}
            {details?.sys.sunset
              ? new Date(details.sys.sunset * 1000).toLocaleTimeString("pt-BR")
              : "N/A"}
          </p>
        </div>

        {/* Botão de fechar */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
