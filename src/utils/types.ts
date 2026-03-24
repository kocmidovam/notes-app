export type NodeType = "text" | "image" | "list" | "page" | "heading1" | "heading2" | "heading3"

export type NodeData = {
  id: string
  type: NodeType
  value: string
}

export type Page = {
  id: string
  title: string
  slug: string
  nodes: NodeData[]
  cover: string
}