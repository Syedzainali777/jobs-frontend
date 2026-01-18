import StrapiImage from "./StrapiImage";
import Link from "next/link";
import { Block, BlockChild, getStrapiImageUrl, getStrapiImageAlt } from "@/lib/api";

interface BlockRendererProps {
  blocks?: Block[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="prose prose-stone prose-lg max-w-none">
      {blocks.map((block, index) => (
        <RenderBlock key={index} block={block} />
      ))}
    </div>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed text-stone-700">
          <RenderChildren>{block.children}</RenderChildren>
        </p>
      );

    case "heading":
      return <RenderHeading level={block.level || 2}>{block.children}</RenderHeading>;

    case "list":
      if (block.format === "ordered") {
        return (
          <ol className="mb-4 sm:mb-6 pl-5 sm:pl-6 list-decimal space-y-1.5 sm:space-y-2 text-sm sm:text-base text-stone-700">
            {block.children?.map((item, index) => (
              <li key={index}>
                <RenderChildren>{item.children}</RenderChildren>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mb-4 sm:mb-6 pl-5 sm:pl-6 list-disc space-y-1.5 sm:space-y-2 text-sm sm:text-base text-stone-700">
          {block.children?.map((item, index) => (
            <li key={index}>
              <RenderChildren>{item.children}</RenderChildren>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="mb-4 sm:mb-6 pl-4 sm:pl-6 border-l-4 border-stone-300 italic text-sm sm:text-base text-stone-600">
          <RenderChildren>{block.children}</RenderChildren>
        </blockquote>
      );

    case "code":
      return (
        <pre className="mb-4 sm:mb-6 p-3 sm:p-4 bg-stone-900 text-stone-100 rounded-lg overflow-x-auto">
          <code className="text-xs sm:text-sm font-mono">
            <RenderChildren>{block.children}</RenderChildren>
          </code>
        </pre>
      );

    case "image":
      const imageUrl = getStrapiImageUrl(block.image);
      if (!imageUrl) return null;
      const imageAlt = getStrapiImageAlt(block.image) || "";
      const imageWidth = block.image?.data?.attributes?.width || block.image?.attributes?.width || block.image?.width || 800;
      const imageHeight = block.image?.data?.attributes?.height || block.image?.attributes?.height || block.image?.height || 450;
      return (
        <figure className="mb-4 sm:mb-6">
          <StrapiImage
            image={block.image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="rounded-lg w-full h-auto"
          />
          {imageAlt && (
            <figcaption className="mt-2 text-center text-xs sm:text-sm text-stone-500">
              {imageAlt}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

function RenderHeading({
  level,
  children,
}: {
  level: number;
  children?: BlockChild[];
}) {
  const content = <RenderChildren>{children}</RenderChildren>;

  switch (level) {
    case 1:
      return <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4 sm:mb-6 mt-6 sm:mt-10">{content}</h1>;
    case 2:
      return <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 mb-3 sm:mb-4 mt-6 sm:mt-8">{content}</h2>;
    case 3:
      return <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-stone-900 mb-2 sm:mb-3 mt-4 sm:mt-6">{content}</h3>;
    case 4:
      return <h4 className="text-base sm:text-lg md:text-xl font-medium text-stone-900 mb-2 sm:mb-3 mt-3 sm:mt-4">{content}</h4>;
    case 5:
      return <h5 className="text-sm sm:text-base md:text-lg font-medium text-stone-900 mb-2 mt-3 sm:mt-4">{content}</h5>;
    case 6:
      return <h6 className="text-xs sm:text-sm md:text-base font-medium text-stone-900 mb-2 mt-3 sm:mt-4">{content}</h6>;
    default:
      return <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 mb-3 sm:mb-4 mt-6 sm:mt-8">{content}</h2>;
  }
}

function RenderChildren({ children }: { children?: BlockChild[] }) {
  if (!children) return null;

  return (
    <>
      {children.map((child, index) => (
        <RenderChild key={index} child={child} />
      ))}
    </>
  );
}

function RenderChild({ child }: { child: BlockChild }) {
  if (child.type === "link" && child.url) {
    const isExternal = child.url.startsWith("http");
    return (
      <Link
        href={child.url}
        className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        <RenderChildren>{child.children}</RenderChildren>
      </Link>
    );
  }

  let content: React.ReactNode = child.text || "";

  if (child.bold) {
    content = <strong className="font-semibold">{content}</strong>;
  }
  if (child.italic) {
    content = <em>{content}</em>;
  }
  if (child.underline) {
    content = <u>{content}</u>;
  }
  if (child.strikethrough) {
    content = <s>{content}</s>;
  }

  return <>{content}</>;
}

