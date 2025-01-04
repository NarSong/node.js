const path = require('path');
const {marked} = require('marked');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers'); // process.argv.slice(2)의 줄임말
const {getPackageName} = require('./lib/name');
const {readMarkdownFileSync, writeHtmlFileSync} = require('./lib/file');

const {argv} = yargs(hideBin(process.argv))
                .option('name', {
                    describe: 'CLI 이름을 표시'
                })
                .option('file', {
                    describe: '마크다운 파일 경로'
                })
                .option('out', {
                    describe: 'html file',
                    default: 'article.html'
                });

if(argv.name) {
    const name = getPackageName();
    process.exit(0);
} 

const markdownStr = readMarkdownFileSync(path.resolve(__dirname, argv.file));
const html = marked(markdownStr);

writeHtmlFileSync(path.resolve(__dirname, argv.out), html);

// name 옵션 체크
/*const nameOption = process.argv.includes('--name');
if(nameOption) {
    console.log(package.name);
} else {
    console.log('옵션이 없습니다');
}*/

