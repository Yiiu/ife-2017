class Diff {
    constructor (oldTree, newTree) {
        this.index = 0
        this.patches = {}
        this.dfsWalk(oldTree, newTree)
    }
    dfsWalk (oldNode, newNode) {
        console.log(oldNode, newNode)
    }
}
export default function (oldTree, newTree) {
    return new Diff(oldTree, newTree)
}