/**
 * Secondary Panel (30%): Step explanation, copyable prompt box, consistent buttons.
 */

export function Panel({ title, stepExplanation, promptContent, children }) {
  return (
    <div className="panel">
      {title && <h3 className="panel__title">{title}</h3>}
      {stepExplanation && (
        <p className="panel__step-explanation">{stepExplanation}</p>
      )}
      {promptContent != null && (
        <div
          className="prompt-box"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          role="textbox"
          aria-label="Copyable prompt"
        >
          {promptContent}
        </div>
      )}
      {children}
    </div>
  );
}
