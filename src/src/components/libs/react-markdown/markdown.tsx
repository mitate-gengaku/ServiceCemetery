import ReactMarkdown from "react-markdown";

import { Mermaid } from "@/components/libs/mermaid";

export const Markdown = ({ code }: { code: string }) => (
  <ReactMarkdown
    components={{
      // eslint-disable-next-line unused-imports/no-unused-vars
      code: ({ node, children }) => {
        return <Mermaid code={children as string} />;
      },
    }}
  >
    {code}
  </ReactMarkdown>
);
