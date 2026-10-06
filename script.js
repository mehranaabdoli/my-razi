const questions = [

    {
        question: "یک نفر روی پله سوم نردبان است. ۵ پله بالا می‌رود، سپس ۳ پله پایین می‌آید و این کار را تکرار می‌کند. برای حل این مسئله کدام راهبرد مناسب‌تر است؟",
        answers: [
            "رسم شکل",
            "الگوسازی",
            "الگویابی",
            "روش نمادین"
        ],
        correct: 0
    },

    {
        question: "در سؤال مربوط به سه گوی قرمز، آبی و سبز و دو خانه رنگی، برای پیدا کردن حالت‌های ممکن از کدام راهبرد استفاده می‌شود؟",
        answers: [
            "حل مسئله ساده‌تر",
            "الگوسازی",
            "زیرمسئله",
            "رسم شکل"
        ],
        correct: 1
    },

    {
        question: "برای پیدا کردن حالت‌های مختلف ساختن یک مبلغ با چند نوع سکه، کدام راهبرد مناسب است؟",
        answers: [
            "الگوسازی",
            "رسم شکل",
            "الگویابی",
            "زیرمسئله"
        ],
        correct: 0
    },

    {
        question: "اگر برای یک مسئله، حالت‌های مختلف را بررسی کنیم و حالت‌های نامناسب را کنار بگذاریم، از چه راهبردی استفاده کرده‌ایم؟",
        answers: [
            "رسم شکل",
            "حذف حالت‌های نامطلوب",
            "الگوسازی",
            "حل مسئله ساده‌تر"
        ],
        correct: 1
    },

    {
        question: "در مسئله‌ای که باید سه عدد طبیعی با مجموع مشخص و حاصل‌ضرب مشخص پیدا شوند، کدام راهبرد مناسب است؟",
        answers: [
            "حذف حالت‌های نامطلوب",
            "رسم شکل",
            "زیرمسئله",
            "الگویابی"
        ],
        correct: 0
    },

    {
        question: "برای پیدا کردن شکل شانزدهم یک الگو، مناسب‌ترین راهبرد کدام است؟",
        answers: [
            "حدس و آزمایش",
            "الگویابی",
            "رسم شکل",
            "روش نمادین"
        ],
        correct: 1
    },

    {
        question: "در مسئله‌ای که چند زاویه مکمل هستند و مقدار آن‌ها باید پیدا شود، کدام راهبرد می‌تواند مناسب باشد؟",
        answers: [
            "حدس و آزمایش",
            "الگوسازی",
            "رسم شکل",
            "حذف حالت‌های نامطلوب"
        ],
        correct: 0
    },

    {
        question: "برای مسئله‌ای که یک مسئله بزرگ را به قسمت‌های کوچک‌تر تقسیم می‌کنیم، کدام راهبرد مناسب است؟",
        answers: [
            "زیرمسئله",
            "الگویابی",
            "رسم شکل",
            "الگوسازی"
        ],
        correct: 0
    },

    {
        question: "اگر برای حل یک مسئله ابتدا یک مسئله ساده‌تر را حل کنیم، نام این راهبرد چیست؟",
        answers: [
            "حل مسئله ساده‌تر",
            "الگوسازی",
            "حدس و آزمایش",
            "رسم شکل"
        ],
        correct: 0
    },

    {
        question: "در مسئله‌ای درباره گنجایش پارچ و لیوان، کدام راهبرد می‌تواند برای حل مسئله استفاده شود؟",
        answers: [
            "روش‌های نمادین",
            "الگویابی",
            "رسم شکل",
            "الگوسازی"
        ],
        correct: 0
    }

];


let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let wrongQuestions = [];

let time = 600;
let timerInterval = null;


/* ورود به فصل */

function openChapter(chapter) {

    if (chapter === 1) {
        startExam();
    }

}


/* شروع آزمون */

function startExam() {

    document.getElementById("home").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("exam").classList.remove("hidden");

    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    wrongQuestions = [];

    time = 600;

    clearInterval(timerInterval);

    document.getElementById("timer").innerText = "10:00";
    document.getElementById("timer").classList.remove("warning");

    showQuestion();

    timerInterval = setInterval(updateTimer, 1000);

}


/* نمایش سؤال */

function showQuestion() {

    selectedAnswer = null;

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").innerText =
        "سؤال " + (currentQuestion + 1) + " از " + questions.length;

    document.getElementById("question").innerText =
        q.question;

    const answersDiv =
        document.getElementById("answers");

    answersDiv.innerHTML = "";

    q.answers.forEach(function (answer, index) {

        const button =
            document.createElement("button");

        button.innerText = answer;
        button.className = "answer";

        button.onclick = function () {

            selectedAnswer = index;

            document
                .querySelectorAll(".answer")
                .forEach(function (btn) {
                    btn.classList.remove("selected");
                });

            button.classList.add("selected");

        };

        answersDiv.appendChild(button);

    });


    if (currentQuestion === questions.length - 1) {

        document.getElementById("nextButton").innerText =
            "پایان آزمون";

    } else {

        document.getElementById("nextButton").innerText =
            "سؤال بعدی";

    }


    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

}


/* سؤال بعدی */

function nextQuestion() {

    if (selectedAnswer === null) {

        alert("لطفاً یک گزینه را انتخاب کن.");
        return;

    }


    const q = questions[currentQuestion];


    if (selectedAnswer === q.correct) {

        score++;

    } else {

        wrongQuestions.push({

            number: currentQuestion + 1,

            question: q.question,

            yourAnswer: q.answers[selectedAnswer],

            correctAnswer: q.answers[q.correct]

        });

    }


    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishExam();

    }

}


/* تایمر */

function updateTimer() {

    time--;

    let minutes =
        Math.floor(time / 60);

    let seconds =
        time % 60;


    if (seconds < 10) {
        seconds = "0" + seconds;
    }


    document.getElementById("timer").innerText =
        minutes + ":" + seconds;


    if (time <= 60) {

        document
            .getElementById("timer")
            .classList.add("warning");

    }


    if (time <= 0) {

        clearInterval(timerInterval);

        finishExam();

    }

}


/* پایان آزمون */

function finishExam() {

    clearInterval(timerInterval);

    document.getElementById("exam").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");


    const percent =
        (score / questions.length) * 100;


    document.getElementById("score").innerText =
        "🏆 نمره: " + score + " از " + questions.length;


    document.getElementById("percent").innerText =
        "📊 درصد: " + percent + "%";


    document.getElementById("correct").innerText =
        "✅ تعداد درست: " + score;


    document.getElementById("wrong").innerText =
        "❌ تعداد غلط: " + wrongQuestions.length;


    const wrongDiv =
        document.getElementById("wrongQuestions");

    wrongDiv.innerHTML = "";


    if (wrongQuestions.length === 0) {

        wrongDiv.innerHTML =
            "<p>🎉 عالی! هیچ سؤالی را اشتباه نزدی.</p>";

    } else {

        wrongQuestions.forEach(function (item) {

            const div =
                document.createElement("div");

            div.className = "wrong-item";


            div.innerHTML =
                "<b>سؤال " + item.number + "</b><br>" +
                item.question + "<br>" +
                "❌ پاسخ شما: " + item.yourAnswer + "<br>" +
                "✅ پاسخ درست: " + item.correctAnswer;


            wrongDiv.appendChild(div);

        });

    }

}


/* آزمون مجدد */

function restartExam() {

    startExam();

}


/* بازگشت به صفحه اصلی */

function goHome() {

    clearInterval(timerInterval);

    document.getElementById("exam").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");

}