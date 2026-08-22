import { describe, it, strict } from 'poku';
import { BRIEFS, MONTHS, WEEKDAYS } from '../../src/components/Agenda/timeline';

const SUNDAY = new Date(2025, 4, 4);

const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' });
const brief = new Intl.DateTimeFormat('pt-BR', { month: 'short' });
const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

describe('Agenda calendar tables match pt-BR', () => {
  it('names every month the way Intl does', () => {
    MONTHS.forEach((name, index) =>
      strict.equal(
        name,
        month.format(new Date(2025, index, 15)),
        `should name month ${index + 1} as Intl does`
      )
    );
  });

  it('abbreviates every month the way Intl does', () => {
    BRIEFS.forEach((name, index) =>
      strict.equal(
        name,
        brief.format(new Date(2025, index, 15)).replace('.', ''),
        `should abbreviate month ${index + 1} as Intl does`
      )
    );
  });

  it('names every weekday the way Intl does', () => {
    WEEKDAYS.forEach((name, index) =>
      strict.equal(
        name,
        weekday.format(
          new Date(SUNDAY.getFullYear(), SUNDAY.getMonth(), 4 + index)
        ),
        `should name weekday ${index} as Intl does`
      )
    );
  });
});
