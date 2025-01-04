const {readMarkdownFileSync} = require('./file');
const path = require('path');

test('readMarkdownFileSync', () => {
    //readMarkdownFileSync('test.md');
    const markdown = readMarkdownFileSync(path.resolve(__dirname, '../fixtures/test.md'));
    expect(markdown).toStrictEqual('**bold**');     // 읽은 문자열이 fixtrue와 같은지 비교
});