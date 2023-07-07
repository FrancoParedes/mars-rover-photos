import { render, screen, fireEvent } from '@testing-library/react';
import Picture from '../Picture';

window.open = jest.fn();
describe('Picture component', () => {
  test('renders an image', () => {
    render(<Picture id="1" src="image.jpg" />);
    const imageElement = screen.getByRole('button');
    expect(imageElement).toBeInTheDocument();
  });

  test('opens external link when clicked', () => {
    render(<Picture id="1" src="image.jpg" />);
    const imageElement = screen.getByRole('button');
    fireEvent.click(imageElement);
    const externalLink = screen.getByText('OPEN EXTERNAL');
    fireEvent.click(externalLink);
    expect(window.open).toHaveBeenCalledWith('image.jpg', '_blank');
  });
});
