// Function to handle dynamic resume generation
document.getElementById("generateResume")?.addEventListener("click", function () {
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
function updateField(inputId: string, displayId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement | null;
    const displayElement = document.getElementById(displayId);

    if (inputElement && displayElement) {
        displayElement.textContent = inputElement.value.trim() || "N/A";
    }
}

// Function to display dynamic fields (Education, Social Links, Projects, Certifications, Skills)
function displayDynamicFields(containerId: string, displayId: string, isLinkField: boolean = false) {
    const container = document.getElementById(containerId);
    const displayContainer = document.getElementById(displayId);

    if (!container || !displayContainer) return;

    displayContainer.innerHTML = ""; // Clear previous content
    const fields = container.querySelectorAll(".dynamic-field");
    let hasContent = false;

    fields.forEach((field) => {
        const inputs = field.getElementsByTagName("input");
        let element;

        if (displayContainer.tagName === "UL") {
            element = document.createElement("li");
        } else {
            element = document.createElement("p");
        }

        if (inputs.length === 1) { // Skills case (single input)
            const skill = inputs[0].value.trim();
            if (skill) {
                element.textContent = skill;
                displayContainer.appendChild(element);
                hasContent = true;
            }
        } else if (inputs.length === 2) { // ✅ Baqi sab ka case (2 inputs)
            const name = inputs[0].value.trim();
            const value = inputs[1].value.trim();

            if (name && value) {
                if (containerId === "educationContainer") {
                    element.innerHTML = `<b>${name}</b><br>${value}`;
                } else if (isLinkField) {
                    element.innerHTML = `<b>${name}:</b> ${value}`;
                } else {
                    element.innerHTML = `<b>${name}:</b> ${value}`;
                }
                displayContainer.appendChild(element);
                hasContent = true;
                

            }
        }
    });

      // Agar section mein content nahi hai, to uski heading ko chhupa dein
      const section = displayContainer.closest('section');
      if (section) {
          section.style.display = hasContent ? 'block' : 'none';
      }
}

// Function to update profile picture
function updateProfilePicture() {
    const fileInput = document.getElementById("profilePicture") as HTMLInputElement | null;
    const displayImg = document.getElementById("profilePictureDisplay") as HTMLImageElement | null;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (displayImg) {
                displayImg.src = e.target?.result as string;
            }
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

// Function to add dynamic fields (like education, social links, projects, etc.)
function addDynamicField(containerId: string, placeholder1: string, placeholder2?: string) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const div = document.createElement("div");
    div.classList.add("dynamic-field");

    div.innerHTML = `
        <label>${placeholder1}</label>
        <input type="text" placeholder="${placeholder1}"><br><br>
        ${placeholder2 ? `<label>${placeholder2}</label><input type="text" placeholder="${placeholder2}"><br><br>` : ""}
    `;
    container.appendChild(div);
}

// Event listeners for adding dynamic fields
document.getElementById("addSocialLink")?.addEventListener("click", function () {
    addDynamicField("socialLinksContainer", "Social Media Platform", "Link");
});

document.getElementById("addEducation")?.addEventListener("click", function () {
    addDynamicField("educationContainer", "Degree/Qualification" , "School/College Name");
});

document.getElementById("addProject")?.addEventListener("click", function () {
    addDynamicField("projectsContainer", "Project Name", "Description");
});

document.getElementById("addCertification")?.addEventListener("click", function () {
    addDynamicField("certificationsContainer", "Certification Name", "Issuing Authority");
});

document.getElementById("addSkill")?.addEventListener("click", function () {
    addDynamicField("skillsContainer", "Skill Name");
});

function downloadResumeAsPDF() {
    window.print(); 
}

