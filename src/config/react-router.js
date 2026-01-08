// Configuration pour React Router v6
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const RouterConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

export default HistoryRouter;
