// test, expect 함수는 자동으로 전역에 추가
// expect == assert
test('sample test', () => {
    expect(1+2).toStrictEqual(3); // 성공
    //expect(1+1).toStrictEqual(3); // 실패
})