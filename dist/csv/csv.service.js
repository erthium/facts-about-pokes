"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvService = void 0;
const fs = require("fs");
const readline = require("readline");
const common_1 = require("@nestjs/common");
let CsvService = class CsvService {
    static async getNumberOfLines(csvFilePath) {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(csvFilePath);
            const reader = readline.createInterface({
                input: stream,
                crlfDelay: Infinity,
            });
            let lineCount = 0;
            reader.on('line', () => {
                lineCount++;
            });
            reader.on('close', () => {
                resolve(lineCount);
            });
            reader.on('error', (error) => {
                reject(error);
            });
        });
    }
    static async getLineByIndex(csvFilePath, lineNumber) {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(csvFilePath);
            const reader = readline.createInterface({
                input: stream,
                crlfDelay: Infinity,
            });
            let currentLine = 0;
            reader.on('line', (line) => {
                currentLine++;
                if (currentLine === lineNumber) {
                    const content = line;
                    resolve(content);
                }
            });
            reader.on('close', () => {
                reject(new Error('End of file reached before finding the line.'));
            });
            reader.on('error', (error) => {
                reject(error);
            });
        });
    }
    static async getLineByColumn(csvFilePath, columnIndex, columnData, caseSensitive = false) {
        return new Promise((resolve, reject) => {
            if (!caseSensitive)
                columnData = columnData.toLowerCase();
            const stream = fs.createReadStream(csvFilePath);
            const reader = readline.createInterface({
                input: stream,
                crlfDelay: Infinity,
            });
            let currentLine = 0;
            reader.on('line', (line) => {
                currentLine++;
                const columns = line.split(this.separator);
                if (!caseSensitive)
                    columns[columnIndex] = columns[columnIndex].toLowerCase();
                if (columns[columnIndex] === columnData) {
                    const content = line;
                    resolve(content);
                }
            });
            reader.on('close', () => {
                reject(new Error('End of file reached before finding the column.'));
            });
            reader.on('error', (error) => {
                reject(error);
            });
        });
    }
    static async getColumnByIndex(csvFilePath, columnIndex) {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(csvFilePath);
            const reader = readline.createInterface({
                input: stream,
                crlfDelay: Infinity,
            });
            const columnData = [];
            reader.on('line', (line) => {
                const columns = line.split(this.separator);
                columnData.push(columns[columnIndex]);
            });
            reader.on('close', () => {
                resolve(columnData);
            });
            reader.on('error', (error) => {
                reject(error);
            });
        });
    }
    static async getRandomLine(csvFilePath) {
        const numberOfLines = await this.getNumberOfLines(csvFilePath);
        const randomLineNumber = Math.floor(Math.random() * numberOfLines) + 1;
        return this.getLineByIndex(csvFilePath, randomLineNumber);
    }
};
exports.CsvService = CsvService;
CsvService.separator = ',';
exports.CsvService = CsvService = __decorate([
    (0, common_1.Injectable)()
], CsvService);
//# sourceMappingURL=csv.service.js.map