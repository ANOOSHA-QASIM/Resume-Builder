var _a, _b, _c, _d, _e, _f;
// Function to handle dynamic resume generation
(_a = document.getElementById("generateResume")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    updateField("name", "nameDisplay");
    updateField("jobTitle", "jobTitleDisplay");
    updateField("phone", "phoneDisplay");
    updateField("email", "emailDisplay");
    updateField("address", "addressDisplay");
    updateField("languages", "languagesDisplay");
    updateField("summary", "summaryDisplay");
    updateField("experience", "experienceDisplay");
    updateField("references", "referencesDisplay");
    displayDynamicFields("educationContainer", "educationDisplay");
    displayDynamicFields("socialLinksContainer", "socialLinksDisplay", true);
    displayDynamicFields("projectsContainer", "projectsDisplay");
    displayDynamicFields("certificationsContainer", "certificationsDisplay");
    displayDynamicFields("skillsContainer", "skillsDisplay"); // For skills display
    updateProfilePicture();
});
// Function to update static fields (Name, Job Title, etc.)
function updateField(inputId, displayId) {
    var inputElement = document.getElementById(inputId);
    var displayElement = document.getElementById(displayId);
    if (inputElement && displayElement) {
        displayElement.textContent = inputElement.value.trim() || "N/A";
    }
}
// Function to display dynamic fields (Education, Social Links, Projects, Certifications, Skills)
function displayDynamicFields(containerId, displayId, isLinkField) {
    if (isLinkField === void 0) { isLinkField = false; }
    var container = document.getElementById(containerId);
    var displayContainer = document.getElementById(displayId);
    if (!container || !displayContainer)
        return;
    displayContainer.innerHTML = ""; // Clear previous content
    var fields = container.querySelectorAll(".dynamic-field");
    var hasContent = false;
    fields.forEach(function (field) {
        var inputs = field.getElementsByTagName("input");
        var element;
        if (displayContainer.tagName === "UL") {
            element = document.createElement("li");
        }
        else {
            element = document.createElement("p");
        }
        if (inputs.length === 1) { // Skills case (single input)
            var skill = inputs[0].value.trim();
            if (skill) {
                element.textContent = skill;
                displayContainer.appendChild(element);
                hasContent = true;
            }
        }
        else if (inputs.length === 2) { // ✅ Baqi sab ka case (2 inputs)
            var name_1 = inputs[0].value.trim();
            var value = inputs[1].value.trim();
            if (name_1 && value) {
                if (containerId === "educationContainer") {
                    element.innerHTML = "<b>".concat(name_1, "</b><br>").concat(value);
                }
                else if (isLinkField) {
                    element.innerHTML = "<b>".concat(name_1, ":</b> ").concat(value);
                }
                else {
                    element.innerHTML = "<b>".concat(name_1, ":</b> ").concat(value);
                }
                displayContainer.appendChild(element);
                hasContent = true;
            }
        }
    });
    // Agar section mein content nahi hai, to uski heading ko chhupa dein
    var section = displayContainer.closest('section');
    if (section) {
        section.style.display = hasContent ? 'block' : 'none';
    }
}
// Function to update profile picture
function updateProfilePicture() {
    var fileInput = document.getElementById("profilePicture");
    var displayImg = document.getElementById("profilePictureDisplay");
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            if (displayImg) {
                displayImg.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            }
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}
// Function to add dynamic fields (like education, social links, projects, etc.)
function addDynamicField(containerId, placeholder1, placeholder2) {
    var container = document.getElementById(containerId);
    if (!container)
        return;
    var div = document.createElement("div");
    div.classList.add("dynamic-field");
    div.innerHTML = "\n        <label>".concat(placeholder1, "</label>\n        <input type=\"text\" placeholder=\"").concat(placeholder1, "\"><br><br>\n        ").concat(placeholder2 ? "<label>".concat(placeholder2, "</label><input type=\"text\" placeholder=\"").concat(placeholder2, "\"><br><br>") : "", "\n    ");
    container.appendChild(div);
}
// Event listeners for adding dynamic fields
(_b = document.getElementById("addSocialLink")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    addDynamicField("socialLinksContainer", "Social Media Platform", "Link");
});
(_c = document.getElementById("addEducation")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    addDynamicField("educationContainer", "Degree/Qualification", "School/College Name");
});
(_d = document.getElementById("addProject")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    addDynamicField("projectsContainer", "Project Name", "Description");
});
(_e = document.getElementById("addCertification")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
    addDynamicField("certificationsContainer", "Certification Name", "Issuing Authority");
});
(_f = document.getElementById("addSkill")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
    addDynamicField("skillsContainer", "Skill Name");
});
function downloadResumeAsPDF() {
    window.print();
}
