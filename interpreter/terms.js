function evalPrint(value, ctx, interpret) {
    const result = interpret(value, ctx)
    if (typeof result === 'function') {
        console.log('<#closure>')
        return
    }
    else if (Array.isArray(result)) {
        console.log(`(${result[0]}, ${result[1]})`)
        return
    }
    else
        console.log(result.toString())

    return result
}

function evalStr(value) {
    return String(value);
}

function evalInt(value) {
    return BigInt(value);
}

function evalBool(value) {
    return Boolean(value);
}

function evalCall(callee, arguments, ctx, interpret, memo) {
    const fn = interpret(callee, ctx)

    const args = arguments.map(arg => interpret(arg, ctx))
    const exist = memo[`${callee.text}-${args.join('-')}`]

    if (exist)
        return exist

    const result = fn(args, ctx)

    memo[`${callee.text}-${args.join('-')}`] = result

    return result
}

function evalBinary(kind, rhs, op, lhs, ctx, interpret, memo) {
    let lhsResult = undefined
    let rhsResult = undefined

    if (rhs.value && (rhs.kind === 'Int' || rhs.kind === 'Str' || rhs.kind === 'Bool')) {
        const exist = memo[`${kind}-${rhs.value}`]
        if (exist)
            rhsResult = exist
        else {
            rhsResult = interpret(rhs, ctx)
            memo[`${kind}-${rhs.value}`] = rhsResult
        }
    } else {
        rhsResult = interpret(rhs, ctx)
        memo[`${kind}-${rhs.value}`] = rhsResult
    }

    if (lhs.value && (lhs.kind === 'Int' || lhs.kind === 'Str' || lhs.kind === 'Bool')) {
        const exist = memo[`${kind}-${lhs.value}`]
        if (exist)
            lhsResult = exist
        else {
            lhsResult = interpret(lhs, ctx)
            memo[`${kind}-${lhs.value}`] = lhsResult
        }
    } else {
        lhsResult = interpret(lhs, ctx)
        memo[`${kind}-${lhs.value}`] = lhsResult
    }

    switch (op) {
        case "Add":
            return lhsResult + rhsResult
        case "Sub":
            return lhsResult - rhsResult
        case "Mul":
            return lhsResult * rhsResult
        case "Div":
            return lhsResult / rhsResult
        case "Rem":
            return lhsResult % rhsResult
        case "Eq":
            return lhsResult == rhsResult
        case "Neq":
            return lhsResult != rhsResult
        case "Lt":
            return lhsResult < rhsResult
        case "Gt":
            return lhsResult > rhsResult
        case "Lte":
            return lhsResult <= rhsResult
        case "Gte":
            return lhsResult >= rhsResult
        case "And":
            return lhsResult && rhsResult
        case "Or":
            return lhsResult || rhsResult
        default:
            console.log(`Op: ${op} is invalid!`)
            break;
    }
}

function evalFunction(value, parameters, interpret) {
    return (args, ctx) => {
        const scoped = { ...ctx }
        parameters.forEach((param, index) => {
            scoped[param.text] = args[index]
        })
        return interpret(value, { ...scoped })
    }
}

function evalLet(value, name, next, ctx, interpret) {
    const result = interpret(value, ctx)
    ctx[name.text] = result
    return interpret(next, ctx)
}

function evalIf(condition, then, otherwise, ctx, interpret) {
    const result = interpret(condition, ctx)
    if (result)
        return interpret(then, ctx)
    else
        return interpret(otherwise, ctx)
}

function evalFirst(value, ctx, interpret) {
    const result = interpret(value, ctx)
    return result[0]
}

function evalSecond(value, ctx, interpret) {
    const result = interpret(value, ctx)
    return result[1]
}

function evalTuple(first, second, ctx, interpret) {
    const firstResult = interpret(first, ctx)
    const secondResult = interpret(second, ctx)

    return [firstResult, secondResult]
}

function evalVar(text, ctx) {
    return ctx[text]
}

module.exports = {
    evalInt,
    evalStr,
    evalCall,
    evalBinary,
    evalFunction,
    evalLet,
    evalIf,
    evalPrint,
    evalFirst,
    evalSecond,
    evalBool,
    evalTuple,
    evalVar,
}