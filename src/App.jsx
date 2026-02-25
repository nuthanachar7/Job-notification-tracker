import {
  TopBar,
  ContextHeader,
  Workspace,
  Panel,
  ProofFooter,
} from './components/layout';

/**
 * Step 1: Design system foundation only.
 * Layout: Top Bar → Context Header → Workspace (70%) + Panel (30%) → Proof Footer.
 */
function App() {
  return (
    <div className="app">
      <TopBar currentStep={1} totalSteps={4} status="In Progress" />

      <ContextHeader
        title="Design system foundation"
        subtext="Layout, tokens, and components ready for product features."
      />

      <main className="main-content">
        <Workspace>
          <div className="card">
            <h3>Primary workspace</h3>
            <p className="text-small text-muted">
              Clean cards, predictable components, subtle borders. Content goes here.
            </p>
          </div>
          <div className="card">
            <p>Second card. No crowding, no heavy shadows.</p>
          </div>
        </Workspace>

        <Panel
          title="Step"
          stepExplanation="Step explanation and guidance live in the secondary panel. Keep it concise."
          promptContent="Copyable prompt or code snippet"
        >
          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            <button type="button" className="btn btn-primary">
              Primary
            </button>
            <button type="button" className="btn btn-secondary">
              Secondary
            </button>
          </div>
        </Panel>
      </main>

      <ProofFooter completedIds={[]} />
    </div>
  );
}

export default App;
