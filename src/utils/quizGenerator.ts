import { WordData, QuizQuestion, QuizOption } from '../types/quiz';

export class QuizGenerator {
  private wordData: WordData[];
  private usedWords: Set<string> = new Set();

  constructor(wordData: WordData[]) {
    this.wordData = wordData;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private getRandomWords(exclude: WordData, count: number): WordData[] {
    const availableWords = this.wordData.filter(word => word.kanji !== exclude.kanji);
    const shuffled = this.shuffleArray(availableWords);
    return shuffled.slice(0, count);
  }

  private generateOptions(correctWord: WordData): QuizOption[] {
    const wrongWords = this.getRandomWords(correctWord, 3);
    
    // Generate kana options (1 correct + 1 wrong)
    const kanaOptions: QuizOption[] = [
      {
        id: `kana-correct`,
        text: correctWord.kana,
        type: 'kana',
        isCorrect: true
      },
      {
        id: `kana-wrong-1`,
        text: wrongWords[0].kana,
        type: 'kana',
        isCorrect: false
      }
    ];

    // Generate korean options (1 correct + 1 wrong)
    const koreanOptions: QuizOption[] = [
      {
        id: `korean-correct`,
        text: correctWord.korean,
        type: 'korean',
        isCorrect: true
      },
      {
        id: `korean-wrong-1`,
        text: wrongWords[1].korean,
        type: 'korean',
        isCorrect: false
      }
    ];

    // Add more wrong options to fill the grid (2 more for each type)
    kanaOptions.push(
      {
        id: `kana-wrong-2`,
        text: wrongWords[2].kana,
        type: 'kana',
        isCorrect: false
      },
      {
        id: `kana-wrong-3`,
        text: wrongWords.length > 3 ? this.getRandomWords(correctWord, 4)[3].kana : wrongWords[0].kana + 'x',
        type: 'kana',
        isCorrect: false
      }
    );

    koreanOptions.push(
      {
        id: `korean-wrong-2`,
        text: wrongWords[2].korean,
        type: 'korean',
        isCorrect: false
      },
      {
        id: `korean-wrong-3`,
        text: wrongWords.length > 3 ? this.getRandomWords(correctWord, 4)[3].korean : wrongWords[0].korean + 'x',
        type: 'korean',
        isCorrect: false
      }
    );

    // Shuffle and combine all options
    const shuffledKana = this.shuffleArray(kanaOptions);
    const shuffledKorean = this.shuffleArray(koreanOptions);
    
    return [...shuffledKana, ...shuffledKorean];
  }

  generateQuestion(): QuizQuestion | null {
    // If all words have been used, reset
    if (this.usedWords.size >= this.wordData.length) {
      this.usedWords.clear();
    }

    // Find unused words
    const availableWords = this.wordData.filter(word => !this.usedWords.has(word.kanji));
    
    if (availableWords.length === 0) {
      return null;
    }

    // Select random word
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];
    
    // Mark as used
    this.usedWords.add(selectedWord.kanji);

    // Generate options
    const options = this.generateOptions(selectedWord);

    return {
      kanji: selectedWord.kanji,
      correctKana: selectedWord.kana,
      correctKorean: selectedWord.korean,
      options
    };
  }

  reset(): void {
    this.usedWords.clear();
  }

  getProgress(): { used: number; total: number } {
    return {
      used: this.usedWords.size,
      total: this.wordData.length
    };
  }
}
