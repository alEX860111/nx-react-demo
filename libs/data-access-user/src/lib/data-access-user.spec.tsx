import { render } from '@testing-library/react';

import DataAccessUser from './data-access-user';

describe('DataAccessUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataAccessUser />);
    expect(baseElement).toBeTruthy();
  });
});
