import styled, { keyframes } from "styled-components";
import { useTheme, Theme } from "@mui/material/styles";

interface LoadingSpinnerProps {
  size?: number;
  color?: "primary" | "secondary";
  center?: boolean;
  ariaLabel?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div<LoadingSpinnerProps>`
  width: ${(props) => props.size || 24}px;
  height: ${(props) => props.size || 24}px;
  border: 2px solid ${(props) => {
    const theme: Theme = useTheme();
    return theme.palette.background.paper;
  }};
  border-top: 2px solid ${(props) => {
    const theme: Theme = useTheme();
    return theme.palette.primary.main;
  }};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin: ${(props) => (props.center ? "auto" : "0")};
  
  /* Accessibility */
  role: status;
  aria-label: ${(props) => props.ariaLabel || 'Loading...'};
`;
