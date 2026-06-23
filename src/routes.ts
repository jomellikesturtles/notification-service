import { Router } from "express";
import communicationController from "./communication.controller.js";
import actuatorController from "./actuator.js";


const api = Router()
  .use(communicationController, actuatorController);

export default Router().use('/api', api);