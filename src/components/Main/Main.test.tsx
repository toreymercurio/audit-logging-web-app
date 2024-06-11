import { render, screen } from '@test-utils';
import { Main } from './Main';

describe('Main component', () => {
  it('has correct Vite guide link', () => {
    render(<Main />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
