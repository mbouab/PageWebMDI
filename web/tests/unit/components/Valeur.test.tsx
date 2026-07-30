import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Valeur from "@/components/sections/Valeur";
import { piliers, benefits } from "@/content/valeur";

describe("Valeur (T-3.1)", () => {
  it("renders exactly 3 pillar cards, each with a title and a description", () => {
    render(<Valeur />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(3);

    for (const pilier of piliers) {
      expect(
        screen.getByRole("heading", { level: 3, name: pilier.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(pilier.description)).toBeInTheDocument();
    }
  });
});

describe("Valeur (T-3.2)", () => {
  it("renders the 4 numeric benefit arguments", () => {
    render(<Valeur />);

    for (const benefit of benefits) {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    }
  });
});
