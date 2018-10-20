export const question = (question) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                anwser: 'Yes My lord'
            })
        }, 3000)
    })
} 