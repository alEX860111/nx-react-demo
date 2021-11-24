import { ButtonProps } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import type { To } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ThemeModeContext } from '../theme-mode/theme-mode-context';
import styles from './navigation-button.module.scss';

interface Props {
  to: To;
  label: string;
  highlightActive?: boolean;
  color?: ButtonProps['color'];
}

export function NavigationButton(props: Props) {
  const { themeMode } = useContext(ThemeModeContext);

  const getClassName = (params: { isActive: boolean }) => {
    const themeActiveClassName =
      themeMode === 'dark' ? styles.activeDarkMode : styles.activeLightMode;

    return props.highlightActive && params.isActive
      ? styles.navigationButton + ' ' + themeActiveClassName
      : styles.navigationButton;
  };

  return (
    <NavLink to={props.to} end className={getClassName}>
      <Button color={props.color}>{props.label}</Button>
    </NavLink>
  );
}
