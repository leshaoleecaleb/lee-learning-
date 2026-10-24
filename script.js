"use strict";

/* ==========================================
   AZ-900 SMART PREP HUB
   STEP 2: SMART QUIZ BUILDER
   ========================================== */

const STORAGE_KEYS = {
  attempts: "az900_quiz_attempts_v1",
  flashcards: "az900_flashcard_progress_v1",
  planner: "az900_study_plan_v1"
};

const TOPICS = {
  cloud: "Cloud Concepts",
  architecture: "Azure Architecture and Services",
  management: "Azure Management and Governance"
};

/*
  Original educational practice questions.
  These are not official Microsoft exam questions.
*/

const QUESTIONS = [
  {
    id: 1,
    topic: "cloud",
    question: "What is cloud computing?",
    options: [
      "Using only physical computers inside your home",
      "Delivering computing services over the internet",
      "A programming language used to build websites",
      "A method of printing documents remotely"
    ],
    answer: 1,
    explanation: "Cloud computing delivers services such as computing power, storage and databases over a network, usually the internet. It allows people and organizations to use resources without owning all the underlying hardware."
  },
  {
    id: 2,
    topic: "cloud",
    question: "A company wants to avoid buying servers before knowing how much computing power it needs. Which cloud benefit helps most?",
    options: [
      "High availability",
      "Physical access to every server",
      "Scalability and flexible resource usage",
      "The permanent removal of all IT costs"
    ],
    answer: 2,
    explanation: "Cloud resources can be increased or decreased as demand changes. The company can start with what it needs and adjust later rather than purchasing all its hardware upfront."
  },
  {
    id: 3,
    topic: "cloud",
    question: "Which cloud model combines a private environment with public cloud services?",
    options: [
      "Hybrid cloud",
      "Private cloud only",
      "Public cloud only",
      "Offline cloud"
    ],
    answer: 0,
    explanation: "A hybrid cloud combines private cloud or on-premises infrastructure with public cloud services. For example, a company might keep some sensitive systems in its own environment while hosting its public website in Azure."
  },
  {
    id: 4,
    topic: "cloud",
    question: "What does the consumption-based pricing model generally mean?",
    options: [
      "You must buy the same amount of resources every year",
      "All cloud services are free",
      "You pay only once for every service forever",
      "You are charged according to the resources or services you use"
    ],
    answer: 3,
    explanation: "Consumption-based pricing generally charges you for the resources you consume. Exact billing depends on the service, pricing plan and contract, so you should review the applicable rates."
  },
  {
    id: 5,
    topic: "cloud",
    question: "Which cloud service model gives customers the most control over the operating system of a virtual machine?",
    options: [
      "SaaS",
      "IaaS",
      "PaaS",
      "A fully managed application with no server access"
    ],
    answer: 1,
    explanation: "Infrastructure as a Service (IaaS) provides infrastructure such as virtual machines. Customers generally manage the operating system and applications, while the cloud provider manages the underlying physical infrastructure."
  },
  {
    id: 6,
    topic: "architecture",
    question: "Which Azure service lets you run code in response to events without managing virtual machines?",
    options: [
      "Azure Functions",
      "Azure Virtual Network",
      "Azure DNS",
      "Azure Files"
    ],
    answer: 0,
    explanation: "Azure Functions is an event-driven compute service. It can run code when events occur, such as an HTTP request or a message arriving in a queue, without requiring you to manage virtual machines."
  },
  {
    id: 7,
    topic: "architecture",
    question: "What is the main purpose of an Azure region?",
    options: [
      "To store only a user's passwords",
      "To replace every network connection",
      "To identify a geographic area containing Azure datacenters",
      "To create a billing invoice automatically"
    ],
    answer: 2,
    explanation: "An Azure region is a geographic area containing one or more datacenters connected through a dedicated regional network. Choosing a region can affect latency, data residency and service availability."
  },
  {
    id: 8,
    topic: "architecture",
    question: "Which Azure service provides a logically isolated network for Azure resources?",
    options: [
      "Azure Monitor",
      "Microsoft Entra ID",
      "Azure Policy",
      "Azure Virtual Network"
    ],
    answer: 3,
    explanation: "Azure Virtual Network (VNet) allows Azure resources to communicate privately with each other, the internet and on-premises networks, subject to the configured network rules and connectivity."
  },
  {
    id: 9,
    topic: "architecture",
    question: "What is the primary purpose of Azure Availability Zones?",
    options: [
      "To create usernames for employees",
      "To separate resources into distinct datacenter locations within a region",
      "To automatically write application code",
      "To replace resource groups"
    ],
    answer: 1,
    explanation: "Availability Zones are physically separate locations within an Azure region, with independent infrastructure such as power and cooling. Deploying supported resources across zones can improve resilience against a zonal failure."
  },
  {
    id: 10,
    topic: "architecture",
    question: "Which Azure compute service is designed to host web applications without requiring you to manage the underlying servers?",
    options: [
      "Azure App Service",
      "Azure Virtual Network",
      "Azure Policy",
      "Azure Cost Management"
    ],
    answer: 0,
    explanation: "Azure App Service is a managed platform for hosting web applications and APIs. Azure handles much of the underlying infrastructure management so developers can focus on their applications."
  },
  {
    id: 11,
    topic: "management",
    question: "What is an Azure resource group?",
    options: [
      "A physical room containing servers",
      "A type of employee identity card",
      "A logical container for managing related Azure resources",
      "A replacement for all Azure subscriptions"
    ],
    answer: 2,
    explanation: "A resource group is a logical container for resources that you manage together. It helps organize resources and apply management operations, permissions and policies within the relevant scope."
  },
  {
    id: 12,
    topic: "management",
    question: "Which Microsoft service manages user identities and access to resources?",
    options: [
      "Azure Files",
      "Microsoft Entra ID",
      "Azure Bandwidth",
      "Azure Load Testing"
    ],
    answer: 1,
    explanation: "Microsoft Entra ID provides identity and access management. It supports capabilities such as authentication, application access and identity-based security controls."
  },
  {
    id: 13,
    topic: "management",
    question: "What is the purpose of Azure role-based access control (RBAC)?",
    options: [
      "To make every user a global administrator",
      "To increase internet speed",
      "To automatically delete old subscriptions",
      "To control who can perform which actions on Azure resources"
    ],
    answer: 3,
    explanation: "Azure RBAC assigns permissions through roles at scopes such as management groups, subscriptions, resource groups or individual resources. It helps give users only the access they need."
  },
  {
    id: 14,
    topic: "management",
    question: "Which Azure service can help enforce rules such as requiring certain tags on resources?",
    options: [
      "Azure Policy",
      "Azure Functions",
      "Azure DNS",
      "Azure Files"
    ],
    answer: 0,
    explanation: "Azure Policy helps assess and enforce organizational standards on resources. Policies can audit or require configurations, such as tags, allowed locations or supported security settings."
  },
  {
    id: 15,
    topic: "management",
    question: "Which Azure tool helps estimate the cost of Azure services before deploying them?",
    options: [
      "Microsoft Entra ID",
      "Azure Service Health",
      "Azure Pricing Calculator",
      "Azure Virtual Network"
    ],
    answer: 2,
    explanation: "The Azure Pricing Calculator lets you estimate costs for planned Azure configurations. Actual costs may differ because of usage, region, pricing terms and other billing factors."
  }
];

/* ==========================================
   SAFE LOCAL STORAGE HELPERS
   ========================================== */

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (saved === null) {
      return fallback;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.warn("Could not read saved data:", key, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save data:", error);
    alert(
      "Your browser could not save this progress. Check your browser storage settings."
    );
    return false;
  }
}

function getAttempts() {
  const saved = readStorage(STORAGE_KEYS.attempts, []);

  if (!Array.isArray(saved)) {
    return [];
  }

  return saved.filter((attempt) =>
    attempt &&
    typeof attempt.percentage === "number" &&
    typeof attempt.correct === "number" &&
    typeof attempt.total === "number"
  );
}
/* ==========================================
   DASHBOARD NAVIGATION
   ========================================== */

const navButtons = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const breadcrumb = document.getElementById("breadcrumb-page");

const pageNames = {
  dashboard: "Dashboard",
  quiz: "Smart Quiz Builder",
  flashcards: "Flashcard Coach",
  planner: "Personal Study Planner",
  buddy: "AI Study Buddy",
  readiness: "Readiness Tracker"
};

function openPage(pageId) {
  if (!pageNames[pageId]) {
    pageId = "dashboard";
  }

  pages.forEach((page) => {
    page.classList.toggle("active-page", page.id === pageId);
  });

  document.querySelectorAll(".nav-link").forEach((button) => {
    const active = button.dataset.page === pageId;

    button.classList.toggle("active", active);

    if (active) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  if (breadcrumb) {
    breadcrumb.textContent = pageNames[pageId];
  }

  if (window.location.hash !== `#${pageId}`) {
    history.replaceState(null, "", `#${pageId}`);
  }

  if (pageId === "quiz") {
    renderQuizHistory();
  }

  if (pageId === "readiness") {
    renderDashboardStats();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page);
  });
});

function openPageFromAddress() {
  const pageId = window.location.hash.slice(1);
  openPage(pageNames[pageId] ? pageId : "dashboard");
}

window.addEventListener("hashchange", openPageFromAddress);

/* ==========================================
   QUIZ ELEMENTS AND STATE
   ========================================== */

const quizSetup = document.getElementById("quiz-setup");
const quizGame = document.getElementById("quiz-game");
const quizResults = document.getElementById("quiz-results");

const topicSelect = document.getElementById("quiz-topic");
const lengthSelect = document.getElementById("quiz-length");
const startButton = document.getElementById("start-quiz");

const topicLabel = document.getElementById("quiz-topic-label");
const questionCount = document.getElementById("quiz-question-count");
const progressBar = document.getElementById("quiz-progress-bar");
const domainLabel = document.getElementById("quiz-domain");
const questionHeading = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("quiz-options");

const feedbackBox = document.getElementById("quiz-feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackExplanation = document.getElementById("feedback-explanation");

const submitButton = document.getElementById("submit-answer");
const nextButton = document.getElementById("next-question");
const quitButton = document.getElementById("quit-quiz");

let currentQuestions = [];
let currentIndex = 0;
let selectedAnswer = null;
let answerChecked = false;
let correctAnswers = 0;
let answerHistory = [];
let currentTopic = "all";
let currentLength = "5";

/* ==========================================
   START AND RUN QUIZZES
   ========================================== */

function shuffleArray(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function startQuiz() {
  currentTopic = topicSelect.value;
  currentLength = lengthSelect.value;

  let availableQuestions = QUESTIONS.filter((question) => {
    return currentTopic === "all" || question.topic === currentTopic;
  });

  availableQuestions = shuffleArray(availableQuestions);

  const requestedLength =
    currentLength === "all"
      ? availableQuestions.length
      : Number(currentLength);

  currentQuestions = availableQuestions.slice(0, requestedLength);

  if (currentQuestions.length === 0) {
    alert("No questions are available for this topic yet.");
    return;
  }

  currentIndex = 0;
  selectedAnswer = null;
  answerChecked = false;
  correctAnswers = 0;
  answerHistory = [];

  quizSetup.hidden = true;
  quizResults.hidden = true;
  quizGame.hidden = false;

  renderQuestion();
}

function renderQuestion() {
  const question = currentQuestions[currentIndex];

  if (!question) {
    finishQuiz();
    return;
  }

  selectedAnswer = null;
  answerChecked = false;

  topicLabel.textContent =
    currentTopic === "all"
      ? "All AZ-900 topics"
      : TOPICS[currentTopic];

  questionCount.textContent =
    `Question ${currentIndex + 1} of ${currentQuestions.length}`;

  progressBar.style.width =
    `${((currentIndex + 1) / currentQuestions.length) * 100}%`;

  domainLabel.textContent = TOPICS[question.topic].toUpperCase();
  questionHeading.textContent = question.question;

  optionsContainer.replaceChildren();

  feedbackBox.hidden = true;
  feedbackBox.classList.remove("feedback-incorrect");

  submitButton.hidden = false;
  submitButton.disabled = true;
  nextButton.hidden = true;

  const letters = ["A", "B", "C", "D"];

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "quiz-option";
    button.dataset.answer = String(index);
    button.setAttribute("aria-pressed", "false");

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = letters[index];

    const text = document.createElement("span");
    text.textContent = option;

    button.append(letter, text);

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    optionsContainer.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answerChecked) {
    return;
  }

  selectedAnswer = index;

  document.querySelectorAll(".quiz-option").forEach((button) => {
    const selected = Number(button.dataset.answer) === index;

    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  submitButton.disabled = false;
}

function checkAnswer() {
  if (answerChecked || selectedAnswer === null) {
    return;
  }

  answerChecked = true;

  const question = currentQuestions[currentIndex];
  const isCorrect = selectedAnswer === question.answer;

  if (isCorrect) {
    correctAnswers++;
  }

  answerHistory.push({
    questionId: question.id,
    question: question.question,
    topic: question.topic,
    selectedAnswer,
    correctAnswer: question.answer,
    isCorrect,
    explanation: question.explanation
  });

  document.querySelectorAll(".quiz-option").forEach((button) => {
    const optionIndex = Number(button.dataset.answer);

    button.disabled = true;

    if (optionIndex === question.answer) {
      button.classList.add("correct");
    } else if (optionIndex === selectedAnswer) {
      button.classList.add("incorrect");
    }
  });

  feedbackBox.hidden = false;
  feedbackBox.classList.toggle("feedback-incorrect", !isCorrect);

  feedbackTitle.textContent = isCorrect
    ? "✓ Correct! Well done."
    : "✗ Not quite. Let's learn from this.";

  feedbackExplanation.textContent = question.explanation;

  submitButton.hidden = true;
  nextButton.hidden = false;

  nextButton.textContent =
    currentIndex === currentQuestions.length - 1
      ? "View my results →"
      : "Next question →";
}

function nextQuestion() {
  if (!answerChecked) {
    return;
  }

  currentIndex++;

  if (currentIndex >= currentQuestions.length) {
    finishQuiz();
  } else {
    renderQuestion();
  }
}

/* ==========================================
   FINISH QUIZ AND SAVE RESULTS
   ========================================== */

function finishQuiz() {
  quizGame.hidden = true;
  quizResults.hidden = false;

  const total = currentQuestions.length;
  const percentage = Math.round((correctAnswers / total) * 100);

  const result = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    topic: currentTopic,
    topicName:
      currentTopic === "all"
        ? "All AZ-900 topics"
        : TOPICS[currentTopic],
    correct: correctAnswers,
    total,
    percentage,
    answers: answerHistory
  };

  const previousAttempts = getAttempts();

  // Keep a maximum of 100 recent attempts.
  const updatedAttempts = [result, ...previousAttempts].slice(0, 100);

  writeStorage(STORAGE_KEYS.attempts, updatedAttempts);

  document.getElementById("result-percentage").textContent =
    `${percentage}%`;

  document.getElementById("result-correct").textContent =
    correctAnswers;

  document.getElementById("result-incorrect").textContent =
    total - correctAnswers;

  document.getElementById("result-total").textContent = total;

  document.getElementById("result-heading").textContent =
    percentage >= 80
      ? "Excellent work!"
      : percentage >= 60
        ? "Good progress!"
        : "Keep practising!";

  document.getElementById("result-message").textContent =
    percentage >= 80
      ? "You did well. Review the explanations and keep building your knowledge."
      : percentage >= 60
        ? "You're making progress. Review the questions you missed and try again."
        : "Every attempt helps you learn. Study the explanations, then take another quiz.";

  renderAnswerReview();
  renderQuizHistory();
  renderDashboardStats();
}

function renderAnswerReview() {
  const reviewList = document.getElementById("quiz-review-list");

  reviewList.replaceChildren();

  answerHistory.forEach((answer, index) => {
    const item = document.createElement("article");
    item.className = "quiz-review-item";

    const heading = document.createElement("h4");
    heading.textContent = `${index + 1}. ${answer.question}`;

    const resultLine = document.createElement("p");
    resultLine.className = answer.isCorrect
      ? "review-correct"
      : "review-incorrect";

    resultLine.textContent = answer.isCorrect
      ? "✓ Your answer was correct"
      : "✗ Your answer was incorrect";

    const chosen = document.createElement("p");
    chosen.textContent =
      `Your answer: ${QUESTIONS.find(q => q.id === answer.questionId).options[answer.selectedAnswer]}`;

    const correct = document.createElement("p");
    correct.textContent =
      `Correct answer: ${QUESTIONS.find(q => q.id === answer.questionId).options[answer.correctAnswer]}`;

    const explanation = document.createElement("p");
    explanation.textContent = answer.explanation;

    item.append(heading, resultLine, chosen, correct, explanation);
    reviewList.appendChild(item);
  });
}
/* ==========================================
   QUIZ HISTORY
   ========================================== */

function renderQuizHistory() {
  const historyContainer = document.getElementById("quiz-history");
  const attempts = getAttempts();

  historyContainer.replaceChildren();

  if (attempts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Complete your first quiz to see your history here.";
    historyContainer.appendChild(empty);
    return;
  }

  attempts.slice(0, 5).forEach((attempt) => {
    const item = document.createElement("div");
    item.className = "quiz-history-item";

    const details = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = attempt.topicName || "AZ-900 practice quiz";

    const date = document.createElement("p");
    const parsedDate = new Date(attempt.date);

    date.textContent = Number.isNaN(parsedDate.getTime())
      ? "Previous attempt"
      : parsedDate.toLocaleString();

    const score = document.createElement("span");
    score.className = "history-score";
    score.textContent = `${attempt.percentage}%`;

    details.append(title, date);
    item.append(details, score);
    historyContainer.appendChild(item);
  });
}

/* ==========================================
   UPDATE DASHBOARD STATISTICS
   ========================================== */

function renderDashboardStats() {
  const attempts = getAttempts();

  const totalElement = document.getElementById("quiz-total");
  const averageElement = document.getElementById("average-score");
  const cardsElement = document.getElementById("cards-reviewed");
  const planElement = document.getElementById("plan-progress");

  totalElement.textContent = attempts.length;

  if (attempts.length > 0) {
    const average =
      attempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
      attempts.length;

    averageElement.textContent = `${Math.round(average)}%`;
  } else {
    averageElement.textContent = "—";
  }

  const flashcardProgress = readStorage(
    STORAGE_KEYS.flashcards,
    {}
  );

  const reviewedCards =
    flashcardProgress &&
    typeof flashcardProgress === "object" &&
    !Array.isArray(flashcardProgress)
      ? Object.values(flashcardProgress).filter(
          (rating) => rating === "known" || rating === "practice"
        ).length
      : 0;

  cardsElement.textContent = reviewedCards;

  const plan = readStorage(STORAGE_KEYS.planner, null);

  let planPercentage = 0;

  if (plan && Array.isArray(plan.tasks) && plan.tasks.length > 0) {
    const completed = plan.tasks.filter((task) => task.completed).length;
    planPercentage = Math.round((completed / plan.tasks.length) * 100);
  }

  planElement.textContent = `${planPercentage}%`;
}

/* ==========================================
   BUTTON EVENTS
   ========================================== */

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", checkAnswer);

nextButton.addEventListener("click", nextQuestion);

quitButton.addEventListener("click", () => {
  const confirmed = window.confirm(
    "Exit this quiz? Your unfinished attempt will not be saved."
  );

  if (confirmed) {
    quizGame.hidden = true;
    quizSetup.hidden = false;
    quizResults.hidden = true;
  }
});

document.getElementById("change-quiz").addEventListener("click", () => {
  quizResults.hidden = true;
  quizGame.hidden = true;
  quizSetup.hidden = false;
});

document.getElementById("retry-quiz").addEventListener("click", () => {
  startQuiz();
});

document.getElementById("results-dashboard").addEventListener("click", () => {
  openPage("dashboard");
});

document.querySelectorAll("[data-build]").forEach((button) => {
  button.addEventListener("click", () => {
    const featureNames = {
      quiz: "Smart Quiz Builder",
      flashcards: "Flashcard Coach",
      planner: "Personal Study Planner",
      buddy: "AI Study Buddy",
      readiness: "Readiness Tracker"
    };

    if (button.dataset.build === "quiz") {
      openPage("quiz");
      startQuiz();
      return;
    }

    alert(
      `${featureNames[button.dataset.build]} will be implemented in the next build step.`
    );
  });
});

/* ==========================================
   INITIALIZE APP
   ========================================== */

openPageFromAddress();
renderDashboardStats();
renderQuizHistory();

console.log(
  "AZ-900 Smart Prep Hub loaded. " +
  `${QUESTIONS.length} original practice questions are available.`
);

/* ==========================================
   FLASHCARD COACH — STEP 3
   ========================================== */

(() => {
  const flashcards = [
    {
      question: "What is cloud computing?",
      answer: "Delivering computing services over the internet.",
      explanation: "These services can include servers, storage, databases, and networking."
    },
    {
      question: "What is a public cloud?",
      answer: "Cloud services offered over shared infrastructure.",
      explanation: "A cloud provider operates the infrastructure and makes services available to customers."
    },
    {
      question: "What is a private cloud?",
      answer: "Cloud infrastructure dedicated to one organization.",
      explanation: "It can offer greater control over the environment and its resources."
    },
    {
      question: "What is a hybrid cloud?",
      answer: "A combination of private and public cloud environments.",
      explanation: "Organizations can use both environments to meet different requirements."
    },
    {
      question: "What is an Azure region?",
      answer: "A geographic area containing Azure datacenters.",
      explanation: "Regions help organizations choose where their cloud resources are deployed."
    },
    {
      question: "What is an Azure Availability Zone?",
      answer: "A physically separate location within an Azure region.",
      explanation: "Zones help protect applications against certain datacenter-level failures."
    },
    {
      question: "What is Azure Virtual Machines?",
      answer: "A service for running virtualized computers in Azure.",
      explanation: "It provides control over the operating system and virtual machine configuration."
    },
    {
      question: "What is Azure Functions?",
      answer: "An event-driven, serverless compute service.",
      explanation: "It runs code in response to events without requiring you to manage servers."
    },
    {
      question: "What is Azure RBAC?",
      answer: "Role-Based Access Control for Azure resources.",
      explanation: "It manages who can perform which actions on specific resources."
    },
    {
      question: "What is Azure Cost Management?",
      answer: "Tools for monitoring and managing Azure spending.",
      explanation: "It helps analyze costs, create budgets, and track cloud expenditure."
    }
  ];

  const getElement = (id) => document.getElementById(id);

  const requiredIds = [
    "flashcard-current",
    "flashcard-total",
    "flashcard-known",
    "flashcard-practice",
    "flashcard-progress-bar",
    "flashcard-flip",
    "flashcard-side-label",
    "flashcard-content",
    "flashcard-hint",
    "flashcard-message",
    "flashcard-mark-known",
    "flashcard-unknown",
    "flashcard-previous",
    "flashcard-next",
    "flashcard-shuffle",
    "flashcard-summary-known",
    "flashcard-summary-practice",
    "flashcard-summary-percent",
    "flashcard-reset"
  ];

  if (!requiredIds.every((id) => getElement(id))) {
    console.warn(
      "Flashcard Coach: Some HTML elements are missing. Check index.html."
    );
  } else {
    let order = flashcards.map((_, index) => index);
    let current = 0;
    let isFlipped = false;
    let progress = {};

    try {
      progress = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.flashcards)
      ) || {};
    } catch (error) {
      progress = {};
    }

    function saveProgress() {
      try {
        localStorage.setItem(
          STORAGE_KEYS.flashcards,
          JSON.stringify(progress)
        );
      } catch (error) {
        console.warn("Flashcard progress could not be saved.", error);
      }
    }

    function getRating(index) {
      return progress[index] || "";
    }

    function updateStats() {
      const known = flashcards.filter(
        (_, index) => getRating(index) === "known"
      ).length;

      const practice = flashcards.filter(
        (_, index) => getRating(index) === "practice"
      ).length;

      const reviewed = known + practice;
      const mastery = reviewed
        ? Math.round((known / reviewed) * 100)
        : 0;

      getElement("flashcard-known").textContent = known;
      getElement("flashcard-practice").textContent = practice;
      getElement("flashcard-summary-known").textContent = known;
      getElement("flashcard-summary-practice").textContent = practice;
      getElement("flashcard-summary-percent").textContent = mastery + "%";

      getElement("flashcard-current").textContent = current + 1;
      getElement("flashcard-total").textContent = flashcards.length;

      getElement("flashcard-progress-bar").style.width =
        ((current + 1) / flashcards.length) * 100 + "%";
    }

    function renderCard() {
      const card = flashcards[order[current]];
      const rating = getRating(order[current]);

      isFlipped = false;

      getElement("flashcard-side-label").textContent = "QUESTION";
      getElement("flashcard-content").textContent = card.question;
      getElement("flashcard-hint").textContent =
        "Click this card to reveal the answer";

      getElement("flashcard-message").textContent =
        rating === "known"
          ? "✓ You marked this card as known."
          : rating === "practice"
            ? "↻ You marked this card for more practice."
            : "Think of your answer before revealing the card.";

      updateStats();
    }

    function flipCard() {
      const card = flashcards[order[current]];
      isFlipped = !isFlipped;

      getElement("flashcard-side-label").textContent =
        isFlipped ? "ANSWER" : "QUESTION";

      getElement("flashcard-content").textContent =
        isFlipped ? card.answer : card.question;

      getElement("flashcard-hint").textContent =
        isFlipped
          ? card.explanation
          : "Click this card to reveal the answer";
    }

    function rateCard(rating) {
      progress[order[current]] = rating;
      saveProgress();

      getElement("flashcard-message").textContent =
        rating === "known"
          ? "✓ Marked as known. Keep going!"
          : "↻ Added to your practice list. Review this card again.";

      if (current < flashcards.length - 1) {
        current++;
        renderCard();
      } else {
        updateStats();
        getElement("flashcard-message").textContent =
          "You've reached the end of the deck. Review any cards you need to practise!";
      }
    }

    getElement("flashcard-flip").addEventListener("click", flipCard);

    getElement("flashcard-mark-known").addEventListener("click", () => {
      rateCard("known");
    });

    getElement("flashcard-unknown").addEventListener("click", () => {
      rateCard("practice");
    });

    getElement("flashcard-previous").addEventListener("click", () => {
      current = (current - 1 + flashcards.length) % flashcards.length;
      renderCard();
    });

    getElement("flashcard-next").addEventListener("click", () => {
      current = (current + 1) % flashcards.length;
      renderCard();
    });

    getElement("flashcard-shuffle").addEventListener("click", () => {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }

      current = 0;
      renderCard();

      getElement("flashcard-message").textContent =
        "Your cards have been shuffled!";
    });

    getElement("flashcard-reset").addEventListener("click", () => {
      progress = {};
      current = 0;
      saveProgress();
      renderCard();

      getElement("flashcard-message").textContent =
        "Your flashcard progress has been reset.";
    });

    renderCard();
  }
})();
// ========================================
// STUDY PLANNER
// ========================================

(function () {
  const taskForm = document.getElementById("study-task-form");
  const taskTitle = document.getElementById("study-task-title");
  const taskTopic = document.getElementById("study-task-topic");
  const taskDate = document.getElementById("study-task-date");
  const taskList = document.getElementById("study-task-list");
  const completedCount = document.getElementById("study-tasks-completed");
  const totalCount = document.getElementById("study-tasks-total");

  // Stop if the Planner HTML is not on the page.
  if (
    !taskForm ||
    !taskTitle ||
    !taskTopic ||
    !taskDate ||
    !taskList ||
    !completedCount ||
    !totalCount
  ) {
    return;
  }

  const STORAGE_KEY = "az900-study-tasks";

  let tasks = [];

  // Load saved tasks from this browser.
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    tasks = savedTasks ? JSON.parse(savedTasks) : [];

    if (!Array.isArray(tasks)) {
      tasks = [];
    }
  } catch (error) {
    console.error("Could not load study tasks:", error);
    tasks = [];
  }

  // Save tasks to this browser.
  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Could not save study tasks:", error);
      alert("Your tasks could not be saved in this browser.");
    }
  }

  // Show the tasks on the page.
  function renderTasks() {
    taskList.replaceChildren();

    if (tasks.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "muted";
      emptyMessage.textContent =
        "No tasks yet. Add your first study task above.";
      taskList.appendChild(emptyMessage);
    }

    tasks.forEach(function (task) {
      const card = document.createElement("div");
      card.className = "study-task";

      const title = document.createElement("h3");
      title.textContent = task.title;

      if (task.completed) {
        title.style.textDecoration = "line-through";
      }

      const topic = document.createElement("p");
      topic.textContent = "Topic: " + task.topic;

      const date = document.createElement("p");
      date.textContent = "Study date: " + task.date;

      const status = document.createElement("p");
      status.textContent = task.completed ? "Completed" : "Not completed";

      const completeButton = document.createElement("button");
      completeButton.type = "button";
      completeButton.textContent = task.completed
        ? "Mark incomplete"
        : "Mark complete";

      completeButton.addEventListener("click", function () {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.textContent = "Delete task";

      deleteButton.addEventListener("click", function () {
        tasks = tasks.filter(function (item) {
          return item.id !== task.id;
        });

        saveTasks();
        renderTasks();
      });

      card.appendChild(title);
      card.appendChild(topic);
      card.appendChild(date);
      card.appendChild(status);
      card.appendChild(completeButton);
      card.appendChild(deleteButton);

      taskList.appendChild(card);
    });

    const completed = tasks.filter(function (task) {
      return task.completed;
    }).length;

    completedCount.textContent = completed;
    totalCount.textContent = tasks.length;
  }

  // Add a new task.
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();

    if (!title) {
      alert("Please enter a task name.");
      return;
    }

    if (!taskDate.value) {
      alert("Please choose a study date.");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title,
      topic: taskTopic.value,
      date: taskDate.value,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskForm.reset();
  });

  // Display saved tasks when the page opens.
  renderTasks();
})();

/* ========================================
   AZ-900 STUDY BUDDY
======================================== */

(function () {
  const topicSelect = document.getElementById("buddy-topic");
  const explainButton = document.getElementById("buddy-explain");
  const questionButton = document.getElementById("buddy-question");
  const responseArea = document.getElementById("buddy-response");

  if (
    !topicSelect ||
    !explainButton ||
    !questionButton ||
    !responseArea
  ) {
    return;
  }

  const studyTopics = {
    cloud: {
      title: "Cloud Concepts",
      explanation:
        "Cloud computing delivers computing services over the internet. " +
        "Examples include servers, storage, databases and networking. " +
        "Azure lets you use these services without owning all the physical hardware.",
      question:
        "Which cloud benefit allows resources to increase or decrease when demand changes?",
      options: [
        "Elasticity",
        "A fixed capacity",
        "Manual paper records"
      ],
      answer: 0,
      reason:
        "Elasticity means resources can expand or shrink to match demand."
    },

    architecture: {
      title: "Azure Architecture and Services",
      explanation:
        "Azure provides services for computing, networking, storage and databases. " +
        "Azure regions are geographical areas containing datacentres. " +
        "Availability zones are separate physical locations within a supported region.",
      question:
        "What is an Azure region?",
      options: [
        "A type of user password",
        "A geographical area containing Azure datacentres",
        "A spreadsheet for tracking costs"
      ],
      answer: 1,
      reason:
        "An Azure region is a geographical area where Azure resources are hosted."
    },

    governance: {
      title: "Azure Management and Governance",
      explanation:
        "Azure management and governance help organizations control their cloud resources. " +
        "Azure Policy can enforce organizational rules. " +
        "Role-based access control (RBAC) manages who can access resources and what they can do. " +
        "Cost Management helps monitor and manage spending.",
      question:
        "Which Azure feature helps control who can access resources and what they can do?",
      options: [
        "Azure RBAC",
        "A photo editor",
        "A web browser bookmark"
      ],
      answer: 0,
      reason:
        "Azure role-based access control assigns permissions through roles."
    }
  };

  function showText(title, text) {
    responseArea.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    responseArea.appendChild(heading);
    responseArea.appendChild(paragraph);
  }

  explainButton.addEventListener("click", function () {
    const topic = studyTopics[topicSelect.value];

    showText(topic.title, topic.explanation);
  });

  questionButton.addEventListener("click", function () {
    const topic = studyTopics[topicSelect.value];

    responseArea.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = topic.title + " — Practice Question";

    const question = document.createElement("p");
    question.textContent = topic.question;

    responseArea.appendChild(heading);
    responseArea.appendChild(question);

    topic.options.forEach(function (option, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option;
      button.style.display = "block";
      button.style.margin = "10px 0";

      button.addEventListener("click", function () {
        const buttons = responseArea.querySelectorAll("button");

        buttons.forEach(function (item) {
          item.disabled = true;
        });

        const result = document.createElement("p");

        if (index === topic.answer) {
          result.textContent = "Correct! " + topic.reason;
        } else {
          result.textContent =
            "Not quite. The correct answer is: " +
            topic.options[topic.answer] +
            ". " +
            topic.reason;
        }

        responseArea.appendChild(result);
      });

      responseArea.appendChild(button);
    });
  });
})();

/* ========================================
   EXAM READINESS DASHBOARD
======================================== */

(function () {
  const attemptsEl = document.getElementById("readiness-attempts");
  const averageEl = document.getElementById("readiness-average");
  const tasksEl = document.getElementById("readiness-tasks");
  const progressBar = document.getElementById("readiness-progress-bar");
  const progressText = document.getElementById("readiness-progress-text");
  const adviceEl = document.getElementById("readiness-advice");
  const recommendationsEl = document.getElementById(
    "readiness-recommendations"
  );
  const refreshButton = document.getElementById("readiness-refresh");

  if (
    !attemptsEl ||
    !averageEl ||
    !tasksEl ||
    !progressBar ||
    !progressText ||
    !adviceEl ||
    !recommendationsEl ||
    !refreshButton
  ) {
    return;
  }

  function readArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function readQuizScores() {
    /*
      This looks for common quiz-history storage keys.
      Your quiz code may use a different key or data format.
    */
    const possibleKeys = [
      "az900-quiz-history",
      "az900QuizHistory",
      "quizHistory",
      "quiz-history"
    ];

    for (const key of possibleKeys) {
      const data = readArray(key);

      if (data.length > 0) {
        return data;
      }
    }

    return [];
  }

  function getScore(item) {
    if (typeof item === "number") {
      return item;
    }

    if (!item || typeof item !== "object") {
      return null;
    }

    const possibleValues = [
      item.percentage,
      item.scorePercent,
      item.score,
      item.percent
    ];

    for (const value of possibleValues) {
      if (typeof value === "number" && Number.isFinite(value)) {
        return value;
      }
    }

    if (
      typeof item.correctAnswers === "number" &&
      typeof item.totalQuestions === "number" &&
      item.totalQuestions > 0
    ) {
      return (item.correctAnswers / item.totalQuestions) * 100;
    }

    return null;
  }

  function refreshReadiness() {
    const history = readQuizScores();

    const scores = history
      .map(getScore)
      .filter(function (score) {
        return score !== null && score >= 0 && score <= 100;
      });

    const average = scores.length
      ? scores.reduce(function (total, score) {
          return total + score;
        }, 0) / scores.length
      : 0;

    const tasks = readArray("az900-study-tasks");
    const completed = tasks.filter(function (task) {
      return task && task.completed === true;
    }).length;

    const taskProgress = tasks.length
      ? (completed / tasks.length) * 100
      : 0;

    /*
      Readiness is an estimate based on quiz scores and
      completed study tasks, not an official exam prediction.
    */
    const readiness = Math.round(
      scores.length && tasks.length
        ? average * 0.7 + taskProgress * 0.3
        : scores.length
          ? average
          : taskProgress
    );

    attemptsEl.textContent = scores.length;
    averageEl.textContent = Math.round(average) + "%";
    tasksEl.textContent = completed + " / " + tasks.length;

    progressBar.style.width = readiness + "%";
    progressText.textContent =
      "Your estimated study readiness is " + readiness + "%.";

    if (!scores.length && !tasks.length) {
      adviceEl.textContent =
        "Complete a practice quiz and add study tasks to begin tracking progress.";
    } else if (readiness >= 80) {
      adviceEl.textContent =
        "Good progress! Keep practising and review any topics you find difficult.";
    } else if (readiness >= 50) {
      adviceEl.textContent =
        "You're making progress. Continue revising and take more practice quizzes.";
    } else {
      adviceEl.textContent =
        "Keep studying the fundamentals and complete more practice questions.";
    }

    recommendationsEl.replaceChildren();

    const recommendations = [];

    if (!scores.length) {
      recommendations.push("Complete a practice quiz to record a score.");
    } else if (average < 80) {
      recommendations.push(
        "Review incorrect answers and practise weak areas."
      );
    } else {
      recommendations.push(
        "Keep practising to maintain your quiz performance."
      );
    }

    if (!tasks.length) {
      recommendations.push(
        "Add study tasks in the Personal Study Planner."
      );
    } else if (completed < tasks.length) {
      recommendations.push(
        "Complete your remaining study tasks."
      );
    } else {
      recommendations.push(
        "Create another study task to continue your revision."
      );
    }

    recommendations.push(
      "Review Cloud Concepts, Azure Architecture and Services, and Azure Management and Governance."
    );

    recommendations.forEach(function (recommendation) {
      const item = document.createElement("li");
      item.textContent = recommendation;
      recommendationsEl.appendChild(item);
    });
  }

  refreshButton.addEventListener("click", refreshReadiness);

  refreshReadiness();
})();
