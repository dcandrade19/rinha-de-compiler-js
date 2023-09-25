const { parentPort, workerData } = require("worker_threads");
const {
    evalStr,
    evalPrint,
    evalInt,
    evalBool,
    evalCall,
    evalBinary,
    evalFunction,
    evalLet,
    evalFirst,
    evalSecond,
    evalTuple,
    evalVar,
    evalIf
} = require("./terms");

const memo = {}

function interpret(node, ctx) {
    switch (node.kind) {
        case "Print":
            return evalPrint(node.value, ctx, interpret)
        case "Str":
            return evalStr(node.value)
        case "Int":
            return evalInt(node.value)
        case "Bool":
            return evalBool(node.value)
        case "Binary":
            return evalBinary(node.kind, node.rhs, node.op, node.lhs, ctx, interpret, memo)
        case "Let":
            return evalLet(node.value, node.name, node.next, ctx, interpret)
        case "Var":
            return evalVar(node.text, ctx)
        case "Function":
            return evalFunction(node.value, node.parameters, interpret)
        case "If":
            return evalIf(node.condition, node.then, node.otherwise, ctx, interpret)
        case "Call":
            return evalCall(node.callee, node.arguments, ctx, interpret, memo)
        case "First":
            return evalFirst(node.value, ctx, interpret)
        case "Second":
            return evalSecond(node.value, ctx, interpret)
        case "Tuple":
            return evalTuple(node.first, node.second, ctx, interpret)
        default:
            console.log(`kind: ${node.kind} is invalid!`)
    }
}

parentPort.postMessage(interpret(workerData, {}))