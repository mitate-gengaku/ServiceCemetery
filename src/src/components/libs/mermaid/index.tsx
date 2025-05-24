import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";
import mermaid from "mermaid";
import React, { useState, useCallback, useRef, useEffect } from "react";

export const Mermaid = (props: { code: string }) => {
  const { code } = props;
  const outputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = React.useId();

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const render = useCallback(async () => {
    if (outputRef.current && code) {
      try {
        const { svg } = await mermaid.render(id, code);
        outputRef.current.innerHTML = svg;

        // SVGに変換を適用
        const svgElement = outputRef.current.querySelector("svg");
        if (svgElement) {
          svgElement.style.transform = `translate(${position.x}px, ${position.y}px) scale(${zoom})`;
          svgElement.style.transformOrigin = "top left";
          svgElement.style.transition = "transform 0.2s ease";
        }
      } catch (error) {
        console.error(error);
        outputRef.current.innerHTML = "Invalid syntax";
      }
    }
  }, [code, id, zoom, position]);

  useEffect(() => {
    render();
  }, [render]);

  // ズーム機能
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.1));
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleFitToView = () => {
    if (outputRef.current && containerRef.current) {
      const svgElement = outputRef.current.querySelector("svg");
      if (svgElement) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const svgRect = svgElement.getBoundingClientRect();

        const scaleX = containerRect.width / svgRect.width;
        const scaleY = containerRect.height / svgRect.height;
        const newZoom = Math.min(scaleX, scaleY) * 0.9; // 少し余白を残す

        setZoom(newZoom);
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  // マウスホイールでのズーム
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.1, Math.min(5, prev * delta)));
  };

  // ドラッグ機能
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return code ? (
    <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden bg-white font-geist-sans">
      {/* ツールバー */}
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

      {/* ズーム表示 */}
      <div className="absolute top-2 right-2 z-10 bg-white rounded-md shadow-lg border px-2 py-1 text-sm">
        {Math.round(zoom * 100)}%
      </div>

      {/* メインコンテナ */}
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

      {/* 使用方法のヒント */}
      <div className="absolute bottom-2 left-2 z-10 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        ホイール: ズーム | ドラッグ: 移動
      </div>
    </div>
  ) : null;
};
