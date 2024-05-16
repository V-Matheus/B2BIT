import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { NotFound } from './NotFound';
describe('NotFound > Unit tests', () => {
  it('should render Auth component without errors', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const logoImage = screen.getByAltText('Logo b2bit');
    expect(logoImage).toBeInTheDocument();

    expect(screen.getByText('Error 404')).toBeInTheDocument();

    expect(screen.getByText('Page not found')).toBeInTheDocument();

    expect(screen.getByText('Back to Home')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Back to Home'));
    expect(window.location.pathname).toEqual('/');
  });
});
