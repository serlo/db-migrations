import * as R from 'ramda'
import {
  BlockJSON,
  NodeJSON,
  ValueJSON,
  DocumentJSON,
  InlineJSON,
  TextJSON,
} from 'slate'

export function normalize(value: ValueJSON): ValueJSON {
  return {
    ...value,
    document: value.document ? normalizeNode(value.document)[0] : undefined,
  }
}

function normalizeNode<A extends NodeJSON>(node: A): A[] {
  if (isBlock(node)) {
    if (node?.nodes?.some(isInline) && node?.nodes?.some(isBlock)) {
      // @ts-ignore
      return R.chain(normalizeNode, unwrapChildBlocks(node))
    } else {
      return [{ ...node, nodes: R.chain(normalizeNode, node.nodes ?? []) }]
    }
  } else if (isDocument(node)) {
    return [{ ...node, nodes: R.chain(normalizeNode, node.nodes ?? []) }]
  } else {
    return [node]
  }
}

export function unwrapChildBlocks(node: BlockJSON): BlockJSON[] {
  if (node.nodes === undefined) return [node]

  const result: BlockJSON[] = []
  let nodesToInspect = node.nodes

  while (nodesToInspect.length > 0) {
    const [inlineNodes, tailNodes] = R.splitWhen(isBlock, nodesToInspect)

    if (inlineNodes.length > 0) result.push({ ...node, nodes: inlineNodes })
    if (tailNodes.length > 0) result.push(tailNodes[0] as BlockJSON)

    nodesToInspect = tailNodes.slice(1)
  }

  return result
}

function isBlock(node: NodeJSON): node is BlockJSON {
  return node?.object === 'block'
}

function isDocument(node: NodeJSON): node is DocumentJSON {
  return node?.object === 'document'
}

function isInline(node: NodeJSON): node is InlineJSON | TextJSON {
  return node?.object === 'inline' || node?.object === 'text'
}
