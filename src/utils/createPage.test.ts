import { describe, it, expect } from "vitest"
import { createPage } from "./createPage"

describe("createPage", () => {
  it("returns a page with default title", () => {
    expect(createPage().title).toBe("Title")
  })

  it("returns a page with empty cover", () => {
    expect(createPage().cover).toBe("")
  })

  it("returns a page with empty nodes array", () => {
    expect(createPage().nodes).toEqual([])
  })

  it("returns a page with non-empty id and slug", () => {
    const page = createPage()
    expect(page.id).toBeTruthy()
    expect(page.slug).toBeTruthy()
  })

  it("generates unique id and slug for each page", () => {
    const page1 = createPage()
    const page2 = createPage()
    expect(page1.id).not.toBe(page2.id)
    expect(page1.slug).not.toBe(page2.slug)
  })
})
