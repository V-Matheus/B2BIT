import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Profile } from './Profile';

describe('Profile > Unit tests', () => {
  it('should render Profile component without errors', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();

    expect(screen.getByText('Profile picture')).toBeInTheDocument();

    const logoImage = screen.getByAltText('profile image');
    expect(logoImage).toBeInTheDocument();

    expect(screen.getByTestId('name-p')).toBeInTheDocument();
    expect(screen.getByTestId('name-h1')).toBeInTheDocument();

    expect(screen.getByTestId('email-p')).toBeInTheDocument();
    expect(screen.getByTestId('email-h1')).toBeInTheDocument();
  });
});
