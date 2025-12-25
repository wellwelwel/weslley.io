import { ExternalLink } from 'lucide-react';
import { SafeLink } from './SafeLink';

export const YearLink = ({ year }: { year: number }) => {
  return (
    <SafeLink
      to={`https://npm-stat.com/charts.html?author=weslley.io&from=${year}-01-01&to=${year}-12-31`}
    >
      {year}
      <ExternalLink
        style={{
          marginLeft: 2.5,
          width: 12,
          height: 12,
          transform: 'translateY(-2.5px)',
        }}
      />
      :
    </SafeLink>
  );
};
