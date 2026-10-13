import { useState } from 'react'

type Skill = {
  emoji: string
  name: string
  description: string
  repo: string
}

const skills: Skill[] = [
  {
    emoji: '🍖',
    name: 'barbeque',
    description:
      'Grills your plan for you. It picks every answer, shows its confidence, and serves a short plan plus ideas you did not consider.',
    repo: 'joaopmarques/barbeque',
  },
  {
    emoji: '🧐',
    name: 'code-review-review',
    description:
      'Explains a reviewer’s PR comments in plain English and judges each one. Then it fixes, pushes, and replies when you say go.',
    repo: 'joaopmarques/code-review-review',
  },
]

const command = (skill: Skill) => `npx skills add ${skill.repo}`

const prompt = (skill: Skill) =>
  `Install the "${skill.name}" agent skill from https://github.com/${skill.repo}.
If you are Claude Code, run:
claude plugin marketplace add joaopmarques/claude-plugins
claude plugin install ${skill.name}@joaopmarques
Otherwise, run: ${command(skill)}
Then tell me how to use the skill.`

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

function CopyButton({
  text,
  label,
  className,
  iconOnly = false,
}: {
  text: string
  label: string
  className?: string
  iconOnly?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt('Copy this:', text)
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={copy}
      aria-label={iconOnly ? (copied ? 'Copied' : label) : undefined}
      title={iconOnly ? label : undefined}
    >
      {iconOnly ? (copied ? <CheckIcon /> : <CopyIcon />) : copied ? 'Copied ✓' : label}
    </button>
  )
}

function Skills() {
  return (
    <div className="App">
      <h1>
        <a href="https://jpmarqu.es" className="home-link">João P. Marques</a>
      </h1>
      <p className="tagline">
        <strong>Skills</strong> for your agent.
      </p>

      <ul className="skills">
        {skills.map((skill) => (
          <li key={skill.name} className="skill">
            <div className="skill-head">
              <span className="skill-emoji" aria-hidden="true">{skill.emoji}</span>
              <a href={`https://github.com/${skill.repo}`} target="_blank" className="skill-name">
                {skill.name}
              </a>
            </div>
            <p className="skill-description">{skill.description}</p>
            <div className="skill-install">
              <CopyButton text={prompt(skill)} label="Copy prompt for agent" className="copy-prompt" />
              <span className="or">or</span>
              <code className="command">
                <span>{command(skill)}</span>
                <CopyButton text={command(skill)} label="Copy command" className="copy-command" iconOnly />
              </code>
            </div>
          </li>
        ))}
      </ul>

      <div className="links-container">
        <a href="https://jpmarqu.es">← Homepage</a>
        <a href="https://github.com/joaopmarques/claude-plugins" target="_blank">Plugin marketplace</a>
      </div>
    </div>
  )
}

export default Skills
