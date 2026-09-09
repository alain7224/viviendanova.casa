export const applyTheme = (colors: Record<string, string>) => {
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};

export const getTheme = () => {
  const root = document.documentElement;
  return {
    primary: root.style.getPropertyValue('--color-primary'),
    secondary: root.style.getPropertyValue('--color-secondary'),
    accent: root.style.getPropertyValue('--color-accent'),
    background: root.style.getPropertyValue('--color-background'),
    text: root.style.getPropertyValue('--color-text'),
  };
};
