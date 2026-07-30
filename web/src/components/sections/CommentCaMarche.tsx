import { etapes } from "@/content/commentCaMarche";

export default function CommentCaMarche() {
  return (
    <section id="comment-ca-marche" aria-labelledby="comment-ca-marche-heading">
      <h2 id="comment-ca-marche-heading">Comment ça marche</h2>
      <ol>
        {etapes.map((etape) => (
          <li key={etape.title}>
            <h3>{etape.title}</h3>
            <p>{etape.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
