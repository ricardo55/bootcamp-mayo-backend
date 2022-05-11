import { Router } from 'restify-router';
import { videoFlowController } from '../controllers/videoflow.controller';

const rutaDeFlujo = new Router();


rutaDeFlujo.post('/processvideo', async (req, res) => {
  try {
    const { inputvideo } = req.body;
    res.json({ inputvideo });
    await videoFlowController.executeProcess(inputvideo);
  } catch (error) {
    let errorMessage = 'Fallo al procesar el video';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.json({ success: false, error: true, message: errorMessage });
  }
});


export default rutaDeFlujo;
