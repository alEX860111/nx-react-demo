import { render } from '@testing-library/react';

import UiApplication from './ui-application';

describe('UiApplication', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiApplication />);
    expect(baseElement).toBeTruthy();
  });
});
