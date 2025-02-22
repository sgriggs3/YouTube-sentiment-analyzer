import styled from "@emotion/styled";
import { useTheme, Theme } from "@mui/material/styles";

export const ModernButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: ${(props) => {
    const theme: Theme = useTheme();
    return props.variant === "primary"
      ? theme.custom.accentColor
      : theme.custom.secondaryBg;
  }};
  color: ${(props) => {
    const theme: Theme = useTheme();
    return theme.custom.textPrimary;
  }};
  font-weight: 500;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  // Mobile optimizations
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;
