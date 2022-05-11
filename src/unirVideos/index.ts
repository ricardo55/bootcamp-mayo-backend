
import {spawn} from 'child_process';
import {createPathTemp} from '../service/controllers/utils.controller';

const [nodeParam, fileExecuteParam, firstParams, secondParams] = process.argv;


const sendDataToOS = (inputVideoSource: string) => {
  const inputVideoSrc = `${__dirname}/${inputVideoSource}`;
  const outputVideoSrc = createPathTemp(inputVideoSource, 'mp4');

// ffmpeg -f concat -safe 0 -i mylist.txt -c copy output.mp4
  const principalCommand = 'ffmpeg';
  const args = [
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    `${inputVideoSrc}`,
    '-c',
    'copy',
    `${outputVideoSrc}`];
  const options = {
    shell: true,
  };

  const child = spawn(principalCommand, args, options);

  child.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.log(`LogLevel: ${data}`);
  });

  child.on('close', (code) => {
    console.log('🚀 ~ file: index.ts ~ line 25 ~ child.on ~ code', code);
  });

  console.log(outputVideoSrc);
};

sendDataToOS(firstParams);
