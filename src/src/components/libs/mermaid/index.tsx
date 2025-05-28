import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";
import mermaid from "mermaid";
import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";

export const Mermaid = (props: { code: string }) => {
  const { code } = props;
  const outputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGElement | null>(null);
  const id = React.useId();

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isRendered, setIsRendered] = useState(false);

  const applyTransform = useCallback(() => {
    if (svgRef.current) {
      svgRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${zoom})`;
    }
  }, [position.x, position.y, zoom]);

  const renderMermaid = useCallback(async () => {
    if (outputRef.current && code) {
      try {
        const { svg } = await mermaid.render(id, code);
        outputRef.current.innerHTML = svg;

        const svgElement = outputRef.current.querySelector("svg");
        if (svgElement) {
          svgRef.current = svgElement;
          svgElement.style.transformOrigin = "top left";
          svgElement.style.transition = isDragging ? "none" : "transform 0.2s ease";
          setIsRendered(true);
        }
      } catch (error) {
        console.error(error);
        outputRef.current.innerHTML = "Invalid syntax";
        setIsRendered(false);
      }
    }
  }, [code, id, isDragging]);

  useEffect(() => {
    renderMermaid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, id]);

  useEffect(() => {
    if (isRendered) {
      applyTransform();
    }
  }, [position, zoom, isRendered, applyTransform]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev * 1.2, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev / 1.2, 0.1));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleFitToView = useCallback(() => {
    if (outputRef.current && containerRef.current && svgRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();

      const scaleX = containerRect.width / svgRect.width;
      const scaleY = containerRect.height / svgRect.height;
      const newZoom = Math.min(scaleX, scaleY) * 0.9;

      setZoom(newZoom);
      setPosition({ x: 0, y: 0 });
    }
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.1, Math.min(5, prev * delta)));
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });

      if (svgRef.current) {
        svgRef.current.style.transition = "none";
      }
    },
    [position.x, position.y],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        requestAnimationFrame(() => {
          setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
          });
        });
      }
    },
    [isDragging, dragStart.x, dragStart.y],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    if (svgRef.current) {
      svgRef.current.style.transition = "transform 0.2s ease";
    }
  }, []);

  const toolbar = useMemo(
    () => (
      <div className="absolute top-2 left-2 z-10 flex gap-1 bg-white rounded-md shadow-lg border p-1">
        <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded transition-colors" title="拡大">
          <ZoomIn size={16} />
        </button>
        <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded transition-colors" title="縮小">
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleFitToView}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="画面に合わせる"
        >
          <Maximize2 size={16} />
        </button>
        <button onClick={handleReset} className="p-2 hover:bg-gray-100 rounded transition-colors" title="リセット">
          <RotateCcw size={16} />
        </button>
      </div>
    ),
    [handleZoomIn, handleZoomOut, handleFitToView, handleReset],
  );

  return code ? (
    <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden bg-white font-geist-sans">
      {toolbar}

      <div className="absolute top-2 right-2 z-10 bg-white rounded-md shadow-lg border px-2 py-1 text-sm">
        {Math.round(zoom * 100)}%
      </div>

      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <div ref={outputRef} className="w-full h-full" />
      </div>

      <div className="absolute bottom-2 left-2 z-10 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        ホイール: ズーム | ドラッグ: 移動
      </div>
    </div>
  ) : null;
};
