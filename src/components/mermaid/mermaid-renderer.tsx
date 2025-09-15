"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  children: React.ReactNode;
}

export function MermaidRenderer({ children }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [processed, setProcessed] = useState(false);
  const processedElements = useRef<Set<Element>>(new Set());

  useEffect(() => {
    if (processed || !containerRef.current) return;

    const processElements = async () => {
      console.log("🚀 Processing Mermaid diagrams...");
      
      // Initialize Mermaid
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
        fontFamily: "Arial, sans-serif",
        fontSize: 16,
        themeVariables: {
          darkMode: true,
          primaryColor: "#60a5fa",
          primaryTextColor: "#ffffff",
          primaryBorderColor: "#3b82f6",
          lineColor: "#9ca3af",
          secondaryColor: "#374151",
          tertiaryColor: "#4b5563",
          background: "#1f2937",
          mainBkg: "#1f2937",
        },
      });

      const codeBlocks = containerRef.current!.querySelectorAll("pre code, code");
      let diagramCount = 0;

      for (let i = 0; i < codeBlocks.length; i++) {
        const codeElement = codeBlocks[i] as HTMLElement;
        const content = codeElement.textContent?.trim() || "";
        
        if (processedElements.current.has(codeElement)) continue;
        
        if (content.startsWith("graph") || content.startsWith("flowchart") || 
            content.startsWith("sequenceDiagram") || content.startsWith("classDiagram") ||
            content.startsWith("stateDiagram") || content.startsWith("pie") || content.startsWith("gantt")) {
          
          try {
            const id = `mermaid-${diagramCount}-${Date.now()}`;
            diagramCount++;
            
            const parentElement = codeElement.closest("pre") || codeElement;
            
            // Create permanent container
            const diagramContainer = document.createElement("div");
            diagramContainer.className = "mermaid-diagram-final";
            diagramContainer.style.cssText = `
              margin: 2rem 0;
              padding: 1.5rem;
              background-color: #1f2937;
              border-radius: 0.5rem;
              border: 1px solid #374151;
              text-align: center;
              overflow-x: auto;
            `;
            
            // Render SVG
            const { svg } = await mermaid.render(id, content);
            diagramContainer.innerHTML = svg;
            
            // Force SVG styling
            const svgElement = diagramContainer.querySelector('svg');
            if (svgElement) {
              svgElement.style.display = 'block';
              svgElement.style.width = '100%';
              svgElement.style.height = 'auto';
              svgElement.style.maxWidth = '100%';
            }
            
            // Replace immediately and mark as processed
            if (parentElement && parentElement.parentNode) {
              parentElement.parentNode.replaceChild(diagramContainer, parentElement);
              processedElements.current.add(diagramContainer);
              console.log(`✅ Rendered diagram ${diagramCount}`);
            }
          } catch (error) {
            console.error("❌ Failed to render diagram:", error);
          }
        }
      }
      
      setProcessed(true);
      console.log(`🎉 Completed processing ${diagramCount} diagrams`);
    };

    // Process after DOM settles
    const timer = setTimeout(processElements, 2000);
    return () => clearTimeout(timer);
  }, [processed, children]);

        

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
} 