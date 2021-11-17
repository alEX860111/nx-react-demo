import { render } from '@testing-library/react';
import App from './app';

jest.mock('./home', () => ({
  Home: () => <div>Home</div>,
}));

jest.mock('@nx-react-demo/feature-todo', () => ({
  TodoWidget: () => <div>TodoWidget</div>,
}));

jest.mock('@nx-react-demo/feature-user', () => ({
  FeatureUser: () => <div>FeatureUser</div>,
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });
});
