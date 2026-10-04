// =========================
// LOGIN
// =========================

const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

const loginForm = document.getElementById("loginForm");
const userEmail = document.getElementById("userEmail");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (email === "") {
        return;
    }

    userEmail.textContent = email;

    loginPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");

});


// =========================
// LOGOUT
// =========================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

    dashboardPage.classList.add("hidden");
    loginPage.classList.remove("hidden");

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

});


// =========================
// FILE SELECTION
// =========================

const fileInput = document.getElementById("fileInput");
const selectedFile = document.getElementById("selectedFile");

fileInput.addEventListener("change", function () {

    if (fileInput.files.length > 0) {

        selectedFile.textContent =
            fileInput.files[0].name;

    } else {

        selectedFile.textContent =
            "No file selected";

    }

});


// =========================
// DOCUMENT UPLOAD
// =========================

const uploadBtn = document.getElementById("uploadBtn");

const documentList =
    document.getElementById("documentList");

const documentCount =
    document.getElementById("documentCount");

let documents = [];


uploadBtn.addEventListener("click", function () {

    if (fileInput.files.length === 0) {

        alert("Please select a document first.");

        return;
    }

    const file = fileInput.files[0];

    documents.push(file.name);

    updateDocumentList();

    fileInput.value = "";

    selectedFile.textContent =
        "No file selected";

});


// =========================
// UPDATE DOCUMENT LIST
// =========================

function updateDocumentList() {

    documentList.innerHTML = "";

    documentCount.textContent =
        documents.length;


    if (documents.length === 0) {

        documentList.innerHTML = `
            <div class="empty-state">
                No documents uploaded yet.
            </div>
        `;

        return;
    }


    documents.forEach(function (fileName) {

        const documentItem =
            document.createElement("div");

        documentItem.className = "document";


        documentItem.innerHTML = `

            <div class="document-left">

                <div class="file-icon">
                    FILE
                </div>

                <div>

                    <div class="file-name">
                        ${fileName}
                    </div>

                    <div class="file-type">
                        Uploaded document
                    </div>

                </div>

            </div>

            <div class="document-lock">
                Private
            </div>

        `;


        documentList.appendChild(documentItem);

    });

}


// =========================
// DOCUMENT SEARCH
// =========================

const askBtn =
    document.getElementById("askBtn");

const questionInput =
    document.getElementById("questionInput");

const chatBox =
    document.getElementById("chatBox");


askBtn.addEventListener("click", askQuestion);


questionInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            askQuestion();

        }

    }
);


function askQuestion() {

    const question =
        questionInput.value.trim();


    if (question === "") {

        return;
    }


    // User question

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "message";


    userMessage.innerHTML = `

        <div class="message-label">
            Your Question
        </div>

        <p>
            ${escapeHTML(question)}
        </p>

    `;


    chatBox.appendChild(userMessage);


    // Temporary demo response

    setTimeout(function () {

        const assistantMessage =
            document.createElement("div");

        assistantMessage.className =
            "message assistant-message";


        assistantMessage.innerHTML = `

            <div class="message-label">
                Assistant
            </div>

            <p>
                Your question has been received.
                The Python backend and AI search
                system can be connected here to
                search the uploaded documents.
            </p>

        `;


        chatBox.appendChild(assistantMessage);

        chatBox.scrollTop =
            chatBox.scrollHeight;

    }, 600);


    questionInput.value = "";

}


// =========================
// SECURITY HELPER
// =========================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}