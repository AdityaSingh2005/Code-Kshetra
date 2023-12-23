
const teamContainer = document.getElementById('team-members-container');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const membersPerLoad = 3;
let currentMembers = 0;
let teamData = null;
const judgesContainer = document.getElementById('judges-container');
const loadMoreJudgeBtn = document.getElementById('loadMoreJudgeBtn');
const judgesPerLoad = 3;
let currentJudges = 0;
let judgesData = null;

async function fetchTeamData() {
    const response = await fetch('assets/meta-data/team-members.json');
    const data = await response.json();
    teamData = data;
    return data;
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
    teamData.slice(start, end).forEach((member, index) => {
        const col = document.createElement('div');
        col.classList.add('col-lg-4', 'col-md-6', 'd-flex', 'justify-content-center');

        const memberCard = document.createElement('div');
        memberCard.classList.add('box1', 'box');
        memberCard.setAttribute('data-aos', 'fade-up');
        memberCard.setAttribute('data-aos-delay', `${index * 100}`);

        const content = document.createElement('div');
        content.classList.add('content');

        const image = document.createElement('div');
        image.classList.add('image');
        const imgElement = document.createElement('img');
        imgElement.src = member.image;
        imgElement.alt = `${member.name} - Team Member`;
        image.appendChild(imgElement);

        const level = document.createElement('div');
        level.classList.add('level');
        const levelText = document.createElement('p');
        levelText.textContent = member.level;
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

        const instagramButton = document.createElement('a');
        instagramButton.href = `https://www.instagram.com/${member.insta}`;
        instagramButton.target = '_blank';
        instagramButton.innerHTML = '<i class="bi bi-instagram"></i>';

        const linkedinButton = document.createElement('a');
        linkedinButton.href = `https://www.linkedin.com/in/${member.linkedin}`;
        linkedinButton.target = '_blank';
        linkedinButton.innerHTML = '<i class="bi bi-linkedin"></i>';

        icons.appendChild(instagramButton);
        icons.appendChild(linkedinButton);

        content.appendChild(image);
        content.appendChild(level);
        content.appendChild(text);
        content.appendChild(icons);

        memberCard.appendChild(content);

        col.appendChild(memberCard);
        teamContainer.appendChild(col);
    });

}


function renderJudges(start, end) {
    judgesData.slice(start, end).forEach((judge, index) => {
        const col = document.createElement('div');
        col.classList.add('col-lg-4', 'col-md-6');

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
async function fetchJudgesData() {
    const response = await fetch('assets/meta-data/judges.json');
    const data = await response.json();
    judgesData = data;
    return data;
}

function createSocialLink(platform, url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.innerHTML = `<i class="bi bi-${platform.toLowerCase()}"></i>`;
    return link;
}

// Initial load
showMoreTeamMembers();
showMoreJudges();
