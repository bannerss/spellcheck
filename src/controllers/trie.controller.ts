import { NextFunction, Request, Response } from 'express';
import { ITrie } from '@interfaces/tries.interface';
import dictionaryService from '@services/dictionary.service';

class TrieController {
  public dictionaryService = new dictionaryService();

  public getDictionaryTrie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getDictionary: ITrie = await this.dictionaryService.getDictionary();

      res.status(200).json({ data: getDictionary, message: 'get Dictionary' });
    } catch (error) {
      next(error);
    }
  };

  public populateFromFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getDictionary: string = await this.dictionaryService.populateFromFile();

      res.status(200).json({ data: getDictionary, message: 'populated From File' });
    } catch (error) {
      next(error);
    }
  };

  public isWordExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const word = String(req.params.word);
      const findword: boolean = await this.dictionaryService.searchForWord(word);

      res.status(200).json({ data: findword, message: 'word found = '+ findword });
    } catch (error) {
      next(error);
    }
  };

  public bulkInsertWordsToTrie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const wordsArray: string[] = req.body;
      const bulkInsertWordsToTrie: string = await this.dictionaryService.bulkInsertWordsToTrie(wordsArray);

      res.status(201).json({  message: 'wordsInserted' });
    } catch (error) {
      next(error);
    }
  };


}

export default TrieController;
