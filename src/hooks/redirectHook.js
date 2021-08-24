import { useLocation } from 'react-router-dom';

export const useRedirectHook = () => {
  return new URLSearchParams(useLocation().search);
};
