

export function remoteCompute (exp) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result = exp.replace('operation:', '')
            result = "[from server::]" + result;
            resolve(result)
        }, 300);
    })
}