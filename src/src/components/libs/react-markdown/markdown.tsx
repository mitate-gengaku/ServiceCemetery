import ReactMarkdown from "react-markdown";

import { Mermaid } from "@/components/libs/mermaid";
import { cn } from "@/utils/cn";

export const Markdown = ({ code }: { code: string }) => (
  <ReactMarkdown
    components={{
      pre: (props) => <pre {...props} className={cn(props.className, "w-full")} />,
      code: ({ node, children }) => {
        return <Mermaid code={children as string} />;
      },
    }}
  >
    {code}
  </ReactMarkdown>
);
