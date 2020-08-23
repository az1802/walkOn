function debounce(func, delay = 1000) {
    let timer;
    console.log("执行 debounce函数");
    function debounced(...args) {
        debounced.cancel(timer);
        timer = setTimeout(() => {
            console.log("执行func");
            func.apply(this, args)
        }, delay)
    }
    debounced.cancel = function () {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
    }


    return debounced

}


export default debounce;
