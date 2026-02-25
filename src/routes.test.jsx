import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]} initialIndex={0}>
      <App />
    </MemoryRouter>
  )
}

describe('Routes', () => {
  it('shows Dashboard placeholder at /dashboard', () => {
    renderAt('/dashboard')
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })

  it('shows Saved placeholder at /saved', () => {
    renderAt('/saved')
    expect(screen.getByRole('heading', { name: /saved/i })).toBeInTheDocument()
  })

  it('shows Digest placeholder at /digest', () => {
    renderAt('/digest')
    expect(screen.getByRole('heading', { name: /digest/i })).toBeInTheDocument()
  })

  it('shows Settings placeholder at /settings', () => {
    renderAt('/settings')
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
  })

  it('shows Proof placeholder at /proof', () => {
    renderAt('/proof')
    expect(screen.getByRole('heading', { name: /proof/i })).toBeInTheDocument()
  })

  it('shows 404 Page Not Found for unknown path', () => {
    renderAt('/unknown-path')
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    expect(screen.getByText(/The page you are looking for does not exist/i)).toBeInTheDocument()
  })
})
