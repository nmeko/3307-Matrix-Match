import type { Level, Question } from "./types"

export const COMPETITIVE_QUESTIONS: Question[] = [
  {
    id: "c1",
    type: "multiple-choice",
    question: "Quick! What is the determinant?",
    matrix: [
      [1, 2],
      [3, 4],
    ],
    options: ["-2", "2", "10", "0"],
    correctAnswer: "-2",
    explanation: "1*4 - 2*3 = 4 - 6 = -2",
    translations: {
      es: {
        question: "¡Rápido! ¿Cuál es el determinante?",
        options: ["-2", "2", "10", "0"],
        explanation: "1*4 - 2*3 = 4 - 6 = -2",
      },
      zh: {
        question: "快速！行列式是什么？",
        options: ["-2", "2", "10", "0"],
        explanation: "1*4 - 2*3 = 4 - 6 = -2",
      },
      hi: {
        question: "तेजी से! सारणिक क्या है?",
        options: ["-2", "2", "10", "0"],
        explanation: "1*4 - 2*3 = 4 - 6 = -2",
      },
      ar: {
        question: "بسرعة! ما هو المحدد؟",
        options: ["-2", "2", "10", "0"],
        explanation: "1*4 - 2*3 = 4 - 6 = -2",
      },
    },
  },
  {
    id: "c2",
    type: "multiple-choice",
    question: "Identify the Identity Matrix",
    options: ["[[1,0],[0,1]]", "[[0,1],[1,0]]", "[[1,1],[1,1]]", "[[0,0],[0,0]]"],
    correctAnswer: "[[1,0],[0,1]]",
    explanation: "Identity matrix has 1s on diagonal and 0s elsewhere.",
    translations: {
      es: {
        question: "Identificar la matriz de identidad",
        options: ["[[1,0],[0,1]]", "[[0,1],[1,0]]", "[[1,1],[1,1]]", "[[0,0],[0,0]]"],
        explanation: "La matriz de identidad tiene 1 en la diagonal y 0 en otros lugares.",
      },
      zh: {
        question: "识别单位矩阵",
        options: ["[[1,0],[0,1]]", "[[0,1],[1,0]]", "[[1,1],[1,1]]", "[[0,0],[0,0]]"],
        explanation: "单位矩阵在对角线上有1，其他地方有0。",
      },
      hi: {
        question: "पहचान मैट्रिक्स की पहचान करें",
        options: ["[[1,0],[0,1]]", "[[0,1],[1,0]]", "[[1,1],[1,1]]", "[[0,0],[0,0]]"],
        explanation: "पहचान मैट्रिक्स के विकर्ण पर 1 है और अन्यत्र 0 है।",
      },
      ar: {
        question: "حدد مصفوفة الهوية",
        options: ["[[1,0],[0,1]]", "[[0,1],[1,0]]", "[[1,1],[1,1]]", "[[0,0],[0,0]]"],
        explanation: "مصفوفة الهوية بها 1 على القطر و 0 في أماكن أخرى.",
      },
    },
  },
  {
    id: "c3",
    type: "multiple-choice",
    question: "Matrix A + Matrix B requires...",
    matrix: [
      [1, 2],
      [3, 4],
    ],
    options: ["Same Dimensions", "Square Matrices", "Same Determinant", "Invertibility"],
    correctAnswer: "Same Dimensions",
    explanation: "You can only add matrices of the same size.",
    translations: {
      es: {
        question: "Matrix A + Matrix B requiere...",
        options: ["Misma Dimensión", "Matrices Cuadradas", "Mismo Determinante", "Invertibilidad"],
        correctAnswer: "Misma Dimensión",
        explanation: "Solo puedes sumar matrices del mismo tamaño.",
      },
      zh: {
        question: "矩阵A + 矩阵B需要...",
        options: ["相同的尺寸", "方阵", "相同的行列式", "可逆性"],
        correctAnswer: "相同的尺寸",
        explanation: "你只能添加相同大小的矩阵。",
      },
      hi: {
        question: "मैट्रिक्स A + मैट्रिक्स B के लिए...",
        options: ["समान आयाम", "वर्ग आव्यूह", "समान निर्णयक", "प्रतिलोमता"],
        correctAnswer: "समान आयाम",
        explanation: "आप केवल समान आयाम के आव्यूहों को जोड़ सकते हैं।",
      },
      ar: {
        question: "Matrix A + Matrix B يتطلب...",
        options: ["الأبعاد نفسها", "ال_matrices المربعة", "ال行列ات نفسها", "القابلية للعكس"],
        correctAnswer: "الأبعاد نفسها",
        explanation: "يمكنك فقط إضافة المصفوفات ذات الأبعاد نفسها.",
      },
    },
  },
  {
    id: "c4",
    type: "multiple-choice",
    question: "Solve for x: [[x]] = [[5]]",
    options: ["5", "1", "0", "Undefined"],
    correctAnswer: "5",
    explanation: "Elements must be equal.",
    translations: {
      es: {
        question: "Resuelve para x: [[x]] = [[5]]",
        options: ["5", "1", "0", "Indefinido"],
        correctAnswer: "5",
        explanation: "Los elementos deben ser iguales.",
      },
      zh: {
        question: "解x：[[x]] = [[5]]",
        options: ["5", "1", "0", "未定义"],
        correctAnswer: "5",
        explanation: "元素必须相等。",
      },
      hi: {
        question: "x का मान ज्ञात करें: [[x]] = [[5]]",
        options: ["5", "1", "0", "अपरिभाषित"],
        correctAnswer: "5",
        explanation: "सभी तत्व बराबर होने चाहिए।",
      },
      ar: {
        question: "حل x: [[x]] = [[5]]",
        options: ["5", "1", "0", "غير محدد"],
        correctAnswer: "5",
        explanation: "يجب أن تكون العناصر متساوية.",
      },
    },
  },
  {
    id: "c5",
    type: "multiple-choice",
    question: "Which matrix has no inverse?",
    matrix: [
      [1, 1],
      [2, 2],
    ],
    options: ["This one", "Identity", "Diagonal", "Scalar"],
    correctAnswer: "This one",
    explanation: "Determinant is 0 (1*2 - 1*2 = 0), so no inverse exists.",
    translations: {
      es: {
        question: "¿Cuál matriz no tiene inversa?",
        options: ["Esta", "Identidad", "Diagonal", "Escalar"],
        correctAnswer: "Esta",
        explanation: "El determinante es 0 (1*2 - 1*2 = 0), por lo que no existe inversa.",
      },
      zh: {
        question: "哪个矩阵没有逆矩阵？",
        matrix: [
          [1, 1],
          [2, 2],
        ],
        options: ["这个", "单位矩阵", "对角矩阵", "标量矩阵"],
        correctAnswer: "这个",
        explanation: "行列式为0（1*2 - 1*2 = 0），所以不存在逆矩阵。",
      },
      hi: {
        question: "कौन सा मैट्रिक्स का प्रतिलोम नहीं है?",
        options: ["इसी", "आइडेंटिटी", "विकर्ण", "स्केलर"],
        correctAnswer: "इसी",
        explanation: "निर्णयक 0 है (1*2 - 1*2 = 0), इसलिए प्रतिलोम नहीं है।",
      },
      ar: {
        question: "ما هي المصفوفة التي لا تملك عكس؟",
        options: ["هذه", "الهوية", "ال Диагونالية", "ال متجهة"],
        correctAnswer: "هذه",
        explanation: "ال行列ات 0 (1*2 - 1*2 = 0)، لذا لا يوجد عكس.",
      },
    },
  },
]

const GAME_LEVELS_INTERNAL: Level[] = [
  {
    id: 1,
    name: "Matrix Basics",
    description: "Learn what a matrix is and how to read it!",
    locked: false,
    translations: {
      es: {
        name: "Conceptos Básicos de Matrices",
        description: "¡Aprende qué es una matriz y cómo leerla!",
      },
      zh: {
        name: "矩阵基础",
        description: "学习什么是矩阵以及如何阅读它!",
      },
      hi: {
        name: "मैट्रिक्स की मूल बातें",
        description: "जानें कि मैट्रिक्स क्या है और इसे कैसे पढ़ें!",
      },
      ar: {
        name: "أساسيات المصفوفة",
        description: "تعلم ما هي المصفوفة وكيفية قراءتها!",
      },
    },
    subLevels: {
      easy: {
        id: "l1-easy",
        difficulty: "Easy",
        passed: false,
        questions: [
          {
            id: "q1",
            type: "true-false",
            question: "True or False: Is [[1,2],[3,4]] a matrix?",
            matrix: [
              [1, 2],
              [3, 4],
            ],
            options: ["True", "False"],
            correctAnswer: "True",
            explanation:
              "A matrix is any rectangular arrangement of numbers in rows and columns. [[1,2],[3,4]] is definitely a matrix!",
            hint: "A matrix is simply a rectangular arrangement of numbers. Does [[1,2],[3,4]] look like a rectangle of numbers?",
            definition:
              "A matrix is a rectangular arrangement of numbers in rows (horizontal) and columns (vertical). Example: [[1,2],[3,4]] has 2 rows and 2 columns.",
            translations: {
              es: {
                question: "Verdadero o Falso: ¿Es [[1,2],[3,4]] una matriz?",
                options: ["Verdadero", "Falso"],
                explanation:
                  "Una matriz es cualquier arreglo rectangular de números en filas y columnas. ¡[[1,2],[3,4]] es definitivamente una matriz!",
                hint: "Una matriz es simplemente un arreglo rectangular de números. ¿Se ve [[1,2],[3,4]] como un rectángulo de números?",
                definition:
                  "Una matriz es un arreglo rectangular de números en filas (horizontal) y columnas (vertical). Ejemplo: [[1,2],[3,4]] tiene 2 filas y 2 columnas.",
              },
              zh: {
                question: "真或假：[[1,2],[3,4]]是矩阵吗？",
                options: ["真", "假"],
                explanation: "矩阵是行和列中数字的任何矩形排列。 [[1,2],[3,4]]肯定是一个矩阵！",
                hint: "矩阵只是数字的矩形排列。 [[1,2],[3,4]]看起来像数字的矩形吗？",
                definition: "矩阵是行（水平）和列（垂直）中数字的矩形排列。示例：[[1,2],[3,4]]有2行2列。",
              },
              hi: {
                question: "सत्य या असत्य: क्या [[1,2],[3,4]] एक मैट्रिक्स है?",
                options: ["सत्य", "असत्य"],
                explanation:
                  "मैट्रिक्स पंक्तियों और स्तंभों में संख्याओं की कोई भी आयताकार व्यवस्था है। [[1,2],[3,4]] निश्चित रूप से एक मैट्रिक्स है!",
                hint: "मैट्रिक्स केवल संख्याओं की एक आयताकार व्यवस्था है। क्या [[1,2],[3,4]] संख्याओं के आयत जैसा दिखता है?",
                definition:
                  "मैट्रिक्स पंक्तियों (क्षैतिज) और स्तंभों (ऊर्ध्वाधर) में संख्याओं की एक आयताकार व्यवस्था है। उदाहरण: [[1,2],[3,4]] में 2 पंक्तियाँ और 2 स्तंभ हैं।",
              },
              ar: {
                question: "صحيح أم خطأ: هل [[1,2],[3,4]] مصفوفة؟",
                options: ["صحيح", "خطأ"],
                explanation:
                  "المصفوفة هي أي ترتيب مستطيل من الأرقام في الصفوف والأعمدة. [[1,2],[3,4]] هي بالتأكيد مصفوفة!",
                hint: "المصفوفة ببساطة هي ترتيب مستطيل من الأرقام. هل تبدو [[1,2],[3,4]] مثل مستطيل من الأرقام؟",
                definition:
                  "المصفوفة هي ترتيب مستطيل من الأرقام في الصفوف (أفقي) والأعمدة (رأسي). مثال: [[1,2],[3,4]] بها صفين وعمودين.",
              },
            },
          },
          {
            id: "q2",
            type: "input",
            question: "How many rows are in this matrix?",
            matrix: [
              [5, 6, 7],
              [8, 9, 10],
            ],
            correctAnswer: "2",
            explanation: "Rows go left to right. This matrix has 2 rows.",
            hint: "Rows are the horizontal lines. Count from top to bottom.",
            definition: "Rows are the horizontal lines in a matrix. In [[5,6,7],[8,9,10]], there are 2 rows.",
            translations: {
              es: {
                question: "¿Cuántas filas hay en esta matriz?",
                matrix: [
                  [5, 6, 7],
                  [8, 9, 10],
                ],
                correctAnswer: "2",
                explanation: "Las filas van de izquierda a la derecha. Esta matriz tiene 2 filas.",
                hint: "Las filas son las líneas horizontales. Cuenta desde arriba hacia abajo.",
                definition: "Las filas son las líneas horizontales en una matriz. En [[5,6,7],[8,9,10]], hay 2 filas.",
              },
              zh: {
                question: "这个矩阵有多少行？",
                matrix: [
                  [5, 6, 7],
                  [8, 9, 10],
                ],
                correctAnswer: "2",
                explanation: "行从左到右。这个矩阵有2行。",
                hint: "行是水平线。从上到下计数。",
                definition: "行是矩阵中的水平线。在[[5,6,7],[8,9,10]]中，有2行。",
              },
              hi: {
                question: "इस मैट्रिक्स में कितने पंक्तियाँ हैं?",
                matrix: [
                  [5, 6, 7],
                  [8, 9, 10],
                ],
                correctAnswer: "2",
                explanation: "पंक्तियाँ बाएं से दाएं जाती हैं। इस मैट्रिक्स में 2 पंक्तियाँ हैं।",
                hint: "पंक्तियाँ ऊर्ध्वाधर रेखाएँ हैं। ऊपर से नीचे गिनें।",
                definition: "पंक्तियाँ एक मैट्रिक्स में ऊर्ध्वाधर रेखाएँ हैं。 [[5,6,7],[8,9,10]] में 2 पंक्तियाँ हैं।",
              },
              ar: {
                question: "كم عدد الصفوف في هذه المصفوفة؟",
                matrix: [
                  [5, 6, 7],
                  [8, 9, 10],
                ],
                correctAnswer: "2",
                explanation: "الصفوف تذهب من اليسار إلى اليمين. هذه المصفوفة بها 2 صفوف.",
                hint: "الصفوف هي الخطوط الأفقية. قم بالعد من الأعلى إلى الأسفل.",
                definition: "الصفوف هي الخطوط الأفقية في المصفوفة. في [[5,6,7],[8,9,10]]، هناك 2 صفوف.",
              },
            },
          },
          {
            id: "q3",
            type: "input",
            question: "What is the number at row 1, column 1?",
            matrix: [
              [10, 20],
              [30, 40],
            ],
            correctAnswer: "10",
            explanation: "Row 1, Column 1 is the top-left number.",
            hint: "ابدأ من الزاوية العلوية اليسرى. الصف الأول هو الخط الأفقي الأول، العمود الأول هو العمود الأول الأفقي.",
            definition:
              "Row 1, Column 1 (also written as R1C1) refers to the element at the intersection of the first row and first column - the top-left position.",
            translations: {
              es: {
                question: "¿Cuál es el número en la fila 1, columna 1?",
                matrix: [
                  [10, 20],
                  [30, 40],
                ],
                correctAnswer: "10",
                explanation: "La fila 1, columna 1 es el número en la esquina superior izquierda.",
                hint: "Comienza en la esquina superior izquierda. La fila 1 es la primera línea horizontal, la columna 1 es la primera línea vertical.",
                definition:
                  "La fila 1, columna 1 (también escrita como R1C1) se refiere al elemento en la intersección de la primera fila y la primera columna - la posición superior izquierda.",
              },
              zh: {
                question: "第一行第一列的数字是什么？",
                matrix: [
                  [10, 20],
                  [30, 40],
                ],
                correctAnswer: "10",
                explanation: "第一行第一列是左上角的数字。",
                hint: "从左上角开始。第一行是第一个水平线，第一列是第一个垂直线。",
                definition: "第一行第一列（也写作R1C1）指的是第一行和第一列交叉处的元素——左上角位置。",
              },
              hi: {
                question: "पंक्ति 1, स्तंभ 1 का संख्या क्या है?",
                matrix: [
                  [10, 20],
                  [30, 40],
                ],
                correctAnswer: "10",
                explanation: "पंक्ति 1, स्तंभ 1 ऊपरी-बाएं की संख्या है।",
                hint: "ऊपरी-बाएं के कोने से शुरू करें। पंक्ति 1 पहली क्षैतिज रेखा है, स्तंभ 1 पहला ऊर्ध्वाधर स्तंभ है।",
                definition:
                  "पंक्ति 1, स्तंभ 1 (इसे भी R1C1 के रूप में लिखा जा सकता है) पहली पंक्ति और पहले स्तंभ के प्रतिच्छेदन बिंदु पर संख्या का संदर्भ देता है - ऊपरी-बाएं स्थान।",
              },
              ar: {
                question: "ما هو العنصر في الصف 1، العمود 1؟",
                matrix: [
                  [10, 20],
                  [30, 40],
                ],
                correctAnswer: "10",
                explanation: "الصف 1، العمود 1 هو العنصر في الزاوية العلوية اليسرى.",
                hint: "ابدأ من الزاوية العلوية اليسرى. الصف الأول هو الخط الأفقي الأول، العمود الأول هو العمود الأول الأفقي.",
                definition:
                  "الصف 1، العمود 1 (يُكتب أيضًا كـ R1C1) يشير إلى العنصر في نقطة التقاطع بين الصف الأول والعمود الأول - الزاوية العلوية اليسرى.",
              },
            },
          },
        ],
      },
      medium: {
        id: "l1-medium",
        difficulty: "Medium",
        passed: false,
        questions: [
          {
            id: "q4",
            type: "multiple-choice",
            question: "Identify the dimensions of [[1,0,1],[0,1,0]]",
            options: ["2x2", "2x3", "3x2"],
            correctAnswer: "2x3",
            explanation: "2 Rows, 3 Columns",
            hint: "Count horizontal lines for rows (2), then count elements in each row for columns (3).",
            definition:
              "Dimensions are written as rows × columns (m×n). This matrix has 2 rows and 3 columns, so it's 2×3.",
            translations: {
              es: {
                question: "Identifica las dimensiones de [[1,0,1],[0,1,0]]",
                options: ["2x2", "2x3", "3x2"],
                correctAnswer: "2x3",
                explanation: "2 Filas, 3 Columnas",
                hint: "Cuenta las líneas horizontales para las filas (2), luego cuenta los elementos en cada fila para las columnas (3).",
                definition:
                  "Las dimensiones se escriben como filas × columnas (m×n). Esta matriz tiene 2 filas y 3 columnas, por lo que es 2×3.",
              },
              zh: {
                question: "识别[[1,0,1],[0,1,0]]的维度",
                options: ["2x2", "2x3", "3x2"],
                correctAnswer: "2x3",
                explanation: "2行，3列",
                hint: "数水平线为行（2），然后数每行的元素为列（3）。",
                definition: "维度写为行 × 列 (m×n)。这个矩阵有2行和3列，所以是2×3。",
              },
              hi: {
                question: "[[1,0,1],[0,1,0]] के आयाम पहचानें",
                options: ["2x2", "2x3", "3x2"],
                correctAnswer: "2x3",
                explanation: "2 पंक्तियाँ, 3 स्तंभ",
                hint: "पंक्तियाँ की संख्या को गिनें (2), फिर प्रत्येक पंक्ति के तत्वों की संख्या को गिनें (3)।",
                definition:
                  "आयाम पंक्तियाँ × स्तंभ (m×n) के रूप में लिखे जाते हैं। इस मैट्रिक्स में 2 पंक्तियाँ और 3 स्तंभ हैं, इसलिए यह 2×3 है।",
              },
              ar: {
                question: "حدد الأبعاد لـ [[1,0,1],[0,1,0]]",
                options: ["2x2", "2x3", "3x2"],
                correctAnswer: "2x3",
                explanation: "2 صفوف، 3 أعمدة",
                hint: "عد الخطوط الأفقية للصفوف (2)، ثم عد العناصر في كل صف للعمود (3).",
                definition: "الأبعاد تُكتب كـ الصفوف × الأعمدة (m×n). هذه المصفوفة بها 2 صفوف و 3 أعمدة، لذا فهي 2×3.",
              },
            },
          },
          {
            id: "q5",
            type: "input",
            question: "What element is at R2, C2?",
            matrix: [
              [1, 0],
              [0, 1],
            ],
            correctAnswer: "1",
            explanation: "Row 2, Column 2 is the bottom right.",
            hint: "Go down to row 2 (bottom), then go right to column 2 (right side).",
            definition: "R2, C2 means Row 2, Column 2 - the element in the 2nd row and 2nd column position.",
            translations: {
              es: {
                question: "¿Cuál elemento está en R2, C2?",
                matrix: [
                  [1, 0],
                  [0, 1],
                ],
                correctAnswer: "1",
                explanation: "La fila 2, columna 2 es la parte inferior derecha.",
                hint: "Ve a la fila 2 (inferior), luego ve a la derecha para la columna 2 (lado derecho).",
                definition:
                  "R2, C2 significa fila 2, columna 2 - el elemento en la posición de la 2ª fila y la 2ª columna.",
              },
              zh: {
                question: "R2, C2的元素是什么？",
                matrix: [
                  [1, 0],
                  [0, 1],
                ],
                correctAnswer: "1",
                explanation: "第二行第二列是右下角。",
                hint: "向下到第二行（底部），然后向右到第二列（右侧）。",
                definition: "R2, C2意味着第二行第二列——结果矩阵中第二行第二列的元素。",
              },
              hi: {
                question: "R2, C2 पर कौन सा तत्व है?",
                matrix: [
                  [1, 0],
                  [0, 1],
                ],
                correctAnswer: "1",
                explanation: "पंक्ति 2, स्तंभ 2 नीचे-दाएं है।",
                hint: "पंक्ति 2 (नीचे) पर जाएं, फिर स्तंभ 2 (दाएं) पर जाएं।",
                definition:
                  "R2, C2 निर्धारित करता है - दूसरी पंक्ति और दूसरे स्तंभ का संदर्भ देता है - दूसरी पंक्ति और दूसरे स्तंभ का संदर्भ देता है।",
              },
              ar: {
                question: "ما العنصر في R2, C2؟",
                matrix: [
                  [1, 0],
                  [0, 1],
                ],
                correctAnswer: "1",
                explanation: "الصف 2، العمود 2 هو الجزء السفلي الأيمن.",
                hint: "انزل إلى الصف 2 (الأسفل)، ثم اتجه إلى اليمين للعمود 2 (الجانب الأيمن).",
                definition: "R2, C2 يعني الصف 2، العمود 2 - العنصر في موقع الصف الثاني والعمود الثاني.",
              },
            },
          },
          {
            id: "q6",
            type: "input",
            question: "How many total elements are in a 3×3 matrix?",
            correctAnswer: "9",
            explanation: "3 times 3 is 9.",
            hint: "Multiply the number of rows by the number of columns: 3 × 3 = ?",
            definition: "Total elements = rows × columns. A 3×3 matrix has 3×3 = 9 elements total.",
            translations: {
              es: {
                question: "¿Cuántos elementos hay en total en una matriz 3×3?",
                correctAnswer: "9",
                explanation: "3 veces 3 es 9.",
                hint: "Multiplica el número de filas por el número de columnas: 3 × 3 = ?",
                definition: "Elementos totales = filas × columnas. Una matriz 3×3 tiene 3×3 = 9 elementos en total.",
              },
              zh: {
                question: "一个3×3矩阵有多少个元素？",
                correctAnswer: "9",
                explanation: "3乘3等于9。",
                hint: "将行数乘以列数：3 × 3 = ?",
                definition: "总元素 = 行 × 列。一个3×3矩阵有3×3 = 9个元素。",
              },
              hi: {
                question: "3×3 मैट्रिक्स में कुल कितने तत्व हैं?",
                correctAnswer: "9",
                explanation: "3 गुना 3 बराबर 9 है।",
                hint: "पंक्तियों की संख्या को स्तंभों की संख्या से गुना करें: 3 × 3 = ?",
                definition: "कुल तत्व = पंक्तियाँ × स्तंभ। 3×3 मैट्रिक्स में 3×3 = 9 तत्व हैं।",
              },
              ar: {
                question: "كم عدد العناصر الكلي في مصفوفة 3×3؟",
                correctAnswer: "9",
                explanation: "3 ضرب 3 يساوي 9.",
                hint: "انقلِ عدد الصفوف بـ عدد الأعمدة: 3 × 3 = ?",
                definition: "العناصر الكلية = الصفوف × الأعمدة. مصفوفة 3×3 تحتوي على 3×3 = 9 عناصر بالكامل.",
              },
            },
          },
        ],
      },
      hard: {
        id: "l1-hard",
        difficulty: "Hard",
        passed: false,
        questions: [
          {
            id: "q7",
            type: "multiple-choice",
            question: "Is [[1,2],[3,4]] a square matrix?",
            matrix: [
              [1, 2],
              [3, 4],
            ],
            options: ["Yes", "No"],
            correctAnswer: "Yes",
            explanation: "A square matrix has equal rows and columns. This is 2×2.",
            hint: "Square matrices have the same number of rows as columns. Count both and compare.",
            definition:
              "A square matrix is one where the number of rows equals the number of columns (m=n). Examples: 2×2, 3×3, 4×4.",
            translations: {
              es: {
                question: "¿Es [[1,2],[3,4]] una matriz cuadrada?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                options: ["Sí", "No"],
                correctAnswer: "Sí",
                explanation: "Una matriz cuadrada tiene el mismo número de filas y columnas. Esto es 2×2.",
                hint: "Las matrices cuadradas tienen el mismo número de filas que columnas. Cuenta ambos y compáralos.",
                definition:
                  "Una matriz cuadrada es aquella donde el número de filas es igual al número de columnas (m=n). Ejemplos: 2×2, 3×3, 4×4.",
              },
              zh: {
                question: "[[1,2],[3,4]] 是方阵吗？",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                options: ["是", "否"],
                correctAnswer: "是",
                explanation: "方阵的行数和列数相等。这是一个2×2矩阵。",
                hint: "方阵的行数和列数相等。数一数并比较。",
                definition: "方阵是指行数等于列数的矩阵（m=n）。例如：2×2，3×3，4×4。",
              },
              hi: {
                question: "[[1,2],[3,4]] एक वर्ग आव्यूह है कि नहीं?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                options: ["हां", "नहीं"],
                correctAnswer: "हां",
                explanation: "वर्ग आव्यूह की पंक्तियाँ और स्तंभ समान होती हैं। यह 2×2 आव्यूह है।",
                hint: "वर्ग आव्यूह की पंक्तियाँ और स्तंभ समान होती हैं। दोनों की संख्या को गिनें और तुलना करें।",
                definition: "वर्ग आव्यूह वह है जहाँ पंक्तियों की संख्या स्तंभों की समान होती है (m=n)। उदाहरण: 2×2, 3×3, 4×4।",
              },
              ar: {
                question: "هل [[1,2],[3,4]] مصفوفة مربعة؟",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                options: ["نعم", "لا"],
                correctAnswer: "نعم",
                explanation: "مصفوفة مربعة لها نفس عدد الصفوف والأعمدة. هذا هو 2×2.",
                hint: "المصفوفات المربعة لها نفس عدد الصفوف والأعمدة. قم بالعد لكلاهما ثم قارن.",
                definition: "مصفوفة مربعة هي تلك التي عدد الصفوف يساوي عدد الأعمدة (m=n). أمثلة: 2×2، 3×3، 4×4.",
              },
            },
          },
          {
            id: "q8",
            type: "input",
            question: "What is the trace (sum of diagonal)?",
            matrix: [
              [2, 0],
              [0, 3],
            ],
            correctAnswer: "5",
            explanation: "2 + 3 = 5",
            hint: "Trace is the sum of the diagonal elements. Start top-left, go to bottom-right: 2 + 3.",
            definition:
              "The trace of a square matrix is the sum of its diagonal elements (from top-left to bottom-right). For [[2,0],[0,3]], trace = 2 + 3 = 5.",
            translations: {
              es: {
                question: "¿Cuál es el rastro (suma de la diagonal)?",
                matrix: [
                  [2, 0],
                  [0, 3],
                ],
                correctAnswer: "5",
                explanation: "2 + 3 = 5",
                hint: "El rastro es la suma de los elementos de la diagonal. Comienza en la esquina superior izquierda, ve hasta la esquina inferior derecha: 2 + 3.",
                definition:
                  "El rastro de una matriz cuadrada es la suma de sus elementos diagonales (desde la esquina superior izquierda hasta la esquina inferior derecha). Para [[2,0],[0,3]], el rastro = 2 + 3 = 5.",
              },
              zh: {
                question: "迹（对角线之和）是什么？",
                matrix: [
                  [2, 0],
                  [0, 3],
                ],
                correctAnswer: "5",
                explanation: "2 + 3 = 5",
                hint: "迹是对角线元素之和。从左上角开始，到右下角：2 + 3。",
                definition: "方阵的迹是对角线元素之和（从左上角到右下角）。对于[[2,0],[0,3]]，迹 = 2 + 3 = 5。",
              },
              hi: {
                question: "सारणिक क्या है (विकर्ण का योग)?",
                matrix: [
                  [2, 0],
                  [0, 3],
                ],
                correctAnswer: "5",
                explanation: "2 + 3 = 5",
                hint: "सारणिक विकर्ण के तत्वों का योग है। ऊपरी-बाएं से शुरू करें, नीचे-दाएं तक जाएं: 2 + 3।",
                definition:
                  "वर्ग आव्यूह का सारणिक विकर्ण के तत्वों का योग है (ऊपरी-बाएं से नीचे-दाएं तक)। [[2,0],[0,3]] के लिए, सारणिक = 2 + 3 = 5।",
              },
              ar: {
                question: "ما هو المحدد (مجموع القطر الرئيسي)?",
                matrix: [
                  [2, 0],
                  [0, 3],
                ],
                correctAnswer: "5",
                explanation: "2 + 3 = 5",
                hint: "المحدد هو مجموع عناصر القطر الرئيسي. ابدأ في الزاوية العلوية اليسرى، انتقل إلى الزاوية السفلي الأيمن: 2 + 3.",
                definition:
                  "المحدد لـ مصفوفة مربعة هو مجموع عناصر القطر الرئيسي (من الزاوية العلوية اليسرى إلى الزاوية السفلي الأيمن). لـ [[2,0],[0,3]]، المحدد = 2 + 3 = 5.",
              },
            },
          },
          {
            id: "q9",
            type: "input",
            question: "What element is at R1, C3?",
            matrix: [
              [1, 2, 5],
              [3, 4, 6],
            ],
            correctAnswer: "5",
            explanation: "Top right number in the first row.",
            hint: "Row 1 is the top row. Column 3 is the rightmost column. Find where they intersect.",
            definition: "R1, C3 means Row 1, Column 3 - the element in the first row and third column position.",
            translations: {
              es: {
                question: "¿Cuál elemento está en R1, C3?",
                matrix: [
                  [1, 2, 5],
                  [3, 4, 6],
                ],
                correctAnswer: "5",
                explanation: "Número en la parte superior derecha de la primera fila.",
                hint: "La fila 1 es la fila superior. La columna 3 es la columna más a la derecha. Encuentra dónde se cruzan.",
                definition:
                  "R1, C3 significa fila 1, columna 3 - el elemento en la posición de la primera fila y la tercera columna.",
              },
              zh: {
                question: "R1, C3的元素是什么？",
                matrix: [
                  [1, 2, 5],
                  [3, 4, 6],
                ],
                correctAnswer: "5",
                explanation: "第一行的右上角数字。",
                hint: "第一行是最上面的行。第三列是最右边的列。找到它们相交的地方。",
                definition: "R1, C3意味着第一行第三列——结果矩阵中第一行第三列的元素。",
              },
              hi: {
                question: "R1, C3 पर कौन सा तत्व है?",
                matrix: [
                  [1, 2, 5],
                  [3, 4, 6],
                ],
                correctAnswer: "5",
                explanation: "पहली पंक्ति के ऊपरी-दाएं तत्व।",
                hint: "पंक्ति 1 ऊपरी पंक्ति है। स्तंभ 3 सबसे दाएं स्तंभ है। उनके प्रतिच्छेदन बिंदु पर जाएं।",
                definition:
                  "R1, C3 निर्धारित करता है - पहली पंक्ति और तीसरे स्तंभ का संदर्भ देता है - पहली पंक्ति और तीसरे स्तंभ का संदर्भ देता है।",
              },
              ar: {
                question: "ما العنصر في R1, C3؟",
                matrix: [
                  [1, 2, 5],
                  [3, 4, 6],
                ],
                correctAnswer: "5",
                explanation: "الرقم في الجزء العلوي الأيمن من الصف الأول.",
                hint: "الصف الأول هو الصف الأعلى. العمود الثالث هو العمود الأيمن الأكثر. ابحث عن نقطة التقاطع.",
                definition: "R1, C3 يعني الصف الأول، العمود الثالث - العنصر في موقع الصف الأول والعمود الثالث.",
              },
            },
          },
        ],
      },
    },
  },
  {
    id: 2,
    name: "Matrix Operations",
    description: "Adding and subtracting matrices!",
    locked: false,
    translations: {
      es: {
        name: "Operaciones de Matrices",
        description: "¡Sumando y restando matrices!",
      },
      zh: {
        name: "矩阵运算",
        description: "矩阵加减法！",
      },
      hi: {
        name: "मैट्रिक्स के ऑपरेशन",
        description: "मैट्रिक्स के जोड़ और घटाव！",
      },
      ar: {
        name: "عمليات المصفوفة",
        description: "جمع وطرح المصفوفات!",
      },
    },
    subLevels: {
      easy: {
        id: "l2-easy",
        difficulty: "Easy",
        passed: false,
        questions: [
          {
            id: "q10",
            type: "multiple-choice",
            question: "Can you add these matrices [[1,2],[3,4]] + [[5,6],[7,8]]?",
            matrix: [
              [1, 2],
              [3, 4],
            ],
            additionalMatrix: [
              [5, 6],
              [7, 8],
            ],
            options: ["Yes", "No"],
            correctAnswer: "Yes",
            explanation: "Both matrices are 2×2, so they can be added.",
            hint: "To add matrices, they must have the same dimensions.",
            definition:
              "Matrix addition requires both matrices to have the same dimensions (same number of rows and columns).",
            translations: {
              es: {
                question: "¿Puedes sumar estas matrices [[1,2],[3,4]] + [[5,6],[7,8]]?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                options: ["Sí", "No"],
                correctAnswer: "Sí",
                explanation: "Ambas matrices son 2×2, por lo que se pueden sumar.",
                hint: "Para sumar matrices, deben tener las mismas dimensiones.",
                definition:
                  "La suma de matrices requiere que ambas matrices tengan las mismas dimensiones (mismo número de filas y columnas).",
              },
              zh: {
                question: "你能将这些矩阵相加 [[1,2],[3,4]] + [[5,6],[7,8]] 吗？",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                options: ["是", "否"],
                correctAnswer: "是",
                explanation: "两个矩阵都是2×2，所以可以相加。",
                hint: "要相加矩阵，它们必须具有相同的维度。",
                definition: "矩阵加法要求两个矩阵具有相同的维度（相同的行数和列数）。",
              },
              hi: {
                question: "क्या आप इन मैट्रिक्स को जोड़ सकते हैं [[1,2],[3,4]] + [[5,6],[7,8]]?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                options: ["हां", "नहीं"],
                correctAnswer: "हां",
                explanation: " दोनों मैट्रिक्स 2×2 हैं, इसलिए उन्हें जोड़ा जा सकता है।",
                hint: "मैट्रिक्स को जोड़ने के लिए, उनके आयाम समान होने चाहिए।",
                definition: "मैट्रिक्स जोड़ने के लिए, दोनों मैट्रिक्स के आयाम समान होने चाहिए (पंक्तियों और स्तंभों की समान संख्या)।",
              },
              ar: {
                question: "هل يمكنك جمع هذه المصفوفات [[1,2],[3,4]] + [[5,6],[7,8]]؟",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                options: ["نعم", "لا"],
                correctAnswer: "نعم",
                explanation: "كلاً من المصفوفتين هما 2×2، لذا يمكن جمعهما.",
                hint: "لجمع المصفوفات، يجب أن يكون لديها نفس الأبعاد.",
                definition: "جمع المصفوفات يتطلب أن تكون المصفوفتين بنفس الأبعاد (عدد الصفوف والعمود متساوٍ).",
              },
            },
          },
          {
            id: "q11",
            type: "input",
            question: "Add the matrices: [[1,2],[3,4]] + [[5,6],[7,8]]. What is the top-left element of the result?",
            matrix: [
              [1, 2],
              [3, 4],
            ],
            additionalMatrix: [
              [5, 6],
              [7, 8],
            ],
            correctAnswer: "6",
            explanation:
              "When adding matrices, add corresponding elements. 1 (from first matrix) + 5 (from second matrix) = 6",
            hint: "Look at the top-left position in both matrices: 1 + 5 = ?",
            definition:
              "Matrix addition means adding each element in position (i,j) of matrix A to the element in position (i,j) of matrix B.",
            translations: {
              es: {
                question:
                  "Suma las matrices: [[1,2],[3,4]] + [[5,6],[7,8]]. ¿Cuál es el elemento superior izquierdo del resultado?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                correctAnswer: "6",
                explanation:
                  "Al sumar matrices, suma los elementos correspondientes. 1 (de la primera matriz) + 5 (de la segunda matriz) = 6",
                hint: "Mira la posición superior izquierda en ambas matrices: 1 + 5 = ?",
                definition:
                  "La suma de matrices significa sumar cada elemento en la posición (i,j) de la matriz A al elemento en la misma posición (i,j) de la matriz B.",
              },
              zh: {
                question: "将矩阵相加：[[1,2],[3,4]] + [[5,6],[7,8]]。结果的左上角元素是什么？",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                correctAnswer: "6",
                explanation: "在相加矩阵时，相加对应元素。1（来自第一个矩阵）+ 5（来自第二个矩阵）= 6",
                hint: "查看两个矩阵的左上角位置：1 + 5 = ?",
                definition: "矩阵加法意味着将矩阵A中位置(i,j)的每个元素加到矩阵B中相同位置(i,j)的元素上。",
              },
              hi: {
                question: "मैट्रिक्स जोड़ें: [[1,2],[3,4]] + [[5,6],[7,8]]। परिणाम के ऊपरी-बाएं तत्व क्या है?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                correctAnswer: "6",
                explanation:
                  "मैट्रिक्स को जोड़ना तारीखा का अर्थ है कि आव्यूह A में प्रत्येक तत्व को आव्यूह B में समान स्थान पर संगत तत्व को जोड़ा जाता है।",
                hint: "दोनों मैट्रिक्स के ऊपरी-बाएं के स्थान पर देखें: 1 + 5 = ?",
                definition:
                  "मैट्रिक्स जोड़ का अर्थ है आव्यूह A में स्थिति (i,j) में प्रत्येक तत्व को आव्यूह B में समान स्थिति (i,j) में तत्व में जोड़ना।",
              },
              ar: {
                question:
                  "قم بإضافة المصفوفات: [[1,2],[3,4]] + [[5,6],[7,8]]. ما هو العنصر في الزاوية العلوية اليسرى للنتيجة؟",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                correctAnswer: "6",
                explanation:
                  "عند جمع المصفوفات، أضف العناصر المتناظرة. 1 (من المصفوفة الأولى) + 5 (من المصفوفة الثانية) = 6",
                hint: "انظر إلى الزاوية العلوية اليسرى في كلا المصفوفتين: 1 + 5 = ?",
                definition:
                  "جمع المصفوفات يعني إضافة كل عنصر في الموضع (i,j) من المصفوفة A إلى العنصر في الموضع نفسه (i,j) من المصفوفة B.",
              },
            },
          },
          {
            id: "q12",
            type: "input",
            question:
              "Subtract the matrices: [[10,20],[30,40]] - [[2,5],[7,8]]. What is the bottom-left element of the result?",
            matrix: [
              [10, 20],
              [30, 40],
            ],
            additionalMatrix: [
              [2, 5],
              [7, 8],
            ],
            correctAnswer: "23",
            explanation: "30 - 7 = 23. When subtracting matrices, subtract corresponding elements.",
            hint: "Look at the bottom-left position in both matrices: 30 - 7 = ?",
            definition: "Each element is subtracted from its corresponding element in the other matrix.",
            translations: {
              es: {
                question:
                  "Resta las matrices: [[10,20],[30,40]] - [[2,5],[7,8]]. ¿Cuál es el elemento inferior izquierdo del resultado?",
                matrix: [
                  [10, 20],
                  [30, 40],
                ],
                additionalMatrix: [
                  [2, 5],
                  [7, 8],
                ],
                correctAnswer: "23",
                explanation: "30 - 7 = 23. Al restar matrices, resta los elementos correspondientes.",
                hint: "Mira la posición inferior izquierda en ambas matrices: 30 - 7 = ?",
                definition: "Cada elemento se resta de su elemento correspondiente en la otra matriz.",
              },
              zh: {
                question: "将矩阵相减：[[10,20],[30,40]] - [[2,5],[7,8]]。结果的左下角元素是什么？",
                matrix: [
                  [10, 20],
                  [30, 40],
                ],
                additionalMatrix: [
                  [2, 5],
                  [7, 8],
                ],
                correctAnswer: "23",
                explanation: "30 - 7 = 23。在相减矩阵时，相减对应元素。",
                hint: "查看两个矩阵的左下角位置：30 - 7 = ?",
                definition: "每个元素从其在另一个矩阵中的对应元素中减去。",
              },
              hi: {
                question: "मैट्रिक्स घटाएं: [[10,20],[30,40]] - [[2,5],[7,8]]। परिणाम के नीचे-बाएं तत्व क्या है?",
                matrix: [
                  [10, 20],
                  [30, 40],
                ],
                additionalMatrix: [
                  [2, 5],
                  [7, 8],
                ],
                correctAnswer: "23",
                explanation: "30 - 7 = 23। मैट्रिक्स को घटाते समय, संगत तत्वों को घटाया जाता है।",
                hint: "दोनों मैट्रिक्स के नीचे-बाएं के स्थान पर देखें: 30 - 7 = ?",
                definition: "अन्य मैट्रिक्स में संगत तत्वों से प्रत्येक तत्व को घटाया जाता है।",
              },
              ar: {
                question:
                  "طرح المصفوفات: [[10,20],[30,40]] - [[2,5],[7,8]]. ما هو العنصر في الزاوية السفلي الأيسر للنتيجة؟",
                matrix: [
                  [10, 20],
                  [30, 40],
                ],
                additionalMatrix: [
                  [2, 5],
                  [7, 8],
                ],
                correctAnswer: "23",
                explanation: "30 - 7 = 23. عند طرح المصفوفات، طرح العناصر المتناظرة.",
                hint: "انظر إلى الزاوية السفلي الأيسر في كلا المصفوفتين: 30 - 7 = ?",
                definition: "طرح كل عنصر من عنصره المتناظر في المصفوفة الأخرى.",
              },
            },
          },
        ],
      },
      medium: {
        id: "l2-medium",
        difficulty: "Medium",
        passed: false,
        questions: [
          {
            id: "q13",
            type: "multiple-choice",
            question: "What is the result of [[1,2],[3,4]] + [[5,6],[7,8]]?",
            matrix: [
              [1, 2],
              [3, 4],
            ],
            additionalMatrix: [
              [5, 6],
              [7, 8],
            ],
            options: ["[[6,8],[10,12]]", "[[6,9],[10,13]]", "[[5,6],[7,8]]", "[[1,2],[3,4]]"],
            correctAnswer: "[[6,8],[10,12]]",
            explanation: "[1+5, 2+6, 3+7, 4+8] = [6, 8, 10, 12] arranged as [[6,8],[10,12]]",
            hint: "Add each element in the same position: top-left + top-left, etc.",
            definition:
              "Matrix addition is performed element-wise: each element of the result is the sum of the corresponding elements from the input matrices.",
            translations: {
              es: {
                question: "¿Cuál es el resultado de [[1,2],[3,4]] + [[5,6],[7,8]]?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                options: ["[[6,8],[10,12]]", "[[6,9],[10,13]]", "[[5,6],[7,8]]", "[[1,2],[3,4]]"],
                correctAnswer: "[[6,8],[10,12]]",
                explanation: "[1+5, 2+6, 3+7, 4+8] = [6, 8, 10, 12] organizado como [[6,8],[10,12]]",
                hint: "Suma cada elemento en la misma posición: superior izquierdo + superior izquierdo, etc.",
                definition:
                  "La suma de matrices se realiza elemento por elemento: cada elemento del resultado es la suma de los elementos correspondientes de las matrices de entrada.",
              },
              zh: {
                question: "[[1,2],[3,4]] + [[5,6],[7,8]] 的结果是什么？",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                options: ["[[6,8],[10,12]]", "[[6,9],[10,13]]", "[[5,6],[7,8]]", "[[1,2],[3,4]]"],
                correctAnswer: "[[6,8],[10,12]]",
                explanation: "[1+5, 2+6, 3+7, 4+8] = [6, 8, 10, 12] 排列成 [[6,8],[10,12]]",
                hint: "在同一位置相加每个元素：左上角 + 左上角，等等。",
                definition: "矩阵加法是逐元素进行的：结果中的每个元素是输入矩阵中相应元素的和。",
              },
              hi: {
                question: "[[1,2],[3,4]] + [[5,6],[7,8]] का परिणाम क्या है?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                options: ["[[6,8],[10,12]]", "[[6,9],[10,13]]", "[[5,6],[7,8]]", "[[1,2],[3,4]]"],
                correctAnswer: "[[6,8],[10,12]]",
                explanation: "[1+5, 2+6, 3+7, 4+8] = [6, 8, 10, 12] इस प्रकार व्यवस्थित किया जाता है [[6,8],[10,12]]",
                hint: "हर स्थान पर संगत तत्वों को जोड़ें: ऊपरी-बाएं + ऊपरी-बाएं, इत्यादि।",
                definition: "मैट्रिक्स जोड़ना तारीखा का अर्थ है कि परिणाम का प्रत्येक तत्व इनपुट मैट्रिक्स में संगत तत्वों का योग है।",
              },
              ar: {
                question: "ما هو النتيجة من [[1,2],[3,4]] + [[5,6],[7,8]]؟",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [5, 6],
                  [7, 8],
                ],
                options: ["[[6,8],[10,12]]", "[[6,9],[10,13]]", "[[5,6],[7,8]]", "[[1,2],[3,4]]"],
                correctAnswer: "[[6,8],[10,12]]",
                explanation: "[1+5, 2+6, 3+7, 4+8] = [6, 8, 10, 12] مُرتبة كـ [[6,8],[10,12]]",
                hint: "أضف كل عنصر في المكان نفسه: العنصر الأعلى الأيسر + العنصر الأعلى الأيسر، إلخ.",
                definition:
                  "جمع المصفوفات يتم عنصرًا بعنصر: كل عنصر في النتيجة هو مجموع العناصر المتناظرة من المصفوفات المُدخلة.",
              },
            },
          },
          {
            id: "q14m",
            type: "input",
            question: "Subtract: [[20,30],[40,50]] - [[5,10],[15,20]]. What is the top-right element?",
            matrix: [
              [20, 30],
              [40, 50],
            ],
            additionalMatrix: [
              [5, 10],
              [15, 20],
            ],
            correctAnswer: "20",
            explanation: "30 - 10 = 20. When subtracting matrices, subtract corresponding elements.",
            hint: "Top-right element: 30 - 10 = ?",
            definition: "Matrix subtraction is element-wise: result[i][j] = A[i][j] - B[i][j]",
            translations: {
              es: {
                question: "Resta: [[20,30],[40,50]] - [[5,10],[15,20]]. ¿Cuál es el elemento superior derecho?",
                matrix: [
                  [20, 30],
                  [40, 50],
                ],
                additionalMatrix: [
                  [5, 10],
                  [15, 20],
                ],
                correctAnswer: "20",
                explanation: "30 - 10 = 20. Al restar matrices, resta los elementos correspondientes.",
                hint: "Elemento superior derecho: 30 - 10 = ?",
                definition: "La resta de matrices es elemento por elemento: resultado[i][j] = A[i][j] - B[i][j]",
              },
              zh: {
                question: "相减：[[20,30],[40,50]] - [[5,10],[15,20]]。右上角元素是什么？",
                matrix: [
                  [20, 30],
                  [40, 50],
                ],
                additionalMatrix: [
                  [5, 10],
                  [15, 20],
                ],
                correctAnswer: "20",
                explanation: "30 - 10 = 20。当相减矩阵时，相减对应的元素。",
                hint: "右上角元素：30 - 10 = ？",
                definition: "矩阵减法是逐元素的：结果[i][j] = A[i][j] - B[i][j]",
              },
              hi: {
                question: "घटाएं: [[20,30],[40,50]] - [[5,10],[15,20]]। ऊपरी-दाएं तत्व क्या है?",
                matrix: [
                  [20, 30],
                  [40, 50],
                ],
                additionalMatrix: [
                  [5, 10],
                  [15, 20],
                ],
                correctAnswer: "20",
                explanation: "30 - 10 = 20। मैट्रिक्स को घटाते समय, संगत तत्वों को घटाया जाता है।",
                hint: "ऊपरी-दाएं तत्व: 30 - 10 = ?",
                definition: "मैट्रिक्स घटाव तारीखा का अर्थ है: परिणाम[i][j] = A[i][j] - B[i][j]",
              },
              ar: {
                question: "طرح: [[20,30],[40,50]] - [[5,10],[15,20]]. ما هو العنصر في الزاوية العلوية اليمنى؟",
                matrix: [
                  [20, 30],
                  [40, 50],
                ],
                additionalMatrix: [
                  [5, 10],
                  [15, 20],
                ],
                correctAnswer: "20",
                explanation: "30 - 10 = 20. عند طرح المصفوفات، طرح العناصر المتناظرة.",
                hint: "العنصر الأعلى الأيمن: 30 - 10 = ؟",
                definition: "طرح المصفوفات هو عنصر تلو العنصر: النتيجة[i][j] = A[i][j] - B[i][j]",
              },
            },
          },
          {
            id: "q15m",
            type: "input",
            question: "Add and subtract: ([[3,5],[7,9]] + [[1,2],[3,4]]) - [[2,3],[4,5]]. What is R2,C1?",
            matrix: [
              [3, 5],
              [7, 9],
            ],
            additionalMatrix: [
              [1, 2],
              [3, 4],
            ],
            correctAnswer: "6",
            explanation:
              "([[3,5],[7,9]] + [[1,2],[3,4]]) = [[4,7],[10,13]], then [[4,7],[10,13]] - [[2,3],[4,5]] = [[2,4],[6,8]]. R2,C1 = 6",
            hint: "First add: 7+3=10, 9+4=13. Then subtract: 10-4=6.",
            definition: "Matrix operations follow standard arithmetic: add and subtract element-wise in order.",
            translations: {
              es: {
                question: "Suma y resta: ([[3,5],[7,9]] + [[1,2],[3,4]]) - [[2,3],[4,5]]. ¿Cuál es R2,C1?",
                matrix: [
                  [3, 5],
                  [7, 9],
                ],
                additionalMatrix: [
                  [1, 2],
                  [3, 4],
                ],
                correctAnswer: "6",
                explanation:
                  "([[3,5],[7,9]] + [[1,2],[3,4]]) = [[4,7],[10,13]], luego [[4,7],[10,13]] - [[2,3],[4,5]] = [[2,4],[6,8]]. R2,C1 = 6",
                hint: "Primero suma: 7+3=10, 9+4=13. Luego resta: 10-4=6.",
                definition:
                  "Las operaciones de matrices siguen la aritmética estándar: sumar y restar elemento por elemento en orden.",
              },
              zh: {
                question: "加法和减法：([[3,5],[7,9]] + [[1,2],[3,4]]) - [[2,3],[4,5]]。R2,C1是什么？",
                matrix: [
                  [3, 5],
                  [7, 9],
                ],
                additionalMatrix: [
                  [1, 2],
                  [3, 4],
                ],
                correctAnswer: "6",
                explanation:
                  "([[3,5],[7,9]] + [[1,2],[3,4]]) = [[4,7],[10,13]]，然后 [[4,7],[10,13]] - [[2,3],[4,5]] = [[2,4],[6,8]]。R2,C1 = 6",
                hint: "先加：7+3=10，9+4=13。再减：10-4=6。",
                definition: "矩阵运算遵循标准算术：按顺序逐元素加法和减法。",
              },
              hi: {
                question: "जोड़ें और घटाएं: ([[3,5],[7,9]] + [[1,2],[3,4]]) - [[2,3],[4,5]]। R2,C1 क्या है?",
                matrix: [
                  [3, 5],
                  [7, 9],
                ],
                additionalMatrix: [
                  [1, 2],
                  [3, 4],
                ],
                correctAnswer: "6",
                explanation:
                  "([[3,5],[7,9]] + [[1,2],[3,4]]) = [[4,7],[10,13]]، फिर [[4,7],[10,13]] - [[2,3],[4,5]] = [[2,4],[6,8]]। R2,C1 = 6",
                hint: "पहले जोड़ें: 7+3=10, 9+4=13। फिर घटाएं: 10-4=6।",
                definition: "मैट्रिक्स संचालन मानक अंकगणित का पालन करते हैं: क्रम में तारीखा जोड़ें और घटाएं।",
              },
              ar: {
                question: "أضف واطرح: ([[3,5],[7,9]] + [[1,2],[3,4]]) - [[2,3],[4,5]]। ما هو R2,C1؟",
                matrix: [
                  [3, 5],
                  [7, 9],
                ],
                additionalMatrix: [
                  [1, 2],
                  [3, 4],
                ],
                correctAnswer: "6",
                explanation:
                  "([[3,5],[7,9]] + [[1,2],[3,4]]) = [[4,7],[10,13]]، ثم [[4,7],[10,13]] - [[2,3],[4,5]] = [[2,4],[6,8]]। R2,C1 = 6",
                hint: "أولاً الجمع: 7+3=10, 9+4=13، ثم الطرح: 10-4=6.",
                definition: "عمليات المصفوفة تتبع الحسابات القياسية: جمع وطرح عنصر تلو العنصر بالترتيب.",
              },
            },
          },
        ],
      },
      hard: {
        id: "l2-hard",
        difficulty: "Hard",
        passed: false,
        questions: [
          {
            id: "q22",
            type: "multiple-choice",
            question: "Can you add [[1,2,3],[4,5,6]] and [[7,8],[9,10]]?",
            options: ["Yes", "No"],
            correctAnswer: "No",
            explanation:
              "No, the dimensions are different. First matrix is 2×3, second is 2×2. Dimensions must match for addition.",
            hint: "For matrix addition, both matrices must have the same number of rows AND the same number of columns.",
            definition:
              "Matrix addition requires both matrices to have identical dimensions. A 2×3 matrix cannot be added to a 2×2 matrix.",
            translations: {
              es: {
                question: "¿Puedes sumar [[1,2,3],[4,5,6]] y [[7,8],[9,10]]?",
                options: ["Sí", "No"],
                correctAnswer: "No",
                explanation:
                  "No, las dimensiones son diferentes. Primera matriz es 2×3, segunda es 2×2. Las dimensiones deben coincidir para la suma.",
                hint: "Para la suma de matrices, ambas matrices deben tener el mismo número de filas Y el mismo número de columnas.",
                definition:
                  "La suma de matrices requiere que ambas matrices tengan dimensiones idénticas. Una matriz 2×3 no se puede sumar a una matriz 2×2.",
              },
              zh: {
                question: "你能将[[1,2,3],[4,5,6]]和[[7,8],[9,10]]相加吗？",
                options: ["是", "否"],
                correctAnswer: "否",
                explanation: "不能，维度不同。第一个矩阵是2×3，第二个是2×2。相加时维度必须匹配。",
                hint: "对于矩阵加法，两个矩阵必须具有相同的行数和相同的列数。",
                definition: "矩阵加法要求两个矩阵具有相同的维度。2×3矩阵不能加到2×2矩阵。",
              },
              hi: {
                question: "क्या आप [[1,2,3],[4,5,6]] और [[7,8],[9,10]] को जोड़ सकते हैं?",
                options: ["हां", "नहीं"],
                correctAnswer: "नहीं",
                explanation: "नहीं, आयाम अलग हैं। पहली मैट्रिक्स 2×3 है, दूसरी 2×2 है। जोड़ने के लिए आयाम समान होने चाहिए।",
                hint: "मैट्रिक्स जोड़ के लिए, दोनों मैट्रिक्स में पंक्तियों की समान संख्या और स्तंभों की समान संख्या होनी चाहिए।",
                definition:
                  "मैट्रिक्स जोड़ने के लिए दोनों मैट्रिक्स के आयाम समान होने चाहिए। 2×3 मैट्रिक्स को 2×2 मैट्रिक्स में नहीं जोड़ा जा सकता।",
              },
              ar: {
                question: "هل يمكنك إضافة [[1,2,3],[4,5,6]] و [[7,8],[9,10]]؟",
                options: ["نعم", "لا"],
                correctAnswer: "لا",
                explanation: "لا، الأبعاد مختلفة. المصفوفة الأولى هي 2×3، الثانية هي 2×2. يجب أن تتطابق الأبعاد للجمع.",
                hint: "لجمع المصفوفات، يجب أن يكون لكلا المصفوفتين نفس عدد الصفوف وعدد الأعمدة.",
                definition:
                  "يتطلب جمع المصفوفات أن تكون لكلا المصفوفتين أبعاد متطابقة. لا يمكن إضافة مصفوفة 2×3 إلى مصفوفة 2×2.",
              },
            },
          },
          {
            id: "q23",
            type: "input",
            question: "Calculate: 2([[1,2],[3,4]]) + [[2,4],[6,8]]. What is the bottom-right element?",
            matrix: [
              [1, 2],
              [3, 4],
            ],
            additionalMatrix: [
              [2, 4],
              [6, 8],
            ],
            correctAnswer: "16",
            explanation:
              "2[[1,2],[3,4]] = [[2,4],[6,8]], then [[2,4],[6,8]] + [[2,4],[6,8]] = [[4,8],[12,16]]. Bottom-right = 16",
            hint: "First scalar multiply: 4 × 2 = 8, then add: 8 + 8 = 16.",
            definition:
              "Combine scalar multiplication with matrix addition: first multiply by scalar, then add matrices.",
            translations: {
              es: {
                question: "Calcula: 2([[1,2],[3,4]]) + [[2,4],[6,8]]. ¿Cuál es el elemento inferior derecho?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [2, 4],
                  [6, 8],
                ],
                correctAnswer: "16",
                explanation:
                  "2[[1,2],[3,4]] = [[2,4],[6,8]], luego [[2,4],[6,8]] + [[2,4],[6,8]] = [[4,8],[12,16]]. Inferior derecho = 16",
                hint: "Primero multiplicación escalar: 4 × 2 = 8, luego suma: 8 + 8 = 16.",
                definition:
                  "Combina multiplicación escalar con suma de matrices: primero multiplica por escalar, luego suma matrices.",
              },
              zh: {
                question: "计算：2([[1,2],[3,4]]) + [[2,4],[6,8]]。右下角元素是什么？",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [2, 4],
                  [6, 8],
                ],
                correctAnswer: "16",
                explanation:
                  "2[[1,2],[3,4]] = [[2,4],[6,8]]，然后 [[2,4],[6,8]] + [[2,4],[6,8]] = [[4,8],[12,16]]。 右下角 = 16",
                hint: "首先标量乘法：4 × 2 = 8，然后相加：8 + 8 = 16。",
                definition: "将标量乘法与矩阵加法结合：首先乘以标量，然后相加矩阵。",
              },
              hi: {
                question: " गणना करें: 2([[1,2],[3,4]]) + [[2,4],[6,8]]। नीचे-दाएं तत्व क्या है?",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [2, 4],
                  [6, 8],
                ],
                correctAnswer: "16",
                explanation:
                  "2[[1,2],[3,4]] = [[2,4],[6,8]]، फिर [[2,4],[6,8]] + [[2,4],[6,8]] = [[4,8],[12,16]]। नीचे-दाएं = 16",
                hint: "पहले स्केलर गुणा: 4 × 2 = 8, फिर जोड़ें: 8 + 8 = 16।",
                definition: "स्केलर गुणा को मैट्रिक्स जोड़ के साथ मिलाएं: पहले स्केलर से गुणा करें, फिर मैट्रिक्स को जोड़ें।",
              },
              ar: {
                question: "احسب: 2([[1,2],[3,4]]) + [[2,4],[6,8]]. ما هو العنصر في الزاوية السفلي الأيمن؟",
                matrix: [
                  [1, 2],
                  [3, 4],
                ],
                additionalMatrix: [
                  [2, 4],
                  [6, 8],
                ],
                correctAnswer: "16",
                explanation:
                  "2[[1,2],[3,4]] = [[2,4],[6,8]]، ثم [[2,4],[6,8]] + [[2,4],[6,8]] = [[4,8],[12,16]]. السفلي الأيمن = 16",
                hint: "أولاً الضرب بعددية: 4 × 2 = 8، ثم الجمع: 8 + 8 = 16.",
                definition: "جمع الضرب بعددية مع جمع المصفوفات: أولاً اضرب بعددية، ثم أضف المصفوفات.",
              },
            },
          },
          {
            id: "q24",
            type: "input",
            question: "Solve: 3A - [[6,9],[12,15]] = [[3,6],[9,12]]. Find element A[2][2].",
            correctAnswer: "9",
            explanation: "3A = [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]. A = [[3,5],[7,9]]. A[2][2] = 9",
            hint: "Add the matrices first, then divide by 3. [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]. Then 27 ÷ 3 = 9.",
            definition:
              "To solve matrix equations: isolate the matrix term, perform operations, then solve for the matrix.",
            translations: {
              es: {
                question: "Resuelve: 3A - [[6,9],[12,15]] = [[3,6],[9,12]]. Encuentra elemento A[2][2].",
                correctAnswer: "9",
                explanation: "3A = [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]. A = [[3,5],[7,9]]. A[2][2] = 9",
                hint: "Suma las matrices primero, luego divide por 3. [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]. Luego 27 ÷ 3 = 9.",
                definition:
                  "Para resolver ecuaciones matriciales: aisla el término matricial, realiza operaciones, luego resuelve la matriz.",
              },
              zh: {
                question: "解：3A - [[6,9],[12,15]] = [[3,6],[9,12]]。找到元素 A[2][2]。",
                correctAnswer: "9",
                explanation:
                  "3A = [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]。 A = [[3,5],[7,9]]。 A[2][2] = 9",
                hint: "先将矩阵相加，再除以3。 [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]。 然后 27 ÷ 3 = 9。",
                definition: "要解矩阵方程：隔离矩阵项，执行运算，然后求解矩阵。",
              },
              hi: {
                question: "हल करें: 3A - [[6,9],[12,15]] = [[3,6],[9,12]]। तत्व A[2][2] खोजें।",
                correctAnswer: "9",
                explanation: "3A = [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]। A = [[3,5],[7,9]]। A[2][2] = 9",
                hint: "पहले मैट्रिक्स जोड़ें, फिर 3 से विभाजित करें। [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]। फिर 27 ÷ 3 = 9।",
                definition: "मैट्रिक्स समीकरणों को हल करने के लिए: मैट्रिक्स शब्द को अलग करें, संचालन करें, फिर मैट्रिक्स के लिए हल करें।",
              },
              ar: {
                question: "حل: 3A - [[6,9],[12,15]] = [[3,6],[9,12]]. أوجد العنصر A[2][2].",
                correctAnswer: "9",
                explanation: "3A = [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]. A = [[3,5],[7,9]]. A[2][2] = 9",
                hint: "أضف المصفوفات أولاً، ثم اقسم على 3. [[3,6],[9,12]] + [[6,9],[12,15]] = [[9,15],[21,27]]. ثم 27 ÷ 3 = 9.",
                definition: "لحل معادلات المصفوفات: عزل الحد المصفوفة، تنفيذ العمليات، ثم حل المصفوفة.",
              },
            },
          },
        ],
      },
    },
  },
  {
    id: 3,
    name: "Matrix Master",
    description: "Advanced matrix operations and transformations!",
    locked: false,
    translations: {
      es: {
        name: "Maestro de Matrices",
        description: "¡Operaciones y transformaciones de matrices avanzadas!",
      },
      zh: {
        name: "矩阵大师",
        description: "高级矩阵操作和转换！",
      },
      hi: {
        name: "मैट्रिक्स मास्टर",
        description: "उन्नत मैट्रिक्स संचालन और परिवर्तन!",
      },
      ar: {
        name: "ماستر المصفوفات",
        description: "عمليات وتحويلات المصفوفات المتقدمة!",
      },
    },
    subLevels: {
      easy: {
        id: "l3-easy",
        difficulty: "Easy",
        passed: false,
        questions: [
          {
            id: "q14",
            type: "input",
            question: "Multiply the matrix [[2,3],[4,5]] by scalar 3. What is the top-left element?",
            matrix: [
              [2, 3],
              [4, 5],
            ],
            correctAnswer: "6",
            explanation: "2 × 3 = 6. When multiplying by a scalar, multiply each element.",
            hint: "Scalar multiplication: multiply every element by 3. Top-left is 2 × 3.",
            definition:
              "Scalar multiplication means multiplying every element in the matrix by a single number (scalar).",
            translations: {
              es: {
                question: "Multiplica la matriz [[2,3],[4,5]] por escalar 3. ¿Cuál es el elemento superior izquierdo?",
                matrix: [
                  [2, 3],
                  [4, 5],
                ],
                correctAnswer: "6",
                explanation: "2 × 3 = 6. Al multiplicar por un escalar, multiplica cada elemento.",
                hint: "Multiplicación por escalar: multiplica cada elemento por 3. Superior izquierdo es 2 × 3.",
                definition:
                  "La multiplicación por escalar significa multiplicar cada elemento de la matriz por un solo número (escalar).",
              },
              zh: {
                question: "将矩阵[[2,3],[4,5]]乘以标量3。左上角元素是什么？",
                matrix: [
                  [2, 3],
                  [4, 5],
                ],
                correctAnswer: "6",
                explanation: "2 × 3 = 6。当乘以标量时，将每个元素相乘。",
                hint: "标量乘法：将每个元素乘以3。左上角是2 × 3。",
                definition: "标量乘法意味着将矩阵中的每个元素乘以单个数字（标量）。",
              },
              hi: {
                question: "मैट्रिक्स [[2,3],[4,5]] को स्केलर 3 से गुणा करें। ऊपरी-बाएं तत्व क्या है?",
                matrix: [
                  [2, 3],
                  [4, 5],
                ],
                correctAnswer: "6",
                explanation: "2 × 3 = 6। स्केलर से गुणा करते समय, हर तत्व को गुणा करें।",
                hint: "स्केलर गुणा: हर तत्व को 3 से गुणा करें। ऊपरी-बाएं 2 × 3 है।",
                definition: "स्केलर गुणा का मतलब है मैट्रिक्स के हर तत्व को एक एकल संख्या (स्केलर) से गुणा करना।",
              },
              ar: {
                question: "اضرب المصفوفة [[2,3],[4,5]] بالعددية 3. ما هو العنصر في الزاوية العلوية اليسرى؟",
                matrix: [
                  [2, 3],
                  [4, 5],
                ],
                correctAnswer: "6",
                explanation: "2 × 3 = 6. عند الضرب بعددية، اضرب كل عنصر.",
                hint: "الضرب بعددية: اضرب كل عنصر في 3. العنصر الأعلى الأيسر هو 2 × 3.",
                definition: "الضرب بعددية يعني ضرب كل عنصر في المصفوفة برقم واحد (عددي).",
              },
            },
          },
          {
            id: "q15",
            type: "multiple-choice",
            question: "Can you multiply [[1,2],[3,4]] by [[5,6],[7,8]]?",
            options: ["Yes", "No"],
            correctAnswer: "Yes",
            explanation:
              "The number of columns in the first matrix (2) equals the number of rows in the second matrix (2), so multiplication is possible.",
            hint: "Matrix multiplication requires: columns in first matrix = rows in second matrix.",
            definition:
              "For matrix multiplication A × B to be valid: columns of A must equal rows of B. The result has dimensions (rows of A) × (columns of B).",
            translations: {
              es: {
                question: "¿Puedes multiplicar [[1,2],[3,4]] por [[5,6],[7,8]]?",
                options: ["Sí", "No"],
                correctAnswer: "Sí",
                explanation:
                  "El número de columnas en la primera matriz (2) es igual al número de filas en la segunda matriz (2), por lo que la multiplicación es posible.",
                hint: "La multiplicación de matrices requiere: columnas en primera matriz = filas en segunda matriz.",
                definition:
                  "Para que la multiplicación de matrices A × B sea válida: las columnas de A deben ser iguales a las filas de B. El resultado tiene dimensiones (filas de A) × (columnas de B).",
              },
              zh: {
                question: "你能将[[1,2],[3,4]]乘以[[5,6],[7,8]]吗？",
                options: ["是", "否"],
                correctAnswer: "是",
                explanation: "第一个矩阵的列数（2）等于第二个矩阵的行数（2），因此乘法是可能的。",
                hint: "矩阵乘法要求：第一个矩阵的列 = 第二个矩阵的行。",
                definition: "对于矩阵乘法 A × B 有效：A 的列必须等于 B 的行。结果的维度为 (A 的行) × (B 的列)。",
              },
              hi: {
                question: "क्या आप [[1,2],[3,4]] को [[5,6],[7,8]] से गुणा कर सकते हैं?",
                options: ["हां", "नहीं"],
                correctAnswer: "हां",
                explanation:
                  "पहली मैट्रिक्स में स्तंभों की संख्या (2) दूसरी मैट्रिक्स में पंक्तियों की संख्या (2) के बराबर है, इसलिए गुणन संभव है।",
                hint: "मैट्रिक्स गुणा के लिए: पहली मैट्रिक्स के स्तंभ = दूसरी मैट्रिक्स की पंक्तियाँ।",
                definition:
                  "मैट्रिक्स गुणा A × B के लिए मान्य होने के लिए: A के स्तंभ B की पंक्तियों के बराबर होने चाहिए। परिणाम के आयाम (A की पंक्तियाँ) × (B के स्तंभ) हैं।",
              },
              ar: {
                question: "هل يمكنك ضرب [[1,2],[3,4]] في [[5,6],[7,8]]؟",
                options: ["نعم", "لا"],
                correctAnswer: "نعم",
                explanation:
                  "عدد الأعمدة في المصفوفة الأولى (2) يساوي عدد الصفوف في المصفوفة الثانية (2)، لذا يمكن الضرب.",
                hint: "ضرب المصفوفات يتطلب: أعمدة المصفوفة الأولى = صفوف المصفوفة الثانية.",
                definition:
                  "لكي يكون ضرب المصفوفات A × B صحيحًا: أعمدة A يجب أن تساوي صفوف B. النتيجة لها أبعاد (صفوف A) × (أعمدة B).",
              },
            },
          },
          {
            id: "q16",
            type: "input",
            question: "What is the determinant of [[4,0],[0,4]]?",
            matrix: [
              [4, 0],
              [0, 4],
            ],
            correctAnswer: "16",
            explanation: "For a 2×2 matrix: det = (4)(4) - (0)(0) = 16 - 0 = 16",
            hint: "For 2×2 matrix [[a,b],[c,d]], determinant = ad - bc. Here: (4)(4) - (0)(0).",
            definition:
              "The determinant of a 2×2 matrix [[a,b],[c,d]] is: det = ad - bc. It's a scalar value that describes properties of the matrix.",
            translations: {
              es: {
                question: "¿Cuál es el determinante de [[4,0],[0,4]]?",
                matrix: [
                  [4, 0],
                  [0, 4],
                ],
                correctAnswer: "16",
                explanation: "Para una matriz 2×2: det = (4)(4) - (0)(0) = 16 - 0 = 16",
                hint: "Para matriz 2×2 [[a,b],[c,d]], determinante = ad - bc. Aquí: (4)(4) - (0)(0).",
                definition:
                  "El determinante de una matriz 2×2 [[a,b],[c,d]] es: det = ad - bc. Es un valor escalar que describe propiedades de la matriz.",
              },
              zh: {
                question: "[[4,0],[0,4]]的行列式是多少？",
                matrix: [
                  [4, 0],
                  [0, 4],
                ],
                correctAnswer: "16",
                explanation: "对于2×2矩阵：det = (4)(4) - (0)(0) = 16 - 0 = 16",
                hint: "对于2×2矩阵[[a,b],[c,d]]，行列式 = ad - bc。这里：(4)(4) - (0)(0)。",
                definition: "2×2矩阵[[a,b],[c,d]]的行列式是：det = ad - bc。这是描述矩阵属性的标量值。",
              },
              hi: {
                question: "[[4,0],[0,4]] का सारणिक क्या है?",
                matrix: [
                  [4, 0],
                  [0, 4],
                ],
                correctAnswer: "16",
                explanation: "2×2 मैट्रिक्स के लिए: det = (4)(4) - (0)(0) = 16 - 0 = 16",
                hint: "2×2 मैट्रिक्स [[a,b],[c,d]] के लिए, सारणिक = ad - bc। यहां: (4)(4) - (0)(0)।",
                definition:
                  "2×2 मैट्रिक्स [[a,b],[c,d]] का सारणिक है: det = ad - bc। यह एक अदिश मान है जो मैट्रिक्स के गुणों का वर्णन करता है।",
              },
              ar: {
                question: "ما هو محدد [[4,0],[0,4]]؟",
                matrix: [
                  [4, 0],
                  [0, 4],
                ],
                correctAnswer: "16",
                explanation: "للمصفوفة 2×2: det = (4)(4) - (0)(0) = 16 - 0 = 16",
                hint: "للمصفوفة 2×2 [[a,b],[c,d]]، المحدد = ad - bc. هنا: (4)(4) - (0)(0).",
                definition: "محدد مصفوفة 2×2 [[a,b],[c,d]] هو: det = ad - bc. إنها قيمة عددية تصف خصائص المصفوفة.",
              },
            },
          },
        ],
      },
      medium: {
        id: "l3-medium",
        difficulty: "Medium",
        passed: false,
        questions: [
          {
            id: "q17",
            type: "input",
            question: "Multiply the matrix [[8,4],[6,2]] by scalar 1/2. What is the bottom-right element?",
            matrix: [
              [8, 4],
              [6, 2],
            ],
            correctAnswer: "1",
            explanation: "2 × (1/2) = 1. When multiplying by scalar 1/2, divide each element by 2.",
            hint: "Scalar multiplication by 1/2: multiply each element by 1/2 or divide by 2. Bottom-right is 2 × 1/2 = 1.",
            definition:
              "Scalar multiplication by 1/2 means multiplying every element in the matrix by 1/2 (or dividing each element by 2).",
            translations: {
              es: {
                question: "Multiplica la matriz [[8,4],[6,2]] por escalar 1/2. ¿Cuál es el elemento inferior derecho?",
                matrix: [
                  [8, 4],
                  [6, 2],
                ],
                correctAnswer: "1",
                explanation: "2 × (1/2) = 1. Al multiplicar por escalar 1/2, divide cada elemento por 2.",
                hint: "Multiplicación por escalar 1/2: multiplica cada elemento por 1/2 o divide por 2. Inferior derecho es 2 × 1/2 = 1.",
                definition:
                  "La multiplicación por escalar 1/2 significa multiplicar cada elemento de la matriz por 1/2 (o dividir cada elemento por 2).",
              },
              zh: {
                question: "将矩阵[[8,4],[6,2]]乘以标量1/2。右下角元素是什么？",
                matrix: [
                  [8, 4],
                  [6, 2],
                ],
                correctAnswer: "1",
                explanation: "2 × (1/2) = 1。当乘以标量1/2时，将每个元素除以2。",
                hint: "标量乘法1/2：将每个元素乘以1/2或除以2。右下角是2 × 1/2 = 1。",
                definition: "标量乘法1/2意味着将矩阵中的每个元素乘以1/2（或将每个元素除以2）。",
              },
              hi: {
                question: "मैट्रिक्स [[8,4],[6,2]] को स्केलर 1/2 से गुणा करें। नीचे-दाएं तत्व क्या है?",
                matrix: [
                  [8, 4],
                  [6, 2],
                ],
                correctAnswer: "1",
                explanation: "2 × (1/2) = 1। स्केलर 1/2 से गुणा करते समय, हर तत्व को 2 से विभाजित करें।",
                hint: "स्केलर गुणा 1/2: हर तत्व को 1/2 से गुणा करें या 2 से विभाजित करें। नीचे-दाएं 2 × 1/2 = 1 है।",
                definition:
                  "स्केलर 1/2 से गुणा का मतलब है मैट्रिक्स के हर तत्व को 1/2 से गुणा करना (या हर तत्व को 2 से विभाजित करना)।",
              },
              ar: {
                question: "اضرب المصفوفة [[8,4],[6,2]] بالعددية 1/2. ما هو العنصر في الزاوية السفلي الأيمن؟",
                matrix: [
                  [8, 4],
                  [6, 2],
                ],
                correctAnswer: "1",
                explanation: "2 × (1/2) = 1. عند الضرب بعددية 1/2، اقسم كل عنصر على 2.",
                hint: "الضرب بعددية 1/2: اضرب كل عنصر في 1/2 أو اقسم على 2. العنصر السفلي الأيمن هو 2 × 1/2 = 1.",
                definition: "الضرب بعددية 1/2 يعني ضرب كل عنصر في المصفوفة بـ 1/2 (أو قسمة كل عنصر على 2).",
              },
            },
          },
          {
            id: "q18",
            type: "input",
            question: "Multiply the matrices: [[2,1],[3,2]] × [[1,0],[0,1]]. What is the bottom-left element?",
            matrix: [
              [2, 1],
              [3, 2],
            ],
            additionalMatrix: [
              [1, 0],
              [0, 1],
            ],
            correctAnswer: "3",
            explanation:
              "The bottom-left element (R2,C1) = 3*1 + 2*0 = 3. (Multiplying by identity matrix gives the original matrix)",
            hint: "For bottom-left (R2,C1): multiply row 2 of first matrix by column 1 of second matrix: (3)(1) + (2)(0).",
            definition:
              "Matrix multiplication: element (i,j) in result = sum of (row i of A) × (column j of B). For 2×2 by 2×2, result is 2×2.",
            translations: {
              es: {
                question:
                  "Multiplica las matrices: [[2,1],[3,2]] × [[1,0],[0,1]]. ¿Cuál es el elemento inferior izquierdo?",
                matrix: [
                  [2, 1],
                  [3, 2],
                ],
                additionalMatrix: [
                  [1, 0],
                  [0, 1],
                ],
                correctAnswer: "3",
                explanation:
                  "El elemento inferior izquierdo (R2,C1) = 3*1 + 2*0 = 3. (Multiplicar por la matriz de identidad da la matriz original)",
                hint: "Para inferior izquierdo (R2,C1): multiplica fila 2 de la primera matriz por columna 1 de la segunda matriz: (3)(1) + (2)(0).",
                definition:
                  "Multiplicación de matrices: elemento (i,j) en resultado = suma de (fila i de A) × (columna j de B). Para 2×2 por 2×2, el resultado es 2×2.",
              },
              zh: {
                question: "将矩阵相乘：[[2,1],[3,2]] × [[1,0],[0,1]]。左下角元素是什么？",
                matrix: [
                  [2, 1],
                  [3, 2],
                ],
                additionalMatrix: [
                  [1, 0],
                  [0, 1],
                ],
                correctAnswer: "3",
                explanation: "左下角元素 (R2,C1) = 3*1 + 2*0 = 3。(乘以单位矩阵得到原矩阵)",
                hint: "对于左下角 (R2,C1)：将第一个矩阵的第2行乘以第二个矩阵的第1列：(3)(1) + (2)(0)。",
                definition: "矩阵乘法：结果中的元素 (i,j) = (A的第i行) × (B的第j列) 的和。对于2×2乘以2×2，结果是2×2。",
              },
              hi: {
                question: "मैट्रिक्स को गुणा करें: [[2,1],[3,2]] × [[1,0],[0,1]]। नीचे-बाएं तत्व क्या है?",
                matrix: [
                  [2, 1],
                  [3, 2],
                ],
                additionalMatrix: [
                  [1, 0],
                  [0, 1],
                ],
                correctAnswer: "3",
                explanation: "नीचे-बाएं तत्व (R2,C1) = 3*1 + 2*0 = 3। (पहचान मैट्रिक्स से गुणा करने पर मूल मैट्रिक्स मिलता है)",
                hint: "नीचे-बाएं (R2,C1) के लिए: पहली मैट्रिक्स की पंक्ति 2 को दूसरी मैट्रिक्स की स्तंभ 1 से गुणा करें: (3)(1) + (2)(0)।",
                definition:
                  "मैट्रिक्स गुणा: परिणाम में तत्व (i,j) = (A की पंक्ति i) × (B का स्तंभ j) का योग। 2×2 को 2×2 से गुणा करने पर परिणाम 2×2 है।",
              },
              ar: {
                question: "اضرب المصفوفات: [[2,1],[3,2]] × [[1,0],[0,1]]. ما هو العنصر في الزاوية السفلي الأيسر؟",
                matrix: [
                  [2, 1],
                  [3, 2],
                ],
                additionalMatrix: [
                  [1, 0],
                  [0, 1],
                ],
                correctAnswer: "3",
                explanation:
                  "العنصر في الزاوية السفلي الأيسر (R2,C1) = 3*1 + 2*0 = 3. (الضرب في مصفوفة الهوية يعطي المصفوفة الأصلية)",
                hint: "للزاوية السفلي الأيسر (R2,C1): اضرب الصف 2 من المصفوفة الأولى بالعمود 1 من المصفوفة الثانية: (3)(1) + (2)(0).",
                definition:
                  "ضرب المصفوفات: العنصر (i,j) في النتيجة = مجموع (صف i من A) × (عمود j من B). لـ 2×2 في 2×2، النتيجة هي 2×2.",
              },
            },
          },
        ],
      },
      hard: {
        id: "l3-hard",
        difficulty: "Hard",
        passed: false,
        questions: [
          {
            id: "q19",
            type: "input",
            question: "What is the determinant of [[1,2,3],[4,5,6],[7,8,9]]?",
            correctAnswer: "0",
            explanation:
              "This 3×3 matrix has a determinant of 0 because the rows are linearly dependent (row 3 = row 2 + row 1).",
            hint: "Determinant = 0. Hint: Check if the rows are related. Row 3 is the sum of rows 1 and 2 multiplied by constants.",
            definition:
              "The determinant of a 3×3 matrix measures the volume scaling factor. If determinant = 0, the matrix is singular (non-invertible).",
            translations: {
              es: {
                question: "¿Cuál es el determinante de [[1,2,3],[4,5,6],[7,8,9]]?",
                correctAnswer: "0",
                explanation:
                  "Esta matriz 3×3 tiene un determinante de 0 porque las filas son linealmente dependientes (fila 3 = fila 2 + fila 1).",
                hint: "Determinante = 0. Pista: Comprueba si las filas están relacionadas. La fila 3 es la suma de las filas 1 y 2 multiplicadas por constantes.",
                definition:
                  "El determinante de una matriz 3×3 mide el factor de escala del volumen. Si determinante = 0, la matriz es singular (no invertible).",
              },
              zh: {
                question: "[[1,2,3],[4,5,6],[7,8,9]]的行列式是多少？",
                correctAnswer: "0",
                explanation: "这个3×3矩阵的行列式为0，因为行是线性相关的（第3行=第2行+第1行）。",
                hint: "行列式 = 0。提示：检查行是否相关。第3行是第1行和第2行乘以常数的和。",
                definition: "3×3矩阵的行列式衡量体积缩放因子。如果行列式= 0，则矩阵是奇异的（不可逆的）。",
              },
              hi: {
                question: "[[1,2,3],[4,5,6],[7,8,9]] का सारणिक क्या है?",
                correctAnswer: "0",
                explanation: "इस 3×3 मैट्रिक्स का सारणिक 0 है क्योंकि पंक्तियाँ रैखिक रूप से आश्रित हैं (पंक्ति 3 = पंक्ति 2 + पंक्ति 1)।",
                hint: "सारणिक = 0। संकेत: जाँचें कि क्या पंक्तियाँ संबंधित हैं। पंक्ति 3 पंक्तियों 1 और 2 का योग है जिसे स्थिरांक से गुणा किया गया है।",
                definition:
                  "3×3 मैट्रिक्स का सारणिक मात्रा स्केलिंग फैक्टर को मापता है। यदि सारणिक = 0, तो मैट्रिक्स एकवचन है (गैर-व्युत्क्रमणीय)।",
              },
              ar: {
                question: "ما هو محدد [[1,2,3],[4,5,6],[7,8,9]]؟",
                correctAnswer: "0",
                explanation: "هذه المصفوفة 3×3 لها محدد 0 لأن الصفوف تابعة خطيًا (الصف 3 = الصف 2 + الصف 1).",
                hint: "المحدد = 0. تلميح: تحقق مما إذا كانت الصفوف مترابطة. الصف 3 هو مجموع الصفوف 1 و 2 مضروبًا بثوابت.",
                definition:
                  "محدد مصفوفة 3×3 يقيس عامل قياس الحجم. إذا كان المحدد = 0، فإن المصفوفة مفردة (غير قابلة للعكس).",
              },
            },
          },
          {
            id: "q20",
            type: "multiple-choice",
            question: "Is [[1,0],[0,1]] an invertible matrix?",
            matrix: [
              [1, 0],
              [0, 1],
            ],
            options: ["Yes", "No"],
            correctAnswer: "Yes",
            explanation:
              "Yes, it is the identity matrix with determinant = 1. Any matrix with non-zero determinant is invertible.",
            hint: "This is the identity matrix. Its determinant is 1, which is non-zero, so it's invertible.",
            definition:
              "A matrix is invertible if and only if its determinant is non-zero. The identity matrix has determinant 1 and is always invertible.",
            translations: {
              es: {
                question: "¿Es [[1,0],[0,1]] una matriz invertible?",
                matrix: [
                  [1, 0],
                  [0, 1],
                ],
                options: ["Sí", "No"],
                correctAnswer: "Sí",
                explanation:
                  "Sí, es la matriz de identidad con determinante = 1. Cualquier matriz con determinante no nulo es invertible.",
                hint: "Esta es la matriz de identidad. Su determinante es 1, que es no nulo, por lo que es invertible.",
                definition:
                  "Una matriz es invertible si y solo si su determinante es no nulo. La matriz de identidad tiene determinante 1 y siempre es invertible.",
              },
              zh: {
                question: "[[1,0],[0,1]]是可逆矩阵吗？",
                matrix: [
                  [1, 0],
                  [0, 1],
                ],
                options: ["是", "否"],
                correctAnswer: "是",
                explanation: "是的，它是具有行列式= 1的单位矩阵。任何具有非零行列式的矩阵都是可逆的。",
                hint: "这是单位矩阵。它的行列式是1，这是非零的，所以它是可逆的。",
                definition: "矩阵可逆当且仅当其行列式非零。单位矩阵的行列式为1，总是可逆的。",
              },
              hi: {
                question: "क्या [[1,0],[0,1]] एक व्युत्क्रमणीय मैट्रिक्स है?",
                matrix: [
                  [1, 0],
                  [0, 1],
                ],
                options: ["हां", "नहीं"],
                correctAnswer: "हां",
                explanation: "हां, यह सारणिक = 1 वाली पहचान मैट्रिक्स है। किसी भी गैर-शून्य सारणिक वाली मैट्रिक्स व्युत्क्रमणीय है।",
                hint: "यह पहचान मैट्रिक्स है। इसका सारणिक 1 है, जो गैर-शून्य है, इसलिए यह व्युत्क्रमणीय है।",
                definition:
                  "मैट्रिक्स व्युत्क्रमणीय है यदि और केवल यदि इसका सारणिक गैर-शून्य है। पहचान मैट्रिक्स का सारणिक 1 है और हमेशा व्युत्क्रमणीय है।",
              },
              ar: {
                question: "هل [[1,0],[0,1]] مصفوفة قابلة للعكس؟",
                matrix: [
                  [1, 0],
                  [0, 1],
                ],
                options: ["نعم", "لا"],
                correctAnswer: "نعم",
                explanation: "نعم، إنها مصفوفة الهوية بمحدد = 1. أي مصفوفة ذات محدد غير صفري قابلة للعكس.",
                hint: "هذه مصفوفة الهوية. محددها 1، وهو غير صفري، لذا فهي قابلة للعكس.",
                definition:
                  "المصفوفة قابلة للعكس إذا وفقط إذا كان محددها غير صفري. مصفوفة الهوية لها محدد 1 وتكون دائمًا قابلة للعكس.",
              },
            },
          },
          {
            id: "q21",
            type: "input",
            question: "Solve the matrix equation: 2A = [[4,6],[8,10]]. What is element A[1][1]?",
            correctAnswer: "2",
            explanation: "A = [[4,6],[8,10]] / 2 = [[2,3],[4,5]]. Element A[1][1] = 2.",
            hint: "Divide each element by 2: A[1][1] = 4 / 2 = 2.",
            definition: "To solve matrix equation kA = B, divide B by scalar k: A = B/k. Divide each element by k.",
            translations: {
              es: {
                question: "Resuelve la ecuación matricial: 2A = [[4,6],[8,10]]. ¿Cuál es el elemento A[1][1]?",
                correctAnswer: "2",
                explanation: "A = [[4,6],[8,10]] / 2 = [[2,3],[4,5]]. Elemento A[1][1] = 2.",
                hint: "Divide cada elemento por 2: A[1][1] = 4 / 2 = 2.",
                definition:
                  "Para resolver la ecuación matricial kA = B, divide B por escalar k: A = B/k. Divide cada elemento por k.",
              },
              zh: {
                question: "解矩阵方程：2A = [[4,6],[8,10]]。元素 A[1][1] 是什么？",
                correctAnswer: "2",
                explanation: "A = [[4,6],[8,10]] / 2 = [[2,3],[4,5]]。元素 A[1][1] = 2。",
                hint: "将每个元素除以2：A[1][1] = 4 / 2 = 2。",
                definition: "要解矩阵方程 kA = B，将 B 除以标量 k：A = B/k。将每个元素除以 k。",
              },
              hi: {
                question: "मैट्रिक्स समीकरण को हल करें: 2A = [[4,6],[8,10]]। तत्व A[1][1] क्या है?",
                correctAnswer: "2",
                explanation: "A = [[4,6],[8,10]] / 2 = [[2,3],[4,5]]। तत्व A[1][1] = 2।",
                hint: "हर तत्व को 2 से विभाजित करें: A[1][1] = 4 / 2 = 2।",
                definition:
                  "मैट्रिक्स समीकरण kA = B को हल करने के लिए, B को स्केलर k से विभाजित करें: A = B/k। हर तत्व को k से विभाजित करें।",
              },
              ar: {
                question: "حل معادلة المصفوفة: 2A = [[4,6],[8,10]]. ما هو العنصر A[1][1]؟",
                correctAnswer: "2",
                explanation: "A = [[4,6],[8,10]] / 2 = [[2,3],[4,5]]. العنصر A[1][1] = 2.",
                hint: "اقسم كل عنصر على 2: A[1][1] = 4 / 2 = 2.",
                definition: "لحل معادلة المصفوفة kA = B، اقسم B على العددية k: A = B/k. اقسم كل عنصر على k.",
              },
            },
          },
        ],
      },
    },
  },
]

export const GAME_LEVELS: Level[] = GAME_LEVELS_INTERNAL
