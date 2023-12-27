
const teamContainer = document.getElementById('team-members-container');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const membersPerLoad = 18;
let currentMembers = 0;
let teamData = null;
const judgesContainer = document.getElementById('judges-container');
const loadMoreJudgeBtn = document.getElementById('loadMoreJudgeBtn');
const judgesPerLoad = 4;
let currentJudges = 0;
let judgesData = null;
const mentorsContainer = document.getElementById('mentors-container');
const loadMoreMentorsBtn = document.getElementById('loadMoreMentorsBtn');
const mentorsPerLoad = 12;
let currentMentors = 0;
let mentorsData = null;

async function fetchTeamData() {
    const response = await fetch('assets/meta-data/team-members.json');
    const data = await response.json();
    teamData = data;
    return data;
}
async function fetchJudgesData() {
    const response = await fetch('assets/meta-data/judges.json');
    const data = await response.json();
    judgesData = data;
    return data;
}
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

function showMoreTeamMembers() {
    if (!teamData) {
        fetchTeamData().then(() => showMoreTeamMembers());
        return;
    }
    if (teamData.length === 0) {
        teamContainer.innerHTML = '<span class="stay-tuned-button text-center">We are currently building our great team. Stay tuned for updates!</span>';
        loadMoreBtn.style.display = 'none';
        return;
    }
    const remainingMembers = teamData.length - currentMembers;
    const nextLoad = Math.min(remainingMembers, membersPerLoad);
    renderMembers(currentMembers, currentMembers + nextLoad);
    currentMembers += nextLoad;
    if (currentMembers >= teamData.length) {
        loadMoreBtn.style.display = 'none';
    }
}
function renderMembers(start, end) {
    // Sort by category
    teamData.sort((a, b) => a.category.localeCompare(b.category));
    // Sort by role within each category
    teamData.sort((a, b) => {
        if (a.category === b.category) {
            return a.role.localeCompare(b.role);
        }
        return 0;
    });
    // Sort by name within each category and role
    teamData.sort((a, b) => {
        if (a.category === b.category && a.role === b.role) {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });
    teamData.slice(start, end).forEach((member, index) => {
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

        // Add icons container to the content
        content.appendChild(icons);



        content.appendChild(image);
        content.appendChild(level);
        content.appendChild(text);
        content.appendChild(icons);

        memberCard.appendChild(content);

        col.appendChild(memberCard);
        teamContainer.appendChild(col);
       
    });
    GLightbox({
        selector: '[data-glightbox]',
    });
}
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


function createSocialLink(platform, url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.innerHTML = `<i class="bi bi-${platform.toLowerCase()}"></i>`;
    return link;
}

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

