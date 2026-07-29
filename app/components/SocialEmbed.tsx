"use client";
import { useEffect, useRef } from "react";

// Renders a third-party embed snippet (Elfsight, SnapWidget, LightWidget,
// etc. — pasted by the admin in Settings → Social → Live Feed Embed Code).
//
// Why this needs its own component: setting innerHTML directly does NOT
// execute <script> tags inside it (browsers block that for security). Embed
// codes from feed widgets almost always include a <script src="..."> that
// loads the widget's JS. This component walks the pasted HTML, re-creates
// every <script> tag properly with document.createElement so the browser
// actually loads and runs it, and injects everything else as normal HTML.
export default function SocialEmbed({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !code) return;

    container.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = code.trim();

    template.content.childNodes.forEach((node) => {
      if (node.nodeType === 1 && (node as Element).tagName === "SCRIPT") {
        const oldScript = node as HTMLScriptElement;
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
        newScript.text = oldScript.text || "";
        container.appendChild(newScript);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    });
  }, [code]);

  return <div ref={containerRef} className="social-embed-container" />;
}
