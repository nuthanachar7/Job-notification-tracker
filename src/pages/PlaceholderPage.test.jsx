import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PlaceholderPage } from './PlaceholderPage'

describe('PlaceholderPage', () => {
  it('renders title and subtext', () => {
    render(<PlaceholderPage title="Dashboard" />)
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByText(/This section will be built in the next step/i)).toBeInTheDocument()
  })

  it('renders different titles', () => {
    render(<PlaceholderPage title="Settings" />)
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
  })
})
