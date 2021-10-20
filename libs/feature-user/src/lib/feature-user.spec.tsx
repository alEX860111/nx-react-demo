import { render } from '@testing-library/react';

import FeatureUser from './feature-user';

describe('FeatureUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureUser />);
    expect(baseElement).toBeTruthy();
  });
});
