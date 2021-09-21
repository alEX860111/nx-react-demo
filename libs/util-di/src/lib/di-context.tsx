import { Container } from 'inversify';
import React from 'react';

export const DIContext = React.createContext<Container>(new Container());
