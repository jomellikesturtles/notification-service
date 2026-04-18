import { Router } from "express";
import communicationController from "./communication.controller.js";


const api = Router()
  .use(communicationController);

export default Router().use('/api', api);