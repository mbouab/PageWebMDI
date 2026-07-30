import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

const baseClients = {
  heading: "Ils pilotent déjà avec Le Passe (mocké)",
  groupName: "Groupe Mocké",
  location: "Lieu Mocké",
  named: [{ name: "Boma Beach", place: "Boucan Canot, La Réunion" }],
  anonymous: [{ name: "Groupe de restauration", place: "2 établissements" }],
  testimonial: null,
};

afterEach(() => {
  vi.resetModules();
});

describe("Clients (T-1.3, showClientNames = true)", () => {
  it("shows named clients", async () => {
    vi.doMock("@/config/site", () => ({
      site: { clients: baseClients },
      showClientNames: true,
    }));

    const { default: Clients } = await import("@/components/sections/Clients");
    render(<Clients />);

    expect(screen.getByText("Boma Beach")).toBeInTheDocument();
    expect(
      screen.queryByText("Groupe de restauration"),
    ).not.toBeInTheDocument();
  });
});

describe("Clients (T-1.3, showClientNames = false)", () => {
  it("shows the anonymous variant instead of named clients", async () => {
    vi.doMock("@/config/site", () => ({
      site: { clients: baseClients },
      showClientNames: false,
    }));

    const { default: Clients } = await import("@/components/sections/Clients");
    render(<Clients />);

    expect(screen.queryByText("Boma Beach")).not.toBeInTheDocument();
    expect(screen.getByText("Groupe de restauration")).toBeInTheDocument();
  });
});
