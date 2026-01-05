// Proposal-specific commodity phrases with weights
export interface CommodityPhrase {
  pattern: RegExp
  category: string
  weight: number
  reason: string
}

export const proposalPhrases: CommodityPhrase[] = [
  // Opening clichés
  {
    pattern: /we are pleased to (submit|present|provide)/gi,
    category: 'Opening cliché',
    weight: 3,
    reason: 'Every proposal starts this way. Buyers skip it.'
  },
  {
    pattern: /thank you for the opportunity/gi,
    category: 'Opening cliché',
    weight: 3,
    reason: 'Generic gratitude wastes valuable first-impression space.'
  },
  {
    pattern: /we look forward to working with you/gi,
    category: 'Closing cliché',
    weight: 2,
    reason: 'Empty enthusiasm. Every competitor says this.'
  },

  // Leadership claims
  {
    pattern: /industry lead(er|ing)/gi,
    category: 'Leadership claim',
    weight: 4,
    reason: 'Unverifiable. Every competitor calls themselves a leader.'
  },
  {
    pattern: /market lead(er|ing)/gi,
    category: 'Leadership claim',
    weight: 4,
    reason: 'Who verified this? Buyers are skeptical.'
  },
  {
    pattern: /world[-\s]?class/gi,
    category: 'Leadership claim',
    weight: 3,
    reason: 'Vague superlative with no proof.'
  },
  {
    pattern: /best[-\s]?in[-\s]?class/gi,
    category: 'Leadership claim',
    weight: 3,
    reason: 'By whose measure? Buyers won\'t believe it.'
  },

  // Quality claims
  {
    pattern: /quality (products?|services?|solutions?|work)/gi,
    category: 'Vague quality',
    weight: 3,
    reason: 'No definition of what "quality" means for this project.'
  },
  {
    pattern: /highest (quality|standards?)/gi,
    category: 'Vague quality',
    weight: 3,
    reason: 'Unmeasurable claim every competitor makes.'
  },
  {
    pattern: /commitment to (quality|excellence)/gi,
    category: 'Vague quality',
    weight: 3,
    reason: 'Commitment is assumed. Show proof instead.'
  },
  {
    pattern: /dedicated to (quality|excellence|customer)/gi,
    category: 'Vague quality',
    weight: 2,
    reason: 'Empty dedication claim. Actions speak louder.'
  },

  // Team claims
  {
    pattern: /experienced (team|professionals?|staff)/gi,
    category: 'Team claims',
    weight: 3,
    reason: 'Experience isn\'t differentiation. Relevance is.'
  },
  {
    pattern: /team of (experienced|skilled|dedicated)/gi,
    category: 'Team claims',
    weight: 3,
    reason: 'Generic team description. Who specifically will work on this?'
  },
  {
    pattern: /highly (qualified|skilled|trained)/gi,
    category: 'Team claims',
    weight: 2,
    reason: 'Qualification expected. Relevance to project matters more.'
  },

  // Relationship claims
  {
    pattern: /trusted partner/gi,
    category: 'Relationship',
    weight: 4,
    reason: 'Every vendor calls themselves trusted. Trust is earned.'
  },
  {
    pattern: /partner of choice/gi,
    category: 'Relationship',
    weight: 3,
    reason: 'Self-proclaimed. Let clients declare this.'
  },
  {
    pattern: /long[-\s]?term (relationship|partnership)/gi,
    category: 'Relationship',
    weight: 2,
    reason: 'Premature relationship talk before proving value.'
  },

  // Capability claims
  {
    pattern: /full[-\s]?service/gi,
    category: 'Capability',
    weight: 2,
    reason: 'What services specifically? Vague capability claim.'
  },
  {
    pattern: /one[-\s]?stop (shop|solution)/gi,
    category: 'Capability',
    weight: 2,
    reason: 'Convenience claim everyone makes.'
  },
  {
    pattern: /comprehensive (solutions?|services?|approach)/gi,
    category: 'Capability',
    weight: 2,
    reason: 'What\'s comprehensive about it? Be specific.'
  },
  {
    pattern: /end[-\s]?to[-\s]?end/gi,
    category: 'Capability',
    weight: 2,
    reason: 'Overused term. What does it mean for this project?'
  },

  // Value claims
  {
    pattern: /competitive (pricing|rates?|prices?)/gi,
    category: 'Pricing',
    weight: 4,
    reason: 'Signals you\'re competing on price, not value.'
  },
  {
    pattern: /cost[-\s]?effective/gi,
    category: 'Pricing',
    weight: 3,
    reason: 'Frames you as the cheap option.'
  },
  {
    pattern: /value[-\s]?added/gi,
    category: 'Pricing',
    weight: 2,
    reason: 'What value specifically? Vague claim.'
  },
  {
    pattern: /excellent value/gi,
    category: 'Pricing',
    weight: 2,
    reason: 'Let buyers decide if it\'s excellent.'
  },

  // Innovation claims
  {
    pattern: /innovative (solutions?|approach|technology)/gi,
    category: 'Innovation',
    weight: 3,
    reason: 'Overused. What\'s actually innovative?'
  },
  {
    pattern: /cutting[-\s]?edge/gi,
    category: 'Innovation',
    weight: 3,
    reason: 'Cliché tech claim with no substance.'
  },
  {
    pattern: /state[-\s]?of[-\s]?the[-\s]?art/gi,
    category: 'Innovation',
    weight: 3,
    reason: 'Dated term. Be specific about capabilities.'
  },

  // Service claims
  {
    pattern: /customer (service|focus|centric)/gi,
    category: 'Service',
    weight: 2,
    reason: 'Expected baseline. Not differentiating.'
  },
  {
    pattern: /exceeds? expectations/gi,
    category: 'Service',
    weight: 2,
    reason: 'Empty promise. Show how.'
  },
  {
    pattern: /unparalleled (service|support)/gi,
    category: 'Service',
    weight: 3,
    reason: 'Superlative with no proof.'
  },

  // Track record claims
  {
    pattern: /proven track record/gi,
    category: 'Track record',
    weight: 3,
    reason: 'Show the proof, don\'t claim it exists.'
  },
  {
    pattern: /years of experience/gi,
    category: 'Track record',
    weight: 2,
    reason: 'Years matter less than relevant experience.'
  },
  {
    pattern: /extensive experience/gi,
    category: 'Track record',
    weight: 2,
    reason: 'Be specific about what experience matters.'
  },

  // Pride claims
  {
    pattern: /we pride ourselves/gi,
    category: 'Pride claims',
    weight: 3,
    reason: 'Self-congratulation. Let work speak for itself.'
  },
  {
    pattern: /take pride in/gi,
    category: 'Pride claims',
    weight: 2,
    reason: 'Internal feeling, not buyer benefit.'
  },

  // Weak modifiers
  {
    pattern: /strive to/gi,
    category: 'Weak language',
    weight: 1,
    reason: '"Striving" isn\'t "doing." Be direct.'
  },
  {
    pattern: /aim to/gi,
    category: 'Weak language',
    weight: 1,
    reason: 'Aiming isn\'t hitting. State what you do.'
  },
  {
    pattern: /endeavor to/gi,
    category: 'Weak language',
    weight: 1,
    reason: 'Corporate hedging. Be definitive.'
  }
]

export function detectPhrases(text: string): { phrase: string, category: string, weight: number, reason: string, position: number }[] {
  const detected: { phrase: string, category: string, weight: number, reason: string, position: number }[] = []

  for (const phraseConfig of proposalPhrases) {
    let match
    const regex = new RegExp(phraseConfig.pattern.source, phraseConfig.pattern.flags)

    while ((match = regex.exec(text)) !== null) {
      detected.push({
        phrase: match[0],
        category: phraseConfig.category,
        weight: phraseConfig.weight,
        reason: phraseConfig.reason,
        position: match.index
      })
    }
  }

  // Sort by weight (highest first), then by position
  detected.sort((a, b) => b.weight - a.weight || a.position - b.position)

  return detected
}

export function calculateScore(text: string): number {
  const detected = detectPhrases(text)
  const totalWeight = detected.reduce((sum, d) => sum + d.weight, 0)

  // Word count for normalization
  const wordCount = text.split(/\s+/).length

  // Base score is 100 (differentiated)
  // Deduct based on phrase density
  const phraseDensity = (totalWeight / wordCount) * 100

  // Cap deductions at 80 points (minimum score 20)
  const deduction = Math.min(phraseDensity * 15, 80)

  const score = Math.max(20, Math.round(100 - deduction))

  // Adjust to favor scores in 60-80 range for realism
  // Most proposals should score in commodity territory
  if (score > 40 && score < 60) {
    return score + 15
  }

  return score
}

export function getScoreInterpretation(score: number): {
  category: 'differentiated' | 'generic' | 'commodity'
  label: string
  description: string
} {
  if (score <= 40) {
    return {
      category: 'differentiated',
      label: 'DIFFERENTIATED',
      description: 'Your proposal emphasizes unique value and avoids commodity language. Buyers will understand why you\'re different.'
    }
  } else if (score <= 60) {
    return {
      category: 'generic',
      label: 'GENERIC TERRITORY',
      description: 'Your proposal has differentiation but leans on some commodity phrases. Room for improvement.'
    }
  } else {
    return {
      category: 'commodity',
      label: 'COMMODITY TERRITORY',
      description: 'Your proposal sounds like competitors. Buyers will default to price comparison.'
    }
  }
}
