// references
const gallery = document.getElementById('gallery');
const searchBtn = document.getElementById('search-btn');
const searchUser = document.getElementById('username');

// fetch repos for a user. default is my user
const getRepos = async (username = 'kaniisun') => {
    try {

        // fetch user repositories
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${username}`);
        }
        
        const repos = await response.json();

        // clear content
        gallery.innerHTML = ''; 

        // loop through repositories and fetch data
        repos.forEach(async (repo) => {
            try {
                // fetch commit data
                const commitRes = await fetch(repo.commits_url.replace('{/sha}', ''));

                if (!commitRes.ok) {
                    throw new Error('Commit fetch failed');
                }

                const commits = await commitRes.json();

                // display repo
                display(repo, commits.length);

                // warning for fetching commits
            } catch (commitError) {
                console.warn(`Error fetching commits: ${commitError}`);
                display(repo, 'No commits');
            }
        });
    } catch (error) {
        console.error('Error fetching:', error);
    }
};

// display repo
const display = (repo, commitsCount) => {

    // create div for repository
    const repository = document.createElement('div');
    repository.classList.add('repo-card');

    // handle undefined languages
    const languages = repo.languages ? Object.keys(repo.languages).join(', ') : 'N/A';

    // repository data 
    repository.innerHTML = `
        <h3> <a href="${repo.html_url}" target="_blank">${repo.name} </a></h3>
        <p> ${repo.description || 'No description.'} </p>
        <ul>
            <li>Created: ${new Date(repo.created_at).toLocaleDateString()} </li>
            <li>Updated: ${new Date(repo.updated_at).toLocaleDateString()} </li>
            <li>Commits: ${commitsCount} </li>
            <li>Languages: <span class="languages"> ${languages} </span></li>
            <li>Watchers: ${repo.watchers_count} </li>
        </ul>
    `;

    gallery.appendChild(repository);
};

// user repository search
searchBtn.addEventListener('click', () => {

    // get username and get their repositories
    const username = searchUser.value.trim();
    if (username) {
        getRepos(username);
    }
});

// my repositories appear when first loaded
window.onload = () => {
    getRepos();
};