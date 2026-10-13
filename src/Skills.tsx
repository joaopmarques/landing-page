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

function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
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
    <button type="button" className={className} onClick={copy} aria-live="polite">
      {copied ? 'Copied ✓' : label}
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
        <span className="gradient">Skills</span> for your agent.
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
                <CopyButton text={command(skill)} label="Copy" className="copy-command" />
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
