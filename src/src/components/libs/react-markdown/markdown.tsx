import ReactMarkdown from "react-markdown";

import { Mermaid } from "@/components/libs/mermaid";
import { cn } from "@/utils/cn";

export const Markdown = ({ code }: { code: string }) => (
  <ReactMarkdown
    components={{
      // eslint-disable-next-line  unused-imports/no-unused-vars
      pre: ({ node, ...props }) => <pre {...props} className={cn(props.className, "w-full")} />,
      // eslint-disable-next-line  unused-imports/no-unused-vars
      code: ({ node, children }) => {
        return <Mermaid code={children as string} />;
      },
    }}
  >
    {code}
  </ReactMarkdown>
);
