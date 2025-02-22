import { memo, useEffect, useContext } from "react";
import { useRemark } from "react-remark";
import rehypeHighlight, { Options } from "rehype-highlight";
import styled from "styled-components";
import { visit } from "unist-util-visit";
import { useTheme } from '@mui/material/styles';
import { CustomThemeContext } from "../../../ThemeContext";

interface CodeBlockProps {
  source?: string;
  forceWrap?: boolean;
}

const StyledMarkdown = styled.div<{ forceWrap: boolean }>`
  ${({ forceWrap }) =>
    forceWrap &&
    `
    pre, code {
      white-space: pre-wrap;
      word-break: break-all;
      overflow-wrap: anywhere;
    }
  `}

  pre {
    background-color: ${(props) => {
			const theme = useTheme();
			return theme.palette.background.paper;
		}};
    border-radius: 5px;
    margin: 0;
    min-width: ${({ forceWrap }) => (forceWrap ? "auto" : "max-content")};
    padding: 10px 10px;
  }

  pre > code {
    .hljs-deletion {
      background-color: var(--vscode-diffEditor-removedTextBackground);
      display: inline-block;
      width: 100%;
    }
    .hljs-addition {
      background-color: var(--vscode-diffEditor-insertedTextBackground);
      display: inline-block;
      width: 100%;
    }
  }

  code {
    span.line:empty {
      display: none;
    }
    word-wrap: break-word;
    border-radius: 5px;
    background-color:  ${(props) => {
			const theme = useTheme();
			return theme.palette.background.paper;
		}};
    font-size: var(--vscode-editor-font-size, var(--vscode-font-size, 12px));
    font-family: var(--vscode-editor-font-family);
  }

  code:not(pre > code) {
    font-family: var(--vscode-editor-font-family);
    color: #f78383;
  }

  background-color:  ${(props) => {
			const theme = useTheme();
			return theme.palette.background.paper;
		}};
  font-family:
    var(--vscode-font-family),
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
  font-size: var(--vscode-editor-font-size, var(--vscode-font-size, 12px));
  color:  ${(props) => {
			const theme = useTheme();
			return theme.palette.text.primary;
		}};

  p,
  li,
  ol,
  ul {
    line-height: 1.5;
  }
`;

const StyledPre = styled.pre<{ theme: any }>`
  & .hljs {
    color:  ${(props) => {
			const theme = useTheme();
			return theme.palette.text.primary;
		}};
  }

  ${(props) =>
    Object.keys(props.theme)
      .map((key, index) => {
        return `
      & ${key} {
        color: ${props.theme[key]};
      }
    `;
      })
      .join("")}
`;

const CodeBlock = memo(({ source, forceWrap = false }: CodeBlockProps) => {
  const { currentTheme } = useContext(CustomThemeContext);
	const theme = useTheme();
  const [reactContent, setMarkdownSource] = useRemark({
    remarkPlugins: [
      () => {
        return (tree) => {
          visit(tree, "code", (node: any) => {
            if (!node.lang) {
              node.lang = "javascript";
            } else if (node.lang.includes(".")) {
              // if the langauge is a file, get the extension
              node.lang = node.lang.split(".").slice(-1)[0];
            }
          });
        };
      },
    ],
    rehypePlugins: [
      [rehypeHighlight as any,
      {
        // languages: {},
      } as Options,
    ],
    rehypeReactOptions: {
      components: {
        pre: ({ node, ...preProps }: any) => <StyledPre {...preProps} theme={theme} />,
      },
    },
  });

  useEffect(() => {
    setMarkdownSource(source || "");
  }, [source, setMarkdownSource, theme]);

  return (
    <div
      style={{
        overflowY: forceWrap ? "visible" : "auto",
        maxHeight: forceWrap ? "none" : "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <StyledMarkdown forceWrap={forceWrap}>{reactContent}</StyledMarkdown>
    </div>
  );
});

export default CodeBlock;
