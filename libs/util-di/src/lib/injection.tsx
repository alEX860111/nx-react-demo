import * as React from 'react';
import { DependencyContainer, InjectionToken } from 'tsyringe';
import { DIContext } from './di-context';

type DIResolutionConfig<K> = {
  [P in keyof K]: InjectionToken<K[P]>;
};

type Without<T, K> = {
  [L in Exclude<keyof T, K>]: T[L];
};

export function withInjection<T, K>(
  WrappedComponent: React.ComponentType<T>,
  diConfig: DIResolutionConfig<K>
): React.ComponentType<Without<T, keyof K>> {
  const name = WrappedComponent.displayName || WrappedComponent.name;

  class InjectionWrapper extends React.Component<any, any> {
    static contextType = DIContext;
    static displayName = `withInjection(${name})`;
    static WrappedComponent = WrappedComponent;

    render() {
      const diContainer = this.context as DependencyContainer;

      const diProps: any = {};

      Object.keys(diConfig).forEach((propName: string) => {
        const token = diConfig[propName as keyof K];
        diProps[propName] = diContainer.resolve(token);
      });

      const { ...restProps } = this.props;
      return <WrappedComponent {...diProps} {...(restProps as T)} />;
    }
  }

  return InjectionWrapper;
}
