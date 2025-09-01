import { getPrompt as getCustomOutputPrompt } from './custom-output.prompt'
import { getPrompt as getMindMapPrompt } from './mind-map.prompt'
import { getPrompt as getSocialPostPrompt } from './social-post.prompt'
import { getPrompt as getSummaryPrompt } from './summary.prompt'
import { getPrompt as getTopicsPrompt } from './topics.prompt'

export const AVAILABLE_PROMPTS = {
  SUMMARY: 'summary',
  TOPICS: 'topics',
  MIND_MAP: 'mind-map',
  SOCIAL_POST: 'social-post',
  CUSTOM_OUTPUT: 'custom-output',
} as const

export type PromptName =
  (typeof AVAILABLE_PROMPTS)[keyof typeof AVAILABLE_PROMPTS]

export class PromptLoader {
  static loadPrompt(
    promptName: PromptName,
    variables: Record<string, string> = {}
  ): string {
    try {
      let prompt: string

      switch (promptName) {
        case AVAILABLE_PROMPTS.SUMMARY:
          prompt = getSummaryPrompt(variables.transcript, variables.language)
          break
        case AVAILABLE_PROMPTS.TOPICS:
          prompt = getTopicsPrompt(variables.transcript, variables.language)
          break
        case AVAILABLE_PROMPTS.MIND_MAP:
          prompt = getMindMapPrompt(variables.transcript, variables.language)
          break
        case AVAILABLE_PROMPTS.SOCIAL_POST:
          prompt = getSocialPostPrompt(variables.transcript, variables.language)
          break
        case AVAILABLE_PROMPTS.CUSTOM_OUTPUT:
          prompt = getCustomOutputPrompt(
            variables.transcript,
            variables.language,
            variables.customPrompt
          )
          break
        default:
          throw new Error(`Unknown prompt name: ${promptName}`)
      }

      return prompt
    } catch (error) {
      throw new Error(`Failed to load prompt '${promptName}': ${error}`)
    }
  }

  static getAvailablePrompts(): PromptName[] {
    return Object.values(AVAILABLE_PROMPTS)
  }
}
