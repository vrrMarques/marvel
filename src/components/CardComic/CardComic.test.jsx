import { render, screen, fireEvent } from "@testing-library/react";
import ComicCard from "../CardComic"
import '@testing-library/jest-dom';

describe('ComicCard', () => {
  
  const mockComic = {
    thumbnail: { path: "https://example.com/image", extension: "jpg" },
    title: "Amazing Comic",
    prices: [{ price: 12.99 }],
  };

  const mockToggleFavorite = jest.fn();

  test('renderiza título, imagem e preço dos quadrinhos', () => {
    render(<ComicCard comic={mockComic} isFavorite={false} toggleFavorite={mockToggleFavorite} />);
    
    expect(screen.getByAltText("Amazing Comic")).toBeInTheDocument();
    expect(screen.getByText("Amazing Comic")).toBeInTheDocument();
    expect(screen.getByText("$12.99")).toBeInTheDocument();
  });

  test('chama toggleFavorite quando o botão é clicado', () => {
    render(<ComicCard comic={mockComic} isFavorite={false} toggleFavorite={mockToggleFavorite} />);
    
    const button = screen.getByText("Add aos favoritos");
    
    fireEvent.click(button);
    
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockComic);
  });

  test('botão exibe o texto correto com base em isFavorite', () => {
    const { rerender } = render(<ComicCard comic={mockComic} isFavorite={false} toggleFavorite={mockToggleFavorite} />);
    
    expect(screen.getByText("Add aos favoritos")).toBeInTheDocument();
    
    rerender(<ComicCard comic={mockComic} isFavorite={true} toggleFavorite={mockToggleFavorite} />);
    
    expect(screen.getByText("Remover dos favoritos")).toBeInTheDocument();
  });

});
