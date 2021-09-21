import React from 'react';
import { container } from 'tsyringe';

export const DIContext = React.createContext<typeof container>(container);
