import { etapes } from "@/content/commentCaMarche";

export default function CommentCaMarche() {
  return (
    <section
      id="comment-ca-marche"
      aria-labelledby="comment-ca-marche-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <h2
          id="comment-ca-marche-heading"
          className="max-w-2xl text-3xl font-bold text-ink sm:text-4xl"
        >
          Comment ça marche
        </h2>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {etapes.map((etape, index) => (
            <li key={etape.title} className="relative pl-14 sm:pl-0">
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-emerald font-mono text-sm font-semibold text-cream sm:static sm:mb-4"
              >
                {index + 1}
              </span>
              <h3 className="text-base font-semibold text-ink">
                {etape.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">
                {etape.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
