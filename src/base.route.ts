import { NextFunction, Request, Response, Router } from "express";
import { GlobalFunction } from "./global";
import { BaseController } from "./controller/base.controller";

class BaseRoute {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.index);

    this.router.get(`${this.path}balance/:Address`, this.getBalance)
    this.router.get(`${this.path}allTransaction/:Address`, this.getAllTransaction)

    this.router.post(`${this.path}transaction`, this.addTransaction)
  }

  private index = async (request: Request, response: Response, next: NextFunction) => {
    response.send("hi BaseRoute");
  }


  private getAllTransaction = async (request: Request, response: Response, next: NextFunction) => {
    const baseController = new BaseController(request, response, next);
    await baseController.getAllTransaction().then((result: any) => {
        if (!result.flag) { 
          GlobalFunction.customisedErrorResponse(request, response, result?.type, result?.message); 
        } else { 
          GlobalFunction.successResponse(request, response, result.data, result?.message); 
        }
    })
    .catch((err: any) => {
      GlobalFunction.errorResponse(request, response, 400, err.message);
    });
  }

  private getBalance = async (request: Request, response: Response, next: NextFunction) => {
    const baseController = new BaseController(request, response, next);
    await baseController.getBalance().then((result: any) => {
        if (!result.flag) { 
          GlobalFunction.customisedErrorResponse(request, response, result?.type, result?.message); 
        } else { 
          GlobalFunction.successResponse(request, response, result.data, result?.message); 
        }
    })
    .catch((err: any) => {
      GlobalFunction.errorResponse(request, response, 400, err.message);
    });
  }

  private addTransaction = async (request: Request, response: Response, next: NextFunction) => {
    const baseController = new BaseController(request, response, next);
    await baseController.addTransaction().then((result: any) => {
        if (!result.flag) { 
          GlobalFunction.customisedErrorResponse(request, response, result?.type, result?.message); 
        } else { 
          GlobalFunction.successResponse(request, response, result.data, result?.message); 
        }
    })
    .catch((err: any) => {
      GlobalFunction.errorResponse(request, response, 400, err.message);
    });
  }

}

export default BaseRoute;