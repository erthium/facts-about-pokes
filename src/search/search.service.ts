import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {

    static async simplyfy(word: string): Promise<string> {
        // normalise the word in NFKD from (Normalization Form Compatibility Decomposition)
        // this will separate the accent from the letter
        const normalized: string = word.normalize('NFKD');
        // remove all the characters that are not ASCII
        const simplified: string =  normalized.replace(/[^\x00-\x7F]/g, '');
        return simplified.toLowerCase();
    }


    static async levDistance(word: string, target: string): Promise<number> {
        // find levenstein distance between two words
        if (word.length === 0) return target.length;
        if (target.length === 0) return word.length;
        const matrix: number[][] = [];
        for (let i = 0; i <= target.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= word.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= target.length; i++) {
            for (let j = 1; j <= word.length; j++) {
                let sub_cost = 1;
                if (target[i - 1] === word[j - 1]) sub_cost = 0;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + sub_cost
                );
            }
        }
        return matrix[target.length][word.length];
    }


    static async wordInWord(word: string, target: string): Promise<boolean> {
        // check if word is in target
        if (word.length === 0 || target.length === 0) return false;
        word = await this.simplyfy(word);
        target = await this.simplyfy(target);
        return target.includes(word);
    }


    static async similarity(word: string, target: string): Promise<number> {
        // find the similarity percentage between two words
        if (word.length === 0 || target.length === 0) return 0;
        word = await this.simplyfy(word);
        target = await this.simplyfy(target);
        return 1 - (await this.levDistance(word, target) / Math.max(word.length, target.length));
    }

}
