import React from 'react';
import { container, DependencyContainer } from 'tsyringe';

export const DIContext = React.createContext<DependencyContainer>(container);
