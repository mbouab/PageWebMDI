import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams("segment=groupe"),
}));

describe("/contact page", () => {
  it("renders a single h1 and pre-selects the segment from the URL", async () => {
    const { default: ContactPage } = await import("@/app/contact/page");

    render(<ContactPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByLabelText(/segment/i)).toHaveValue("groupe");
  });
});
