import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Navbar from "../Navbar";
import { logout } from "../../lib/auth";
import useAuth from "../../lib/useAuth";

jest.mock("../../lib/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../lib/auth", () => ({
  logout: jest.fn(),
}));

jest.mock("../FavoritesModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose }) => isOpen ? (
    <div>
      Favorites Modal
      <button onClick={onClose}>Fechar</button>
    </div>
  ) : null,
}));

describe("Navbar", () => {

  test("renderiza links de navegação corretamente", () => {
    useAuth.mockReturnValue(null);

    render(<Navbar />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Sobre")).toBeInTheDocument();
    expect(screen.queryByText("Favoritos")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  test("renderiza os botões 'Favoritos' e 'Logout' quando o usuário é autenticado", () => {
    useAuth.mockReturnValue({});

    render(<Navbar />);

    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("abre e fecha o Modal Favoritos quando o botão 'Favoritos' é clicado", async () => {
    useAuth.mockReturnValue({});

    render(<Navbar />);

    expect(screen.queryByText("Favorites Modal")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Favoritos"));

    await waitFor(() => expect(screen.getByText("Favorites Modal")).toBeInTheDocument());

    const closeButton = screen.getByText("Fechar");

    fireEvent.click(closeButton);

    await waitFor(() => expect(screen.queryByText("Favorites Modal")).not.toBeInTheDocument());
  });

  test("chama a função de logout quando o botão 'Logout' é clicado", async () => {
    useAuth.mockReturnValue({});

    render(<Navbar />);

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => expect(logout).toHaveBeenCalled());
  });

});
