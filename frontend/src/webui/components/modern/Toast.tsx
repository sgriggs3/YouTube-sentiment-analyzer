1import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';

interface ToastProps {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
}

const StyledSnackbar = styled(Snackbar)`
  & .MuiSnackbarContent-root {
    background-color: ${(props) =>
      props.severity === 'success'
        ? '#4caf50'
        : props.severity === 'error'
        ? '#f44336'
        : props.severity === 'warning'
        ? '#ff9800'
        : '#2196f3'};
    color: white;
  }
`;

function SlideTransition(props: any) {
  return <Slide {...props} direction="up" />;
}

const Toast: React.FC<ToastProps> = ({ open, message, severity, onClose }) => {
  const [transition, setTransition] = useState<any>(undefined);

  useEffect(() => {
    setTransition(() => SlideTransition);
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      TransitionComponent={transition}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%', backgroundColor:
        severity === 'success'
        ? '#4caf50'
        : severity === 'error'
        ? '#f44336'
        : severity === 'warning'
        ? '#ff9800'
        : '#2196f3' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
