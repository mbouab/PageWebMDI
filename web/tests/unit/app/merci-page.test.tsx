import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MerciPage from "@/app/merci/page";

describe("/merci page", () => {
  it("renders a single confirmation h1 and a link back home", () => {
    render(<MerciPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /accueil/i })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
