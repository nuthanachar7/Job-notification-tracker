import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotFoundPage } from './NotFoundPage'

describe('NotFoundPage', () => {
  it('renders Page Not Found and subtext', () => {
    render(<NotFoundPage />)
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    expect(screen.getByText(/The page you are looking for does not exist/i)).toBeInTheDocument()
  })
})
