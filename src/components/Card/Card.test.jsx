import { render, screen } from '@testing-library/react';
import Card from "../Card"

test('renderiza o componente do cartão com nome e descrição', () => {
  const props = {
    thumbnail: { path: 'https://example.com/image', extension: 'jpg' },
    name: 'Test Name',
    description: 'Test Description',
  };

  render(<Card {...props} />);
  
  const titleElement = screen.getByText(/Test Name/i);
  const descriptionElement = screen.getByText(/Test Description/i);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('renderiza a fonte correta da imagem', () => {
  const props = {
    thumbnail: { path: 'https://example.com/image', extension: 'jpg' },
    name: 'Test Name',
    description: 'Test Description',
  };

  render(<Card {...props} />);
  
  const imageElement = screen.getByRole('img');
  expect(imageElement).toHaveAttribute('src', 'https://example.com/image.jpg');
});

test('renderiza sem descrição', () => {
  const props = {
    thumbnail: { path: 'https://example.com/image', extension: 'jpg' },
    name: 'Test Name',
    description: null,
  };

  render(<Card {...props} />);
  
  const descriptionElement = screen.queryByText(/Test Description/i);
  expect(descriptionElement).toBeNull();  // Não deve renderizar a descrição
});

