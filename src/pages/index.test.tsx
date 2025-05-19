import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Home from "./index";
import { LanguageProvider } from "../context/LanguageContext";

// Mock de Axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Render con el proveedor de contexto
const renderWithProvider = () => {
  return render(
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );
};

describe("Página principal - aplicación clima", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra la info del clima tras una búsqueda exitosa", async () => {
    const mockResponse = {
      data: {
        name: "Quito",
        main: { temp: 22, humidity: 60 },
        weather: [{ description: "nublado" }],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);
    renderWithProvider();

    const input = screen.getByPlaceholderText(/ingresa una ciudad/i);
    await userEvent.type(input, "Quito");

    const suggestion = await screen.findByText(/Quito/i);
    await userEvent.click(suggestion);

    await waitFor(() => {
      expect(screen.getByText(/temperatura actual/i)).toBeInTheDocument();
      expect(screen.getByText(/22/i)).toBeInTheDocument();
      expect(screen.getByText(/60/i)).toBeInTheDocument();
      expect(screen.getByText(/nublado/i)).toBeInTheDocument();
    });
  });

  test("maneja error cuando la ciudad es inválida", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Ciudad no encontrada"));
    renderWithProvider();

    const input = screen.getByPlaceholderText(/ingresa una ciudad/i);
    await userEvent.type(input, "CiudadInvalida");
    await userEvent.keyboard("{enter}");

    await waitFor(() => {
      expect(
        screen.getByText(/ciudad no encontrada|error/i)
      ).toBeInTheDocument();
    });
  });

  test("campo de entrada funciona correctamente", async () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText(/ingresa una ciudad/i);
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "Guayaquil");
    expect((input as HTMLInputElement).value).toBe("Guayaquil");
  });
});
