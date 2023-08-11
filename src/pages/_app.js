import '../styles/globals.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoadingBar from '../modules/shared/ui/LoadingBar';

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LoadingBar />
      <Component {...pageProps} />
    </LocalizationProvider>
  );
}
