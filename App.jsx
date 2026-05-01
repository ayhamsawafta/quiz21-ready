import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", disabled, onClick, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} inline-flex items-center justify-center px-4 py-2 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}


const questions = [
  {
    unit: "المعجم العربي",
    question: "ما المقصود بالمعجم اصطلاحًا؟",
    options: [
      "كتاب يضم مفردات اللغة ويشرح معانيها وفق نظام معيّن",
      "كتاب يروي القصص التاريخية فقط",
      "كتاب خاص بالقواعد النحوية فقط",
      "كتاب يشرح الشعر فقط",
    ],
    answer: 0,
    explain: "المعجم مرجع لغوي يجمع الكلمات ويبيّن معانيها بطريقة مرتبة.",
  },
  {
    unit: "المعجم العربي",
    question: "لماذا سُمّي المعجم بهذا الاسم؟",
    options: [
      "لأنه يزيد غموض الكلمات",
      "لأنه يزيل الغموض عن الكلمات ويوضح معانيها",
      "لأنه يضم القصائد فقط",
      "لأنه لا يعتمد على ترتيب",
    ],
    answer: 1,
    explain: "الفعل أعجم يدل هنا على إزالة العجمة والغموض.",
  },
  {
    unit: "المعجم العربي",
    question: "أي مما يأتي من فوائد استخدام المعجم؟",
    options: [
      "معرفة معاني الكلمات وأصولها",
      "حفظ النصوص دون فهم",
      "تغيير معاني الكلمات",
      "إلغاء الحاجة إلى القراءة",
    ],
    answer: 0,
    explain: "نستخدم المعجم لفهم المعنى الدقيق ومعرفة الجذر والاستخدام.",
  },
  {
    unit: "مدارس المعاجم",
    question: "ما المقصود بمدارس المعاجم؟",
    options: [
      "طرق مختلفة لترتيب الكلمات في المعاجم",
      "مدارس لتعليم الخط العربي",
      "أنواع من الشعر العربي",
      "قواعد إعراب فقط",
    ],
    answer: 0,
    explain: "كل مدرسة معجمية لها طريقة خاصة في تنظيم الكلمات والبحث عنها.",
  },
  {
    unit: "مدارس المعاجم",
    question: "على ماذا تعتمد المدرسة الصوتية في ترتيب الكلمات؟",
    options: [
      "الترتيب الأبجدي فقط",
      "مخارج الحروف",
      "عدد حروف الكلمة",
      "آخر حرف في الكلمة دائمًا",
    ],
    answer: 1,
    explain: "المدرسة الصوتية ترتب الحروف بحسب مخارجها، وتبدأ بالحروف الحلقية.",
  },
  {
    unit: "مدارس المعاجم",
    question: "من أشهر من ارتبطت به المدرسة الصوتية؟",
    options: ["الخليل بن أحمد الفراهيدي", "المتنبي", "أبو تمام", "ابن خلدون"],
    answer: 0,
    explain: "الخليل بن أحمد الفراهيدي هو صاحب معجم العين، وهو مرتبط بالمنهج الصوتي.",
  },
  {
    unit: "مدارس المعاجم",
    question: "ما فكرة مدرسة التقاليب؟",
    options: [
      "ترتيب الكلمات حسب أول حرف كما هي",
      "تغيير ترتيب حروف الجذر وجمع احتمالاته",
      "شرح الصور الموجودة في الكتاب",
      "ترتيب الكلمات حسب عدد الأسطر",
    ],
    answer: 1,
    explain: "التقاليب تعني توليد احتمالات ترتيب حروف الجذر مثل: كتب، كبت، تكب...",
  },
  {
    unit: "مدارس المعاجم",
    question: "كم عدد التقاليب الممكنة لجذر ثلاثي مثل: كتب؟",
    options: ["3", "4", "6", "9"],
    answer: 2,
    explain: "عدد التقاليب لكلمة من ثلاثة أحرف مختلفة هو: 3 × 2 × 1 = 6.",
  },
  {
    unit: "مدارس المعاجم",
    question: "في المدرسة الألفبائية، كلمة 'مكتبة' نبحث عنها تحت أي حرف؟",
    options: ["ك", "ت", "ب", "م"],
    answer: 3,
    explain: "الألفبائية تعتمد على الكلمة كما هي؛ لذلك نبحث تحت أول حرف: م.",
  },
  {
    unit: "مدارس المعاجم",
    question: "في معجم يعتمد على الجذر، كلمة 'مكتبة' نبحث عنها تحت أي حرف؟",
    options: ["م", "ك", "ت", "ة"],
    answer: 1,
    explain: "نرجع الكلمة إلى جذرها: كتب، فنبحث تحت الكاف.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "ما جذر كلمة 'مستخرج'؟",
    options: ["خرج", "سخرج", "مخرج", "درج"],
    answer: 0,
    explain: "نحذف الزوائد مثل م، س، ت، فيبقى الجذر: خرج.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "في المدرسة الألفبائية، كلمة 'استخراج' نبحث عنها تحت حرف:",
    options: ["خ", "ر", "ج", "ا"],
    answer: 3,
    explain: "في الألفبائية نأخذ الكلمة كما هي؛ أول حرف هو الألف.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "في معجم الجذر، كلمة 'استخراج' نبحث عنها تحت حرف:",
    options: ["ا", "س", "خ", "ر"],
    answer: 2,
    explain: "الجذر هو خرج، فنبحث تحت الخاء.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "ما جذر كلمة 'دراسة'؟",
    options: ["درس", "دار", "دسر", "رسم"],
    answer: 0,
    explain: "نحذف الزوائد ونرجع الكلمة إلى أصلها: درس.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "ما جذر كلمة 'استغفار'؟",
    options: ["سفر", "غفر", "غفا", "غار"],
    answer: 1,
    explain: "استغفار من الجذر: غفر.",
  },
  {
    unit: "الأدب: الدنيا والزوال",
    question: "ما الفكرة العامة في النص الذي يتحدث عن الدنيا؟",
    options: [
      "الدنيا ثابتة لا تتغير",
      "الدنيا زائلة ومتغيرة ولا تبقى على حال",
      "المال يبقى إلى الأبد",
      "القوة تمنع الموت",
    ],
    answer: 1,
    explain: "الفكرة العامة أن الحياة الدنيا محكومة بالتغير والفناء.",
  },
  {
    unit: "الأدب: الدنيا والزوال",
    question: "ما المقصود بقولنا إن الدنيا 'لا تبقى على حال'؟",
    options: [
      "أن أحوال الناس تتغير من قوة إلى ضعف ومن غنى إلى فقر",
      "أن كل الناس يبقون أغنياء",
      "أن الزمن يتوقف",
      "أن الملوك لا يزولون",
    ],
    answer: 0,
    explain: "المقصود أن أحوال الدنيا متبدلة وليست ثابتة.",
  },
  {
    unit: "الأدب: الدنيا والزوال",
    question: "ما العبرة من ذكر زوال الممالك والحضارات؟",
    options: ["التفاخر بالقوة", "التأكيد أن كل شيء في الدنيا زائل", "إنكار التاريخ", "الدعوة إلى ترك العلم"],
    answer: 1,
    explain: "ذكر الزوال يعلّم الإنسان عدم الاغترار بالدنيا وقوتها.",
  },
  {
    unit: "الأندلس",
    question: "ما الشعور البارز في النص المتعلق بسقوط الأندلس؟",
    options: ["الفرح", "الشماتة", "الحزن والتحسر", "اللامبالاة"],
    answer: 2,
    explain: "النص يصور الحزن الشديد على سقوط الأندلس وتغير حال أهلها.",
  },
  {
    unit: "الأندلس",
    question: "ما دلالة بكاء المساجد والمحاريب في نص الأندلس؟",
    options: ["تصوير شدة المصيبة والحزن", "وصف الطقس", "الدلالة على الفرح", "ذكر أسماء المدن فقط"],
    answer: 0,
    explain: "هذا تصوير بلاغي يبرز عظم المصيبة بعد سقوط الأندلس.",
  },
  {
    unit: "الأندلس",
    question: "ماذا حدث لحال المسلمين بعد سقوط الأندلس كما يصوره النص؟",
    options: ["ازدادوا قوة وسلطانًا", "تحولوا من العزة إلى الذل والهوان", "لم يتغير حالهم", "أصبحوا ملوكًا على الإسبان"],
    answer: 1,
    explain: "النص يبرز انقلاب الحال من القوة والعزة إلى الضعف والذل.",
  },
  {
    unit: "الأندلس",
    question: "أي من الآتي يُعد من مظاهر المأساة في نص الأندلس؟",
    options: ["تفريق الأطفال عن أمهاتهم", "ازدهار الأسواق", "فرح الناس بالفتح", "عودة المدن إلى قوتها"],
    answer: 0,
    explain: "من الصور المؤلمة في النص: التفريق، التشريد، وانتهاك الحرمات.",
  },
  {
    unit: "بلاغة",
    question: "في قول الشاعر إن المساجد تبكي، ما الصورة البلاغية الأقرب؟",
    options: ["تشخيص؛ إذ جعل الجماد كائنًا يبكي", "طباق فقط", "جناس ناقص", "حذف"],
    answer: 0,
    explain: "إسناد البكاء إلى المساجد تشخيص؛ جعل غير العاقل كالعاقل.",
  },
  {
    unit: "بلاغة",
    question: "ما وظيفة الطباق غالبًا في النصوص؟",
    options: ["إبراز المعنى بتقابل الألفاظ", "إخفاء المعنى", "تكرار الحروف بلا فائدة", "تحويل الشعر إلى نثر"],
    answer: 0,
    explain: "الطباق بين معنيين متضادين يقوي المعنى ويوضحه.",
  },
  {
    unit: "الإعراب",
    question: "الفعل المضارع المرفوع تكون علامة رفعه الأصلية:",
    options: ["الفتحة", "الكسرة", "الضمة", "السكون"],
    answer: 2,
    explain: "الأصل في رفع الفعل المضارع الصحيح الآخر هو الضمة.",
  },
  {
    unit: "الإعراب",
    question: "كان وأخواتها تدخل على الجملة الاسمية فترفع:",
    options: ["الخبر", "المبتدأ ويسمى اسمها", "المفعول به", "النعت"],
    answer: 1,
    explain: "كان ترفع الاسم وتنصب الخبر.",
  },
  {
    unit: "الإعراب",
    question: "خبر كان يكون:",
    options: ["مرفوعًا", "مجزومًا", "منصوبًا", "مجرورًا دائمًا"],
    answer: 2,
    explain: "كان وأخواتها تنصب الخبر.",
  },
  {
    unit: "سورة القصص",
    question: "ما الموضوع العام للآيات المختارة من سورة القصص في الكتاب؟",
    options: ["مشاهد من طفولة موسى عليه السلام ورعاية الله له", "غزوة بدر", "قصة أصحاب الكهف", "أحكام البيع والشراء"],
    answer: 0,
    explain: "الآيات تعرض جانبًا من طفولة موسى عليه السلام منذ إلقائه في اليم حتى عودته إلى أمه.",
  },
  {
    unit: "سورة القصص",
    question: "ما الهدف الإيماني البارز من قصة موسى في هذه الآيات؟",
    options: ["إظهار أن تدبير الله غالب رغم ضعف الأسباب الظاهرة", "إظهار قوة فرعون المطلقة", "الدعوة إلى اليأس", "الاكتفاء بوصف المكان"],
    answer: 0,
    explain: "القصة تبين لطف الله وتدبيره ونصره للمستضعفين.",
  },
  {
    unit: "سورة القصص",
    question: "لماذا كانت أم موسى خائفة عليه؟",
    options: ["لخطر فرعون وجنوده على أبناء بني إسرائيل", "لأنه أراد السفر للتجارة", "لأنه كان مريضًا فقط", "لأنه ضاع في السوق"],
    answer: 0,
    explain: "السياق يتعلق ببطش فرعون ببني إسرائيل وخوف الأم على ابنها.",
  },
  {
    unit: "سورة القصص",
    question: "ما دلالة عودة موسى إلى أمه؟",
    options: ["تحقق وعد الله وطمأنة قلبها", "انقطاع الأمل", "انتصار فرعون", "نهاية القصة دون معنى"],
    answer: 0,
    explain: "عودة موسى إلى أمه علامة على صدق وعد الله ولطفه بها.",
  },
];

function validateQuestions(questionList) {
  return questionList.every((item) => {
    return (
      item &&
      typeof item.unit === "string" &&
      typeof item.question === "string" &&
      Array.isArray(item.options) &&
      item.options.length >= 2 &&
      Number.isInteger(item.answer) &&
      item.answer >= 0 &&
      item.answer < item.options.length &&
      typeof item.explain === "string"
    );
  });
}

const quizDataIsValid = validateQuestions(questions);
console.assert(quizDataIsValid, "بيانات الأسئلة غير صحيحة: تأكد من وجود خيارات وإجابة صحيحة لكل سؤال.");
console.assert(questions.length >= 25, "يُفضّل أن يحتوي الاختبار على عدد كبير من الأسئلة.");
console.assert(questions.some((q) => q.unit === "المعجم العربي"), "يجب أن توجد أسئلة عن المعجم العربي.");
console.assert(questions.some((q) => q.unit === "سورة القصص"), "يجب أن توجد أسئلة عن سورة القصص.");

const uniqueUnits = ["الكل", ...Array.from(new Set(questions.map((q) => q.unit)))];

function Icon({ label, className = "" }) {
  return (
    <span aria-hidden="true" className={`inline-flex select-none items-center justify-center ${className}`}>
      {label}
    </span>
  );
}

export default function ArabicQuizInteractiveSite() {
  const [selectedUnit, setSelectedUnit] = useState("الكل");
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const unitOk = selectedUnit === "الكل" || q.unit === selectedUnit;
      const searchOk = !query.trim() || `${q.question} ${q.unit}`.includes(query.trim());
      return unitOk && searchOk;
    });
  }, [selectedUnit, query]);

  const q = filtered[current] || filtered[0];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((item, index) => answers[index] === item.answer).length;
  const percentage = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;

  const originalIndex = q ? questions.indexOf(q) : -1;
  const selected = originalIndex >= 0 ? answers[originalIndex] : undefined;

  function chooseAnswer(optionIndex) {
    if (originalIndex < 0 || selected !== undefined) return;
    setAnswers((prev) => ({ ...prev, [originalIndex]: optionIndex }));
  }

  function resetQuiz() {
    setAnswers({});
    setCurrent(0);
    setSelectedUnit("الكل");
    setQuery("");
  }

  function nextQuestion() {
    setCurrent((prev) => Math.min(prev + 1, filtered.length - 1));
  }

  function previousQuestion() {
    setCurrent((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 md:grid-cols-[1.5fr_1fr] items-stretch"
        >
          <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-2xl bg-white/15 p-3 text-3xl">
                  <Icon label="📘" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight">كويز اللغة العربية</h1>
                  <p className="text-white/70 mt-2">اختبر نفسك من مادة الكتاب، سؤال بسؤال، مع تصحيح فوري.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {uniqueUnits.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => {
                      setSelectedUnit(unit);
                      setCurrent(0);
                    }}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      selectedUnit === unit
                        ? "bg-white text-slate-950 font-bold"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Icon label="🏆" className="text-4xl" />
                <div>
                  <p className="text-white/70">نتيجتك الحالية</p>
                  <h2 className="text-4xl font-black">{percentage}%</h2>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">{answeredCount}</p>
                  <p className="text-xs text-white/60">أجبت</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/20 p-3">
                  <p className="text-2xl font-bold">{correctCount}</p>
                  <p className="text-xs text-white/60">صحيح</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">{questions.length}</p>
                  <p className="text-xs text-white/60">كل الأسئلة</p>
                </div>
              </div>
              <Button onClick={resetQuiz} className="mt-5 rounded-2xl bg-white text-slate-950 hover:bg-white/90">
                <span className="ml-2">↻</span> إعادة الاختبار
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <div className="relative">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45">🔎</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrent(0);
            }}
            placeholder="ابحث عن سؤال أو وحدة..."
            className="w-full rounded-3xl border border-white/10 bg-white/10 px-12 py-4 outline-none placeholder:text-white/40 focus:border-white/30"
          />
        </div>

        {q ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${q.question}-${current}-${selectedUnit}-${query}`}
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="border-white/10 bg-white/95 text-slate-950 shadow-2xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="rounded-full bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-bold">{q.unit}</span>
                    <span className="text-slate-500 font-medium">
                      سؤال {current + 1} من {filtered.length}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-black leading-relaxed mb-6">{q.question}</h2>

                  <div className="grid gap-3">
                    {q.options.map((option, index) => {
                      const isChosen = selected === index;
                      const isCorrect = q.answer === index;
                      const showCorrect = selected !== undefined && isCorrect;
                      const showWrong = selected !== undefined && isChosen && !isCorrect;

                      return (
                        <button
                          key={option}
                          onClick={() => chooseAnswer(index)}
                          className={`group flex items-center justify-between rounded-3xl border-2 p-4 md:p-5 text-right transition shadow-sm ${
                            showCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                              : showWrong
                              ? "border-red-500 bg-red-50 text-red-900"
                              : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50"
                          }`}
                        >
                          <span className="text-lg font-bold leading-relaxed">{option}</span>
                          <span className="mr-3 shrink-0 text-2xl">
                            {showCorrect && "✅"}
                            {showWrong && "❌"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selected !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-6 rounded-3xl p-5 ${selected === q.answer ? "bg-emerald-50" : "bg-red-50"}`}
                    >
                      <p className={`font-black text-xl ${selected === q.answer ? "text-emerald-700" : "text-red-700"}`}>
                        {selected === q.answer ? "إجابة صحيحة ✅" : "إجابة خاطئة ❌"}
                      </p>
                      <p className="mt-2 text-slate-700 leading-relaxed">{q.explain}</p>
                    </motion.div>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3 justify-between">
                    <Button
                      onClick={previousQuestion}
                      disabled={current === 0}
                      variant="outline"
                      className="rounded-2xl border-slate-300"
                    >
                      السابق
                    </Button>
                    <Button
                      onClick={nextQuestion}
                      disabled={current >= filtered.length - 1}
                      className="rounded-2xl bg-slate-950 hover:bg-slate-800"
                    >
                      السؤال التالي
                      <span className="mr-2">←</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        ) : (
          <Card className="border-white/10 bg-white/10 text-white rounded-3xl">
            <CardContent className="p-8 text-center">
              <p className="text-xl font-bold">لا توجد أسئلة مطابقة للبحث.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
