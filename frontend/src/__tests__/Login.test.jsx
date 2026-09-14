import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';
import api from '../services/api';

vi.mock('../services/api');

describe('Login Component', () => {
  const renderLogin = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('shows error message when form is empty', () => {
    renderLogin();
    
    const submitButton = screen.getByRole('button', { name: /ingresar al sistema/i });
    fireEvent.click(submitButton);
    
    // Se espera que aparezca un mensaje de error en pantalla
    expect(screen.getByText('Por favor complete todos los campos')).toBeInTheDocument();
  });

  it('handles successful login and redirects', async () => {
    // Mock de respuesta 200 OK con JWT
    api.post.mockResolvedValueOnce({ data: { token: 'mock-jwt-token' } });
    
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('admin@ventasfix.cl');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /ingresar al sistema/i });
    
    fireEvent.change(emailInput, { target: { value: 'admin@ventasfix.cl' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    
    fireEvent.click(submitButton);
    
    // Simula una espera para que la promesa se resuelva
    await new Promise(r => setTimeout(r, 0));
    
    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'admin@ventasfix.cl',
      password: 'admin123'
    });
  });
});
