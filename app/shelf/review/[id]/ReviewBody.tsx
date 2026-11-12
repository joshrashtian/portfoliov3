import type { ComponentProps } from "react";
import type { IconType } from "react-icons";
import {
  IoAlertCircleOutline,
  IoBulbOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import ReactMarkdown, { type Components } from "react-markdown";
import { ColorSchema } from "../../../color";

type MdNode = {
  type: string;
  value?: string;
  children?: MdNode[];
  data?: { hName?: string; hProperties?: Record<string, unknown> };
};

const MARKER = /^\[!([\w-]+)\][+-]?[ \t]*/;

const remarkCallouts = () => (tree: MdNode) => {
  const walk = (node: MdNode) => {
    node.children?.forEach(walk);
    if (node.type !== "blockquote") return;

    const [first, ...rest] = node.children ?? [];
    const lead = first?.type === "paragraph" ? first.children?.[0] : undefined;
    const kind = lead?.type === "text" && MARKER.exec(lead.value ?? "")?.[1];
    if (!first?.children || !kind) return;

    const title: MdNode[] = [];
    const body: MdNode[] = [];
    let inTitle = true;
    for (const child of first.children) {
      if (!inTitle) {
        body.push(child);
        continue;
      }
      if (child.type === "break") {
        inTitle = false;
        continue;
      }
      const value = child.type === "text" ? (child.value ?? "") : "";
      const newline = value.indexOf("\n");
      if (newline < 0) {
        title.push(child);
        continue;
      }
      inTitle = false;
      title.push({ ...child, value: value.slice(0, newline) });
      if (value.slice(newline + 1)) {
        body.push({ ...child, value: value.slice(newline + 1) });
      }
    }
    title[0] = { ...title[0], value: (title[0].value ?? "").replace(MARKER, "") };

    const titleText = title.map((n) => n.value ?? "").join("").trim();
    node.data = {
      hName: "aside",
      hProperties: { className: ["callout"], dataCallout: kind.toLowerCase() },
    };
    node.children = [
      {
        type: "paragraph",
        data: { hProperties: { className: ["callout-title"] } },
        children: titleText
          ? title
          : [{ type: "text", value: kind[0].toUpperCase() + kind.slice(1) }],
      },
      ...(body.length ? [{ type: "paragraph", children: body }] : []),
      ...rest,
    ];
  };
  walk(tree);
};

const CALLOUT_ICONS: Record<string, IconType> = {
  tip: IoBulbOutline,
  warning: IoWarningOutline,
  caution: IoWarningOutline,
  danger: IoAlertCircleOutline,
  error: IoAlertCircleOutline,
};

/** react-markdown passes its hast `node` to components; it isn't a DOM prop. */
const domProps = <P extends { node?: unknown }>(props: P): Omit<P, "node"> => {
  const rest = { ...props };
  delete rest.node;
  return rest;
};

const demote = (Tag: "h2" | "h3" | "h4" | "h5" | "h6") => {
  const Heading = (props: ComponentProps<"h2"> & { node?: unknown }) => (
    <Tag {...domProps(props)} />
  );
  Heading.displayName = `Demoted(${Tag})`;
  return Heading;
};

const components: Components = {
  h1: demote("h2"),
  h2: demote("h3"),
  h3: demote("h4"),
  h4: demote("h5"),
  h5: demote("h6"),
  a: (props) =>
    props.href?.startsWith("http") ? (
      <a {...domProps(props)} target="_blank" rel="noopener noreferrer" />
    ) : (
      <a {...domProps(props)} />
    ),
  aside: ({ node, children }) => {
    const kind = String(node?.properties?.dataCallout ?? "note");
    const Icon = CALLOUT_ICONS[kind] ?? IoInformationCircleOutline;
    return (
      <aside
        data-callout={kind}
        className="not-prose my-8 flex gap-3 rounded-lg border border-[#7a1620]/25 bg-[#fde6e8]/60 px-4 py-3 text-base text-[#3a0a10] dark:border-[#c23b4a]/30 dark:bg-[#2a1214] dark:text-[#f2c9cd] [&_.callout-title]:font-semibold [&_p+p]:mt-2"
      >
        <Icon className={`mt-1 shrink-0 text-lg ${ColorSchema.text_maroon}`} aria-hidden />
        <div>{children}</div>
      </aside>
    );
  },
};

/** A review note's Markdown, set as long-form prose. */
export const ReviewBody = ({ markdown }: { markdown: string }) => (
  <div
    className={`prose prose-lg max-w-none prose-zinc dark:prose-invert prose-p:leading-relaxed prose-headings:font-sans prose-headings:font-bold prose-a:decoration-1 prose-a:underline-offset-4 ${ColorSchema.ink_text} prose-headings:text-current prose-strong:text-current prose-a:text-[#7a1620] dark:prose-a:text-[#c23b4a]`}
  >
    <ReactMarkdown remarkPlugins={[remarkCallouts]} components={components}>
      {markdown}
    </ReactMarkdown>
  </div>
);
