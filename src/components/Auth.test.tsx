import { render, screen } from '@testing-library/react';
import { Auth } from './Auth';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Auth > Unit tests', () => {
  it('should render Auth component without errors', () => {
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>,
    );
''
    const logoImage = screen.getByAltText('Logo b2bit');
    expect(logoImage).toBeInTheDocument();

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByTestId('email-field')).toBeInTheDocument();

    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByTestId('password-field')).toBeInTheDocument();

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
