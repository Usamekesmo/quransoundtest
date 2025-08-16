// =================================================================================
//  رفيق الحفظ المتقدم - ملف الجافاسكريبت الرئيسي
// =================================================================================

// --- تعليقات توضيحية للكود ---
// هذا الملف يحتوي على كل المنطق البرمجي للتطبيق.
// وهو مقسم إلى الأقسام التالية:
// 1.  DOM Element Variables: للوصول إلى عناصر HTML.
// 2.  State & Definitions: لتخزين حالة التطبيق والبيانات الثابتة.
// 3.  Initialization: ما يحدث عند تحميل الصفحة.
// 4.  Event Listeners: لربط الأزرار والنقرات بالدوال.
// 5.  Core User Data & UI Management: دوال لإدارة بيانات المستخدم وتحديث الواجهة.
// 6.  Advanced Feature Functions: دوال الميزات المتقدمة (المراجعة الذكية، الخريطة الحرارية، إلخ).
// 7.  Core Quiz Functions: دوال إدارة سير الاختبار.
// 8.  All Question Generators: دوال إنشاء كل نوع من أنواع الأسئلة.
// =================================================================================


// --- 1. DOM Element Variables ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const errorReviewScreen = document.getElementById('error-review-screen');
const resultScreen = document.getElementById('result-screen');
const profileScreen = document.getElementById('profile-screen');
const loader = document.getElementById('loader');
const userNameInput = document.getElementById('userName');
const pageNumberInput = document.getElementById('pageNumber');
const startButton = document.getElementById('startButton');
const profileButton = document.getElementById('profileButton');
const questionArea = document.getElementById('question-area');
const feedbackArea = document.getElementById('feedback-area');
const progressCounter = document.getElementById('progress-counter');
const progressBar = document.getElementById('progress-bar');
const errorList = document.getElementById('error-list');
const showFinalResultButton = document.getElementById('show-final-result-button');
const challengeLinkInput = document.getElementById('challenge-link');
const welcomeName = document.getElementById('welcome-name');
const userTitle = document.getElementById('user-title');
const profileName = document.getElementById('profileName');
const resultName = document.getElementById('resultName');
const finalScore = document.getElementById('finalScore');
const xpGainedText = document.getElementById('xp-gained-text');
const smartReviewBtn = document.getElementById('smart-review-btn');
const hifzHeatmap = document.getElementById('hifz-heatmap');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const meaningBtn = document.getElementById('meaning-btn');
const meaningModal = document.getElementById('meaning-modal');
const closeMeaningModal = document.getElementById('close-meaning-modal');
const meaningContent = document.getElementById('meaning-content');
const advancedStatsContainer = document.getElementById('advanced-stats-container');
const shareCardBtn = document.getElementById('share-card-btn');
const hafizCard = document.getElementById('hafiz-card');
const motivationFeatures = document.getElementById('motivation-features');
const streakCounter = document.getElementById('streak-counter');
const xpText = document.getElementById('xp-text');
const xpBar = document.getElementById('xp-bar');
const achievementsCounter = document.getElementById('achievements-counter');
const dailyRewardModal = document.getElementById('daily-reward-modal');
const closeDailyModal = document.getElementById('close-daily-modal');
const rewardText = document.getElementById('reward-text');
const progressTreeContainer = document.getElementById('progress-tree-container');
const progressTree = document.getElementById('progress-tree');
const masteredPagesCount = document.getElementById('mastered-pages-count');
const achievementsContainer = document.getElementById('achievements-container');

// --- 2. State & Definitions ---
let pageAyahs = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 10;
let audioQueue = [];
let audioPlayer = new Audio();
let errorLog = [];
let currentQuestionData = {};
let currentAyahForMeaning = null;

const motivationalMessages = {
    comeback: "أهلاً بعودتك! سعداء برؤيتك مجدداً. لنكمل رحلة المراجعة.",
    perfectScore: "ما شاء الله! درجة كاملة! هذا إتقان حقيقي.",
    newBest: "تقدم ملحوظ ومبارك. استمر على هذا المنوال.",
    struggle: "لا بأس، كل الحفاظ يمرون بهذه المرحلة. خذ نفساً عميقاً وأكمل."
};
const achievements = {
    firstTest: { id: 'firstTest', title: 'الحافظ الجديد', desc: 'أكمل أول اختبار لك بنجاح.', unlocked: false },
    tenTests: { id: 'tenTests', title: 'المثابر', desc: 'أكمل 10 اختبارات.', unlocked: false },
    perfectScore: { id: 'perfectScore', title: 'المتقِن', desc: 'حقق الدرجة الكاملة في أي اختبار.', unlocked: false },
    fivePerfect: { id: 'fivePerfect', title: 'نجم الحفظ', desc: 'حقق الدرجة الكاملة في 5 صفحات مختلفة.', unlocked: false },
    sendChallenge: { id: 'sendChallenge', title: 'المتحدي', desc: 'أرسل تحدياً إلى صديق.', unlocked: false }
};
const levels = [0, 100, 250, 500, 1000, 2000, 5000, 10000];
const titles = ["حافظ ناشئ", "حافظ مجتهد", "حافظ متقدم", "حافظ متقن", "نجم الحفظ", "سيد الحفاظ", "إمام الحفاظ"];
const dailyRewards = [
    { type: 'xp', value: 50, text: "لقد حصلت على 50 نقطة خبرة إضافية!" },
    { type: 'info', text: "معلومة: أطول سورة في القرآن هي سورة البقرة." }
];

const shuffleArray = array => array.sort(() => 0.5 - Math.random());

// --- 3. Initialization ---
window.onload = () => {
    const lastUsedName = localStorage.getItem('lastUserName');
    if (lastUsedName) {
        userNameInput.value = lastUsedName;
        updateAllUI(lastUsedName);
    }
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = "الوضع النهاري";
    }
};

// --- 4. Event Listeners ---
startButton.addEventListener('click', startStandardTest);
profileButton.addEventListener('click', () => showProfileScreen(userNameInput.value));
themeToggleBtn.addEventListener('click', toggleTheme);
smartReviewBtn.addEventListener('click', startSmartReview);
meaningBtn.addEventListener('click', showMeaning);
closeMeaningModal.onclick = () => meaningModal.style.display = "none";
closeDailyModal.onclick = () => dailyRewardModal.style.display = "none";
shareCardBtn.addEventListener('click', generateAndShareCard);
showFinalResultButton.addEventListener('click', () => {
    errorReviewScreen.classList.add('hidden');
    showResults();
});
userNameInput.addEventListener('input', () => updateAllUI(userNameInput.value));

// --- 5. Core User Data & UI Management ---

/**
 * يجلب بيانات المستخدم من localStorage أو يعيد كائنًا افتراضيًا.
 * @param {string} userName - اسم المستخدم.
 * @returns {object} - كائن بيانات المستخدم.
 */
function getUserData(userName) {
    const defaultData = {
        xp: 0, level: 1, lastTestDate: null, testsCompleted: 0,
        pageScores: {}, errorTypes: {},
// --- تتمة الكود ---
        totalCorrect: 0,
        streak: 0,
        lastRewardDate: null,
        achievements: JSON.parse(JSON.stringify(achievements))
    };
    const data = localStorage.getItem(`userData_${userName}`);
    // دمج البيانات المحفوظة مع الافتراضية لضمان وجود كل المفاتيح
    return data ? { ...defaultData, ...JSON.parse(data) } : defaultData;
}

/**
 * يحفظ كائن بيانات المستخدم في localStorage.
 * @param {string} userName - اسم المستخدم.
 * @param {object} data - كائن بيانات المستخدم للحفظ.
 */
function saveUserData(userName, data) {
    localStorage.setItem(`userData_${userName}`, JSON.stringify(data));
}

/**
 * يحدّث كل عناصر الواجهة التي تعتمد على بيانات المستخدم.
 * @param {string} userName - اسم المستخدم الحالي.
 */
function updateAllUI(userName) {
    if (!userName) {
        welcomeName.textContent = '';
        userTitle.textContent = '';
        return;
    }
    const userData = getUserData(userName);
    welcomeName.textContent = userName;
    userTitle.textContent = titles[userData.level - 1] || titles[titles.length - 1];
    
    streakCounter.textContent = userData.streak;
    achievementsCounter.textContent = Object.values(userData.achievements).filter(a => a.unlocked).length;

    const currentLevelXP = levels[userData.level - 1];
    const nextLevelXP = levels[userData.level] || (currentLevelXP * 2);
    const xpInLevel = userData.xp - currentLevelXP;
    const xpForLevel = nextLevelXP - currentLevelXP;
    const xpPercentage = Math.min(100, (xpInLevel / xpForLevel) * 100);
    xpBar.style.width = `${xpPercentage}%`;
    xpText.textContent = `المستوى ${userData.level} (${xpInLevel}/${xpForLevel})`;
}

/**
 * يعرض شاشة الملف الشخصي مع كل بيانات المستخدم.
 * @param {string} userName - اسم المستخدم.
 */
function showProfileScreen(userName) {
    if (!userName) {
        alert('الرجاء إدخال اسمك أولاً.');
        return;
    }
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    profileScreen.classList.remove('hidden');
    profileName.textContent = userName;
    
    const userData = getUserData(userName);
    const masteredCount = Object.values(userData.pageScores || {}).filter(s => s === 10).length;
    masteredPagesCount.textContent = masteredCount;
    const treeEmojis = ['🌱', '🌿', '🌳', '🌳✨', '🌳🌟'];
    const treeIndex = Math.min(Math.floor(masteredCount / 50), treeEmojis.length - 1);
    progressTree.textContent = treeEmojis[treeIndex];

    achievementsContainer.innerHTML = '';
    for (const key in userData.achievements) {
        const ach = userData.achievements[key];
        const card = document.createElement('div');
        card.className = `achievement-card ${ach.unlocked ? 'unlocked' : ''}`;
        card.innerHTML = `<div class="icon">${ach.unlocked ? '✅' : '🔒'}</div><h5>${ach.title}</h5>`;
        achievementsContainer.appendChild(card);
    }

    buildHeatmap(userName);
    showAdvancedStats(userName);
}

/**
 * يعرض شاشة البداية ويخفي الشاشات الأخرى.
 */
function showStartScreen() {
    profileScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    updateAllUI(userNameInput.value);
}

// --- 6. Advanced Feature Functions ---

/**
 * يبدل بين الوضع النهاري والليلي.
 */
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = "الوضع النهاري";
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = "الوضع الليلي";
    }
}

/**
 * يبدأ اختباراً على صفحة مقترحة بذكاء.
 */
function startSmartReview() {
    const userName = userNameInput.value;
    if (!userName) {
        alert('الرجاء إدخال اسمك أولاً.');
        return;
    }
    const userData = getUserData(userName);
    let pageToReview = 1;
    const weakPages = Object.entries(userData.pageScores || {})
        .filter(([page, score]) => score < 8)
        .map(([page, score]) => parseInt(page));
    
    if (weakPages.length > 0) {
        pageToReview = weakPages[Math.floor(Math.random() * weakPages.length)];
        alert(`المراجعة الذكية: سنراجع اليوم صفحة ${pageToReview} لأنها تحتاج لبعض التركيز.`);
    } else {
        pageToReview = Math.floor(Math.random() * 604) + 1;
        alert(`المراجعة الذكية: تم اختيار صفحة ${pageToReview} عشوائياً لتنشيط الذاكرة.`);
    }
    
    pageNumberInput.value = pageToReview;
    startStandardTest();
}

/**
 * ينشئ ويعرض خريطة الحفظ الحرارية.
 * @param {string} userName - اسم المستخدم.
 */
function buildHeatmap(userName) {
    const userData = getUserData(userName);
    hifzHeatmap.innerHTML = '';
    for (let i = 1; i <= 604; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        const score = userData.pageScores?.[i];
        let level = 0;
        if (score === 10) level = 4;
        else if (score >= 8) level = 3;
        else if (score >= 5) level = 2;
        else if (score > 0) level = 1;
        cell.dataset.level = level;
        cell.innerHTML = `<span class="tooltip">صفحة ${i}<br>أفضل درجة: ${score || 'لم تختبر'}</span>`;
        hifzHeatmap.appendChild(cell);
    }
}

/**
 * يجلب ويعرض تفسير الآية الحالية.
 */
async function showMeaning() {
    if (!currentAyahForMeaning) return;
    meaningModal.style.display = 'block';
    meaningContent.innerHTML = '<div class="loader"></div>';
    
    try {
        const response = await fetch(`https://api.quran.com/api/v4/quran/tafsirs/1?verse_key=${currentAyahForMeaning.surah.number}:${currentAyahForMeaning.numberInSurah}`);
        const data = await response.json();
        if (data.tafsir) {
            meaningContent.innerHTML = `
                <h4>تفسير ميسر للآية:</h4>
                <p>${currentAyahForMeaning.text} [${currentAyahForMeaning.surah.name}: ${currentAyahForMeaning.numberInSurah}]</p>
                <p>${data.tafsir.text.replace(/<[^>]*>/g, '')}</p>
            `;
        } else { throw new Error('Tafsir not found'); }
    } catch (error) {
        meaningContent.innerHTML = '<p>عفواً، لم نتمكن من جلب التفسير حالياً.</p>';
        console.error("Tafsir API error:", error);
    }
}

/**
 * يعرض رسالة تشجيعية بناءً على سياق معين.
 * @param {string} type - نوع الرسالة (perfectScore, newBest, etc.).
 */
function showMotivationalMessage(type) {
    const message = motivationalMessages[type];
    if (message) {
        feedbackArea.textContent = message;
        feedbackArea.className = 'motivational-feedback';
        feedbackArea.classList.remove('hidden');
    }
}

/**
 * ينشئ صورة لبطاقة الحافظ ويسمح بتنزيلها.
 */
function generateAndShareCard() {
    const userName = userNameInput.value;
    if (!userName) return;
    const userData = getUserData(userName);
    const masteredCount = Object.values(userData.pageScores || {}).filter(s => s === 10).length;
    const unlockedAchievements = Object.values(userData.achievements).filter(a => a.unlocked).length;
    
    document.getElementById('card-name').textContent = userName;
    document.getElementById('card-title').textContent = titles[userData.level - 1] || '';
    document.getElementById('card-level').textContent = userData.level;
    document.getElementById('card-mastered').textContent = masteredCount;
    document.getElementById('card-achievements').textContent = unlockedAchievements;
    const treeEmojis = ['🌱', '🌿', '🌳', '🌳✨', '🌳🌟'];
    const treeIndex = Math.min(Math.floor(masteredCount / 50), treeEmojis.length - 1);
    document.getElementById('card-tree').textContent = treeEmojis[treeIndex];

    hafizCard.style.display = 'block';
    html2canvas(hafizCard, { backgroundColor: null, scale: 2 }).then(canvas => {
        hafizCard.style.display = 'none';
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `بطاقة-الحافظ-${userName}.png`;
        link.click();
    });
}

// --- 7. Core Quiz Functions ---

/**
 * يبدأ اختباراً عادياً بناءً على المدخلات.
 */
async function startStandardTest() {
    const userName = userNameInput.value;
    const pageNumber = pageNumberInput.value;
    if (!userName || !pageNumber) {
        alert('الرجاء إدخال اسم ورقم صفحة.');
        return;
    }
    localStorage.setItem('lastUserName', userName);
    const success = await fetchDataForPage(pageNumber);
    if (success) {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        profileScreen.classList.add('hidden');
        currentQuestionIndex = 0;
        score = 0;
        errorLog = [];
        displayQuestion();
    }
}

/**
 * يجلب بيانات الصفحة من الواجهة البرمجية.
 * @param {number} pageNumber - رقم الصفحة.
 * @returns {boolean} - true إذا نجح، false إذا فشل.
 */
async function fetchDataForPage(pageNumber) {
    loader.classList.remove('hidden');
    startButton.disabled = true;
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/page/${pageNumber}/ar.alafasy`);
        const pageData = await response.json();
        loader.classList.add('hidden');
        startButton.disabled = false;
        if (pageData.code === 200 && pageData.data.ayahs.length > 0) {
            pageAyahs = pageData.data.ayahs;
            return true;
        } else {
            alert('حدث خطأ في جلب بيانات الصفحة.');
            return false;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        loader.classList.add('hidden');
        startButton.disabled = false;
        alert('لا يمكن الوصول إلى الخادم. تحقق من اتصالك بالإنترنت.');
        return false;
    }
}

/**
 * يعرض سؤالاً جديداً أو ينهي الاختبار.
 */
function displayQuestion() {
    if (currentQuestionIndex >= totalQuestions) {
        endQuiz();
        return;
    }
    updateProgress();
    feedbackArea.classList.add('hidden');
    meaningBtn.classList.add('hidden');
    const questionTypes = ['chooseNext', 'choosePrevious', 'locateAyah', 'completeAyah', 'completeLastWord', 'linkStartEnd'];
    const randomType = shuffleArray(questionTypes)[0];
    questionArea.innerHTML = `<div class="loader"></div>`;
    setTimeout(() => {
        try {
            currentQuestionData = { type: randomType };
            switch (randomType) {
                case 'chooseNext': generateChooseNextQuestion(); break;
                case 'choosePrevious': generateChoosePreviousQuestion(); break;
                case 'locateAyah': generateLocateAyahQuestion(); break;
                case 'completeAyah': generateCompleteAyahQuestion(); break;
                case 'completeLastWord': generateCompleteLastWordQuestion(); break;
                case 'linkStartEnd': generateLinkStartEndQuestion(); break;
                default: generateChooseNextQuestion();
            }
        } catch (e) {
            console.error("Failed to generate question type:", randomType, e);
            generateChooseNextQuestion();
        }
        currentQuestionIndex++;
    }, 300);
}

/**
 * يعالج نتيجة إجابة المستخدم.
 * @param {boolean} isCorrect - هل الإجابة صحيحة؟
 * @param {string} correctAnswerText - نص الإجابة الصحيحة.
 * @param {object} questionAyah - كائن الآية المتعلق بالسؤال.
 */
function handleResult(isCorrect, correctAnswerText, questionAyah) {
    const interactiveElements = questionArea.querySelectorAll('.choice-box, .option-div, button');
    interactiveElements.forEach(el => el.style.pointerEvents = 'none');
    
    if (isCorrect) {
        score++;
        feedbackArea.textContent = 'إجابة صحيحة! أحسنت.';
        feedbackArea.className = 'correct-feedback';
        currentAyahForMeaning = questionAyah;
        meaningBtn.classList.remove('hidden');
    } else {
        feedbackArea.textContent = `إجابة خاطئة.`;
        feedbackArea.className = 'wrong-feedback';
        currentQuestionData.correctAnswer = correctAnswerText;
        currentQuestionData.questionHTML = questionArea.innerHTML;
        errorLog.push(currentQuestionData);
        
        const userData = getUserData(userNameInput.value);
        const questionType = currentQuestionData.type;
        userData.errorTypes[questionType] = (userData.errorTypes[questionType] || 0) + 1;
        saveUserData(userNameInput.value, userData);
    }
    feedbackArea.classList.remove('hidden');
    setTimeout(displayQuestion, 3000);
}

/**
 * ينهي الاختبار ويعرض شاشة الأخطاء أو النتائج.
 */
function endQuiz() {
    progressBar.style.width = '100%';
    if (errorLog.length > 0) {
        quizScreen.classList.add('hidden');
        errorReviewScreen.classList.remove('hidden');
        displayErrorReview();
    } else {
        showResults();
    }
}

/**
 * يعرض قائمة بالأسئلة التي أخطأ فيها المستخدم.
 */
function displayErrorReview() {
    errorList.innerHTML = '';
    errorLog.forEach(error => {
        const item = document.createElement('div');
        item.className = 'error-review-item';
        item.innerHTML = `<h4>سؤال خاطئ</h4>
                          <div>${error.questionHTML.replace(/<button.*<\/button>/g, '')}</div>
                          <p>الإجابة الصحيحة: <span class="correct-text">${error.correctAnswer}</span></p>`;
        item.querySelectorAll('.choice-box, .option-div, .number-box').forEach(el => {
            el.style.pointerEvents = 'none';
            if (el.dataset.correct !== 'true') {
                el.style.opacity = '0.5';
            } else {
                el.classList.add('correct-answer');
            }
        });
        errorList.appendChild(item);
    });
}

/**
 * يعرض شاشة النتائج النهائية ويحفظ تقدم المستخدم.
 */
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    const userName = userNameInput.value;
    const page = pageNumberInput.value;
    
    resultName.textContent = userName;
    finalScore.textContent = `${score} من ${totalQuestions}`;
    
    const xpGained = 10 + (score * 2);
    xpGainedText.textContent = xpGained;
    
    let userData = getUserData(userName);
    userData.xp = (userData.xp || 0) + xpGained;
    userData.totalCorrect = (userData.totalCorrect || 0) + score;
    userData.testsCompleted = (userData.testsCompleted || 0) + 1;

    const oldBestScore = userData.pageScores?.[page] || 0;
    if (score > oldBestScore) {
        showMotivationalMessage('newBest');
        userData.pageScores = { ...userData.pageScores, [page]: score };
    }
    if (score === totalQuestions) {
        showMotivationalMessage('perfectScore');
    }

    // Level up check
    const currentLevel = userData.level;
    while (userData.xp >= (levels[userData.level] || Infinity)) {
        userData.level++;
    }
    if (userData.level > currentLevel) {
        alert(`🎉 تهانينا! لقد وصلت إلى المستوى ${userData.level}!`);
    }

    // Daily Streak & Reward
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (userData.lastTestDate === yesterday) {
        userData.streak++;
    } else if (userData.lastTestDate !== today) {
        userData.streak = 1;
    }
    if (userData.lastRewardDate !== today) {
        grantDailyReward(userName);
        userData.lastRewardDate = today;
    }
    userData.lastTestDate = today;

    // Achievements
    checkAndGrantAchievements(userName, score, totalQuestions);

    saveUserData(userName, userData);
    generateChallengeLink();
    updateAllUI(userName);
}

/**
 * يمنح المستخدم مكافأة يومية.
 * @param {string} userName - اسم المستخدم.
 */
function grantDailyReward(userName) {
    const reward = shuffleArray(dailyRewards)[0];
    rewardText.textContent = reward.text;
    if (reward.type === 'xp') {
        let userData = getUserData(userName);
        userData.xp += reward.value;
        saveUserData(userName, userData);
    }
    dailyRewardModal.style.display = 'block';
}

/**
 * يتحقق من استحقاق المستخدم لأي إنجازات جديدة.
 * @param {string} userName - اسم المستخدم.
 * @param {number} score - درجة الاختبار الحالي.
 * @param {number} totalQuestions - إجمالي أسئلة الاختبار.
 */
function checkAndGrantAchievements(userName, score, totalQuestions) {
    let userData = getUserData(userName);
    let newAchievement = false;
    
    if (!userData.achievements.firstTest.unlocked) {
        userData.achievements.firstTest.unlocked = true; newAchievement = true;
    }
    if (userData.testsCompleted >= 10 && !userData.achievements.tenTests.unlocked) {
        userData.achievements.tenTests.unlocked = true; newAchievement = true;
    }
    if (score === totalQuestions && !userData.achievements.perfectScore.unlocked) {
        userData.achievements.perfectScore.unlocked = true; newAchievement = true;
    }
    const perfectScoresCount = Object.values(userData.pageScores).filter(s => s === 10).length;
    if (perfectScoresCount >= 5 && !userData.achievements.fivePerfect.unlocked) {
        userData.achievements.fivePerfect.unlocked = true; newAchievement = true;
    }
    
    if (newAchievement) {
        alert("🎉 لقد حصلت على إنجاز جديد! تفحصه في ملفك الشخصي.");
        saveUserData(userName, userData);
    }
}

/**
 * ينسخ رابط التحدي ويمنح إنجازاً.
 */
function copyChallengeLink() {
    challengeLinkInput.select();
    document.execCommand('copy');
    alert('تم نسخ رابط التحدي!');
    
    let userData = getUserData(userNameInput.value);
    if (!userData.achievements.sendChallenge.unlocked) {
        userData.achievements.sendChallenge.unlocked = true;
        alert("🎉 لقد حصلت على إنجاز 'المتحدي'!");
        saveUserData(userNameInput.value, userData);
    }
}

/**
 * يحدّث شريط التقدم.
 */
function updateProgress() {
    progressCounter.textContent = `السؤال ${currentQuestionIndex + 1} من ${totalQuestions}`;
    progressBar.style.width = `${((currentQuestionIndex) / totalQuestions) * 100}%`;
}

/**
 * ينشئ رابط تحدي.
 */
function generateChallengeLink() {
    const params = {
        page: pageNumberInput.value,
        count: totalQuestions
    };
    const encodedParams = btoa(JSON.stringify(params));
    const link = `${window.location.origin}${window.location.pathname}?challenge=${encodedParams}`;
    challengeLinkInput.value = link;
}

/**
 * يعرض الإحصائيات المتقدمة للمستخدم.
 * @param {string} userName - اسم المستخدم.
 */
function showAdvancedStats(userName) {
    const userData = getUserData(userName);
    const totalQuestionsAnswered = userData.testsCompleted * totalQuestions;
    const accuracy = totalQuestionsAnswered > 0 ? Math.round((userData.totalCorrect / totalQuestionsAnswered) * 100) : 0;
    
    const weakPoint = Object.entries(userData.errorTypes)
                        .sort((a, b) => b[1] - a[1])[0]?.[0] || "لا يوجد";

    advancedStatsContainer.innerHTML = `
        <div class="stat-card"><h5>معدل الدقة</h5><p>${accuracy}%</p></div>
        <div class="stat-card"><h5>نقطة للتحسين</h5><p>${weakPoint}</p></div>
        <div class="stat-card"><h5>إجمالي الاختبارات</h5><p>${userData.testsCompleted}</p></div>
    `;
}

// --- 8. All Question Generators ---

/**
 * دالة مساعدة لربط الأحداث بخيارات الإجابة.
 * @param {string} correctAnswerText - نص الإجابة الصحيحة.
 * @param {object} questionAyah - كائن الآية المتعلق بالسؤال.
 */
function addChoiceListeners(correctAnswerText, questionAyah) {
    questionArea.querySelectorAll('.choice-box, .option-div').forEach(el => {
        if (el.dataset.listenerAttached) return;
        el.dataset.listenerAttached = 'true';
        el.addEventListener('click', () => {
            const isCorrect = el.dataset.correct === 'true';
            handleResult(isCorrect, correctAnswerText, questionAyah);
            el.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
            if (!isCorrect) {
                const correctEl = questionArea.querySelector('[data-correct="true"]');
                if (correctEl) correctEl.classList.add('correct-answer');
            }
        });
    });
}

function generateChooseNextQuestion() {
    if (pageAyahs.length < 2) return generateCompleteLastWordQuestion();
    const startIndex = Math.floor(Math.random() * (pageAyahs.length - 1));
    const questionAyah = pageAyahs[startIndex];
    const correctNextAyah = pageAyahs[startIndex + 1];
    let wrongOptions = pageAyahs.filter(a => a.number !== correctNextAyah.number && a.number !== questionAyah.number).slice(0, 2);
    const options = shuffleArray([correctNextAyah, ...wrongOptions]);
    questionArea.innerHTML = `<h3>السؤال ${currentQuestionIndex}: اختر الآية التالية</h3><audio controls autoplay src="${questionAyah.audio}"></audio>${options.map(opt => `<div class="option-div" data-correct="${opt.number === correctNextAyah.number}">${opt.text}</div>`).join('')}`;
    addChoiceListeners(correctNextAyah.text, questionAyah);
}

function generateChoosePreviousQuestion() {
    if (pageAyahs.length < 2) return generateChooseNextQuestion();
    const startIndex = Math.floor(Math.random() * (pageAyahs.length - 1)) + 1;
    const questionAyah = pageAyahs[startIndex];
    const correctPreviousAyah = pageAyahs[startIndex - 1];
    let wrongOptions = pageAyahs.filter(a => a.number !== correctPreviousAyah.number && a.number !== questionAyah.number).slice(0, 2);
    const options = shuffleArray([correctPreviousAyah, ...wrongOptions]);
    questionArea.innerHTML = `<h3>السؤال ${currentQuestionIndex}: اختر الآية السابقة</h3><audio controls autoplay src="${questionAyah.audio}"></audio>${options.map(opt => `<div class="option-div" data-correct="${opt.number === correctPreviousAyah.number}">${opt.text}</div>`).join('')}`;
    addChoiceListeners(correctPreviousAyah.text, questionAyah);
}

function generateLocateAyahQuestion() {
    const ayahIndex = Math.floor(Math.random() * pageAyahs.length);
    const questionAyah = pageAyahs[ayahIndex];
    const totalAyahs = pageAyahs.length;
    let correctLocation;
    if (ayahIndex < totalAyahs / 3) correctLocation = 'بداية';
    else if (ayahIndex < (totalAyahs * 2) / 3) correctLocation = 'وسط';
    else correctLocation = 'نهاية';
    questionArea.innerHTML = `<h3>السؤال ${currentQuestionIndex}: أين يقع موضع هذه الآية في الصفحة؟</h3><audio controls autoplay src="${questionAyah.audio}"></audio><div class="interactive-area">${['بداية', 'وسط', 'نهاية'].map(loc => `<div class="choice-box" data-correct="${loc === correctLocation}">${loc} الصفحة</div>`).join('')}</div>`;
    addChoiceListeners(`${correctLocation} الصفحة`, questionAyah);
}

function generateCompleteAyahQuestion() {
    const longAyahs = pageAyahs.filter(a => a.text.split(' ').length > 8);
    if (longAyahs.length < 3) return generateChooseNextQuestion();
    const questionAyah = shuffleArray(longAyahs)[0];
    const words = questionAyah.text.split(' ');
    const splitPoint = Math.floor(words.length / 2);
    const firstHalfText = words.slice(0, splitPoint).join(' ');
    const correctSecondHalf = words.slice(splitPoint).join(' ');
    const wrongAyahs = pageAyahs.filter(a => a.number !== questionAyah.number);
    const wrongOptions = shuffleArray(wrongAyahs).slice(0, 2).map(a => {
        const wrongWords = a.text.split(' ');
        const wrongSplitPoint = Math.floor(wrongWords.length / 2);
        return wrongWords.slice(wrongSplitPoint).join(' ');
    });
    const options = shuffleArray([correctSecondHalf, ...wrongOptions]);
    questionArea.innerHTML = `<h3>السؤال ${currentQuestionIndex}: أكمل الآية</h3><p style="font-family: 'Amiri', serif; font-size: 22px;">"${firstHalfText}..."</p><audio controls autoplay src="${questionAyah.audio}"></audio>${options.map(opt => `<div class="option-div" data-correct="${opt.replace(/'/g, "\\'") === correctSecondHalf.replace(/'/g, "\\'")}">${opt}</div>`).join('')}`;
    addChoiceListeners(correctSecondHalf, questionAyah);
}

function generateCompleteLastWordQuestion() {
    const suitableAyahs = pageAyahs.filter(a => a.text.split(' ').length > 3);
    if (suitableAyahs.length < 4) return generateChooseNextQuestion();
    const questionAyah = shuffleArray(suitableAyahs)[0];
    const words = questionAyah.text.split(' ');
    const correctLastWord = words.pop();
    const incompleteAyahText = words.join(' ');
    const wrongOptions = shuffleArray(suitableAyahs.filter(a => a.number !== questionAyah.number)).slice(0, 3).map(a => a.text.split(' ').pop());
    const options = shuffleArray([correctLastWord, ...wrongOptions]);
    questionArea.innerHTML = `<h3>السؤال ${currentQuestionIndex}: أكمل الكلمة الأخيرة</h3><p style="font-family: 'Amiri', serif; font-size: 22px;">${incompleteAyahText} (...)</p><audio controls autoplay src="${questionAyah.audio}"></audio><div class="interactive-area">${options.map(opt => `<div class="choice-box" data-correct="${opt === correctLastWord}">${opt}</div>`).join('')}</div>`;
    addChoiceListeners(correctLastWord, questionAyah);
}

function generateLinkStartEndQuestion() {
    const suitableAyahs = pageAyahs.filter(a => a.text.split(' ').length > 5);
    if (suitableAyahs.length < 4) return generateChooseNextQuestion();
    const questionAyah = shuffleArray(suitableAyahs)[0];
    const words = questionAyah.text.split(' ');
    const startText = words.slice(0, 3).join(' ') + '...';
    const correctEnding = '...' + words.slice(-3).join(' ');
    const wrongOptions = shuffleArray(suitableAyahs.filter(a => a.number !== questionAyah.number))
        .slice(0, 3)
        .map(a => '...' + a.text.split(' ').slice(-3).join(' '));
    const options = shuffleArray([correctEnding, ...wrongOptions]);
    questionArea.innerHTML = `<h3>السؤال ${currentQuestionIndex}: اربط بداية الآية بنهايتها</h3><p style="font-family: 'Amiri', serif; font-size: 22px; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">"${startText}"</p>${options.map(opt => `<div class="option-div" data-correct="${opt === correctEnding}">${opt}</div>`).join('')}`;
    addChoiceListeners(correctEnding, questionAyah);
}
