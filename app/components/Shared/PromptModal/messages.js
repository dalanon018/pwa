/*
 * PromptModal Messages
 *
 * This contains all the text for the PromptModal component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  promptOk: {
    id: 'app.components.PromptModal.promptOk',
    defaultMessage: 'GOT IT!'
  },
  rated18: {
    id: 'app.components.PromptModal.rated18',
    defaultMessage: 'You must be at least 18 years old to view this category.'
  },
  confirm18: {
    id: 'app.components.PromptModal.confirm18',
    defaultMessage: 'Please confirm your age:'
  },
  not18: {
    id: 'app.components.PromptModal.not18',
    defaultMessage: 'I am not 18 yet'
  },
  im18: {
    id: 'app.components.PromptModal.im18',
    defaultMessage: 'I AM OVER 18'
  }
})
