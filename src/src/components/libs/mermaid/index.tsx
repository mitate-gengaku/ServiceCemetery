import mermaid from "mermaid";
import React from "react";

export const Mermaid = (props: { code: string }) => {
  const { code } = props;
  const outputRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  const render = React.useCallback(async () => {
    if (outputRef.current && code) {
      try {
        const { svg } = await mermaid.render(id, code);
        outputRef.current.innerHTML = svg;
      } catch (error) {
        console.error(error);
        outputRef.current.innerHTML = "Invalid syntax";
      }
    }
  }, [code]);

  React.useEffect(() => {
    render();
  }, [render]);

  return code ? (
    <div style={{ backgroundColor: "#fff" }}>
      <div ref={outputRef} className="[&>svg]:h-56" />
    </div>
  ) : null;
};
