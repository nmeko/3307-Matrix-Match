export type CompetitiveQuestion = {
  id: string
  question: string
  translations?: Partial<Record<"es" | "zh" | "hi" | "ar", { question: string }>>
  matrix?: number[][]
  answer: string
  options: string[]
  time: number
}

// Timed quiz questions on basic linear algebra; each answer must be one of its options.
export const COMPETITIVE_QUESTIONS: Record<"easy" | "medium" | "hard", CompetitiveQuestion[]> = {
  easy: [
    {
      id: "c1",
      question: "How many rows in this matrix?",
      translations: {
        es: { question: "¿Cuántas filas hay en esta matriz?" },
        zh: { question: "这个矩阵有多少行？" },
        hi: { question: "इस मैट्रिक्स में कितनी पंक्तियां हैं?" },
        ar: { question: "كم عدد الصفوف في هذه المصفوفة؟" },
      },
      matrix: [
        [1, 2],
        [3, 4],
      ],
      answer: "2",
      options: ["1", "2", "3", "4"],
      time: 15,
    },
    {
      id: "c2",
      question: "What is at R1, C1?",
      translations: {
        es: { question: "¿Qué hay en R1, C1?" },
        zh: { question: "R1, C1处是什么？" },
        hi: { question: "R1, C1 पर क्या है?" },
        ar: { question: "ما هو في R1, C1؟" },
      },
      matrix: [
        [5, 6],
        [7, 8],
      ],
      answer: "5",
      options: ["6", "7", "5", "8"],
      time: 15,
    },
    {
      id: "c3",
      question: "Is this a square matrix?",
      translations: {
        es: { question: "¿Es una matriz cuadrada?" },
        zh: { question: "这是一个正方矩阵吗？" },
        hi: { question: "क्या यह एक वर्ग मैट्रिक्स है?" },
        ar: { question: "هل هذه مصفوفة مربعة؟" },
      },
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      answer: "no",
      options: ["yes", "no"],
      time: 15,
    },
    {
      id: "c4",
      question: "How many elements total?",
      translations: {
        es: { question: "¿Cuántos elementos en total?" },
        zh: { question: "总共有多少个元素？" },
        hi: { question: "कुल कितने तत्व हैं?" },
        ar: { question: "كم عدد العناصر الإجمالي؟" },
      },
      matrix: [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      answer: "6",
      options: ["4", "5", "6", "8"],
      time: 15,
    },
    {
      id: "c5",
      question: "Sum of first row?",
      translations: {
        es: { question: "¿Suma de la primera fila?" },
        zh: { question: "第一行的和是多少？" },
        hi: { question: "पहली पंक्ति का योग?" },
        ar: { question: "مجموع الصف الأول؟" },
      },
      matrix: [
        [2, 3],
        [4, 5],
      ],
      answer: "5",
      options: ["7", "5", "9", "6"],
      time: 15,
    },
  ],
  medium: [
    {
      id: "m1",
      question: "Diagonal sum (trace)?",
      translations: {
        es: { question: "¿Suma diagonal (traza)?" },
        zh: { question: "对角线和（迹）？" },
        hi: { question: "विकर्ण योग (ट्रेस)?" },
        ar: { question: "مجموع القطر (الأثر)؟" },
      },
      matrix: [
        [3, 0],
        [0, 4],
      ],
      answer: "7",
      options: ["12", "7", "0", "4"],
      time: 12,
    },
    {
      id: "m2",
      question: "Element at R2, C2?",
      translations: {
        es: { question: "¿Elemento en R2, C2?" },
        zh: { question: "R2, C2处的元素？" },
        hi: { question: "R2, C2 पर तत्व?" },
        ar: { question: "العنصر في R2, C2؟" },
      },
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      answer: "5",
      options: ["4", "6", "5", "8"],
      time: 12,
    },
    {
      id: "m3",
      question: "Add row 1 and row 2: [1,2] + [3,4] = ?",
      translations: {
        es: { question: "Añadir: [1,2] + [3,4] = ?" },
        zh: { question: "添加: [1,2] + [3,4] = ?" },
        hi: { question: "जोड़ें: [1,2] + [3,4] = ?" },
        ar: { question: "أضف: [1,2] + [3,4] = ؟" },
      },
      matrix: [
        [1, 2],
        [3, 4],
      ],
      answer: "[4,6]",
      options: ["[3,7]", "[4,6]", "[2,8]", "[1,3]"],
      time: 12,
    },
    {
      id: "m4",
      question: "Matrix dimensions?",
      translations: {
        es: { question: "¿Dimensiones de la matriz?" },
        zh: { question: "矩阵尺寸？" },
        hi: { question: "मैट्रिक्स आयाम?" },
        ar: { question: "أبعاد المصفوفة؟" },
      },
      matrix: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      answer: "2x4",
      options: ["4x2", "2x4", "8x1", "2x2"],
      time: 12,
    },
    {
      id: "m5",
      question: "Last column sum?",
      translations: {
        es: { question: "¿Suma de la última columna?" },
        zh: { question: "最后一列的和？" },
        hi: { question: "अंतिम स्तंभ का योग?" },
        ar: { question: "مجموع العمود الأخير؟" },
      },
      matrix: [
        [1, 5],
        [2, 6],
        [3, 7],
      ],
      answer: "18",
      options: ["6", "15", "18", "21"],
      time: 12,
    },
  ],
  hard: [
    {
      id: "h1",
      question: "Matrix transpose [1,2;3,4]?",
      translations: {
        es: { question: "¿Transposición de matriz [1,2;3,4]?" },
        zh: { question: "矩阵转置 [1,2;3,4]?" },
        hi: { question: "मैट्रिक्स स्थानांतरण [1,2;3,4]?" },
        ar: { question: "تبديل المصفوفة [1,2;3,4]؟" },
      },
      matrix: [
        [1, 2],
        [3, 4],
      ],
      answer: "[1,3;2,4]",
      options: ["[1,2;3,4]", "[1,3;2,4]", "[4,3;2,1]", "[2,1;4,3]"],
      time: 10,
    },
    {
      id: "h2",
      question: "Determinant of 2x2?",
      translations: {
        es: { question: "¿Determinante de 2x2?" },
        zh: { question: "2x2的行列式？" },
        hi: { question: "2x2 का निर्धारक?" },
        ar: { question: "محدد 2x2؟" },
      },
      matrix: [
        [2, 3],
        [1, 4],
      ],
      answer: "5",
      options: ["5", "11", "8", "-5"],
      time: 10,
    },
    {
      id: "h3",
      question: "Identity matrix sum?",
      translations: {
        es: { question: "¿Suma de matriz identidad?" },
        zh: { question: "单位矩阵和？" },
        hi: { question: "पहचान मैट्रिक्स योग?" },
        ar: { question: "مجموع مصفوفة الهوية؟" },
      },
      matrix: [
        [1, 0],
        [0, 1],
      ],
      answer: "2",
      options: ["1", "2", "4", "0"],
      time: 10,
    },
    {
      id: "h4",
      question: "Row 1 × 2 = ?",
      translations: {
        es: { question: "¿Fila 1 × 2 = ?" },
        zh: { question: "第1行 × 2 = ?" },
        hi: { question: "पंक्ति 1 × 2 = ?" },
        ar: { question: "الصف 1 × 2 = ؟" },
      },
      matrix: [[3, 4]],
      answer: "[6,8]",
      options: ["[6,8]", "[5,6]", "[6,4]", "[9,16]"],
      time: 10,
    },
    {
      id: "h5",
      question: "Zero matrix check?",
      translations: {
        es: { question: "¿Comprobación de matriz cero?" },
        zh: { question: "零矩阵检查？" },
        hi: { question: "शून्य मैट्रिक्स जांच?" },
        ar: { question: "فحص مصفوفة الأصفار؟" },
      },
      matrix: [
        [0, 0],
        [0, 0],
      ],
      answer: "yes",
      options: ["yes", "no"],
      time: 10,
    },
  ],
}
