import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavigationButton } from './navigation-button';

describe(NavigationButton, () => {
  let wrapper: React.ComponentType;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/foo']}>{children}</MemoryRouter>
    );
  });

  it('should render successfully', () => {
    const { baseElement } = render(<NavigationButton to="/foo" label="Foo" />, {
      wrapper,
    });
    expect(baseElement).toBeTruthy();
  });

  it('should not be active if highlighting is disabled', () => {
    const { baseElement } = render(<NavigationButton to="/foo" label="Foo" />, {
      wrapper,
    });

    const link = baseElement.querySelector('a');
    if (link === null) fail();

    expect(link.className).not.toContain('activeDarkMode');
  });

  it('should be active if highlighting is enabled and routes match', () => {
    const { baseElement } = render(
      <NavigationButton to="/foo" label="Foo" highlightActive={true} />,
      { wrapper }
    );

    const link = baseElement.querySelector('a');
    if (link === null) fail();

    expect(link.className).toContain('activeDarkMode');
  });

  it('should not be active if highlighting is enabled but routes do not match', () => {
    const { baseElement } = render(
      <NavigationButton to="/bar" label="Bar" highlightActive={true} />,
      { wrapper }
    );

    const link = baseElement.querySelector('a');
    if (link === null) fail();

    expect(link.className).not.toContain('activeDarkMode');
  });
});
