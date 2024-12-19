import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import HomeComponent from "../HomeComponent";
import useAuth from "../../lib/useAuth";

jest.mock("../../lib/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("HomeComponent", () => {

  test("exibe 'Carregando...' quando o usuário não está autenticado", () => {
    useAuth.mockReturnValue(null);

    render(<HomeComponent />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  test("exibe o conteúdo correto quando o usuário é autenticado", () => {
    useAuth.mockReturnValue({});

    render(<HomeComponent />);

    expect(screen.getByText("Conheça os quadrinhos de todos")).toBeInTheDocument();

    expect(screen.getByText("Super")).toBeInTheDocument();
  });

  test("exibe botões para 'Pesquisar por personagem' e 'Todos os quadrinhos' quando o usuário é autenticado", () => {
    useAuth.mockReturnValue({});

    render(<HomeComponent />);

    expect(screen.getByText("Pesquisar por personagem")).toBeInTheDocument();
    expect(screen.getByText("Todos os quadrinhos")).toBeInTheDocument();
  });

});
