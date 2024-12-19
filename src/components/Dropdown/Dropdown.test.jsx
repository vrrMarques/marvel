import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dropdown from "../Dropdown";
import { logout } from "../../lib/auth";
import '@testing-library/jest-dom';

jest.mock("../../lib/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../lib/auth", () => ({
  logout: jest.fn(),
}));

jest.mock("../FavoritesModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose }) => 
    isOpen ? (
      <div>
        Favorites Modal
        <button onClick={onClose}>Fechar</button>
      </div>
    ) : null,
}));

jest.mock("../HeroModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose }) => 
    isOpen ? (
      <div>
        Hero Modal
        <button onClick={onClose}>Fechar</button>
      </div>
    ) : null,
}));

describe("Dropdown", () => {

  test("renderiza links de navegação corretamente", () => {
    require("../../lib/useAuth").default.mockReturnValue(null);
    
    render(<Dropdown />);
    
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Sobre")).toBeInTheDocument();
    expect(screen.queryByText("Quadrinhos favoritos")).not.toBeInTheDocument();
    expect(screen.queryByText("Meus Heróis")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  test("renders Favorites and Logout buttons when user is authenticated", () => {
    require("../../lib/useAuth").default.mockReturnValue({});

    render(<Dropdown />);
    
    expect(screen.getByText("Meus Heróis")).toBeInTheDocument();
    expect(screen.getByText("Quadrinhos favoritos")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("Clique no botão Quadrinhos favoritos e modal", async () => {
    require("../../lib/useAuth").default.mockReturnValue({});

    render(<Dropdown />);
    
    expect(screen.queryByText("Favorites Modal")).not.toBeInTheDocument();
    
    const favoritesButton = screen.getByText("Quadrinhos favoritos");
    
    fireEvent.click(favoritesButton);
    
    await waitFor(() => expect(screen.getByText("Favorites Modal")).toBeInTheDocument());
    
    const closeModalButton = screen.getByText("Fechar");
    fireEvent.click(closeModalButton);
    
    await waitFor(() => expect(screen.queryByText("Favorites Modal")).not.toBeInTheDocument());
  });

  test("Clique no botão Meus Heróis e modal", async () => {
    require("../../lib/useAuth").default.mockReturnValue({});

    render(<Dropdown />);
    
    expect(screen.queryByText("Hero Modal")).not.toBeInTheDocument();
    
    const heroButton = screen.getByText("Meus Heróis");
    
    fireEvent.click(heroButton);
    
    await waitFor(() => expect(screen.getByText("Hero Modal")).toBeInTheDocument());
    
    const closeModalButton = screen.getByText("Fechar");
    fireEvent.click(closeModalButton);
    
    await waitFor(() => expect(screen.queryByText("Hero Modal")).not.toBeInTheDocument());
  });

  test("chama a função de logout quando o botão Logout é clicado", async () => {
    require("../../lib/useAuth").default.mockReturnValue({});

    render(<Dropdown />);
    
    const logoutButton = screen.getByText("Logout");
    
    fireEvent.click(logoutButton);
    
    await waitFor(() => expect(logout).toHaveBeenCalled());
  });
});
