"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  children: React.ReactNode;
}

export function MermaidRenderer({ children }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Mermaid with dark theme
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      fontFamily: "monospace",
      fontSize: 14,
      themeVariables: {
        darkMode: true,
        primaryColor: "#3b82f6",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#1e40af",
        lineColor: "#6b7280",
        secondaryColor: "#1f2937",
        tertiaryColor: "#374151",
      },
    });

    // Function to render Mermaid diagrams
    const renderMermaidDiagrams = async () => {
      if (!containerRef.current) return;

      // Find all pre elements that contain mermaid code
      const preElements = containerRef.current.querySelectorAll("pre");
      let mermaidCount = 0;

      for (let i = 0; i < preElements.length; i++) {
        const pre = preElements[i];
        if (!pre) continue;
        
        const codeElement = pre.querySelector("code");
        
        // Check if this is a mermaid block by class, data attribute, or content
        const isMermaidByClass = codeElement?.classList.contains("mermaid");
        const isMermaidByData = pre.hasAttribute("data-mermaid");
        const hasGraphContent = codeElement?.textContent?.includes("graph");
        
        if (isMermaidByClass || isMermaidByData || hasGraphContent) {
          const content = codeElement?.textContent?.trim() || "";
          if (content && (content.startsWith("graph") || content.startsWith("flowchart") || content.startsWith("sequenceDiagram"))) {
            try {
              const id = `mermaid-${mermaidCount}-${Date.now()}`;
              mermaidCount++;
              
              console.log(`Found Mermaid diagram ${mermaidCount}:`, content.substring(0, 100) + "...");
              
              // Create a new div for the rendered diagram
              const diagramDiv = document.createElement("div");
              diagramDiv.className = "mermaid-diagram my-6 text-center";
              diagramDiv.id = id;
              
              // Insert the diagram div after the pre element
              if (pre.parentNode) {
                pre.parentNode.insertBefore(diagramDiv, pre.nextSibling);
                
                // Render the diagram
                const { svg } = await mermaid.render(id, content);
                diagramDiv.innerHTML = svg;
                
                // Hide the original code block
                pre.classList.add("hidden");
                
                console.log(`Successfully rendered Mermaid diagram ${mermaidCount}`);
              }
            } catch (error) {
              console.error(`Failed to render Mermaid diagram ${mermaidCount}:`, error);
              console.error("Diagram content:", content);
            }
          }
        }
      }

      if (mermaidCount === 0) {
        console.log("No Mermaid diagrams found in the content");
        // Debug: log all code blocks to see what's available
        const allCodeBlocks = containerRef.current.querySelectorAll("code");
        console.log("All code blocks found:", allCodeBlocks.length);
        allCodeBlocks.forEach((block, i) => {
          const content = block.textContent || "";
          if (content.includes("graph") || content.includes("flowchart")) {
            console.log(`Potential Mermaid block ${i}:`, content.substring(0, 100));
          }
        });
      }
    };

    // Use multiple attempts to ensure content is loaded
    const attemptRender = () => {
      setTimeout(renderMermaidDiagrams, 100);
      setTimeout(renderMermaidDiagrams, 500);
      setTimeout(renderMermaidDiagrams, 1000);
    };

    attemptRender();
  }, [children]);

  return <div ref={containerRef}>{children}</div>;
} 