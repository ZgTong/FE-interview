const aa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

console.log(aa.then(res => console.log(res)));