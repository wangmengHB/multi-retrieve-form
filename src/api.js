

export function remoteCompute (exp) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result = exp.replace('operation:', '')
            resolve(result)
        }, 300);
    })
}