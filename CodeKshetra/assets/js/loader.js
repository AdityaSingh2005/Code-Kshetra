/**
 * Team Members, Mentors and Judges Display Script
 * 
 * Author: Navneet Baid
 * Last Updated: 07/01/2024
 * 
 * Description: 
 * This script fetches data for judges, mentors, and team members from JSON files
 * and dynamically displays them on the webpage in designated sections.
 */


// ---------------------- Judges Section ----------------------
const judgesContainer = document.getElementById('judges-container');
const loadMoreJudgeBtn = document.getElementById('loadMoreJudgeBtn');
const judgesPerLoad = 4;
let currentJudges = 0;
let judgesData = null;
// Fetch judges data from JSON file
async function fetchJudgesData() {
    const response = await fetch('assets/meta-data/judges.json');
    const data = await response.json();
    judgesData = data;
    return data;
}
// Show more judges on button click
function showMoreJudges() {
    if (!judgesData) {
        fetchJudgesData().then(() => showMoreJudges());
        return;
    }
    if (judgesData.length === 0) {
        judgesContainer.innerHTML = '<span class="stay-tuned-button text-center">Judges for the event are yet to be announced. Stay tuned for updates!</span>';
        loadMoreJudgeBtn.style.display = 'none';
        return;
    }
    const remainingJudges = judgesData.length - currentJudges;
    const nextLoad = Math.min(remainingJudges, judgesPerLoad);

    renderJudges(currentJudges, currentJudges + nextLoad);
    currentJudges += nextLoad;

    if (currentJudges >= judgesData.length) {
        loadMoreJudgeBtn.style.display = 'none';
    }
}
// Render judges on the webpage
function renderJudges(start, end) {
    judgesData.slice(start, end).forEach((judge, index) => {
        const col = document.createElement('div');
        col.classList.add('col-lg-3', 'col-md-3', 'mx-auto');

        const judgeCard = document.createElement('div');
        judgeCard.classList.add('judge');
        judgeCard.setAttribute('data-aos', 'fade-up');
        judgeCard.setAttribute('data-aos-delay', `${index * 100}`);

        const image = document.createElement('img');
        image.src = judge.image;
        image.alt = `${judge.name} - Judge`;
        image.classList.add('img-fluid');

        const details = document.createElement('div');
        details.classList.add('details');

        const name = document.createElement('h3');
        name.textContent = judge.name;

        const role = document.createElement('p');
        role.textContent = judge.designation;

        const social = document.createElement('div');
        social.classList.add('social');

        const instaLink = createSocialLink('Instagram', `https://www.instagram.com/${judge.insta}`);
        const linkedinLink = createSocialLink('LinkedIn', `https://www.linkedin.com/in/${judge.linkedin}`);

        social.appendChild(instaLink);
        social.appendChild(linkedinLink);

        details.appendChild(name);
        details.appendChild(role);
        details.appendChild(social);

        judgeCard.appendChild(image);
        judgeCard.appendChild(details);

        col.appendChild(judgeCard);
        judgesContainer.appendChild(col);
    });

}

// ---------------------- Mentors Section ----------------------
const mentorsContainer = document.getElementById('mentors-container');
const loadMoreMentorsBtn = document.getElementById('loadMoreMentorsBtn');
const mentorsPerLoad = 12;
let currentMentors = 0;
let mentorsData = null;
// Fetch mentors data from JSON file
async function fetchMentorsData() {

    try {
        const response = await fetch('assets/meta-data/mentors.json');
        const data = await response.json();
        mentorsData = data;
        return data;
    } catch (error) {
        console.error('Error fetching mentors data:', error);
        // Handle the error or show an error message to the user
    }
}
// Show more mentors on button click
function showMoreMentors() {

    if (!mentorsData) {
        fetchMentorsData().then(() => showMoreMentors());
        return;
    }

    if (mentorsData.length === 0) {
        mentorsContainer.innerHTML = '<span class="stay-tuned-button text-center">Mentors for the event are yet to be announced. Stay tuned for updates!</span>';
        loadMoreMentorsBtn.style.display = 'none';
        return;
    }

    const remainingMentors = mentorsData.length - currentMentors;
    const nextLoad = Math.min(remainingMentors, mentorsPerLoad);
    renderMentors(currentMentors, currentMentors + nextLoad);
    currentMentors += nextLoad;

    if (currentMentors >= mentorsData.length) {
        loadMoreMentorsBtn.style.display = 'none';
    }
}
// Render mentors on the webpage
function renderMentors(start, end) {
    mentorsData.slice(start, end).forEach((mentor, index) => {
        const col = document.createElement('div');
        col.classList.add('col-lg-3', 'col-md-4', 'mb-4');

        const mentorCard = document.createElement('div');
        mentorCard.classList.add('card', 'mentor-card');
        mentorCard.setAttribute('data-aos', 'fade-up');
        mentorCard.setAttribute('data-aos-delay', `${index * 100}`);

        const image = document.createElement('img');
        image.src = mentor.image;
        image.alt = `${mentor.name} - Mentor`;
        image.classList.add('card-img-top', 'img-fluid');
        image.loading = "lazy";
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const name = document.createElement('h5');
        name.classList.add('card-title');
        name.textContent = mentor.name;

        const expertise = document.createElement('p');
        expertise.classList.add('card-text');
        expertise.textContent = mentor.description;

        const social = document.createElement('div');
        social.classList.add('social-icons');

        const linkedinLink = createSocialLink('LinkedIn', `https://www.linkedin.com/in/${mentor.linkedin}`);
        const instaLink = createSocialLink('Instagram', `https://www.instagram.com/${mentor.insta}`);

        social.appendChild(linkedinLink);
        social.appendChild(instaLink);

        cardBody.appendChild(name);
        cardBody.appendChild(expertise);
        cardBody.appendChild(social);

        mentorCard.appendChild(image);
        mentorCard.appendChild(cardBody);

        col.appendChild(mentorCard);
        mentorsContainer.appendChild(col);
    });
}

// ---------------------- Team Members Section ----------------------
let teamData = null;
// Fetch team members data from JSON file
async function fetchTeamData() {
    const response = await fetch('assets/meta-data/team-members.json');
    const data = await response.json();
    teamData = data;
    return data;
}
// Show more team members on button click
function showMoreTeamMembers() {
    if (!teamData) {
        fetchTeamData().then(() => showMoreTeamMembers());
        return;
    }
    if (teamData.length === 0) {
        teamContainer.innerHTML = '<span class="stay-tuned-button text-center">We are currently building our great team. Stay tuned for updates!</span>';
        return;
    }
    renderTeamMembersByCategory();
}
// Render team members by category on the webpage
function renderTeamMembersByCategory() {
    const categories = [...new Set(teamData.map(member => member.category))];
    categories.forEach(category => {
        const section = document.createElement('section');
        section.id = `${category}Team`;
        section.classList.add('section-with-bg', 'mt-5');

        const container = document.createElement('div');
        container.classList.add('container');
        container.setAttribute('data-aos', 'fade-up');

        const sectionHeader = document.createElement('div');
        sectionHeader.classList.add('section-header');

        const headerH2 = document.createElement('h2');
        headerH2.textContent = `${category} Team`;

        const headerP = document.createElement('p');
        if (category == "Lead Organizer") {
            headerP.textContent = `Meet our Lead Organizers`;
        } else {
            headerP.textContent = `Meet our ${category} team members`;
        }

        sectionHeader.appendChild(headerH2);
        sectionHeader.appendChild(headerP);

        const row = document.createElement('div');
        row.classList.add('row');
        row.id = `${category.toLowerCase()}-team-members-container`;

        container.appendChild(sectionHeader);
        container.appendChild(row);
        section.appendChild(container);

        document.getElementById('ourTeam').appendChild(section);

        renderTeamMembers(category);
    });
}
// Render team members based on category on the webpage
function renderTeamMembers(category) {
    const teamContainer = document.getElementById(`${category.toLowerCase()}-team-members-container`);

    teamData.forEach((member, index) => {
        if (member.category === category) {

            const col = document.createElement('div');
            col.classList.add('col-lg-3', 'col-md-4', 'd-flex', 'justify-content-center');

            const memberCard = document.createElement('div');
            memberCard.classList.add('box1', 'box');
            memberCard.setAttribute('data-aos', 'fade-up');
            memberCard.setAttribute('data-aos-delay', `${index * 100}`);

            const content = document.createElement('div');
            content.classList.add('content');

            const image = document.createElement('div');
            image.classList.add('image');
            const imgElement = document.createElement('img');
            imgElement.style.cursor = 'pointer';
            imgElement.loading="lazy";

            // Check if the member's image is blank
            if (member.image.trim() === '') {
                // Display initials with a random background
                const initials = document.createElement('div');
                initials.classList.add('initials');
                const nameParts = member.name.trim().split(' ');
                const firstInitial = nameParts[0][0];
                const lastInitial = nameParts[nameParts.length - 1][0];
                initials.textContent = (firstInitial + lastInitial).toUpperCase();
                initials.style.backgroundColor = getRandomColor();
                image.appendChild(initials);
            } else {
                // Display the member's image

                imgElement.src = member.image;
                imgElement.alt = `${member.name} - Team Member`;
                imgElement.setAttribute('data-glightbox', '');
                // Add custom data attributes for member details
                imgElement.setAttribute('data-title', member.name);
                imgElement.setAttribute('data-description', `${member.category}- ${member.role}`);
                image.appendChild(imgElement);
            }

            const level = document.createElement('div');
            level.classList.add('level');
            const levelText = document.createElement('p');
            levelText.textContent = member.category;
            level.appendChild(levelText);

            const text = document.createElement('div');
            text.classList.add('text');
            const name = document.createElement('p');
            name.classList.add('name');
            name.textContent = member.name;
            const jobTitle = document.createElement('p');
            jobTitle.classList.add('job_title');
            jobTitle.textContent = member.role;
            text.appendChild(name);
            text.appendChild(jobTitle);
            const icons = document.createElement('div');
            icons.classList.add('icons');

            if (member.social.insta && member.social.insta.trim() !== '') {
                const instagramButton = document.createElement('a');
                instagramButton.href = `https://www.instagram.com/${member.social.insta}`;
                instagramButton.target = '_blank';
                instagramButton.innerHTML = '<i class="bi bi-instagram"></i>';
                icons.appendChild(instagramButton);
            }

            if (member.social.linkedin && member.social.linkedin.trim() !== '') {
                const linkedinButton = document.createElement('a');
                linkedinButton.href = `https://www.linkedin.com/in/${member.social.linkedin}`;
                linkedinButton.target = '_blank';
                linkedinButton.innerHTML = '<i class="bi bi-linkedin"></i>';
                icons.appendChild(linkedinButton);
            }

            if (member.social.email && member.social.email.trim() !== '') {
                const emailButton = document.createElement('a');
                emailButton.href = `mailto:${member.social.email}`;
                emailButton.target = '_blank';
                emailButton.innerHTML = '<i class="bi bi-envelope"></i>';
                icons.appendChild(emailButton);
            }

            // Add icons container to the content
            content.appendChild(icons);



            content.appendChild(image);
            content.appendChild(level);
            content.appendChild(text);
            content.appendChild(icons);

            memberCard.appendChild(content);

            col.appendChild(memberCard);
            teamContainer.appendChild(col);
        }
    });
    GLightbox({
        selector: '[data-glightbox]',
    });
}

// Helper function to create a social link
function createSocialLink(platform, url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.innerHTML = `<i class="bi bi-${platform.toLowerCase()}"></i>`;
    return link;
}
// Helper function to get a random color
function getRandomColor() {
    const colors = [
        '#3498db', // Blue
        '#e74c3c', // Red
        '#2ecc71', // Green
        '#f39c12', // Orange
        '#9b59b6', // Purple
        '#1abc9c', // Teal
        '#e67e22', // Pumpkin
        '#3498db', // Belize Hole
        '#2c3e50', // Midnight Blue
        '#f1c40f', // Sunflower
    ];

    // Randomly select a color from the array
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}