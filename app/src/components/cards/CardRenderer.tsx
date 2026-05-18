import { Card } from '../../types'
import { CardMultipleChoice } from './CardMultipleChoice'
import { CardFormulaCompletion } from './CardFormulaCompletion'
import { CardDragToOrder } from './CardDragToOrder'
import { CardMatchingPairs } from './CardMatchingPairs'
import { CardScenarioJudgment } from './CardScenarioJudgment'
import { CardFreeInputNumeric } from './CardFreeInputNumeric'

export function CardRenderer({
  card,
  onSubmit,
  disabled
}: {
  card: Card
  onSubmit: (isCorrect: boolean, answer: unknown) => void
  disabled?: boolean
}) {
  switch (card.type) {
    case 'multiple_choice':
      return <CardMultipleChoice card={card} onSubmit={onSubmit} disabled={disabled} />
    case 'formula_completion':
      return <CardFormulaCompletion card={card} onSubmit={onSubmit} disabled={disabled} />
    case 'drag_to_order':
      return <CardDragToOrder card={card} onSubmit={onSubmit} disabled={disabled} />
    case 'matching_pairs':
      return <CardMatchingPairs card={card} onSubmit={onSubmit} disabled={disabled} />
    case 'scenario_judgment':
      return <CardScenarioJudgment card={card} onSubmit={onSubmit} disabled={disabled} />
    case 'free_input_numeric':
      return <CardFreeInputNumeric card={card} onSubmit={onSubmit} disabled={disabled} />
  }
}
