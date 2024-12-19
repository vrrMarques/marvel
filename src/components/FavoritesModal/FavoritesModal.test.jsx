import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import FavoritesModal from "../FavoritesModal";
import useFavorites from "../../lib/useFavorites";

jest.mock("../../lib/useFavorites", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("FavoritesModal", () => {
  
  test("não renderiza quando isOpen é falso", () => {
    useFavorites.mockReturnValue({ favorites: [], removeFavorite: jest.fn() });

    render(<FavoritesModal isOpen={false} onClose={jest.fn()} />);

    expect(screen.queryByText("Meus quadrinhos Favoritos")).not.toBeInTheDocument();
  });

  test("renderiza corretamente quando isOpen é verdadeiro", () => {
    useFavorites.mockReturnValue({ favorites: [], removeFavorite: jest.fn() });

    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText("Meus quadrinhos Favoritos")).toBeInTheDocument();
  });

  test("exibe mensagem quando não há favoritos", () => {
    useFavorites.mockReturnValue({ favorites: [], removeFavorite: jest.fn() });

    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText("Nenhum favorito encontrado.")).toBeInTheDocument();
  });

  test("exibe favoritos quando há favoritos", () => {
    const mockFavorites = [{ title: "Favorite 1" }, { title: "Favorite 2" }];
    useFavorites.mockReturnValue({ favorites: mockFavorites, removeFavorite: jest.fn() });

    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText("Favorite 1")).toBeInTheDocument();
    expect(screen.getByText("Favorite 2")).toBeInTheDocument();
  });

  test("chama onClose quando o botão 'Fechar' é clicado", () => {
    useFavorites.mockReturnValue({ favorites: [], removeFavorite: jest.fn() });

    const mockOnClose = jest.fn();
    render(<FavoritesModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Fechar"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("chama removeFavorite quando o botão 'Remover' é clicado", () => {
    const mockFavorites = [{ title: "Favorite 1" }];
    const mockRemoveFavorite = jest.fn();
    useFavorites.mockReturnValue({ favorites: mockFavorites, removeFavorite: mockRemoveFavorite });

    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);

    fireEvent.click(screen.getByText("Remover"));

    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
  });

});
