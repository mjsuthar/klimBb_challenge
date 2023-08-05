import { NextFunction, Request, Response } from "express";
import { Blockchain, Transaction } from "../service/simpleBlockchain"

const blockchain = new Blockchain();

export class BaseController {
    private _request: Request;
    private _response: Response;
    constructor(request: Request, response: Response, next: NextFunction) {
        this._request = request;
        this._response = response;
    }

    async getAllTransaction() {
        
        if(!this._request.params.Address) {
            return {
                flag: false,
                type: "ADDRESS_NOT_FOUND",
                message: "Address not received.",
                data: null
            }
        }

        let personAmount = blockchain.chain;

        const statments = [];

        for (const block of personAmount) {
            const { fromAddress, toAddress, amount } = block.transaction;
            if (fromAddress === this._request.params.Address) {
                statments.push({
                    Date: new Date(block.timestamp),
                    Type: "debit",
                    Amount: amount
                });
            }
            if (toAddress === this._request.params.Address) {
                statments.push({
                    Date: new Date(block.timestamp),
                    Type: "credit",
                    Amount: amount
                });
            }
        }

        if(statments.length) {
            return {
                flag: true,
                message: "Successsful.",
                data: statments
            }
        }

        return {
            flag: true,
            message: `No Transaction found for Address Id: ${this._request.params.Address}`,
            data: statments
        }
    }

    async getBalance() {

        if(!this._request.params.Address) {
            return {
                flag: false,
                type: "ADDRESS_NOT_FOUND",
                message: "Address not received.",
                data: null
            }
        }

        let personAmount = blockchain.getBalance(this._request.params.Address);

        return {
            flag: true,
            message: "Successsful.",
            data: {
              "Address ID": this._request.params.Address,
              "Amount": personAmount
            }
        }
    }

    async addTransaction() {

        const { fromAddress, toAddress, amount } = this._request.body;
        
        if(!fromAddress) {
            return {
                flag: false,
                type: "FROM_ADDRESS_NOT_FOUND",
                message: "From Address not received.",
                data: null
            }
        }

        if(!toAddress) {
            return {
                flag: false,
                type: "FROM_ADDRESS_NOT_FOUND",
                message: "To Address not received.",
                data: null
            }
        }

        if(!amount) {
            return {
                flag: false,
                type: "AMOUNT_NOT_FOUND",
                message: "Amount not received.",
                data: null
            }
        }

        if(typeof amount !== 'number') {
            return {
                flag: false,
                type: "AMOUNT_INVALID",
                message: "Invalid Amount received.",
                data: null
            }
        }

        if(toAddress && fromAddress && fromAddress === toAddress) {
            return {
                flag: false,
                type: "ADDRESS_SAME",
                message: "To Address and From Address should not be same.",
                data: null
            }
        }

        let transaction = new Transaction(fromAddress, toAddress, amount);

        blockchain.addTransaction(transaction);

        return {
            flag: true,
            type: "DATA_SAVED",
            data: "Amount Transfer successfully."
        }

    }
}