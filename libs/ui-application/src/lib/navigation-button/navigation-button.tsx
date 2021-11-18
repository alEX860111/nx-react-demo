import Button from '@mui/material/Button';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeModeContext } from '../theme-mode/theme-mode-context';
import styles from './navigation-button.module.scss';

interface Props {
  path: string;
  label: string;
  highlightActive?: boolean;
}

export function NavigationButton(props: Props) {
  const { themeMode } = useContext(ThemeModeContext);

  const getClassName = (params: { isActive: boolean }) => {
    if (!props.highlightActive) return styles.navigationButton;

    const themeActiveClassName =
      themeMode === 'dark' ? styles.activeDarkMode : styles.activeLightMode;

    return params.isActive
      ? styles.navigationButton + ' ' + themeActiveClassName
      : styles.navigationButton;
  };

  return (
    <NavLink to={props.path} end className={getClassName}>
      <Button color="inherit">{props.label}</Button>
    </NavLink>
  );
}
