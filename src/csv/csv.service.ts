import * as fs from 'fs';
import * as readline from 'readline';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CsvService {

    static separator: string = ',';

    
    static async getNumberOfLines(csvFilePath: string): Promise<number> {
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


    static async getLineByIndex(csvFilePath: string, lineNumber: number): Promise<string> {
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


    static async getLineByColumn(csvFilePath: string, columnIndex: number, columnData: string, caseSensitive: boolean = false): Promise<string> {
      return new Promise((resolve, reject) => {
          if (!caseSensitive) columnData = columnData.toLowerCase();
          const stream = fs.createReadStream(csvFilePath);
          const reader = readline.createInterface({
              input: stream,
              crlfDelay: Infinity,
          });

          let currentLine = 0;

          reader.on('line', (line) => {
              currentLine++;
              const columns = line.split(this.separator);
              if (!caseSensitive) columns[columnIndex] = columns[columnIndex].toLowerCase();
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


  static async getColumnByIndex(csvFilePath: string, columnIndex: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(csvFilePath);
        const reader = readline.createInterface({
          input: stream,
          crlfDelay: Infinity,
        });
  
        const columnData: string[] = [];
  
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


  static async getRandomLine(csvFilePath: string): Promise<string> {
    const numberOfLines = await this.getNumberOfLines(csvFilePath);
    const randomLineNumber = Math.floor(Math.random() * numberOfLines) + 1;
    return this.getLineByIndex(csvFilePath, randomLineNumber);
  }
}
