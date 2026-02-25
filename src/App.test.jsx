import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  )
}

describe('App', () => {
  it('renders the app with navigation', () => {
    renderApp()
    expect(screen.getByText('Job Notification Tracker')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /saved/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /digest/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /proof/i })).toBeInTheDocument()
  })

  it('renders landing page on / with headline and CTA', () => {
    renderApp()
    expect(screen.getByRole('heading', { name: /stop missing the right jobs/i })).toBeInTheDocument()
    expect(screen.getByText(/Precision-matched job discovery delivered daily at 9AM/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /start tracking/i })).toHaveAttribute('href', '/settings')
  })
})
