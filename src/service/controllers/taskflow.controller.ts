import { ffmpegController } from './ffmpeg.controller';
import { videosourceController } from './videosources.controller';
import { videoStatusController } from './videostatus.controller';
import { appendFile } from 'fs';

class videosUnir {
    async executeProcess(inputVideo1: string, inputVideo2: string,
        inputVideo3: string, inputVideo4: string) {
        try {
            const context = {
                userId: '8275bb583af83b4205af521a',
            };

            let arregloVideosJuntos = [
                inputVideo1,
                inputVideo2,
                inputVideo3,
                inputVideo4
            ]
            let arreglosVideosUnidos = []

            let j = 2

            for (let i = 0; i < j; i++) {

                const Video1 = await videosourceController.createVideoSource(arregloVideosJuntos[0], context);
                const videoSource2 = await videosourceController.createVideoSource(arregloVideosJuntos[1], context);
                await videoStatusController.createVideoStatus(Video1._id, context, 'pending')
                await videoStatusController.createVideoStatus(videoSource2._id, context, 'pending')

                appendFile(`list${i}.txt`, `${arregloVideosJuntos[0]}\n${arregloVideosJuntos[1]}`, (err) => {
                    if (err) {
                        throw err
                    }
                });

                arregloVideosJuntos.shift()
                arreglosVideosUnidos.shift()

                let rutaVideos = await ffmpegController.processVideo(`./list${i}.txt`, videoSource2.fileSources.tem, context, videoSource2._id)

                arreglosVideosUnidos.push(rutaVideos)


            }
            const videoSourceJoin1 = await videosourceController.createVideoSource(arreglosVideosUnidos[0], context);
            const videoSourceJoin2 = await videosourceController.createVideoSource(arreglosVideosUnidos[1], context);
            await videoStatusController.createVideoStatus(videoSourceJoin1._id, context, 'pending')
            await videoStatusController.createVideoStatus(videoSourceJoin2._id, context, 'pending')

            appendFile('primerProceso.tx', `${arreglosVideosUnidos[0]}\n${arreglosVideosUnidos[1]}`, (err) => { throw err })

            let rutaVideoss = await ffmpegController.processVideo(`./primerProceso.txt`, videoSourceJoin2.fileSources.tem, context, videoSourceJoin2._id)

            return rutaVideoss

        } catch (error) {
            throw error;
        }
    }
}


const taskFlowCont = new videosUnir();

export {
    taskFlowCont,
};