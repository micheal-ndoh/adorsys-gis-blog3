"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  children: React.ReactNode;
}

export function MermaidRenderer({ children }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Add immediate console log to verify component is rendered
  console.log("🚀 MermaidRenderer: Component is being rendered!");

  useEffect(() => {
    console.log("🔍 MermaidRenderer: Component mounted, initializing...");
    
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
      if (!containerRef.current) {
        console.log("❌ MermaidRenderer: Container ref not available");
        return;
      }

      console.log("🔍 MermaidRenderer: Starting to look for Mermaid diagrams...");
      
      // Find all pre elements that contain mermaid code
      const preElements = containerRef.current.querySelectorAll("pre");
      console.log(`📊 MermaidRenderer: Found ${preElements.length} pre elements`);
      
      let mermaidCount = 0;

      for (let i = 0; i < preElements.length; i++) {
        const pre = preElements[i];
        if (!pre) continue;
        
        const codeElement = pre.querySelector("code");
        const content = codeElement?.textContent || "";
        
        console.log(`🔍 MermaidRenderer: Pre element ${i}:`, {
          hasCode: !!codeElement,
          codeClasses: codeElement?.className,
          hasDataMermaid: pre.hasAttribute("data-mermaid"),
          contentPreview: content.substring(0, 50),
          hasGraph: content.includes("graph")
        });
        
        // Check if this is a mermaid block by class, data attribute, or content
        const isMermaidByClass = codeElement?.classList.contains("mermaid");
        const isMermaidByData = pre.hasAttribute("data-mermaid");
        const hasGraphContent = content.includes("graph");
        
        if (isMermaidByClass || isMermaidByData || hasGraphContent) {
          if (content && (content.startsWith("graph") || content.startsWith("flowchart") || content.startsWith("sequenceDiagram"))) {
            try {
              const id = `mermaid-${mermaidCount}-${Date.now()}`;
              mermaidCount++;
              
              console.log(`🎯 MermaidRenderer: Found Mermaid diagram ${mermaidCount}:`, content.substring(0, 100) + "...");
              
              // Create a new div for the rendered diagram
              const diagramDiv = document.createElement("div");
              diagramDiv.className = "mermaid-diagram my-6 text-center";
              diagramDiv.id = id;
              diagramDiv.style.cssText = "display: block !important; visibility: visible !important; border: 3px solid #00ff00 !important; padding: 1rem !important; margin: 1rem 0 !important; background: #1f2937 !important;";
              
              // Insert the diagram div after the pre element
              if (pre.parentNode) {
                pre.parentNode.insertBefore(diagramDiv, pre.nextSibling);
                
                // Render the diagram
                const { svg } = await mermaid.render(id, content);
                diagramDiv.innerHTML = svg;
                
                // Add some debugging text
                diagramDiv.innerHTML += `<div style="color: #00ff00; font-size: 14px; margin-top: 8px; font-weight: bold;">✅ Mermaid diagram ${mermaidCount} rendered successfully</div>`;
                
                // DON'T hide the original code block for now - let's see both
                // pre.classList.add("hidden");
                
                console.log(`✅ MermaidRenderer: Successfully rendered Mermaid diagram ${mermaidCount}`);
                console.log(`🔍 MermaidRenderer: Diagram div inserted:`, diagramDiv);
              }
            } catch (error) {
              console.error(`❌ MermaidRenderer: Failed to render Mermaid diagram ${mermaidCount}:`, error);
              console.error("Diagram content:", content);
            }
          }
        }
      }

      if (mermaidCount === 0) {
        console.log("⚠️ MermaidRenderer: No Mermaid diagrams found in the content");
        // Debug: log all code blocks to see what's available
        const allCodeBlocks = containerRef.current.querySelectorAll("code");
        console.log("📋 MermaidRenderer: All code blocks found:", allCodeBlocks.length);
        allCodeBlocks.forEach((block, i) => {
          const content = block.textContent || "";
          if (content.includes("graph") || content.includes("flowchart")) {
            console.log(`🔍 MermaidRenderer: Potential Mermaid block ${i}:`, content.substring(0, 100));
          }
        });
      } else {
        console.log(`🎉 MermaidRenderer: Successfully processed ${mermaidCount} Mermaid diagrams`);
      }
    };

    // Use multiple attempts to ensure content is loaded
    const attemptRender = () => {
      console.log("🔄 MermaidRenderer: Attempting to render diagrams...");
      
      // Test Mermaid with a simple diagram first
      const testMermaid = async () => {
        try {
          const testId = `test-mermaid-${Date.now()}`;
          const testDiv = document.createElement("div");
          testDiv.id = testId;
          testDiv.style.cssText = "border: 2px solid blue !important; padding: 10px !important; margin: 10px 0 !important; background: yellow !important;";
          testDiv.innerHTML = "Testing Mermaid...";
          
          if (containerRef.current) {
            containerRef.current.insertBefore(testDiv, containerRef.current.firstChild);
            
            const { svg } = await mermaid.render(testId, "graph TD\nA[Test] --> B[Success]");
            testDiv.innerHTML = svg + "<div style='color: blue; font-weight: bold;'>Mermaid Test Diagram</div>";
            console.log("✅ MermaidRenderer: Test diagram rendered successfully");
          }
        } catch (error) {
          console.error("❌ MermaidRenderer: Test diagram failed:", error);
        }
      };
      
      testMermaid();
      
      setTimeout(renderMermaidDiagrams, 100);
      setTimeout(renderMermaidDiagrams, 500);
      setTimeout(renderMermaidDiagrams, 1000);
      setTimeout(renderMermaidDiagrams, 2000);
    };

    attemptRender();
  }, [children]);

  return (
    <div ref={containerRef}>
      {/* Add a visible test element to verify component is rendered */}
      <div style={{ 
        background: 'red', 
        color: 'white', 
        padding: '10px', 
        margin: '10px 0', 
        border: '2px solid yellow',
        display: 'block !important'
      }}>
        🚀 MermaidRenderer Component is Active! Check console for logs.
      </div>
      {children}
      {/* Debug element to verify component is rendered */}
      <div style={{ display: 'none' }} id="mermaid-renderer-debug">
        MermaidRenderer component is loaded and rendered
      </div>
    </div>
  );
} 