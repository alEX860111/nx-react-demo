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

  it('should render the button link without active route highlighting', () => {
    const { baseElement } = render(<NavigationButton to="/foo" label="Foo" />, {
      wrapper,
    });

    const link = baseElement.querySelector('a');
    if (link === null) fail();

    expect(link.className).not.toContain('activeDarkMode');
  });

  it('should render the button link with active route highlighting', () => {
    const { baseElement } = render(
      <NavigationButton to="/foo" label="Foo" highlightActive={true} />,
      { wrapper }
    );

    const link = baseElement.querySelector('a');
    if (link === null) fail();

    expect(link.className).toContain('activeDarkMode');
  });
});
