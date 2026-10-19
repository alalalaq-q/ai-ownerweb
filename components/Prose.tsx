import type { ReactNode } from "react";

type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; lines: string[] }
  | { type: "code"; lang: string; code: string };

const BLOCK_START = /^(#{1,3} |```|> |[-*] |\d+\.\s)/;

function parse(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: "code", lang, code: code.join("\n") });
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.slice(4) });
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: line.slice(3) });
      i += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ type: "heading", level: 2, text: line.slice(2) });
      i += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quote.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push({ type: "quote", lines: quote });
      continue;
    }

    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    const paragraph: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !BLOCK_START.test(lines[i])) {
      paragraph.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: "paragraph", lines: paragraph });
  }

  return blocks;
}

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function inline(text: string): ReactNode[] {
  return text.split(INLINE).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const safe = /^(https?:\/\/|\/)/.test(href);
      if (!safe) return <span key={index}>{label}</span>;
      const external = href.startsWith("http");
      return (
        <a key={index} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {label}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function renderLines(lines: string[]) {
  return lines.map((line, index) => (
    <span key={index}>
      {inline(line)}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

export default function Prose({ source }: { source: string }) {
  const blocks = parse(source);

  return (
    <div className="prose">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return block.level === 2 ? (
            <h2 key={index}>{inline(block.text)}</h2>
          ) : (
            <h3 key={index}>{inline(block.text)}</h3>
          );
        }
        if (block.type === "paragraph") {
          return <p key={index}>{renderLines(block.lines)}</p>;
        }
        if (block.type === "quote") {
          return <blockquote key={index}>{renderLines(block.lines)}</blockquote>;
        }
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{inline(item)}</li>
              ))}
            </Tag>
          );
        }
        return (
          <pre key={index}>
            <code>{block.code}</code>
          </pre>
        );
      })}
    </div>
  );
}
