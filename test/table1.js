const solution = (n, m, k) => {
    let result = 0;
    let count = [];
    let current = 0;
    for (let i = 1; i <= n; i++)
        count.push(0);
    // start people is 1
    count[0] = 1;

    while (true) {
        // 짝수일때
        result++;
        console.log(`current : ${current} count : ${count}`);
        if (count[current] % 2 == 0) {
            current += k;
            current %= n;
            ++count[current];
            if (count[current] === m) {
                console.log(current);
                console.log("bomb");
                break;
            }
        } else {
            // 홀수일때.
            current -= k;
            if (current < 0)
                current += n;
            ++count[current];
            if (count[current] === m) {
                console.log("bomb");
                break;
            }
        }
    }
    return result;
};


console.log(solution(8, 5, 2));
