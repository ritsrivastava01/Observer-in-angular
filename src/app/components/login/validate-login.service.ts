import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ValidateLoginService {

  constructor() { }

  /**
   * Used to match the pather 
   * Password shoud contains like  abc , cde , fgh
   * @param  {string} password
   * @returns boolean
   */
  isPasswordContainPattern = (password: string): boolean => {

    return this.getArrayOfThreeCharString(password)
      .map(x => this.getCharCodeFromString(x))
      .map(y => this.isCharCodeInSequence(y))
      .filter(z => z === true)[0];
  }

  isPasswordContainSameLetterTwice = (password: string): boolean => {

    return this.getArrayOfThreeCharString(password)
      .map(x => this.getCharCodeFromString(x))
      .map(y => this.isSameCharCoderRepeteTwoTimes(y))
      .filter(z => z === true).length > 2;
  }
  /**
   * Check if three char code in sequence
   * @param  {number[]} code : Three code char
   * @returns boolean
   */
  private isCharCodeInSequence = (code: number[]): boolean => {
    return ((code[0] === (code[1] - 1)) && (code[1] === (code[2] - 1))) ? true : false;
  }


  /**
   * Check if same letter repeated again
   * @param  {number[]} code
   * @returns boolean
   */
  private isSameCharCoderRepeteTwoTimes = (code: number[]): boolean => {


    return ((code[0] === code[1]) || (code[1] === code[2])) ? true : false;
  }

  
  /**
   * Used to return the Char code array
   * @param  {String} str
   * @returns number
   */
  private getCharCodeFromString = (str: String): number[] => {
    return str
      .split('')
      .map((x, i) => str.charCodeAt(i));
  }
  /**
   * Used to return the split the string in [x,y,z]
   * @param  {string} pass
   * @returns string
   */
  private getArrayOfThreeCharString = (pass: string): string[] => {
    return Array.from(pass.slice(2), (_, i) => pass.slice(i, i + 3));
  }
}
