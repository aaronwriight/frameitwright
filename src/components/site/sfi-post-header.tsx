import Link from "next/link";
import type { SfiPost } from "@/lib/sfi-posts";
import { formatSfiHeaderDate, getSfiTagColor } from "@/lib/sfi-posts";

export function SfiPostHeader({
  post,
  href,
  large = false,
  className = "",
}: {
  post: SfiPost;
  href?: string;
  large?: boolean;
  className?: string;
}) {
  return (
    <header className={className}>
      {large ? (
        <>
          <h1 className="font-serif text-2xl font-normal leading-tight text-stone-900 dark:text-stone-100 sm:text-3xl">{post.title}</h1>
          <p className="mt-2 font-serif text-base italic leading-6 text-stone-500 sm:text-lg">{post.subtitle}</p>
        </>
      ) : (
        <>
          <h3 className="font-serif text-lg font-normal leading-snug text-stone-900 dark:text-stone-100">
            {href ? (
              <Link href={href} className="hover:text-[#6f8200]">
                {post.title}
              </Link>
            ) : (
              post.title
            )}
          </h3>
          {href ? (
            <Link href={href} className="hover:text-[#6f8200]">
              <p className="mt-1 font-serif text-sm italic leading-6 text-stone-500">{post.subtitle}</p>
            </Link>
          ) : (
            <p className="mt-1 font-serif text-sm italic leading-6 text-stone-500">{post.subtitle}</p>
          )}
        </>
      )}

      <p className="mt-3 text-xs leading-6 text-stone-500">
        <time dateTime={`${post.date}T${post.time}`}>
          {formatSfiHeaderDate(post.date)} • {post.time}
        </time>{" "}
        • {post.location} • {post.entry}
      </p>

      {post.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] lowercase tracking-widest">
          {post.tags.map((tag) => (
            <li key={tag} style={{ color: getSfiTagColor(tag) }}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
